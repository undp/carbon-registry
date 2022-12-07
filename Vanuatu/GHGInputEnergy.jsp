<%@page import="com.vanuatu.model.ghg.energy.*"%>
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
<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/uniform.min.js"></script>
<script src="global_assets/js/plugins/extensions/jquery_ui/interactions.min.js"></script>

<script src="assets/js/app.js"></script>

<script src="global_assets/js/demo_pages/form_select2.js"></script>
<script src="global_assets/js/demo_pages/form_layouts.js"></script>
<!-- /theme JS files -->

</head>
<!-- <body onload="solidCard()"> -->
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />
<%
String selectedYear = (String)request.getAttribute("selectedYear");
String selectedSubCategory = (String)request.getAttribute("selectedSubCategory");

GHGSectorMappingExtended ghgMapping = null;
String displaySubSector ="";   

if(request.getAttribute("ghgMapping") !=null){
	session.setAttribute("ghgMapping", request.getAttribute("ghgMapping"));
	ghgMapping = (GHGSectorMappingExtended) request.getAttribute("ghgMapping");
	displaySubSector =  ghgMapping.getSubSector().substring(ghgMapping.getSubSector().indexOf("-")+1);
}

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

List<GHGInputEnergy> existingGHGInputEnergy = null;

if(request.getAttribute("existingGHGInputEnergy")!=null){
	GHGInputEnergyForm form  = (GHGInputEnergyForm)request.getAttribute("existingGHGInputEnergy");
	existingGHGInputEnergy = form.getGhgInputEnergyList();
	
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
		<h5 class="card-title text-uppercase text-center">GHG Inventory - <%=displaySubSector%></h5>
	</div>

	<div class="card-body">
	<form action="saveGHGInputEnergy" method="post" onsubmit="return setValues();" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
                    <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
                   <input type="hidden" name = "ghgInput.dataId" id = "dataId">
<div class="card-body font-size-lg">
    <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Inventory Year</label>
    <div class="col-lg-4">
  	<select name="ghgInput.year" required onchange="getData();"  data-placeholder="--Select--" class="form-control select" id="yearId"  data-fouc>
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
     <option value="${ghgMapping.sector}">${ghgMapping.sector}</option>
     </select>
   </div>
   </div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Category</label>
   <div class="col-lg-4">
   <select name="ghgInput.category" readonly="readonly" id="category" class="form-control select">
   <option value="${ghgMapping.category}">${ghgMapping.category}</option>
     </select> 
   </div>
   <label class="col-lg-2 col-form-label text-right">Sub Sector</label>
   <div class="col-lg-4">
   <select name="ghgInput.subSector" readonly="readonly" id="subSector" class="form-control select">
   <option value="${ghgMapping.subSector}">${ghgMapping.subSector}</option>
     </select>
   </div>
  </div>
  <div class="form-group row">
  <label class="col-lg-2 col-form-label text-right">Sub Category</label>
   <div class="col-lg-4">
    <select name="ghgInput.subCategory" onchange="getData();" data-placeholder="--Select--" class="form-control select" id="subCategory">
   						<c:if test = "${selectedSubCategory eq null }">
   <option></option>
   </c:if>
   							<option value="${selectedSubCategory}">${selectedSubCategory}</option>
   							<c:forEach var="listValue" items="${ghgMapping.subCategorySet}">
							<c:if test = "${listValue ne selectedSubCategory }">
							<option value="${listValue}">${listValue}</option>
							</c:if>
							</c:forEach>
   </select>
   </div>
   <label class="col-lg-2 col-form-label text-right">Calculation Approach</label>
   <div class="col-lg-4">
   <input name="ghgInput.calcApproach" readonly="readonly" class="form-control" value="Tier 1"> 
   </div>
  </div></div>
  <hr>            
                
<div class="form-group">
					
      				<div class="card">
                    <div class="card-body">
                    <h6 class="card-title">Energy Data</h6>
					<div class="table-responsive">
						<table id="ghgTable" class="table table-bordered table-striped">
	                    
                            <thead>
                            <tr class="bg-info-700">
                                <th>Fuel Type</th>
                                <th>Fuel</th>
                                <th>Unit</th>
                                <th>Amount</th>
								<th>Reference</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="output" varStatus="loop" items="${existingGHGInputEnergy.getGhgInputEnergyList()}">
                            <tr class="font-size-sm">
								
										<td>${output.getFuelType()}</td>
										<td>${output.getFuel()}</td>
										<td>tonnes</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getValue()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
										<td><input type="checkbox" name='record'></td>
									</tr>
                            </c:forEach>
                            </tbody>
                           </table> 
						</div><br>                       
                        			<div>
                        			<input type="button" class="btn btn-sm bg-info-700 delete-row1" value="Delete Row">
                                   </div>
                                   <hr>
                                   <h6 class="card-title">Add Energy Data</h6>
      <div class="form-group row">
   <div class="col-lg-2">Fuel Type
   <select data-placeholder="--Select--" class="form-control select" id="elecFuelTypeId1" onchange="populateFuel('elecFuelTypeId1','elceFuelId1');">
   <option></option>
   <c:forEach var="listValue" items="${fuelTypeSet}">
			<option value="${listValue}">${listValue}</option>
	</c:forEach> 
   </select>
     <span class="form-text text-muted">Select fuel type</span>
    </div>
   <div class="col-lg-3">Fuel
   <select id="elceFuelId1" data-placeholder="--Select--" class="form-control select">
   <option></option>
    </select>
    <span class="form-text text-muted">Select fuel</span>
   </div>
    <div class="col-lg-2">Unit
   <input readonly="readonly" class="form-control" value="tonnes">
    </div>
    <div class="col-lg-2">Amount
   <input id = 'amountValueElec' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
    <span class="form-text text-muted">Enter fuel consumed</span>
   </div>
    <div class="col-lg-2">Reference
   <input type="text" id = 'refElec' class="form-control">
    <span class="form-text text-muted">Enter data source</span>
   </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-info-700 add-row1">Add</button>
  </div></div>
  <hr></div></div></div>		
				
  
  
  <div class="form-group">
                <span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="remarks">${existingGHGInputEnergy.ghgInputEnergyList[0].getRemarks()}</textarea>
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
    <button  id = "submitButton"  class="btn bg-info-700">Save/Submit</button>
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
</div></div></form></div></div></div></div>
</body>

<script>
 
function getData(){
	var sector = document.getElementById("sector").value;
	var subSector = document.getElementById("subSector").value;
	var category = document.getElementById("category").value;
	var subCategory = document.getElementById("subCategory").value;
	var year = document.getElementById("yearId").value;
	
	if(year=='' || subCategory=='' ){
	
	}
	else{
		var url = '/getGHGInputEnergyExisting?sector=' + sector + '&subSector='+subSector  + '&category='+category + '&subCategory='+subCategory + '&year='+year + '&status=ANY';
		window.location.href = url;	
	}
	
}

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
	var table = document.getElementById('ghgTable');
    var rowLength = table.rows.length;
    
 if (rowLength>1) {
	 setEnergyValues();
	 }
 else{	
 	alert("Please enter data.");
 	return false;
 }
}
    
function setEnergyValues(){
    var table = document.getElementById('ghgTable');
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
        	   name = "ghgInputEnergyList["+x+"].value";
        	
           }
           
           if(j==4){
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

$(document).ready(function(){
	
    $(".add-row1").click(function(){
        var fuelType = $("#elecFuelTypeId1").val();
        var fuel = $("#elceFuelId1").val();
        var value = $("#amountValueElec").val();
        var reference = $("#refElec").val();
        var markup = "<tr><td>" + fuelType + "</td><td>" + fuel + "</td><td>tonnes</td><td contenteditable='true'>" + value + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#ghgTable tbody").append(markup);
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#ghgTable tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});    
var fromApproval = "<%=fromApprovalDashboard%>";
handleButtons(fromApproval);

function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	<% if(existingGHGInputEnergy!=null && !existingGHGInputEnergy.isEmpty()) { %>
	document.getElementById('dataId').value = "<%=existingGHGInputEnergy.get(0).getDataId()%>";
	<% } %>
}

   <% if(existingGHGInputEnergy!=null) {
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
