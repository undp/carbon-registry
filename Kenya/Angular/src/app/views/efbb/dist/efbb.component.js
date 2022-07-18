"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EfbbComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EfbbComponent = /** @class */ (function () {
    function EfbbComponent(_fb) {
        this._fb = _fb;
        this.formGroup = this._fb.group({
            inventoryYear: [null, [forms_1.Validators.required]],
            sector: [null, [forms_1.Validators.required]],
            category: [null, [forms_1.Validators.required]],
            subSector: [null, [forms_1.Validators.required]],
            calculationApproach: [null, [Validators.required]],
            remarks: ['']
        });
    }
    EfbbComponent.prototype.ngOnInit = function () {
        this.yearList = this.getYears();
    };
    EfbbComponent.prototype.getYears = function () {
        var x = [];
        for (var i = 1991; i <= 2050; i++) {
            x.push(i);
        }
        return x;
    };
    EfbbComponent.prototype.isInvalid = function (form, field, errorValue) {
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
    EfbbComponent = __decorate([
        core_1.Component({
            selector: 'app-efbb',
            templateUrl: './efbb.component.html',
            styleUrls: ['./efbb.component.scss']
        })
    ], EfbbComponent);
    return EfbbComponent;
}());
exports.EfbbComponent = EfbbComponent;
