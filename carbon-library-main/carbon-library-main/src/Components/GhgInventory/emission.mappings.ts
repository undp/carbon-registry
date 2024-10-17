export const EmissionSectors: any = {
  'Energy Industries': 'energyIndustries',
  'Manufacturing Industries and Construction': 'manufacturingIndustriesConstruction',
  Transport: 'transport',
  'Other Sectors': 'otherSectors',
  'Non-Specified': 'nonSpecified',
  'Solid Fuels': 'solidFuels',
  'Oil and Natural Gas': 'oilNaturalGas',
  'Other emissions from Energy Production': 'otherEmissionsEnergyProduction',
  'Transport of CO2': 'transportOfCo2',
  'Injection and Storage': 'injectionStorage',
  'Other (Carbon dioxide Transport and Storage)': 'otherCarbonDioxideTransportStorage',
  'Mineral Industry': 'mineralIndustry',
  'Chemical Industry': 'chemicalIndustry',
  'Metal Industry': 'metalIndustry',
  'Non-Energy Products from Fuels and Solvent Use': 'nonEnergyProductsFuelsSolventUse',
  'Electronics Industry': 'electronicsIndustry',
  'Product Uses as Substitutes for Ozone Depleting Substances':
    'productUsesSubstOzoneDepletingSubs',
  'Other Product Manufacture and Use': 'otherProductManufactureUse',
  'Other (Industrial Processes & Product Use)': 'otherIndustrialProcessesProductUse',
  Livestock: 'livestock',
  Land: 'land',
  'Aggregate sources and non-CO2 emissions sources on land': 'aggregateNonCo2SourcesLand',
  'Other (Agriculture, Forestry, and Other Land Use)': 'otherAgricultureForestryOtherLandUse',
  'Solid Waste Disposal': 'solidWasteDisposal',
  'Biological Treatment of Solid Waste': 'biologicalTreatmentSolidWaste',
  'Incineration and Open Burning of Waste': 'incinerationOpenBurningWaste',
  'Wastewater Treatment and Discharge': 'wastewaterTreatmentDischarge',
  'Other (Waste)': 'otherWaste',
  'Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3':
    'indirectN2oEmissions',
  Other: 'other',
  'Total CO2 equivalent emissions without land use, land-use change and forestry':
    'totalCo2WithoutLand',
  'Total CO2 equivalent emissions with land use, land-use change and forestry': 'totalCo2WithLand',
};

export const formFields = {
  energyEmissions: {
    fuelCombustionActivities: [
      'energyIndustries',
      'manufacturingIndustriesConstruction',
      'transport',
      'otherSectors',
      'nonSpecified',
    ],
    fugitiveEmissionsFromFuels: ['solidFuels', 'oilNaturalGas', 'otherEmissionsEnergyProduction'],
    carbonDioxideTransportStorage: ['transportOfCo2', 'injectionStorage', 'other'],
  },
  industrialProcessesProductUse: [
    'mineralIndustry',
    'chemicalIndustry',
    'metalIndustry',
    'nonEnergyProductsFuelsSolventUse',
    'electronicsIndustry',
    'productUsesSubstOzoneDepletingSubs',
    'otherProductManufactureUse',
    'other',
  ],
  agricultureForestryOtherLandUse: ['livestock', 'land', 'aggregateNonCo2SourcesLand', 'other'],
  waste: [
    'solidWasteDisposal',
    'biologicalTreatmentSolidWaste',
    'incinerationOpenBurningWaste',
    'wastewaterTreatmentDischarge',
    'other',
  ],
  other: ['indirectN2oEmissions', 'other'],
};

export const emissionCsvFieldMap: any = {
  "year": "Year",

  "energyEmissions_fuelCombustionActivities_energyIndustries_co2": "Energy Industries - CO2",
  "energyEmissions_fuelCombustionActivities_energyIndustries_ch4": "Energy Industries - CH4",
  "energyEmissions_fuelCombustionActivities_energyIndustries_n2o": "Energy Industries - N2O",
  "energyEmissions_fuelCombustionActivities_energyIndustries_co2eq": "Energy Industries - CO2-eq",

  "energyEmissions_fuelCombustionActivities_manufacturingIndustriesConstruction_co2": "Manufacturing Industries and Construction - CO2",
  "energyEmissions_fuelCombustionActivities_manufacturingIndustriesConstruction_ch4": "Manufacturing Industries and Construction - CH4",
  "energyEmissions_fuelCombustionActivities_manufacturingIndustriesConstruction_n2o": "Manufacturing Industries and Construction - N2O",
  "energyEmissions_fuelCombustionActivities_manufacturingIndustriesConstruction_co2eq": "Manufacturing Industries and Construction - CO2-eq",

  "energyEmissions_fuelCombustionActivities_transport_co2": "Transport - CO2",
  "energyEmissions_fuelCombustionActivities_transport_ch4": "Transport - CH4",
  "energyEmissions_fuelCombustionActivities_transport_n2o": "Transport - N2O",
  "energyEmissions_fuelCombustionActivities_transport_co2eq": "Transport - CO2-eq",

  "energyEmissions_fuelCombustionActivities_otherSectors_co2": "Other Sectors - CO2",
  "energyEmissions_fuelCombustionActivities_otherSectors_ch4": "Other Sectors - CH4",
  "energyEmissions_fuelCombustionActivities_otherSectors_n2o": "Other Sectors - N2O",
  "energyEmissions_fuelCombustionActivities_otherSectors_co2eq": "Other Sectors - CO2-eq",

  "energyEmissions_fuelCombustionActivities_nonSpecified_co2": "Non-Specified - CO2",
  "energyEmissions_fuelCombustionActivities_nonSpecified_ch4": "Non-Specified - CH4",
  "energyEmissions_fuelCombustionActivities_nonSpecified_n2o": "Non-Specified - N2O",
  "energyEmissions_fuelCombustionActivities_nonSpecified_co2eq": "Non-Specified - CO2-eq",

  "energyEmissions_fugitiveEmissionsFromFuels_solidFuels_co2": "Solid Fuels - CO2",
  "energyEmissions_fugitiveEmissionsFromFuels_solidFuels_ch4": "Solid Fuels - CH4",
  "energyEmissions_fugitiveEmissionsFromFuels_solidFuels_n2o": "Solid Fuels - N2O",
  "energyEmissions_fugitiveEmissionsFromFuels_solidFuels_co2eq": "Solid Fuels - CO2-eq",

  "energyEmissions_fugitiveEmissionsFromFuels_oilNaturalGas_co2": "Oil and Natural Gas - CO2",
  "energyEmissions_fugitiveEmissionsFromFuels_oilNaturalGas_ch4": "Oil and Natural Gas - CH4",
  "energyEmissions_fugitiveEmissionsFromFuels_oilNaturalGas_n2o": "Oil and Natural Gas - N2O",
  "energyEmissions_fugitiveEmissionsFromFuels_oilNaturalGas_co2eq": "Oil and Natural Gas - CO2-eq",

  "energyEmissions_fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_co2": "Other emissions from Energy Production - CO2",
  "energyEmissions_fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_ch4": "Other emissions from Energy Production - CH4",
  "energyEmissions_fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_n2o": "Other emissions from Energy Production - N2O",
  "energyEmissions_fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_co2eq": "Other emissions from Energy Production - CO2-eq",

  "energyEmissions_carbonDioxideTransportStorage_transportOfCo2_co2": "Transport of CO2 - CO2",
  "energyEmissions_carbonDioxideTransportStorage_transportOfCo2_ch4": "Transport of CO2 - CH4",
  "energyEmissions_carbonDioxideTransportStorage_transportOfCo2_n2o": "Transport of CO2 - N2O",
  "energyEmissions_carbonDioxideTransportStorage_transportOfCo2_co2eq": "Transport of CO2 - CO2-eq",

  "energyEmissions_carbonDioxideTransportStorage_injectionStorage_co2": "Injection and Storage - CO2",
  "energyEmissions_carbonDioxideTransportStorage_injectionStorage_ch4": "Injection and Storage - CH4",
  "energyEmissions_carbonDioxideTransportStorage_injectionStorage_n2o": "Injection and Storage - N2O",
  "energyEmissions_carbonDioxideTransportStorage_injectionStorage_co2eq": "Injection and Storage - CO2-eq"
  ,
  "energyEmissions_carbonDioxideTransportStorage_other_ch4": "Other (Carbon dioxide Transport and Storage) - CH4",
  "energyEmissions_carbonDioxideTransportStorage_other_co2": "Other (Carbon dioxide Transport and Storage) - CO2",
  "energyEmissions_carbonDioxideTransportStorage_other_n2o": "Other (Carbon dioxide Transport and Storage) - N2O",
  "energyEmissions_carbonDioxideTransportStorage_other_co2eq": "Other (Carbon dioxide Transport and Storage) - CO2-eq",

  "industrialProcessesProductUse_mineralIndustry_co2": "Mineral Industry - CO2",
  "industrialProcessesProductUse_mineralIndustry_ch4": "Mineral Industry - CH4",
  "industrialProcessesProductUse_mineralIndustry_n2o": "Mineral Industry - N2O",
  "industrialProcessesProductUse_mineralIndustry_co2eq": "Mineral Industry - CO2-eq",

  "industrialProcessesProductUse_chemicalIndustry_co2": "Chemical Industry - CO2",
  "industrialProcessesProductUse_chemicalIndustry_ch4": "Chemical Industry - CH4",
  "industrialProcessesProductUse_chemicalIndustry_n2o": "Chemical Industry - N2O",
  "industrialProcessesProductUse_chemicalIndustry_co2eq": "Chemical Industry - CO2-eq",

  "industrialProcessesProductUse_metalIndustry_co2": "Metal Industry - CO2",
  "industrialProcessesProductUse_metalIndustry_ch4": "Metal Industry - CH4",
  "industrialProcessesProductUse_metalIndustry_n2o": "Metal Industry - N2O",
  "industrialProcessesProductUse_metalIndustry_co2eq": "Metal Industry - CO2-eq",

  "industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_co2": "Non-Energy Products from Fuels and Solvent Use - CO2",
  "industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_ch4": "Non-Energy Products from Fuels and Solvent Use - CH4",
  "industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_n2o": "Non-Energy Products from Fuels and Solvent Use - N2O",
  "industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_co2eq": "Non-Energy Products from Fuels and Solvent Use - CO2-eq",

  "industrialProcessesProductUse_electronicsIndustry_co2": "Electronics Industry - CO2",
  "industrialProcessesProductUse_electronicsIndustry_ch4": "Electronics Industry - CH4",
  "industrialProcessesProductUse_electronicsIndustry_n2o": "Electronics Industry - N2O",
  "industrialProcessesProductUse_electronicsIndustry_co2eq": "Electronics Industry - CO2-eq",

  "industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_co2": "Product Uses as Substitutes for Ozone Depleting Substances - CO2",
  "industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_ch4": "Product Uses as Substitutes for Ozone Depleting Substances - CH4",
  "industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_n2o": "Product Uses as Substitutes for Ozone Depleting Substances - N2O",
  "industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_co2eq": "Product Uses as Substitutes for Ozone Depleting Substances - CO2-eq",

  "industrialProcessesProductUse_otherProductManufactureUse_co2": "Other Product Manufacture and Use - CO2",
  "industrialProcessesProductUse_otherProductManufactureUse_ch4": "Other Product Manufacture and Use - CH4",
  "industrialProcessesProductUse_otherProductManufactureUse_n2o": "Other Product Manufacture and Use - N2O",
  "industrialProcessesProductUse_otherProductManufactureUse_co2eq": "Other Product Manufacture and Use - CO2-eq",

  "industrialProcessesProductUse_other_co2": "Other (Industrial Processes & Product Use) - CO2",
  "industrialProcessesProductUse_other_ch4": "Other (Industrial Processes & Product Use) - CH4",
  "industrialProcessesProductUse_other_n2o": "Other (Industrial Processes & Product Use) - N2O",
  "industrialProcessesProductUse_other_co2eq": "Other (Industrial Processes & Product Use) - CO2-eq",

  "agricultureForestryOtherLandUse_livestock_co2": "Livestock - CO2",
  "agricultureForestryOtherLandUse_livestock_ch4": "Livestock - CH4",
  "agricultureForestryOtherLandUse_livestock_n2o": "Livestock - N2O",
  "agricultureForestryOtherLandUse_livestock_co2eq": "Livestock - CO2-eq",

  "agricultureForestryOtherLandUse_land_co2": "Land - CO2",
  "agricultureForestryOtherLandUse_land_ch4": "Land - CH4",
  "agricultureForestryOtherLandUse_land_n2o": "Land - N2O",
  "agricultureForestryOtherLandUse_land_co2eq": "Land - CO2-eq",

  "agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_co2": "Aggregate sources and non-CO2 emissions sources on land - CO2",
  "agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_ch4": "Aggregate sources and non-CO2 emissions sources on land - CH4",
  "agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_n2o": "Aggregate sources and non-CO2 emissions sources on land - N2O",
  "agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_co2eq": "Aggregate sources and non-CO2 emissions sources on land - CO2-eq",

  "agricultureForestryOtherLandUse_other_co2": "Other (Agriculture, Forestry, and Other Land Use) - CO2",
  "agricultureForestryOtherLandUse_other_ch4": "Other (Agriculture, Forestry, and Other Land Use) - CH4",
  "agricultureForestryOtherLandUse_other_n2o": "Other (Agriculture, Forestry, and Other Land Use) - N2O",
  "agricultureForestryOtherLandUse_other_co2eq": "Other (Agriculture, Forestry, and Other Land Use) - CO2-eq",

  "waste_solidWasteDisposal_co2": "Solid Waste Disposal - CO2",
  "waste_solidWasteDisposal_ch4": "Solid Waste Disposal - CH4",
  "waste_solidWasteDisposal_n2o": "Solid Waste Disposal - N2O",
  "waste_solidWasteDisposal_co2eq": "Solid Waste Disposal - CO2-eq",

  "waste_biologicalTreatmentSolidWaste_co2": "Biological Treatment of Solid Waste - CO2",
  "waste_biologicalTreatmentSolidWaste_ch4": "Biological Treatment of Solid Waste - CH4",
  "waste_biologicalTreatmentSolidWaste_n2o": "Biological Treatment of Solid Waste - N2O",
  "waste_biologicalTreatmentSolidWaste_co2eq": "Biological Treatment of Solid Waste - CO2-eq",

  "waste_incinerationOpenBurningWaste_co2": "Incineration and Open Burning of Waste - CO2",
  "waste_incinerationOpenBurningWaste_ch4": "Incineration and Open Burning of Waste - CH4",
  "waste_incinerationOpenBurningWaste_n2o": "Incineration and Open Burning of Waste - N2O",
  "waste_incinerationOpenBurningWaste_co2eq": "Incineration and Open Burning of Waste - CO2-eq",

  "waste_wastewaterTreatmentDischarge_co2": "Wastewater Treatment and Discharge - CO2",
  "waste_wastewaterTreatmentDischarge_ch4": "Wastewater Treatment and Discharge - CH4",
  "waste_wastewaterTreatmentDischarge_n2o": "Wastewater Treatment and Discharge - N2O",
  "waste_wastewaterTreatmentDischarge_co2eq": "Wastewater Treatment and Discharge - CO2-eq",

  "waste_other_co2": "Other (Waste) - CO2",
  "waste_other_ch4": "Other (Waste) - CH4",
  "waste_other_n2o": "Other (Waste) - N2O",
  "waste_other_co2eq": "Other (Waste) - CO2-eq",

  "other_indirectN2oEmissions_co2": "Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3 - CO2",
  "other_indirectN2oEmissions_ch4": "Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3 - CH4",
  "other_indirectN2oEmissions_n2o": "Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3 - N2O",
  "other_indirectN2oEmissions_co2eq": "Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3 - CO2-eq",

  "other_other_co2": "Other - CO2",
  "other_other_ch4": "Other - CH4",
  "other_other_n2o": "Other - N2O",
  "other_other_co2eq": "Other - CO2-eq",

  "totalCo2WithoutLand_co2": "Total CO2 equivalent emissions without land use, land-use change and forestry - CO2",
  "totalCo2WithoutLand_ch4": "Total CO2 equivalent emissions without land use, land-use change and forestry - CH4",
  "totalCo2WithoutLand_n2o": "Total CO2 equivalent emissions without land use, land-use change and forestry - N2O",
  "totalCo2WithoutLand_co2eq": "Total CO2 equivalent emissions without land use, land-use change and forestry - CO2-eq",

  "totalCo2WithLand_co2": "Total CO2 equivalent emissions with land use, land-use change and forestry - CO2",
  "totalCo2WithLand_ch4": "Total CO2 equivalent emissions with land use, land-use change and forestry - CH4",
  "totalCo2WithLand_n2o": "Total CO2 equivalent emissions with land use, land-use change and forestry - N2O",
  "totalCo2WithLand_co2eq": "Total CO2 equivalent emissions with land use, land-use change and forestry - CO2-eq",
}

export const projectionsCsvFieldMap: any = {
  "year": "Year",
  "energyEmissions_fuelCombustionActivities_energyIndustries_bau": "Energy Industries - BAU",
  "energyEmissions_fuelCombustionActivities_energyIndustries_conditionalNdc": "Energy Industries - Conditional NDC",
  "energyEmissions_fuelCombustionActivities_energyIndustries_unconditionalNdc": "Energy Industries - Unconditional NDC",

  "energyEmissions_fuelCombustionActivities_manufacturingIndustriesConstruction_bau": "Manufacturing Industries and Construction - BAU",
  "energyEmissions_fuelCombustionActivities_manufacturingIndustriesConstruction_conditionalNdc": "Manufacturing Industries and Construction - Conditional NDC",
  "energyEmissions_fuelCombustionActivities_manufacturingIndustriesConstruction_unconditionalNdc": "Manufacturing Industries and Construction - Unconditional NDC",

  "energyEmissions_fuelCombustionActivities_transport_bau": "Transport - BAU",
  "energyEmissions_fuelCombustionActivities_transport_conditionalNdc": "Transport - Conditional NDC",
  "energyEmissions_fuelCombustionActivities_transport_unconditionalNdc": "Transport - Unconditional NDC",

  "energyEmissions_fuelCombustionActivities_otherSectors_bau": "Other Sectors - BAU",
  "energyEmissions_fuelCombustionActivities_otherSectors_conditionalNdc": "Other Sectors - Conditional NDC",
  "energyEmissions_fuelCombustionActivities_otherSectors_unconditionalNdc": "Other Sectors - Unconditional NDC",

  "energyEmissions_fuelCombustionActivities_nonSpecified_bau": "Non-Specified - BAU",
  "energyEmissions_fuelCombustionActivities_nonSpecified_conditionalNdc": "Non-Specified - Conditional NDC",
  "energyEmissions_fuelCombustionActivities_nonSpecified_unconditionalNdc": "Non-Specified - Unconditional NDC",


  "energyEmissions_fugitiveEmissionsFromFuels_solidFuels_bau": "Solid Fuels - BAU",
  "energyEmissions_fugitiveEmissionsFromFuels_solidFuels_conditionalNdc": "Solid Fuels - Conditional NDC",
  "energyEmissions_fugitiveEmissionsFromFuels_solidFuels_unconditionalNdc": "Solid Fuels - Unconditional NDC",

  "energyEmissions_fugitiveEmissionsFromFuels_oilNaturalGas_bau": "Oil and Natural Gas - BAU",
  "energyEmissions_fugitiveEmissionsFromFuels_oilNaturalGas_conditionalNdc": "Oil and Natural Gas - Conditional NDC",
  "energyEmissions_fugitiveEmissionsFromFuels_oilNaturalGas_unconditionalNdc": "Oil and Natural Gas - Unconditional NDC",

  "energyEmissions_fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_bau": "Other emissions from Energy Production - BAU",
  "energyEmissions_fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_conditionalNdc": "Other emissions from Energy Production - Conditional NDC",
  "energyEmissions_fugitiveEmissionsFromFuels_otherEmissionsEnergyProduction_unconditionalNdc": "Other emissions from Energy Production - Unconditional NDC",

  "energyEmissions_carbonDioxideTransportStorage_transportOfCo2_bau": "Transport of CO2 - BAU",
  "energyEmissions_carbonDioxideTransportStorage_transportOfCo2_conditionalNdc": "Transport of CO2 - Conditional NDC",
  "energyEmissions_carbonDioxideTransportStorage_transportOfCo2_unconditionalNdc": "Transport of CO2 - Unconditional NDC",

  "energyEmissions_carbonDioxideTransportStorage_injectionStorage_bau": "Injection and Storage - BAU",
  "energyEmissions_carbonDioxideTransportStorage_injectionStorage_conditionalNdc": "Injection and Storage - Conditional NDC",
  "energyEmissions_carbonDioxideTransportStorage_injectionStorage_unconditionalNdc": "Injection and Storage - Unconditional NDC",

  "energyEmissions_carbonDioxideTransportStorage_other_bau": "Other (Carbon dioxide Transport and Storage) - BAU",
  "energyEmissions_carbonDioxideTransportStorage_other_conditionalNdc": "Other (Carbon dioxide Transport and Storage) - Conditional NDC",
  "energyEmissions_carbonDioxideTransportStorage_other_unconditionalNdc": "Other (Carbon dioxide Transport and Storage) - Unconditional NDC",

  "industrialProcessesProductUse_mineralIndustry_bau": "Mineral Industry - BAU",
  "industrialProcessesProductUse_mineralIndustry_conditionalNdc": "Mineral Industry - Conditional NDC",
  "industrialProcessesProductUse_mineralIndustry_unconditionalNdc": "Mineral Industry - Unconditional NDC",

  "industrialProcessesProductUse_chemicalIndustry_bau": "Chemical Industry - BAU",
  "industrialProcessesProductUse_chemicalIndustry_conditionalNdc": "Chemical Industry - Conditional NDC",
  "industrialProcessesProductUse_chemicalIndustry_unconditionalNdc": "Chemical Industry - Unconditional NDC",

  "industrialProcessesProductUse_metalIndustry_bau": "Metal Industry - BAU",
  "industrialProcessesProductUse_metalIndustry_conditionalNdc": "Metal Industry - Conditional NDC",
  "industrialProcessesProductUse_metalIndustry_unconditionalNdc": "Metal Industry - Unconditional NDC",

  "industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_bau": "Non-Energy Products from Fuels and Solvent Use - BAU",
  "industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_conditionalNdc": "Non-Energy Products from Fuels and Solvent Use - Conditional NDC",
  "industrialProcessesProductUse_nonEnergyProductsFuelsSolventUse_unconditionalNdc": "Non-Energy Products from Fuels and Solvent Use - Unconditional NDC",

  "industrialProcessesProductUse_electronicsIndustry_bau": "Electronics Industry - BAU",
  "industrialProcessesProductUse_electronicsIndustry_conditionalNdc": "Electronics Industry - Conditional NDC",
  "industrialProcessesProductUse_electronicsIndustry_unconditionalNdc": "Electronics Industry - Unconditional NDC",

  "industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_bau": "Product Uses as Substitutes for Ozone Depleting Substances - BAU",
  "industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_conditionalNdc": "Product Uses as Substitutes for Ozone Depleting Substances - Conditional NDC",
  "industrialProcessesProductUse_productUsesSubstOzoneDepletingSubs_unconditionalNdc": "Product Uses as Substitutes for Ozone Depleting Substances - Unconditional NDC",

  "industrialProcessesProductUse_otherProductManufactureUse_bau": "Other Product Manufacture and Use - BAU",
  "industrialProcessesProductUse_otherProductManufactureUse_conditionalNdc": "Other Product Manufacture and Use - Conditional NDC",
  "industrialProcessesProductUse_otherProductManufactureUse_unconditionalNdc": "Other Product Manufacture and Use - Unconditional NDC",

  "industrialProcessesProductUse_other_bau": "Other (Industrial Processes & Product Use) - BAU",
  "industrialProcessesProductUse_other_conditionalNdc": "Other (Industrial Processes & Product Use) - Conditional NDC",
  "industrialProcessesProductUse_other_unconditionalNdc": "Other (Industrial Processes & Product Use) - Unconditional NDC",

  "agricultureForestryOtherLandUse_livestock_bau": "Livestock - BAU",
  "agricultureForestryOtherLandUse_livestock_conditionalNdc": "Livestock - Conditional NDC",
  "agricultureForestryOtherLandUse_livestock_unconditionalNdc": "Livestock - Unconditional NDC",

  "agricultureForestryOtherLandUse_land_bau": "Land - BAU",
  "agricultureForestryOtherLandUse_land_conditionalNdc": "Land - Conditional NDC",
  "agricultureForestryOtherLandUse_land_unconditionalNdc": "Land - Unconditional NDC",

  "agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_bau": "Aggregate sources and non-CO2 emissions sources on land - BAU",
  "agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_conditionalNdc": "Aggregate sources and non-CO2 emissions sources on land - Conditional NDC",
  "agricultureForestryOtherLandUse_aggregateNonCo2SourcesLand_unconditionalNdc": "Aggregate sources and non-CO2 emissions sources on land - Unconditional NDC",

  "agricultureForestryOtherLandUse_other_bau": "Other (Agriculture, Forestry, and Other Land Use) - BAU",
  "agricultureForestryOtherLandUse_other_conditionalNdc": "Other (Agriculture, Forestry, and Other Land Use) - Conditional NDC",
  "agricultureForestryOtherLandUse_other_unconditionalNdc": "Other (Agriculture, Forestry, and Other Land Use) - Unconditional NDC",

  "waste_solidWasteDisposal_bau": "Solid Waste Disposal - BAU",
  "waste_solidWasteDisposal_conditionalNdc": "Solid Waste Disposal - Conditional NDC",
  "waste_solidWasteDisposal_unconditionalNdc": "Solid Waste Disposal - Unconditional NDC",

  "waste_biologicalTreatmentSolidWaste_bau": "Biological Treatment of Solid Waste - BAU",
  "waste_biologicalTreatmentSolidWaste_conditionalNdc": "Biological Treatment of Solid Waste - Conditional NDC",
  "waste_biologicalTreatmentSolidWaste_unconditionalNdc": "Biological Treatment of Solid Waste - Unconditional NDC",

  "waste_incinerationOpenBurningWaste_bau": "Incineration and Open Burning of Waste - BAU",
  "waste_incinerationOpenBurningWaste_conditionalNdc": "Incineration and Open Burning of Waste - Conditional NDC",
  "waste_incinerationOpenBurningWaste_unconditionalNdc": "Incineration and Open Burning of Waste - Unconditional NDC",

  "waste_wastewaterTreatmentDischarge_bau": "Wastewater Treatment and Discharge - BAU",
  "waste_wastewaterTreatmentDischarge_conditionalNdc": "Wastewater Treatment and Discharge - Conditional NDC",
  "waste_wastewaterTreatmentDischarge_unconditionalNdc": "Wastewater Treatment and Discharge - Unconditional NDC",

  "waste_other_bau": "Other (Waste) - BAU",
  "waste_other_conditionalNdc": "Other (Waste) - Conditional NDC",
  "waste_other_unconditionalNdc": "Other (Waste) - Unconditional NDC",

  "other_indirectN2oEmissions_bau": "Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3 - BAU",
  "other_indirectN2oEmissions_conditionalNdc": "Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3 - Conditional NDC",
  "other_indirectN2oEmissions_unconditionalNdc": "Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3 - Unconditional NDC",

  "other_other_bau": "Other - BAU",
  "other_other_conditionalNdc": "Other - Conditional NDC",
  "other_other_unconditionalNdc": "Other - Unconditional NDC",

  "totalCo2WithoutLand_bau": "Total CO2 equivalent emissions without land use, land-use change and forestry - BAU",
  "totalCo2WithoutLand_conditionalNdc": "Total CO2 equivalent emissions without land use, land-use change and forestry - Conditional NDC",
  "totalCo2WithoutLand_unconditionalNdc": "Total CO2 equivalent emissions without land use, land-use change and forestry - Unconditional NDC",

  "totalCo2WithLand_bau": "Total CO2 equivalent emissions with land use, land-use change and forestry - BAU",
  "totalCo2WithLand_conditionalNdc": "Total CO2 equivalent emissions with land use, land-use change and forestry - Conditional NDC",
  "totalCo2WithLand_unconditionalNdc": "Total CO2 equivalent emissions with land use, land-use change and forestry - Unconditional NDC",
}

export const totalEmissionFields = [
  'Total National Emission and Removals - CO2',
  'Total National Emission and Removals - CH4',
  'Total National Emission and Removals - N2O',
  'Total National Emission and Removals - CO2eq',
]

export const totalProjectionFields = [
  'Total National Emission and Removals - BAU',
  'Total National Emission and Removals - Conditional NDC',
  'Total National Emission and Removals - Unconditional NDC',
]

export const excelFields = [
  "Energy",
  "Fuel Combustion Activities",
  "Energy Industries",
  "Manufacturing Industries and Construction",
  "Transport",
  "Other Sectors",
  "Non-Specified",
  "Fugitive emissions from fuels",
  "Solid Fuels",
  "Oil and Natural Gas",
  "Other emissions from Energy Production",
  "Carbon dioxide Transport and Storage",
  "Transport of CO2",
  "Injection and Storage",
  "Other (Carbon dioxide Transport and Storage)",
  "Industrial Processes & Product Use",
  "Mineral Industry",
  "Chemical Industry",
  "Metal Industry",
  "Non-Energy Products from Fuels and Solvent Use",
  "Electronics Industry",
  "Product Uses as Substitutes for Ozone Depleting Substances",
  "Other Product Manufacture and Use",
  "Other (Industrial Processes & Product Use)",
  "Agriculture, Forestry, and Other Land Use",
  "Livestock",
  "Land",
  "Aggregate sources and non-CO2 emissions sources on land",
  "Other (Agriculture, Forestry, and Other Land Use)",
  "Waste",
  "Solid Waste Disposal",
  "Biological Treatment of Solid Waste",
  "Incineration and Open Burning of Waste",
  "Wastewater Treatment and Discharge",
  "Other (Waste)",
  "Other",
  "Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3",
  "Other",

  "Total CO2 equivalent emissions without land use, land-use change and forestry",
  "Total CO2 equivalent emissions with land use, land-use change and forestry",

]