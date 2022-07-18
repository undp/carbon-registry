"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = exports.routes = void 0;
var report_by_gas_component_1 = require("./views/report-by-gas/report-by-gas.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Import Containers
var containers_1 = require("./containers");
var _404_component_1 = require("./views/error/404.component");
var _500_component_1 = require("./views/error/500.component");
var login_component_1 = require("./views/login/login.component");
var forgotpassword_component_1 = require("./views/forgotpassword/forgotpassword.component");
var getotp_component_1 = require("./views/forgotpassword/getotp/getotp.component");
var register_component_1 = require("./views/register/register.component");
var electricity_generation_component_1 = require("./views/electricity-generation/electricity-generation.component");
var posf_component_1 = require("./views/posf/posf.component");
var manufacturing_component_1 = require("./views/manufacturing/manufacturing.component");
var transport_component_1 = require("./views/transport/transport.component");
var others_component_1 = require("./views/others/others.component");
var cement_production_component_1 = require("./views/cement-production/cement-production.component");
var lime_production_component_1 = require("./views/lime-production/lime-production.component");
var lubricant_use_component_1 = require("./views/lubricant-use/lubricant-use.component");
var solvent_use_component_1 = require("./views/solvent-use/solvent-use.component");
var rnac_component_1 = require("./views/rnac/rnac.component");
var enteric_fermentation_component_1 = require("./views/enteric-fermentation/enteric-fermentation.component");
var manure_management_component_1 = require("./views/manure-management/manure-management.component");
var forest_land_component_1 = require("./views/forest-land/forest-land.component");
var cropland_component_1 = require("./views/cropland/cropland.component");
var grassland_component_1 = require("./views/grassland/grassland.component");
var wetland_component_1 = require("./views/wetland/wetland.component");
var settlements_component_1 = require("./views/settlements/settlements.component");
var other_lands_component_1 = require("./views/other-lands/other-lands.component");
var efbb_component_1 = require("./views/efbb/efbb.component");
var inemm_component_1 = require("./views/inemm/inemm.component");
var rice_cultivation_component_1 = require("./views/rice-cultivation/rice-cultivation.component");
var solidwaste_disposal_component_1 = require("./views/solidwaste-disposal/solidwaste-disposal.component");
var btsw_component_1 = require("./views/btsw/btsw.component");
var iobw_component_1 = require("./views/iobw/iobw.component");
var wtd_component_1 = require("./views/wtd/wtd.component");
var project_information_component_1 = require("./views/project-information/project-information.component");
var monitoring_information_component_1 = require("./views/monitoring-information/monitoring-information.component");
var adaptation_projectinformation_component_1 = require("./views/adaptation-projectinformation/adaptation-projectinformation.component");
var adaptation_monitoringinformation_component_1 = require("./views/adaptation-monitoringinformation/adaptation-monitoringinformation.component");
var climate_projectinformation_component_1 = require("./views/climate-projectinformation/climate-projectinformation.component");
var climate_monitoringinformation_component_1 = require("./views/climate-monitoringinformation/climate-monitoringinformation.component");
var sdg_projectinformation_component_1 = require("./views/sdg-projectinformation/sdg-projectinformation.component");
var sdg_monitoringinformation_component_1 = require("./views/sdg-monitoringinformation/sdg-monitoringinformation.component");
var database_energy_component_1 = require("./views/database-energy/database-energy.component");
var database_ippu_component_1 = require("./views/database-ippu/database-ippu.component");
var gwp_database_component_1 = require("./views/gwp-database/gwp-database.component");
var database_afolu_component_1 = require("./views/database-afolu/database-afolu.component");
var emissionfactor_livestock_component_1 = require("./views/emissionfactor-livestock/emissionfactor-livestock.component");
var waste_population_component_1 = require("./views/waste-population/waste-population.component");
var ghginventory_yearwise_component_1 = require("./views/ghginventory-yearwise/ghginventory-yearwise.component");
var mitigation_tracking_component_1 = require("./views/mitigation-tracking/mitigation-tracking.component");
var adaptation_tracking_component_1 = require("./views/adaptation-tracking/adaptation-tracking.component");
var finance_tracking_component_1 = require("./views/finance-tracking/finance-tracking.component");
var sdg_tracking_component_1 = require("./views/sdg-tracking/sdg-tracking.component");
var mrv_tracking_component_1 = require("./views/mrv-tracking/mrv-tracking.component");
var userlist_component_1 = require("./views/userlist/userlist.component");
var my_approvals_component_1 = require("./views/my-approvals/my-approvals.component");
var reference_approach_component_1 = require("./views/reference-approach/reference-approach.component");
var create_ndc_component_1 = require("./views/ndc/create-ndc/create-ndc.component");
exports.routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'forgotpassword',
        component: forgotpassword_component_1.ForgotpasswordComponent,
        data: {
            title: 'Forgotpassword Page'
        }
    },
    {
        path: 'getotp',
        component: getotp_component_1.GetotpComponent,
        data: {
            title: 'GetOTP Page'
        }
    },
    {
        path: '404',
        component: _404_component_1.P404Component,
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '500',
        component: _500_component_1.P500Component,
        data: {
            title: 'Page 500'
        }
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        data: {
            title: 'Login Page'
        }
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent,
        data: {
            title: 'Registration Page'
        }
    },
    {
        path: '',
        component: containers_1.DefaultLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; }); }
            },
            {
                path: 'menu',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/menu/menu.module'); }).then(function (m) { return m.MenuModule; }); }
            },
            {
                path: 'ndc',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/ndc/ndc.module'); }).then(function (m) { return m.NdcModule; }); }
            },
            {
                path: 'master',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/base/base.module'); }).then(function (m) { return m.BaseModule; }); }
            },
            {
                path: 'user',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/user-management/user-management.module'); }).then(function (m) { return m.UserManagementModule; }); }
            },
            {
                path: 'trip',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/trip-management/trip-management.module'); }).then(function (m) { return m.TripManagementModule; }); }
            },
            {
                path: 'alert',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/alert-management/alert-management.module'); }).then(function (m) { return m.AlertManagementModule; }); }
            },
            {
                path: 'feedback',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./views/feedback-management/feedback-management.module'); }).then(function (m) { return m.FeedbackManagementModule; }); }
            },
            {
                path: 'NDC_Actions',
                component: create_ndc_component_1.CreateNdcComponent,
                data: {
                    title: 'Create Ndc Actions'
                }
            },
            {
                path: 'NDC_Actions/:formId/:recordId',
                component: create_ndc_component_1.CreateNdcComponent,
                data: {
                    title: 'Update Ndc Actions'
                }
            },
            {
                path: 'NDC_Actions/:formId',
                component: create_ndc_component_1.CreateNdcComponent,
                data: {
                    title: 'Update Ndc Actions'
                }
            },
            {
                path: 'ghg/energy/Reference_Approach',
                component: reference_approach_component_1.ReferenceApproachComponent,
                data: {
                    title: 'GHG Inventory - Energy - Reference Approach'
                }
            },
            {
                path: 'ghg/energy/Reference_Approach/:formId/:recordId',
                component: reference_approach_component_1.ReferenceApproachComponent,
                data: {
                    title: 'GHG Inventory - Energy - Reference Approach'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Energy_Industries/Electricity_Generation',
                component: electricity_generation_component_1.ElectricityGenerationComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Energy Industries - Electricity Generation'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Energy_Industries/Electricity_Generation/:formId/:recordId',
                component: electricity_generation_component_1.ElectricityGenerationComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Energy Industries - Electricity Generation'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Energy_Industries/Production_Solid_Fuels',
                component: posf_component_1.PosfComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Energy Industries - Production of Solid Fuels'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Energy_Industries/Production_Solid_Fuels/:formId/:recordId',
                component: posf_component_1.PosfComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Energy Industries - Production of Solid Fuels'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Manufacturing',
                component: manufacturing_component_1.ManufacturingComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Manufacturing'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Manufacturing/:formId/:recordId',
                component: manufacturing_component_1.ManufacturingComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Manufacturing'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Transport',
                component: transport_component_1.TransportComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Transport'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Transport/:formId/:recordId',
                component: transport_component_1.TransportComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Transport'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Others',
                component: others_component_1.OthersComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Others'
                }
            },
            {
                path: 'ghg/energy/Sectoral_Approach/Others/:formId/:recordId',
                component: others_component_1.OthersComponent,
                data: {
                    title: 'GHG Inventory - Energy - Sectoral Approach - Others'
                }
            },
            {
                path: 'ghg/ippu/Mineral_Industry/Cement_Production/:formId/:recordId',
                component: cement_production_component_1.CementProductionComponent,
                data: {
                    title: 'GHG Inventory - IPPU - Mineral Industry - Cement Production'
                }
            },
            {
                path: 'ghg/ippu/Mineral_Industry/Lime_Production',
                component: lime_production_component_1.LimeProductionComponent,
                data: {
                    title: 'GHG Inventory - IPPU - Mineral Industry - Lime Production'
                }
            },
            {
                path: 'ghg/ippu/Mineral_Industry/Lime_Production/:formId/:recordId',
                component: lime_production_component_1.LimeProductionComponent,
                data: {
                    title: 'GHG Inventory - IPPU - Mineral Industry - Lime Production'
                }
            },
            {
                path: 'ghg/ippu/Non_Energy_product/Lubricant_Use',
                component: lubricant_use_component_1.LubricantUseComponent,
                data: {
                    title: 'GHG Inventory - IPPU - Non - Energy Products from Fuels and Solvent Use - Lubricant Use'
                }
            },
            {
                path: 'ghg/ippu/Non_Energy_product/Lubricant_Use/:formId/:recordId',
                component: lubricant_use_component_1.LubricantUseComponent,
                data: {
                    title: 'GHG Inventory - IPPU - Non - Energy Products from Fuels and Solvent Use - Lubricant Use'
                }
            },
            {
                path: 'ghg/ippu/Non_Energy_product/Solvent_Use',
                component: solvent_use_component_1.SolventUseComponent,
                data: {
                    title: 'GHG Inventory - IPPU - Non - Energy Products from Fuels and Solvent Use - Solvent Use'
                }
            },
            {
                path: 'ghg/ippu/Non_Energy_product/Solvent_Use/:formId/:recordId',
                component: solvent_use_component_1.SolventUseComponent,
                data: {
                    title: 'GHG Inventory - IPPU - Non - Energy Products from Fuels and Solvent Use - Solvent Use'
                }
            },
            {
                path: 'ghg/ippu/Product_Substitutes/Refrigeration_Air',
                component: rnac_component_1.RnacComponent,
                data: {
                    title: 'GHG Inventory - IPPU - Product Uses as Substitutes for Ozone Depleting Substances - Refrigeration and Air Conditioning'
                }
            },
            {
                path: 'ghg/ippu/Product_Substitutes/Refrigeration_Air/:formId/:recordId',
                component: rnac_component_1.RnacComponent,
                data: {
                    title: 'GHG Inventory - IPPU - Product Uses as Substitutes for Ozone Depleting Substances - Refrigeration and Air Conditioning'
                }
            },
            {
                path: 'ghg/AFOLU/Livestock/EntericFermentation',
                component: enteric_fermentation_component_1.EntericFermentationComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Livestock - Enteric Fermentation'
                }
            },
            {
                path: 'ghg/AFOLU/Livestock/EntericFermentation/:formId/:recordId',
                component: enteric_fermentation_component_1.EntericFermentationComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Livestock - Enteric Fermentation'
                }
            },
            {
                path: 'ghg/AFOLU/Livestock/ManureManagement',
                component: manure_management_component_1.ManureManagementComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Livestock - Manure Management'
                }
            },
            {
                path: 'ghg/AFOLU/Livestock/ManureManagement/:formId/:recordId',
                component: manure_management_component_1.ManureManagementComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Livestock - Manure Management'
                }
            },
            {
                path: 'ghg/AFOLU/Land/ForestLand',
                component: forest_land_component_1.ForestLandComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Forest Land'
                }
            },
            {
                path: 'ghg/AFOLU/Land/ForestLand/:formId/:recordId',
                component: forest_land_component_1.ForestLandComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Forest Land'
                }
            },
            {
                path: 'ghg/AFOLU/Land/Cropland',
                component: cropland_component_1.CroplandComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Cropland'
                }
            },
            {
                path: 'ghg/AFOLU/Land/Cropland/:formId/:recordId',
                component: cropland_component_1.CroplandComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Cropland'
                }
            },
            {
                path: 'ghg/AFOLU/Land/Grassland',
                component: grassland_component_1.GrasslandComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Grassland'
                }
            },
            {
                path: 'ghg/AFOLU/Land/Grassland/:formId/:recordId',
                component: grassland_component_1.GrasslandComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Grassland'
                }
            },
            {
                path: 'ghg/AFOLU/Land/Wetland',
                component: wetland_component_1.WetlandComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Wetland'
                }
            },
            {
                path: 'ghg/AFOLU/Land/Wetland/:formId/:recordId',
                component: wetland_component_1.WetlandComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Wetland'
                }
            },
            {
                path: 'ghg/AFOLU/Land/Settlements',
                component: settlements_component_1.SettlementsComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Settlements'
                }
            },
            {
                path: 'ghg/AFOLU/Land/Settlements/:formId/:recordId',
                component: settlements_component_1.SettlementsComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Settlements'
                }
            },
            {
                path: 'ghg/AFOLU/Land/OtherLands',
                component: other_lands_component_1.OtherLandsComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Other Lands'
                }
            },
            {
                path: 'ghg/AFOLU/Land/OtherLands/:formId/:recordId',
                component: other_lands_component_1.OtherLandsComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Land - Other Lands'
                }
            },
            {
                path: 'ghg/AFOLU/Aggregate_nonCO2/Urea_Application',
                component:GhgUreaApplicationComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Emissions from Biomass Burning'
                }
            },
            {
                path: 'ghg/AFOLU/Aggregate_nonCO2/Emissions_Biomass/:formId/:recordId',
                component: efbb_component_1.EfbbComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Emissions from Biomass Burning'
                }
            },
            {
                path: 'ghg/AFOLU/Aggregate_nonCO2/Indirect_N2O',
                component: inemm_component_1.InemmComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Indirect N2O emissions from Manure Management'
                }
            },
            {
                path: 'ghg/AFOLU/Aggregate_nonCO2/Indirect_N2O/:formId/:recordId',
                component: inemm_component_1.InemmComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Indirect N2O emissions from Manure Management'
                }
            },
            {
                path: 'ghg/AFOLU/Aggregate_nonCO2/Rice_Cultivation',
                component: rice_cultivation_component_1.RiceCultivationComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Rice Cultivation'
                }
            },
            {
                path: 'ghg/AFOLU/Aggregate_nonCO2/Rice_Cultivation/:formId/:recordId',
                component: rice_cultivation_component_1.RiceCultivationComponent,
                data: {
                    title: 'GHG Inventory - AFOLU - Aggregate Sources & non-CO2 Emissions Sources on Land - Rice Cultivation'
                }
            },
            {
                path: 'ghg/Waste/Solid_Waste_Disposal',
                component: solidwaste_disposal_component_1.SolidwasteDisposalComponent,
                data: {
                    title: 'GHG Inventory - Waste - Solid Waste Disposal'
                }
            },
            {
                path: 'ghg/Waste/Solid_Waste_Disposal/:formId/:recordId',
                component: solidwaste_disposal_component_1.SolidwasteDisposalComponent,
                data: {
                    title: 'GHG Inventory - Waste - Solid Waste Disposal'
                }
            },
            {
                path: 'ghg/Waste/Biological_Treatment_SolidWaste',
                component: btsw_component_1.BtswComponent,
                data: {
                    title: 'GHG Inventory - Waste - Biological Treatment of Solid Waste'
                }
            },
            {
                path: 'ghg/Waste/Biological_Treatment_SolidWaste/:formId/:recordId',
                component: btsw_component_1.BtswComponent,
                data: {
                    title: 'GHG Inventory - Waste - Biological Treatment of Solid Waste'
                }
            },
            {
                path: 'ghg/Waste/Incineration_Waste',
                component: iobw_component_1.IobwComponent,
                data: {
                    title: 'GHG Inventory - Waste - Incineration and Open Burning of Waste'
                }
            },
            {
                path: 'ghg/Waste/Incineration_Waste/:formId/:recordId',
                component: iobw_component_1.IobwComponent,
                data: {
                    title: 'GHG Inventory - Waste - Incineration and Open Burning of Waste'
                }
            },
            {
                path: 'ghg/Waste/Wastewater_Treatment_Discharge',
                component: wtd_component_1.WtdComponent,
                data: {
                    title: 'GHG Inventory - Waste - Wastewater Treatment and Discharge'
                }
            },
            {
                path: 'ghg/Waste/Wastewater_Treatment_Discharge/:formId/:recordId',
                component: wtd_component_1.WtdComponent,
                data: {
                    title: 'GHG Inventory - Waste - Wastewater Treatment and Discharge'
                }
            },
            {
                path: 'Mitigation_Actions/ProjectInformation',
                component: project_information_component_1.ProjectInformationComponent,
                data: {
                    title: 'Mitigation Action - Project Information'
                }
            },
            {
                path: 'Mitigation_Actions/ProjectInformation/:formId/:recordId',
                component: project_information_component_1.ProjectInformationComponent,
                data: {
                    title: 'Mitigation Action - Project Information'
                }
            },
            {
                path: 'Mitigation_Actions/MonitoringInformation',
                component: monitoring_information_component_1.MonitoringInformationComponent,
                data: {
                    title: 'Mitigation Action - Monitoring Information'
                }
            },
            {
                path: 'Mitigation_Actions/MonitoringInformation/:formId/:recordId',
                component: monitoring_information_component_1.MonitoringInformationComponent,
                data: {
                    title: 'Mitigation Action - Monitoring Information'
                }
            },
            {
                path: 'Adaptation_Actions/ProjectInformation',
                component: adaptation_projectinformation_component_1.AdaptationProjectinformationComponent,
                data: {
                    title: 'Adaptation Action - Project Information'
                }
            },
            {
                path: 'Adaptation_Actions/MonitoringInformation/:formId/:recordId',
                component: adaptation_monitoringinformation_component_1.AdaptationMonitoringinformationComponent,
                data: {
                    title: 'Adaptaion Action - Monitoring Information'
                }
            },
            {
                path: 'Adaptation_Actions/MonitoringInformation',
                component: adaptation_monitoringinformation_component_1.AdaptationMonitoringinformationComponent,
                data: {
                    title: 'Adaptaion Action - Monitoring Information'
                }
            },
            {
                path: 'Climate_Finance/ProjectInformation',
                component: climate_projectinformation_component_1.ClimateProjectinformationComponent,
                data: {
                    title: 'Climate Finance - Project Information'
                }
            },
            {
                path: 'Climate_Finance/ProjectInformation/:formId/:recordId',
                component: climate_projectinformation_component_1.ClimateProjectinformationComponent,
                data: {
                    title: 'Climate Finance - Project Information'
                }
            },
            {
                path: 'Climate_Finance/MonitoringInformation/:formId/:recordId',
                component: climate_monitoringinformation_component_1.ClimateMonitoringinformationComponent,
                data: {
                    title: 'Climate Finance - Monitoring Information'
                }
            },
            {
                path: 'Climate_Finance/MonitoringInformation',
                component: climate_monitoringinformation_component_1.ClimateMonitoringinformationComponent,
                data: {
                    title: 'Climate Finance - Monitoring Information'
                }
            },
            {
                path: 'SDG_Assessment/ProjectInformation',
                component: sdg_projectinformation_component_1.SdgProjectinformationComponent,
                data: {
                    title: 'SDG Assessment - Project Information'
                }
            },
            {
                path: 'SDG_Assessment/ProjectInformation/:formId/:recordId',
                component: sdg_projectinformation_component_1.SdgProjectinformationComponent,
                data: {
                    title: 'SDG Assessment - Project Information'
                }
            },
            {
                path: 'SDG_Assessment/MonitoringInformation',
                component: sdg_monitoringinformation_component_1.SdgMonitoringinformationComponent,
                data: {
                    title: 'SDG Assessment - Monitoring Information'
                }
            },
            {
                path: 'SDG_Assessment/MonitoringInformation/:formId/:recordId',
                component: sdg_monitoringinformation_component_1.SdgMonitoringinformationComponent,
                data: {
                    title: 'SDG Assessment - Monitoring Information'
                }
            },
            {
                path: 'Database/Energy/EmissionFactor',
                component: database_energy_component_1.DatabaseEnergyComponent,
                data: {
                    title: 'Database - Energy - Emission Factor -Fuel'
                }
            },
            {
                path: 'Database/IPPU/EmissionFactor',
                component: database_ippu_component_1.DatabaseIppuComponent,
                data: {
                    title: 'Database - IPPU - GWP Database - Emission Factor IPPU'
                }
            },
            {
                path: 'Database/IPPU/GWPDatabase',
                component: gwp_database_component_1.GwpDatabaseComponent,
                data: {
                    title: 'Database - IPPU - GWP Database'
                }
            },
            {
                path: 'Database/AFOLU/LivestockPopulation',
                component: database_afolu_component_1.DatabaseAfoluComponent,
                data: {
                    title: 'Database Livestock Population'
                }
            },
            {
                path: 'Database/AFOLU/EmissionFactor',
                component: emissionfactor_livestock_component_1.EmissionfactorLivestockComponent,
                data: {
                    title: 'Database - AFOLU - Emission Factor - Livestock'
                }
            },
            {
                path: 'Database/Waste/Population',
                component: waste_population_component_1.WastePopulationComponent,
                data: {
                    title: 'Databse - Waste - Population'
                }
            },
            {
                path: 'Reports/GHGInventory/Yearwise',
                component: ghginventory_yearwise_component_1.GhginventoryYearwiseComponent,
                data: {
                    title: 'Reports - GHG Inventory(Year wise)'
                }
            },
            {
                path: 'Reports/MitigationTracking',
                component: mitigation_tracking_component_1.MitigationTrackingComponent,
                data: {
                    title: 'Reports -  Mitigation Tracking'
                }
            },
            {
                path: 'Reports/AdaptationTracking',
                component: adaptation_tracking_component_1.AdaptationTrackingComponent,
                data: {
                    title: 'Reports - Adaptation Tracking'
                }
            },
            {
                path: 'Reports/FinanceTracking',
                component: finance_tracking_component_1.FinanceTrackingComponent,
                data: {
                    title: 'Reports - Finance tracking'
                }
            },
            {
                path: 'Reports/SDGTracking',
                component: sdg_tracking_component_1.SdgTrackingComponent,
                data: {
                    title: 'Reports - SDG Tracking'
                }
            },
            {
                path: 'Reports/MRVTracking',
                component: mrv_tracking_component_1.MrvTrackingComponent,
                data: {
                    title: 'Reports - MRV Tracking'
                }
            },
            {
                path: 'userlist',
                component: userlist_component_1.UserlistComponent,
                data: {
                    title: 'User List'
                }
            },
            {
                path: 'my-approvals',
                component: my_approvals_component_1.MyApprovalsComponent,
                data: {
                    title: 'My Approvals'
                }
            },
            // reports
            {
                path: 'Reports/GHGInventory/Gaswise',
                component: report_by_gas_component_1.ReportByGasComponent,
                data: {
                    title: 'Reports - GHG Inventory - Gas Wise'
                }
            },
        ]
    },
    { path: '**', component: _404_component_1.P404Component }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
