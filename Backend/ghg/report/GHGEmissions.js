class GHGEmissions {
    co2Emission;
    ch4Emission;
    n2oEmission;
    totalEmission;
    constructor(co2Emission, ch4Emission, n2oEmission, totalEmission) {
        this.co2Emission = co2Emission;
        this.ch4Emission = ch4Emission;
        this.n2oEmission = n2oEmission;
        this.totalEmission = totalEmission;
    }
}
module.exports = GHGEmissions;