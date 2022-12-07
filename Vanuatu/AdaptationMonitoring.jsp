<%@page import="com.vanuatu.model.adaptation.AdaptationMonitoring"%>
<%@page import="com.vanuatu.model.common.Project"%>
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
<div class="card border-teal">
	<div class="card-header bg-info-700 ">
		<h5 class="card-title text-uppercase text-center">Adaptation Action - Monitoring Information</h5>
	</div>
	
<form action = "saveAdaptationMonitoring" class="form-horizontal bordered-row" method="post">
<div class="card-body font-size-lg">
<input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
<input type="hidden" name = "foodNutrition.dataId" id = "dataId">
<div class="form-group row">
<label class="col-lg-3 col-form-label text-right">Project&nbsp<span class="text-danger">*</span></label>
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
   <label class="col-lg-3 col-form-label text-right">Monitoring Year&nbsp<span class="text-danger">*</span></label>
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
								<a class="nav-link active" data-toggle="tab" href="#agriculture" role="tab" >Agriculture</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#forestry" role="tab" >Forestry</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#water" role="tab" >Water</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#energy" role="tab" >Energy</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#health" role="tab" >Health</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#risk" role="tab">Risk Management</a>
                            </li>
                            </ul>
 <hr>
<div class="tab-content">
<div class="tab-pane active fade show" id="agriculture" role="tabpanel">
							<div class="card">
						<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Agriculture - Monitored Data</h6></div>
							
							<div class="card-body">
<div><label style="color:black;" class="title">Number of farmers with crop insurance</label><br>
<div class="row">

   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data1" type="text" value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="foodNutrition.adp_FNS_ds1" class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds1}">
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data2" value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data2} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
   
               <input type="text"    name="foodNutrition.adp_FNS_ds2"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds2}">
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data3"  class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"    name="foodNutrition.adp_FNS_ds3" class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds3}">
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data4" class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data4} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds4"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds4}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Acreage under irrigation</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data5" class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data5} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds5"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds5}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Hectares of rangeland re-seeded</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data6" class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data6} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds6"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds6}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Million cubic meters (MCM) of water storage in (Arid and Semi Arid Land) ASALs</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data7" class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data7}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds7"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds7}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
     <div><label style="color:black;" class="title">Numbers of farmers accessing livestock insurance</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data8" class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data8}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds8"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds8}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
     <div><label style="color:black;" class="title">Number of cages for fish farming</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data9" class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data9} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds9"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds9}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of fish ponds</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data10" class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data10}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds10"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds10}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of farmers using low-carbon recirculating aquaculture systems</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data11" class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data11} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds11"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds11}">
                </div>
                </div>
    </div>
    </div>
    </div><br>
    <div><label style="color:black;" class="title">Number of households supported to diversify value chains</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
             <div class="col-sm-6">
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="foodNutrition.adp_FNS_data12" class="form-control"  value=${existingAdaptationMonitoring.foodNutrition.adp_FNS_data12}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="foodNutrition.adp_FNS_ds12"  class="form-control"  value="${existingAdaptationInput.foodNutrition.adp_FNS_ds12}">
                </div>
                </div>
    </div>
    </div>
    </div>
</div></div></div>
<div class="tab-pane" id="forestry" role="tabpanel">
							<div class="card">
						<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Forestry - Monitored Data</h6></div>
							
							<div class="card-body">
<div><label style="color:black;" class="title">Hectares of land afforested or reforested</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
 <div><label style="color:black;" class="title">Number of hectares of wildlife conservation areas</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
    
</div></div></div>

<div class="tab-pane fade" id="water" role="tabpanel">
			<div class="card">
						<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Water - Monitored Data</h6></div>
							
							<div class="card-body">
<div><label style="color:black;" class="title">Per capita water availability</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
<div><label style="color:black;" class="title">Number of deep/offshore fishing vessels</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
<div><label style="color:black;" class="title">Hectares of mangroves restored/rehabilitated</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
<div><label style="color:black;" class="title">Percentage of coastal and marine areas conserved</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
    
</div></div></div>
    
<div class="tab-pane fade" id="energy" role="tabpanel">
			<div class="card">
						<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Energy - Monitored Data</h6></div>
							
							<div class="card-body">
<div><label style="color:black;" class="title">Additional generation capacity in MW of renewable electricity added to the grid</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
  
  <div><label style="color:black;" class="title">Number of households using LPG</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   <div><label style="color:black;" class="title">Number of households with improved biomass cookstoves</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   <div><label style="color:black;" class="title">Number of berths with shore power</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   <div><label style="color:black;" class="title">Number of fuel efficient aircraft purchased</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   <div><label style="color:black;" class="title">Number of kilometres of roads that are climate proofed</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
</div></div></div>
    
<div class="tab-pane fade" id="health" role="tabpanel">
			<div class="card">
						<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Health - Monitored Data</h6></div>
							
							<div class="card-body">
<div><label style="color:black;" class="title">Malaria incidence per 1,000 population</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
  
  <div><label style="color:black;" class="title">Percentage of waste diverted from disposal sites towards recycling practices</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   <div><label style="color:black;" class="title">Number of flood ways constructed in urban centres</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   <div><label style="color:black;" class="title">Number of green building codes developed and approved</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   </div></div></div>
    
<div class="tab-pane fade" id="risk" role="tabpanel">
							<div class="card">
						<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Risk Management - Monitored Data</h6></div>
							
							<div class="card-body">
<div><label style="color:black;" class="title">Number of beneficiaries of social protection mechanisms (food and cash transfers)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
  <div><label style="color:black;" class="title">Number of households benefitting from Hunger Net Safety Programme </label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   <div><label style="color:black;" class="title">Amount of funding allocated to climate change actions through CCCFs in Counties with climate fund regulations (USD)</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   <div><label style="color:black;" class="title">Number of early warning systems for droughts</label><br>
<div class="row">
   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" >Data</label>
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
   </div></div></div>
</div>   
</div></div>

<hr>
	     <div class="form-group">
                <span class="col-sm-3 control-label" style="color:black;">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="foodNutrition.remarks" >${existingAdaptationMonitoring.getFoodNutrition().getRemarks()}</textarea>
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
 <button class="btn bg-info-700">Submit</button>
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
<div id = "rejectionButton" style="display: none	">
<button id = "Rejected" onclick="setStatus(this.id);"  class="btn bg-info-700">Reject</button>
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
	
	<% if(existingAdaptationMonitoring!=null && existingAdaptationMonitoring.getFoodNutrition()!=null) {
	
	%>	
	document.getElementById('dataId').value = "<%=existingAdaptationMonitoring.getFoodNutrition().getDataId()%>";
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