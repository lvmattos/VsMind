import * as vscode from "vscode";

var statusBarItems: Array<vscode.StatusBarItem> = [];
var questions: Array<Card> = [];
var index: number = 0;

export function activate(context: vscode.ExtensionContext) {
  questions.push(new Card("Apple", "Maça"));
  questions.push(new Card("Hi world", "Olá mundo"));
  questions.push(new Card("Certainly", "Certamente"));

  let disposable = vscode.commands.registerCommand("extension.vsMind", () => {
    let statusBarTask = new StatusBarTask();
    statusBarTask.addStatusBartask(questions[index].getFront(), 3);
    statusBarTask.addStatusBartask(
      "Show Answer",
      2,
      "extension.vsMindShowAnswer"
    );
    statusBarTask.addStatusBartask("Next", 0, "extension.vsMindNext");
  });

  let disposable2 = vscode.commands.registerCommand(
    "extension.vsMindShowAnswer",
    () => {
      statusBarItems[0].text = questions[index].getBack();
    }
  );

  let disposable3 = vscode.commands.registerCommand(
    "extension.vsMindNext",
    () => {
      index++;
      statusBarItems[0].text = questions[index].getFront();
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
  context.subscriptions.push(disposable3);
}

class StatusBarTask {
  public addStatusBartask(
    label: string,
    priority?: number,
    command: string = ""
  ): void {
    let _statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      priority
    );
    _statusBarItem.text = label;
    _statusBarItem.command = command;
    _statusBarItem.show();
    statusBarItems.push(_statusBarItem);
  }
}

class Card {
  private Front: string;
  private Back: string;
  private Difficulty: number;

  constructor(front: string, back: string, difficulty: number = 0) {
    this.Front = front;
    this.Back = back;
    this.Difficulty = difficulty;
  }

  getFront(): string {
    return this.Front;
  }

  getBack(): string {
    return this.Back;
  }

  getDifficulty(): number {
    return this.Difficulty;
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
