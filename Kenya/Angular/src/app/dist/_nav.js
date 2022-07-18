"use strict";
exports.__esModule = true;
exports.navItems = void 0;
exports.navItems = [
    {
        title: true,
        name: 'Navigations'
    },
    {
        name: 'Home',
        url: '/dashboard',
        icon: 'icon-speedometer'
    },
    {
        name: 'Menu management',
        url: '/menu',
        icon: 'icon-menu'
    },
    {
        name: 'User management',
        url: '/user/user-list',
        icon: 'icon-user'
    },
    {
        name: 'GHG Inventory',
        url: '/ghg-inventory',
        icon: 'icon-chemistry',
        children: [
            {
                name: 'Energy',
                url: '/energy',
                icon: 'icon-fire',
                children: [
                    {
                        name: 'Reference Approach',
                        url: '/ghg/energy/Reference_Approach',
                        icon: 'icon-energy'
                    },
                    {
                        name: 'Sectoral Approach',
                        url: '/sectoral-approach',
                        icon: 'icon-vector',
                        children: [
                            {
                                name: 'Energy Industries',
                                url: '/energy-industry',
                                icon: 'icon-globe',
                                children: [
                                    {
                                        name: 'Electricity Genration',
                                        url: '/ghg/energy/Sectoral_Approach/Energy_Industries/Electricity_Generation',
                                        icon: 'icon-cup'
                                    },
                                    {
                                        name: 'Production of Solid Fules',
                                        url: '/ghg/energy/Sectoral_Approach/Energy_Industries/Production_Solid_Fuels',
                                        icon: 'icon-globe-alt'
                                    }
                                ]
                            },
                            {
                                name: 'Manufacturing',
                                url: '/ghg/energy/Sectoral_Approach/Manufacturing',
                                icon: 'icon-rocket'
                            },
                            {
                                name: 'Transport',
                                url: '/ghg/energy/Sectoral_Approach/Transport',
                                icon: 'icon-plane'
                            },
                            {
                                name: 'Others',
                                url: '/ghg/energy/Sectoral_Approach/Others',
                                icon: 'icon-location-pin'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'IPPU',
                url: '/ippu',
                icon: 'icon-cursor',
                children: [
                    {
                        name: 'Mineral Industry',
                        url: '/mineral-industry',
                        icon: 'icon-shield',
                        children: [
                            {
                                name: 'Cement Production',
                                url: '/ghg/ippu/Mineral_Industry/Cement_Production',
                                icon: 'icon-hourglass'
                            },
                            {
                                name: 'Lime Production',
                                url: '/ghg/ippu/Mineral_Industry/Lime_Production',
                                icon: 'icon-anchor'
                            }
                        ]
                    },
                    {
                        name: 'Non- Energy Products from fuel and solvent use',
                        url: '/npffsu',
                        icon: 'icon-plus',
                        children: [
                            {
                                name: 'Lubricant Use',
                                url: '/ghg/ippu/Non_Energy_product/Lubricant_Use',
                                icon: 'icon-drop'
                            },
                            {
                                name: 'Solvent Use',
                                url: '/ghg/ippu/Non_Energy_product/Solvent_Use',
                                icon: 'icon-bubbles'
                            }
                        ]
                    },
                    {
                        name: 'Products uses as substitutes for ozone depleting substances',
                        url: '/pusods',
                        icon: 'icon-drawer',
                        children: [
                            {
                                name: 'Refrigeration and air conditioning',
                                url: '/ghg/ippu/Product_Substitutes/Refrigeration_Air',
                                icon: 'icon-magic-wand'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'AFOLU',
                url: '/afolu',
                icon: 'icon-feed',
                children: [
                    {
                        name: 'Livestock',
                        url: '/livestock',
                        icon: 'icon-doc',
                        children: [
                            {
                                name: 'Enteric Fermentation',
                                url: '/ghg/AFOLU/Livestock/EntericFermentation',
                                icon: 'icon-briefcase'
                            },
                            {
                                name: 'Manure Management',
                                url: '/ghg/AFOLU/Livestock/ManureManagement',
                                icon: 'icon-book-open'
                            }
                        ]
                    },
                    {
                        name: 'Land',
                        url: '/land',
                        icon: 'icon-graph',
                        children: [
                            {
                                name: 'Forest Land',
                                url: '/ghg/AFOLU/Land/ForestLand',
                                icon: 'icon-flag'
                            },
                            {
                                name: 'Cropland',
                                url: '/ghg/AFOLU/Land/Cropland',
                                icon: 'icon-flag'
                            },
                            {
                                name: 'Grassland',
                                url: '/ghg/AFOLU/Land/Grassland',
                                icon: 'icon-flag'
                            },
                            {
                                name: 'Wetland',
                                url: '/ghg/AFOLU/Land/Wetland',
                                icon: 'icon-flag'
                            },
                            {
                                name: 'Settlements',
                                url: '/ghg/AFOLU/Land/Settlements',
                                icon: 'icon-flag'
                            },
                            {
                                name: 'Other Lands',
                                url: '/ghg/AFOLU/Land/OtherLands',
                                icon: 'icon-flag'
                            }
                        ]
                    },
                    {
                        name: 'Aggregate sources and non Co2 emissions sources on land',
                        url: '/asnesol',
                        icon: 'icon-link',
                        children: [
                            {
                                name: 'Urea Application',
                                url: 'ghg/AFOLU/Aggregate_nonCO2/Urea_Application',
        
                                icon: 'icon-urea'
                            },
                            {
                                name: 'Emissions from biomass burning',
                                url: '/ghg/AFOLU/Aggregate_nonCO2/Emissions_Biomass',
                                icon: 'icon-bulb'
                            },
                            {
                                name: 'Indirect N2O emissions from manure management',
                                url: '/ghg/AFOLU/Aggregate_nonCO2/Indirect_N2O',
                                icon: 'icon-heart'
                            },
                            {
                                name: 'Rice Cultivation',
                                url: '/ghg/AFOLU/Aggregate_nonCO2/Rice_Cultivation',
                                icon: 'icon-chart'
                            }

                        ]
                    }
                ]
            },
            {
                name: 'Waste',
                url: '/waste',
                icon: 'icon-list',
                children: [
                    {
                        name: 'Solid waste disposal',
                        url: '/ghg/Waste/Solid_Waste_Disposal',
                        icon: 'icon-options-vertical'
                    },
                    {
                        name: 'Biological treatment of solid waste',
                        url: '/ghg/Waste/Biological_Treatment_SolidWaste',
                        icon: 'icon-options'
                    },
                    {
                        name: 'Incineration and open burning of waste',
                        url: '/ghg/Waste/Incineration_Waste',
                        icon: 'icon-layers'
                    },
                    {
                        name: 'Wastewater treatment and discharge',
                        url: '/ghg/Waste/Wastewater_Treatment_Discharge',
                        icon: 'icon-directions'
                    }
                ]
            },
        ]
    },
    {
        name: 'NDC Actions',
        url: '/ndc',
        icon: 'icon-direction'
    },
    {
        name: 'Mitigation Actions',
        url: '/mitigation-actions',
        icon: 'icon-magnet',
        children: [
            {
                name: 'Project information',
                url: '/Mitigation_Actions/ProjectInformation',
                icon: 'icon-check'
            },
            {
                name: 'Monitoring information',
                url: '/Mitigation_Actions/MonitoringInformation',
                icon: 'icon-screen-desktop'
            }
        ]
    },
    {
        name: 'Adoptaion Actions',
        url: '/adoptation-action',
        icon: 'icon-bell',
        children: [
            {
                name: 'Project information',
                url: '/Adaptation_Actions/ProjectInformation',
                icon: 'icon-check'
            },
            {
                name: 'Monitoring information',
                url: '/Adaptation_Actions/MonitoringInformation',
                icon: 'icon-screen-desktop'
            }
        ]
    },
    {
        name: 'Climate Finance',
        url: '/climate-finance',
        icon: 'icon-book-open',
        children: [
            {
                name: 'Project information',
                url: '/Climate_Finance/ProjectInformation',
                icon: 'icon-check'
            },
            {
                name: 'Monitoring information',
                url: '/Climate_Finance/MonitoringInformation',
                icon: 'icon-screen-desktop'
            }
        ]
    },
    {
        name: 'SDG Assessment',
        url: '/sdg-assessment',
        icon: 'icon-tag',
        children: [
            {
                name: 'Project information',
                url: '/SDG_Assessment/ProjectInformation',
                icon: 'icon-check'
            },
            {
                name: 'Monitoring information',
                url: '/SDG_Assessment/MonitoringInformation',
                icon: 'icon-screen-desktop'
            }
        ]
    },
    {
        name: 'Database',
        url: '/database',
        icon: 'icon-grid',
        children: [
            {
                name: 'Energy',
                url: '/database-energy',
                icon: 'icon-fire',
                children: [
                    {
                        name: 'Emission Factor-fuel',
                        url: '/Database/Energy/EmissionFactor',
                        icon: 'icon-cursor-move'
                    }
                ]
            },
            {
                name: 'IPPU',
                url: '/database-ippu',
                icon: 'icon-cursor',
                children: [
                    {
                        name: 'Emission Factor-IPPU',
                        url: '/Database/IPPU/EmissionFactor',
                        icon: 'icon-cursor-move'
                    },
                    {
                        name: 'GWP Database',
                        url: '/Database/IPPU/GWPDatabase',
                        icon: 'icon-vector'
                    }
                ]
            },
            {
                name: 'AFOLU',
                url: '/database-afolu',
                icon: 'icon-feed',
                children: [
                    {
                        name: 'Livestock population',
                        url: '/Database/AFOLU/LivestockPopulation',
                        icon: 'icon-puzzlee'
                    },
                    {
                        name: 'Emission Factor-livestock',
                        url: '/Database/AFOLU/EmissionFactor',
                        icon: 'icon-ghost'
                    }
                ]
            },
            {
                name: 'Waste',
                url: '/database-waste',
                icon: 'icon-list',
                children: [
                    {
                        name: 'Population',
                        url: '/Database/Waste/Population',
                        icon: 'icon-globe'
                    }
                ]
            }
        ]
    },
    {
        name: 'Reports',
        url: '/reports',
        icon: 'icon-book-open',
        children: [
            {
                name: 'GHG Inventory',
                url: '/reports-ghginventory',
                icon: 'icon-chemistry',
                children: [
                    {
                        name: 'GHG Inventory(year wise)',
                        url: '/Reports/GHGInventory/Yearwise',
                        icon: 'icon-action-undo'
                    },
                    {
                        name: 'GHG Inventory(gas wise)',
                        url: '/Reports/GHGInventory/Gaswise',
                        icon: 'icon-action-redo'
                    }
                ]
            },
            {
                name: 'Mitigation Tracking',
                url: '/Reports/MitigationTracking',
                icon: 'icon-equalizer'
            },
            {
                name: 'Adaptation Tracking',
                url: '/Reports/AdaptationTracking',
                icon: 'icon-bulb'
            },
            {
                name: 'Finance Tracking',
                url: '/Reports/FinanceTracking',
                icon: 'icon-chart'
            }, {
                name: 'SDG Tracking',
                url: '/Reports/SDGTracking',
                icon: 'icon-link'
            },
            {
                name: 'MRV Tracking',
                url: '/Reports/MRVTracking',
                icon: 'icon-paper-clip'
            }
        ]
    },
    {
        name: 'USER LIST',
        url: '/userlist',
        icon: 'icon-people'
    },
    {
        name: 'MY APPROVALS',
        url: '/my-approvals',
        icon: 'icon-user-following'
    }
];
