"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var stepper_1 = require("@angular/cdk/stepper");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_fb, _rs, _router, _snackBar) {
        this._fb = _fb;
        this._rs = _rs;
        this._router = _router;
        this._snackBar = _snackBar;
        this.permissionList = [];
    }
    //ideally this is the 1st life cycle hook
    RegisterComponent.prototype.ngOnChanges = function () {
        //this function will get called once during the initiation of the component,
        //after that it will get called everytime there will be a change to components inputs
    };
    //Intialization life cycle hook , this is the method where you do all your initializations 
    RegisterComponent.prototype.ngOnInit = function () {
        this.getMenuGroup();
        this.basicDetailForm = this._fb.group({
            username: [null, [forms_1.Validators.required]],
            fname: [null, [forms_1.Validators.required]],
            lname: [null, [forms_1.Validators.required]],
            email: [null, [forms_1.Validators.required, forms_1.Validators.email]],
            mobile: [null, [forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{10}')]],
            password: [null, [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
            confirmPassword: [null, [forms_1.Validators.required]],
            department: [null, [forms_1.Validators.required]]
        });
        this.permissionForm = this._fb.group({
            role: [null, [forms_1.Validators.required]]
        });
    };
    RegisterComponent.prototype.isInvalid = function (form, field, errorValue) {
        if (errorValue == 'required' || 'ValidateDate') {
            return form.get(field).invalid && (form.get(field).touched || form.get(field).dirty) && form.get(field).hasError(errorValue);
        }
        else if (errorValue == 'pattern') {
            return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).errors.pattern;
        }
        else if (errorValue == 'email') {
            return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).hasError('email');
        }
    };
    RegisterComponent.prototype.goToLoginPage = function () {
        this._router.navigate(['login']);
    };
    RegisterComponent.prototype.getMenuGroup = function () {
        var _this = this;
        this.permissionList = [];
        this._rs.getMenuGroup().subscribe(function (res) {
            Object.keys(res.data).forEach(function (key) {
                res.data[key].forEach(function (children) {
                    children.selected = false;
                });
                _this.permissionList.push({
                    name: key,
                    children: res.data[key]
                });
            });
        }, function (err) {
        });
    };
    RegisterComponent.prototype.getSelectedMenus = function () {
        var arr = [];
        this.permissionList.forEach(function (x) {
            x.children.forEach(function (y) {
                if (y.selected) {
                    arr.push(y._id);
                }
            });
        });
        return arr;
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        var obj = {
            username: this.basicDetailForm.controls['username'].value,
            firstName: this.basicDetailForm.controls['fname'].value,
            lastName: this.basicDetailForm.controls['lname'].value,
            email: this.basicDetailForm.controls['email'].value,
            mobile: this.basicDetailForm.controls['mobile'].value,
            password: this.basicDetailForm.controls['password'].value,
            department: this.basicDetailForm.controls['department'].value,
            role: this.permissionForm.controls['role'].value,
            menu: this.getSelectedMenus()
        };
        this._rs.register(obj).subscribe(function (res) {
            _this.openSnackBar("User registered successfully", 'Close');
            _this._router.navigate(['login']);
        }, function (err) {
            console.log(err);
        });
        console.log(obj);
    };
    RegisterComponent.prototype.openSnackBar = function (message, action) {
        this._snackBar.open(message, action);
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: 'register.component.html',
            styleUrls: ['./register.component.scss'],
            providers: [{
                    provide: stepper_1.STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
                }],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
