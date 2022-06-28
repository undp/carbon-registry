"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var menu_component_1 = require("./menu.component");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var ng2_dragula_1 = require("ng2-dragula");
var forms_1 = require("@angular/forms");
var routes = [
    {
        path: '',
        component: menu_component_1.MenuComponent,
        data: {
            title: 'Menu'
        }
    }
];
var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule = __decorate([
        core_1.NgModule({
            declarations: [menu_component_1.MenuComponent],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MatFormFieldModule,
                material_1.MatSelectModule,
                material_1.MatCardModule,
                material_1.MatButtonModule,
                material_1.MatBadgeModule,
                ng2_dragula_1.DragulaModule.forRoot(),
            ]
        })
    ], MenuModule);
    return MenuModule;
}());
exports.MenuModule = MenuModule;
