<%@page import="com.vanuatu.model.ghg.afolu.*"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>GHG Inventory</title>
	<!-- Global stylesheets -->
	<link rel="shortcut icon" href="global_assets/images/vanuatu.png">
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
<jsp:include page="common.jsp" />

<%
String selectedYear = (String)request.getAttribute("selectedYear");

if(request.getAttribute("ghgMapping") !=null){
	session.setAttribute("ghgMapping", request.getAttribute("ghgMapping"));
}

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

List<GHGInputBiomassBurning> existingGHGInputBiomassBurning = null;


if(request.getAttribute("existingGHGInputBiomassBurning")!=null){
	existingGHGInputBiomassBurning = (List<GHGInputBiomassBurning>)request.getAttribute("existingGHGInputBiomassBurning");
	
	
}

String fromApprovalDashboard = request.getParameter("fromApprovalDashboard"); 
%>

<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
	<div class="card border-teal">
					<div class="card-header bg-info-700">
						<h5 class="card-title text-uppercase text-center">GHG Inventory - Biomass Burning</h5>
											</div><br>
	<div class="card-body">										
<form action="saveGHGInputBiomassBurning" onsubmit="return setValues();" method="post" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
      <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
                   <input type="hidden" name = "ghgInput.dataId" id = "dataId">

<div class="card-body font-size-lg">
    <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Inventory Year</label>
    <div class="col-lg-4">
  	<select name="ghgInput.year" required onchange="getData();" data-placeholder="--Select--" class="form-control select" id="yearId"  data-fouc>
  	<c:if test = "${selectedYear eq null }">
   <option></option>
   </c:if>
   							<option value="${selectedYear}">${selectedYear}</option>
   							<c:forEach var="listValue" items="${years}">
							<c:if test = "${listValue ne selectedYear }">
							<option value="${listValue}">${listValue}</option>
							</c:if>
							</c:forEach>
    </select>
    </div>
    <label class="col-lg-2 col-form-label text-right">Sector</label>
   <div class="col-lg-4">
     <select name="ghgInput.sector" id="sector" class="form-control select">
     <option value="${ghgMapping.sector}">${ghgMapping.sector}</option>
     </select>
   </div>
   </div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Category</label>
   <div class="col-lg-4">
   <select name="ghgInput.category" id="category" class="form-control select">
    <option value="${ghgMapping.category}">${ghgMapping.category}</option>
     </select>
   </div>
   <label class="col-lg-2 col-form-label text-right">Sub Sector</label>
   <div class="col-lg-4">
   <select name="ghgInput.subSector" id="subSector" class="form-control select">
   <option value="${ghgMapping.subSector}">${ghgMapping.subSector}</option>
     </select>
   </div>
  </div>
  <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Calculation Approach</label>
   <div class="col-lg-4">
   <input name="ghgInput.calcApproach" readonly="readonly" class="form-control" value="Tier 1"> 
   </div>
  </div></div>
  <hr>            
<div class="card">
<div class="card-body">
    <div class="table-responsive">
    					<table id="biomassTable" class="table table-bordered">
						
    					<thead>
                            <tr class="bg-info-700">
                                <th>Initial Land Use</th>
                                <th>Land Use during Reporting Year</th>
                                <th>Sub category</th>
                                <th>Area Burnt (ha)</th>
                                <th>Fuel available (tonne/ha)</th>
                                <th>Combustion Factor</th>
                                <th>EF CO<sub>2</sub> (kg/tonne dm burnt)</th>
                                <th>EF CH<sub>4</sub> (kg/tonne dm burnt)</th>
                                <th>EF N<sub>2</sub>O (kg/tonne dm burnt)</th>
                                <th>Reference</th>
                                <th></th>
                            </tr>
                            
                            </thead>
                            
                           <tbody>
                           <c:forEach var="output" varStatus="loop" items="${existingGHGInputBiomassBurning}">
									<tr>
										<td>${output.getInitial()}</td>
										<td>${output.getReporting()}</td>
										<td contenteditable='true' >${output.getSubcategory()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getArea()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getMass()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getCf()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEfco2()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEfch4()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEfn2o()}</td>	
										<td contenteditable='true'>${output.getReference()}</td>
										<td><input type="checkbox"></td>
									</tr>
							</c:forEach>
							</tbody>
						</table>
						</div>
						<br>
                   <input type="button" class="btn btn-sm bg-info-700 delete-row1" value="Delete Row">
                   <button type="button" class="btn btn-sm bg-info-700" data-toggle="modal" data-target="#modal_form_vertical">Add Row</button>
                   </div></div>   

<div class="form-group">
<span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="remarks">${existingGHGInputBiomassBurning[0].getRemarks()}</textarea>
</div>
</div>

<div id = "commentButton" style="display: none">
<div class="form-group">
<span class="col-sm-3 control-label">Approver Comments</span>
<div class="col-sm-12">
<textarea class="form-control" id="approverRemarks" name="approverRemarks"> </textarea>
</div>
</div>
</div>          
    
<div class="bg-default content-box text-center pad20A mrg25T">
<button  id = "submitButton" class="btn bg-info-700">Save/Submit</button>
</div>
 <div class="row"> 
 <div class="col-md-3">
</div>              		
<div class="col-md-5">
<div class="form-group ">
<b><span class="col-sm-6 control-label" style="float:left"></span></b>
<div class="col-sm-6">
<div id = "approvalButton" style="display: none">
<button id = "Approved" onclick="setStatus(this.id);" class="btn bg-info-700">Approve</button>
</div>
</div>
</div>
</div>
 

<div class="col-md-4">
<div class="form-group">
<div class="col-sm-6">
<div id = "rejectionButton" style="display: none">
<button id = "Rejected" onclick="setStatus(this.id);"  class="btn bg-info-700">Reject</button>
</div> 
</div>
</div>
</div>
</div>
    		  	<div id="modal_form_vertical" class="modal fade" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
   		<div class="modal-body">
   		<div class="modal-header">
								<h5 class="modal-title"><b>Add Biomass Burning Data</b></h5>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<br>
<div class="form-group row">
   <div class="col-lg-6 font-size-sm">Initial Land Use
   <select id="initial" data-placeholder="--Select--" class="form-control select" data-fouc>
      <option></option>
	  <option value="Forest Land">Forest Land</option>
	  <option value="Grass Land">Grass Land</option>
	  <option value="Cropland">CropLand</option>
	  <option value="Wetlands">WetlLands</option>
	  <option value="Settlements">Settlements</option>
	  <option value="Other Lands">Other Lands</option>
	  </select>
    </div>
   <div class="col-lg-6 font-size-sm">Land Use during Reporting Year
<select id="reporting" data-placeholder="--Select--" class="form-control select" data-fouc>
<option></option>
<option value="Forest Land">Forest Land</option>
<option value="Grass Land">Grass Land</option>
<option value="Cropland">CropLand</option>
<option value="Wetlands">WetlLands</option>
<option value="Settlements">Settlements</option>
<option value="Other Lands">Other Lands</option>
</select>
   </div></div>
      <div class="form-group row">
    <div class="col-lg-6 font-size-sm">Subcategory 
   <input id = 'subcategory' class="form-control">
    </div>
    <div class="col-lg-6 font-size-sm">Area burnt (Ha)  
   <input id = 'area' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    </div>
    </div>
       <div class="form-group row">
    <div class="col-lg-6 font-size-sm">Mass of fuel available for combustion (tonne/Ha)
   <input id = 'mass' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    </div>
    <div class="col-lg-6 font-size-sm">Combustion Factor  
   <input id = 'cf' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    </div></div>
       <div class="form-group row">
    <div class="col-lg-6 font-size-sm">EF CO<sub>2</sub> (kg/tonne dm burnt)  
   <input id = 'efCo2' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    </div>
      <div class="col-lg-6 font-size-sm">EF N<sub>2</sub>O (kg/tonne dm burnt)  
   <input id = 'efN2o' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   <span class="form-text font-size-sm text-muted"></span>
    </div></div>
    <div class="form-group row">
    <div class="col-lg-6 font-size-sm">EF CH<sub>4</sub> (kg/tonne dm burnt)  
   <input id = 'efCh4' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    </div>
    <div class="col-lg-6 font-size-sm">Reference
   <input type="text" id = 'ref'class="form-control">
    </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-info-700 add-row1">Add</button></div></div>
  </div></div></div></div></form></div></div></div></div></body> 
    
 <script>
	$(document).ready(function(){
	
    $(".add-row1").click(function(){
        var initial = $("#initial").val();
        var reporting = $("#reporting").val();
        var subcategory = $("#subcategory").val();
        var area = $("#area").val();
        var mass = $("#mass").val();
        var cf = $("#cf").val();
        var efCo2 = $("#efCo2").val();
        var efCh4 = $("#efCh4").val();
        var efN2o = $("#efN2o").val();
        var reference = $("#ref").val();
        var markup = "<tr><td contenteditable='true'>" + initial + "</td><td contenteditable='true'>" + reporting + "</td><td contenteditable='true'>" + subcategory + "</td><td contenteditable='true'>" + area + "</td><td contenteditable='true'>" + mass + "</td><td contenteditable='true'>" + cf + "</td><td contenteditable='true'>" + efCo2 + "</td><td contenteditable='true'>" + efCh4 + "</td><td contenteditable='true'>" + efN2o + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#biomassTable tbody").append(markup);
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#biomassTable tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});

var rowAdded = 0
	
function setValues(){
    var table = document.getElementById('biomassTable');
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
        	   name = "ghgInputBiomassBurningList["+x+"].initial";
           }
           if(j==1){
        	   name = "ghgInputBiomassBurningList["+x+"].reporting";
           }
           if(j==2){
        	   name = "ghgInputBiomassBurningList["+x+"].subcategory";
        	   
           }
           if(j==3){
        	   name = "ghgInputBiomassBurningList["+x+"].area";
        	   
           }
           if(j==4){
        	   name = "ghgInputBiomassBurningList["+x+"].mass";
        	   
           }
           if(j==5){
        	   name = "ghgInputBiomassBurningList["+x+"].cf";
    	   }
           if(j==6){
        	   name = "ghgInputBiomassBurningList["+x+"].efco2";
    	   }
           if(j==7){
        	   name = "ghgInputBiomassBurningList["+x+"].efch4";
    	   }
           if(j==8){
        	   name = "ghgInputBiomassBurningList["+x+"].efn2o";
    	   }
           
           if(j==9){
         	  name = "ghgInputBiomassBurningList["+x+"].reference";
            }
      
           createHiddenField(name,cellVal);
           
        }
	 }
    return true;
}

function createHiddenField(name, value){
	if(document.getElementsByName(name).length != 0) { //already exist
		
	}else{
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", name);
		input.setAttribute("id", name);
		input.setAttribute("value", value); 
		document.getElementById("ghgInputForm").appendChild(input);
	}
	
}

function getData(){
	var sector = document.getElementById("sector").value;
	var subSector = document.getElementById("subSector").value;
	var category = document.getElementById("category").value;
	var subCategory = document.getElementById("subSector").value;
	var year = document.getElementById("yearId").value;
	
	var url = '/getGHGInputBiomassBurning?sector=' + sector + '&subSector='+subSector  + '&category='+category + '&subCategory='+subCategory + '&year='+year + '&status=ANY';
	window.location.href = url;

}
var fromApproval = "<%=fromApprovalDashboard%>";
handleButtons(fromApproval);

function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	
	<% if(existingGHGInputBiomassBurning!=null && !existingGHGInputBiomassBurning.isEmpty()) { %>
	document.getElementById('dataId').value = "<%=existingGHGInputBiomassBurning.get(0).getDataId()%>";
	<% } %>

	
}
<% if(existingGHGInputBiomassBurning!=null && !existingGHGInputBiomassBurning.isEmpty()) {
	%>
		document.getElementById('fourEyesStatus').value = 'Pending_Update';
	<%
		} else {
	%>
		document.getElementById('fourEyesStatus').value = 'Pending_Insert';
	<%
		}
	%>
	</script>
	<script src="global_assets/input-mask.js"></script>
   <script src="global_assets/js/input-mask.js"></script>
</html>
