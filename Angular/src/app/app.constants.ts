import { environment } from './../environments/environment'

export const BASE_URL = environment.apiBasePath;
export const MRV_LOGIN = BASE_URL + '/user/login';
export const MRV_FORGOT_PASSWORD = BASE_URL + '/user/forgot-password/otp';
export const MRV_RESET_PASSWORD = BASE_URL + '/user/reset/password';
export const MRV_USER = BASE_URL + '/user';
export const MRV_UPDATE_PASSWORD = BASE_URL + '/user/password';
export const MRV_UPDATE_USER_STATUS = BASE_URL + '/user/updateStatus';
export const MRV_GET_MENU_GROUP = BASE_URL + '/menu/group';
export const MRV_INVENTORY_YEAR = BASE_URL + '/ghg/inventoryYear';
export const MRV_FUEL_TYPE = BASE_URL + '/ghg/fuelType';
export const MRV_FUEL_BY_FUEL_TYPE = BASE_URL + '/ghg/fuelByFuelType/';
export const MRV_SHARED_APP_DATA = BASE_URL + '/shared/appdata';
export const MRV_REPORT_GAS = BASE_URL + '/ghg/report/gas';
export const MRV_GHG_REPORT = BASE_URL + '/ghg/report';
export const MRV_GHG_REPORT_TAB = 'Table A Summary Table';

export const MRV_GHG_ENERGY_REFERENCE_APPROACH = BASE_URL + '/ghg/energy/referenceApproach';
export const MRV_GHG_ENERGY_ELECTRICITY_GENERATION = BASE_URL + '/ghg/energy/sectoral/electricityGeneration';
export const MRV_GHG_ENERGY_PRODUCTION_OF_SOLID_FUELS = BASE_URL + '/ghg/energy/sectoral/productionOfSolid';
export const MRV_GHG_ENERGY_MANUFACTURING = BASE_URL + '/ghg/energy/sectoral/manufacturing';
export const MRV_GHG_ENERGY_TRANSPORT = BASE_URL + '/ghg/energy/sectoral/transport';
export const MRV_GHG_ENERGY_OTHERS = BASE_URL + '/ghg/energy/sectoral/others';

export const MRV_GHG_IPPU_CEMENT = BASE_URL + '/ghg/ippu/cement';
export const MRV_GHG_IPPU_LIME = BASE_URL + '/ghg/ippu/lime';
export const MRV_GHG_IPPU_LUBRICANT = BASE_URL + '/ghg/ippu/lubricant';
export const MRV_GHG_IPPU_SOLVENT = BASE_URL + '/ghg/ippu/solvent';
export const MRV_GHG_IPPU_RNAC = BASE_URL + '/ghg/ippu/airConditioning';

export const MRV_GHG_AFOLU_EMISSIONFACTOR = BASE_URL + '/database/afolu/emissionFactor';

export const SOLID_WASTE_DISPOSAL = BASE_URL + '/ghg/waste/solidWasteDisposal';
export const MRV_GHG_WASTE_BIO_TREATMENT = BASE_URL + '/ghg/waste/biologicalTreatment';

export const MRV_APPROVALS = BASE_URL + '/data-state/';
export const UPLOAD_FILE = BASE_URL + '/shared/upload/';
export const DOWNLOAD_FILE = BASE_URL + '/shared/download';
export const MRV_GHG_REPORT_TEMPLATE_LINK = BASE_URL + '/shared/download/template';
export const CHECK_FILE_BY_MENU = BASE_URL + '/shared/fileByMenu';
export const MRV_SHARED_RECORD = BASE_URL + '/shared/record';

export const MRV_GHG_DATA = BASE_URL + '/ghg/data';

export const MRV_DATABASE_ENERGY_EMISSION_FACTOR = BASE_URL + '/database/energy/emissionFactor';
export const MRV_DATABASE_ENERGY_FUGITIVE = BASE_URL + '/database/energy/fugitive';
export const MRV_DATABASE_IPPU_EMISSION_FACTOR = BASE_URL + '/database/ippu/emissionFactor';
export const MRV_DATABASE_IPPU_GWP = BASE_URL + '/database/ippu/gwp';
export const MRV_DATABASE_AFOLU_POPULATION = BASE_URL + '/database/afolu/population';
export const MRV_DATABASE_AFOLU_EMISSION_FACTOR = BASE_URL + '/database/afolu/emissionFactor';
// waste
export const MRV_DATABASE_WASTE_POPULATION = BASE_URL + '/database/waste/population';

// NDC
export const MRV_NDC_SECTOR_MAPPING = BASE_URL + '/shared/ndc/sectorMapping';
export const MRV_GHG_SECTOR_MAPPING = BASE_URL + '/ghg/sectorDetails';
export const MRV_GHG_SECTOR_MAPPING_BY_MENU = BASE_URL + '/ghg/sectorDetailsByMenu';
export const MRV_NDC = BASE_URL + '/ndc';
export const MRV_NDC_PROJECT_BY_MODULE = BASE_URL + '/ndc/projectByModule';
export const MRV_MITIGATION_REPORT = BASE_URL + '/ndc/report';
export const MRV_REPORT_YEARS = BASE_URL + '/shared/report/years';

export const MRV_MONITORING_YEAR_COUNT = 50;
export const MRV_INVENTORY_YEAR_CONFIG_STR = "inventoryYear-config";
export const MRV_INVENTORY_SECTOR_SPLIT = "{#}";
export const MRV_DATABASE_IPPU_EMMISION_FACTOR = BASE_URL + '/database/ippu/emissionFactor';


export const staticData = {
	"Total National Emissions and Removals" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"1-Energy" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"1.A-Fuel Combustion Activities" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"1.A.1-Energy Industries" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"1.A.2-Manufacturing Industries and Construction" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"1.A.3-Transport" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"1.A.4-Other Sectors" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"1.A.5-Non-Specified" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"1.B-Fugitive emissions from fuels" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	}," 1.B.1-Solid Fuels" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"1.B.2-Oil and Natural Gas" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"1.B.3-Other emissions from Energy Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"1.C-Carbon dioxide Transport and Storage" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"1.C.1-Transport of CO2" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"1.C.2-Injection and Storage" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"1.C.3-Other" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2-Industrial Processes and Product Use" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.A-Mineral Industry" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.A.1-Cement production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.A.2-Lime production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.A.3 - Glass Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.A.4 - Other Process Uses of Carbonates" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.A.5-Other (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B-Chemical Industry" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.B.1-Ammonia Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B.2-Nitric Acid Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B.3-Adipic Acid Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B.4-Caprolactam, Glyoxal and Glyoxylic Acid Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B.5-Carbide Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B.6-Titanium Dioxide Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B.7-Soda Ash Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B.8-Petrochemical and Carbon Black Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B.9-Fluorochemical Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.B.10-Other (Please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.C-Metal Industry" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.C.1-Iron and Steel Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.C.2-Ferroalloys Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.C.3-Aluminium production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.C.4-Magnesium production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.C.5-Lead Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.C.6-Zinc Production" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.C.7-Other (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.D-Non-Energy Products from Fuels and Solvent Use" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.D.1-Lubricant Use" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.D.2-Paraffin Wax Use" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.D.3-Solvent Use" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.D.4-Other (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.E-Electronics Industry" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.E.1-Integrated Circuit or Semiconductor" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.E.2-TFT Flat Panel Display" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.E.3-Photovoltaics" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.E.4-Heat Transfer Fluid" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.E.5-Other (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.F-Product Uses as Substitutes for Ozone Depleting Substances" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.F.1-Refrigeration and Air Conditioning" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.F.2-Foam Blowing Agents" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.F.3-Fire Protection" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.F.4-Aerosols" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.F.5-Solvents" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.F.6-Other Applications (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.G-Other Product Manufacture and Use" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.G.1-Electrical Equipment" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.G.2-SF6 and PFCs from Other Product Uses" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"2.G.3-N2O from Product Uses" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.G.4-Other (Please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.H-Other" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.H.1-Pulp and Paper Industry" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.H.2-Food and Beverages Industry" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"2.H.3-Other (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3-Agriculture, Forestry, and Other Land Use" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.A-Livestock" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.A.1-Enteric Fermentation" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"3.A.2-Manure Management" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.B-Land" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"3.B.1-Forest land" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.B.2-Cropland" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.B.3-Grassland" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.B.4-Wetlands" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"3.B.5-Settlements" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.B.6-Other Land" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.C-Aggregate sources and non-CO2 emissions sources on land" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.C.1-Emissions from biomass burning" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"3.C.2-Liming" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.C.3-Urea application" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.C.4-Direct N2O Emissions from managed soils" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"3.C.5-Indirect N2O Emissions from managed soils" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.C.6-Indirect N2O Emissions from manure management" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.C.7-Rice cultivation" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"3.C.8-Other (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"3.D-Other" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"3.D.1-Harvested Wood Products" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"3.D.2-Other (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"4-Waste" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"4.A-Solid Waste Disposal" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"4.B-Biological Treatment" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"4.C-Incineration and Open Burning of Waste" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"4.D-Wastewater Treatment and Discharge" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"4.E-Other (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"5-Other" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"5.A-Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"5.B-Other (please specify)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"Memo Items (5)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},
	"International Bunkers" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"1.A.3.a.i-International Aviation (International Bunkers)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"1.A.3.d.i-International water-borne navigation (International bunkers)" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"1.A.5.c-Multilateral Operations" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"Total CO2 equivalent emissions without land use, land-use change and forestry" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	},"Total CO2 equivalent emissions with land use, land-use change and forestry" : {
		"CO2" : 0,
		"CH4" : 0,
		"N20" : 0,
		"CO2eq." : 0
	}	
}

