"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NdcModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var ndc_component_1 = require("./ndc.component");
var table_1 = require("@angular/cdk/table");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var routes = [
    {
        path: '',
        component: ndc_component_1.NdcComponent,
        data: {
            title: 'Ndc Actions'
        },
        children: [
            {
                path: 'ndc',
                component: ndc_component_1.NdcComponent,
                data: {
                    title: 'Ndc Actions'
                }
            }
        ]
    }
];
var NdcModule = /** @class */ (function () {
    function NdcModule() {
    }
    NdcModule = __decorate([
        core_1.NgModule({
            declarations: [ndc_component_1.NdcComponent],
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(routes),
                forms_1.FormsModule, forms_1.ReactiveFormsModule,
                //
                table_1.CdkTableModule,
                material_1.MatInputModule,
                material_1.MatSelectModule,
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                material_1.MatSortModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatFormFieldModule,
                material_1.MatExpansionModule,
                material_1.MatDividerModule,
                material_1.MatListModule,
                material_1.MatStepperModule,
                material_1.MatTabsModule,
                material_1.MatButtonModule,
                material_1.MatDatepickerModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatIconModule,
                material_1.MatPaginatorModule
            ]
        })
    ], NdcModule);
    return NdcModule;
}());
exports.NdcModule = NdcModule;
