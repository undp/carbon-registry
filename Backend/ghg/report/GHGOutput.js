class GHGOutput {

    unit;
    fuelCombustion;
    energyIndustries;
    manufacturing;
    transport;
    others;
    ippu;
    ods;
    refrigeration;
    mineral;
    cement;
    lime;
    nonEnergy;
    lubricant;
    solvent;
    waste;
    solid;
    biological;
    incineration;
    wasteWater;
    afolu;
    livestock;
    enteric;
    manure;
    land;
    forest;
    grassland;
    cropland;
    wetland;
    settlement;
    otherLand;
    aggregate;
    biomassBurning;
    indirectn2o;
    rice;
    memo;
    aviation;
    water;
    referenceApproach;
    total;
  constructor(
    unit,
    fuelCombustion,
    energyIndustries,
    manufacturing,
    transport,
    others,
    ippu,
    ods,
    refrigeration,
    mineral,
    cement,
    lime,
    nonEnergy,
    lubricant,
    solvent,
    waste,
    solid,
    biological,
    incineration,
    wasteWater,
    afolu,
    livestock,
    enteric,
    manure,
    land,
    forest,
    grassland,
    cropland,
    wetland,
    settlement,
    otherLand,
    aggregate,
    biomassBurning,
    indirectn2o,
    rice,
    memo,
    aviation,
    water,
    referenceApproach,
    total
  ) {
    this.unit = unit;
    this.fuelCombustion = fuelCombustion;
    this.energyIndustries = energyIndustries;
    this.manufacturing = manufacturing;
    this.transport = transport;
    this.others = others;
    this.ippu = ippu;
    this.ods = ods;
    this.refrigeration = refrigeration;
    this.mineral = mineral;
    this.cement = cement;
    this.lime = lime;
    this.nonEnergy = nonEnergy;
    this.lubricant = lubricant;
    this.solvent = solvent;
    this.waste = waste;
    this.solid = solid;
    this.biological = biological;
    this.incineration = incineration;
    this.wasteWater = wasteWater;
    this.afolu = afolu;
    this.livestock = livestock;
    this.enteric = enteric;
    this.manure = manure;
    this.land = land;
    this.forest = forest;
    this.grassland = grassland;
    this.cropland = cropland;
    this.wetland = wetland;
    this.settlement = settlement;
    this.otherLand = otherLand;
    this.aggregate = aggregate;
    this.biomassBurning = biomassBurning;
    this.indirectn2o = indirectn2o;
    this.rice = rice;
    this.memo = memo;
    this.aviation = aviation;
    this.water = water;
    this.referenceApproach = referenceApproach;
    this.total = total;
  }
}
module.exports = GHGOutput;
