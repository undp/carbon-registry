import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AppService } from "../../app.service";
import { RegisterService } from "../register/register.service";
import { ActionRendererComponent } from "./action-renderer/action-renderer.component";
import { UserAccessRendererComponent } from "./user-access-renderer/user-access-renderer.component";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  gridApi;
  gridColumnApi;
  gridOptions;
  columnDefs = [];
  rowData = [];

  defaultColDef = {
    editable: false,
    sortable: true,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  constructor(
    private appService: AppService,
    private router: Router,
    private readonly _rs: RegisterService,
    private _snackBar: MatSnackBar
  ) {
    this.setupGridOptions();
  }

  setupGridOptions() {
    this.gridOptions = {
      context: {
        thisComponent: this,
      },
      onGridReady: (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.setupColdefs();
      },
    };
  }

  setupColdefs() {
    this.columnDefs = [
      {
        field: "name",
        headerName: "Name",
        cellRenderer: (params) => {
          let returnStr = params.data.firstName;
          if (params.data.lastName) {
            returnStr += " " + params.data.lastName;
          }
          return returnStr;
        },
      },
      { field: "email", headerName: "Email" },
      { field: "role", headerName: "Role", cellClass: ["capitalize"] },
      {
        field: "screenMenu",
        headerName: "Permissions",
        cellRenderer: UserAccessRendererComponent,
      },
      {
        field: "status",
        headerName: "Actions",
        cellRenderer: ActionRendererComponent,
        width: 120,
      },
    ];
    this.loadData();
  }

  ngOnInit() {
    this.getAllUser("all");
  }

  public getAllUser(type) {
    this.appService.getAllUsers(type).subscribe(
      (res: any) => {
        this.rowData = res.data;
        this.loadData();
      },
      (err) => {}
    );
  }

  loadData() {
    if (this.gridApi && this.rowData) {
      this.gridApi.setRowData(this.rowData);
      this.gridApi.sizeColumnsToFit();
    }
  }

  goToNewNDC() {
    this.router.navigate(["/master/trip"]);
  }

  updateUserStatus(payload) {
    this._rs.updateStatus(payload).subscribe(
      (res: any) => {
        this.openSnackBar("Status updated successfully", "Close");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
    this.getAllUser("all");
  }
}
