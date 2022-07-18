<%@page import="com.gambia.model.sdg.SDGInput"%>
<%@page import="com.gambia.model.sdg.SDGMap"%>
<%@page import="com.gambia.model.common.Project"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>SDG Assessment</title>
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
<script src="global_assets/js/plugins/uploaders/fileinput/fileinput.min.js"></script>
<script src="global_assets/js/plugins/forms/selects/bootstrap_multiselect.js"></script>
<script src="global_assets/js/plugins/forms/inputs/touchspin.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/switch.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/switchery.min.js"></script>

<script src="assets/js/app.js"></script>

<script src="global_assets/js/demo_pages/form_layouts.js"></script>
<script src="global_assets/js/demo_pages/form_checkboxes_radios.js"></script>
<script src="global_assets/js/demo_pages/datatables_extension_buttons_html5.js"></script>
<script src="global_assets/js/demo_pages/form_select2.js"></script>
<script src="global_assets/js/demo_pages/form_multiselect.js"></script>
<script src="global_assets/js/demo_pages/uploader_bootstrap.js"></script>


<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />
<%

if(request.getAttribute("projectsList")!=null){
	session.setAttribute("projectsList",request.getAttribute("projectsList"));
}

SDGInput existingSdgInput = null;

if(request.getAttribute("existingSdgInput")!=null){
	existingSdgInput = (SDGInput)request.getAttribute("existingSdgInput");
}
 
String selectedProjectId = (String)request.getAttribute("projectId");	
String fromApprovalDashboard = request.getParameter("fromApprovalDashboard");	

%>
 
<body>
<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
<div class="card border-slate">

	<div class="card-header bg-slate-700 ">
		<h5 class="card-title text-uppercase text-center">SDG Assessment - Project Information</h5>
	</div>
<div class="card-body font-size-lg">

<form action = "saveSDGInput" method="post" class="form-horizontal bordered-row" data-fouc>
<input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
<input type="hidden" name = "poverty.dataId" id = "dataId">

<div class="form-group row">
<label class="col-lg-4 col-form-label text-right">Project Id</label>
<div class="col-lg-6">
<select name="sdgInfo.projectId" id="projectId" required data-placeholder="--Select--" onchange="getData(this.value);" class="form-control form-control-select2" data-focu>
<option></option>
<% if(fromApprovalDashboard==null) { %>                	
                            <c:forEach var="listValue" items="${projectsList}">
							<option value="${listValue}">${listValue}</option>
							</c:forEach>
				<% } %>	
</select>
</div></div>

<div class="form-group row">
<label class="col-lg-4 col-form-label text-right">Describe environmental and social screening approach, identified risks and management approach (if conducted)</label>
<div class="col-lg-6">
<textarea class="form-control textarea-autosize" id="screeningApproach"  name="sdgInfo.screeningApproach">${existingSdgInput.sdgInfo.screeningApproach}</textarea>
</div>
</div>
<hr>
<div class="form-group">
<div class="tab-container">
							
                            <ul class="nav nav-tabs justify-content-center nav-fill" role="tablist">
                             <li class="nav-item">
								<a class="nav-link active" data-toggle="tab" href="#stakeholder" role="tab">Stakeholder Consultation</a>
                            </li>
                             <li class="nav-item">
								<a class="nav-link" data-toggle="tab" href="#poverty" role="tab" >Poverty Reduction</a>
                            </li>
                             <li class="nav-item">
								<a class="nav-link" data-toggle="tab" href="#equality" role="tab">Reducing Inequality </a>
                            </li>
                                <li class="nav-item">
								<a class="nav-link" data-toggle="tab" href="#gender" role="tab" >Gender Parity</a>
                            </li>
                            <li class="nav-item dropdown">
									<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Other SDG Impacts</a>
									<div class="dropdown-menu">
                             
                                <a class="dropdown-item" data-toggle="tab" href="#industry" role="tab" >Infrastructure, Innovation, Industry</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#environment" role="tab">Environment</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#employment" role="tab" >Employment</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#education" role="tab" >Education and Learning</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#food" role="tab" >Food Security and Hunger</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#water" role="tab" >Water and Sanitation</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#health" role="tab" >Health and Well Being</a>
                            </div></li>
                            </ul><hr>
<div class="tab-content">
<div class="tab-pane active fade show" id="stakeholder" role="tabpanel">
<div class="card">
						<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Stakeholder Inputs</h6></div>
							<div class="card-body">	
<div class="card-group-control card-group-control-left">

<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseStakeholder">Stakeholder Feedback</a></h6>

<div id="collapseStakeholder" class="collapse">
<div class="card border-grey">
<div class="card-body">
	<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseGov">Government</a></h6>
	<div class="collapse" id="collapseGov">
									<div class="row">
									<div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Strengths</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.govtStrengths">${existingSdgInput.sdgInfo.govtStrengths}</textarea>
									</div>
									</div>
									</div>
									<br>
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Weakness</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.govtWeaknesses">${existingSdgInput.sdgInfo.govtWeaknesses}</textarea>
									</div>
									</div>
									</div>
									</div>
									 <div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Opportunities</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.govtOppurtunities">${existingSdgInput.sdgInfo.govtOppurtunities}</textarea>
									</div>
									</div></div>
									<br>
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Threats</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.govtThreats">${existingSdgInput.sdgInfo.govtThreats}</textarea>
									</div>
									</div>
									</div>
									</div>
									</div>
                                    <hr>
                                    </div>
                                    
                                    <h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapsePri">Private Sector</a></h6>
									<div class="collapse" id="collapsePri">
									<div class="row">
									<div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Strengths</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.privateSectorStrengths">${existingSdgInput.sdgInfo.privateSectorStrengths}</textarea>
									</div>
									</div>
									</div>
									<br>
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Weakness</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.privateSectorWeaknesses">${existingSdgInput.sdgInfo.privateSectorWeaknesses}</textarea>
									</div>
									</div>
									</div>
									</div>
									 <div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Opportunities</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.privateSectorOppurtunities">${existingSdgInput.sdgInfo.privateSectorOppurtunities}</textarea>
									</div>
									</div></div><br>
									
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Threats</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.privateSectorThreats">${existingSdgInput.sdgInfo.privateSectorThreats}</textarea>
									</div>
									</div>
									</div>
									</div>
									</div>
									<hr></div>
	                                <h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseNgo">NGOs</a></h6>
									<div class="collapse" id="collapseNgo">
									<div class="row">
									<div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Strengths</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.ngoStrengths">${existingSdgInput.sdgInfo.ngoStrengths}</textarea>
									</div>
									</div>
									</div><br>
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Weakness</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.ngoWeaknesses">${existingSdgInput.sdgInfo.ngoWeaknesses}</textarea>
									</div>
									</div>
									</div>
									</div>
									 <div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Opportunities</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.ngoOppurtunities">${existingSdgInput.sdgInfo.ngoOppurtunities}</textarea>
									</div>
									</div></div><br>
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Threats</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.ngoThreats">${existingSdgInput.sdgInfo.ngoThreats}</textarea>
									</div>
									</div>
									</div>
									</div>
									</div><hr></div>
	                                <h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseCivil">Civil Society</a></h6>
									<div class="collapse" id="collapseCivil">
									<div class="row">
									<div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Strengths</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.civilSocietyStrengths">${existingSdgInput.sdgInfo.civilSocietyStrengths}</textarea>
									</div>
									</div>
									</div><br>
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Weakness</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.civilSocietyWeaknesses">${existingSdgInput.sdgInfo.civilSocietyWeaknesses}</textarea>
									</div>
									</div>
									</div>
									</div>
									<div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Opportunities</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.civilSocietyOppurtunities">${existingSdgInput.sdgInfo.civilSocietyOppurtunities}</textarea>
									</div>
									</div></div><br>
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Threats</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.civilSocietyThreats">${existingSdgInput.sdgInfo.civilSocietyThreats}</textarea>
									</div>
									</div>
									</div>
									</div>
									</div><hr></div>
	                                <h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseDirect">Direct Beneficiaries</a></h6>
									<div class="collapse" id="collapseDirect">
									<div class="row">
									<div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Strengths</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.beneficiaryStrengths">${existingSdgInput.sdgInfo.beneficiaryStrengths}</textarea>
									</div>
									</div>
									</div><br>
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Weakness</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.beneficiaryWeaknesses">${existingSdgInput.sdgInfo.beneficiaryWeaknesses}</textarea>
									</div>
									</div>
									</div>
									</div>
									 <div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Opportunities</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.beneficiaryOppurtunities">${existingSdgInput.sdgInfo.beneficiaryOppurtunities}</textarea>
									</div>
									</div></div><br>
									
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Threats</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.beneficiaryThreats">${existingSdgInput.sdgInfo.beneficiaryThreats}</textarea>
									</div>
									</div>
									</div>
									</div>
									</div><hr>
	</div>
	
	                                <h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseOther">Others</a></h6>
	
	<div class="collapse" id="collapseOther">
	<div class="row">
									<div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Strengths</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.othersStrengths">${existingSdgInput.sdgInfo.othersStrengths}</textarea>
									</div>
									</div>
									</div>
									<br>
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Weakness</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.othersWeaknesses">${existingSdgInput.sdgInfo.othersWeaknesses}</textarea>
									</div>
									</div>
									</div>
									</div>
									 <div class="col-md-6">
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Opportunities</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.othersOppurtunities">${existingSdgInput.sdgInfo.othersOppurtunities}</textarea>
									</div>
									</div></div><br>
									
									<div class="row">
									<label class="col-sm-3 col-form-label" style="color:black;">Threats</label>
									<div class="col-sm-6">
									<div class="form-group">
									<textarea class="form-control textarea-autosize" name ="sdgInfo.othersThreats">${existingSdgInput.sdgInfo.othersThreats}</textarea>
									</div>
									</div>
									</div>
									</div>
									</div><hr>
									</div></div></div></div></div></div></div></div>

<div class="tab-pane fade show" id="poverty" role="tabpanel">
						<div class="card-group-control card-group-control-left">
						<div class="card">
						<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Poverty Reduction</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapsePovQl">Qualiitative Impact</a>
									</h6>
								
							
<div class="collapse" id="collapsePovQl">
    <div class="element-select" ><label style="color:black;" class="title">Does the action contribute to reducing poverty levels in the country/community?<br></label><br>
<div class="row">
   <div class="col-md-6">
   <div class="row">
     <label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
         <div class="col-sm-6">
         <select name="poverty.sdg1_pov_q1Likelihood"  id="sdg1_pov_q1Likelihood" data-placeholder="--Select--" class="form-control select" value="existingSdgInput.poverty.sdg1_pov_q1Likelihood">
         <option></option>
         <option value="Not Applicable">Not Applicable</option>
         <option value="Very Likely">Very Likely</option>
         <option value="Likely">Likely</option>
         <option value="Possible">Possible</option>
         <option value="Unlikely">Unlikely</option>
         <option value="Very unlikely">Very unlikely</option>
         </select></div></div></div>
               
<div class="col-md-6">
   <div class="row">
     <label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
                <div class="col-sm-6">
                <select name="poverty.sdg1_pov_q1Impact" id="sdg1_pov_q1Impact" data-placeholder="--Select--" class="form-control select">
                <option></option>
                <option value="Major Impact">Major Impact</option>
	         <option value="Moderate Impact">Moderate Impact</option>
	         <option value="Minor Impact">Minor Impact</option>
	         </select></div></div></div></div></div>
    <br>

<div class="element-select"><label style="color:black;" class="title">Does the action contribute to bringing access to basic services to the vulnerable sections of the country/society?</label><br>
<div class="row">
   			<div class="col-md-6">
   			<div class="row">
     			<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
         <div class="col-sm-6">
         <select name="poverty.sdg1_pov_q2Likelihood"  id="sdg1_pov_q2Likelihood" data-placeholder="--Select--" class="form-control select">
         <option></option>
   <option value="Not Applicable">Not Applicable</option>
   <option value="Very Likely">Very Likely</option>
   <option value="Likely">Likely</option>
   <option value="Possible">Possible</option>
   <option value="Unlikely">Unlikely</option>
   <option value="Very unlikely">Very unlikely</option>
   </select></div></div></div>
         
         <div class="col-md-6">
         <div class="row">
		 <label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
                <div class="col-sm-6">
                <select name="poverty.sdg1_pov_q2Impact"  id="sdg1_pov_q2Impact" data-placeholder="--Select--" class="form-control select">
                <option></option>
	         <option value="Major Impact">Major Impact</option>
	         <option value="Moderate Impact">Moderate Impact</option>
	         <option value="Minor Impact">Minor Impact</option>
	         </select></div></div></div></div></div>
    <br>

<div class="element-select"><label style="color:black;" class="title">Does the action contribute to building resilience and reducing vulnerability against climate events and resulting social, economic and environmental impacts in the country/ community?</label><br>
<div class="row">
    			  <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
         <div class="col-sm-6">
         <select name="poverty.sdg1_pov_q3Likelihood" id="sdg1_pov_q3Likelihood" data-placeholder="--Select--" class="form-control select">
         <option></option>
   <option value="Not Applicable">Not Applicable</option>
   <option value="Very Likely">Very Likely</option>
   <option value="Likely">Likely</option>
   <option value="Possible">Possible</option>
   <option value="Unlikely">Unlikely</option>
   <option value="Very unlikely">Very unlikely</option>
   </select></div></div></div>
         
          <div class="col-md-6">
         <div class="row">
		 <label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
                <div class="col-sm-6">
                <select name="poverty.sdg1_pov_q3Impact" id="sdg1_pov_q3Impact" data-placeholder="--Select--" class="form-control select">
                <option></option>
	         <option value="Major Impact">Major Impact</option>
	         <option value="Moderate Impact">Moderate Impact</option>
	         <option value="Minor Impact">Minor Impact</option>
	         </select></div></div></div></div></div>
<br>

<div class="element-select"><label style="color:black;" class="title">Does the action lead to increased spending by the national government into sectors that accelerate poverty eradication?</label><br>
<div class="row">
    <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
         <div class="col-sm-6">
         <select name="poverty.sdg1_pov_q4Likelihood" id="sdg1_pov_q4Likelihood" data-placeholder="--Select--" class="form-control select">
         <option></option>
   <option value="Not Applicable">Not Applicable</option>
   <option value="Very Likely">Very Likely</option>
   <option value="Likely">Likely</option>
   <option value="Possible">Possible</option>
   <option value="Unlikely">Unlikely</option>
   <option value="Very unlikely">Very unlikely</option>
   </select></div></div></div>
         
         <div class="col-md-6">
         <div class="row">
		 <label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
                <div class="col-sm-6">
                <select name="poverty.sdg1_pov_q4Impact" id="sdg1_pov_q4Impact" data-placeholder="--Select--" class="form-control select">
                <option></option>
	         <option value="Major Impact">Major Impact</option>
	         <option value="Moderate Impact">Moderate Impact</option>
	         <option value="Minor Impact">Minor Impact</option>
	         </select></div></div></div></div></div></div>
								<h6 class="card-title">
									<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapsePovQn">Quantitative Impact</a>
								</h6>
							<div id="collapsePovQn" class="collapse ">
								
<div class="element-select" ><label style="color:black;" class="title">Additional number of people living on more than $1.25 per day</label><br>
<div class="row">

   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="poverty.sdg1_pov_data1" value=${existingSdgInput.poverty.sdg1_pov_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="poverty.sdg1_pov_ds1" class="form-control"  value=${existingSdgInput.poverty.sdg1_pov_ds1}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div class="element-select"><label style="color:black;" class="title">Additional number of people with social security</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="poverty.sdg1_pov_data2" value=${existingSdgInput.poverty.sdg1_pov_data2} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
   
               <input type="text"    name="poverty.sdg1_pov_ds2"  class="form-control"  value=${existingSdgInput.poverty.sdg1_pov_ds2}>
               </div>
               </div>
   </div>
   </div>
   </div>
<br>
<div class="element-number"><label style="color:black;" class="title">Additional resources to implement programmes and policies for poverty reduction (USD)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="poverty.sdg1_pov_data3"   value=${existingSdgInput.poverty.sdg1_pov_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"    name="poverty.sdg1_pov_ds3" class="form-control"  value=${existingSdgInput.poverty.sdg1_pov_ds3}>
               </div>
               </div>
   </div>
   </div>
   </div>
<br>
<div class="element-number"><label style="color:black;" class="title">Additional gender-sensitive policy frameworks at regional and national level to accelerate investment in poverty reduction</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="poverty.sdg1_pov_data4"  value=${existingSdgInput.poverty.sdg1_pov_data4} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="poverty.sdg1_pov_ds4"  class="form-control"  value=${existingSdgInput.poverty.sdg1_pov_ds4}>
                </div>
                </div>
    </div>
    </div>
    </div>
</div></div></div></div></div>
<div class="tab-pane" id="equality" role="tabpanel">
<div class="card-group-control card-group-control-left">
		<div class="card">
			<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Reducing Inequality</h6></div>
							
	<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEqQl">Qualiitative Impact</a>
									</h6>
							
<div class="collapse" id="collapseEqQl">
    <div class="element-select" ><label style="color:black;" class="title">Does the action empower and/or improve the quality of life and income generation of the bottom 40% of the population (at a rate higher than the national average)?<br></label><br>
	 <div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q1Likelihood" id="sdg10_ineq_q1Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		         </div>
                 </div>
                 </div>
                 
                <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q1Impact" id="sdg10_ineq_q1Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div>
	<br>
	<div class="element-select"><label style="color:black;" class="title">Does the action empower and promote the social, economic and political inclusion of all, irrespective of age, sex, race, ethnicity, origin, religion or economic or other status?</label><br>
	 <div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q2Likelihood" id="sdg10_ineq_q2Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q2Impact" id="sdg10_ineq_q2Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div>
	<br>
	<div class="element-select"><label style="color:black;" class="title">Does the action empower and promote inclusion of people with disabilities in economic and social life?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q3Likelihood" id="sdg10_ineq_q3Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                 <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q3Impact" id="sdg10_ineq_q3Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div>
	<br>
	
	<div class="element-select"><label style="color:black;" class="title">Does the action ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies and practices and promoting appropriate legislation, policies and action in this regard?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q4Likelihood" id="sdg10_ineq_q4Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                 <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q4Impact" id="sdg10_ineq_q4Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
	</div>
	<br>
	<div class="element-select"><label style="color:black;" class="title">Does the action promote greater parity in wages and social protection (e.g.insurance) towards greater equality?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q5Likelihood" id="sdg10_ineq_q5Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                 <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q5Impact" id="sdg10_ineq_q5Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
	</div>
	<br>
	<div class="element-select"><label style="color:black;" class="title">Does the action ensure better representation of the country in global decision making process (e.g. give voting rights in international organizations) particularly in the financial and economic context?</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q6Likelihood" id="sdg10_ineq_q6Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="inequality.sdg10_ineq_q6Impact" id="sdg10_ineq_q6Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
	</div>
	</div>
					
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEqQn">Quantitative Impact</a>
									</h6>
					
								<div id="collapseEqQn" class="collapse ">
								<div class="element-select"  ><label style="color:black;" class="title">Additional policy frameworks at regional and national level to reduce inequality and empower vulnerable groups</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="inequality.sdg10_ineq_data1"   value=${existingSdgInput.inequality.sdg10_ineq_data1}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text"    name="inequality.sdg10_ineq_ds1"  class="form-control"  value=${existingSdgInput.inequality.sdg10_ineq_ds1}>
                </div>
                </div>
    </div>
    </div>
    </div>
    <br>
	<div class="element-select"><label style="color:black;" class="title">Additional number of people from vulnerable backgrounds participating in decision-making</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="inequality.sdg10_ineq_data2"  value=${existingSdgInput.inequality.sdg10_ineq_data2}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="inequality.sdg10_ineq_ds2"  class="form-control" value=${existingSdgInput.inequality.sdg10_ineq_ds2}>
                </div>
                </div>
    </div>
    </div>
    </div>
	<br>
	<div class="element-number"><label style="color:black;" class="title">Additional official development assistance including foreign direct investment for community/country (USD)</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="inequality.sdg10_ineq_data3"  value=${existingSdgInput.inequality.sdg10_ineq_data3}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="inequality.sdg10_ineq_ds3"  class="form-control" value=${existingSdgInput.inequality.sdg10_ineq_ds3}>
                </div>
                </div>
    </div>
    </div>
    </div>
    </div>
</div>
</div></div></div>



<div class="tab-pane fade" id="gender" role="tabpanel">
<div class="card-group-control card-group-control-left">
									<div class="card">
			<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Gender Pairty</h6></div>
							
	<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseGenQl">Qualiitative Impact</a>
									</h6>
							
<div class="collapse" id="collapseGenQl">                                    
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute to ending discrimination against girls / women (e.g.Non - discrimination of employment based on sex)?</label><br>
	
	 <div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="gender.sdg5_gen_q1Likelihood" id= "sdg5_gen_q1Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="gender.sdg5_gen_q1Impact" id="sdg5_gen_q1Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div>
<br>	
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute to ending violence against girls / women (e.g.trafficking or sexual exploitation)?</label><br>
	 <div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="gender.sdg5_gen_q2Likelihood" id="sdg5_gen_q2Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                 <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">

                 <select name="gender.sdg5_gen_q2Impact" id="sdg5_gen_q2Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div>
     <br>
	
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute to ending harmful practices against girls / women (e.g.Child marriage, genital mutilation etc.)?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="gender.sdg5_gen_q3Likelihood" id="sdg5_gen_q3Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
              <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">

                 <select name="gender.sdg5_gen_q3Impact" id="sdg5_gen_q3Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Select">--Select--</option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div>
	<br>
	
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute to promoting equal rights to economic resources to women (e.g.ownership of land)?</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="gender.sdg5_gen_q4Likelihood" id="sdg5_gen_q4Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="gender.sdg5_gen_q4Impact" id="sdg5_gen_q4Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
	</div>
	<br>
	
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute to promoting equal rights to reproductive health and reproductive rights (e.g. use of contraceptives, access to health services etc.)?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="gender.sdg5_gen_q5Likelihood" id="sdg5_gen_q5Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="gender.sdg5_gen_q5Impact" id="sdg5_gen_q5Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
    </div>
	</div>
	</div>
	
	
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseGenQn">Quantitative Impact</a></h6>

<div id="collapseGenQn" class="collapse ">
<div class="card-body">
	<div class="element-select"  ><label style="color:black;" class="title">Number of women employed under the action</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="gender.sdg5_gen_data1"  value=${existingSdgInput.gender.sdg5_gen_data1}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="gender.sdg5_gen_ds1"  class="form-control" value=${existingSdgInput.gender.sdg5_gen_ds1}>
                </div>
                </div>
    </div>
    </div>
    </div>
    <br>
	<div class="element-select"><label style="color:black;" class="title">Number of women trained under the action</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="gender.sdg5_gen_data2"  value=${existingSdgInput.gender.sdg5_gen_data2}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="gender.sdg5_gen_ds2"  class="form-control" value=${existingSdgInput.gender.sdg5_gen_ds2}>
                </div>
                </div>
    </div>
    </div>
    </div>
	<br>
	<div class="element-number"><label style="color:black;" class="title">Number of women selected for decision making position (e.g. senior managers, community leaders, etc.)</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="gender.sdg5_gen_data3"  value=${existingSdgInput.gender.sdg5_gen_data3}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="gender.sdg5_gen_ds3"  class="form-control" value=${existingSdgInput.gender.sdg5_gen_ds3}>
                </div>
                </div>
    </div>
    </div>
    </div>
    <br>
    <div class="element-number"><label style="color:black;" class="title">Number of women provided with access to modern technology and/or finance (e.g. microfinance, mobile phones etc.)</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="gender.sdg5_gen_data4"  value=${existingSdgInput.gender.sdg5_gen_data4}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="gender.sdg5_gen_ds4"  class="form-control" value=${existingSdgInput.gender.sdg5_gen_ds4}>
                </div>
                </div>
    </div>
    </div>
    </div>
    </div>
    </div></div></div></div></div>
    
    <div class="tab-pane fade" id="industry" role="tabpanel">
    <div class="card-group-control card-group-control-left">
    		<div class="card">
			<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Infrastructure, Innovation and Industry - Monitored Data</h6></div>
							
	<div class="card-body">
							
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseIndQl">Qualiitative Impact</a>
									</h6>
								
<div class="collapse" id="collapseIndQl">
	<div class="element-select" ><label style="color:black;" class="title">Does the action promote access to affordable, reliable and modern clean technology / services?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
            <select name="industry.sdg7_ind_q1Like" id="sdg7_ind_q1Like"data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Not Applicable">Not Applicable</option>
		<option value="Very Likely">Very Likely</option>
		<option value="Likely">Likely</option>
		<option value="Possible">Possible</option>
		<option value="Unlikely">Unlikely</option>
		<option value="Very unlikely">Very unlikely</option>
		</select>
		  </div>
        </div>
      </div>
                 
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
            <select name="industry.sdg7_ind_q1Impact" id="sdg7_ind_q1Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Major Impact">Major Impact</option>
		<option value="Moderate Impact">Moderate Impact</option>
		<option value="Minor Impact">Minor Impact</option>
		</select>
		  </div>
        </div>
       </div>
     </div>
     </div>
     <br>
     
    <div class="element-select" ><label style="color:black;" class="title">Does the action promote the growth of small and medium sized enterprises (SMEs) and provide them appropriate support (e.g.affordable loans)?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
            <select name="industry.sdg9_ind_q2Like" id="sdg9_ind_q2Like" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Not Applicable">Not Applicable</option>
		<option value="Very Likely">Very Likely</option>
		<option value="Likely">Likely</option>
		<option value="Possible">Possible</option>
		<option value="Unlikely">Unlikely</option>
		<option value="Very unlikely">Very unlikely</option></select>
		  </div>
        </div>
      </div>
                 
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
            <select name="industry.sdg9_ind_q2Impact" id="sdg9_ind_q2Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Major Impact">Major Impact</option>
		<option value="Moderate Impact">Moderate Impact</option>
		<option value="Minor Impact">Minor Impact</option></select>
		  </div>
        </div>
       </div>
     </div>
     </div>
<br>	
		
	 <div class="element-select" ><label style="color:black;" class="title">Does the action enable industries to pursue resource efficient business practice and greater adoption of clean technologies?</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
            <select name="industry.sdg9_ind_q3Like" id="sdg9_ind_q3Like" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Not Applicable">Not Applicable</option>
		<option value="Very Likely">Very Likely</option>
		<option value="Likely">Likely</option>
		<option value="Possible">Possible</option>
		<option value="Unlikely">Unlikely</option>
		<option value="Very unlikely">Very unlikely</option></select>
		  </div>
        </div>
      </div>
                 
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
           <select name="industry.sdg9_ind_q3Impact" id="sdg9_ind_q3Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Major Impact">Major Impact</option>
		<option value="Moderate Impact">Moderate Impact</option>
		<option value="Minor Impact">Minor Impact</option></select>
		  </div>
        </div>
       </div>
     </div>
     </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Does the action facilitate the development of sustainable and resilient infrastructure through enhanced financial, technological and technical support?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
           <select name="industry.sdg9_ind_q4Like" id="sdg9_ind_q4Like" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Not Applicable">Not Applicable</option>
		<option value="Very Likely">Very Likely</option>
		<option value="Likely">Likely</option>
		<option value="Possible">Possible</option>
		<option value="Unlikely">Unlikely</option>
		<option value="Very unlikely">Very unlikely</option></select>
		  </div>
        </div>
      </div>
                 
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
           <select name="industry.sdg9_ind_q4Impact" id="sdg9_ind_q4Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Major Impact">Major Impact</option>
		<option value="Moderate Impact">Moderate Impact</option>
		<option value="Minor Impact">Minor Impact</option></select>
		  </div>
        </div>
       </div>
     </div>
     </div>	
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Does the action promote a culture for innovation through enhanced scientific research and development and investments in new thinking, models and ways of doing business and value addition?</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
          <select name="industry.sdg9_ind_q5Like" id="sdg9_ind_q5Like" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Not Applicable">Not Applicable</option>
		<option value="Very Likely">Very Likely</option>
		<option value="Likely">Likely</option>
		<option value="Possible">Possible</option>
		<option value="Unlikely">Unlikely</option>
		<option value="Very unlikely">Very unlikely</option></select>
		  </div>
        </div>
      </div>
                 
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
          <select name="industry.sdg9_ind_q5Impact" id="sdg9_ind_q5Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Major Impact">Major Impact</option>
		<option value="Moderate Impact">Moderate Impact</option>
		<option value="Minor Impact">Minor Impact</option></select>
		  </div>
        </div>
       </div>
     </div>
     </div>		
	<br>
		
	<div class="element-select" ><label style="color:black;" class="title">Does the action promote the development, transfer, dissemination and diffusion of environmentally sound technologies?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
          <select name="industry.sdg17_ind_q6Like" id="sdg17_ind_q6Like" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Not Applicable">Not Applicable</option>
		<option value="Very Likely">Very Likely</option>
		<option value="Likely">Likely</option>
		<option value="Possible">Possible</option>
		<option value="Unlikely">Unlikely</option>
		<option value="Very unlikely">Very unlikely</option></select>
		  </div>
        </div>
      </div>
                 
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
          <select name="industry.sdg17_ind_q6Impact" id="sdg17_ind_q6Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Major Impact">Major Impact</option>
		<option value="Moderate Impact">Moderate Impact</option>
		<option value="Minor Impact">Minor Impact</option></select>
		  </div>
        </div>
       </div>
     </div>
     </div>		
	<br>
		
	<div class="element-select" ><label style="color:black;" class="title">Does the action promote effective and targeted capacity-building to support national plans for implementing the SDGs?</label><br>
	<div class="row">
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
          <select name="industry.sdg17_ind_q7Like" id="sdg17_ind_q7Like" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Not Applicable">Not Applicable</option>
		<option value="Very Likely">Very Likely</option>
		<option value="Likely">Likely</option>
		<option value="Possible">Possible</option>
		<option value="Unlikely">Unlikely</option>
		<option value="Very unlikely">Very unlikely</option></select>
		  </div>
        </div>
      </div>
                 
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
          <select name="industry.sdg17_ind_q7Impact" id="sdg17_ind_q7Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Major Impact">Major Impact</option>
		<option value="Moderate Impact">Moderate Impact</option>
		<option value="Minor Impact">Minor Impact</option></select>
		  </div>
        </div>
       </div>
     </div>
     </div>	
		<br>
	<div class="element-select" ><label style="color:black;" class="title">Does the action promote access to adequate, safe and affordable housing?</label><br>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
         <select name="industry.sdg11_ind_q8Like" id="sdg11_ind_q8Like" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Not Applicable">Not Applicable</option>
		<option value="Very Likely">Very Likely</option>
		<option value="Likely">Likely</option>
		<option value="Possible">Possible</option>
		<option value="Unlikely">Unlikely</option>
		<option value="Very unlikely">Very unlikely</option></select>
		  </div>
        </div>
      </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
          <select name="industry.sdg11_ind_q8Impact" id="sdg11_ind_q8Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		<option value="Major Impact">Major Impact</option>
		<option value="Moderate Impact">Moderate Impact</option>
		<option value="Minor Impact">Minor Impact</option></select>
		  </div>
        </div>
       </div>
     </div>
     </div>	
	</div>	
	
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseIndQn">Quantitative Impact</a></h6>

<div id="collapseIndQn" class="collapse">
<div class="card card-body">
	<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseIndQnSub">Industry and Innovation</a></h6>
	<div class="collapse" id="collapseIndQnSub">

<div class="element-select"><label style="color:black;" class="title">Investments in industrial activity under the action (large) (USD)</label><br>

<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
 <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data1" value=${existingSdgInput.industry.sdg9_ind_data1}>
</div>
</div>
</div>

<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input class="form-control" type="text" name="industry.sdg9_ind_ds1" value=${existingSdgInput.industry.sdg9_ind_ds1}>
</div>
</div>
</div>
</div>
</div>
<br>
    

<div class="element-select" ><label style="color:black;" class="title">Investments in industrial activity under the action (SME) (USD)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data2" value=${existingSdgInput.industry.sdg9_ind_data2}>
         </div>
      </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input class="form-control" type="text" name="industry.sdg9_ind_ds2" value=${existingSdgInput.industry.sdg9_ind_ds2}>
</div>
</div>
</div>
</div>
<br>
	

	<div class="element-select" ><label style="color:black;" class="title">Investments in micro and one - person enterprises (USD)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
 <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data3" value=${existingSdgInput.industry.sdg9_ind_data3}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input class="form-control" type="text" name="industry.sdg9_ind_ds3" value=${existingSdgInput.industry.sdg9_ind_ds3}>
</div>
</div>
</div>
</div>
</div>
<br>

	<div class="element-select" ><label style="color:black;" class="title">Investments in research and development (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data4" value=${existingSdgInput.industry.sdg9_ind_data4}>
         </div>
      </div>
    </div>
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds4" value=${existingSdgInput.industry.sdg9_ind_ds4}>
        </div>
        </div>
    </div>
    </div>
    </div>
    <br>
	
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in intellectual property rights (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data5" value=${existingSdgInput.industry.sdg9_ind_data5}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds5" value=${existingSdgInput.industry.sdg9_ind_ds5}>
        </div>
        </div>
    </div>
    </div>
    </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in pilot research projects (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data6" value=${existingSdgInput.industry.sdg9_ind_data6}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds6" value=${existingSdgInput.industry.sdg9_ind_ds6}>
        </div>
        </div>
    </div>
    </div>
    </div>
	</div>
	</div>
	
	<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseTranQn">Transport</a></h6>
	<div class="collapse" id="collapseTranQn">
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in transport sector - Road (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data7" value=${existingSdgInput.industry.sdg9_ind_data7}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds7" value=${existingSdgInput.industry.sdg9_ind_ds7}>
        </div>
        </div>
    </div>
    </div>
    </div>
    <br>
		
	<div class="element-select" ><label style="color:black;" class="title">Investments in transport sector - Rail (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data8" value=${existingSdgInput.industry.sdg9_ind_data8}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds8" value=${existingSdgInput.industry.sdg9_ind_ds8}>
        </div>
        </div>
    </div>
    </div>
    </div>
    <br>	
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in transport sector - Sea and waterways (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data9" value=${existingSdgInput.industry.sdg9_ind_data9}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds9" value=${existingSdgInput.industry.sdg9_ind_ds9}>
        </div>
        </div>
    </div>
    </div>
    </div>	
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in transport sector - Air (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data10" value=${existingSdgInput.industry.sdg9_ind_data10}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds10" value=${existingSdgInput.industry.sdg9_ind_ds10}>
        </div>
        </div>
    </div>
    </div>
    </div>
    </div>
    
	<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseWasteQn">Waste</a></h6>
	<div class="collapse" id="collapseWasteQn">
	<div class="element-select" ><label style="color:black;" class="title">Investments in waste water systems (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data11" value=${existingSdgInput.industry.sdg6_ind_data11}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds11" value=${existingSdgInput.industry.sdg6_ind_ds11}>
        </div>
        </div>
    </div>
    </div>
    </div>	
    <br>
    
    
	<div class="element-select" ><label style="color:black;" class="title">Investments in solid waste management systems (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg12_ind_data12" value=${existingSdgInput.industry.sdg12_ind_data12}>
         </div>
      </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg12_ind_ds12" value=${existingSdgInput.industry.sdg12_ind_ds12}>
        </div>
        </div>
    </div>
    </div>
    </div>	
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in landfill sites and municipal waste (USD)</label><br>
	<div class="row">
	<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg12_ind_data13" value=${existingSdgInput.industry.sdg12_ind_data13}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg12_ind_ds13" value=${existingSdgInput.industry.sdg12_ind_ds13}>
        </div>
        </div>
    </div>
    </div>
    </div>	
    <br>
	
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in industrial waste management systems (USD)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg12_ind_data14" value=${existingSdgInput.industry.sdg12_ind_data14}>
         </div>
      </div>
    </div>
        <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg12_ind_ds14" value=${existingSdgInput.industry.sdg12_ind_ds14}>
        </div>
        </div>
    </div>
    </div>
    </div>
    </div>	
	

	<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseDisQn">Disaster Management and Resilient Infrastructure</a></h6>
	<div class="collapse" id="collapseDisQn">
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in climate and disaster risk management (e.g.sea walls) (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg13_ind_data15" value=${existingSdgInput.industry.sdg13_ind_data15}>
         </div>
      </div>
    </div>
            <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg13_ind_ds15" value=${existingSdgInput.industry.sdg13_ind_ds15}>
        </div>
        </div>
    </div>
    </div>
    </div>	
    <br>
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in public climate risk reduction infrastructure (e.g.stormwater protection) (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg13_ind_data16" value=${existingSdgInput.industry.sdg13_ind_data16}>
         </div>
      </div>
    </div>
             <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg13_ind_ds16" value=${existingSdgInput.industry.sdg13_ind_ds16}>
        </div>
        </div>
    </div>
    </div>
    </div>	
<br>    
    
	<div class="element-select" ><label style="color:black;" class="title">Investments in emergency services (e.g.flooding) (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg13_ind_data17" value=${existingSdgInput.industry.sdg13_ind_data17}>
         </div>
      </div>
    </div>
                 <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg13_ind_ds17" value=${existingSdgInput.industry.sdg13_ind_ds17}>
        </div>
        </div>
    </div>
    </div>
    </div>
    </div>	
    
	<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseWaterQn">Water and Sanitation</a></h6>
	<div class="collapse" id="collapseWaterQn">
		
	<div class="element-select" ><label style="color:black;" class="title">Investments in water treatment/purification facilities (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
 <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data18" value=${existingSdgInput.industry.sdg6_ind_data18}>
         </div>
      </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds18" value=${existingSdgInput.industry.sdg6_ind_ds18}>
        </div>
        </div>
    </div>
    </div>
    </div>	
<br>	
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in irrigation systems (USD)</label><br>
		<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data19" value=${existingSdgInput.industry.sdg6_ind_data19}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds19" value=${existingSdgInput.industry.sdg6_ind_ds19}>
        </div>
        </div>
    </div>
    </div>
    </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Investments in water supply systems (e.g.borewells, pipelines) (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data20" value=${existingSdgInput.industry.sdg6_ind_data20}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds20" value=${existingSdgInput.industry.sdg6_ind_ds20}>
        </div>
        </div>
    </div>
    </div>
    </div>
    <br>
    
	<div class="element-select" ><label style="color:black;" class="title">Investments in toilets (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data21" value=${existingSdgInput.industry.sdg6_ind_data21}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds21" value=${existingSdgInput.industry.sdg6_ind_ds21}>
        </div>
        </div>
    </div>
    </div>
    </div>
	</div>
	
	<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseCleanQn">Clean Energy</a></h6>
	<div class="collapse" id="collapseCleanQn">
		
	<div class="element-select" ><label style="color:black;" class="title">New capacity added - renewable energy (MW)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data22" value=${existingSdgInput.industry.sdg7_ind_data22}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds22" value=${existingSdgInput.industry.sdg7_ind_ds22}>
        </div>
        </div>
    </div>
    </div>
    </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">New investments - power generation (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data23" value=${existingSdgInput.industry.sdg7_ind_data23}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds23" value=${existingSdgInput.industry.sdg7_ind_ds23}>
        </div>
        </div>
    </div>
    </div>
    </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">New investments - transmission and distribution (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data24" value=${existingSdgInput.industry.sdg7_ind_data24}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds24" value=${existingSdgInput.industry.sdg7_ind_ds24}>
        </div>
        </div>
    </div>
    </div>
    </div>
    <br>
	
	
	<div class="element-select" ><label style="color:black;" class="title">Renewable as % of total capacity</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data25" value=${existingSdgInput.industry.sdg7_ind_data25}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds25" value=${existingSdgInput.industry.sdg7_ind_ds25}>
        </div>
        </div>
    </div>
    </div>
    </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Reduction in fossil fuel imports (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data26" value=${existingSdgInput.industry.sdg7_ind_data26}>
         </div>
      </div>
    </div>
       <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds26" value=${existingSdgInput.industry.sdg7_ind_ds26}>
        </div>
        </div>
    </div>
    </div>
    </div>
    </div>
    
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseDistQn">Distributed Energy</a></h6>
	<div class="collapse" id="collapseDistQn">
	
	<div class="element-select" ><label style="color:black;" class="title">Additional households with access to clean energy</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data27" value=${existingSdgInput.industry.sdg7_ind_data27}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds27" value=${existingSdgInput.industry.sdg7_ind_ds27}>
        </div>
        </div>
    </div>
    </div>
    </div>
    <br>
    
	<div class="element-select" ><label style="color:black;" class="title">Additional metered connections</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data28" value=${existingSdgInput.industry.sdg7_ind_data28}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds28" value=${existingSdgInput.industry.sdg7_ind_ds28}>
        </div>
        </div>
    </div>
    </div>
    </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Additional villages with access to grid</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data29" value=${existingSdgInput.industry.sdg7_ind_data29}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds29" value=${existingSdgInput.industry.sdg7_ind_ds29}>
        </div>
        </div>
    </div>
    </div>
    </div>
    </div>
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseHouseQn">Housing</a></h6>
	<div class="collapse" id="collapseHouseQn">
		
	<div class="element-select" ><label style="color:black;" class="title">Additional units of housing (high, medium, low - income)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data30" value=${existingSdgInput.industry.sdg11_ind_data30}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds30" value=${existingSdgInput.industry.sdg11_ind_ds30}>
        </div>
        </div>
    </div>
    </div>
    </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Investment in housing (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data31" value=${existingSdgInput.industry.sdg11_ind_data31}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds31" value=${existingSdgInput.industry.sdg11_ind_ds31}>
        </div>
        </div>
    </div>
    </div>
    </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Slum rehabilitation (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data32" value=${existingSdgInput.industry.sdg11_ind_data32}>
         </div>
      </div>
    </div>
        <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds32" value=${existingSdgInput.industry.sdg11_ind_ds32}>
        </div>
        </div>
    </div>
    </div>
    </div>
	<br>
	
	<div class="element-select" ><label style="color:black;" class="title">Investment in Slum Rehabilitation (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data33" value=${existingSdgInput.industry.sdg11_ind_data33}>
         </div>
      </div>
    </div>
        <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds33" value=${existingSdgInput.industry.sdg11_ind_ds33}>
        </div>
        </div>
    </div>
    </div>
    </div>
    <br>
	
	<div class="element-select" ><label style="color:black;" class="title">Investment in green/resources - efficient buildings (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data34" value=${existingSdgInput.industry.sdg11_ind_data34}>
         </div>
      </div>
    </div>
         <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds34" value=${existingSdgInput.industry.sdg11_ind_ds34}>
        </div>
        </div>
    </div>
    </div>
    </div>
    
    </div>
    </div>
    </div></div></div></div></div>
    
    <div class="tab-pane fade" id="environment" role="tabpanel">
   <div class="card-group-control card-group-control-left">
									<div class="card">
			<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Environment</h6></div>
							
	<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEnvQl">Qualiitative Impact</a>
									</h6>
								
<div class="collapse" id="collapseEnvQl">
<div class="element-select"><label style="color:black;" class="title">Does the action lead to reduction in air pollution beyond greenhouse gas emission reduction?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="enviornment.sdg3_env_q1Likelihood" id="sdg3_env_q1Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div></div></div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="enviornment.sdg3_env_q1Impact" id="sdg3_env_q1Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Does the action lead to reduction in water pollution (including reduction in marine pollution in seas and oceans)?</label><br>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="enviornment.sdg14_env_q2Likelihood" id="sdg14_env_q2Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                 <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="enviornment.sdg14_env_q2Impact" id="sdg14_env_q2Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Does the action lead to reduction in negative impacts on biodiversity and ecosystems (including forests, soil erosion, and other living creatures)?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="enviornment.sdg15_env_q3Likelihood" id="sdg15_env_q3Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="enviornment.sdg15_env_q3Impact" id="sdg15_env_q3Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>

	<div class="element-select"><label style="color:black;" class="title">Does the action promote environmentally sound management of waste as per international best practices that reducing impacts on air, water and land?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="enviornment.sdg12_env_q4Likelihood" id="sdg12_env_q4Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="enviornment.sdg12_env_q4Impact" id="sdg12_env_q4Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Is the action part of a long term framework programme / policy (international, national, sectoral etc.) to promote sustainable consumption / production?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="enviornment.sdg12_env_q5Likelihood" id="sdg12_env_q5Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">

                 <select name="enviornment.sdg12_env_q5Impact" id="sdg12_env_q5Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div>
     
		<br>
	<div class="element-select"><label style="color:black;" class="title">Does the action substantially reduce waste generation through prevention, reduction, recycling, reuse - ideally in the industrial and economic context (e.g.circular economy)?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="enviornment.sdg9_env_q6Likelihood" id="sdg9_env_q6Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">

                 <select name="enviornment.sdg9_env_q6Impact" id="sdg9_env_q6Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div>
	<br>
	<div class="element-select"><label style="color:black;" class="title">Does the action promote a culture for innovation through enhanced scientific research and development and investments in new thinking, models and ways of doing business and value addition?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="enviornment.sdg9_env_q7Likelihood" id="sdg9_env_q7Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="enviornment.sdg9_env_q7Impact" id="sdg9_env_q7Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div>
     </div>
     
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEnvQn">Quantitative Impact</a></h6>

<div id="collapseEnvQn" class="collapse ">
	<div class="card-body">
  <h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseAirQn">Impact on Air</a></h6>
	<div class="collapse" id="collapseAirQn">
  		
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in SOx (kg per annum)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg3_env_data1"  value=${existingSdgInput.enviornment.sdg3_env_data1}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds1"  class="form-control"  value=${existingSdgInput.enviornment.sdg3_env_ds1}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in NOx (kg per annum)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg3_env_data2"  value=${existingSdgInput.enviornment.sdg3_env_data2}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds2"  class="form-control"  value=${existingSdgInput.enviornment.sdg3_env_ds2}>
                </div>
                </div>
    </div>
    </div>
    </div>
    <br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in Suspended Particular Matter (SPM)(kg per annum)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg3_env_data3"  value=${existingSdgInput.enviornment.sdg3_env_data3}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds3"  class="form-control"  value=${existingSdgInput.enviornment.sdg3_env_ds3}>
                </div>
                </div>
    </div>
    </div>
    </div>
    <br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in Volatile Organic Compound (VOC)(kg per annum)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg3_env_data4"  value=${existingSdgInput.enviornment.sdg3_env_data4}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds4"  class="form-control"  value=${existingSdgInput.enviornment.sdg3_env_ds4}>
                </div>
                </div>
    </div>
    </div>
    </div>
    <br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in Particulate Matter (PM)(kg per annum)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name=enviornment.sdg3_env_data5  value=${existingSdgInput.enviornment.sdg3_env_data5}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds5" class="form-control" value=${existingSdgInput.enviornment.sdg3_env_ds5}>
                </div>
                </div>
    </div>
    </div>
    </div>
	</div>
	<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseSeaQn">Impact on Water and Seas/ Oceans</a></h6>
	<div class="collapse" id="collapseSeaQn">
    
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in chemical oxygen demand (COD) (kg per annum)</span></label>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="enviornment.sdg6_env_data6"  value=${existingSdgInput.enviornment.sdg6_env_data6}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input name="enviornment.sdg6_env_ds6"  class="form-control"  value=${existingSdgInput.enviornment.sdg6_env_ds6}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
		
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in biochemical oxygen demand (BOD) (kg per annum)</span></label>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg6_env_data7"  value=${existingSdgInput.enviornment.sdg6_env_data7}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg6_env_ds7"  class="form-control"  value=${existingSdgInput.enviornment.sdg6_env_ds7}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in bacteria and coliforms</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg6_env_data8"  value=${existingSdgInput.enviornment.sdg6_env_data8}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg6_env_ds8"  class="form-control"  value=${existingSdgInput.enviornment.sdg6_env_ds8}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in marine pollution</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg14_env_data9"  value=${existingSdgInput.enviornment.sdg14_env_data9}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg14_env_ds9"  class="form-control"  value=${existingSdgInput.enviornment.sdg14_env_ds9}>
                </div>
                </div>
    </div>
    </div>
    </div><br>

	<div class="element-select"><label style="color:black;" class="title"><span>Reduction in sea/ocean acidification</span></label>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg14_env_data10"  value=${existingSdgInput.enviornment.sdg14_env_data10}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg14_env_ds10"  class="form-control"  value=${existingSdgInput.enviornment.sdg14_env_ds10}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
    
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in sustainable fishing</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg14_env_data11"  value=${existingSdgInput.enviornment.sdg14_env_data11}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg14_env_ds11"  class="form-control"  value=${existingSdgInput.enviornment.sdg14_env_ds11}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in coastal/marine area under conservation</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg14_env_data12"  value=${existingSdgInput.enviornment.sdg14_env_data12}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg14_env_ds12"  class="form-control"  value=${existingSdgInput.enviornment.sdg14_env_ds12}>
                </div>
                </div>
    </div>
    </div>
    </div></div>
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseLandQn">Impact on Land</a></h6>
	<div class="collapse" id="collapseLandQn">
	<div class="element-select"><label style="color:black;" class="title"><span >Avoided deforestation (Ha)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data13"  value=${existingSdgInput.enviornment.sdg15_env_data13}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds13"  class="form-control"  value=${existingSdgInput.enviornment.sdg15_env_ds13}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Afforestation (new forest added) (Ha)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data14"  value=${existingSdgInput.enviornment.sdg15_env_data14}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds14"  class="form-control"  value=${existingSdgInput.enviornment.sdg15_env_ds14}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Avoided soil erosion (Ha)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data15"  value=${existingSdgInput.enviornment.sdg15_env_data15}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds15"  class="form-control"  value=${existingSdgInput.enviornment.sdg15_env_ds15}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Additionally protected endangered species</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data16"  value=${existingSdgInput.enviornment.sdg15_env_data16}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds16"  class="form-control"  value=${existingSdgInput.enviornment.sdg15_env_ds16}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Additionally protected reserves (Ha)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data17"  value=${existingSdgInput.enviornment.sdg15_env_data17}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds17"  class="form-control"  value=${existingSdgInput.enviornment.sdg15_env_ds17}>
                </div>
                </div>
    </div>
    </div>
    </div>
	</div>

<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseSustQn">Sustainable Consumption and Production</a></h6>
	<div class="collapse" id="collapseSustQn">
	
	<div class="element-select"><label style="color:black;" class="title"><span >Additional material recycled (tonnes)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg12_env_data18"  value=${existingSdgInput.enviornment.sdg12_env_data18}>
                </div>
                </div>
                
    </div>
       <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg12_env_ds18"  class="form-control"  value=${existingSdgInput.enviornment.sdg12_env_ds18}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Additional material composted (tonnes)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg12_env_data19"  value=${existingSdgInput.enviornment.sdg12_env_data19}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg12_env_ds19"  class="form-control"  value=${existingSdgInput.enviornment.sdg12_env_ds19}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Additional material directed from uncontrolled landfill/incineration to controlled landfill or incineratoin (tonnes)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg12_env_data20"  value=${existingSdgInput.enviornment.sdg12_env_data20}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg12_env_ds20"  class="form-control"  value=${existingSdgInput.enviornment.sdg12_env_ds20}>
                </div>
                </div>
    </div>
    </div>
    </div><br>

	
	<div class="element-select"><label style="color:black;" class="title"><span >Additional e - waste recycled/disposed of appropriately (tonnes)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg12_env_data21"  value=${existingSdgInput.enviornment.sdg12_env_data21}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg12_env_ds21"  class="form-control"  value=${existingSdgInput.enviornment.sdg12_env_ds21}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-select"><label style="color:black;" class="title"><span >Additional industrial waste water treated appropriately (m3)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg6_env_data22"  value=${existingSdgInput.enviornment.sdg6_env_data22}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg6_env_ds22"  class="form-control"  value=${existingSdgInput.enviornment.sdg6_env_ds22}>
                </div>
                </div>
    </div>
    </div>
    </div>
    </div></div></div></div></div></div></div>
    
                                    <div class="tab-pane fade" id="employment" role="tabpanel">
<div class="card-group-control card-group-control-left">
									<div class="card">
			<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Employment</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEmpQl">Qualiitative Impact</a>
									</h6>
							
<div class="collapse" id="collapseEmpQl">
<div class="element-select" style="color:black;">
<label style="color:black;" class="title">Does the action contribute to	creating new employment opportunities including for women, society?</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
<select name="sdg8_emp_q1Likelihood" id="employment.sdg8_emp_q1Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
													<option value="Not Applicable">Not Applicable</option>
													<option value="Very Likely">Very Likely</option>
													<option value="Likely">Likely</option>
													<option value="Possible">Possible</option>
													<option value="Unlikely">Unlikely</option>
													<option value="Very unlikely">Very unlikely</option>
												</select>
											</div>
										</div>
									</div>

									<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
												<select name="employment.sdg8_emp_q1Impact" id="sdg8_emp_q1Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
													<option value="Major Impact">Major Impact</option>
													<option value="Moderate Impact">Moderate Impact</option>
													<option value="Minor Impact">Minor Impact</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div><br>

<div class="element-select">
<label style="color:black;" class="title">Does the action promote economic growth in the community/country and/or in higher levels of economic productivity?</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
												<select name="employment.sdg8_emp_q2Likelihood" id="sdg8_emp_q2Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
													<option value="Not Applicable">Not Applicable</option>
													<option value="Very Likely">Very Likely</option>
													<option value="Likely">Likely</option>
													<option value="Possible">Possible</option>
													<option value="Unlikely">Unlikely</option>
													<option value="Very unlikely">Very unlikely</option>
												</select>
											</div>
										</div>
									</div><br>

<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
												<select name="employment.sdg8_emp_q2Impact" id="sdg8_emp_q2Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
													<option value="Major Impact">Major Impact</option>
													<option value="Moderate Impact">Moderate Impact</option>
													<option value="Minor Impact">Minor Impact</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div><br>
							<div class="element-select">
<label style="color:black;" class="title">Does the action promote innovation, entrepreneurship and growth of SMEs and micro enterprises?</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
												<select name="employment.sdg8_emp_q3Likelihood" id="sdg8_emp_q3Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
													<option value="Not Applicable">Not Applicable</option>
													<option value="Very Likely">Very Likely</option>
													<option value="Likely">Likely</option>
													<option value="Possible">Possible</option>
													<option value="Unlikely">Unlikely</option>
													<option value="Very unlikely">Very unlikely</option>
												</select>
											</div>
										</div>
									</div>

<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
												<select name="employment.sdg8_emp_q3Impact" id="sdg8_emp_q3Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
													<option value="Major Impact">Major Impact</option>
													<option value="Moderate Impact">Moderate Impact</option>
													<option value="Minor Impact">Minor Impact</option>
												</select>
											</div>
										</div>
									</div>
								</div>
							</div></div>
		
			
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEmpQn">Quantitative Impact</a></h6>

<div id="collapseEmpQn" class="collapse ">
	
<div class="element-number" style="color:black;">
<label style="color:black;" class="title">Number of new jobs created (total)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data1" value=${existingSdgInput.employment.sdg8_emp_data1}>
											</div>
										</div>
									</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds1" class="form-control" value=${existingSdgInput.employment.sdg8_emp_ds1}>
</div>
</div>
</div>
</div>
</div><br>

<div class="element-number">
<label style="color:black;" class="title">Number of new jobs created for people with disabilities</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data2" value=${existingSdgInput.employment.sdg8_emp_data2}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds2" class="form-control" value=${existingSdgInput.employment.sdg8_emp_ds2}>
</div>
</div>
</div>
</div>
</div><br>

<div class="element-number">
<label style="color:black;" class="title">Number of new jobs created for poor and vulnerable sections</label><br />
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data3" value=${existingSdgInput.employment.sdg8_emp_data3}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds3" class="form-control" value=${existingSdgInput.employment.sdg8_emp_ds3}>
</div>
</div>
</div>
</div>
</div><br>

<div class="element-number">
<label style="color:black;" class="title">Number of new jobs created with specialized skills (e.g. technical)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data4" value=${existingSdgInput.employment.sdg8_emp_data4}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds4" class="form-control" value=${existingSdgInput.employment.sdg8_emp_ds4}>
</div>
</div>
</div>
</div>
</div><br>

<div class="element-number">
<label style="color:black;" class="title">Number of new jobs created at senior positions (e.g. managers)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data5" value=${existingSdgInput.employment.sdg8_emp_data5}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds5" class="form-control" value=${existingSdgInput.employment.sdg8_emp_ds5}>
</div>
</div>
</div>
</div>
</div><br>

<div class="element-number">
<label style="color:black;" class="title">Migration avoided due to new jobs created (people)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data6" value=${existingSdgInput.employment.sdg8_emp_data6}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds6" class="form-control" value=${existingSdgInput.employment.sdg8_emp_ds6}>
</div>
</div>
									</div>
								</div>
							</div>

<div class="element-number">
<label style="color:black;" class="title">Employees with access to employment benefits (e.g. pension)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data7" value=${existingSdgInput.employment.sdg8_emp_data7}>
											</div>
										</div>

									</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds7" class="form-control" value=${existingSdgInput.employment.sdg8_emp_ds7}>
											</div>
										</div>
									</div>
								</div>
							</div><br>

<div class="element-number">
<label style="color:black;" class="title">Additional income generated in public sector employment (USD)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data8" value=${existingSdgInput.employment.sdg8_emp_data8}>
											</div>
										</div>
									</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds8" class="form-control" value=${existingSdgInput.employment.sdg8_emp_ds8}>
											</div>
										</div>
									</div>
								</div>
							</div><br>

<div class="element-number">
<label style="color:black;" class="title">Additional income generated in private sector employment (USD)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data9" value=${existingSdgInput.employment.sdg8_emp_data9}>
											</div>
										</div>

									</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds9" class="form-control" value=${existingSdgInput.employment.sdg8_emp_ds9}>
											</div>
										</div>
									</div></div></div>
								</div></div>
								</div></div></div>

	<div class="tab-pane fade" id="education" role="tabpanel">
	<div class="card-group-control card-group-control-left">
									<div class="card">
			<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Education and Learning</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEduQl">Qualiitative Impact</a>
									</h6>
								
<div class="collapse" id="collapseEduQl">
<div class="element-select"><label style="color:black;" class="title">Does the action promote access to pre - primary education (below 6 years) for girls and boys?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="education.sdg4_edu_q1Likelihood" id="sdg4_edu_q1Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="education.sdg4_edu_q1Impact" id="sdg4_edu_q1Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
	
	<div class="element-select"><label style="color:black;" class="title">Does the action promote access to primary and secondary education(7-18 years) for girls and boys?</label>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="education.sdg4_edu_q2Likelihood" id="sdg4_edu_q2Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                 <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="education.sdg4_edu_q2Impact" id="sdg4_edu_q2Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
     
	<div class="element-select"><label style="color:black;" class="title">Does the action promote opportunities for girls and boys to access quality technical, vocational and tertiary education including university?</label>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="education.sdg4_edu_q3Likelihood" id="sdg4_edu_q3Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
                 </div>
                 </div>
                 </div>
                 
               <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="education.sdg4_edu_q3Impact" id="sdg4_edu_q3Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
     
	<div class="element-select"><label style="color:black;" class="title">Does the action promote access to education for people with disabilities?</label>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="education.sdg4_edu_q4Likelihood" id="sdg4_edu_q4Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
                 </div>
                 </div>
                 </div>
                 
               <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="education.sdg4_edu_q4Impact" id="sdg4_edu_q4Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
	<div class="element-select"><label style="color:black;" class="title">Does the action promote access to education for people with vulnerable background including indigenious people and people with low income?</label>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="education.sdg4_edu_q5Likelihood" id="sdg4_edu_q5Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="education.sdg4_edu_q5Impact" id="sdg4_edu_q5Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Select">--Select--</option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div></div>
     </div>
     </div>
     	
     	
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEduQn">Quantitative Impact</a></h6>

<div id="collapseEduQn" class="collapse ">

	<div class="element-number"><label style="color:black;" class="title">Additional enrollment in primary education (7-12 years)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data1"   value=${existingSdgInput.education.sdg4_edu_data1}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">

                <input type="text" name="education.sdg4_edu_ds1"  class="form-control"  value=${existingSdgInput.education.sdg4_edu_ds1}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Additional enrollment in secondary education (13-18 years)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data2"  value=${existingSdgInput.education.sdg4_edu_data2}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="education.sdg4_edu_ds2"  class="form-control"  value=${existingSdgInput.education.sdg4_edu_ds2}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Additional enrollment in vocational, univsersity or tertiary institutions</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data3"  value=${existingSdgInput.education.sdg4_edu_data3}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="education.sdg4_edu_ds3"  class="form-control"  value=${existingSdgInput.education.sdg4_edu_ds3}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Additional number of teachers/trainers trained</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">

                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data4"  value=${existingSdgInput.education.sdg4_edu_data4}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">

                <input type="text" name="education.sdg4_edu_ds4"  class="form-control"  value=${existingSdgInput.education.sdg4_edu_ds4}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Additional scholarships provided (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data5"  value=${existingSdgInput.education.sdg4_edu_data5}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">

                <input type="text"  name="education.sdg4_edu_ds5"  class="form-control" value=${existingSdgInput.education.sdg4_edu_ds5}>
                </div>
                </div>
    </div>
    </div></div></div></div>
    </div></div></div>
    
<div class="tab-pane fade" id="food" role="tabpanel">
<div class="card-group-control card-group-control-left">
									<div class="card">
			<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Food Secutirty and Hunger</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseFoodQl">Qualiitative Impact</a>
									</h6>
							
<div class="collapse" id="collapseFoodQl">
		<div class="element-select"><label style="color:black;" class="title">Does the action contribute to ending levels of hunger and malnourishment in the community/country?</label><br>
     <div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">

                 <select name="food.sdg2_food_q1Likelihood" id="sdg2_food_q1Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="food.sdg2_food_q1Impact" id="sdg2_food_q1Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute to promoting equal rights and incomes among indigenous communities, poor farmers, pastoral communities and vulnerable members of the community/society?</label><br>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="food.sdg2_food_q2Likelihood" id="sdg2_food_q2Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="food.sdg2_food_q2Impact" id="sdg2_food_q2Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div></div>
     </div>
     </div>
     	
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseFoodQn">Quantitative Impact</a></h6>

<div id="collapseFoodQn" class="collapse ">
<div class="card-body">	
	<div class="element-number"><label style="color:black;" class="title">New land brought under the cultivation (Ha)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="food.sdg2_food_data1"  value=${existingSdgInput.food.sdg2_food_data1}>
                </div>
                </div>
    </div>

<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">

                <input type="text" name="food.sdg2_food_ds1"  class="form-control"  value=${existingSdgInput.food.sdg2_food_ds1}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Additional export of crops, animals etc. (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="food.sdg2_food_data2"  value=${existingSdgInput.food.sdg2_food_data2}>
                </div>
                </div>
          </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="food.sdg2_food_ds2"  class="form-control"  value=${existingSdgInput.food.sdg2_food_ds2}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Specific investment towards rural infrastructure (e.g.irrigation canals, water pumping, etc.) (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="food.sdg2_food_data3"  value=${existingSdgInput.food.sdg2_food_data3}>
                </div>
                </div>
                
    </div>
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="food.sdg2_food_ds3"  class="form-control"  value=${existingSdgInput.food.sdg2_food_ds3}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Specific investment towards research and development (e.g.agriculture productivity, gene banks, livestock, etc.) (USD)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="food.sdg2_food_data4"  value=${existingSdgInput.food.sdg2_food_data4}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="food.sdg2_food_ds4"  class="form-control"  value=${existingSdgInput.food.sdg2_food_ds4}>
                </div>
                </div>
    </div>
    </div>
	</div>
	</div></div></div></div></div></div>

<div class="tab-pane fade" id="water" role="tabpanel">
<div class="card-group-control card-group-control-left">
									<div class="card">
			<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Water and Sanitation</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseWsQl">Qualiitative Impact</a>
									</h6>
								
<div class="collapse" id="collapseWsQl">
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute towards access to safe and affordable drinking water?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="water.sdg6_wat_q1Likelihood" id="sdg6_wat_q1Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
              
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="water.sdg6_wat_q1Impact" id="sdg6_wat_q1Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute towards access to sanitation and hygiene including for women and girls?</label><br>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="water.sdg6_wat_q2Likelihood" id="sdg6_wat_q2Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                 <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="water.sdg6_wat_q2Impact" id="sdg6_wat_q2Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute towards increased water use efficiency and / or water management system?</label><br>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="water.sdg6_wat_q3Likelihood" id="sdg6_wat_q3Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
                <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="water.sdg6_wat_q3Impact" id="sdg6_wat_q3Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Does the action contribute towards waste and waste water management system including treatment, recycling, reuse etc.?</label><br>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="water.sdg6_wat_q4Likelihood" id="sdg6_wat_q4Likelihood" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
               <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="water.sdg6_wat_q4Impact" id="sdg6_wat_q4Impact" data-placeholder="--Select--" class="form-control select">
                 <option></option>
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div></div>
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseWsQn">Quantitative Impact</a></h6>

<div id="collapseWsQn" class="collapse ">
	<div class="card-body">
	<div class="element-number"><label style="color:black;" class="title">Additional number of water treatments facility level</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data1"  value=${existingSdgInput.water.sdg6_wat_data1}>
                </div>
                </div>
                </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds1"  class="form-control"  value=${existingSdgInput.water.sdg6_wat_ds1}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Additional number of water treatments / filtration - household level (e.g.Household water purification system)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data2"  value=${existingSdgInput.water.sdg6_wat_data2}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds2"  class="form-control"  value=${existingSdgInput.water.sdg6_wat_ds2}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Additional number of irrigation Systems (e.g.Solar powered irrigation pumps)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data3"  value=${existingSdgInput.water.sdg6_wat_data3}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds3"  class="form-control"  value=${existingSdgInput.water.sdg6_wat_ds3}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Additional number of direct water supply sources (e.g.Borewells)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data4"  value=${existingSdgInput.water.sdg6_wat_data4}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds4"  class="form-control"  value=${existingSdgInput.water.sdg6_wat_ds4}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Additional volume of safe water effectively treated / supplied</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data5"  value=${existingSdgInput.water.sdg6_wat_data5}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds5"  class="form-control"  value=${existingSdgInput.water.sdg6_wat_ds5}>
                </div>
                </div>
    </div>
    </div>
    </div>
    </div></div></div></div></div></div>
    
<div class="tab-pane fade" id="health" role="tabpanel">
<div class="card-group-control card-group-control-left">
									<div class="card">
			<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Infrastructure, Innovation and Industry - Monitored Data</h6></div>
							
	<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseHealthQl">Qualiitative Impact</a>
									</h6>
								
<div class="collapse" id="collapseHealthQl">
		<div class="element-select"><label style="color:black;" class="title">Does the action lead to lowering maternal deaths during childbirth?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q1Likelihood" id="sdg3_hlt_q1Likelihood" class="form-control selectpicker" title="--Select--">
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q1Impact" id="sdg3_hlt_q1Impact" class="form-control selectpicker" title="--Select--">
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Does the action lead to lowering child mortality (below 5 years)?</label><br>
	<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q2Likelihood" id="sdg3_hlt_q2Likelihood" class="form-control selectpicker" title="--Select--">
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
               <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q2Impact" id="sdg3_hlt_q2Impact" class="form-control selectpicker" title="--Select--">
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Does the action lead to reduced risk/impact of epidemics?</label><br>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q3Likelihood" id="sdg3_hlt_q3Likelihood" class="form-control selectpicker" title="--Select--">
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
               <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q3Impact" id="sdg3_hlt_q3Impact" class="form-control selectpicker" title="--Select--">
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Does the action lead to lowering of non - communicable diseases?</label><br>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q4Likelihood" id="sdg3_hlt_q4Likelihood" class="form-control selectpicker" title="--Select--">
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
               <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q4Impact" id="sdg3_hlt_q4Impact" class="form-control selectpicker" title="--Select--">
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div><br>
		
	<div class="element-select"><label style="color:black;" class="title">Does the action lead to lowering deaths from other (non - disease) related causes?</label><br>
<div class="row">
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Likelihood</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q5Likelihood" id="sdg3_hlt_q5Likelihood" class="form-control selectpicker" title="--Select--">
		         <option value="Not Applicable">Not Applicable</option>
		         <option value="Very Likely">Very Likely</option>
		         <option value="Likely">Likely</option>
		         <option value="Possible">Possible</option>
		         <option value="Unlikely">Unlikely</option>
		         <option value="Very unlikely">Very unlikely</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
                 
               <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Impact</label>
<div class="col-sm-6">
                 <select name="health.sdg3_hlt_q5Impact" id="sdg3_hlt_q5Impact" class="form-control selectpicker" title="--Select--">
		         <option value="Major Impact">Major Impact</option>
		         <option value="Moderate Impact">Moderate Impact</option>
		         <option value="Minor Impact">Minor Impact</option>
		         </select>
		        
                 </div>
                 </div>
                 </div>
     </div>
     </div></div>
<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseHealthQn">Quantitative Impact</a></h6>

<div id="collapseHealthQn" class="collapse ">
<div class="card-body">
	
	<div class="element-number"><label style="color:black;" class="title">Number of additional people provided with access to health services</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data1"  value=${existingSdgInput.health.sdg3_hlt_data1}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds1"  class="form-control"  value=${existingSdgInput.health.sdg3_hlt_ds1}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Number of additional children vaccinated</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data2"  value=${existingSdgInput.health.sdg3_hlt_data2}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds2"  class="form-control"  value=${existingSdgInput.health.sdg3_hlt_ds2}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	<div class="element-number"><label style="color:black;" class="title">Number of additional health workers directly employed</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data3"  value=${existingSdgInput.health.sdg3_hlt_data3}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds3"  class="form-control"  value=${existingSdgInput.health.sdg3_hlt_ds3}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Number of additional government health programmes organized</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data4"  value=${existingSdgInput.health.sdg3_hlt_data4}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds4"  class="form-control"  value=${existingSdgInput.health.sdg3_hlt_ds4}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Number of additional people covered by health insurance or public health system</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data5"  value=${existingSdgInput.health.sdg3_hlt_data5}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds5"  class="form-control"  value=${existingSdgInput.health.sdg3_hlt_ds5}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
	
	<div class="element-number"><label style="color:black;" class="title">Number of additional health related infrastructure set-up</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data6"  value=${existingSdgInput.health.sdg3_hlt_data6}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds6"  class="form-control"  value=${existingSdgInput.health.sdg3_hlt_ds6}>
                </div>
                </div>
    </div>
    </div></div></div></div></div></div></div></div></div></div></div>


<hr>
<div class="form-group">
<span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="sdgInput.sdgInfo.remarks">${existingSdgInput.getSdgInfo().getRemarks()}</textarea>
     </div>
</div>


<div id = "commentButton" style="display: none">
<div class="form-group">
<span class="col-sm-3 control-label" style="color:black;">Approver Comments</span>
<div class="col-sm-12">
<textarea class="form-control" id="approverRemarks" name="approverRemarks"> </textarea>
</div>
</div>
</div>


<div id = "submitButton" style="display: block" class="bg-default content-box text-center pad20A mrg25T" >
 <button class="btn bg-slate-700">Submit</button>
</div>	

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
<div id = "rejectionButton" style="display: none	">
<button id = "Rejected" onclick="setStatus(this.id);"  class="btn bg-slate-700">Reject</button>
</div> 
</div>
</div>
</div>
</div></form></div></div></div></div></div></body>



<c:forEach var="map" items="${existingSdgInput.sdgMap}" varStatus="loop">
	<script>
	document.getElementById('${map.key}').value = "${map.value}";
	</script>
</c:forEach>


<script>
if("<%=selectedProjectId%>"){
	document.getElementById('projectId').value = "<%=selectedProjectId%>";
		
	}
	function getData(val){
		var url = '/getSDGInput?project='+encodeURIComponent(val) + '&status=Any';
		window.location.href = url; 
	}	
	var fromApproval = "<%=fromApprovalDashboard%>";
	 var selectedProjectId = "<%=selectedProjectId%>";
	 handleButtons(fromApproval, selectedProjectId);
	
	function setStatus(id){
		document.getElementById('fourEyesStatus').value = id;
		
		<% if(existingSdgInput!=null && existingSdgInput.getPoverty()!=null) {
		
		%>	
		document.getElementById('dataId').value = "<%=existingSdgInput.getPoverty().getDataId()%>";
		<%
			}		
		%>
		
	}	
	
	<% if(existingSdgInput!=null ) {
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