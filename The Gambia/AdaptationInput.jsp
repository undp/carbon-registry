<%@page import="com.gambia.model.adaptation.*"%>
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
	<title>Adaptaion Action</title>
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
 
String selectedProjectId = (String)request.getAttribute("projectId");	
String fromApprovalDashboard = request.getParameter("fromApprovalDashboard");	


AdaptationInput existingAdaptationInput = null;
List<String> ndpCovList = null;

AdaptationInfo adaptationInfo = null;

if(request.getAttribute("existingAdaptationInput")!=null){
	existingAdaptationInput = (AdaptationInput)request.getAttribute("existingAdaptationInput");

	adaptationInfo = existingAdaptationInput.getAdaptationInfo();	
	
	if(adaptationInfo!=null){
		ndpCovList = Arrays.asList(adaptationInfo.getNdpCov().split("\\s*,\\s*"));	
	}
	
}
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
		<h5 class="card-title text-uppercase text-center">Adaptation Action - Project Information</h5>
	</div>
	
<form action = "saveAdaptationInput" class="form-horizontal bordered-row" method="post">
<div class="card-body font-size-lg">
<input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
<input type="hidden" name = "foodNutrition.dataId" id = "dataId">
<div class="form-group row">
<label class="col-lg-3 col-form-label text-right">Project Id</label>
<div class="col-lg-6">
<select name="foodNutrition.projectId" required id="projectId" data-placeholder="--Select--" onchange="getData(this.value);" class="form-control form-control-select2" data-focu>
<option></option>
<% if(fromApprovalDashboard==null) { %>                	
                            <c:forEach var="listValue" items="${projectsList}">
							<option value="${listValue}">${listValue}</option>
							</c:forEach>
				<% } %>
</select>
</div></div>
<hr>

<div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Adaptation Sector</label>
   <div class="col-lg-3">
   <input name="project.sector" readonly="readonly" id="sectorId" class="form-control" value="${existingAdaptationInput.project.sector}">
    </div>
   <label class="col-lg-2 col-form-label text-right">Adaptation Sub-Sector</label>
   <div class="col-lg-3">
   <input name="project.subSector" readonly="readonly" id="subSectorId" class="form-control" value="${existingAdaptationInput.project.subSector}">
   </div></div>
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Included in NDC</label>
   <div class="col-lg-3">
   <input name="project.ndc" readonly="readonly" id="ndc" class="form-control" value="${existingAdaptationInput.project.ndc}">
    </div>
   <label class="col-lg-2 col-form-label text-right">Included In NAPA</label>
   <div class="col-lg-3">
   <input name="project.location" readonly="readonly" id="location" class="form-control" value="${existingAdaptationInput.project.napa}">
   </div></div>
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Implementing Agency</label>
   <div class="col-lg-3">
   <input name="project.agency" readonly="readonly" id="agency" class="form-control" value="${existingAdaptationInput.project.agency}">
    </div>
    
   <label class="col-lg-2 col-form-label text-right">Other Party</label>
   <div class="col-lg-3">
   <input name="project.otherParty" readonly="readonly" id="otherParty" class="form-control" value="${existingAdaptationInput.project.otherParty}">
   </div>
   </div>
  
  <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Approval Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.approvalDate" id="id-date-picker-1" value = "${existingAdaptationInput.project.approvalDate}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Financial Closure Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.closureDate" id="id-date-picker-1" value = "${existingAdaptationInput.project.closureDate}">
   </div></div>
   <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Effectiveness Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.commDate" id="id-date-picker-1" value = "${existingAdaptationInput.project.commissioningDate}">
  </div>
  <label class="col-lg-2 col-form-label text-right">Lifetime (years)</label>
   <div class="col-lg-3">
   <input name="project.lifetime" readonly="readonly" id="lifetime" class="form-control" placeholder="" value = "${existingAdaptationInput.project.lifetime}">
   </div>
  </div>
  <br>
  <div class="form-group row">
    <label class="col-lg-3 col-form-label text-center">NDP Objective Coverage</label>
   <div class="col-lg-6">
  <select class="form-control select" data-placeholder="--Select--" name="adaptationInfo.ndpObjCov" id ="ndpObjCov" data-focu>
  <option></option>
     <option value="Enhance value addition in key growth opportunities">Enhance value addition in key growth opportunities</option>
	 <option value="Strengthen the private sector to create jobs">Strengthen the private sector to create jobs</option>
	 <option value="Consolidate and increase the stock and quality of productive infrastructure">Consolidate and increase the stock and quality of productive infrastructure</option>
	 <option value="Enhance the productivity and social wellbeing of the population">Enhance the productivity and social wellbeing of the population</option>
	 <option value="Strengthen the role of the state in guiding and facilitating development">Strengthen the role of the state in guiding and facilitating development</option>
	  </select>
  </div></div>
  <div class="form-group row">
  <label class="col-lg-3 col-form-label text-center">NDP Coverage</label>
   <div class="col-lg-6">
   <select class="form-control multiselect-select-all-filtering" multiple="multiple" name="adaptationInfo.ndpCov" id ="ndpCov" data-focu>
     <option value="Agro-Industrialization">Agro-Industrialization</option>
     <option value="Mineral-based Industrialization">Mineral-based Industrialization</option>
     <option value="Petroleum Development">Petroleum Development</option>
     <option value="Tourism Development">Tourism Development</option>
     <option value="Water, Climate Change and ENR Management">Water, Climate Change and ENR Management</option>
     <option value="Private Sector Development">Private Sector Development</option>
     <option value="Manufacturing">Manufacturing</option>
     <option value="Digital Transformation">Digital Transformation</option>
     <option value="Integrated Transport Infrastructure and Services">Integrated Transport Infrastructure and Services</option>
     <option value="Sustainable Energy Development">Sustainable Energy Development</option>
     <option value="Sustainable Urban and Housing Development">Sustainable Urban and Housing Development</option>
     <option value="Human Capital Development">Human Capital Development;</option>
     <option value="Community Mobilization and Mindset Change">Community Mobilization and Mindset Change</option>
     <option value="Innovation, Technology Development and Transfer">Innovation, Technology Development and Transfer</option>
     <option value="Regional Development">Regional Development</option>
     <option value="Governance and Security">Governance and Security</option>
     <option value="Public Sector Transformation">Public Sector Transformation</option>
     <option value="Development Plan Implementation">Development Plan Implementation</option>
      </select>
   </div>
  </div>
  <hr>
  
<div class="form-group">
<div class="tab-container">
                             <ul class="nav nav-tabs justify-content-center nav-fill" role="tablist">
                             <li class="nav-item">
								<a class="nav-link active" data-toggle="tab" href="#agriculture" role="tab" style="color:black;">Agriculture</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#forestry" role="tab" style="color:black;">Forestry</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#water" role="tab" style="color:black;">Water</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#energy" role="tab" style="color:black;">Energy</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#health" role="tab" style="color:black;">Health</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#risk" role="tab" style="color:black;">Risk Management</a>
                            </li>
                            </ul>
 <hr>
<div class="tab-content">
<div class="tab-pane active fade show" id="agriculture" role="tabpanel">
						<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Agriculture</h6></div>
							
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseAgrQl">Qualiitative Impact</a>
									</h6>
							
<div class="collapse" id="collapseAgrQl">
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action enhance crop productivity?</label><br>
               <div class="col-sm-3">
               <select name="foodNutrition.adp_FNS_q1Like" id="adp_FNS_q1Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         <option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>

<div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action enhance  productivity in the livestock sector?</label><br>
         <div class="col-sm-3">
         <select name="foodNutrition.adp_FNS_q2Like"  id="adp_FNS_q2Like" data-placeholder="--Select--" class="form-control select">
         <option></option>
   		<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
   </select></div></div>
        
<div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action enhance  productivity enhance productivity in the fisheries sector?</label><br>
         <div class="col-sm-3">
         <select name="foodNutrition.adp_FNS_q3Like" id="adp_FNS_q3Like" data-placeholder="--Select--" class="form-control select">
         <option></option>
   		<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
   </select></div></div>

<div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action diversify livelihoods to adjust to a changing climate?</label><br>
         <div class="col-sm-3">
         <select name="foodNutrition.adp_FNS_q4Like" id="adp_FNS_q4Like" data-placeholder="--Select--" class="form-control select">
         <option></option>
   			<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
   </select></div></div>
         
         </div>
			
								<h6 class="card-title">
									<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseAgrQn">Quantitative Impact</a>
								</h6>
							
							<div id="collapseAgrQn" class="collapse ">
								
<div><label style="color:black;" class="title">Number of farmers with crop insurance</label><br>
<div class="row">

   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data1" type="text" value=${existingAdaptationInput.foodNutrition.adp_FNS_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="foodNutrition.adp_FNS_ds1" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds1}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Number of farmers accessing agriculture input subsidies</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data2" value=${existingAdaptationInput.foodNutrition.adp_FNS_data2} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
   
               <input type="text" name="foodNutrition.adp_FNS_ds2"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds2}>
               </div>
               </div>
   </div>
   </div>
   </div>
<br>
<div><label style="color:black;" class="title">Number of institutions harvesting water</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data3"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="foodNutrition.adp_FNS_ds3" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds3}>
               </div>
               </div>
   </div>
   </div>
   </div>
<br>
<div><label style="color:black;" class="title">Percentage of pre- and post-harvest losses</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data4" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data4} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds4"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds4}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Acreage under irrigation</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data5" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data5} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds5"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds5}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Hectares of rangeland re-seeded</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data6" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data6} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds6"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds6}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Million cubic meters (MCM) of water storage in (Arid and Semi Arid Land) ASALs</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data7" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds7"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds7}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
     <div><label style="color:black;" class="title">Numbers of farmers accessing livestock insurance</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data8" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds8"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds8}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
     <div><label style="color:black;" class="title">Number of cages for fish farming</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data9" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data9} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds9"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds9}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of fish ponds</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data10" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds10"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds10}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of farmers using low-carbon recirculating aquaculture systems</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data11" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data11} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds11"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds11}>
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of households supported to diversify value chains</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data12" class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_data12}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds12"  class="form-control"  value=${existingAdaptationInput.foodNutrition.adp_FNS_ds12}>
                </div>
                </div>
    </div>
    </div>
    </div>
</div></div></div></div></div>
<div class="tab-pane" id="forestry" role="tabpanel">
					<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Forestry</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseForQl">Qualiitative Impact</a>
									</h6>
							
<div class="collapse" id="collapseForQl">
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action promote afforestation and reforestion of degraded land?</label><br>
               <div class="col-sm-3">
               <select name="forestry.adp_FWT_q1Like" id="adp_FWT_q1Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>

<div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action implement initiatives to reduce deforestation and forest degradation?</label><br>
         <div class="col-sm-3">
         <select name="forestry.adp_FWT_q2Like"  id="adp_FWT_q2Like" data-placeholder="--Select--" class="form-control select">
         <option></option>
<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
   </select></div></div>

<div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action restore degraded landscapes (ASALs and rangelands)?</label><br>
         <div class="col-sm-3">
         <select name="forestry.adp_FWT_q3Like" id="adp_FWT_q3Like" data-placeholder="--Select--" class="form-control select">
         <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
   </select></div></div>

<div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action promote sustainable timber production on privately-owned land?</label><br>
         <div class="col-sm-3">
         <select name="forestry.adp_FWT_q4Like" id="adp_FWT_q4Like" data-placeholder="--Select--" class="form-control select">
         <option></option>
  	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>

   </select></div></div>
	         
	         <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action conserve land area for wildlife?</label><br>
         <div class="col-sm-3">
         <select name="forestry.adp_FWT_q5Like" id="adp_FWT_q5Like" data-placeholder="--Select--" class="form-control select">
         <option></option>
   	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>

   </select></div></div></div>
								<h6 class="card-title">
									<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseForQn">Quantitative Impact</a>
								</h6>
							
							<div id="collapseForQn" class="collapse ">
								
<div><label style="color:black;" class="title">Hectares of land afforested or reforested</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data1" type="text" value=${existingAdaptationInput.forestry.adp_FWT_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds1" class="form-control"  value=${existingAdaptationInput.forestry.adp_FWT_ds1}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
     
     <div><label style="color:black;" class="title">Number of TIPs signed</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data2" type="text" value=${existingAdaptationInput.forestry.adp_FWT_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds2" class="form-control"  value=${existingAdaptationInput.forestry.adp_FWT_ds2}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
      <div><label style="color:black;" class="title">Number of hectares of forest land protected</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data3" type="text" value=${existingAdaptationInput.forestry.adp_FWT_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds3" class="form-control"  value=${existingAdaptationInput.forestry.adp_FWT_ds3}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Number of hectares of restored degraded landscapes</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data4" type="text" value=${existingAdaptationInput.forestry.adp_FWT_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds4" class="form-control"  value=${existingAdaptationInput.forestry.adp_FWT_ds4}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of hectares of private-sector based plantations</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data5" type="text" value=${existingAdaptationInput.forestry.adp_FWT_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds5" class="form-control"  value=${existingAdaptationInput.forestry.adp_FWT_ds5}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
  <div><label style="color:black;" class="title">Percentage of terrestrial and inland water areas conserved</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data6" type="text" value=${existingAdaptationInput.forestry.adp_FWT_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds6" class="form-control"  value=${existingAdaptationInput.forestry.adp_FWT_ds6}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
 <div><label style="color:black;" class="title">Number of hectares of wildlife conservation areas</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data7" type="text" value=${existingAdaptationInput.forestry.adp_FWT_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds7" class="form-control"  value=${existingAdaptationInput.forestry.adp_FWT_ds7}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of incidents of human-wildlife conflict</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data8" type="text" value=${existingAdaptationInput.forestry.adp_FWT_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds8" class="form-control"  value=${existingAdaptationInput.forestry.adp_FWT_ds8}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Percentage of dispersal areas and migratory pathways secured</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data9" type="text" value=${existingAdaptationInput.forestry.adp_FWT_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds9" class="form-control"  value=${existingAdaptationInput.forestry.adp_FWT_ds9}>
               </div>
               </div>
   			</div>
   </div>
   </div>
    
</div></div></div></div>
</div>

<div class="tab-pane fade" id="water" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Water</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseWaterQl">Qualiitative Impact</a>
									</h6>
								
							
<div class="collapse" id="collapseWaterQl">
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action lead to increased annual per capita water availability?</label><br>
               <div class="col-sm-3">
               <select name="waterBlue.adp_WBE_q1Like" id="adp_WBE_q1Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>

         </select></div></div>
<div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action promote water efficiency?</label><br>
               <div class="col-sm-3">
               <select name="waterBlue.adp_WBE_q2Like" id="adp_WBE_q2Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>

         </select></div></div>
         
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action improve access to good quality water?</label><br>
               <div class="col-sm-3">
               <select name="waterBlue.adp_WBE_q3Like" id="adp_WBE_q3Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>

         </select></div></div>
    
   <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action improve climate resilience of coastal communities?</label><br>
               <div class="col-sm-3">
               <select name="waterBlue.adp_WBE_q4Like" id="adp_WBE_q4Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>

         </select></div></div>
</div>
						<h6 class="card-title">
									<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseWaterQn">Quantitative Impact</a>
								</h6>
							
							<div id="collapseWaterQn" class="collapse ">
								
<div><label style="color:black;" class="title">Per capita water availability</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data1" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds1" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds1}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
     
<div><label style="color:black;" class="title">Number of dams</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data2" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds2" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds2}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Number of sub-catchment management plans</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data3" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds3" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds3}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Number of climate-proofed water harvesting, flood control and water storage infrastructure</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data4" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds4" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds4}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Number of farm ponds</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data5" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds5" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds5}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Number of hectares with access to water pans and ponds</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data6" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds6" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds6}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Percentage of people with access to good quality water</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data7" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds7" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds7}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Number of deep/offshore fishing vessels</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data8" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds8" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds8}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Hectares of mangroves restored/rehabilitated</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data9" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds9" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds9}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Percentage of coastal and marine areas conserved</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data10" type="text" value=${existingAdaptationInput.waterBlue.adp_WBE_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds10" class="form-control"  value=${existingAdaptationInput.waterBlue.adp_WBE_ds10}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
    
</div></div></div></div>
</div>
    
<div class="tab-pane fade" id="energy" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Energy</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEnergyQl">Qualiitative Impact</a>
									</h6>
								
							
<div class="collapse" id="collapseEnergyQl">
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action increase renewable energy for electricity generation?</label><br>
               <div class="col-sm-3">
               <select name="energyTransport.adp_ETP_q1Like" id="adp_ETP_q1Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>

         </select></div></div>
         
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action encourage low-carbon technologies in the aviation and maritime sectors?</label><br>
               <div class="col-sm-3">
               <select name="energyTransport.adp_ETP_q3Like" id="adp_ETP_q3Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
         
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action climate proof transport infrastructure?</label><br>
               <div class="col-sm-3">
               <select name="energyTransport.adp_ETP_q4Like" id="adp_ETP_q4Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
    
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action enhance energy efficiency?</label><br>
               <div class="col-sm-3">
               <select name="energyTransport.adp_ETP_q5Like" id="adp_ETP_q5Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
         
         <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action improve water use and resource efficiency?</label>
               <div class="col-sm-3">
               <select name="energyTransport.adp_ETP_q6Like" id="adp_ETP_q6Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
         
         <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action optimise manufacturing and production processes?</label>
               <div class="col-sm-3">
               <select name="energyTransport.adp_ETP_q7Like" id="adp_ETP_q7Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
         
         <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action promote industrial symbiosis in industrial zones?</label>
               <div class="col-sm-3">
               <select name="energyTransport.adp_ETP_q8Like" id="adp_ETP_q8Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
         
         <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action promote the transition to clean cooking with alternative clean fuels in urban areas; and clean biomass (charcoal and wood) cookstoves and alternatives in rural areas?</label><br>
               <div class="col-sm-3">
               <select name="energyTransport.adp_ETP_q2Like" id="adp_ETP_q2Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>

         </select></div></div>
</div>
								<h6 class="card-title">
									<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseEnergyQn">Quantitative Impact</a>
								</h6>
							
							<div id="collapseEnergyQn" class="collapse ">
								
<div><label style="color:black;" class="title">Additional generation capacity in MW of renewable electricity added to the grid</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data1" type="text" value=${existingAdaptationInput.energyTransport.adp_ETP_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds1" class="form-control"  value=${existingAdaptationInput.energyTransport.adp_ETP_ds1}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
  
  <div><label style="color:black;" class="title">Number of households using LPG</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data2" type="text" value=${existingAdaptationInput.energyTransport.adp_ETP_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds2" class="form-control"  value=${existingAdaptationInput.energyTransport.adp_ETP_ds2}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of households with improved biomass cookstoves</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data3" type="text" value=${existingAdaptationInput.energyTransport.adp_ETP_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds3" class="form-control"  value=${existingAdaptationInput.energyTransport.adp_ETP_ds3}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of berths with shore power</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data4" type="text" value=${existingAdaptationInput.energyTransport.adp_ETP_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds4" class="form-control"  value=${existingAdaptationInput.energyTransport.adp_ETP_ds4}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of fuel efficient aircraft purchased</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data5" type="text" value=${existingAdaptationInput.energyTransport.adp_ETP_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds5" class="form-control"  value=${existingAdaptationInput.energyTransport.adp_ETP_ds5}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of kilometres of roads that are climate proofed</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data6" type="text" value=${existingAdaptationInput.energyTransport.adp_ETP_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds6" class="form-control"  value=${existingAdaptationInput.energyTransport.adp_ETP_ds6}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <div><label style="color:black;" class="title">Number of companies participating in water efficiency initiatives</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data7" type="text" value=${existingAdaptationInput.energyTransport.adp_ETP_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds7" class="form-control"  value=${existingAdaptationInput.energyTransport.adp_ETP_ds7}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <div><label style="color:black;" class="title">Number of industrial parks adopting industrial symbiosis practices</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data8" type="text" value=${existingAdaptationInput.energyTransport.adp_ETP_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds8" class="form-control"  value=${existingAdaptationInput.energyTransport.adp_ETP_ds8}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   
</div></div></div></div></div>

    
<div class="tab-pane fade" id="health" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Health</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseHealthQl">Qualiitative Impact</a>
									</h6>
								
							
<div class="collapse" id="collapseHealthQl">
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action reduce Incidence of malaria and other vector-borne disease?</label><br>
               <div class="col-sm-3">
               <select name="healthSettlement.adp_HSS_q1Like" id="adp_HSS_q1Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
    
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action promote recycling to divert collected waste away from disposal sites?</label><br>
               <div class="col-sm-3">
               <select name="healthSettlement.adp_HSS_q2Like" id="adp_HSS_q2Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
         
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action control flooding in human settlement?</label><br>
               <div class="col-sm-3">
               <select name="healthSettlement.adp_HSS_q3Like" id="adp_HSS_q3Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
         
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action promote green buildings?</label><br>
               <div class="col-sm-3">
               <select name="healthSettlement.adp_HSS_q4Like" id="adp_HSS_q4Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
    </div>
	         
			
								<h6 class="card-title">
									<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseHealthQn">Quantitative Impact</a>
								</h6>
			
							<div id="collapseHealthQn" class="collapse ">
								
<div><label style="color:black;" class="title">Malaria incidence per 1,000 population</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data1" type="text" value=${existingAdaptationInput.healthSettlement.adp_HSS_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds1" class="form-control"  value=${existingAdaptationInput.healthSettlement.adp_HSS_ds1}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
  
  <div><label style="color:black;" class="title">Percentage of waste diverted from disposal sites towards recycling practices</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data2" type="text" value=${existingAdaptationInput.healthSettlement.adp_HSS_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds2" class="form-control"  value=${existingAdaptationInput.healthSettlement.adp_HSS_ds2}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of flood ways constructed in urban centres</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data3" type="text" value=${existingAdaptationInput.healthSettlement.adp_HSS_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds3" class="form-control"  value=${existingAdaptationInput.healthSettlement.adp_HSS_ds3}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of green building codes developed and approved</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data4" type="text" value=${existingAdaptationInput.healthSettlement.adp_HSS_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds4" class="form-control"  value=${existingAdaptationInput.healthSettlement.adp_HSS_ds4}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   </div></div></div></div></div>
    
<div class="tab-pane fade" id="risk" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-slate-700 ">
							<h6 class="card-title text-uppercase text-left">Risk Management</h6></div>
							<div class="card-body">
									<h6 class="card-title">
										<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseRiskQl">Qualiitative Impact</a>
									</h6>
								
<div class="collapse" id="collapseRiskQl">
         
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action improve ability of people to cope with drought?</label><br>
               <div class="col-sm-3">
               <select name="disaster.adp_DRM_q2Like" id="adp_DRM_q2Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
         
    <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action improve ability of people to cope with floods?</label><br>
               <div class="col-sm-3">
               <select name="disaster.adp_DRM_q3Like" id="adp_DRM_q3Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
         <div class="form-group row">
    <label class="col-lg-8 col-form-label text-left" style="color:black;">Does the action increase number of households and entities benefiting from devolved adaptive services, including National Safety Net Programme and County Climate Change Funds (CCCFs)?</label><br>
               <div class="col-sm-3">
               <select name="disaster.adp_DRM_q1Like" id="adp_DRM_q1Like" data-placeholder="--Select--" class="form-control select">
               <option></option>
         	<option value="Yes">Yes</option>
         <option value="No">No</option>
         <option value="Not Applicable">Not Applicable</option>
         </select></div></div>
    </div>
	       
								<h6 class="card-title">
									<a data-toggle="collapse" class="collapsed text-default font-weight-bold" href="#collapseRiskQn">Quantitative Impact</a>
								</h6>
							
							<div id="collapseRiskQn" class="collapse ">
								
<div><label style="color:black;" class="title">Number of beneficiaries of social protection mechanisms (food and cash transfers)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data1" type="text" value=${existingAdaptationInput.disaster.adp_DRM_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds1" class="form-control"  value=${existingAdaptationInput.disaster.adp_DRM_ds1}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
  <div><label style="color:black;" class="title">Number of households benefitting from Hunger Net Safety Programme </label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data2" type="text" value=${existingAdaptationInput.disaster.adp_DRM_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds2" class="form-control"  value=${existingAdaptationInput.disaster.adp_DRM_ds2}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Amount of funding allocated to climate change actions through CCCFs in Counties with climate fund regulations (USD)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data3" type="text" value=${existingAdaptationInput.disaster.adp_DRM_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds3" class="form-control"  value=${existingAdaptationInput.disaster.adp_DRM_ds3}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of recipients of Climate Information Services</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data4" type="text" value=${existingAdaptationInput.disaster.adp_DRM_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds4" class="form-control"  value=${existingAdaptationInput.disaster.adp_DRM_ds4}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of early warning systems for droughts</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Baseline Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data5" type="text" value=${existingAdaptationInput.disaster.adp_DRM_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds5" class="form-control"  value=${existingAdaptationInput.disaster.adp_DRM_ds5}>
               </div>
               </div>
   			</div>
   </div>
   </div>
   </div></div></div></div>
</div>
    
</div>   
</div></div>
<hr>
	     <div class="form-group">
         <span class="col-sm-3 control-label">Remarks</span>
		<div class="col-sm-12">
		<textarea class="form-control" id="remarks" name="foodNutrition.remarks" placeholder="${existingAdaptationInput.getFoodNutrition().getRemarks()}"></textarea>
		     </div>
			</div>


<div id = "commentButton" style="display: none">
<div class="form-group">
<span class="col-sm-3 control-label">Approver Comments</span>
<div class="col-sm-12">
<textarea class="form-control" id="approverRemarks" name="approverRemarks"></textarea>
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
</div></div></form></div></div></div></body>

<c:forEach var="map" items="${existingAdaptationInput.adaptationMap}" varStatus="loop">
<script>
	document.getElementById('${map.key}').value = "${map.value}";
</script>
</c:forEach>


<% if (adaptationInfo!=null) { %>

<script>
var selectedNdpCov = document.getElementById('ndpCov');
var ndpCov = [""];
</script>
<% if(ndpCovList !=null) {
	for(String str : ndpCovList){
	
%>
<script>
ndpCov.push("<%=str%>");

</script>
<%
	}
}
%>
<script>
for(var i=0; i < selectedNdpCov.length; i++){
	if(ndpCov.includes(selectedNdpCov.options[i].value)) {
		selectedNdpCov.options[i].selected = true;
	}
}

document.getElementById('ndpObjCov').value = "<%=adaptationInfo.getNdpObjCov()%>";

</script>
<% } %>

<script>
if("<%=selectedProjectId%>"){
	document.getElementById('projectId').value = "<%=selectedProjectId%>";
		
	}
	function getData(val){
		var url = '/getAdaptationInput?project='+encodeURIComponent(val) + '&status=Any';
		window.location.href = url; 
	}	
	var fromApproval = "<%=fromApprovalDashboard%>";
	 var selectedProjectId = "<%=selectedProjectId%>";
	 handleButtons(fromApproval, selectedProjectId);
	
	function setStatus(id){
		document.getElementById('fourEyesStatus').value = id;
		
		<% if(existingAdaptationInput!=null && existingAdaptationInput.getFoodNutrition()!=null) {
		
		%>	
		document.getElementById('dataId').value = "<%=existingAdaptationInput.getFoodNutrition().getDataId()%>";
		<%
			}		
		%>
		
	}	
	
	<% if(existingAdaptationInput!=null && existingAdaptationInput.getFoodNutrition()!=null) {
		
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