import * as vscode from "vscode";
import { RepeatCountInputBox } from "./lib/input";
import { RepeatEditor } from "./lib/editor";

export function activate(context: vscode.ExtensionContext): void {
  vscode.commands.registerTextEditorCommand("extension.incRepeat", async () => {
    const selection = vscode.window.activeTextEditor?.selection;
    const repeatCountKey = "repeatCount";
    const initialRepeatCount = 10;
    const lastRepeatCount = context.globalState.get<number>(
      repeatCountKey,
      initialRepeatCount
    );

    if (selection) {
      const repeatEditor = new RepeatEditor();
      const inputBox = new RepeatCountInputBox(lastRepeatCount);

      repeatEditor.incRepeat(lastRepeatCount);

      inputBox.onInput((value: number, validationMessage: string) => {
        if (validationMessage) {
          repeatEditor.incRepeat(1);
        } else {
          repeatEditor.incRepeat(value);
          context.globalState.update(repeatCountKey, value);
        }
      });

      inputBox.onCancel(() => {
        repeatEditor.undo();
      });

      inputBox.show();
    }
  });
}
