import * as vscode from 'vscode';
import { CompletionState } from './state';

export class CompletedDecorationProvider implements vscode.FileDecorationProvider {
  private readonly _onDidChangeFileDecorations = new vscode.EventEmitter<vscode.Uri | vscode.Uri[] | undefined>();
  readonly onDidChangeFileDecorations = this._onDidChangeFileDecorations.event;

  constructor(private readonly state: CompletionState) {
    state.onDidChange(() => {
      this._onDidChangeFileDecorations.fire(undefined);
    });
  }

  provideFileDecoration(uri: vscode.Uri): vscode.FileDecoration | undefined {
    if (!this.state.isComplete(uri)) return undefined;

    return {
      badge: '✓',
      color: new vscode.ThemeColor('charts.green'),
      tooltip: 'Completed',
      propagate: false,
    };
  }

  dispose(): void {
    this._onDidChangeFileDecorations.dispose();
  }
}
