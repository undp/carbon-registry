import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { RegisterService } from "./register.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  // @ts-ignore
  @ViewChild("screenAccess") screenAccess;
  public basicDetailForm: FormGroup;
  public permissionForm: FormGroup;
  public permissionList = [];
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _rs: RegisterService,
    private readonly _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  //ideally this is the 1st life cycle hook
  ngOnChanges() {
    //this function will get called once during the initiation of the component,
    //after that it will get called everytime there will be a change to components inputs
  }

  //Intialization life cycle hook , this is the method where you do all your initializations
  ngOnInit() {
    // this.getMenuGroup();

    this.basicDetailForm = this._fb.group({
      // username: [null, [Validators.required]],
      fname: [null, [Validators.required,Validators.pattern("[A-Za-z ]+")]],
      lname: [null, [Validators.pattern("[A-Za-z ]+")]],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern("[0-9]{10}")]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
    this.permissionForm = this._fb.group({
      role: [null, [Validators.required]],
    });
  }

  isInvalid(form, field, errorValue) {
    if (errorValue == "required" || "ValidateDate") {
      return (
        form.get(field).invalid &&
        (form.get(field).touched || form.get(field).dirty) &&
        form.get(field).hasError(errorValue)
      );
    } else if (errorValue == "pattern") {
      return (
        form.get(field).invalid &&
        form.get(field).dirty &&
        !form.get(field).hasError("required") &&
        form.get(field).errors.pattern
      );
    } else if (errorValue == "email") {
      return (
        form.get(field).invalid &&
        form.get(field).dirty &&
        !form.get(field).hasError("required") &&
        form.get(field).hasError("email")
      );
    }
  }
  validateField(formGroup:FormGroup, field:string) {
    let errorMsg = null;
    if(!formGroup.touched) {
      return;
    }
    switch(field) {
      case "fname":
        if(formGroup.controls[field].status == "INVALID") {
          if(formGroup.controls[field].errors.required) {
            errorMsg = "First Name is required";
          } else if(formGroup.controls[field].errors.pattern) {
            errorMsg = "First Name is invalid";
          }
        }
        break;
      case "lname":
        if(formGroup.controls[field].status == "INVALID") {
          if(formGroup.controls[field].errors.pattern) {
            errorMsg = "Last Name is invalid";
          }
        }
        break;
      case "email":
        if(formGroup.controls[field].status == "INVALID") {
          if(formGroup.controls[field].errors.required) {
            errorMsg = "Email is required";
          } else if(formGroup.controls[field].errors.email) {
            errorMsg = "Email is invalid";
          }
        }
        break;
      case "mobile":
        if(formGroup.controls[field].status == "INVALID") {
          if(formGroup.controls[field].errors.required) {
            errorMsg = "Mobile is required";
          } else if(formGroup.controls[field].errors.pattern) {
            errorMsg = "Mobile is invalid";
          }
        }
        break;
      case "password":
        if(formGroup.controls[field].status == "INVALID") {
          if(formGroup.controls[field].errors.required) {
            errorMsg = "Password is required";
          } else if(formGroup.controls[field].errors.pattern) {
            errorMsg = "Password is invalid";
          }
        }
        break;
      case "confirmPassword":
        if(formGroup.controls[field].status == "INVALID") {
          if(formGroup.controls[field].errors.required) {
            errorMsg = "Confirm Password is required";
          } else if(formGroup.controls[field].errors.pattern) {
            errorMsg = "Confirm Password is invalid";
          }
        }
        break;
      case "department":
        if(formGroup.controls[field].status == "INVALID") {
          if(formGroup.controls[field].errors.required) {
            errorMsg = "Department is required";
          }
        }
        break;
    }
    return errorMsg;
  }
  goToLoginPage() {
    this._router.navigate(["login"]);
  }

  /* getMenuGroup() {
    this.permissionList = [];
    this._rs.getMenuGroup().subscribe(
      (res: any) => {
        Object.keys(res.data).forEach((key) => {
          res.data[key].forEach((children) => {
            children.selected = false;
          });
          this.permissionList.push({
            name: key,
            children: res.data[key],
          });
        });
      },
      (err) => {}
    );
  } */

  getSelectedMenus() {
    let arr = [];
    this.permissionList.forEach((x) => {
      x.children.forEach((y) => {
        if (y.selected) {
          arr.push(y._id);
        }
      });
    });
    return arr;
  }

  register() {
    console.log("register form details: ",this.basicDetailForm);
    if(this.basicDetailForm.status == "INVALID") {
      this.basicDetailForm.markAllAsTouched();
      return;
    }
    var obj = {
      // username: this.basicDetailForm.controls["username"].value,
      firstName: this.basicDetailForm.controls["fname"].value,
      lastName: this.basicDetailForm.controls["lname"].value,
      email: this.basicDetailForm.controls["email"].value,
      mobile: this.basicDetailForm.controls["mobile"].value,
      password: this.basicDetailForm.controls["password"].value,
      department: this.basicDetailForm.controls["department"].value,
      role: this.permissionForm.controls["role"].value,
      screenMenu: [],
    };
    const screenSelections = this.screenAccess.checklistSelection.selected.map(
      (screen) => screen["item"]
    );
    const partial = this.screenAccess.treeControl.dataNodes
      .filter((x) => this.screenAccess.descendantsPartiallySelected(x))
      .map((screen) => screen["item"]);
    const totalSelections = [...partial, ...screenSelections];
    // @ts-ignore
    obj.screenMenu = [...new Set(totalSelections)];
    this._rs.register(obj).subscribe(
      (res: any) => {
        this.openSnackBar("User registered successfully", "Close");
        this._router.navigate(["login"]);
      },
      (err) => {
        if (err && err.error && err.error.message) {
          this.openSnackBar(err.error.message, "Close");
        }
        console.log(err);
      }
    );
    console.log(obj);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
