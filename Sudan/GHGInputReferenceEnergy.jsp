<%@page import="com.sudan.model.ghg.energy.*"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>GHG Inventory</title>
	<!-- Global stylesheets -->
	<link rel="shortcut icon" href="global_assets/images/ssudan.png">
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
<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/uniform.min.js"></script>
<script src="global_assets/js/plugins/extensions/jquery_ui/interactions.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/fixed_header.min.js"></script>

<script src="assets/js/app.js"></script>

<script src="global_assets/js/demo_pages/form_select2.js"></script>
<script src="global_assets/js/demo_pages/form_layouts.js"></script>
<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />
<%
String selectedYear = (String)request.getAttribute("selectedYear");
String selectedSubCategory = (String)request.getAttribute("selectedSubCategory");

if(request.getAttribute("ghgMapping") !=null){
	session.setAttribute("ghgMapping", request.getAttribute("ghgMapping"));
}

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

List<GHGInputReferenceEnergy> existingGHGInputEnergy = null;

if(request.getAttribute("existingGHGInputReferenceEnergy")!=null){
	existingGHGInputEnergy = (List<GHGInputReferenceEnergy>)request.getAttribute("existingGHGInputReferenceEnergy");
	
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
<div class="card border-pink-700">
					<div class="card-header bg-pink-600">
						<h5 class="card-title text-uppercase text-center">GHG Inventory - Energy (Reference Approach)</h5>
	</div>

	<form action="saveGHGInputReferenceEnergy" method="post" onsubmit="return setValues();" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
                   <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
                   <input type="hidden" name = "ghgInput.dataId" id = "dataId">
<div class="card-body font-size-lg">
    <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Inventory Year</label>
    <div class="col-lg-4">
  	<select name="ghgInput.year" onchange="getData();" data-placeholder="--Select--" class="form-control select" id="yearId"  data-fouc>
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
     <select name="ghgInput.sector" readonly="readonly" id="sector" class="form-control select">
     <option value="1-Energy">1-Energy</option>
     </select>
   </div>
   </div>
  <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Calculation Approach</label>
   <div class="col-lg-4">
   <select name="ghgInput.calcApproach" required data-placeholder="--Select--" class="form-control select" id="calcApproach">
      <option></option>
	  <option value="Tier I">Tier I</option>
	 
	</select>  
   </div>
  </div>
  <hr>            
                
<div class="form-group">

      				<div class="card">
                    <div class="card-body">
          <h6 class="card-title">Activity Data</h6>
					<div class="table-responsive">
						<table id="ghgTable1" class="table table-bordered table-striped">
	                        <thead>
                            <tr class="bg-pink-600 font-size-sm">
                                <th>Fuel Type</th>
                                <th>Fuel</th>
                                <th>Unit</th>
                                <th>Production</th>
                                <th>Imports</th>
                                <th>Exports</th>
                                <th>International Bunkers</th>
                                <th>Stock Change</th>
                                <th>Excluded Consumption</th>
                                <th>Reference</th>
								<th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="output" varStatus="loop" items="${existingGHGInputReferenceEnergy}">
                            <tr>
                                <td>${output.getFuelType()}</td>
                                <td>${output.getFuel()}</td>   
                                <td>tonnes</td>
                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getProduction()}</td>
                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getImports()}</td>
                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getExports()}</td>
                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getBunker()}</td>
                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getStockChange()}</td>
                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getExcluded()}</td>
                                <td contenteditable='true'>${output.getReference()}</td>
								<td><input type="checkbox" name="record"></td>
                            </tr>
                            </c:forEach>
                            </tbody>
                           </table> 
						</div><br>                       
                        			<div id="add" style="display: block">
                        			<input type="button" class="btn btn-sm bg-pink-600 delete-row1" value="Delete Row">
                        			<button type="button" class="btn btn-sm bg-pink-600" data-toggle="modal" data-target="#modal_form_vertical">Add Row</button>
                                   </div>
						</div></div>
						<div id="modal_form_vertical" class="modal fade" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
   		<div class="modal-body">
   		<div class="modal-header">
								<h5 class="modal-title"><b>Add Energy Data</b></h5>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<br>
      <div class="form-group row">
    
   <div class="col-lg-6">Fuel Type
   <select data-placeholder="--Select--" class="form-control select" id="fuelTypeId" onchange="populateFuel('fuelTypeId','fuelId');">
   <option></option>
   <c:forEach var="listValue" items="${fuelTypeSet}">
			<option value="${listValue}">${listValue}</option>
	</c:forEach> 
   </select>
    </div>
   <div class="col-lg-6">Fuel
   <select id="fuelId" data-placeholder="--Select--" class="form-control select">
   <option></option>
                 
    </select>
    </div></div>
      <div class="form-group row">
    <div class="col-lg-6">Unit
   <input readonly="readonly" class="form-control" value="tonnes">
    </div>
    <div class="col-lg-6">Production
   <input id = 'production' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
    
   </div></div>
     <div class="form-group row">
   <div class="col-lg-6">Imports
   <input id = 'import' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
    
   </div>
   <div class="col-lg-6">Exports
   <input id = 'export' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
    
   </div></div>
   <div class="form-group row">
   <div class="col-lg-6">International Bunkers
   <input id = 'bunker' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
    
   </div>
   <div class="col-lg-6">Stock Change
   <input id = 'stock' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
    
   </div></div>
   <div class="form-group row">
   <div class="col-lg-6">Excluded Consumption
   <input id = 'excluded' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
    
   </div>
   
    <div class="col-lg-6">Reference
   <input type="text" id = 'ref' class="form-control">
    </div></div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-pink-600 add-row1">Add</button>
  </div></div></div></div></div></div>
	     <div class="form-group">
                <span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="remarks">${existingGHGInputReferenceEnergy[0].getRemarks()}</textarea>
     </div>
</div>

<div id = "commentButton" style="display: none">
<div class="form-group">
<span class="col-sm-3 control-label">Approver Comments</span>
<div class="col-sm-12">
<textarea class="form-control" id="approverRemarks" name="approverRemarks"> </textarea>
</div>
</div>
</div></div>



<div class="bg-default content-box text-center pad20A mrg25T">
    <button  id = "submitButton"  class="btn bg-pink-600">Save/Submit</button>
</div>

<div class="row">
<div class="col-md-3">
</div>
          
<div class="col-md-5">
<div class="form-group ">
<b><span class="col-sm-6 control-label" style="float:left"></span></b>
<div class="col-sm-6">
<div id = "approvalButton" style="display: none">
<button id = "Approved" onclick="setStatus(this.id);" class="btn bg-pink-600">Approve</button>
</div>
</div>
</div>
</div>
 

<div class="col-md-4">
<div class="form-group">
<div class="col-sm-6">
<div id = "rejectionButton" style="display: none">
<button id = "Rejected" onclick="setStatus(this.id);"  class="btn bg-pink-600">Reject</button>
</div> 
</div>
</div>
</div></div></form></div></div></div>

</body>


<script>
function populateFuel(fuelTypeId, fuelId, fuelVal){
	var fuelType = document.getElementById(fuelTypeId).value;
	var fuel = document.getElementById(fuelId);

	for(i=fuel.options.length-1;i>=0;i--)
	{
		fuel.remove(i);
	}
	if(fuelVal){
		fuel.options[fuel.options.length] = new Option(fuelVal,fuelVal);
	}else{
		fuel.options[fuel.options.length] = new Option();
    }
	
	<c:forEach var="entry" items="${fuelTypeFuelMap}">
		if("${entry.key}" == fuelType) {
			<c:forEach var="listValue" items='${entry.value}'>
			fuel.options[fuel.options.length] = new Option("${listValue}", "${listValue}");
			</c:forEach>
		} 
	</c:forEach>  
}

function setValues(){
    var table = document.getElementById('ghgTable1');
    var rowLength = table.rows.length;
    
    for (i = 1; i < rowLength; i++){
       var cells = table.rows.item(i).cells;
       var cellLength = cells.length;
       
       var x = i-1;
       for(var j = 0; j < cellLength; j++){
           var cell = cells.item(j);
           var cellVal = cell.innerHTML;
           var name ;
         
           if(j==0){
        	   name = "ghgInputEnergyList["+x+"].fuelType";
        	   
           }
           if(j==1){
        	   name = "ghgInputEnergyList["+x+"].fuel";
        	
           }
           if(j==2){
        	   name = "ghgInputEnergyList["+x+"].unit";
        	
           }
           if(j==3){
        	   name = "ghgInputEnergyList["+x+"].production";
        	
           }
           if(j==4){
        	   name = "ghgInputEnergyList["+x+"].imports";
        	
           }
           if(j==5){
        	   name = "ghgInputEnergyList["+x+"].exports";
           }
           if(j==6){
        	   name = "ghgInputEnergyList["+x+"].bunker";
        	
           }
           if(j==7){
        	   name = "ghgInputEnergyList["+x+"].stockChange";
        	
           }
           if(j==8){
        	   name = "ghgInputEnergyList["+x+"].excluded";
           }
           
           if(j==9){
        	  name = "ghgInputEnergyList["+x+"].reference";
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
	var year = document.getElementById("yearId").value;
	window.location.href = '/getGHGInputReferenceEnergyExisting?sector=1-Energy&year='+year + '&status=ANY';
}

$(document).ready(function(){
	
    $(".add-row1").click(function(){
        var fuelType = $("#fuelTypeId").val();
        var fuel = $("#fuelId").val();
        var production = $("#production").val();
        var imports = $("#import").val();
        var exports = $("#export").val();
        var bunker = $("#bunker").val();
        var stock = $("#stock").val();
        var excluded = $("#excluded").val();
        var reference = $("#ref").val();
        var markup = "<tr><td>" + fuelType + "</td><td>" + fuel + "</td><td>tonnes</td><td contenteditable='true'>" + production + "</td><td contenteditable='true'>" + imports + "</td><td contenteditable='true'>" + exports + "</td><td contenteditable='true'>" + bunker + "</td><td contenteditable='true'>" + stock + "</td><td contenteditable='true'>" + excluded + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#ghgTable1 tbody").append(markup);
       
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#ghgTable1 tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});    

var fromApproval = "<%=fromApprovalDashboard%>";
handleButtonsGHG(fromApproval);

function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	<% if(existingGHGInputEnergy!=null && !existingGHGInputEnergy.isEmpty()) { %>
		document.getElementById('dataId').value = "<%=existingGHGInputEnergy.get(0).getDataId()%>";
	<% } %>
	
}

<% if(existingGHGInputEnergy!=null && !existingGHGInputEnergy.isEmpty()) {
	%>
		document.getElementById('fourEyesStatus').value = 'Pending_Update';
		document.getElementById('calcApproach').value = "<%=existingGHGInputEnergy.get(0).getCalcApproach()%>";
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
