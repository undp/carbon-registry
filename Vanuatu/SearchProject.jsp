<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="com.vanuatu.model.common.Project"%>
<%@page import="com.vanuatu.model.common.MitigationSectorSubSectorMapping"%>
<%@page import="com.vanuatu.model.common.AdaptationSectorSubsectorMapping"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Project</title>
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

<script src="global_assets/js/demo_pages/form_layouts.js"></script>
<script src="global_assets/js/demo_pages/form_checkboxes_radios.js"></script>
<script src="global_assets/js/plugins/tables/datatables/datatables.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/jszip/jszip.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/buttons.min.js"></script>
<script src="global_assets/js/demo_pages/datatables_extension_buttons_html5.js"></script>
<script src="global_assets/js/demo_pages/form_select2.js"></script>
<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />

<%

if(request.getAttribute("agencySet") !=null){
	session.setAttribute("agencySet", request.getAttribute("agencySet"));
}
 
%>
<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->

	<form action="getProjectList" method="post" class="form-horizontal bordered-row" data-parsley-validate="">
                    
	<div class="card border-teal">
		<div class="card-header bg-info-700 ">
		<h5 class="card-title text-uppercase text-center">Search Project</h5></div>
<%-- <div class="card-body font-size-lg">
		
    <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Project Title</label>
    <div class="col-lg-3">
  	 <input name="projectTitle" id="projectTitle" placeholder="enter keywords" class="form-control">
  	</div>
    <label class="col-lg-2 col-form-label text-right">Division</label>
   <div class="col-lg-3">
     <select name="division" id ="divisionId" onchange="populateSector();" class="form-control select" data-placeholder="--Select--" data-focu>
      <option></option>
	  <option value="Adaptation">Adaptation</option>
	  <option value="Mitigation">Mitigation</option>
	   <option value="Cross-cutting">Cross-cutting</option>
	  <option value="Enablers">Enablers</option>
	  </select>
   </div>
   </div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Sector</label>
   <div class="col-lg-3">
   <select name="sector" id="sectorId" class="form-control-select2" data-placeholder="--Select--" data-focu>
     
     </select>
   </div>
   <label class="col-lg-2 col-form-label text-right">Implementing Agency</label>
   <div class="col-lg-3">
   <select name="agency" class="form-control-select2" data-placeholder="--Select--" data-focu>
   <option></option>
   <c:forEach var="listValue" items="${agencySet}">
			<option value="${listValue}">${listValue}</option>
	</c:forEach>
	</select>
   </div>
  </div>
  <br>
  <div class="bg-default content-box text-center pad20A mrg25T">
    <button  id = "submitButton"  class="btn bg-info-700">Search</button>
</div>
  
  </div> --%>
  
  	
  <div class="card-body">	
  										
					<table id="projectList" class="table table-bordered datatable-button-html5-basic">
					<thead>
							<tr class="bg-info-700 font-size-sm">
								<th>Project Id</th>
								<th>Division</th>
								<th>Sector</th>
								<th>Sub Sector</th>
                                <th>Implementing agency</th>
                                <th>Commissioning Date</th>
                                <th>Action</th>
                               
							</tr>
							</thead>
							<tbody>
							<c:forEach var="output" varStatus="loop" items="${projectList}">
                            		<tr class="font-size-sm">
                            	
                            	<c:url value="/getProject" var="url">
								<c:param name="project" value="${output.getProjectId()}" />
								</c:url>
								<c:url value="/deleteProjectDetails" var="urlDel">
								<c:param name="dataId" value="${output.getDataId()}" />
								<c:param name="projectId" value="${output.getProjectId()}" />
								</c:url>

										<td><b><a href="${url}">${output.getProjectId()}</a></b></td>
										<td>${output.getDivision()}</td>
										<td>${output.getSector()}</td>
										<td>${output.getSubSector()}</td>
										<td>${output.getAgency()}</td>
										<td>${output.getCommissioningDate()}</td>
										<td><a href="${urlDel}" onclick="return confirm('Are you sure you want to remove this Project?')" class="icon-bin mr-3 icon-1x"></a></td>
									</tr>
							    </c:forEach>
							</tbody>
						</table>
						<button type="button" onclick = "create();" class="btn btn-link text-info-700 font-size-lg"><i class="icon-plus3 mr-2"></i>Create Project</button>
	            </div></div></form></div></div></body>
	            
<script>
function create(){
	
	var url = '/createProject';
	window.location.href = url;

}

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

</script>

</html>
