<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="com.gambia.model.common.Project"%>
<%@page import="com.gambia.model.common.MitigationSectorSubSectorMapping"%>
<%@page import="com.gambia.model.common.AdaptationSectorSubsectorMapping"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>NDC Action</title>
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
<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/uniform.min.js"></script>
<script src="global_assets/js/plugins/extensions/jquery_ui/interactions.min.js"></script>

<script src="assets/js/app.js"></script>

<script src="global_assets/js/demo_pages/form_layouts.js"></script>
<script src="global_assets/js/demo_pages/form_checkboxes_radios.js"></script>

<script src="global_assets/js/demo_pages/datatables_extension_buttons_html5.js"></script>
<script src="global_assets/js/demo_pages/form_select2.js"></script>
<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />
<%
Project project = null;
String status = null;

if(request.getAttribute("project")!=null){
 	project = (Project)request.getAttribute("project");
}
if(request.getAttribute("status")!=null){
 	status = (String)request.getAttribute("status");
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

<form action="saveProjectDetails" method="post" class="form-horizontal bordered-row" id="projectForm" data-parsley-validate="">
                   <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
     <input type="hidden" name = "projectCode" id = "projectCode" value="${project.projectCode}"> 
     <input type="hidden" name = "dataId" id = "dataId">
<div class="card border-slate">
	<div class="card-header bg-slate-700">
	<h5 class="card-title text-uppercase text-center">
	<c:if test = "${project.projectId ne null }">
		NDC Action: ${project.projectId}
	</c:if>
	<c:if test = "${project.projectId eq null }">
		Create NDC Action
	</c:if>
	</h5></div>
<div class="card-body font-size-lg">
	
	 <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Cause</label>
    <div class="col-lg-3">
  	 <select name="cause" required id="causeId" data-placeholder="--Select--" class="form-control select" data-fouc>
      <option></option>
	  <option value="Climate Change">Climate Change</option>
	  <option value="Sustainable Development">Sustainable Development</option>
	  </select>
  	</div>
    <label class="col-lg-2 col-form-label text-right">Division</label>
   <div class="col-lg-3">
     <select name="division" required id ="divisionId" onchange="populateSector();" class="form-control select" data-placeholder="--Select--" data-focu>
     <c:if test = "${status eq null }">
    
      <option></option>
	  <option value="Adaptation">Adaptation</option>
	  <option value="Mitigation">Mitigation</option>
	   <option value="Cross-cutting">Cross-cutting</option>
	  <option value="Enablers">Enablers</option>
	  
	   </c:if>
	   
	    <c:if test = "${status ne null }">
	    	 <option value="${project.division}">${project.division}</option>
	    </c:if>
	  </select>
     </div>
   </div>
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Sector</label>
   <div class="col-lg-3">
   <select name="sector" required id="sectorId" onchange="populateSubSector();" class="form-control-select2" data-placeholder="--Select--" data-focu>
     </select>
   </div>
   <label class="col-lg-2 col-form-label text-right">Sub-Sector</label>
   <div class="col-lg-3">
   <select name="subSector" required id="subSectorId" class="form-control-select2" data-placeholder="--Select--" data-focu>
     
     </select>
   </div></div>
   <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Area</label>
   <div class="col-lg-3">
     <select name="area" required id ="areaId" class="form-control select" data-placeholder="--Select--" data-focu>
      <option></option>
	  <option value="Principle">Principle</option>
	  <option value="Significant">Significant</option>
	  </select>
     </div>
   <label class="col-lg-2 col-form-label text-right">Project Title</label>
   <div class="col-lg-3">
   <input name="projectTitle" required id="projectTitle" class="form-control" placeholder="" value = "${project.projectTitle}">
   </div>
   </div>

<div class="form-group row">
 <label class="col-lg-2 col-form-label text-right">Implementing Agency</label>
 <div class="col-lg-3">
 <input name="agency" required id="agency" class="form-control" placeholder="" value = "${project.agency}" >
</div>
<label class="col-lg-2 col-form-label text-right">Other Agency</label>
<div class="col-lg-3">
<input name="otherParty" class="form-control" placeholder="" value = "${project.otherParty}">
 </div></div>
<div class="form-group row">
<label class="col-lg-2 col-form-label text-right">Lifetime (years)</label>
 <div class="col-lg-3">
 <input name="lifetime" required id="lifetime" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" placeholder="" value = "${project.lifetime}">
 </div>
  <label class="col-lg-2 col-form-label text-right">Expected Effective Date</label>
 <div class="col-lg-3">
<input class="form-control" required type="date" name="commissioningDate" id="id-date-picker-1" value = "${project.commissioningDate}">
 </div>
 </div>
 <div class="form-group row">
  <label class="col-lg-2 col-form-label text-right">Approval Date</label>
 <div class="col-lg-3">
<input class="form-control" required type="date" name="approvalDate" id="id-date-picker-1" value = "${project.approvalDate}">
 </div>
 <label class="col-lg-2 col-form-label text-right">Financial Closure Date</label>
 <div class="col-lg-3">
<input class="form-control" required type="date" name="closureDate" id="id-date-picker-1" value = "${project.closureDate}">
   </div></div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Part of NAPA</label>
   <div class="col-lg-3">
   <select name="napa" id ="napa" class="form-control select" data-placeholder="--Select--" data-focu>
     <option></option>
     <option value="Yes">Yes</option>
	  <option value="No">No</option>
	  </select>
   </div>
    <label class="col-lg-2 col-form-label text-right">Included in NDC</label>
   <div class="col-lg-3">
   <select name="ndc" id ="ndc" class="form-control select" data-placeholder="--Select--" data-focu>
     <option></option>
     <option value="Yes">Yes</option>
	  <option value="No">No</option>
     </select>
   </div></div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Project Location</label>
   <div class="col-lg-3">
   <select name="location" required id ="locationId" class="form-control select" data-placeholder="--Select--" data-focu>
     <option></option>
     <option value="National">National</option>
	  <option value="Regional">Regional</option>
	  <option value="District">District</option>
	  <option value="City">City</option>
     </select>
   </div>
   <label class="col-lg-2 col-form-label text-right">Geo Coordinates</label>
<div class="col-lg-3">
<input name="coordinates" required class="form-control" placeholder="" value = "${project.coordinates}">
</div>
</div>
<div class="form-group row">
<label class="col-lg-2 col-form-label text-right">Project Cost (USD)</label>
<div class="col-lg-3">
<input name="costAmount" required id="costAmount" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" placeholder="" value = "${project.costAmount}">
</div>
<label class="col-lg-2 col-form-label text-right">Source of Funding</label>
<div class="col-lg-3">
<select name="funding" required id ="funding" class="form-control select" data-placeholder="--Select--" data-focu>
<option></option>
<option value="Broad source funding">Broad source funding</option>
<option value="GoV, Grant or Loan">GoV, Grant or Loan</option>
<option value="Others">Others</option>
</select>
</div></div>
<hr>
<div class="form-group">
<span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="remarks" placeholder = "${project.remarks}"></textarea>
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
<button  id = "submitButton"  class="btn bg-slate-700">Submit</button>
</div></div>
  
<div class="row">
<div class="col-md-3">
</div>
          
<div class="col-md-5">
<div class="form-group ">
<b><span class="col-sm-6 control-label" style="float:left"></span></b>
<div class="col-sm-6">
<div id = "approvalButton" style="display: none">
<button id = "Approved" onclick="setStatus(this.id);" class="btn bg-slate-700">Approve</button>
</div>
</div>
</div>
</div>
 
<div class="col-md-4">
<div class="form-group">
<div class="col-sm-6">
<div id = "rejectionButton" style="display: none">
<button id = "Rejected" onclick="setStatus(this.id);"  class="btn bg-slate-700">Reject</button>
</div> 
</div>
</div>
</div>
</div>
</div>
</form></div></div></div></body>
  
<% if (project!=null) { %>
<script>

document.getElementById('causeId').value = "<%=project.getCause()%>";
document.getElementById('divisionId').value = "<%=project.getDivision()%>";

var division = document.getElementById('divisionId').value;
var sector = document.getElementById('sectorId');
sector.options[sector.options.length] = new Option("<%=project.getSector()%>", "<%=project.getSector()%>");

if(division == 'Mitigation') {
	<c:forEach var="myVal" items="${mitigationSectorsList}">
	 <c:if test = "${myVal ne existingSector}">
		 sector.options[sector.options.length] = new Option("${myVal}", "${myVal}");
	 </c:if>
	</c:forEach>
	
}
if(division == 'Adaptation') {
	<c:forEach var="myVal" items="${adaptationSectorsList}">
	<c:if test = "${myVal ne existingSector}">
		 sector.options[sector.options.length] = new Option("${myVal}", "${myVal}");
	 </c:if>
	</c:forEach>
	
}

if(division == 'Cross-cutting') {
	<c:forEach var="myVal" items="${mitigationSectorsList}">
	 <c:if test = "${myVal ne existingSector}">
		 sector.options[sector.options.length] = new Option("${myVal}", "${myVal}");
	 </c:if>
	 </c:forEach>
	
	
	<c:forEach var="myVal" items="${adaptationSectorsList}">
	 <c:if test = "${myVal ne existingSector}">
	 	sector.options[sector.options.length] = new Option("${myVal}", "${myVal}");
	 	 </c:if>
	</c:forEach>
	
}

var subSector = document.getElementById('subSectorId');
subSector.options[subSector.options.length] = new Option("<%=project.getSubSector()%>", "<%=project.getSubSector()%>");

document.getElementById('areaId').value = "<%=project.getArea()%>";

document.getElementById('ndc').value = "<%=project.getNdc()%>";
document.getElementById('napa').value = "<%=project.getNapa()%>";

document.getElementById('locationId').value = "<%=project.getLocation()%>";
document.getElementById('funding').value = "<%=project.getFunding()%>";

</script>

<% } %>

<script>

function populateSector(){
	var sector = document.getElementById("sectorId");
	
	var division = document.getElementById('divisionId').value;
	
	for(i=sector.options.length-1;i>=0;i--)
	{
		sector.remove(i);
	}
	sector.options[sector.options.length] = new Option('--Select--','--Select--');
	
	if(division == 'Mitigation') {
		<c:forEach var="myVal" items="${mitigationSectorsList}">
			 sector.options[sector.options.length] = new Option("${myVal}", "${myVal}");
		</c:forEach>
		
	}
	if(division == 'Adaptation') {
		<c:forEach var="myVal" items="${adaptationSectorsList}">
			 sector.options[sector.options.length] = new Option("${myVal}", "${myVal}");
		</c:forEach>
		
	}
	
	if(division == 'Cross-cutting') {
		<c:forEach var="myVal" items="${mitigationSectorsList}">
			 sector.options[sector.options.length] = new Option("${myVal}", "${myVal}");
		</c:forEach>
		
		<c:forEach var="myVal" items="${adaptationSectorsList}">
		 	sector.options[sector.options.length] = new Option("${myVal}", "${myVal}");
		</c:forEach>
		
	}
	
}

function populateSubSector(){
	var division = document.getElementById('divisionId').value;
	var sector = document.getElementById("sectorId").value;
	var subSector = document.getElementById("subSectorId");
	
	for(i=subSector.options.length-1;i>=0;i--)
	{
		subSector.remove(i);
	}
	subSector.options[subSector.options.length] = new Option('--Select--','--Select--');
	
	if(division == 'Mitigation') {
		<c:forEach var="entry" items="${mitigationSectorsMap}">
		if("${entry.key}" == sector) {
		    <c:forEach var="myVal" items='${entry.value}'>
		    	subSector.options[subSector.options.length] = new Option("${myVal.getSubSector()}", "${myVal.getSubSector()}");
		    </c:forEach>
		}    
		</c:forEach> 
	}
	
	if(division == 'Adaptation') {
		<c:forEach var="entry" items="${adaptationSectorsMap}">
		if("${entry.key}" == sector) {
		    <c:forEach var="myVal" items='${entry.value}'>
		    	subSector.options[subSector.options.length] = new Option("${myVal.getSubSector()}", "${myVal.getSubSector()}");
		    </c:forEach>
		}    
		</c:forEach> 
	}
	
	if(division == 'Cross-cutting') {
		<c:forEach var="entry" items="${mitigationSectorsMap}">
		if("${entry.key}" == sector) {
		    <c:forEach var="myVal" items='${entry.value}'>
		    	subSector.options[subSector.options.length] = new Option("${myVal.getSubSector()}", "${myVal.getSubSector()}");
		    </c:forEach>
		}    
		</c:forEach> 
		<c:forEach var="entry" items="${adaptationSectorsMap}">
		if("${entry.key}" == sector) {
		    <c:forEach var="myVal" items='${entry.value}'>
		    	subSector.options[subSector.options.length] = new Option("${myVal.getSubSector()}", "${myVal.getSubSector()}");
		    </c:forEach>
		}    
		</c:forEach> 
	}
	
	
}	
var fromApproval = "<%=fromApprovalDashboard%>";
handleButtons(fromApproval);



function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	
	<% if (project!=null) { %>

	document.getElementById('dataId').value = "<%=project.getDataId()%>";
	

	<% } %>
	
}
</script>
	

<% if (project!=null) { %>

<script>
	document.getElementById('fourEyesStatus').value = 'Pending_Update';
	
</script>

<% } else { %>
<script>
	document.getElementById('fourEyesStatus').value = 'Pending_Insert';
</script>

<% } %>	

 
  	<script src="global_assets/input-mask.js"></script>
   <script src="global_assets/js/input-mask.js"></script>
</html>
