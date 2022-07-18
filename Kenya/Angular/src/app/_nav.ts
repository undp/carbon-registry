interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const adminNavItems: NavData[] = [
  {
    title: true,
    name: "Navigations",
  },
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-home",
  },
  // {
  //   name: 'Menu management',
  //   url: '/menu',
  //   icon: 'icon-menu',
  // },
  // {
  //   name: 'User management',
  //   url: '/user/user-list',
  //   icon: 'icon-user',
  // },

  // {
  //   name: 'GHG Reports',
  //   url: '/ghg-reports',
  //   icon: 'icon-direction',
  // },
  {
    name: "GHG",
    url: "/mitigation-actions",
    icon: "icon-layers",
    children: [
      /*{
        name: "GHG Config",
        url: "/ghg-config",
        icon: "icon-direction",
      },
       {
        name: "GHG Inventory",
        url: "/ghg-inventory",
        icon: "icon-chemistry",
        children: [
          {
            name: "Energy",
            url: "/energy",
            icon: "icon-fire",
            children: [
              {
                name: "Reference Approach",
                url: "/ghg/energy/Reference_Approach",
                icon: "icon-energy",
              },
              {
                name: "Sectoral Approach",
                url: "/sectoral-approach",
                icon: "icon-vector",
                children: [
                  {
                    name: "Energy Industries",
                    url: "/energy-industry",
                    icon: "icon-globe",
                    children: [
                      {
                        name: "Natural Gas",
                        url: "/ghg/energy/Sectoral_Approach/Energy_Industries/NaturalGas",
                        icon: "icon-cup",
                      },
                      {
                        name: "Fugitive Oil",
                        url: "/ghg/energy/Sectoral_Approach/Energy_Industries/FugitiveOil",
                        icon: "icon-cup",
                      },
                      {
                        name: "Electricity Generation",
                        url: "/ghg/energy/Sectoral_Approach/Energy_Industries/Electricity_Generation",
                        icon: "icon-cup",
                      },
                      {
                        name: "Production of Solid Fuels",
                        url: "/ghg/energy/Sectoral_Approach/Energy_Industries/Production_Solid_Fuels",
                        icon: "icon-globe-alt",
                      },
                    ],
                  },
                  {
                    name: "Manufacturing",
                    url: "/ghg/energy/Sectoral_Approach/Manufacturing",
                    icon: "icon-rocket",
                  },
                  {
                    name: "Transport",
                    url: "/ghg/energy/Sectoral_Approach/Transport",
                    icon: "icon-plane",
                  },
                  {
                    name: "Others",
                    url: "/ghg/energy/Sectoral_Approach/Others",
                    icon: "icon-location-pin",
                  },
                ],
              },
            ],
          },
          {
            name: "IPPU",
            url: "/ippu",
            icon: "icon-cursor",
            children: [
              {
                name: "Mineral Industry",
                url: "/Mineral_Industry",
                icon: "icon-shield",
                children: [
                  {
                    name: "Cement Production",
                    url: "/ghg/ippu/Mineral_Industry/Cement_Production",
                    icon: "icon-hourglass",
                  },
                  {
                    name: "Lime Production",
                    url: "/ghg/ippu/Mineral_Industry/Lime_Production",
                    icon: "icon-anchor",
                  },
                  {
                    name: "Glass Production",
                    url: "/ghg/ippu/Mineral_Industry/Glass_Production",
                    icon: "icon-hourglass",
                  },
                  {
                    name: "Carbonate Production",
                    url: "/ghg/ippu/Mineral_Industry/carbonate_production",
                    icon: "icon-hourglass",
                  },
                ],
              },
              {
                name: "Chemical Industry",
                url: "/chemicalIndustry",
                icon: "icon-shield",
                children: [
                  {
                    name: "Soda Ash",
                    url: "/ghg/ippu/chemicalIndustry/soda_ash_production",
                    icon: "icon-hourglass",
                  },
                ],
              },
              {
                name: "Non- Energy Products from fuel and solvent use",
                url: "/npffsu",
                icon: "icon-plus",
                children: [
                  {
                    name: "Lubricant Use",
                    url: "/ghg/ippu/Non_Energy_product/Lubricant_Use",
                    icon: "icon-drop",
                  },
                  {
                    name: "Solvent Use",
                    url: "/ghg/ippu/Non_Energy_product/Solvent_Use",
                    icon: "icon-bubbles",
                  },
                ],
              },
              {
                name: "Products uses as substitutes for ozone depleting substances",
                url: "/pusods",
                icon: "icon-drawer",
                children: [
                  {
                    name: "Refrigeration and Air Conditioning",
                    url: "/ghg/ippu/Product_Substitutes/Refrigeration_Air",
                    icon: "icon-magic-wand",
                  },
                ],
              },
            ],
          },
          {
            name: "AFOLU",
            url: "/afolu",
            icon: "icon-feed",
            children: [
              {
                name: "Livestock",
                url: "/livestock",
                icon: "icon-doc",
                children: [
                  {
                    name: "Enteric Fermentation",
                    url: "/ghg/AFOLU/Livestock/EntericFermentation",
                    icon: "icon-briefcase",
                  },
                  {
                    name: "Manure Management",
                    url: "/ghg/AFOLU/Livestock/ManureManagement",
                    icon: "icon-book-open",
                  },
                ],
              },
              {
                name: "Land",
                url: "/land",
                icon: "icon-graph",
                children: [
                  {
                    name: "Forest Land",
                    url: "/ghg/AFOLU/Land/ForestLand",
                    icon: "icon-flag",
                  },
                  {
                    name: "Cropland",
                    url: "/ghg/AFOLU/Land/Cropland",
                    icon: "icon-flag",
                  },
                  {
                    name: "Grassland",
                    url: "/ghg/AFOLU/Land/Grassland",
                    icon: "icon-flag",
                  },
                  {
                    name: "Wetland",
                    url: "/ghg/AFOLU/Land/Wetland",
                    icon: "icon-flag",
                  },
                  {
                    name: "Settlements",
                    url: "/ghg/AFOLU/Land/Settlements",
                    icon: "icon-flag",
                  },
                  {
                    name: "Other Lands",
                    url: "/ghg/AFOLU/Land/OtherLands",
                    icon: "icon-flag",
                  },
                ],
              },
              {
                name: "Aggregate sources and non CO2 emissions sources on land",
                url: "/asnesol",
                icon: "icon-link",
                children: [
                  {
                    name: "Emissions from Biomass Burning",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Emissions_Biomass",
                    icon: "icon-bulb",
                  },
                  {
                    name: "Indirect N2O emissions from Manure Management",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Indirect_N2O",
                    icon: "icon-heart",
                  },
                  {
                    name: "Indirect Emissions",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Indirect_Emission",
                    icon: "icon-bulb",
                  },
                  {
                    name: "Direct Emissions",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Direct_Emission",
                    icon: "icon-bulb",
                  },

                  {
                    name: "Rice Cultivation",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Rice_Cultivation",
                    icon: "icon-chart",
                  },
                  {
                    name: "Liming",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/liming",
                    icon: "icon-bulb",
                  },
                  {
                    name: "Urea Application",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Urea_Application",
                    icon: "icon-bulb",
                  },
                ],
              },
            ],
          },
          {
            name: "Waste",
            url: "/waste",
            icon: "icon-list",
            children: [
              {
                name: "Solid Waste Disposal",
                url: "/ghg/Waste/Solid_Waste_Disposal",
                icon: "icon-options-vertical",
              },
              {
                name: "Biological Treatment of Solid Waste",
                url: "/ghg/Waste/Biological_Treatment_SolidWaste",
                icon: "icon-options",
              },
              {
                name: "Incineration and Open Burning of Waste",
                url: "/ghg/Waste/Incineration_Waste",
                icon: "icon-layers",
              },
              {
                name: "Wastewater Treatment and Discharge",
                url: "/ghg/Waste/Wastewater_Treatment_Discharge",
                icon: "icon-directions",
              },
            ],
          },
        ],
      }, */
      {
        name: "GHG File Upload",
        url: "/ghg-reports",
        icon: "icon-cloud-upload",
      },
    ],
  },
  {
    name: "NDC Actions",
    url: "/ndc",
    icon: "icon-direction",
  },
  {
    name: "Mitigation Actions",
    url: "/mitigation-actions",
    icon: "icon-magnet",
    children: [
      {
        name: "Mitigation Project Information",
        url: "/Mitigation_Actions/ProjectInformation",
        icon: "icon-check",
      },
      {
        name: "Mitigation Monitoring Information",
        url: "/Mitigation_Actions/MonitoringInformation",
        icon: "icon-screen-desktop",
      },
    ],
  },
  {
    name: "Adaptation Actions",
    url: "/adaptation-action",
    icon: "icon-bell",
    children: [
      {
        name: "Adaptation Project Information",
        url: "/Adaptation_Actions/ProjectInformation",
        icon: "icon-check",
      },
      {
        name: "Adaptation Monitoring Information",
        url: "/Adaptation_Actions/MonitoringInformation",
        icon: "icon-screen-desktop",
      },
    ],
  },
  {
    name: "Climate Finance",
    url: "/climate-finance",
    icon: "icon-book-open",
    children: [
      {
        name: "Climate Finance Project Information",
        url: "/Climate_Finance/ProjectInformation",
        icon: "icon-check",
      },
      {
        name: "Climate Finance Monitoring Information",
        url: "/Climate_Finance/MonitoringInformation",
        icon: "icon-screen-desktop",
      },
    ],
  },
  {
    name: "SDG Assessment",
    url: "/sdg-assessment",
    icon: "icon-tag",
    children: [
      {
        name: "SDG Assessment Project Information",
        url: "/SDG_Assessment/ProjectInformation",
        icon: "icon-check",
      },
      {
        name: "SDG Assessment Monitoring Information",
        url: "/SDG_Assessment/MonitoringInformation",
        icon: "icon-screen-desktop",
      },
    ],
  },
  /* {
    name: "Database",
    url: "/database",
    icon: "icon-grid",
    children: [
      {
        name: "Energy",
        url: "/database-energy",
        icon: "icon-fire",
        children: [
          {
            name: "Emission Factor - Fuel",
            url: "/Database/Energy/EmissionFactor",
            icon: "icon-cursor-move",
          },
          {
            name: "Fugitive Emissions",
            url: "/Database/Energy/FugitiveEmissions",
            icon: "icon-cursor-move",
          },
        ],
      },
      {
        name: "IPPU",
        url: "/database-ippu",
        icon: "icon-cursor",
        children: [
          {
            name: "Emission Factor - IPPU",
            url: "/Database/IPPU/EmissionFactor",
            icon: "icon-cursor-move",
          },
          {
            name: "GWP Database",
            url: "/Database/IPPU/GWPDatabase",
            icon: "icon-vector",
          },
        ],
      },
      {
        name: "AFOLU",
        url: "/database-afolu",
        icon: "icon-feed",
        children: [
          {
            name: "Livestock Population",
            url: "/Database/AFOLU/LivestockPopulation",
            icon: "icon-puzzlee",
          },
          {
            name: "Emission Factor - Livestock",
            url: "/Database/AFOLU/EmissionFactor",
            icon: "icon-ghost",
          },
        ],
      },
      {
        name: "Waste",
        url: "/database-waste",
        icon: "icon-list",
        children: [
          {
            name: "Population",
            url: "/Database/Waste/Population",
            icon: "icon-globe",
          },
        ],
      },
    ],
  }, */
  {
    name: 'Reports',
    url: '/reports',
    icon: 'icon-book-open',
    children : [
     {

        name: 'GHG Inventory',
        url: '/reports-ghginventory',
        icon: 'icon-chemistry',
        children : [

          {
            name: 'GHG Inventory (Year wise)',
            url: '/Reports/GHGInventory/Yearwise',
            icon: 'icon-action-undo',
          },
          {
            name: 'GHG Inventory (Gas wise)',
            url: '/Reports/GHGInventory/Gaswise',
            icon: 'icon-action-redo',
          }
        ]
      },
      {
        name: "Mitigation Tracking",
        url: "/Reports/MitigationTracking",
        icon: "icon-equalizer",
      },
      {
        name: "Adaptation Tracking",
        url: "/Reports/AdaptationTracking",
        icon: "icon-bulb",
      },
      {
        name: "Finance Tracking",
        url: "/Reports/FinanceTracking",
        icon: "icon-chart",
      },
      {
        name: "SDG Tracking",
        url: "/Reports/SDGTracking",
        icon: "icon-link",
      },
      {
        name: "MRV Tracking",
        url: "/Reports/MRVTracking",
        icon: "icon-paper-clip",
      },
    ],
  },
  {
    name: "USER LIST",
    url: "/userlist",
    icon: "icon-people",
  },
  // {
  //   name: 'GHG Report',
  //   url: '/ghg-reports',
  //   icon: 'icon-user-following',
  // },
  {
    name: "MY APPROVALS",
    url: "/my-approvals",
    icon: "icon-user-following",
  },
];

export const nodalNavItems: NavData[] = [
  {
    title: true,
    name: "Navigations",
  },
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-home",
  },
  {
    name: "Reports",
    url: "/reports",
    icon: "icon-book-open",
    children: [
      /* {
        name: 'GHG Inventory',
        url: '/reports-ghginventory',
        icon: 'icon-chemistry',
        children : [
          {
            name: 'GHG Inventory(year wise)',
            url: '/Reports/GHGInventory/Yearwise',
            icon: 'icon-action-undo',
          },
          {
            name: 'GHG Inventory(gas wise)',
            url: '/Reports/GHGInventory/Gaswise',
            icon: 'icon-action-redo',
          }
        ]
      }, */
      {
        name: "Mitigation Tracking",
        url: "/Reports/MitigationTracking",
        icon: "icon-equalizer",
      },
      {
        name: "Adaptation Tracking",
        url: "/Reports/AdaptationTracking",
        icon: "icon-bulb",
      },
      {
        name: "Finance Tracking",
        url: "/Reports/FinanceTracking",
        icon: "icon-chart",
      },
      {
        name: "SDG Tracking",
        url: "/Reports/SDGTracking",
        icon: "icon-link",
      },
      {
        name: "MRV Tracking",
        url: "/Reports/MRVTracking",
        icon: "icon-paper-clip",
      },
    ],
  },
  {
    name: "MY APPROVALS",
    url: "/my-approvals",
    icon: "icon-user-following",
  },
];
export const userNavItems: NavData[] = [
  {
    title: true,
    name: "Navigations",
  },
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-home",
  },
  // {
  //   name: 'Menu management',
  //   url: '/menu',
  //   icon: 'icon-menu',
  // },
  // {
  //   name: 'User management',
  //   url: '/user/user-list',
  //   icon: 'icon-user',
  // },

  // {
  //   name: 'GHG Reports',
  //   url: '/ghg-reports',
  //   icon: 'icon-direction',
  // },
  {
    name: "GHG",
    url: "/mitigation-actions",
    icon: "icon-layers",
    children: [
      {
        name: "GHG Inventory",
        url: "/ghg-inventory",
        icon: "icon-chemistry",
        children: [
          {
            name: "Energy",
            url: "/energy",
            icon: "icon-fire",
            children: [
              {
                name: "Reference Approach",
                url: "/ghg/energy/Reference_Approach",
                icon: "icon-energy",
              },
              {
                name: "Sectoral Approach",
                url: "/sectoral-approach",
                icon: "icon-vector",
                children: [
                  {
                    name: "Energy Industries",
                    url: "/energy-industry",
                    icon: "icon-globe",
                    children: [
                      {
                        name: "Natural Gas",
                        url: "/ghg/energy/Sectoral_Approach/Energy_Industries/NaturalGas",
                        icon: "icon-cup",
                      },
                      {
                        name: "Fugitive Oil",
                        url: "/ghg/energy/Sectoral_Approach/Energy_Industries/FugitiveOil",
                        icon: "icon-cup",
                      },
                      {
                        name: "Electricity Generation",
                        url: "/ghg/energy/Sectoral_Approach/Energy_Industries/Electricity_Generation",
                        icon: "icon-cup",
                      },
                      {
                        name: "Production of Solid Fuels",
                        url: "/ghg/energy/Sectoral_Approach/Energy_Industries/Production_Solid_Fuels",
                        icon: "icon-globe-alt",
                      },
                    ],
                  },
                  {
                    name: "Manufacturing",
                    url: "/ghg/energy/Sectoral_Approach/Manufacturing",
                    icon: "icon-rocket",
                  },
                  {
                    name: "Transport",
                    url: "/ghg/energy/Sectoral_Approach/Transport",
                    icon: "icon-plane",
                  },
                  {
                    name: "Others",
                    url: "/ghg/energy/Sectoral_Approach/Others",
                    icon: "icon-location-pin",
                  },
                ],
              },
            ],
          },
          {
            name: "IPPU",
            url: "/ippu",
            icon: "icon-cursor",
            children: [
              {
                name: "Mineral Industry",
                url: "/Mineral_Industry",
                icon: "icon-shield",
                children: [
                  {
                    name: "Cement Production",
                    url: "/ghg/ippu/Mineral_Industry/Cement_Production",
                    icon: "icon-hourglass",
                  },
                  {
                    name: "Lime Production",
                    url: "/ghg/ippu/Mineral_Industry/Lime_Production",
                    icon: "icon-anchor",
                  },
                  {
                    name: "Glass Production",
                    url: "/ghg/ippu/Mineral_Industry/Glass_Production",
                    icon: "icon-hourglass",
                  },
                  {
                    name: "Carbonate Production",
                    url: "/ghg/ippu/Mineral_Industry/carbonate_production",
                    icon: "icon-hourglass",
                  },
                ],
              },
              {
                name: "Chemical Industry",
                url: "/chemicalIndustry",
                icon: "icon-shield",
                children: [
                  {
                    name: "Soda Ash",
                    url: "/ghg/ippu/chemicalIndustry/soda_ash_production",
                    icon: "icon-hourglass",
                  },
                ],
              },
              {
                name: "Non- Energy Products from fuel and solvent use",
                url: "/npffsu",
                icon: "icon-plus",
                children: [
                  {
                    name: "Lubricant Use",
                    url: "/ghg/ippu/Non_Energy_product/Lubricant_Use",
                    icon: "icon-drop",
                  },
                  {
                    name: "Solvent Use",
                    url: "/ghg/ippu/Non_Energy_product/Solvent_Use",
                    icon: "icon-bubbles",
                  },
                ],
              },
              {
                name: "Products uses as substitutes for ozone depleting substances",
                url: "/pusods",
                icon: "icon-drawer",
                children: [
                  {
                    name: "Refrigeration and air conditioning",
                    url: "/ghg/ippu/Product_Substitutes/Refrigeration_Air",
                    icon: "icon-magic-wand",
                  },
                ],
              },
            ],
          },
          {
            name: "AFOLU",
            url: "/afolu",
            icon: "icon-feed",
            children: [
              {
                name: "Livestock",
                url: "/livestock",
                icon: "icon-doc",
                children: [
                  {
                    name: "Enteric Fermentation",
                    url: "/ghg/AFOLU/Livestock/EntericFermentation",
                    icon: "icon-briefcase",
                  },
                  {
                    name: "Manure Management",
                    url: "/ghg/AFOLU/Livestock/ManureManagement",
                    icon: "icon-book-open",
                  },
                ],
              },
              {
                name: "Land",
                url: "/land",
                icon: "icon-graph",
                children: [
                  {
                    name: "Forest Land",
                    url: "/ghg/AFOLU/Land/ForestLand",
                    icon: "icon-flag",
                  },
                  {
                    name: "Cropland",
                    url: "/ghg/AFOLU/Land/Cropland",
                    icon: "icon-flag",
                  },
                  {
                    name: "Grassland",
                    url: "/ghg/AFOLU/Land/Grassland",
                    icon: "icon-flag",
                  },
                  {
                    name: "Wetland",
                    url: "/ghg/AFOLU/Land/Wetland",
                    icon: "icon-flag",
                  },
                  {
                    name: "Settlements",
                    url: "/ghg/AFOLU/Land/Settlements",
                    icon: "icon-flag",
                  },
                  {
                    name: "Other Lands",
                    url: "/ghg/AFOLU/Land/OtherLands",
                    icon: "icon-flag",
                  },
                ],
              },
              {
                name: "Aggregate sources and non CO2 emissions sources on land",
                url: "/asnesol",
                icon: "icon-link",
                children: [
                  {
                    name: "Emissions from biomass burning",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Emissions_Biomass",
                    icon: "icon-bulb",
                  },
                  {
                    name: "Indirect N2O emissions from manure management",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Indirect_N2O",
                    icon: "icon-heart",
                  },
                  /* {
                    name : 'Indirect Emissions',
                    url : '/ghg/AFOLU/Aggregate_nonCO2/Indirect_Emission',
                    icon: 'icon-bulb',
                  }, */
                  {
                    name: "Direct Emissions",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Direct_Emission",
                    icon: "icon-bulb",
                  },

                  {
                    name: "Rice Cultivation",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Rice_Cultivation",
                    icon: "icon-chart",
                  },

                  {
                    name: "Urea Application",
                    url: "/ghg/AFOLU/Aggregate_nonCO2/Urea_Application",

                    icon: "icon-bulb",
                  },
                ],
              },
            ],
          },
          {
            name: "Waste",
            url: "/waste",
            icon: "icon-list",
            children: [
              /* {
                name : 'Solid waste disposal',
                url : '/ghg/Waste/Solid_Waste_Disposal',
                icon: 'icon-options-vertical',
              }, */
              {
                name: "Biological treatment of solid waste",
                url: "/ghg/Waste/Biological_Treatment_SolidWaste",
                icon: "icon-options",
              },
              /* {
                name : 'Incineration and open burning of waste',
                url : '/ghg/Waste/Incineration_Waste',
                icon: 'icon-layers',
              }, 
              {
                name : 'Wastewater treatment and discharge',
                url : '/ghg/Waste/Wastewater_Treatment_Discharge',
                icon: 'icon-directions',
              }*/
            ],
          },
        ],
      },
      {
        name: "GHG File Upload",
        url: "/ghg-reports",
        icon: "icon-cloud-upload",
      },
    ],
  },
  {
    name: "NDC Actions",
    url: "/ndc",
    icon: "icon-direction",
  },
  {
    name: "Mitigation Actions",
    url: "/mitigation-actions",
    icon: "icon-magnet",
    children: [
      {
        name: "Mitigation Project Information",
        url: "/Mitigation_Actions/ProjectInformation",
        icon: "icon-check",
      },
      {
        name: "Mitigation Monitoring Information",
        url: "/Mitigation_Actions/MonitoringInformation",
        icon: "icon-screen-desktop",
      },
    ],
  },
  {
    name: "Adaptation Actions",
    url: "/adaptation-action",
    icon: "icon-bell",
    children: [
      {
        name: "Adaptation Project Information",
        url: "/Adaptation_Actions/ProjectInformation",
        icon: "icon-check",
      },
      {
        name: "Adaptation Monitoring Information",
        url: "/Adaptation_Actions/MonitoringInformation",
        icon: "icon-screen-desktop",
      },
    ],
  },
  {
    name: "Climate Finance",
    url: "/climate-finance",
    icon: "icon-book-open",
    children: [
      {
        name: "Climate Finance Project Information",
        url: "/Climate_Finance/ProjectInformation",
        icon: "icon-check",
      },
      {
        name: "Climate Finance Monitoring Information",
        url: "/Climate_Finance/MonitoringInformation",
        icon: "icon-screen-desktop",
      },
    ],
  },
  {
    name: "SDG Assessment",
    url: "/sdg-assessment",
    icon: "icon-tag",
    children: [
      {
        name: "SDG Assessment Project Information",
        url: "/SDG_Assessment/ProjectInformation",
        icon: "icon-check",
      },
      {
        name: "SDG Assessment Monitoring Information",
        url: "/SDG_Assessment/MonitoringInformation",
        icon: "icon-screen-desktop",
      },
    ],
  },
  {
    name: "Reports",
    url: "/reports",
    icon: "icon-book-open",
    children: [
      /* {
        name: 'GHG Inventory',
        url: '/reports-ghginventory',
        icon: 'icon-chemistry',
        children : [
          {
            name: 'GHG Inventory(year wise)',
            url: '/Reports/GHGInventory/Yearwise',
            icon: 'icon-action-undo',
          },
          {
            name: 'GHG Inventory(gas wise)',
            url: '/Reports/GHGInventory/Gaswise',
            icon: 'icon-action-redo',
          }
        ]
      }, */
      {
        name: "Mitigation Tracking",
        url: "/Reports/MitigationTracking",
        icon: "icon-equalizer",
      },
      {
        name: "Adaptation Tracking",
        url: "/Reports/AdaptationTracking",
        icon: "icon-bulb",
      },
      {
        name: "Finance Tracking",
        url: "/Reports/FinanceTracking",
        icon: "icon-chart",
      },
      {
        name: "SDG Tracking",
        url: "/Reports/SDGTracking",
        icon: "icon-link",
      },
      {
        name: "MRV Tracking",
        url: "/Reports/MRVTracking",
        icon: "icon-paper-clip",
      },
    ],
  },
];
