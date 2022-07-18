<%@page import="com.sudan.model.adaptation.AdaptationMonitoring"%>
<%@page import="com.sudan.model.common.Project"%>
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
	<title>Adaptation Action</title>
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
<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />
<%

String selectedYear = (String)request.getAttribute("selectedYear");

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

if(request.getAttribute("projectsList")!=null){
	session.setAttribute("projectsList",request.getAttribute("projectsList"));
}

AdaptationMonitoring existingAdaptationMonitoring = null;

if(request.getAttribute("existingAdaptationMonitoring")!=null){
	existingAdaptationMonitoring = (AdaptationMonitoring)request.getAttribute("existingAdaptationMonitoring");
}

String selectedProjectId = (String)request.getAttribute("projectId");	
String fromApprovalDashboard = request.getParameter("fromApprovalDashboard");	

%>
 <script>

</script>
 
<body>
<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
<div class="card border-pink">
	<div class="card-header bg-pink-600 ">
		<h5 class="card-title text-uppercase text-center">Adaptation Action - Monitoring Information</h5>
	</div>
	
<form action = "saveAdaptationMonitoring" class="form-horizontal bordered-row" method="post">
<div class="card-body font-size-lg">
<input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
<input type="hidden" name = "agriculture.dataId" id = "dataId">
<div class="form-group row">
<label class="col-lg-3 col-form-label text-right">Project Id<span class="text-danger">*</span></label>
<div class="col-lg-6">
<select name="projectId" id="projectId" required data-placeholder="--Select--"  onchange="getData(this.value);" class="form-control form-control-select2" data-focu>
<option></option>
<% if(fromApprovalDashboard==null) { %>                	
                            <c:forEach var="listValue" items="${projectsList}">
							<option value="${listValue}">${listValue}</option>
							</c:forEach>
				<% } %>
</select>
</div></div>
<div class="form-group row">
   <label class="col-lg-3 col-form-label text-right">Monitoring Year<span class="text-danger">*</span></label>
    <div class="col-lg-3">
  	<select name="year" required data-placeholder="--Select--" onchange="getData(this.value);" class="form-control select" id="yearId"  data-fouc>
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
    </div></div>
    <span class="text-danger">* Mandatory Field</span>
    <hr>

<div class="form-group">
<div class="tab-container">
                             <ul class="nav nav-tabs justify-content-center nav-fill" role="tablist">
                             <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#agriculture" role="tab" style="color:black;">Agriculture, Livestock, and Fisheries</a>
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
                            
                            <li class="nav-item dropdown">
									<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Other Adaptation Impacts</a>
									<div class="dropdown-menu">
                            
                                <a class="nav-link" data-toggle="tab" href="#human" role="tab" style="color:black;">Human Settlements</a>
                                <a class="nav-link" data-toggle="tab" href="#disaster" role="tab" style="color:black;">Disaster Risk Reduction</a>
                                <a class="nav-link" data-toggle="tab" href="#tourism" role="tab" style="color:black;">Tourism and Recreation</a>
                                <a class="nav-link" data-toggle="tab" href="#industry" role="tab" style="color:black;">Industry and Infrastructure</a>
                                <a class="nav-link" data-toggle="tab" href="#ecosystem" role="tab" style="color:black;">Ecosystems, Environment and Biodiversity Conservation</a>
                                <!-- <a class="nav-link" data-toggle="tab" href="#other" role="tab" style="color:black;">Others</a> -->
                            </div>
                            </li>
                            
                            </ul>
 <hr>
<div class="tab-content">
<div class="tab-pane active fade show" id="agriculture" role="tabpanel">
						<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-pink-600 ">
							<h6 class="card-title text-uppercase text-left">Agriculture, Livestock, and Fisheries</h6></div>
							
							<div class="card-body">
							
		<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseAgrQnSub">Agriculture</a></h6>
	<div class="collapse" id="collapseAgrQnSub">						
<div><label style="color:black;" class="title">Number of farmers with crop insurance</label><br>
<div class="row">

   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data1" type="text" value=${existingAdaptationMonitoring.agriculture.adp_FNS_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="agriculture.adp_FNS_ds1" class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds1}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data2" value=${existingAdaptationMonitoring.agriculture.adp_FNS_data2} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
   
               <input type="text" name="agriculture.adp_FNS_ds2"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds2}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data3"  class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="agriculture.adp_FNS_ds3" class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds3}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data4" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data4} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds4"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds4}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Acreage under irrigation</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data5" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data5} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds5"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds5}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of households supported to diversify value chains</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data6" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data6} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds6"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds6}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of households using LPG</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data7" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds7"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds7}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
     <div><label style="color:black;" class="title">Number of households with improved biomass cookstoves</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data8" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds8"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds8}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
     <div><label style="color:black;" class="title">Number of E-commerce market places</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data9" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data9} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds9"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds9}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of farmer management solutions</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data10" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds10"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds10}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of digital communication tools adopted</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data11" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data11} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds11"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds11}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of digital financial services adopted</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data12" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data12}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds12"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds12}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Hectares of agricultural land agroforested</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data13" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data13}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds13"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds13}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of farmers practicing agroforestry</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data14" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data14}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds14"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds14}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Production in Kgs per hectare achieved</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data15" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data15}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds15"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds15}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Reduced number of malnourished children</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data16" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data16}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds16"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds16}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Hectares restored</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data17" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data17}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds17"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds17}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of community stakeholders trained on reforestation practices and conservation systems</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data18" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data18}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds18"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds18}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of watershed committees established for sustainable management of catchment areas</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data19" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data19}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds19"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds19}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of farmers receiving climate information</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data20" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data20}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds20"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds20}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of early warning systems for droughts Strengthened/Established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data21" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data21}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds21"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds21}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
     <br>
    <div><label style="color:black;" class="title">Hectares of land afforested using multi-use forest species</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data22" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data22}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds22"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds22}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Hectares of degraded landscapes restored</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data23" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data23}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds23"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds23}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of Community stakeholders trained</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data24" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data24}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds24"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds24}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of water points established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data25" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data25}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds25"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds25}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Percentage of protected areas with water points</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data26" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data26}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds26"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds26}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of forest reserves mapped</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data27" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data27}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds27"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds27}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of Community based forest management (CBFM) or participatory management established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data28" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data28}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds28"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds28}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of Forest policies and measures developed and institutional arrangements established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data29" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data29}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds29"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds29}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of public awareness campaigns on climate change</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data30" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data30}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds30"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds30}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of communication tools that incorporate climate change adaptation</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data31" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data31}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds31"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds31}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of urban adaptation best practices disseminated</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data32" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data32}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds32"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds32}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of firebreaks constructed</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data33" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data33}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds33"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds33}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Proportion of forest managers taking action on adaptation</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data34" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data34}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds34"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds34}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <hr></div>
    <h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseLivQnSub">Livestock</a></h6>
	<div class="collapse" id="collapseLivQnSub">
    <div><label style="color:black;" class="title">Hectares of rangeland re-seeded</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data35" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data35}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds35"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds35}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Million cubic meters (MCM) of water storage</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data36" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data36}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds36"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds36}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Numbers of farmers accessing livestock insurance</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data37" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data37}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds37"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds37}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of rangelands mapped</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data38" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data38}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds38"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds38}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Hectares of rangeland mapped</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data39" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data39}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds39"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds39}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <hr></div>
    <h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseFishQnSub"></a>Fisheries</h6>
	<div class="collapse" id="collapseFishQnSub">
    
    <div><label style="color:black;" class="title">Number of supply chain for fisheries industry enhanced</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data40" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data40}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds40"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds40}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Percentage of famers and fisherfolk with access to financial services</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data41" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data41}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds41"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds41}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of cages for fish farming</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data42" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data42}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds42"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds42}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of fish ponds</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data43" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data43}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds43"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds43}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
    <br>
    <div><label style="color:black;" class="title">Number of farmers using low-carbon recirculating aquaculture systems</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="agriculture.adp_FNS_data44" class="form-control"  value=${existingAdaptationMonitoring.agriculture.adp_FNS_data44}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="agriculture.adp_FNS_ds44"  class="form-control"  value="${existingAdaptationInput.agriculture.adp_FNS_ds44}">
                </div>
                </div>
    </div>
    </div>
    </div>
    
</div></div></div></div></div>

<div class="tab-pane fade" id="water" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-pink-600 ">
							<h6 class="card-title text-uppercase text-left">Water</h6></div>
							<div class="card-body">
									
													
<div><label style="color:black;" class="title">Per capita water availability</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data1" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds1" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds1}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data2" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds2" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds2}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data3" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds3" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds3}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data4" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds4" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds4}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data5" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds5" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds5}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data6" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds6" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds6}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data7" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds7" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds7}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Number of companies participating in water efficiency initiatives</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data8" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds8" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds8}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Number of wetland conserved</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data9" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds9" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds9}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
<div><label style="color:black;" class="title">Changes in local water balance (inflow/outflow)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data10" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds10" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds10}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
    <div><label style="color:black;" class="title">Percentage of treated wastewater</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="waterBlue.adp_WBE_data11" type="text" value=${existingAdaptationMonitoring.waterBlue.adp_WBE_data11}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="waterBlue.adp_WBE_ds11" class="form-control"  value="${existingAdaptationInput.waterBlue.adp_WBE_ds11}">
               </div>
               </div>
   			</div>
   </div>
   </div>
</div></div></div>
</div>

<div class="tab-pane fade" id="energy" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-pink-600 ">
							<h6 class="card-title text-uppercase text-left">Energy</h6></div>
							<div class="card-body">
								
<div><label style="color:black;" class="title">Number of energy units (kWh) saved</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data1" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds1" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds1}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
  
  <div><label style="color:black;" class="title">Energy efficiency addressed in climate change policy (Numbers)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data2" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds2" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds2}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of companies participating in energy efficiency initiatives</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data3" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds3" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds3}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of energy investments enhanced to adopt diversified energy technologies</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data4" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds4" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds4}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of  people whose livelihoods are supported through the energy investments</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data5" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds5" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds5}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of new technologies adopted to enhance energy investments</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data6" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds6" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds6}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Percentage of new hydroelectric projects that consider future climate risks</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data7" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds7" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds7}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of Water efficiency measures used in energy generation/extraction</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data8" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds8" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds8}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Energy storage capacity</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data9" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds9" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds9}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Additional generation capacity in MW of renewable electricity added to the grid</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data10" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds10" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds10}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Additional household/people have access to modern energy</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data11" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data11}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds11" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds11}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Per capita electricity consumption (kWh/Person)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data12" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data12}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds12" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds12}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of youth and women engaged in the production of non-forest biomass fuel  briquettes</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data13" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data13}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds13" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds13}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Percentage/number of people producing alternative non forest biomass fuel</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data14" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data14}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds14" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds14}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of companies engaged in the production of non-forest biomass fuel briquettes</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data15" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data15}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds15" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds15}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of policies and frameworks that promote clean energy solutions</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data16" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data16}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds16" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds16}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Clean energy solutions adopted</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="energyTransport.adp_ETP_data17" type="text" value=${existingAdaptationMonitoring.energyTransport.adp_ETP_data17}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="energyTransport.adp_ETP_ds17" class="form-control"  value="${existingAdaptationInput.energyTransport.adp_ETP_ds17}">
               </div>
               </div>
   			</div>
   </div>
   
</div></div></div></div></div>
<div class="tab-pane" id="ecosystem" role="tabpanel">
					<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-pink-600 ">
							<h6 class="card-title text-uppercase text-left">Ecosystems, Environment and Biodiversity Conservation</h6></div>
							<div class="card-body">
																
<div><label style="color:black;" class="title">Hectares of land afforested or reforested</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data1" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds1" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds1}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data2" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds2" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds2}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data3" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds3" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds3}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data4" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds4" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds4}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data5" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds5" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds5}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data6" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds6" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds6}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
 <div><label style="color:black;" class="title">Hectares of wildlife conservation areas/number of wildlife reserves established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data7" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds7" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds7}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data8" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds8" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds8}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data9" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds9" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds9}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of forest monitoring towers established in forested areas</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data10" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds10" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds10}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of early warning systems for forest fires established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data11" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data11}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds11" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds11}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of policies  and frameworks in environment and biodiversity that address climate change</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data12" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data12}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds12" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds12}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Percentage of climate resilient trees</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data13" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data13}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds13" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds13}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of inventories of climate change impacts on biodiversity</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="forestry.adp_FWT_data14" type="text" value=${existingAdaptationMonitoring.forestry.adp_FWT_data14}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="forestry.adp_FWT_ds14" class="form-control"  value="${existingAdaptationInput.forestry.adp_FWT_ds14}">
               </div>
               </div>
   			</div>
   </div>
   </div>
    
</div></div></div>
</div>
    
<div class="tab-pane fade" id="health" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-pink-600 ">
							<h6 class="card-title text-uppercase text-left">Health</h6></div>
							<div class="card-body">
									
							
			
<div><label style="color:black;" class="title">Malaria incidence per 1,000 population</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data1" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds1" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds1}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
  
  <div><label style="color:black;" class="title">Number of policies, plans or programmes introduced or adjusted that mainstream climate risks</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data2" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds2" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds2}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of people supported to cope with the effects of climate change through the availability of a service or facility</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data3" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds3" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds3}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of health facilities with climate proof infrastructure</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data4" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds4" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds4}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of researches conducted on climate change and health</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data5" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds5" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds5}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of early warning systems for Health Hazards Strengthened/Established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data6" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds6" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds6}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of public health officials trained on climate change adaptation</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data7" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds7" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds7}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Monitoring and surveillance enhanced</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data8" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds8" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds8}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Percentage of climate resilient health infrastructure in the country</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data9" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds9" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds9}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Degree of integration of climate change into development planning</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data10" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds10" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds10}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number government staff that have received training on adaptation</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="healthSettlement.adp_HSS_data11" type="text" value=${existingAdaptationMonitoring.healthSettlement.adp_HSS_data11}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="healthSettlement.adp_HSS_ds11" class="form-control"  value="${existingAdaptationInput.healthSettlement.adp_HSS_ds11}">
               </div>
               </div>
   			</div>
   </div>
   </div></div></div></div></div>
    
<div class="tab-pane fade" id="disaster" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-pink-600 ">
							<h6 class="card-title text-uppercase text-left">Disaster Risk Reduction</h6></div>
							<div class="card-body">
									
<div><label style="color:black;" class="title">Number of beneficiaries of social protection mechanisms (food and cash transfers)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data1" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds1" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds1}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data2" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds2" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds2}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Amount of funding allocated to climate change actions (USD)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data3" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds3" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds3}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data4" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds4" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds4}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of early warning systems for droughts Strengthened/Established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data5" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds5" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds5}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of early warning systems for floods Strengthened/Established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data6" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds6" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds6}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of Community DRM Committees established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data7" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds7" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds7}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of Community DRM Strategies and plans developed</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data8" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds8" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds8}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of Community based EW and DRR set for flood and drought</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data9" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds9" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds9}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of Community EW & DRR Trainings conducted</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data10" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds10" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds10}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of households benefitted</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="disaster.adp_DRM_data11" type="text" value=${existingAdaptationMonitoring.disaster.adp_DRM_data11}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="disaster.adp_DRM_ds11" class="form-control"  value="${existingAdaptationInput.disaster.adp_DRM_ds11}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   </div></div></div>
</div>

<div class="tab-pane fade" id="human" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-pink-600 ">
							<h6 class="card-title text-uppercase text-left">Human Settlements</h6></div>
							<div class="card-body">
									
<div><label style="color:black;" class="title">Number of frameworks for climate change adaptation integrated into WASH investments</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="humanSettlement.adp_HMS_data1" type="text" value=${existingAdaptationMonitoring.humanSettlement.adp_HMS_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="humanSettlement.adp_HMS_ds1" class="form-control"  value="${existingAdaptationInput.humanSettlement.adp_HMS_ds1}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
  <div><label style="color:black;" class="title">Percentage of urban households with access to piped water</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="humanSettlement.adp_HMS_data2" type="text" value=${existingAdaptationMonitoring.humanSettlement.adp_HMS_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="humanSettlement.adp_HMS_ds2" class="form-control"  value="${existingAdaptationInput.humanSettlement.adp_HMS_ds2}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of people in drought-prone areas with access to safe and reliable water</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="humanSettlement.adp_HMS_data3" type="text" value=${existingAdaptationMonitoring.humanSettlement.adp_HMS_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="humanSettlement.adp_HMS_ds3" class="form-control"  value="${existingAdaptationInput.humanSettlement.adp_HMS_ds3}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Percentage of municipalities with local regulations considering adaptation and vulnerability assessment results</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="humanSettlement.adp_HMS_data4" type="text" value=${existingAdaptationMonitoring.humanSettlement.adp_HMS_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="humanSettlement.adp_HMS_ds4" class="form-control"  value="${existingAdaptationInput.humanSettlement.adp_HMS_ds4}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of urban stakeholders capacitated</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="humanSettlement.adp_HMS_data5" type="text" value=${existingAdaptationMonitoring.humanSettlement.adp_HMS_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="humanSettlement.adp_HMS_ds5" class="form-control"  value="${existingAdaptationInput.humanSettlement.adp_HMS_ds5}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title"> Hectares of urban ecosystems managed sustainably</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="humanSettlement.adp_HMS_data6" type="text" value=${existingAdaptationMonitoring.humanSettlement.adp_HMS_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="humanSettlement.adp_HMS_ds6" class="form-control"  value="${existingAdaptationInput.humanSettlement.adp_HMS_ds6}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Percentage of poor people in drought prone areas with access to safe and reliable water</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="humanSettlement.adp_HMS_data7" type="text" value=${existingAdaptationMonitoring.humanSettlement.adp_HMS_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="humanSettlement.adp_HMS_ds7" class="form-control"  value="${existingAdaptationInput.humanSettlement.adp_HMS_ds7}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of local government staff sensitized about climate change issues</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="humanSettlement.adp_HMS_data8" type="text" value=${existingAdaptationMonitoring.humanSettlement.adp_HMS_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="humanSettlement.adp_HMS_ds8" class="form-control"  value="${existingAdaptationInput.humanSettlement.adp_HMS_ds8}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Percentage of active climate change adaptation committee members at the local government level</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="humanSettlement.adp_HMS_data9" type="text" value=${existingAdaptationMonitoring.humanSettlement.adp_HMS_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="humanSettlement.adp_HMS_ds9" class="form-control"  value="${existingAdaptationInput.humanSettlement.adp_HMS_ds9}">
               </div>
               </div>
   			</div>
   </div>
  </div></div></div></div>
</div>

<div class="tab-pane fade" id="industry" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-pink-600 ">
							<h6 class="card-title text-uppercase text-left">Industry and Infrastructure</h6></div>
							<div class="card-body">
									
<div><label style="color:black;" class="title">Number of green building codes developed and approved</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data1" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds1" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds1}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
  <div><label style="color:black;" class="title">Number of companies participating in process optimization initiatives</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data2" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds2" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds2}">
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
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data3" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds3" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds3}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of industrial parks adopting industrial symbiosis practices</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data4" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds4" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds4}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of ESIA reports on large infrastructural projects recorded</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data5" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds5" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds5}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of ESIA conducted</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data6" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds6" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds6}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Kilometres of roads that are climate proofed</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data7" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds7" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds7}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Percentage of transport infrastructure standards revised</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data8" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds8" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds8}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Increase in agricultural productivity through irrigation of harvested land</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data9" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds9" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds9}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Increase in the percentage of climate resilient crops being used</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data12" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data12}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds12" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds12}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of new major infrastructure projects located in areas at risk</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data10" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds10" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds10}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Percentage of agricultural land with improved irrigation</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="infrastructure.adp_IND_data11" type="text" value=${existingAdaptationMonitoring.infrastructure.adp_IND_data11}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="infrastructure.adp_IND_ds11" class="form-control"  value="${existingAdaptationInput.infrastructure.adp_IND_ds11}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   </div></div></div>
</div>

<div class="tab-pane fade" id="tourism" role="tabpanel">
<div class="card-group-control card-group-control-left">
							<div class="card">
						<div class="card-header bg-pink-600 ">
							<h6 class="card-title text-uppercase text-left">Tourism and Recreation</h6></div>
							<div class="card-body">
									

								
<div><label style="color:black;" class="title">Number of policies and frameworks that integrate climate smart tourism</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data1" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds1" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds1}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
  <div><label style="color:black;" class="title">Existence of environmental review procedure for site development</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data2" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data2}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds2" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds2}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Percentage of new tourism developments that are screened</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data3" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds3" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds3}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Percentage of area subject to development control</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data4" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data4}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds4" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds4}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   <br>
   <div><label style="color:black;" class="title">Number of eco-tourism centres established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data5" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data5}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds5" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds5}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Percentage of local people with improved well-being</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data6" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data6}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds6" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds6}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of local residents employed as tour guides out of all tour guides</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data7" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds7" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds7}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of villages within designated tourism development zones that have received some awareness information about tourism development</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data8" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds8" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds8}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Community benefits from tourism</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data9" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data9}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds9" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds9}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Local community involvement in conservation projects in area</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data12" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data12}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds12" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds12}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title">Number of recreational sites established</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data10" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds10" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds10}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   <br>
   <div><label style="color:black;" class="title"> Percentage of recreational sites resilient to climate change</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Monitored Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="tourism.adp_TOR_data11" type="text" value=${existingAdaptationMonitoring.tourism.adp_TOR_data11}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="tourism.adp_TOR_ds11" class="form-control"  value="${existingAdaptationInput.tourism.adp_TOR_ds11}">
               </div>
               </div>
   			</div>
   </div>
   </div>
   
   </div></div></div></div>
</div>

</div></div>

<hr>
	     <div class="form-group">
                <span class="col-sm-3 control-label" style="color:black;">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="agriculture.remarks" >${existingAdaptationMonitoring.getAgriculture().getRemarks()}</textarea>
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
 <button class="btn bg-pink-600">Submit</button>
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
<div id = "rejectionButton" style="display: none	">
<button id = "Rejected" onclick="setStatus(this.id);"  class="btn bg-pink-600">Reject</button>
</div> 
</div>
</div>
</div>
</div></div></form></div></div></div></div></body>

<script>
function getData(){
	var projectId = document.getElementById("projectId").value;
	var year = document.getElementById("yearId").value;
	window.location.href = '/getAdaptationMonitoring?project='+encodeURIComponent(projectId) + '&year='+year + '&status=Any';	
}
if("<%=selectedProjectId%>"){
	document.getElementById('projectId').value = "<%=selectedProjectId%>";
	document.getElementById('yearId').value = "<%=selectedYear%>";
	
}
var fromApproval = "<%=fromApprovalDashboard%>";
var selectedProjectId = "<%=selectedProjectId%>";
handleButtons(fromApproval, selectedProjectId);

function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	
	<% if(existingAdaptationMonitoring!=null && existingAdaptationMonitoring.getAgriculture()!=null) {
	
	%>	
	document.getElementById('dataId').value = "<%=existingAdaptationMonitoring.getAgriculture().getDataId()%>";
	<%
		}		
	%>
	
}	

<% if(existingAdaptationMonitoring!=null) {
	
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