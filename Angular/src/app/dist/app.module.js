"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var report_by_gas_component_1 = require("./views/report-by-gas/report-by-gas.component");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var app_component_1 = require("./app.component");
// Import containers
var containers_1 = require("./containers");
var _500_component_1 = require("./views/error/500.component");
var login_component_1 = require("./views/login/login.component");
var forgotpassword_component_1 = require("./views/forgotpassword/forgotpassword.component");
var register_component_1 = require("./views/register/register.component");
var APP_CONTAINERS = [
    containers_1.DefaultLayoutComponent
];
var angular_1 = require("@coreui/angular");
// Import routing module
var app_routing_1 = require("./app.routing");
var router_1 = require("@angular/router");
// Import 3rd party components
var dropdown_1 = require("ngx-bootstrap/dropdown");
var tabs_1 = require("ngx-bootstrap/tabs");
var ng2_charts_1 = require("ng2-charts");
var http_1 = require("@angular/common/http");
var getotp_component_1 = require("./views/forgotpassword/getotp/getotp.component");
var material_1 = require("@angular/material");
var table_1 = require("@angular/cdk/table");
var error_module_1 = require("./views/error/error.module");
var manage_path_dialog_component_1 = require("./views/modal/manage-path-dialog/manage-path-dialog.component");
var manage_attraction_dialog_component_1 = require("./views/modal/manage-attraction-dialog/manage-attraction-dialog.component");
var snackbar_dialog_component_1 = require("./views/modal/snackbar-dialog/snackbar-dialog.component");
var add_place_component_1 = require("./views/modal/add-place/add-place.component");
var ghg_inventory_component_1 = require("./views/ghg-inventory/ghg-inventory.component");
var energy_component_1 = require("./views/energy/energy.component");
var reference_approach_component_1 = require("./views/reference-approach/reference-approach.component");
var sectoral_approach_component_1 = require("./views/sectoral-approach/sectoral-approach.component");
var energy_industry_component_1 = require("./views/energy-industry/energy-industry.component");
var electricity_generation_component_1 = require("./views/electricity-generation/electricity-generation.component");
var posf_component_1 = require("./views/posf/posf.component");
var manufacturing_component_1 = require("./views/manufacturing/manufacturing.component");
var transport_component_1 = require("./views/transport/transport.component");
var others_component_1 = require("./views/others/others.component");
var ippu_component_1 = require("./views/ippu/ippu.component");
var mineral_industry_component_1 = require("./views/mineral-industry/mineral-industry.component");
var npffsu_component_1 = require("./views/npffsu/npffsu.component");
var cement_production_component_1 = require("./views/cement-production/cement-production.component");
var lime_production_component_1 = require("./views/lime-production/lime-production.component");
var lubricant_use_component_1 = require("./views/lubricant-use/lubricant-use.component");
var solvent_use_component_1 = require("./views/solvent-use/solvent-use.component");
var pusods_component_1 = require("./views/pusods/pusods.component");
var rnac_component_1 = require("./views/rnac/rnac.component");
var afolu_component_1 = require("./views/afolu/afolu.component");
var livestock_component_1 = require("./views/livestock/livestock.component");
var land_component_1 = require("./views/land/land.component");
var enteric_fermentation_component_1 = require("./views/enteric-fermentation/enteric-fermentation.component");
var manure_management_component_1 = require("./views/manure-management/manure-management.component");
var forest_land_component_1 = require("./views/forest-land/forest-land.component");
var cropland_component_1 = require("./views/cropland/cropland.component");
var grassland_component_1 = require("./views/grassland/grassland.component");
var wetland_component_1 = require("./views/wetland/wetland.component");
var settlements_component_1 = require("./views/settlements/settlements.component");
var other_lands_component_1 = require("./views/other-lands/other-lands.component");
var asnesol_component_1 = require("./views/asnesol/asnesol.component");
var efbb_component_1 = require("./views/efbb/efbb.component");
var inemm_component_1 = require("./views/inemm/inemm.component");
var rice_cultivation_component_1 = require("./views/rice-cultivation/rice-cultivation.component");
var waiste_component_1 = require("./views/waiste/waiste.component");
var waste_component_1 = require("./views/waste/waste.component");
var solidwaste_disposal_component_1 = require("./views/solidwaste-disposal/solidwaste-disposal.component");
var btsw_component_1 = require("./views/btsw/btsw.component");
var iobw_component_1 = require("./views/iobw/iobw.component");
var wtd_component_1 = require("./views/wtd/wtd.component");
var mitigation_actions_component_1 = require("./views/mitigation-actions/mitigation-actions.component");
var project_information_component_1 = require("./views/project-information/project-information.component");
var monitoring_information_component_1 = require("./views/monitoring-information/monitoring-information.component");
var adaptation_actions_component_1 = require("./views/adaptation-actions/adaptation-actions.component");
var adaptation_projectinformation_component_1 = require("./views/adaptation-projectinformation/adaptation-projectinformation.component");
var adaptation_monitoringinformation_component_1 = require("./views/adaptation-monitoringinformation/adaptation-monitoringinformation.component");
var climate_finance_component_1 = require("./views/climate-finance/climate-finance.component");
var climate_projectinformation_component_1 = require("./views/climate-projectinformation/climate-projectinformation.component");
var climate_monitoringinformation_component_1 = require("./views/climate-monitoringinformation/climate-monitoringinformation.component");
var sdg_assessment_component_1 = require("./views/sdg-assessment/sdg-assessment.component");
var sdg_projectinformation_component_1 = require("./views/sdg-projectinformation/sdg-projectinformation.component");
var sdg_monitoringinformation_component_1 = require("./views/sdg-monitoringinformation/sdg-monitoringinformation.component");
var database_component_1 = require("./views/database/database.component");
var database_energy_component_1 = require("./views/database-energy/database-energy.component");
var emissionfactor_fuel_component_1 = require("./views/emissionfactor-fuel/emissionfactor-fuel.component");
var database_ippu_component_1 = require("./views/database-ippu/database-ippu.component");
var emissionfactor_ippu_component_1 = require("./views/emissionfactor-ippu/emissionfactor-ippu.component");
var gwp_database_component_1 = require("./views/gwp-database/gwp-database.component");
var database_afolu_component_1 = require("./views/database-afolu/database-afolu.component");
var livestock_population_component_1 = require("./views/livestock-population/livestock-population.component");
var emissionfactor_livestock_component_1 = require("./views/emissionfactor-livestock/emissionfactor-livestock.component");
var database_waste_component_1 = require("./views/database-waste/database-waste.component");
var waste_population_component_1 = require("./views/waste-population/waste-population.component");
var reports_component_1 = require("./views/reports/reports.component");
var reports_ghginventory_component_1 = require("./views/reports-ghginventory/reports-ghginventory.component");
var ghginventory_yearwise_component_1 = require("./views/ghginventory-yearwise/ghginventory-yearwise.component");
var mitigation_tracking_component_1 = require("./views/mitigation-tracking/mitigation-tracking.component");
var adaptation_tracking_component_1 = require("./views/adaptation-tracking/adaptation-tracking.component");
var finance_tracking_component_1 = require("./views/finance-tracking/finance-tracking.component");
var sdg_tracking_component_1 = require("./views/sdg-tracking/sdg-tracking.component");
var mrv_tracking_component_1 = require("./views/mrv-tracking/mrv-tracking.component");
var userlist_component_1 = require("./views/userlist/userlist.component");
var my_approvals_component_1 = require("./views/my-approvals/my-approvals.component");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var file_upload_component_1 = require("./views/shared/file-upload/file-upload.component");
var report_table_gas_component_1 = require("./views/report-by-gas/report-table-gas/report-table-gas.component");
var chat_by_gas_component_1 = require("./views/report-by-gas/chat-by-gas/chat-by-gas.component");
var trim_decimal_pipe_1 = require("./pipes/trim-decimal.pipe");
var create_ndc_component_1 = require("./views/ndc/create-ndc/create-ndc.component");
var show_ndc_component_1 = require("./views/ndc/show-ndc/show-ndc.component");
var other_sdg_bottom_sheet_component_1 = require("./views/other-sdg-bottom-sheet/other-sdg-bottom-sheet.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule, forms_1.ReactiveFormsModule,
                app_routing_1.AppRoutingModule,
                http_1.HttpClientModule,
                angular_1.AppAsideModule,
                angular_1.AppBreadcrumbModule.forRoot(),
                angular_1.AppFooterModule,
                angular_1.AppHeaderModule,
                angular_1.AppSidebarModule,
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                dropdown_1.BsDropdownModule.forRoot(),
                tabs_1.TabsModule.forRoot(),
                router_1.RouterModule,
                ng2_charts_1.ChartsModule,
                error_module_1.ErrorModule,
                //Internal Modules
                // BaseModule,
                // Material design module 
                material_1.MatFormFieldModule,
                material_1.MatIconModule,
                table_1.CdkTableModule,
                material_1.MatInputModule,
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                material_1.MatSortModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatDialogModule,
                material_1.MatStepperModule,
                material_1.MatCardModule,
                material_1.MatDividerModule,
                material_1.MatListModule,
                material_1.MatButtonModule,
                material_1.MatExpansionModule,
                material_1.MatSnackBarModule,
                material_1.MatSelectModule,
                material_1.MatToolbarModule,
                material_1.MatDatepickerModule,
                material_moment_adapter_1.MatMomentDateModule,
                material_1.MatCheckboxModule,
                material_1.MatTabsModule,
                material_1.MatExpansionModule,
                material_1.MatBottomSheetModule
            ],
            declarations: [
                chat_by_gas_component_1.ChatByGasComponent,
                app_component_1.AppComponent,
                _500_component_1.P500Component,
                login_component_1.LoginComponent,
                forgotpassword_component_1.ForgotpasswordComponent,
                register_component_1.RegisterComponent,
                getotp_component_1.GetotpComponent,
                manage_path_dialog_component_1.ManagePathDialogComponent,
                manage_attraction_dialog_component_1.ManageAttractionDialogComponent,
                snackbar_dialog_component_1.SnackbarDialogComponent,
                add_place_component_1.AddPlaceComponent,
                snackbar_dialog_component_1.SnackbarDialogComponent,
                containers_1.DefaultLayoutComponent,
                create_ndc_component_1.CreateNdcComponent,
                show_ndc_component_1.ShowNdcComponent,
                ghg_inventory_component_1.GhgInventoryComponent,
                energy_component_1.EnergyComponent,
                reference_approach_component_1.ReferenceApproachComponent,
                sectoral_approach_component_1.SectoralApproachComponent,
                energy_industry_component_1.EnergyIndustryComponent,
                electricity_generation_component_1.ElectricityGenerationComponent,
                posf_component_1.PosfComponent,
                manufacturing_component_1.ManufacturingComponent,
                transport_component_1.TransportComponent,
                others_component_1.OthersComponent,
                ippu_component_1.IppuComponent,
                mineral_industry_component_1.MineralIndustryComponent,
                npffsu_component_1.NpffsuComponent,
                cement_production_component_1.CementProductionComponent,
                lime_production_component_1.LimeProductionComponent,
                lubricant_use_component_1.LubricantUseComponent,
                solvent_use_component_1.SolventUseComponent,
                pusods_component_1.PusodsComponent,
                rnac_component_1.RnacComponent,
                afolu_component_1.AfoluComponent,
                livestock_component_1.LivestockComponent,
                land_component_1.LandComponent,
                enteric_fermentation_component_1.EntericFermentationComponent,
                manure_management_component_1.ManureManagementComponent,
                forest_land_component_1.ForestLandComponent,
                cropland_component_1.CroplandComponent,
                grassland_component_1.GrasslandComponent,
                wetland_component_1.WetlandComponent,
                settlements_component_1.SettlementsComponent,
                other_lands_component_1.OtherLandsComponent,
                asnesol_component_1.AsnesolComponent,
                efbb_component_1.EfbbComponent,
                inemm_component_1.InemmComponent,
                rice_cultivation_component_1.RiceCultivationComponent,
                waiste_component_1.WaisteComponent,
                waste_component_1.WasteComponent,
                solidwaste_disposal_component_1.SolidwasteDisposalComponent,
                btsw_component_1.BtswComponent,
                iobw_component_1.IobwComponent,
                wtd_component_1.WtdComponent,
                mitigation_actions_component_1.MitigationActionsComponent,
                project_information_component_1.ProjectInformationComponent,
                monitoring_information_component_1.MonitoringInformationComponent,
                adaptation_actions_component_1.AdaptationActionsComponent,
                adaptation_projectinformation_component_1.AdaptationProjectinformationComponent,
                adaptation_monitoringinformation_component_1.AdaptationMonitoringinformationComponent,
                climate_finance_component_1.ClimateFinanceComponent,
                climate_projectinformation_component_1.ClimateProjectinformationComponent,
                climate_monitoringinformation_component_1.ClimateMonitoringinformationComponent,
                sdg_assessment_component_1.SdgAssessmentComponent,
                sdg_projectinformation_component_1.SdgProjectinformationComponent,
                sdg_monitoringinformation_component_1.SdgMonitoringinformationComponent,
                database_component_1.DatabaseComponent,
                database_energy_component_1.DatabaseEnergyComponent,
                emissionfactor_fuel_component_1.EmissionfactorFuelComponent,
                database_ippu_component_1.DatabaseIppuComponent,
                emissionfactor_ippu_component_1.EmissionfactorIppuComponent,
                gwp_database_component_1.GwpDatabaseComponent,
                database_afolu_component_1.DatabaseAfoluComponent,
                livestock_population_component_1.LivestockPopulationComponent,
                emissionfactor_livestock_component_1.EmissionfactorLivestockComponent,
                database_waste_component_1.DatabaseWasteComponent,
                waste_population_component_1.WastePopulationComponent,
                reports_component_1.ReportsComponent,
                reports_ghginventory_component_1.ReportsGhginventoryComponent,
                ghginventory_yearwise_component_1.GhginventoryYearwiseComponent,
                mitigation_tracking_component_1.MitigationTrackingComponent,
                adaptation_tracking_component_1.AdaptationTrackingComponent,
                finance_tracking_component_1.FinanceTrackingComponent,
                sdg_tracking_component_1.SdgTrackingComponent,
                mrv_tracking_component_1.MrvTrackingComponent,
                userlist_component_1.UserlistComponent,
                my_approvals_component_1.MyApprovalsComponent,
                file_upload_component_1.FileUploadComponent,
                report_by_gas_component_1.ReportByGasComponent,
                report_table_gas_component_1.ReportTableGasComponent,
                trim_decimal_pipe_1.TrimDecimalPipe,
                other_sdg_bottom_sheet_component_1.OtherSdgBottomSheetComponent
            ],
            entryComponents: [manage_path_dialog_component_1.ManagePathDialogComponent, manage_attraction_dialog_component_1.ManageAttractionDialogComponent, snackbar_dialog_component_1.SnackbarDialogComponent, add_place_component_1.AddPlaceComponent, other_sdg_bottom_sheet_component_1.OtherSdgBottomSheetComponent],
            providers: [{
                    provide: common_1.LocationStrategy,
                    useClass: common_1.HashLocationStrategy
                }, ng2_charts_1.ThemeService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
