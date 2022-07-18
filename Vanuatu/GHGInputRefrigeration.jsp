<%@page import="com.vanuatu.model.ghg.ippu.*"%>
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

List<GHGInputRefrigeration> existingGHGInputRefrigeration = null;

if(request.getAttribute("existingGHGInputRefrigeration")!=null){
	existingGHGInputRefrigeration = (List<GHGInputRefrigeration>)request.getAttribute("existingGHGInputRefrigeration");
	
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
		<h5 class="card-title text-uppercase text-center">GHG Inventory - Product Uses as Substitutes for Ozone Depleting Substances</h5>
	</div>

	<div class="card-body">
	<form action="saveGHGInputRefrigeration" method="post" onsubmit="return setValues();" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
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
  </div>
  <hr>            
                
<div class="form-group">
<div class="tab-container">
<ul class="nav nav-tabs justify-content-center nav-fill "  role="tablist">
    <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#stationary" role="tab">Refrigeration and Stationary Air Conditioning</a>
</li>
<li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#mobile" role="tab">Mobile Air Conditioning</a>
</li>
</ul>
<br>                                    
   <div class="tab-content">
      <div class="tab-pane active fade show" id="stationary" role="tabpanel">
      				<div class="card">
                    <div class="card-body">
                                
                             <h6 class="card-title">Refrigeration and Stationary Airconditioning Data</h6>
      <div class="table-responsive">
						<table id="stationaryTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-info-700">
                                <th>Gas Consumed</th>
                                <th>Unit</th>
                                 <th>Amount</th>
                              	<th>Reference</th>
                                 <th>Select</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="output" varStatus="loop" items="${existingGHGInputRefrigeration}">
                            <c:if test = "${output.getAirConditionType() eq 'stationaryTable' }">
                            <tr>
                            <td contenteditable='true'>${output.getGas()}</td>
							<td contenteditable='true'>tonnes</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAmount()}</td>
							<td contenteditable='true'>${output.getReference()}</td>
							<td><input type="checkbox" name="record"></td>
                            </tr>
                            </c:if>
                            </c:forEach>
                            </tbody>
                           </table> 
						</div><br><div>
                        			<input type="button" class="btn btn-sm bg-info-700 delete-row1" value="Delete Row">
                                   </div><hr>
                                          <h6 class="card-title">Add Data</h6>
      
                                   <div class="form-group row">
   
   <div class="col-lg-3">Gas Consumed
   <select name="gas" id="gasStat" data-placeholder="--Select--" class="form-control select">
   <option></option>
   <c:forEach var="listValue" items="${gasGWP}">
			<option value="${listValue.getGas()}">${listValue.getGas()}</option>
	</c:forEach> 
    </select>
   </div>
    <div class="col-lg-2">Unit
   <input readonly="readonly" class="form-control" value="tonnes">
    </div>
    <div class="col-lg-2">Amount
   <input id = 'amountValueStat' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
   </div>
    <div class="col-lg-3">Reference
   <input type="text" id = 'refStat'class="form-control">
   </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-info-700 add-row1">Add</button>
  </div></div>
                                   </div></div></div>   
	     
	     <div class="tab-pane fade" id="mobile" role="tabpanel">
	     	<div class="card">
                    <div class="card-body">
                                       
                             <h6 class="card-title">Mobile Air Conditioning Data</h6>
      <div class="table-responsive">
						<table id="mobileTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-info-700">
                                <th>Gas Consumed</th>
                                <th>Unit</th>
                                <th>Amount</th>
                                <th>Reference</th>
                                 <th>Select</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="output" varStatus="loop" items="${existingGHGInputRefrigeration}">
                            <c:if test = "${output.getAirConditionType() eq 'mobileTable'}">
                            <tr>
                            <td contenteditable='true'>${output.getGas()}</td>
							<td contenteditable='true'>tonnes</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAmount()}</td>
							<td contenteditable='true'>${output.getReference()}</td>
							<td><input type="checkbox" name="record1"></td>
                            </tr>
                            </c:if>
                            </c:forEach>
                            </tbody>
                           </table> 
						</div><br>
						<div>
                        			<input type="button" class="btn btn-sm bg-info-700 delete-row2" value="Delete Row">
                                   </div><hr>
                                   <h6 class="card-title">Add Data</h6>
      <div class="form-group row">
   
   <div class="col-lg-3">Gas Consumed
   <select name="gas" id="gasMobile" data-placeholder="--Select--" class="form-control select">
   <option></option>
   <c:forEach var="listValue" items="${gasGWP}">
			<option value="${listValue.getGas()}">${listValue.getGas()}</option>
	</c:forEach> 
    </select>
   </div>
    <div class="col-lg-2">Unit
   <input readonly="readonly" class="form-control" value="tonnes">
    </div>
    <div class="col-lg-2">Amount
   <input id = 'amountValueMob' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
   </div>
    <div class="col-lg-3">Reference
   <input type="text" id = 'refMob'class="form-control">
   </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-info-700 add-row2">Add</button>
  </div></div>
						</div></div></div>  
	     
	     <div class="form-group">
                <span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="remarks">${existingGHGInputRefrigeration[0].getRemarks()}</textarea>
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
</div></div></div></div></div></div></form></div></div></div></div></body>

<script>

function setValues(){
	var table1 = document.getElementById('stationaryTable');
    var rowLength1 = table1.rows.length;
    var index1 = 0 ;
    handle(table1,rowLength1,index1,'stationaryTable');
    
    var table2 = document.getElementById('mobileTable');
    var rowLength2 = table2.rows.length;
    var index2 = document.getElementById('stationaryTable').rows.length - 1;
    handle(table2,rowLength2,index2,'mobileTable');
    
}

function handle(table,rowLength,x,tableId){
	
	for (i = 1; i < rowLength; i++){
	       var cells = table.rows.item(i).cells;
	       var cellLength = cells.length;
	       for(var j = 0; j < cellLength; j++){
	           var cell = cells.item(j);
	           var cellVal = cell.innerHTML;
	           var name ;
	           if(j==0){
	        	   name = "ghgInputRefrigerationList["+x+"].gas";
	        	}
	           if(j==2){
	        	   name = "ghgInputRefrigerationList["+x+"].amount";
	           }
	           
	           if(j==3){
	        	   name = "ghgInputRefrigerationList["+x+"].reference";
	           }
	           if(j==1){
	        	   name = "ghgInputRefrigerationList["+x+"].airConditionType";
	        	   cellVal = tableId;
	           }
	           createHiddenField(name,cellVal);
	          
	        }
	       
	       x++;
	}
	return true;
}


function createHiddenField(name, value){
if(document.getElementsByName(name).length != 0) { //already exist
		
	}else{
	var input = document.createElement("input");
	input.setAttribute("type", "hidden");
	input.setAttribute("name", name);
	input.setAttribute("value", value); 
	document.getElementById("ghgInputForm").appendChild(input);
	}
}


$(document).ready(function(){
	
    $(".add-row1").click(function(){
        var gas = $("#gasStat").val();
        var value = $("#amountValueStat").val();
        var reference = $("#refStat").val();
        var markup = "<tr><td>" + gas + "</td><td>tonnes</td><td contenteditable='true'>" + value + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#stationaryTable tbody").append(markup);
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#stationaryTable tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});   

$(document).ready(function(){
	
    $(".add-row2").click(function(){
        var gas = $("#gasMobile").val();
        var value = $("#amountValueMob").val();
        var reference = $("#refMob").val();
        var markup = "<tr><td>" + gas + "</td><td>tonnes</td><td contenteditable='true'>" + value + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#mobileTable tbody").append(markup);
    });
    
    // Find and remove selected table rows
    $(".delete-row2").click(function(){
        $("#mobileTable tbody").find('input[name="record1"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});   

function getData(){
	var sector = document.getElementById("sector").value;
	var subSector = document.getElementById("subSector").value;
	var category = document.getElementById("category").value;
	var subCategory = document.getElementById("subSector").value;
	var year = document.getElementById("yearId").value;
	
	var url = '/getGHGInputRefrigerationExisting?sector=' + sector + '&subSector='+subSector  + '&category='+category + '&subCategory='+subCategory + '&year='+year + '&status=ANY';
	window.location.href = url;

}
var fromApproval = "<%=fromApprovalDashboard%>";
handleButtons(fromApproval);

function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	<% if(existingGHGInputRefrigeration!=null && !existingGHGInputRefrigeration.isEmpty()) { %>
	document.getElementById('dataId').value = "<%=existingGHGInputRefrigeration.get(0).getDataId()%>";
	<% } %>
}

<% if(existingGHGInputRefrigeration!=null && !existingGHGInputRefrigeration.isEmpty()) {
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
