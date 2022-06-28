import { FugitiveOilComponent } from "./views/GHG/ghg-inventory/ENERGY/Reference Approach/Sectoral Approach/Energy_Industries/fugitive-oil/fugitive-oil.component";
import { GhgReportComponent } from "./views/ghg-report/ghg-report.component";
import { ReportByGasComponent } from "./views/report-by-gas/report-by-gas.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./guards/auth-guard.service";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { ForgotpasswordComponent } from "./views/forgotpassword/forgotpassword.component";
import { GetotpComponent } from "./views/forgotpassword/getotp/getotp.component";
import { RegisterComponent } from "./views/register/register.component";
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
import { ReferenceApproachComponent } from "./views/reference-approach/reference-approach.component";
import { CreateNdcComponent } from "./views/ndc/create-ndc/create-ndc.component";
import { MitigationProjectInformationComponent } from "./views/Mitigation/mitigation-project-information/mitigation-project-information.component";
import { GhgConfigComponent } from "./views/GHG/ghg-config/ghg-config.component";
import { GhgGlassComponent } from "./views/GHG/ghg-inventory/IPPU/minerral-Industry/ghg-glass/ghg-glass.component";
import { GhgSodaAshComponent } from "./views/GHG/ghg-inventory/IPPU/chemical-industry/ghg-soda-ash/ghg-soda-ash.component";
import { GhgCarbonatesComponent } from "./views/GHG/ghg-inventory/IPPU/minerral-Industry/ghg-carbonates/ghg-carbonates.component";
import { GhgUreaApplicationComponent } from "./views/GHG/ghg-inventory/AFOLU/Aggregate-Sources/ghg-urea-application/ghg-urea-application.component";
import { GhgFugitiveEmissionsFromFuelsNaturalGasComponent } from "./views/GHG/ghg-inventory/ENERGY/Reference Approach/ghg-fugitive-emissions-from-fuels-natural-gas/ghg-fugitive-emissions-from-fuels-natural-gas.component";
import { FugitiveEmissionFactorComponent } from "./views/database/Energy/fugitive-emission-factor/fugitive-emission-factor.component";
import { IndirectEmissionsComponent } from "./views/GHG/ghg-inventory/AFOLU/Aggregate-Sources/indirect-emissions/indirect-emissions.component";
import { DirectEmissionsComponent } from "./views/GHG/ghg-inventory/AFOLU/Aggregate-Sources/direct-emissions/direct-emissions.component";
import { UserManagementComponent } from "./views/user-management/user-management.component";
import { LimingComponent } from "./views/GHG/ghg-inventory/AFOLU/Aggregate-Sources/liming/liming.component";
import { UserProfileComponent } from "./views/user-management/user-profile/user-profile.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "forgotpassword",
    component: ForgotpasswordComponent,
    data: {
      title: "Forgotpassword Page",
    },
    canLoad: [AuthGuardService],
  },
  {
    path: "getotp",
    component: GetotpComponent,
    data: {
      title: "GetOTP Page",
    },
    canLoad: [AuthGuardService],
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404",
    },
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500",
    },
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
    canLoad: [AuthGuardService],
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Registration Page",
    },
    canLoad: [AuthGuardService],
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
        canActivate: [AuthGuardService],
      },

      {
        path: "menu",
        loadChildren: () =>
          import("./views/menu/menu.module").then((m) => m.MenuModule),
        canActivate: [AuthGuardService],
      },
      {
        path: "ndc",
        loadChildren: () =>
          import("./views/ndc/ndc.module").then((m) => m.NdcModule),
        canActivate: [AuthGuardService],
      },

      {
        path: "NDC_Actions",
        component: CreateNdcComponent,
        data: {
          title: "Create Ndc Actions",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "NDC_Actions/:formId/:recordId",
        component: CreateNdcComponent,
        data: {
          title: "Update Ndc Actions",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "NDC_Actions/:formId",
        component: CreateNdcComponent,
        data: {
          title: "Update Ndc Actions",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Reference_Approach",
        component: ReferenceApproachComponent,
        data: {
          title: "GHG Inventory - Energy - Reference Approach",
          menuId:"GHG_Energy_Reference_Approach",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Reference_Approach/:formId/:recordId",
        component: ReferenceApproachComponent,
        data: {
          title: "GHG Inventory - Energy - Reference Approach",
          menuId:"GHG_Energy_Reference_Approach",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Energy_Industries/NaturalGas",
        component: GhgFugitiveEmissionsFromFuelsNaturalGasComponent,
        data: {
          title: "GHG INVENTORY - ENERGY (NATURAL GAS)",
          menuId: "GHG_Energy_Sectoral_Approach_Energy_Industries_NaturalGas",
          subCategory: "1.B.2.b-Natural Gas",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Energy_Industries/NaturalGas/:formId/:recordId",
        component: GhgFugitiveEmissionsFromFuelsNaturalGasComponent,
        data: {
          title: "GHG Inventory - Energy - Energy_Industries - Natural Gas",
          menuId: "GHG_Energy_Sectoral_Approach_Energy_Industries_NaturalGas",
          subCategory: "1.B.2.b-Natural Gas",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Energy_Industries/FugitiveOil",
        component: FugitiveOilComponent,
        data: {
          menuId: "GHG_Energy_Sectoral_Approach_Energy_Industries_FugitiveOil",
          subCategory: "1.B.2.a-Oil",
          title: "GHG INVENTORY - ENERGY (FUGITIVE EMISSION FROM FUEL - OIL)",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Energy_Industries/FugitiveOil/:formId/:recordId",
        component: FugitiveOilComponent,
        data: {
          menuId: "GHG_Energy_Sectoral_Approach_Energy_Industries_FugitiveOil",
          subCategory: "1.B.2.a-Oil",
          title: "GHG INVENTORY - ENERGY (FUGITIVE EMISSION FROM FUEL - OIL)",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Energy_Industries/Electricity_Generation",
        component: ElectricityGenerationComponent,
        data: {
          title:
            "GHG Inventory - Energy - Sectoral Approach - Energy Industries - Electricity Generation",
            menuId:"GHG_Energy_Sectoral_Approach_Energy_Industries_Electricity_Generation",
            subCategory:"1.A.1.a.i-Electricity Generation"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Energy_Industries/Electricity_Generation/:formId/:recordId",
        component: ElectricityGenerationComponent,
        data: {
          title:
            "GHG Inventory - Energy - Sectoral Approach - Energy Industries - Electricity Generation",
            menuId:"GHG_Energy_Sectoral_Approach_Energy_Industries_Electricity_Generation",
            subCategory:"1.A.1.a.i-Electricity Generation"
          },
          canActivate: [AuthGuardService],
        },
        {
          path: "ghg/energy/Sectoral_Approach/Energy_Industries/Production_Solid_Fuels",
          component: PosfComponent,
          data: {
            title:
            "GHG Inventory - Energy - Sectoral Approach - Energy Industries - Production of Solid Fuels",
            menuId:"GHG_Energy_Sectoral_Approach_Energy_Industries_Production_Solid_Fuels",
            subCategory:"1.A.1.c-Manufacture of Solid Fuels and Other Energy Industries"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Energy_Industries/Production_Solid_Fuels/:formId/:recordId",
        component: PosfComponent,
        data: {
          title:
            "GHG Inventory - Energy - Sectoral Approach - Energy Industries - Production of Solid Fuels",
            menuId:"GHG_Energy_Sectoral_Approach_Energy_Industries_Production_Solid_Fuels",
            subCategory:"1.A.1.c-Manufacture of Solid Fuels and Other Energy Industries"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Manufacturing",
        component: ManufacturingComponent,
        data: {
          title: "GHG Inventory - Energy - Sectoral Approach - Manufacturing",
          menuId:"GHG_Energy_Sectoral_Approach_Manufacturing",
          subSector:"1.A.2-Manufacturing Industries and Construction"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Manufacturing/:formId/:recordId",
        component: ManufacturingComponent,
        data: {
          title: "GHG Inventory - Energy - Sectoral Approach - Manufacturing",
          menuId:"GHG_Energy_Sectoral_Approach_Manufacturing",
          subSector:"1.A.2-Manufacturing Industries and Construction"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Transport",
        component: TransportComponent,
        data: {
          title: "GHG Inventory - Energy - Sectoral Approach - Transport",
          menuId:"GHG_Energy_Sectoral_Transport",
          subSector:"1.A.3-Transport"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Transport/:formId/:recordId",
        component: TransportComponent,
        data: {
          title: "GHG Inventory - Energy - Sectoral Approach - Transport",
          menuId:"GHG_Energy_Sectoral_Transport",
          subSector:"1.A.3-Transport"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Others",
        component: OthersComponent,
        data: {
          title: "GHG Inventory - Energy - Sectoral Approach - Others",
          menuId:"GHG_Energy_Sectoral_Others",
          subSector:"1.A.4-Other Sectors"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/energy/Sectoral_Approach/Others/:formId/:recordId",
        component: OthersComponent,
        data: {
          title: "GHG Inventory - Energy - Sectoral Approach - Others",
          menuId:"GHG_Energy_Sectoral_Others",
          subSector:"1.A.4-Other Sectors"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Mineral_Industry/Cement_Production",
        component: CementProductionComponent,
        data: {
          title: "GHG Inventory - IPPU - Mineral Industry - Cement Production",
          menuId:"GHG_IPPU_Mineral_Industry_Cement_Production",
          subSector:"2.A.1-Cement Production"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Mineral_Industry/Cement_Production/:formId/:recordId",
        component: CementProductionComponent,
        data: {
          title: "GHG Inventory - IPPU - Mineral Industry - Cement Production",
          menuId:"GHG_IPPU_Mineral_Industry_Cement_Production",
          subSector:"2.A.1-Cement Production"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Mineral_Industry/Lime_Production",
        component: LimeProductionComponent,
        data: {
          title: "GHG Inventory - IPPU - Mineral Industry - Lime Production",
          menuId:"GHG_IPPU_Mineral_Industry_Lime_Production",
          subSector:"2.A.2-Lime Production"

        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Mineral_Industry/Lime_Production/:formId/:recordId",
        component: LimeProductionComponent,
        data: {
          title: "GHG Inventory - IPPU - Mineral Industry - Lime Production",
          menuId:"GHG_IPPU_Mineral_Industry_Lime_Production",
          subSector:"2.A.2-Lime Production"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Mineral_Industry/Glass_Production",
        component: GhgGlassComponent,
        data: {
          title: "GHG Inventory - IPPU - Mineral Industry - Glass",
          menuId: "GHG_IPPU_Mineral_Industry_Glass_Production",
          subSector: "2.A.3 - Glass Production",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Mineral_Industry/Glass_Production/:formId/:recordId",
        component: GhgGlassComponent,
        data: {
          title: "GHG Inventory - IPPU - Mineral Industry - Glass",
          menuId: "GHG_IPPU_Mineral_Industry_Glass_Production",
          subSector: "2.A.3 - Glass Production",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/chemicalIndustry/soda_ash_production",
        component: GhgSodaAshComponent,
        data: {
          title: "GHG INVENTORY - IPPU (SODA ASH) ",
          menuId: "GHG_IPPU_Chemical_Industry_soda_ash_production",
          subSector: "2.B.7 - Soda Ash Production",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/chemicalIndustry/soda_ash_production/:formId/:recordId",
        component: GhgSodaAshComponent,
        data: {
          title: "GHG Inventory - IPPU - Chemical Industry - Soda Ash",
          menuId: "GHG_IPPU_Chemical_Industry_soda_ash_production",
          subSector: "2.B.7-Soda Ash Production",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Mineral_Industry/carbonate_production",
        component: GhgCarbonatesComponent,
        data: {
          title: "GHG Inventory - IPPU - Mineral Industry - Carbonate",
          menuId: "GHG_IPPU_Mineral_Industry_Carbonate",
          subSector: "2.A.4 - Other Process Uses of Carbonates",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Mineral_Industry/carbonate_production/:formId/:recordId",
        component: GhgCarbonatesComponent,
        data: {
          title: "GHG Inventory - IPPU - Mineral Industry - Carbonate",
          menuId: "GHG_IPPU_Mineral_Industry_Carbonate",
          subSector: "2.A.4 - Other Process Uses of Carbonates",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Non_Energy_product/Lubricant_Use",
        component: LubricantUseComponent,
        data: {
          title:
            "GHG Inventory - IPPU - Non - Energy Products from Fuels and Solvent Use - Lubricant Use",
            menuId:"GHG_IPPU_Non_Energy_product_Lubricant_Use",
            subSector:"2.D.1-Lubricant Use"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Non_Energy_product/Lubricant_Use/:formId/:recordId",
        component: LubricantUseComponent,
        data: {
          title:
            "GHG Inventory - IPPU - Non - Energy Products from Fuels and Solvent Use - Lubricant Use",
            menuId:"GHG_IPPU_Non_Energy_product_Lubricant_Use",
            subSector:"2.D.1-Lubricant Use"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Non_Energy_product/Solvent_Use",
        component: SolventUseComponent,
        data: {
          title:
            "GHG Inventory - IPPU - Non - Energy Products from Fuels and Solvent Use - Solvent Use",
            menuId:"GHG_IPPU_Non_Energy_product_Solvent_Use",
            subSector:"2.D.3-Solvent Use"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Non_Energy_product/Solvent_Use/:formId/:recordId",
        component: SolventUseComponent,
        data: {
          title:
            "GHG Inventory - IPPU - Non - Energy Products from Fuels and Solvent Use - Solvent Use",
            menuId:"GHG_IPPU_Non_Energy_product_Solvent_Use",
            subSector:"2.D.3-Solvent Use"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Product_Substitutes/Refrigeration_Air",
        component: RnacComponent,
        data: {
          title:
            "GHG Inventory - IPPU - Product Uses as Substitutes for Ozone Depleting Substances - Refrigeration and Air Conditioning",
            menuId:"GHG_IPPU_Product_Substitutes_Refrigeration_Air",
            subSector:"2.F.1-Refrigeration and Air Conditioning"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/ippu/Product_Substitutes/Refrigeration_Air/:formId/:recordId",
        component: RnacComponent,
        data: {
          title:
            "GHG Inventory - IPPU - Product Uses as Substitutes for Ozone Depleting Substances - Refrigeration and Air Conditioning",
            menuId:"GHG_IPPU_Product_Substitutes_Refrigeration_Air",
            subSector:"2.F.1-Refrigeration and Air Conditioning"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/AFOLU/Livestock/EntericFermentation",
        component: EntericFermentationComponent,
        data: {
          title: "GHG Inventory - AFOLU - Livestock - Enteric Fermentation",
          menuId:"GHG_AFOLU_Livestock_EntericFermentation",
          subSector:"3.A.1-Enteric Fermentation",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/AFOLU/Livestock/EntericFermentation/:formId/:recordId",
        component: EntericFermentationComponent,
        data: {
          title: "GHG Inventory - AFOLU - Livestock - Enteric Fermentation",
          menuId:"GHG_AFOLU_Livestock_EntericFermentation",
          subSector:"3.A.1-Enteric Fermentation",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/AFOLU/Livestock/ManureManagement",
        component: ManureManagementComponent,
        data: {
          title: "GHG Inventory - AFOLU - Livestock - Manure Management",
          menuId:"GHG_AFOLU_Livestock_ManureManagement",
          subSector:"3.A.2-Manure Management"
        },
      },
      {
        path: "ghg/AFOLU/Livestock/ManureManagement/:formId/:recordId",
        component: ManureManagementComponent,
        data: {
          title: "GHG Inventory - AFOLU - Livestock - Manure Management",
          menuId:"GHG_AFOLU_Livestock_ManureManagement",
          subSector:"3.A.2-Manure Management"
        },
      },
      {
        path: "ghg/AFOLU/Land/ForestLand",
        component: ForestLandComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Forest Land",
          menuId:"GHG_AFOLU_Land_ForestLand",
          subSector:"3.B.1-Forest Land"
        },
      },
      {
        path: "ghg/AFOLU/Land/ForestLand/:formId/:recordId",
        component: ForestLandComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Forest Land",
          menuId:"GHG_AFOLU_Land_ForestLand",
          subSector:"3.B.1-Forest Land"
        },
      },
      {
        path: "ghg/AFOLU/Land/Cropland",
        component: CroplandComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Cropland",
          menuId:"GHG_AFOLU_Land_Cropland",
          subSector:"3.B.2-Cropland"
        },
      },
      {
        path: "ghg/AFOLU/Land/Cropland/:formId/:recordId",
        component: CroplandComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Cropland",
          menuId:"GHG_AFOLU_Land_Cropland",
          subSector:"3.B.2-Cropland"
        },
      },
      {
        path: "ghg/AFOLU/Land/Grassland",
        component: GrasslandComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Grassland",
          menuId:"GHG_AFOLU_Land_Grassland",
          subSector:"3.B.3-Grassland"
        },
      },
      {
        path: "ghg/AFOLU/Land/Grassland/:formId/:recordId",
        component: GrasslandComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Grassland",
          menuId:"GHG_AFOLU_Land_Grassland",
          subSector:"3.B.3-Grassland"
        },
      },
      {
        path: "ghg/AFOLU/Land/Wetland",
        component: WetlandComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Wetland",
          menuId:"GHG_AFOLU_Land_Wetland",
          subSector:"3.B.4-Wetlands"
        },
      },
      {
        path: "ghg/AFOLU/Land/Wetland/:formId/:recordId",
        component: WetlandComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Wetland",
          menuId:"GHG_AFOLU_Land_Wetland",
          subSector:"3.B.4-Wetlands"
        },
      },
      {
        path: "ghg/AFOLU/Land/Settlements",
        component: SettlementsComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Settlements",
          menuId:"GHG_AFOLU_Land_Settlements",
          subSector:"3.B.5-Settlements"
        },
      },
      {
        path: "ghg/AFOLU/Land/Settlements/:formId/:recordId",
        component: SettlementsComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Settlements",
          menuId:"GHG_AFOLU_Land_Settlements",
          subSector:"3.B.5-Settlements"
        },
      },
      {
        path: "ghg/AFOLU/Land/OtherLands",
        component: OtherLandsComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Other Lands",
          menuId:"GHG_AFOLU_Land_OtherLands",
          subSector:"3.B.6-Other Land"
        },
      },
      {
        path: "ghg/AFOLU/Land/OtherLands/:formId/:recordId",
        component: OtherLandsComponent,
        data: {
          title: "GHG Inventory - AFOLU - Land - Other Lands",
          menuId:"GHG_AFOLU_Land_OtherLands",
          subSector:"3.B.6-Other Land"
        },
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Emissions_Biomass",
        component: EfbbComponent,
        data: {
          title:
            "GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Emissions from Biomass Burning",
            menuId:"GHG_AFOLU_Aggregate_nonCO2_Emissions_Biomass",
            subSector:"3.C.1-Emissions from Biomass Burning",
        },
      },

      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Emissions_Biomass/:formId/:recordId",
        component: EfbbComponent,
        data: {
          title:
            "GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Emissions from Biomass Burning",
            menuId:"GHG_AFOLU_Aggregate_nonCO2_Emissions_Biomass",
            subSector:"3.C.1-Emissions from Biomass Burning",
        },
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Indirect_N2O",
        component: InemmComponent,
        data: {
          title:
            "GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Indirect N2O emissions from Manure Management",
            menuId:"GHG_AFOLU_Aggregate_nonCO2_Indirect_N2O",
            subSector:"3.C.6-Indirect N2O emissions from manure management"
        },
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Indirect_N2O/:formId/:recordId",
        component: InemmComponent,
        data: {
          title:
            "GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Indirect N2O emissions from Manure Management",
            menuId:"GHG_AFOLU_Aggregate_nonCO2_Indirect_N2O",
            subSector:"3.C.6-Indirect N2O emissions from manure management"
        },
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Rice_Cultivation",
        component: RiceCultivationComponent,
        data: {
          title:
            "GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Rice Cultivation",
            menuId:"GHG_AFOLU_Aggregate_nonCO2_Rice_Cultivation",
            subSector:"3.C.7-Rice Cultivation",
        },
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Rice_Cultivation/:formId/:recordId",
        component: RiceCultivationComponent,
        data: {
          title:
            "GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Rice Cultivation",
            menuId:"GHG_AFOLU_Aggregate_nonCO2_Rice_Cultivation",
            subSector:"3.C.7-Rice Cultivation",
        },
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Indirect_Emission",
        component: IndirectEmissionsComponent,
        data: {
          title: "INDIRECT EMISSIONS",
          menuId: "GHG_AFOLU_Aggregate_nonCO2_Indirect_Emission",
          subSector:"3.C.6-Indirect N2O emissions from manure management"
        },
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Indirect_Emission/:formId/:recordId",
        component: IndirectEmissionsComponent,
        data: {
          title: "INDIRECT EMISSIONS",
          menuId: "GHG_AFOLU_Aggregate_nonCO2_Indirect_Emission",
          subSector:"3.C.6-Indirect N2O emissions from manure management"
        },
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Direct_Emission",
        component: DirectEmissionsComponent,
        data: {
          title: "GHG INVENTORY - DIRECT N2O EMISSION FROM MANAGED SOIL",
          subTitle: "GHG INVENTORY - DIRECT N<sub>2</sub>O EMISSION FROM MANAGED SOIL",
          menuId: "GHG_AFOLU_Aggregate_nonCO2_Direct_Emission",
          subSector:"3.C.4-Direct N2O emissions from managed soils"
        },
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Direct_Emission/:formId/:recordId",
        component: DirectEmissionsComponent,
        data: {
          title: "GHG INVENTORY - DIRECT N2O EMISSION FROM MANAGED SOIL",
          subTitle: "GHG INVENTORY - DIRECT N<sub>2</sub>O EMISSION FROM MANAGED SOIL",
          menuId: "GHG_AFOLU_Aggregate_nonCO2_Direct_Emission",
          subSector:"3.C.4-Direct N2O emissions from managed soils"
        },
      },

      {
        path: "ghg/AFOLU/Aggregate_nonCO2/liming",
        component: LimingComponent,
        data: {
          title:"GHG Inventory - LIMING",
          menuId:"GHG_AFOLU_Aggregate_nonCO2_Liming",
          subSector:"3.C.2-Liming"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/liming/:formId/:recordId",
        component: LimingComponent,
        data: {
          title:"GHG Inventory - LIMING",
          menuId:"GHG_AFOLU_Aggregate_nonCO2_Liming",
          subSector:"3.C.2-Liming"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Urea_Application",
        component: GhgUreaApplicationComponent,
        data: {
          title:"GHG Inventory - UREA APPLICATION",
          menuId:"GHG_AFOLU_Aggregate_nonCO2_Urea",
          subSector:"3.C.3-Urea Application"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/AFOLU/Aggregate_nonCO2/Urea_Application/:formId/:recordId",
        component: GhgUreaApplicationComponent,
        data: {
          title:"GHG Inventory - UREA APPLICATION",
          menuId:"GHG_AFOLU_Aggregate_nonCO2_Urea",
          subSector:"3.C.3-Urea Application"
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg/Waste/Solid_Waste_Disposal",
        component: SolidwasteDisposalComponent,
        data: {
          title: "GHG Inventory - Waste - Solid Waste Disposal",
          menuId:"GHG_Waste_Solid_Waste_Disposal",
          subSector:"4.A-Solid Waste Disposal"
        },
      },
      {
        path: "ghg/Waste/Solid_Waste_Disposal/:formId/:recordId",
        component: SolidwasteDisposalComponent,
        data: {
          title: "GHG Inventory - Waste - Solid Waste Disposal",
          menuId:"GHG_Waste_Solid_Waste_Disposal",
          subSector:"4.A-Solid Waste Disposal"
        },
      },
      {
        path: "ghg/Waste/Biological_Treatment_SolidWaste",
        component: BtswComponent,
        data: {
          title: "GHG Inventory - Waste - Biological Treatment of Solid Waste",
          menuId:"GHG_Waste_Biological_Treatment_SolidWaste",
          subSector:"4.B-Biological Treatment",
        },
      },
      {
        path: "ghg/Waste/Biological_Treatment_SolidWaste/:formId/:recordId",
        component: BtswComponent,
        data: {
          title: "GHG Inventory - Waste - Biological Treatment of Solid Waste",
          menuId:"GHG_Waste_Biological_Treatment_SolidWaste",
          subSector:"4.B-Biological Treatment",
        },
      },
      {
        path: "ghg/Waste/Incineration_Waste",
        component: IobwComponent,
        data: {
          title:
            "GHG Inventory - Waste - Incineration and Open Burning of Waste",
            menuId:"GHG_Waste_Incineration_Waste",
            subSector:"4.C - Incineration and Open Burning of Waste"
        },
      },
      {
        path: "ghg/Waste/Incineration_Waste/:formId/:recordId",
        component: IobwComponent,
        data: {
          title:
            "GHG Inventory - Waste - Incineration and Open Burning of Waste",
            menuId:"GHG_Waste_Incineration_Waste",
            subSector:"4.C - Incineration and Open Burning of Waste"
        },
      },
      {
        path: "ghg/Waste/Wastewater_Treatment_Discharge",
        component: WtdComponent,
        data: {
          title: "GHG Inventory - Waste - Wastewater Treatment and Discharge",
          menuId:"GHG_Waste_Wastewater_Treatment_Discharge",
          subSector:"4.D - Wastewater Treatment and Discharge"
        },
      },
      {
        path: "ghg/Waste/Wastewater_Treatment_Discharge/:formId/:recordId",
        component: WtdComponent,
        data: {
          title: "GHG Inventory - Waste - Wastewater Treatment and Discharge",
          menuId:"GHG_Waste_Wastewater_Treatment_Discharge",
          subSector:"4.D - Wastewater Treatment and Discharge"
        },
      },
      {
        path: "Mitigation_Actions/ProjectInformation",
        component: MitigationProjectInformationComponent,
        data: {
          title: "Mitigation Action - Project Information",
          menuId: "Mitigation_Actions_ProjectInformation",
          moduleName: "MITIGATION_INPUT",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Mitigation_Actions/ProjectInformation/:formId/:recordId",
        component: MitigationProjectInformationComponent,
        data: {
          title: "Mitigation Action - Project Information",
          menuId: "Mitigation_Actions_ProjectInformation",
          moduleName: "MITIGATION_INPUT",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Mitigation_Actions/MonitoringInformation",
        component: MonitoringInformationComponent,
        data: {
          title: "Mitigation Action - Monitoring Information",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Mitigation_Actions/MonitoringInformation/:formId/:recordId",
        component: MonitoringInformationComponent,
        data: {
          title: "Mitigation Action - Monitoring Information",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Adaptation_Actions/ProjectInformation",
        component: AdaptationProjectinformationComponent,
        data: {
          title: "Adaptation Action - Project Information",
          menuId: "Adaptation_Actions_ProjectInformation",
          moduleName: "ADAPTATION_INPUT",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Adaptation_Actions/ProjectInformation/:formId/:recordId",
        component: AdaptationProjectinformationComponent,
        data: {
          title: "Adaptation Action - Project Information",
          menuId: "Adaptation_Actions_ProjectInformation",
          moduleName: "ADAPTATION_INPUT",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Adaptation_Actions/MonitoringInformation/:formId/:recordId",
        component: AdaptationMonitoringinformationComponent,
        data: {
          title: "Adaptation Action - Monitoring Information",
          menuId: "Adaptation_Actions_MonitoringInformation",
          moduleName: "ADAPTATION_MONITORING",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Adaptation_Actions/MonitoringInformation",
        component: AdaptationMonitoringinformationComponent,
        data: {
          title: "Adaptation Action - Monitoring Information",
          menuId: "Adaptation_Actions_MonitoringInformation",
          moduleName: "ADAPTATION_MONITORING",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Climate_Finance/ProjectInformation",
        component: ClimateProjectinformationComponent,
        data: {
          title: "Climate Finance - Project Information",
          menuId: "Climate_Finance_ProjectInformation",
          moduleName: "FINANCE_INPUT",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Climate_Finance/ProjectInformation/:formId/:recordId",
        component: ClimateProjectinformationComponent,
        data: {
          title: "Climate Finance - Project Information",
          menuId: "Climate_Finance_ProjectInformation",
          moduleName: "FINANCE_INPUT",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Climate_Finance/MonitoringInformation/:formId/:recordId",
        component: ClimateMonitoringinformationComponent,
        data: {
          title: "Climate Finance - Monitoring Information",
          menuId: "Climate_Finance_MonitoringInformation",
          moduleName: "FINANCE_MONITORING",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Climate_Finance/MonitoringInformation",
        component: ClimateMonitoringinformationComponent,
        data: {
          title: "Climate Finance - Monitoring Information",
          menuId: "Climate_Finance_MonitoringInformation",
          moduleName: "FINANCE_MONITORING",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "SDG_Assessment/ProjectInformation",
        component: SdgProjectinformationComponent,
        data: {
          title: "SDG Assessment - Project Information",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "SDG_Assessment/ProjectInformation/:formId/:recordId",
        component: SdgProjectinformationComponent,
        data: {
          title: "SDG Assessment - Project Information",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "SDG_Assessment/MonitoringInformation",
        component: SdgMonitoringinformationComponent,
        data: {
          title: "SDG Assessment - Monitoring Information",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "SDG_Assessment/MonitoringInformation/:formId/:recordId",
        component: SdgMonitoringinformationComponent,
        data: {
          title: "SDG Assessment - Monitoring Information",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Database/Energy/EmissionFactor",
        component: DatabaseEnergyComponent,
        data: {
          title: "Database - Energy - Emission Factor -Fuel",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Database/Energy/FugitiveEmissions",
        component: FugitiveEmissionFactorComponent,
        data: {
          title: "Database - Energy - Emission Factor -Fugitive Emissions",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Database/IPPU/EmissionFactor",
        component: DatabaseIppuComponent,
        data: {
          title: "Database - IPPU - GWP Database - Emission Factor IPPU",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Database/IPPU/GWPDatabase",
        component: GwpDatabaseComponent,
        data: {
          title: "Database - IPPU - GWP Database",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Database/AFOLU/LivestockPopulation",
        component: DatabaseAfoluComponent,
        data: {
          title: "Database Livestock Population",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Database/AFOLU/EmissionFactor",
        component: EmissionfactorLivestockComponent,
        data: {
          title: "Database - AFOLU - Emission Factor - Livestock",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Database/Waste/Population",
        component: WastePopulationComponent,
        data: {
          title: "Database - Waste - Population",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Reports/GHGInventory/Yearwise",
        component: GhginventoryYearwiseComponent,
        data: {
          title: "Reports - GHG Inventory(Year wise)",
        },
        canActivate: [AuthGuardService],
      },

      {
        path: "Reports/MitigationTracking",
        component: MitigationTrackingComponent,
        data: {
          title: "Reports -  Mitigation Tracking",
          menuId: "Reports_MitigationTracking",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Reports/AdaptationTracking",
        component: AdaptationTrackingComponent,
        data: {
          title: "Reports - Adaptation Tracking",
          menuId: "Reports_AdaptationTracking",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Reports/FinanceTracking",
        component: FinanceTrackingComponent,
        data: {
          title: "Reports - Finance tracking",
          menuId: "Reports_FinanceTracking",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Reports/SDGTracking",
        component: SdgTrackingComponent,
        data: {
          title: "Reports - SDG Tracking",
          menuId: "Reports_SDGTracking",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "Reports/MRVTracking",
        component: MrvTrackingComponent,
        data: {
          title: "Reports - MRV Tracking",
          moduleName: "REPORT_MRV_TRACKING",
          menuId: "Reports_MRVTracking",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "userlist",
        component: UserManagementComponent,
        data: {
          title: "User List",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg-reports",
        component: GhgReportComponent,
        data: {
          title: "Ghg Report",
          menuId: "GHG_reports",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "my-approvals",
        component: MyApprovalsComponent,
        data: {
          title: "My Approvals",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "ghg-config",
        component: GhgConfigComponent,
        data: {
          title: "GHG Configuration",
        },
        canActivate: [AuthGuardService],
      },

      // reports
      {
        path: "Reports/GHGInventory/Gaswise",
        component: ReportByGasComponent,
        data: {
          title: "Reports - GHG Inventory - Gas Wise",
        },
        canActivate: [AuthGuardService],
      },
      {
        path: "my-profile",
        component: UserProfileComponent,
        data: {
          title: "My Profile Detiails",
        },
        canActivate: [AuthGuardService],
      },
    ],
  },
  { path: "**", component: P404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
