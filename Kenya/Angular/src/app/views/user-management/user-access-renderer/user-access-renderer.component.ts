import { Component, ViewChild } from "@angular/core";

@Component({
  selector: "app-user-access-renderer",
  templateUrl: "./user-access-renderer.component.html",
  styleUrls: ["./user-access-renderer.component.scss"],
})
export class UserAccessRendererComponent {
  // @ts-ignore
  @ViewChild("screenAccess") screenAccess;
  params;

  agInit(params): void {
    this.params = params;
  }

  onMenuShow() {
    this.screenAccess.setNodeSelection(this.params.value);
  }

  onMenuClosed() {
    const screenSelections = this.screenAccess.checklistSelection.selected.map(
      (screen) => screen["item"]
    );
    const partial = this.screenAccess.treeControl.dataNodes
      .filter((x) => this.screenAccess.descendantsPartiallySelected(x))
      .map((screen) => screen["item"]);
    const totalSelections = [...partial, ...screenSelections];
    // @ts-ignore
    const newSelections = [...new Set(totalSelections)];
    this.params.node.setDataValue("screenMenu", newSelections);
  }
}
