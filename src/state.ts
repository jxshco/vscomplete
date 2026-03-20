import * as vscode from 'vscode';
import * as path from 'path';

const STATE_FILE = '.vscomplete.json';

export class CompletionState {
  private completed: Set<string> = new Set();
  private stateUri: vscode.Uri | undefined;

  private readonly _onDidChange = new vscode.EventEmitter<void>();
  readonly onDidChange = this._onDidChange.event;

  async load(): Promise<void> {
    const workspaceRoot = this.getWorkspaceRoot();
    if (!workspaceRoot) return;

    this.stateUri = vscode.Uri.joinPath(workspaceRoot, STATE_FILE);

    try {
      const data = await vscode.workspace.fs.readFile(this.stateUri);
      const paths: unknown = JSON.parse(Buffer.from(data).toString('utf-8'));
      if (Array.isArray(paths)) {
        this.completed = new Set(paths.filter((p): p is string => typeof p === 'string'));
      }
    } catch {
      this.completed = new Set();
    }
  }

  private async save(): Promise<void> {
    if (!this.stateUri) return;
    const sorted = [...this.completed].sort();
    const data = Buffer.from(JSON.stringify(sorted, null, 2) + '\n', 'utf-8');
    await vscode.workspace.fs.writeFile(this.stateUri, data);
  }

  isComplete(uri: vscode.Uri): boolean {
    const rel = this.toRelativePath(uri);
    return rel !== undefined && this.completed.has(rel);
  }

  async markComplete(uri: vscode.Uri): Promise<void> {
    const rel = this.toRelativePath(uri);
    if (rel === undefined) return;

    const stat = await vscode.workspace.fs.stat(uri);
    if (stat.type & vscode.FileType.Directory) {
      await this.addRecursive(uri);
    } else {
      this.completed.add(rel);
    }

    await this.save();
    this._onDidChange.fire();
  }

  async unmarkComplete(uri: vscode.Uri): Promise<void> {
    const rel = this.toRelativePath(uri);
    if (rel === undefined) return;

    const stat = await vscode.workspace.fs.stat(uri);
    if (stat.type & vscode.FileType.Directory) {
      await this.removeRecursive(uri);
    } else {
      this.completed.delete(rel);
    }

    await this.save();
    this._onDidChange.fire();
  }

  private async addRecursive(uri: vscode.Uri): Promise<void> {
    const rel = this.toRelativePath(uri);
    if (rel !== undefined) {
      this.completed.add(rel);
    }

    const entries = await vscode.workspace.fs.readDirectory(uri);
    for (const [name, type] of entries) {
      const childUri = vscode.Uri.joinPath(uri, name);
      if (type & vscode.FileType.Directory) {
        await this.addRecursive(childUri);
      } else {
        const childRel = this.toRelativePath(childUri);
        if (childRel !== undefined) {
          this.completed.add(childRel);
        }
      }
    }
  }

  private async removeRecursive(uri: vscode.Uri): Promise<void> {
    const rel = this.toRelativePath(uri);
    if (rel !== undefined) {
      this.completed.delete(rel);
    }

    const entries = await vscode.workspace.fs.readDirectory(uri);
    for (const [name, type] of entries) {
      const childUri = vscode.Uri.joinPath(uri, name);
      if (type & vscode.FileType.Directory) {
        await this.removeRecursive(childUri);
      } else {
        const childRel = this.toRelativePath(childUri);
        if (childRel !== undefined) {
          this.completed.delete(childRel);
        }
      }
    }
  }

  private toRelativePath(uri: vscode.Uri): string | undefined {
    const root = this.getWorkspaceRoot();
    if (!root) return undefined;
    const rel = path.relative(root.fsPath, uri.fsPath);
    if (rel.startsWith('..')) return undefined;
    return rel;
  }

  private getWorkspaceRoot(): vscode.Uri | undefined {
    return vscode.workspace.workspaceFolders?.[0]?.uri;
  }

  dispose(): void {
    this._onDidChange.dispose();
  }
}
