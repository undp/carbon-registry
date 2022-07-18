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

List<GHGInputSolidFuel> existingGHGInputSolidFuel = null;

if(request.getAttribute("existingGHGInputSolidFuel")!=null){
	existingGHGInputSolidFuel  = (List<GHGInputSolidFuel>)request.getAttribute("existingGHGInputSolidFuel");
	
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
<div class="card border-pink">
	<div class="card-header bg-pink-600">
		<h5 class="card-title text-uppercase text-center">GHG Inventory - Production of Solid Fuels</h5>
	</div>

	<div class="card-body">
	<form action="saveGHGInputSolidFuel" method="post" onsubmit="return setValues();" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
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
   <select name="ghgInput.calcApproach" required data-placeholder="--Select--" class="form-control select" id="calcApproach">
      <option></option>
	  <option value="Tier I">Tier I</option>
	  <option value="Tier II">Tier II</option>
	</select>  
   </div>
  </div></div>
  <hr>            
                
<div class="form-group">
					
      				<div class="card">
                    <div class="card-body">
                    <h6 class="card-title">Fuel Production Data</h6>
					<div class="table-responsive">
							<table id="fuelTable" class="table table-bordered table-striped">
						<thead>
                            <tr class="bg-pink-600">
                            	<th>Fuel</th>
                                <th>Production (tonnes)</th>
                                <th>Emission Factor (tCO<sub>2</sub>/ton of fuel produced)</th>
                                <th>Reference</th>
                                <th>Action</th>
                             </tr>
                            </thead>
                            <tbody>
	                           <c:forEach var="output" varStatus="loop" items="${existingGHGInputSolidFuel}">
	                            <tr>
	                            		<td contenteditable='true'>${output.getFuel()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getProduction()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEmissionFactor()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
										<td><input type="checkbox" name='record'></td>
	                            </tr>
	                              </c:forEach> 
	                        </tbody>
                        </table></div><br>                       
                        			
                        			<div id="add" style="display: block">
                        			<input type="button" class="btn btn-sm bg-pink-600 delete-row1" value="Delete Row">
                                   <hr>
                                    <h6 class="card-title">Add Fuel</h6>
                        <div class="form-group row">
   
   <div class="col-lg-2 font-size-sm">Fuel Name
   <input id='fuel' class="form-control">
  </div>
    <div class="col-lg-2 font-size-sm">Production
   <input id = 'production'  class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    <span class="form-text text-muted">(tonnes)</span>
  </div>
  <div class="col-lg-3 font-size-sm">Emission Factor  
   <input id = 'emissionFactor'  class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    <span class="form-text text-muted">(tCO<sub>2</sub>/ton of fuel produced)</span>
  </div>
    <div class="col-lg-3 font-size-sm">Reference
   <input type="text" id = 'ref' class="form-control">
   <span class="form-text text-muted">Please enter data source</span>
    </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-pink-600 add-row1">Add</button>
  </div></div></div>
  </div></div></div>
  <hr>

  <div class="form-group">
                <span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="remarks">${remarks}</textarea>
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
		var url = '/getGHGInputSolidFuelExisting?sector=' + sector + '&subSector='+subSector  + '&category='+category + '&subCategory='+subCategory + '&year='+year + '&status=ANY';
		window.location.href = url;	
	}
	
}

function setValues(){
	var table = document.getElementById('fuelTable');
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
    var table = document.getElementById('fuelTable');
    var rowLength = table.rows.length;
    for (k = 1; k < rowLength; k++){
        var cells2 = table.rows.item(k).cells;
        
        var cellLength2 = cells2.length;
        var x = k-1;
        for(var j = 0; j < cellLength2; j++){
            var cell = cells2.item(j);
            var cellVal = cell.innerHTML;
            var name ;
           
           if(j==0){
        	   name = "ghgInputSolidFuelList["+x+"].fuel";
           }
           if(j==1){
        	   name = "ghgInputSolidFuelList["+x+"].production";
        	}
           if(j==2){
        	   name = "ghgInputSolidFuelList["+x+"].emissionFactor";
        	}
           if(j==3){
        	   name = "ghgInputSolidFuelList["+x+"].reference";
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
	
    $(".add-row2").click(function(){
        var fuel = $("#fuel").val();
        var production = $("#production").val();
        var emissionFactor = $("#emissionFactor").val();
        var reference = $("#ref").val();
        var markup = "<tr><td contenteditable='true'>" + fuel + "</td><td contenteditable='true'>" + production + "</td><td contenteditable='true'>" + emissionFactor + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#fuelTable tbody").append(markup);
        var table2 = document.getElementById('fuelTable');
        var rowLength2 = table2.rows.length;
    });
    
    // Find and remove selected table rows
    $(".delete-row2").click(function(){
        $("#fuelTable tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});  
   
$(document).ready(function(){
	
    $(".add-row1").click(function(){
        var fuel = $("#fuel").val();
        var production = $("#production").val();
        var emissionFactor = $("#emissionFactor").val();
        var reference = $("#ref").val();
        var markup = "<tr><td>" + fuel + "</td><td>" + production + "</td><td contenteditable='true'>" + emissionFactor + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#fuelTable tbody").append(markup);
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#fuelTable tbody").find('input[name="record"]').each(function(){
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
	<% if(existingGHGInputSolidFuel!=null && !existingGHGInputSolidFuel.isEmpty()) { %>
	document.getElementById('dataId').value = "<%=existingGHGInputSolidFuel.get(0).getDataId()%>";
	<% } %>
}

   <% if(existingGHGInputSolidFuel!=null && !existingGHGInputSolidFuel.isEmpty()) {
	%>
		document.getElementById('fourEyesStatus').value = 'Pending_Update';
		document.getElementById('calcApproach').value = "<%=existingGHGInputSolidFuel.get(0).getCalcApproach()%>";
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
