import * as vscode from "vscode";

function validateInput(input: string): string {
  const num = Number(input);
  if (isNaN(num) || !Number.isInteger(num)) {
    return "Repeat count must be integer";
  }

  if (num > 1000) {
    return "Repeat count must be < 1000";
  }

  if (num <= 0) {
    return "Repeat count must be > 0";
  }

  return "";
}

export class RepeatCountInputBox {
  private inner: vscode.InputBox;
  private accepted = false;

  constructor(private defaultValue: number) {
    this.inner = vscode.window.createInputBox();
    this.inner.prompt = "Provide repeat count.";
    this.inner.value = String(defaultValue);
    this.inner.onDidAccept(() => {
      if (!this.inner.validationMessage) {
        this.accepted = true;
        this.inner.hide();
      }
    });
  }

  onInput(handler: (value: number, validationMessage: string) => void): void {
    this.inner.onDidChangeValue((input: string) => {
      const validationMessage = validateInput(input);
      this.inner.validationMessage = validationMessage;
      handler(Number(input), validationMessage);
    });
  }

  onCancel(handler: () => void): void {
    this.inner.onDidHide(() => {
      if (!this.accepted) {
        handler();
      }
    });
  }

  show(): void {
    this.inner.show();
  }

  hide(): void {
    this.inner.hide();
  }
}
