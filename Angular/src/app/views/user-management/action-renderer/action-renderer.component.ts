import { Component } from "@angular/core";

@Component({
  selector: "app-action-renderer",
  templateUrl: "./action-renderer.component.html",
  styleUrls: ["./action-renderer.component.scss"],
})
export class ActionRendererComponent {
  params;

  agInit(params): void {
    this.params = params;
  }

  approve() {
    const payload = {
      _id: this.params.data["_id"],
      status: "active",
      screenMenu: this.params.node.data["screenMenu"],
    };
    this.params.context.thisComponent.updateUserStatus(payload);
  }

  reject() {
    const payload = {
      _id: this.params.data["_id"],
      status: "delete",
    };
    this.params.context.thisComponent.updateUserStatus(payload);
  }

  delete() {
    const payload = {
      _id: this.params.data["_id"],
      status: "delete",
    };
    this.params.context.thisComponent.updateUserStatus(payload);
  }
  update() {
    const payload = {
      _id: this.params.data["_id"],
      status: this.params.value,
      screenMenu: this.params.node.data["screenMenu"],
    };
    this.params.context.thisComponent.updateUserStatus(payload);
  }
}
