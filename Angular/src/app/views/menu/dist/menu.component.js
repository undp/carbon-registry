"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MenuComponent = /** @class */ (function () {
    function MenuComponent(_fb) {
        this._fb = _fb;
        this.allMenus = [];
        this.availableMenus = ['ENERGY', 'IPPU', 'MITIGATION ACTION'];
        this.selectedMenu = "";
        this.selectedChildrens = ['WASTE', 'CLIMATE FINANCE'];
        this.menuForm = this._fb.group({
            menu: [null, [forms_1.Validators.required]]
        });
    }
    MenuComponent.prototype.isInvalid = function (form, field, errorValue) {
        if (errorValue == 'required' || 'ValidateDate') {
            return form.get(field).invalid && (form.get(field).touched || form.get(field).dirty) && form.get(field).hasError(errorValue);
        }
        else if (errorValue == 'pattern') {
            return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).errors.pattern;
        }
        else if (errorValue == 'email') {
            return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('email');
        }
    };
    MenuComponent.prototype.ngOnInit = function () {
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'app-menu',
            templateUrl: './menu.component.html',
            styleUrls: ['./menu.component.scss']
        })
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
