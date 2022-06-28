"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var Action_1 = require("rxjs/internal/scheduler/Action");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, userService, _authService, _snackBar, _fb, ls) {
        this.router = router;
        this.userService = userService;
        this._authService = _authService;
        this._snackBar = _snackBar;
        this._fb = _fb;
        this.ls = ls;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this._authService.isAuthenticated()) {
            this.router.navigate(['dashboard']);
        }
        this.loginForm = this._fb.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    LoginComponent.prototype.goToforgotpassword = function () {
        this.router.navigate(['forgotpassword']);
    };
    LoginComponent.prototype.goToSignUpPage = function () {
        this.router.navigate(['register']);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var body = {
            "username": this.loginForm.controls['username'].value,
            "password": this.loginForm.controls['password'].value
        };
        this.ls.loginUser(body).subscribe(function (res) {
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
            localStorage.setItem("tokenId", "res.Data.tokenId");
            localStorage.setItem("loggedInUser", JSON.stringify(res.data));
            console.log("login success", res);
            //  this.userService.loggedInUser(res.data);
            _this.router.navigate(['dashboard']);
        }, function (err) {
            _this.openSnackBar(err.error.message, 'close', 'error');
            console.log(err);
            console.log('somegthing went wrong');
        });
    };
    LoginComponent.prototype.openSnackBar = function (message, action, type) {
        this._snackBar.openFromComponent(snackbar_dialog_component_1.SnackbarDialogComponent, {
            duration: 3000,
            panelClass: 'snackbar-global',
            data: {
                message: message,
                action: Action_1.Action,
                type: type
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: 'login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
