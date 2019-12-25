import * as vscode from "vscode";
import { repeatIncrementedText } from "./text";

export class RepeatEditor {
  private repeatIncrementedText!: (repeatCount: number) => string;

  constructor() {
    this.withEditor((editor: vscode.TextEditor) => {
      const selection = this.expandSelection(editor);
      editor.selection = selection;
      const text = editor.document.getText(selection);
      this.repeatIncrementedText = repeatIncrementedText(text);
    });
  }

  incRepeat(repeatCount: number): void {
    this.withEditor((editor: vscode.TextEditor) => {
      editor.edit(
        builder => {
          builder.replace(
            editor.selection,
            this.repeatIncrementedText(repeatCount)
          );
        },
        { undoStopBefore: false, undoStopAfter: false }
      );
    });
  }

  undo(): void {
    vscode.commands.executeCommand("undo");
  }

  private expandSelection(editor: vscode.TextEditor): vscode.Selection {
    const selection = editor.selection;
    const start = selection.start;
    const end = selection.end;
    const endLine = editor.document.lineAt(end.line);

    return new vscode.Selection(
      start.with({ character: 0 }),
      end.with({ character: endLine.range.end.character })
    );
  }

  private withEditor(
    selectionHandler: (editor: vscode.TextEditor) => void
  ): void {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      selectionHandler(editor);
    }
  }
}
