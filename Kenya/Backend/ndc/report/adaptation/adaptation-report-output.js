
var AdaptationOutputCount = require("./adaptation-output-count")
class AdaptationReportOutput {

    adaptationOutputCount;
    selectedCategory;
    
  constructor(
    selectedCategory,
    
  ) {
    this.adaptationOutputCount =  new AdaptationOutputCount();
    this.selectedCategory = selectedCategory;

  }
}
module.exports = AdaptationReportOutput;