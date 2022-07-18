var arr = [];
$("#initial").find("option").each((elm,val)=>{
    var obj = {element:"select",
        key:"landUse"};
    obj["label"] = obj["value"] = $(val).val();
arr.push(obj)
});


// script for livestock emission factor seed from live site
var arr = [];
var keyPair = {
	"0" : "livestock",
	"1" : "efEntericFermentation",
	"2" : "efManureManagement",
	"3" : "nExcretionRate",
	"4" : "typicalAnimalMass",
	"5" : "nitrogenExcretionManaged",
	"6" : "efDirectN2OEmissions",
	"7" : "managedManure",
	"8" : "fractionOfManagedLivestockNitrogen",
	"9" : "emissionFactorForN2O",
	"10" : "reference",
}
$("#livestockTable tr").each((index,elem)=>{
	var obj = {};
    console.log("======================== >>>>>>>>>>>>>  ",index)
    $(elem).find("td").each((j,tdElem)=>  {
		obj[keyPair[j.toString()]] = $(tdElem).text();
	})
	arr.push(obj);
})

// script to get database-ippu-gwp data
var arr = [];
$("#gwpTable tbody tr").each((index,elem)=>{
	var obj = {};
    
    $(elem).find("td").each((j,tdElem)=>  {
		// obj[keyPair[j.toString()]] = $(tdElem).text();
		if(j == 0) {
			obj["gas"] = $(tdElem).text();
		}
		else if(j == 1) {
			obj["gwp"] = $(tdElem).text();
		}
	})
	arr.push(obj);
})
console.log(JSON.stringify(arr));