import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "../../app.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.scss"],
})
export class UserListComponent implements OnInit {
  public userList: any;
  displayedColumns = [];
  dataSource;
  firstName = new FormControl();
  email = new FormControl();
  role = new FormControl();
  status = new FormControl();
  agency = new FormControl();
  columnNames = [
    { id: "firstName", value: "First Name", formControl: this.firstName },
    { id: "email", value: "Email", formControl: this.email },
    { id: "role", value: "Role", formControl: this.role },
    { id: "status", value: "Status", formControl: this.status },
    { id: "menu", value: "Access" },
  ];
  filteredValues = {
    firstName: "",
    email: "",
    status: "",
    role: "",
    agency: "",
  };

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  constructor(private appService: AppService, private router: Router) {}

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.userList = [];
    this.getAllUser("all");
    this.displayedColumns = this.columnNames.map((x) => x.id);
    // this.displayedColumns.push('actions');
    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.paginator = this.paginator;

    this.firstName.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues["firstName"] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues["topFilter"] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.email.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues["email"] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues["topFilter"] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.role.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues["role"] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues["topFilter"] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.status.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues["status"] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues["topFilter"] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.agency.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues["agency"] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues["topFilter"] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  gotouserdetaillist(user) {
    sessionStorage.setItem("current-user", JSON.stringify(user));
    this.router.navigate(["/user/user-details"]);
  }

  applyFilter(filterValue: string) {
    let filter = {
      firstName: filterValue.trim().toLowerCase(),
      email: filterValue.trim().toLowerCase(),
      status: filterValue.trim().toLowerCase(),
      agency: filterValue.trim().toLowerCase(),
      topFilter: true,
    };
    this.dataSource.filter = JSON.stringify(filter);
  }

  public customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): boolean {
      let searchString = JSON.parse(filter);
      let nameFound =
        data.firstName
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.firstName.toLowerCase()) !== -1;
      let emailFound =
        data.email
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.email.toLowerCase()) !== -1;
      let statusFound =
        data.status
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.status.toLowerCase()) !== -1;
      let roleFound =
        data.role
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.role.toLowerCase()) !== -1;
      if (searchString.topFilter) {
        return nameFound || emailFound || statusFound || roleFound;
      } else {
        return nameFound && emailFound && statusFound && roleFound;
      }
    };
    return myFilterPredicate;
  }
  public getAllUser(type) {
    this.appService.getAllUsers(type).subscribe(
      (res: any) => {
        this.userList = res.data;
        this.dataSource = new MatTableDataSource<any>(res.data);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {}
    );
  }

  goToNewNDC() {
    this.router.navigate(["/master/trip"]);
  }
}
