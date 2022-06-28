"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.OtherSdgBottomSheetComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var OtherSdgBottomSheetComponent = /** @class */ (function () {
    function OtherSdgBottomSheetComponent(bottomsheet, data) {
        this.bottomsheet = bottomsheet;
        this.data = data;
        console.log(this.data);
    }
    OtherSdgBottomSheetComponent.prototype.ngOnInit = function () {
    };
    OtherSdgBottomSheetComponent.prototype.openLink = function (data) {
        this.bottomsheet.dismiss(data);
    };
    OtherSdgBottomSheetComponent = __decorate([
        core_1.Component({
            selector: 'app-other-sdg-bottom-sheet',
            templateUrl: './other-sdg-bottom-sheet.component.html',
            styleUrls: ['./other-sdg-bottom-sheet.component.scss']
        }),
        __param(1, core_1.Inject(material_1.MAT_BOTTOM_SHEET_DATA))
    ], OtherSdgBottomSheetComponent);
    return OtherSdgBottomSheetComponent;
}());
exports.OtherSdgBottomSheetComponent = OtherSdgBottomSheetComponent;
