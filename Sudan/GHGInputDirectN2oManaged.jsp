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

List<GHGInputDirectN2oManaged> existingGHGInputDirectN2oManaged = null;

if(request.getAttribute("existingGHGInputDirectN2oManaged")!=null){
	existingGHGInputDirectN2oManaged = (List<GHGInputDirectN2oManaged>)request.getAttribute("existingGHGInputDirectN2oManaged");
	
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
		<h5 class="card-title text-uppercase text-center">GHG Inventory - Direct N<sub>2</sub>O Emissions from from Managed Soils</h5>
	</div>

	<div class="card-body">
	<form action="saveGHGInputDirectN2oManaged" method="post" onsubmit="return setValues();" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
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
   <select name="ghgInput.calcApproach" required  data-placeholder="--Select--" class="form-control select" id="calcApproach">
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
        <a class="nav-link active" data-toggle="tab" href="#managed" role="tab">Managed Soils</a>
</li>
<li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#flooded" role="tab">Flooded Rice</a>
</li>
<li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#organic" role="tab">Managed Organic Soils</a>
</li>

<li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#grazed" role="tab">Grazed Soils</a>
</li>
</ul>
<br>                                    
   <div class="tab-content">
      <div class="tab-pane active fade show" id="managed" role="tabpanel">
      				<div class="card">
                    <div class="card-body">
                                
                             <h6 class="card-title">Managed Soils Data</h6>
      <div class="table-responsive">
						<table id="managedTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-pink-600">
                                <th>Anthropogenic N input type</th>
                                <th>Amount (kg/yr)</th>
                                <th>Emission Factor (kg N<sub>2</sub>O-N per kg N input)</th>
                              	<th>Reference</th>
                            </tr>
                            </thead>
                            <tbody>
                           <c:choose>
							<c:when test = "${empty managedList}">
                            <tr>
                           	<td>F<sub>SN</sub>: N in Synthetic Fertilizers</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.01</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>F<sub>ON</sub>: N in animal manure, compost, sewage sludge, other</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.01</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>F<sub>CR</sub>: N in crop residues</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.01</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>F<sub>SOM</sub>: N in mineral soils that is mineralised, in association with loss of soil C from soil organic matter as a result of changes to land use or management</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.01</td>
							<td contenteditable='true'></td>
							</tr>
                            </c:when>
                                <c:otherwise>
								<c:forEach var="output" varStatus="loop" items="${managedList}"> 
								<tr>
	                            		<td>${output.getnType()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAmount()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEmissionFactor()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
								</tr>
								</c:forEach>
                                </c:otherwise>
							</c:choose>	
                            </tbody>
                           </table> 
						</div></div></div></div>   
	     
	     <div class="tab-pane fade" id="flooded" role="tabpanel">
	     	<div class="card">
                    <div class="card-body">
                                       
                             <h6 class="card-title">Flooded Rice Data</h6>
      <div class="table-responsive">
						<table id="floodedTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-pink-600">
                                <th>Anthropogenic N input type</th>
                                <th>Amount (kg/yr)</th>
                                <th>Emission Factor (kg N<sub>2</sub>O-N per kg N input)</th>
                              	<th>Reference</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:choose>
							<c:when test = "${empty floodedList}">
                            <tr>
                           	<td>F<sub>SN</sub>: N in Synthetic Fertilizers</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.003</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>F<sub>ON</sub>: N in animal manure, compost, sewage sludge, other</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.003</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>F<sub>CR</sub>: N in crop residues</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.003</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>F<sub>SOM</sub>: N in mineral soils that is mineralised, in association with loss of soil C from soil organic matter as a result of changes to land use or management</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.003</td>
							<td contenteditable='true'></td>
							</tr>
                            </c:when>
                                <c:otherwise>
								<c:forEach var="output" varStatus="loop" items="${floodedList}"> 
								<tr>
	                            		<td>${output.getnType()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAmount()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEmissionFactor()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
								</tr>
								</c:forEach>
                                </c:otherwise>
							</c:choose>	
                            </tbody>
                           </table> 
						</div><br>
										</div></div></div> 
										
										<div class="tab-pane fade" id="organic" role="tabpanel">
	     	<div class="card">
                    <div class="card-body">
                                       
                             <h6 class="card-title">Managed Organic Soils Data</h6>
      <div class="table-responsive">
						<table id="organicTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-pink-600">
                                <th>Anthropogenic N input type</th>
                                <th>Annual area of managed/drained organic soils (Ha)</th>
                                <th>Emission Factor (kg N<sub>2</sub>O-N per Ha per year)</th>
                              	<th>Reference</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:choose>
							<c:when test = "${empty organicList}">
                            <tr>
                           	<td>CG, Temp</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">8</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>CG, Trop</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">16</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>F, Temp, NR</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.6</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>F, Temp, NP</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.1</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>F, Trop</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">8</td>
							<td contenteditable='true'></td>
							</tr>
                            </c:when>
                                <c:otherwise>
								<c:forEach var="output" varStatus="loop" items="${organicList}"> 
								<tr>
	                            		<td>${output.getnType()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAmount()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEmissionFactor()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
								</tr>
								</c:forEach>
                                </c:otherwise>
							</c:choose>	
                            </tbody>
                           </table> 
						</div><br>
										</div></div></div> 
										
										<div class="tab-pane fade" id="grazed" role="tabpanel">
	     	<div class="card">
                    <div class="card-body">
                                       
                             <h6 class="card-title">Grazed Soils Data</h6>
      <div class="table-responsive">
						<table id="grazedTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-pink-600">
                                <th>Anthropogenic N input type</th>
                                <th>Amount of urine and dung N deposited by grazing animals on pasture, range and paddock (kg per year)</th>
                                <th>Emission Factor (kg N<sub>2</sub>O-N per kg N input)</th>
                              	<th>Reference</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:choose>
							<c:when test = "${empty grazedList}">
                            <tr>
                           	<td>CPP</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.02</td>
							<td contenteditable='true'></td>
							</tr>
							
							<tr>
                            <td>SO</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">0.01</td>
							<td contenteditable='true'></td>
							</tr>
							</c:when>
                                <c:otherwise>
								<c:forEach var="output" varStatus="loop" items="${grazedList}"> 
								<tr>
	                            		<td>${output.getnType()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAmount()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEmissionFactor()}</td>
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
<textarea class="form-control" id="remarks" name="remarks">${existingGHGInputDirectN2oManaged[0].getRemarks()}</textarea>
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
</div></div>
</div></form></div></div></div></div>
</body>

<script>

function setValues(){
	var table1 = document.getElementById('managedTable');
    var rowLength1 = table1.rows.length;
    var index1 = 0 ;
    handle(table1,rowLength1,index1,'managedTable');
    
    var table2 = document.getElementById('floodedTable');
    var rowLength2 = table2.rows.length;
    var index2 = document.getElementById('managedTable').rows.length  - 1;
    handle(table2,rowLength2,index2,'floodedTable');  
   
    var table3 = document.getElementById('organicTable');
    var rowLength3 = table3.rows.length;
    var index3 = document.getElementById('managedTable').rows.length + document.getElementById('floodedTable').rows.length - 2;
    handle(table3,rowLength3,index3,'organicTable'); 
    
   
    var table4 = document.getElementById('grazedTable');
    var rowLength4 = table4.rows.length;
    var index4 = document.getElementById('managedTable').rows.length + document.getElementById('floodedTable').rows.length + document.getElementById('organicTable').rows.length - 3;
    handle(table4,rowLength4,index4,'grazedTable'); 
    
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
	        	   name = "ghgInputDirectN2oManagedList["+x+"].nType";
	        	   
	        	   var name2 = "ghgInputDirectN2oManagedList["+x+"].inputType";
	        	   var cellVal2 = tableId;
	        	   createHiddenField(name2,cellVal2);
	        	   
	        	}
	           if(j==1){
	        	   name = "ghgInputDirectN2oManagedList["+x+"].amount";
	        	}
	           if(j==2){
	        	   name = "ghgInputDirectN2oManagedList["+x+"].emissionFactor";
	           }
	           
	           if(j==3){
	        	   name = "ghgInputDirectN2oManagedList["+x+"].reference";
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
	
	var url = '/getGHGInputDirectN2oManagedExisting?sector=' + sector + '&subSector='+subSector  + '&category='+category + '&subCategory='+subCategory + '&year='+year + '&status=ANY';
	window.location.href = url;

}
var fromApproval = "<%=fromApprovalDashboard%>";
handleButtonsGHG2(fromApproval);

function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	<% if(existingGHGInputDirectN2oManaged!=null && !existingGHGInputDirectN2oManaged.isEmpty()) { %>
	document.getElementById('dataId').value = "<%=existingGHGInputDirectN2oManaged.get(0).getDataId()%>";
	<% } %>
}

<% if(existingGHGInputDirectN2oManaged!=null && !existingGHGInputDirectN2oManaged.isEmpty()) {
	%>
		document.getElementById('fourEyesStatus').value = 'Pending_Update';
		document.getElementById('calcApproach').value = "<%=existingGHGInputDirectN2oManaged.get(0).getCalcApproach()%>";
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
