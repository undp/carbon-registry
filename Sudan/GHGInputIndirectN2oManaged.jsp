<%@page import="com.sudan.model.ghg.afolu.*"%>
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

if(request.getAttribute("ghgMapping") !=null){
	session.setAttribute("ghgMapping", request.getAttribute("ghgMapping"));
}

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

List<GHGInputIndirectN2oManaged> existingGHGInputIndirectN2oManaged = null;

if(request.getAttribute("existingGHGInputIndirectN2oManaged")!=null){
	existingGHGInputIndirectN2oManaged = (List<GHGInputIndirectN2oManaged>)request.getAttribute("existingGHGInputIndirectN2oManaged");
	
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
		<h5 class="card-title text-uppercase text-center">GHG Inventory - Indirect N<sub>2</sub>O Emissions from from Managed Soils</h5>
	</div>

	<div class="card-body">
	<form action="saveGHGInputIndirectN2oManaged" method="post" onsubmit="return setValues();" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
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
   <select name="ghgInput.calcApproach" required data-placeholder="--Select--" class="form-control select" id="calcApproach">
      <option></option>
	  <option value="Tier I">Tier I</option>
	  <option value="Tier II">Tier II</option>
	</select>  
   </div>
  </div>
  <hr>            
                
<div class="form-group">
<div class="tab-container">
<ul class="nav nav-tabs justify-content-center nav-fill "  role="tablist">
    <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#deposit" role="tab">N<sub>2</sub>O from Atmospheric Deposition</a>
</li>
<li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#leaching" role="tab">N<sub>2</sub>O from N Leaching/ Runoff</a>
</li>
</ul>
<br>                                    
   <div class="tab-content">
      <div class="tab-pane active fade show" id="deposit" role="tabpanel">
      				<div class="card">
                    <div class="card-body">
                                
                             <h6 class="card-title">N<sub>2</sub>O Atmospheric Deposition Data</h6>
      <div class="table-responsive">
						<table id="depositTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-pink-600">
                                <th>Description</th>
                                <th>Value</th>
                                <th>Unit</th>
                              	<th>Reference</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:choose>
							<c:when test = "${empty depositList}">
                            <tr>
                           	<td>Annual amount of synthetic fertilizer N applied to soils</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td>kg N /year</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                           	<td>Fraction of synthetic fertilizer N that volatilises</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.1</td>
							<td>(kg NH3-N + NOx-N) per (kg of N applied)</td>
							<td contenteditable='true'>IPCC Default</td>
							</tr>
							
							<tr>
                           	<td>Annual amount of animal manure, compost, sewage sludge and other organic N additions intentionally applied to soils</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td>kg N /year</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                           	<td>Annual amount of urine and dung N deposited by grazing animals on pasture, range and paddock</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td>kg N /year</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                           	<td>Fraction of applied organic N fertilizer materials and of urine and dung N deposited by grazing animals that volatilises</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.2</td>
							<td>(kg NH3-N + NOx-N) per (kg of N applied or deposited)</td>
							<td contenteditable='true'>IPCC Default</td>
							</tr>
							
							<tr>
                           	<td>Emission factor for N2O emission from atmospheric deposition of N on soils and water surfaces</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.01</td>
							<td>(kg N2O-N) per (kg NH3-N + NOx-N volatilized)</td>
							<td contenteditable='true'>IPCC Default</td>
							</tr>
							</c:when>
                                <c:otherwise>
								<c:forEach var="output" varStatus="loop" items="${depositList}"> 
								<tr>
	                            		<td>${output.getnType()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAmount()}</td>
										<td>${output.getUnit()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
								</tr>
								</c:forEach>
                                </c:otherwise>
							</c:choose>	
                            </tbody>
                           </table> 
						</div></div></div></div>   
	     
	     <div class="tab-pane fade" id="leaching" role="tabpanel">
	     	<div class="card">
                    <div class="card-body">
                                       
                             <h6 class="card-title">Flooded Rice Data</h6>
      <div class="table-responsive">
						<table id="leachingTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-pink-600">
                                <th>Description</th>
                                <th>Value</th>
                                <th>Unit</th>
                              	<th>Reference</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:choose>
							<c:when test = "${empty leachingList}">
                            <tr>
                           	<td>Annual amount of synthetic fertilizer N applied to soils</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td>kg N /year</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                           	<td>Annual amount of animal manure, compost, sewage sludge and other organic N additions intentionally applied to soils</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td>kg N /year</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                           	<td>Annual amount of urine and dung N deposited by grazing animals on pasture, range and paddock</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td>kg N /year</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                           	<td>Amount of N in crop residues (above and below-ground), including N-fixing crops, and from forage/pasture renewal, returned to soils annually</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td>kg N /year</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                           	<td>Annual amount of N mineralized/immobilized in mineral soils associated with loss/gain of soil C from soil organic matter as a result of changes to land use or management</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td>kg N /year</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                           	<td>Fraction of all N additions to managed soils that is lost through leaching and runoff</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.2</td>
							<td>kg N per kg of N additions</td>
							<td contenteditable='true'>IPCC Default</td>
							</tr>
							
							<tr>
                           	<td>Emission factor for N2O emission from N leaching and runoff</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.0075</td>
							<td>(kg N2O-N) per (kg NH3-N + NOx-N volatilized)</td>
							<td contenteditable='true'>IPCC Default</td>
							</tr>
							</c:when>
                                <c:otherwise>
								<c:forEach var="output" varStatus="loop" items="${leachingList}"> 
								<tr>
	                            		<td>${output.getnType()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAmount()}</td>
										<td>${output.getUnit()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
								</tr>
								</c:forEach>
                                </c:otherwise>
							</c:choose>	
                            </tbody>
        
                           </table> 
						</div><br>
										</div></div></div></div></div></div>
										
	     
	     <div class="form-group">
                <span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="remarks">${existingGHGInputIndirectN2oManaged[0].getRemarks()}</textarea>
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
</div></div></div></form></div></div></div></div>
</body>

<script>

function setValues(){
	var table1 = document.getElementById('depositTable');
    var rowLength1 = table1.rows.length;
    var index1 = 0 ;
    handle(table1,rowLength1,index1,'depositTable');
    
    var table2 = document.getElementById('leachingTable');
    var rowLength2 = table2.rows.length;
    var index2 = document.getElementById('depositTable').rows.length - 1;
    handle(table2,rowLength2,index2,'leachingTable');
    
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
	        	   name = "ghgInputIndirectN2oManagedList["+x+"].nType";
	        	   
	        	   var name2 = "ghgInputIndirectN2oManagedList["+x+"].inputType";
	        	   var cellVal2 = tableId;
	        	   createHiddenField(name2,cellVal2);
	        	}
	           if(j==1){
	        	   name = "ghgInputIndirectN2oManagedList["+x+"].amount";
	        	}
	           if(j==2){
	        	   name = "ghgInputIndirectN2oManagedList["+x+"].unit";
	           }
	           
	           if(j==3){
	        	   name = "ghgInputIndirectN2oManagedList["+x+"].reference";
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

function getData(){
	var sector = document.getElementById("sector").value;
	var subSector = document.getElementById("subSector").value;
	var category = document.getElementById("category").value;
	var subCategory = document.getElementById("subSector").value;
	var year = document.getElementById("yearId").value;
	
	var url = '/getGHGInputIndirectN2oManagedExisting?sector=' + sector + '&subSector='+subSector  + '&category='+category + '&subCategory='+subCategory + '&year='+year + '&status=ANY';
	window.location.href = url;

}
var fromApproval = "<%=fromApprovalDashboard%>";
handleButtonsGHG2(fromApproval);

function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	<% if(existingGHGInputIndirectN2oManaged!=null && !existingGHGInputIndirectN2oManaged.isEmpty()) { %>
	document.getElementById('dataId').value = "<%=existingGHGInputIndirectN2oManaged.get(0).getDataId()%>";
	<% } %>
}

<% if(existingGHGInputIndirectN2oManaged!=null && !existingGHGInputIndirectN2oManaged.isEmpty()) {
	%>
		document.getElementById('fourEyesStatus').value = 'Pending_Update';
		document.getElementById('calcApproach').value = "<%=existingGHGInputIndirectN2oManaged.get(0).getCalcApproach()%>";
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
