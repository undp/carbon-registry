var SDGOutputCount = require("./sdg-output-count");

class SDGReportOutput {

    sdgOutputCount;
    selectedCategory;
    
  constructor(
    selectedCategory,
    
  ) {
    this.sdgOutputCount =  new SDGOutputCount();
    this.selectedCategory = selectedCategory;

  }
}
module.exports = SDGReportOutput;
