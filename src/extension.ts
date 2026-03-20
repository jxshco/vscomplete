import * as vscode from 'vscode';
import { CompletionState } from './state';
import { CompletedDecorationProvider } from './decorationProvider';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const state = new CompletionState();
  await state.load();

  const provider = new CompletedDecorationProvider(state);
  context.subscriptions.push(
    vscode.window.registerFileDecorationProvider(provider),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vscomplete.markComplete', async (uri: vscode.Uri) => {
      if (!uri) return;
      await state.markComplete(uri);
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('vscomplete.unmarkComplete', async (uri: vscode.Uri) => {
      if (!uri) return;
      await state.unmarkComplete(uri);
    }),
  );

  context.subscriptions.push(state);
  context.subscriptions.push(provider);
}

export function deactivate(): void {
  // Cleanup handled by disposables
}
