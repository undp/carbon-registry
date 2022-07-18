<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>EF Database</title>
	<!-- Global stylesheets -->
	<link rel="shortcut icon" href="global_assets/images/Gambia.png">
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
	<link href="global_assets/css/icons/icomoon/styles.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/bootstrap_limitless.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/layout.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/components.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/colors.min.css" rel="stylesheet" type="text/css">
	<!-- /global stylesheets -->

	<!-- Core JS files -->
	<script src="global_assets/js/main/jquery.min.js"></script>
	<script src="global_assets/js/main/bootstrap.bundle.min.js"></script>
	<script src="global_assets/js/plugins/loaders/blockui.min.js"></script>
	<!-- /core JS files -->

	<!-- Theme JS files -->
	<script src="global_assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/jszip/jszip.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/buttons.min.js"></script>

	<script src="assets/js/app.js"></script>
	<script src="global_assets/js/demo_pages/datatables_extension_buttons_html5.js"></script>
	<script src="global_assets/js/demo_pages/form_select2.js"></script>
	<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />

<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

<form action="saveGHGFuelMapping" onsubmit="return setValues();" method="post" class="form-horizontal bordered-row" id="energyForm" data-parsley-validate="">
	<!-- 2 columns form -->
	<div class="card border-slate">
					<div class="card-header bg-slate-700">
						<h5 class="card-title text-uppercase text-center">Emission Factor Database - Fuel</h5>
											</div>
	<div class="card-body">
	<div class="table-responsive">										
					<table id="efdbFuel" class="table table-bordered datatable-button-html5-basic">
					<thead>
							<tr class="bg-slate-700">
								
								<th>Fuel Type</th>
								<th>Fuel</th>
								<th>NCV (TJ/Gg)</th>
                                <th>CO<sub>2</sub> Emission Factor (kgCO<sub>2</sub>/TJ)</th>
                                <th>CH<sub>4</sub> Emission Factor (kgCH<sub>4</sub>/TJ)</th>
								<th>N<sub>2</sub>O Emission Factor (kgN<sub>2</sub>O/TJ)</th>
								<th>Reference</th>
								<th>Select</th>
							</tr>
							</thead>
							<tbody id="tableFuelEF">
							<c:forEach var="output" varStatus="loop" items="${ghgFuelMappingList}">
                            	
									<tr>
								
										<td>${output.getFuelType()}</td>
										<td>${output.getFuel()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getNCV()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEFCO2()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEFCH4()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEFN2O()}</td>	
										<td contenteditable='true'>${output.getReference()}</td>
										<td><input type="checkbox"></td>
									</tr>
							    </c:forEach>
							</tbody>
						</table></div>
						
						 <input type="button" class="btn btn-sm bg-slate-700 delete-row1" value="Delete Row">
						 
						 <div class="bg-default content-box text-center pad20A mrg25T">
                    <button  id = "submitButton" class="btn bg-slate-700">Save/Submit</button>
                </div><hr>
						  <h6 class="card-title">Add Fuel</h6>
      <div class="form-group row">
   
   <div class="col-lg-2 font-size-sm">Fuel Type
   <select name="fuelType"  data-placeholder="--Select--" class="form-control select" id="fuelTypeId" onchange="populateFuel(1);">
   <option></option>
   							<c:forEach var="listValue" items="${fuelTypes}">
							<option value="${listValue}">${listValue}</option>
							</c:forEach>
   </select>
     <span class="form-text text-muted">Select fuel type</span>
    </div>
   <div class="col-lg-2 font-size-sm">Fuel
   <input name="fuel" id="fuelId" class="form-control">
    <span class="form-text text-muted">Enter fuel</span>
   </div>
    <div class="col-lg-1 font-size-sm">NCV
   <input id = 'ncv' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text text-muted">TJ/Gg</span>
    </div>
    <div class="col-lg-1 font-size-sm">EF CO<sub>2</sub> 
   <input id = 'co2Ef' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted">kgCO<sub>2</sub>/TJ</span>
    </div>
    <div class="col-lg-1 font-size-sm">EF CH<sub>4</sub>
   <input id = 'ch4Ef' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted">kgCH<sub>4</sub>/TJ</span>
    </div>
    <div class="col-lg-1 font-size-sm">EF N<sub>2</sub>O 
   <input id = 'n2oEf' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted">kgN<sub>2</sub>O/TJ</span>
    </div>
    <div class="col-lg-2 font-size-sm">Reference
   <input type="text" id = 'ref'class="form-control">
    <span class="form-text text-muted">Enter data source</span>
   </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-slate-700 add-row1">Add</button>
  </div></div>
						 
					</div>
				</div></form>
	</div></div></div></body>
	<script>
	$(document).ready(function(){
	
    $(".add-row1").click(function(){
        var fuelType = $("#fuelTypeId").val();
        var fuel = $("#fuelId").val();
        var ncv = $("#ncv").val();
        var co2 = $("#co2Ef").val();
        var ch4 = $("#ch4Ef").val();
        var n2o = $("#n2oEf").val();
        var reference = $("#ref").val();
        var markup = "<tr><td>" + fuelType + "</td><td>" + fuel + "</td><td>" + ncv + "</td><td>" + co2 + "</td><td>" + ch4 + "</td><td>" + n2o + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#efdbFuel tbody").append(markup);
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#efdbFuel tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});

var rowAdded = 0
	
function setValues(){
    var table = document.getElementById('efdbFuel');
    var rowLength = table.rows.length;
    
    for (i = 1; i < rowLength; i++){
       var cells = table.rows.item(i).cells;
       var cellLength = cells.length;
      
       var x = i-1;
       for(var j = 0; j < cellLength; j++){
           var cell = cells.item(j);
           var cellVal = cell.innerHTML;
    
           var name ;
           if(j==0 ){
        	   name = "fuelMappingList["+x+"].fuelType";
           }
           if(j==1){
        	   name = "fuelMappingList["+x+"].fuel";
           }
           if(j==2){
        	   name = "fuelMappingList["+x+"].NCV";
        	   

           }
           if(j==3){
        	   name = "fuelMappingList["+x+"].EFCO2";
        	   
           }
           if(j==4){
        	   name = "fuelMappingList["+x+"].EFCH4";
        	   
           }
           if(j==5){
        	   name = "fuelMappingList["+x+"].EFN2O";
        	              }
           
           if(j==6){
         	  name = "fuelMappingList["+x+"].reference";
            }
           
           createHiddenField(name,cellVal);
          
        }
	 }

}


function createHiddenField(name, value){
	if(document.getElementsByName(name).length != 0) { //already exist
		
	}else{
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", name);
		input.setAttribute("id", name);
		input.setAttribute("value", value); 
		document.getElementById("energyForm").appendChild(input);
	}
	
}
	
	</script>
	<script src="global_assets/input-mask.js"></script>
   <script src="global_assets/js/input-mask.js"></script>
</html>
