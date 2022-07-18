<%@page import="com.gambia.model.ghg.*"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Livestock Emission Factor Database</title>
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
	<script src="global_assets/js/demo_pages/components_modals.js"></script>
	<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />

<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
	<div class="card border-slate">
					<div class="card-header bg-slate-700">
						<h5 class="card-title text-uppercase text-center">Livestock Emission Factor Database</h5>
											</div>
	<div class="card-body">										
<form action="saveGHGLivestockDatabase" onsubmit="return setValues();" method="post" class="form-horizontal bordered-row" id="livestockEFForm" data-parsley-validate="">
<div class="table-responsive">
    					<table id="livestockTable" class="table table-bordered datatable-button-html5-basic">
						<thead>
                            <tr class="bg-slate-700 font-size-sm">
                                <th>Category</th>
                                <th>EF<sub>Enteric Fermentation</sub> (kgCH<sub>4</sub>/ head/ year)</th>
                                <th>EF<sub>Manure Management</sub> (kgCH<sub>4</sub>/ head/ year)</th>
                                <th>N Excretion Rate (kgN/ 1000kg animal/ day)</th>
                                <th>Typical Animal Mass (kg)</th>
                                <th>Nitrogen Excretion Managed in MMS (%)</th>
                                <th>EF Direct N<sub>2</sub>O-N Emissions from MMS</th>
                                <th>Managed Manure N lost in MMS (%)</th>
                                <th>Fraction of managed livestock manure nitrogen that volatilises</th>
                                <th>EF N2O emissions from atmospheric deposition of nitrogen on soils and water surfaces</th>
                                <th>Reference</th>
                                <th></th>
                            </tr>
                            </thead>
                           <tbody id="tableLivestockEF">
                           <c:forEach var="output" varStatus="loop" items="${livestockDatabaseList}">
									<tr class="font-size-sm">
										<td>${output.getAnimalcategory()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'numeric', 'autoGroup': true" im-insert="true">${output.getEfef()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEfmm()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getNer()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAnimalMass()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getNem()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEfd()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getMmLost()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getFracVol()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEfAtm()}</td>	
										<td contenteditable='true'>${output.getReference()}</td>
										<td contenteditable='true'><input type="checkbox"></td>
									</tr>
									</c:forEach>
							</tbody>
						</table>
						</div>
						<br>
                   <input type="button" class="btn btn-sm bg-slate-700 delete-row1" value="Delete Row">
                   <button type="button" class="btn btn-sm bg-slate-700" data-toggle="modal" data-target="#modal_form_vertical">Add Row</button><hr>              
    
    <div class="bg-default content-box text-center pad20A mrg25T">
                    	<button  id = "submitButton" class="btn bg-slate-700">Save/Submit</button>
                		</div>
    		  	<div id="modal_form_vertical" class="modal fade" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
   		<div class="modal-body">
   		<div class="modal-header">
								<h5 class="modal-title"><b>Add New Livestock Category</b></h5>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<br>
      <div class="form-group row">
   <div class="col-lg-6 font-size-sm">Livestock
   <input class="form-control" id="livestock">
    </div>
   <div class="col-lg-6 font-size-sm">EF Enteric Fermentation (kgCH<sub>4</sub>/ head/ year)
   <input id="efef" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted"></span>
   </div></div>
      <div class="form-group row">
    <div class="col-lg-6 font-size-sm">EF Manure Management (kgCH<sub>4</sub>/ head/ year) 
   <input id = 'efmm' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted"></span>
    </div>
    <div class="col-lg-6 font-size-sm">N Excretion Rate (kgN/ 1000kg animal/ day)  
   <input id = 'ner' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted"></span>
    </div>
    </div>
       <div class="form-group row">
    <div class="col-lg-6 font-size-sm">Typical Animal Mass (kg)
   <input id = 'animalMass' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   
    </div>
    <div class="col-lg-6 font-size-sm">Nitrogen Excretion Managed in MMS (fraction)  
   <input id = 'nem' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   
    </div></div>
    <div class="form-group row">
    <div class="col-lg-6 font-size-sm">EF Direct N<sub>2</sub>O-N Emissions from MMS  
   <input id = 'efd' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted"></span>
    </div>
      <div class="col-lg-6 font-size-sm">Managed Manure N lost in MMS (%)  
   <input id = 'mmLost' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted"></span>
    </div></div>
    <div class="form-group row">
    <div class="col-lg-6 font-size-sm">Fraction of managed livestock manure nitrogen that volatilises  
   <input id = 'fracVol' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted"></span>
    </div>
      <div class="col-lg-6 font-size-sm">Emission factor for N2O emissions from atmospheric deposition of nitrogen on soils and water surfaces  
   <input id = 'efAtm' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted"></span>
    </div></div>
    <div class="form-group row">
    <div class="col-lg-6 font-size-sm">Reference
   <input type="text" id = 'ref'class="form-control">
    </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-slate-700add-row1">Add</button></div></div>
  </div></div></div></div></form></div></div></div></div></body> 
    
 <script>
	$(document).ready(function(){
	
    $(".add-row1").click(function(){
        var livestock = $("#livestock").val();
        var efef = $("#efef").val();
        var efmm = $("#efmm").val();
        var ner = $("#ner").val();
        var animal = $("#animalMass").val();
        var nem = $("#nem").val();
        var efd = $("#efd").val();
        var mmLost = $("#mmLost").val();
        var fracVol = $("#efd").val();
        var efAtm = $("#mmLost").val();
        var reference = $("#ref").val();
        var markup = "<tr><td contenteditable='true'>" + livestock + "</td><td contenteditable='true'>" + efef + "</td><td contenteditable='true'>" + efmm + "</td><td contenteditable='true'>" + ner + "</td><td contenteditable='true'>" + animal + "</td><td contenteditable='true'>" + nem + "</td><td contenteditable='true'>" + efd + "</td><td contenteditable='true'>" + mmLost + "</td><td contenteditable='true'>" + fracVol + "</td><td contenteditable='true'>" + efAtm + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#livestockTable tbody").append(markup);
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#livestockTable tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});

var rowAdded = 0
	
function setValues(){
    var table = document.getElementById('livestockTable');
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
        	   name = "livestockEFList["+x+"].animalcategory";
           }
           if(j==1){
        	   name = "livestockEFList["+x+"].efef";
           }
           if(j==2){
        	   name = "livestockEFList["+x+"].efmm";
        	   

           }
           if(j==3){
        	   name = "livestockEFList["+x+"].ner";
        	   
           }
           if(j==4){
        	   name = "livestockEFList["+x+"].animalMass";
        	   
           }
           if(j==5){
        	   name = "livestockEFList["+x+"].nem";
    	   }
           if(j==6){
        	   name = "livestockEFList["+x+"].efd";
    	   }
           if(j==7){
        	   name = "livestockEFList["+x+"].mmLost";
    	   }
           
           if(j==8){
        	   name = "livestockEFList["+x+"].fracVol";
    	   }
           
           if(j==9){
        	   name = "livestockEFList["+x+"].efAtm";
    	   }
           
           if(j==10){
         	  name = "livestockEFList["+x+"].reference";
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
		document.getElementById("livestockEFForm").appendChild(input);
	}
	
}
	
	</script>
	<script src="global_assets/input-mask.js"></script>
   <script src="global_assets/js/input-mask.js"></script>
</html>
