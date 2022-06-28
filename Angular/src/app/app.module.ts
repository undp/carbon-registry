import { ReportByGasComponent } from "./views/report-by-gas/report-by-gas.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { WindowRef } from "./window.service";
import { AgGridModule } from "ag-grid-angular";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

import { AppComponent } from "./app.component";

// Import containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { ForgotpasswordComponent } from "./views/forgotpassword/forgotpassword.component";
import { RegisterComponent } from "./views/register/register.component";

const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";
import { RouterModule } from "@angular/router";
// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule, ThemeService } from "ng2-charts";
import { HttpClientModule, HTTP_INTERCEPTORS  } from "@angular/common/http";
import { GetotpComponent } from "./views/forgotpassword/getotp/getotp.component";
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatDialogModule,
  MatStepperModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatButtonModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatSelectModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatTabsModule,
  MatBottomSheetModule,
  MatRadioModule,
  MatTreeModule,
  MAT_DATE_LOCALE,
  MatMenuModule,
  MatTooltipModule
} from "@angular/material";
import { CdkTableModule } from "@angular/cdk/table";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";

//Import Routing Components
import { ErrorModule } from "./views/error/error.module";
import { SnackbarDialogComponent } from "./views/modal/snackbar-dialog/snackbar-dialog.component";
import { ReferenceApproachComponent } from "./views/reference-approach/reference-approach.component";
import { ElectricityGenerationComponent } from "./views/electricity-generation/electricity-generation.component";
import { PosfComponent } from "./views/posf/posf.component";
import { ManufacturingComponent } from "./views/manufacturing/manufacturing.component";
import { TransportComponent } from "./views/transport/transport.component";
import { OthersComponent } from "./views/others/others.component";
import { CementProductionComponent } from "./views/cement-production/cement-production.component";
import { LimeProductionComponent } from "./views/lime-production/lime-production.component";
import { LubricantUseComponent } from "./views/lubricant-use/lubricant-use.component";
import { SolventUseComponent } from "./views/solvent-use/solvent-use.component";
import { RnacComponent } from "./views/rnac/rnac.component";
import { EntericFermentationComponent } from "./views/enteric-fermentation/enteric-fermentation.component";
import { ManureManagementComponent } from "./views/manure-management/manure-management.component";
import { ForestLandComponent } from "./views/forest-land/forest-land.component";
import { CroplandComponent } from "./views/cropland/cropland.component";
import { GrasslandComponent } from "./views/grassland/grassland.component";
import { WetlandComponent } from "./views/wetland/wetland.component";
import { SettlementsComponent } from "./views/settlements/settlements.component";
import { OtherLandsComponent } from "./views/other-lands/other-lands.component";
import { EfbbComponent } from "./views/efbb/efbb.component";
import { InemmComponent } from "./views/inemm/inemm.component";
import { RiceCultivationComponent } from "./views/rice-cultivation/rice-cultivation.component";
import { WaisteComponent } from "./views/waiste/waiste.component";
import { SolidwasteDisposalComponent } from "./views/solidwaste-disposal/solidwaste-disposal.component";
import { BtswComponent } from "./views/btsw/btsw.component";
import { IobwComponent } from "./views/iobw/iobw.component";
import { WtdComponent } from "./views/wtd/wtd.component";
import { MonitoringInformationComponent } from "./views/Mitigation/monitoring-information/monitoring-information.component";
import { AdaptationProjectinformationComponent } from "./views/adaptation-projectinformation/adaptation-projectinformation.component";
import { AdaptationMonitoringinformationComponent } from "./views/adaptation-monitoringinformation/adaptation-monitoringinformation.component";
import { ClimateProjectinformationComponent } from "./views/climate-finance/climate-projectinformation/climate-projectinformation.component";
import { ClimateMonitoringinformationComponent } from "./views/climate-finance/climate-monitoringinformation/climate-monitoringinformation.component";
import { SdgProjectinformationComponent } from "./views/sdg-projectinformation/sdg-projectinformation.component";
import { SdgMonitoringinformationComponent } from "./views/sdg/sdg-monitoringinformation/sdg-monitoringinformation.component";
import { DatabaseEnergyComponent } from "./views/database-energy/database-energy.component";
import { DatabaseIppuComponent } from "./views/database-ippu/database-ippu.component";
import { GwpDatabaseComponent } from "./views/gwp-database/gwp-database.component";
import { DatabaseAfoluComponent } from "./views/database-afolu/database-afolu.component";
import { EmissionfactorLivestockComponent } from "./views/emissionfactor-livestock/emissionfactor-livestock.component";
import { WastePopulationComponent } from "./views/waste-population/waste-population.component";
import { GhginventoryYearwiseComponent } from "./views/ghginventory-yearwise/ghginventory-yearwise.component";
import { MitigationTrackingComponent } from "./views/Mitigation/mitigation-tracking/mitigation-tracking.component";
import { AdaptationTrackingComponent } from "./views/adaptation-tracking/adaptation-tracking.component";
import { FinanceTrackingComponent } from "./views/climate-finance/finance-tracking/finance-tracking.component";
import { SdgTrackingComponent } from "./views/sdg/sdg-tracking/sdg-tracking.component";
import { MrvTrackingComponent } from "./views/mrv-tracking/mrv-tracking.component";
import { UserListComponent } from "./views/userlist/userlist.component";
import { MyApprovalsComponent } from "./views/my-approvals/my-approvals.component";
import {
  MatMomentDateModule,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import { FileUploadComponent } from "./views/shared/file-upload/file-upload.component";
import { ReportTableGasComponent } from "./views/report-by-gas/report-table-gas/report-table-gas.component";
import { ChatByGasComponent } from "./views/report-by-gas/chat-by-gas/chat-by-gas.component";
import { TrimDecimalPipe } from "./pipes/trim-decimal.pipe";
import { CreateNdcComponent } from "./views/ndc/create-ndc/create-ndc.component";
import { OtherSdgBottomSheetComponent } from "./views/other-sdg-bottom-sheet/other-sdg-bottom-sheet.component";
import { QuestionComponent } from "./views/question/question.component";
import { OtherSdgComponent } from "./views/sdg-projectinformation/other-sdg/other-sdg.component";
import { MitigationProjectInformationComponent } from "./views/Mitigation/mitigation-project-information/mitigation-project-information.component";
import { NumberDirective } from "./directives/numbersOnly-directive";
import { MultiSelectSearchOption } from "./views/common/multi-select-search-option/multi-select-search-option.component";
import { FinanceReportComponent } from "./views/mrv-tracking/finance-report/finance-report.component";
import { AdaptationReportComponent } from "./views/mrv-tracking/adaptation-report/adaptation-report.component";
import { MitigationReportComponent } from "./views/mrv-tracking/mitigation-report/mitigation-report.component";
import { SdgReportComponent } from "./views/mrv-tracking/sdg-report/sdg-report.component";
import { GhgReportComponent } from "./views/ghg-report/ghg-report.component";
import { GhgReportDataComponent } from "./views/ghg-report/ghg-report-data/ghg-report-data.component";
import { GhgTableComponent } from "./views/ghginventory-yearwise/ghg-table/ghg-table.component";
import { GhgConfigComponent } from "./views/GHG/ghg-config/ghg-config.component";
import { GhgGlassComponent } from "./views/GHG/ghg-inventory/IPPU/minerral-Industry/ghg-glass/ghg-glass.component";
import { GhgCarbonatesComponent } from "./views/GHG/ghg-inventory/IPPU/minerral-Industry/ghg-carbonates/ghg-carbonates.component";
import { GhgUreaApplicationComponent } from "./views/GHG/ghg-inventory/AFOLU/Aggregate-Sources/ghg-urea-application/ghg-urea-application.component";
import { GhgFugitiveEmissionsFromFuelsNaturalGasComponent } from "./views/GHG/ghg-inventory/ENERGY/Reference Approach/ghg-fugitive-emissions-from-fuels-natural-gas/ghg-fugitive-emissions-from-fuels-natural-gas.component";
import { FugitiveOilComponent } from "./views/GHG/ghg-inventory/ENERGY/Reference Approach/Sectoral Approach/Energy_Industries/fugitive-oil/fugitive-oil.component";
import { FugitiveEmissionFactorComponent } from "./views/database/Energy/fugitive-emission-factor/fugitive-emission-factor.component";
import { FugitiveEmissionTableComponent } from "./views/database/Energy/fugitive-emission-factor/fugitive-emission-table/fugitive-emission-table.component";
import { IndirectEmissionsComponent } from "./views/GHG/ghg-inventory/AFOLU/Aggregate-Sources/indirect-emissions/indirect-emissions.component";
import { DirectEmissionsComponent } from "./views/GHG/ghg-inventory/AFOLU/Aggregate-Sources/direct-emissions/direct-emissions.component";
import { ScreenAccessComponent } from "./views/screen-access/screen-access.component";
import { GhgSodaAshComponent } from "./views/GHG/ghg-inventory/IPPU/chemical-industry/ghg-soda-ash/ghg-soda-ash.component";
import { UserManagementComponent } from "./views/user-management/user-management.component";
import { ActionRendererComponent } from "./views/user-management/action-renderer/action-renderer.component";
import { UserAccessRendererComponent } from "./views/user-management/user-access-renderer/user-access-renderer.component";
import { DataTableComponent } from './shared/data-table/data-table.component';
import { MockHttpCalIInterceptor } from "./http.interceptor";
import { LimingComponent } from './views/GHG/ghg-inventory/AFOLU/Aggregate-Sources/liming/liming.component';
import { GhgReportTableComponent } from './views/GHG/ghg-report/ghg-report-table/ghg-report-table.component';
import { GhgReportChatComponent } from './views/GHG/ghg-report/ghg-report-chat/ghg-report-chat.component';
import { YearWiseChartComponent } from './views/ghginventory-yearwise/year-wise-chart/year-wise-chart.component';
import { UserProfileComponent } from './views/user-management/user-profile/user-profile.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule,
    ChartsModule,
    ErrorModule,
    AgGridModule.withComponents([
      ActionRendererComponent,
      UserAccessRendererComponent,
    ]),

    //Internal Modules
    // Material design module
    MatFormFieldModule,
    MatIconModule,
    CdkTableModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatStepperModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatTabsModule,
    MatExpansionModule,
    MatBottomSheetModule,
    NgxMatSelectSearchModule,
    MatRadioModule,
    MatTreeModule,
    MatMenuModule,
    MatTooltipModule
  ],
  declarations: [
    ChatByGasComponent,
    AppComponent,
    P500Component,
    LoginComponent,
    ForgotpasswordComponent,
    RegisterComponent,
    GetotpComponent,
    SnackbarDialogComponent,
    SnackbarDialogComponent,
    DefaultLayoutComponent,
    CreateNdcComponent,
    ReferenceApproachComponent,
    ElectricityGenerationComponent,
    PosfComponent,
    ManufacturingComponent,
    TransportComponent,
    OthersComponent,
    CementProductionComponent,
    LimeProductionComponent,
    LubricantUseComponent,
    SolventUseComponent,
    RnacComponent,
    EntericFermentationComponent,
    ManureManagementComponent,
    ForestLandComponent,
    CroplandComponent,
    GrasslandComponent,
    WetlandComponent,
    SettlementsComponent,
    OtherLandsComponent,
    EfbbComponent,
    InemmComponent,
    RiceCultivationComponent,
    WaisteComponent,
    SolidwasteDisposalComponent,
    BtswComponent,
    IobwComponent,
    WtdComponent,
    MonitoringInformationComponent,
    AdaptationProjectinformationComponent,
    AdaptationMonitoringinformationComponent,
    ClimateProjectinformationComponent,
    ClimateMonitoringinformationComponent,
    SdgProjectinformationComponent,
    SdgMonitoringinformationComponent,
    DatabaseEnergyComponent,
    DatabaseIppuComponent,
    GwpDatabaseComponent,
    DatabaseAfoluComponent,
    EmissionfactorLivestockComponent,
    WastePopulationComponent,
    GhginventoryYearwiseComponent,
    MitigationTrackingComponent,
    AdaptationTrackingComponent,
    FinanceTrackingComponent,
    SdgTrackingComponent,
    MrvTrackingComponent,
    UserListComponent,
    MyApprovalsComponent,
    FileUploadComponent,
    ReportByGasComponent,
    ReportTableGasComponent,
    TrimDecimalPipe,
    OtherSdgBottomSheetComponent,
    QuestionComponent,
    OtherSdgComponent,
    MitigationProjectInformationComponent,
    NumberDirective,
    MultiSelectSearchOption,
    FinanceReportComponent,
    AdaptationReportComponent,
    MitigationReportComponent,
    SdgReportComponent,
    GhgReportComponent,
    GhgReportDataComponent,
    GhgTableComponent,
    GhgConfigComponent,
    GhgGlassComponent,
    GhgSodaAshComponent,
    GhgCarbonatesComponent,
    GhgUreaApplicationComponent,
    GhgFugitiveEmissionsFromFuelsNaturalGasComponent,
    FugitiveOilComponent,
    FugitiveEmissionFactorComponent,
    FugitiveEmissionTableComponent,
    IndirectEmissionsComponent,
    DirectEmissionsComponent,
    ScreenAccessComponent,
    UserManagementComponent,
    ActionRendererComponent,
    UserAccessRendererComponent,
    DataTableComponent,
    LimingComponent,
    GhgReportTableComponent,
    GhgReportChatComponent,
    YearWiseChartComponent,
    UserProfileComponent,
  ],
  entryComponents: [
    SnackbarDialogComponent,
    OtherSdgBottomSheetComponent,
    ScreenAccessComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockHttpCalIInterceptor,
      multi: true
    },
    ThemeService,
    WindowRef,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
