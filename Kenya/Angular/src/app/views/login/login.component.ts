import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../guards/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginServiceService } from "./login-service.service";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { SnackbarDialogComponent } from "../modal/snackbar-dialog/snackbar-dialog.component";
import { Action } from "rxjs/internal/scheduler/Action";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private ls: LoginServiceService
  ) {}
  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this.router.navigate(["dashboard"]);
    }
    this.loginForm = this._fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  goToforgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }

  goToSignUpPage() {
    this.router.navigate(["register"]);
  }

  login() {
    var body = {
      email: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["password"].value,
    };
    this.ls.loginUser(body).subscribe(
      (res) => {
        /* if(res.Message == 'Login Success' && res.StatusCode == 200){
      localStorage.setItem("tokenId" , "res.Data.tokenId");
      localStorage.setItem("userDetails" , "JSON.stringify(res.Data)");
      this.openSnackBar(res.Message,'close' , 'success')
      this.router.navigate(['dashboard']);
     }
     else{
      this.openSnackBar(res.Message,'close' , 'error')
       console.log('login failed');
     } */
        localStorage.setItem("screenAccess", res.data.screenMenu);
        localStorage.setItem("tokenId", res.data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));
        console.log("login success", res);
        //  this.userService.loggedInUser(res.data);
        this.router.navigate(["dashboard"]);
      },
      (err) => {
        this.openSnackBar(err.error.message, "close", "error");
        console.log(err);
        console.log("somegthing went wrong");
      }
    );
  }
  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass: "snackbar-global",
      data: {
        message: message,
        action: Action,
        type: type,
      },
    });
  }
}
