<%@page import="com.vanuatu.model.sdg.SDGMonitoring"%>
<%@page import="com.vanuatu.model.sdg.SDGInput"%>
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
	<title>SDG Assessment</title>
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

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

if(request.getAttribute("projectsList")!=null){
	session.setAttribute("projectsList",request.getAttribute("projectsList"));
}

SDGMonitoring existingSdgMonitoring = null;

if(request.getAttribute("sdgMonitoring")!=null){
	existingSdgMonitoring = (SDGMonitoring)request.getAttribute("sdgMonitoring");
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
<div class="card border-teal">
	<div class="card-header bg-info-700 ">
		<h5 class="card-title text-uppercase text-center">SDG Assessment - Monitoring Information</h5>
	</div>

	<div class="card-body">

<form action = "saveSDGMonitoringDetails" class="form-horizontal bordered-row" method="post">

<input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
<input type="hidden" name = "poverty.dataId" id = "dataId">

<div class="card-body font-size-lg">

<div class="form-group row">
<label class="col-lg-4 col-form-label text-right">Project&nbsp<span class="text-danger">*</span></label>
<div class="col-lg-6">
<select name="projectId"  id="projectId" required data-placeholder="--Select--" class="form-control form-control-select2" onchange="getData(this.value);">
<option></option>
<% if(fromApprovalDashboard==null) { %>                	
                            <c:forEach var="listValue" items="${projectsList}">
							<option value="${listValue}">${listValue}</option>
							</c:forEach>
				<% } %>	
</select>
</div></div>

<div class="form-group row">
<label class="col-lg-4 col-form-label text-right">Monitoring Year&nbsp<span class="text-danger">*</span></label>
<div class="col-lg-3">
<select name="year" required id="yearId" data-placeholder="--Select--" class="form-control select" onchange="getData(this.value);">
<option></option>
   							<c:forEach var="listValue" items="${years}">
							<option value="${listValue}">${listValue}</option>
							</c:forEach>
</select>
</div></div>

<hr>
<div class="form-group">
<div class="tab-container">
                             <ul class="nav nav-tabs justify-content-center nav-fill" role="tablist">
                             <li class="nav-item">
								<a class="nav-link active " data-toggle="tab" href="#poverty" role="tab">Poverty Reduction</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#equality" role="tab">Reducing Inequality </a>
                            </li>
                            <li class="nav-item">
                             <a class="nav-link" data-toggle="tab" href="#gender" role="tab">Gender Parity</a>
                            </li>
                            <li class="nav-item">
                           <a class="nav-link" data-toggle="tab" href="#industry" role="tab">Infrastructure, Innovation, Industry</a>
                            </li>
                            <li class="nav-item dropdown">
									<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Other SDG Impacts</a>
									<div class="dropdown-menu">
											
                                <a class="dropdown-item" data-toggle="tab" href="#environment" role="tab">Environment</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#employment" role="tab">Employment</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#education" role="tab">Education and Learning</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#food" role="tab">Food Security and Hunger</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#water" role="tab">Water and Sanitation</a>
                            
                                <a class="dropdown-item" data-toggle="tab" href="#health" role="tab">Health and Well Being</a>
                            
											</div>
							</li>
                            </ul><hr>
 
<div class="tab-content">
<div class="tab-pane active fade show" id="poverty" role="tabpanel">
						<div class="card">
						<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Poverty Reduction- Monitored Data</h6></div>
							
							<div class="card-body">	
<div class="element-select" ><label style="color:black;" class="title">Additional number of people living on more than $1.25 per day</label><br>
<div class="row">

   <div class="col-md-6">
                <div class="row">
      			 <label class="col-sm-3 col-form-label" style="color:black;">Data</label>
             <div class="col-sm-6">
             <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="poverty.sdg1_pov_data1" value=${sdgMonitoring.poverty.sdg1_pov_data1}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"  name="poverty.sdg1_pov_ds1" class="form-control"  value="${sdgInput.poverty.sdg1_pov_ds1}">
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
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="poverty.sdg1_pov_data2" value=${sdgMonitoring.poverty.sdg1_pov_data2} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
   
               <input type="text"    name="poverty.sdg1_pov_ds2"  class="form-control"  value="${sdgInput.poverty.sdg1_pov_ds2}">
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
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="poverty.sdg1_pov_data3"  value=${sdgMonitoring.poverty.sdg1_pov_data3}>
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                <div class="col-sm-6">
               <input type="text"    name="poverty.sdg1_pov_ds3" class="form-control"  value="${sdgInput.poverty.sdg1_pov_ds3}">
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
            <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="poverty.sdg1_pov_data4" value=${sdgMonitoring.poverty.sdg1_pov_data4} >
            </div>
            </div>
            
</div>
<div class="col-md-6">
             <div class="row">
   			 <label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
                 <div class="col-sm-6">
                <input type="text"  name="poverty.sdg1_pov_ds4"  class="form-control"  value="${sdgInput.poverty.sdg1_pov_ds4}">
                </div>
                </div>
    </div>
    </div>
    
</div></div></div></div>
<div class="tab-pane" id="equality" role="tabpanel">
<div class="card">
<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Reducing Inequality - Monitored Data</h6></div>
							
<div class="card-body">	
<div class="element-select"  ><label style="color:black;" class="title">Additional policy frameworks at regional and national level to reduce inequality and empower vulnerable groups</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="inequality.sdg10_ineq_data1"  value=${sdgMonitoring.inequality.sdg10_ineq_data1}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text"    name="poverty.sdg10_ineq_ds1"  class="form-control"  value="${sdgInput.inequality.sdg10_ineq_ds1}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="inequality.sdg10_ineq_data2"  value=${sdgMonitoring.inequality.sdg10_ineq_data2}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text"  name="poverty.sdg10_ineq_ds2"  class="form-control" value="${sdgInput.inequality.sdg10_ineq_ds2}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="inequality.sdg10_ineq_data3"  value=${sdgMonitoring.inequality.sdg10_ineq_data3}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="poverty.sdg10_ineq_ds3"  class="form-control" value="${sdgInput.inequality.sdg10_ineq_ds3}">
                </div>
                </div>
    </div>
    </div>
    </div>
    </div>
</div></div>

<div class="tab-pane fade" id="gender" role="tabpanel">
		<div class="card">
		<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Gender Parity - Monitored Data</h6></div>
							
				<div class="card-body">
	
	<div class="element-select"  ><label style="color:black;" class="title">Number of women employed under the action</label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="gender.sdg5_gen_data1"  value=${sdgMonitoring.gender.sdg5_gen_data1}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="gender.sdg5_gen_ds1"  class="form-control" value="${sdgInput.gender.sdg5_gen_ds1}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="gender.sdg5_gen_data2"  value=${sdgMonitoring.gender.sdg5_gen_data2}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="gender.sdg5_gen_ds2"  class="form-control" value="${sdgInput.gender.sdg5_gen_ds2}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="gender.sdg5_gen_data3"  value=${sdgMonitoring.gender.sdg5_gen_data3}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="gender.sdg5_gen_ds3"  class="form-control" value="${sdgInput.gender.sdg5_gen_ds3}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="gender.sdg5_gen_data4"  value=${sdgMonitoring.gender.sdg5_gen_data4}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="gender.sdg5_gen_ds4"  class="form-control" value="${sdgInput.gender.sdg5_gen_ds4}">
                </div>
                </div>
    </div>
    </div>
    </div>
    </div>
    </div></div>
    
    <div class="tab-pane fade" id="industry" role="tabpanel">
    <div class="card-group-control card-group-control-left">
			<div class="card">
			<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Infrastructure, Innovation and Industry - Monitored Data</h6></div>
							
	<div class="card-body">
	<h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseIndQnSub">Industry and Innovation</a></h6>
	<div class="collapse" id="collapseIndQnSub">

<div class="element-select"><label style="color:black;" class="title">Investments in industrial activity under the action (large) (USD)</label><br>

<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
 <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data1" value=${sdgMonitoring.industry.sdg9_ind_data1}>
</div>
</div>
</div>

<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input class="form-control" type="text" name="industry.sdg9_ind_ds1" value="${sdgInput.industry.sdg9_ind_ds1}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data2" value=${sdgMonitoring.industry.sdg9_ind_data2}>
         </div>
      </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input class="form-control" type="text" name="industry.sdg9_ind_ds2" value="${sdgInput.industry.sdg9_ind_ds2}">
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
 <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data3" value=${sdgMonitoring.industry.sdg9_ind_data3}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input class="form-control" type="text" name="industry.sdg9_ind_ds3" value="${sdgInput.industry.sdg9_ind_ds3}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data4" value=${sdgMonitoring.industry.sdg9_ind_data4}>
         </div>
      </div>
    </div>
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds4" value="${sdgInput.industry.sdg9_ind_ds4}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data5" value=${sdgMonitoring.industry.sdg9_ind_data5}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds5" value="${sdgInput.industry.sdg9_ind_ds5}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data6" value=${sdgMonitoring.industry.sdg9_ind_data6}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds6" value="${sdgInput.industry.sdg9_ind_ds6}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data7" value=${sdgMonitoring.industry.sdg9_ind_data7}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds7" value="${sdgInput.industry.sdg9_ind_ds7}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data8" value=${sdgMonitoring.industry.sdg9_ind_data8}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds8" value="${sdgInput.industry.sdg9_ind_ds8}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data9" value=${sdgMonitoring.industry.sdg9_ind_data9}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds9" value="${sdgInput.industry.sdg9_ind_ds9}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg9_ind_data10" value=${sdgMonitoring.industry.sdg9_ind_data10}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg9_ind_ds10" value="${sdgInput.industry.sdg9_ind_ds10}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data11" value=${sdgMonitoring.industry.sdg6_ind_data11}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds11" value="${sdgInput.industry.sdg6_ind_ds11}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg12_ind_data12" value=${sdgMonitoring.industry.sdg12_ind_data12}>
         </div>
      </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg12_ind_ds12" value="${sdgInput.industry.sdg12_ind_ds12}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg12_ind_data13" value=${sdgMonitoring.industry.sdg12_ind_data13}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg12_ind_ds13" value="${sdgInput.industry.sdg12_ind_ds13}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg12_ind_data14" value=${sdgMonitoring.industry.sdg12_ind_data14}>
         </div>
      </div>
    </div>
        <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg12_ind_ds14" value="${sdgInput.industry.sdg12_ind_ds14}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg13_ind_data15" value=${sdgMonitoring.industry.sdg13_ind_data15}>
         </div>
      </div>
    </div>
            <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg13_ind_ds15" value="${sdgInput.industry.sdg13_ind_ds15}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg13_ind_data16" value=${sdgMonitoring.industry.sdg13_ind_data16}>
         </div>
      </div>
    </div>
             <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg13_ind_ds16" value="${sdgInput.industry.sdg13_ind_ds16}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg13_ind_data17" value=${sdgMonitoring.industry.sdg13_ind_data17}>
         </div>
      </div>
    </div>
                 <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg13_ind_ds17" value="${sdgInput.industry.sdg13_ind_ds17}">
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
 <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data18" value=${sdgMonitoring.industry.sdg6_ind_data18}>
         </div>
      </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds18" value="${sdgInput.industry.sdg6_ind_ds18}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data19" value=${sdgMonitoring.industry.sdg6_ind_data19}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds19" value="${sdgInput.industry.sdg6_ind_ds19}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data20" value=${sdgMonitoring.industry.sdg6_ind_data20}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds20" value="${sdgInput.industry.sdg6_ind_ds20}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg6_ind_data21" value=${sdgMonitoring.industry.sdg6_ind_data21}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg6_ind_ds21" value="${sdgInput.industry.sdg6_ind_ds21}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data22" value=${sdgMonitoring.industry.sdg7_ind_data22}>
         </div>
      </div>
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds22" value="${sdgInput.industry.sdg7_ind_ds22}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data23" value=${sdgMonitoring.industry.sdg7_ind_data23}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds23" value="${sdgInput.industry.sdg7_ind_ds23}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data24" value=${sdgMonitoring.industry.sdg7_ind_data24}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds24" value="${sdgInput.industry.sdg7_ind_ds24}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data25" value=${sdgMonitoring.industry.sdg7_ind_data25}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds25" value="${sdgInput.industry.sdg7_ind_ds25}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data26" value=${sdgMonitoring.industry.sdg7_ind_data26}>
         </div>
      </div>
    </div>
       <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds26" value="${sdgInput.industry.sdg7_ind_ds26}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data27" value=${sdgMonitoring.industry.sdg7_ind_data27}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds27" value="${sdgInput.industry.sdg7_ind_ds27}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data28" value=${sdgMonitoring.industry.sdg7_ind_data28}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds28" value="${sdgInput.industry.sdg7_ind_ds28}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg7_ind_data29" value=${sdgMonitoring.industry.sdg7_ind_data29}>
         </div>
      </div>
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg7_ind_ds29" value="${sdgInput.industry.sdg7_ind_ds29}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data30" value=${sdgMonitoring.industry.sdg11_ind_data30}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds30" value="${sdgInput.industry.sdg11_ind_ds30}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data31" value=${sdgMonitoring.industry.sdg11_ind_data31}>
         </div>
      </div>
    </div>
      <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds31" value="${sdgInput.industry.sdg11_ind_ds31}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data32" value=${sdgMonitoring.industry.sdg11_ind_data32}>
         </div>
      </div>
    </div>
        <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds32" value="${sdgInput.industry.sdg11_ind_ds32}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data33" value=${sdgMonitoring.industry.sdg11_ind_data33}>
         </div>
      </div>
    </div>
        <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds33" value="${sdgInput.industry.sdg11_ind_ds33}">
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
          <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="industry.sdg11_ind_data34" value=${sdgMonitoring.industry.sdg11_ind_data34}>
         </div>
      </div>
    </div>
         <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
        <input class="form-control" type="text" name="industry.sdg11_ind_ds34" value="${sdgInput.industry.sdg11_ind_ds34}">
        </div>
        </div>
    </div>
    </div>
    </div>
    
    </div>
    </div>
    </div></div></div>
    
    <div class="tab-pane fade" id="environment" role="tabpanel">
   <div class="card-group-control card-group-control-left">
		<div class="card">
		<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Environment - Monitored Data</h6></div>
							
	<div class="card-body">
  <h6 class="card-title"><a data-toggle="collapse" class="collapsed text-default" href="#collapseAirQn">Impact on Air</a></h6>
	<div class="collapse" id="collapseAirQn">
  		
	<div class="element-select"><label style="color:black;" class="title"><span >Reduction in SOx (kg per annum)</span></label><br>
	<div class="row">
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg3_env_data1"  value=${sdgMonitoring.enviornment.sdg3_env_data1}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds1"  class="form-control"  value="${sdgInput.enviornment.sdg3_env_ds1}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg3_env_data2"  value=${sdgMonitoring.enviornment.sdg3_env_data2}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds2"  class="form-control"  value="${sdgInput.enviornment.sdg3_env_ds2}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg3_env_data3"  value=${sdgMonitoring.enviornment.sdg3_env_data3}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds3"  class="form-control"  value="${sdgInput.enviornment.sdg3_env_ds3}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg3_env_data4"  value=${sdgMonitoring.enviornment.sdg3_env_data4}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds4"  class="form-control"  value="${sdgInput.enviornment.sdg3_env_ds4}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name=enviornment.sdg3_env_data5  value=${sdgMonitoring.enviornment.sdg3_env_data5}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg3_env_ds5"  class="form-control"  value="${sdgInput.enviornment.sdg3_env_ds5}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg6_env_data6"  value=${sdgMonitoring.enviornment.sdg6_env_data6}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" class="form-control" name="enviornment.sdg6_env_ds6"  value="${sdgInput.enviornment.sdg6_env_ds6}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg6_env_data7"  value=${sdgMonitoring.enviornment.sdg6_env_data7}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg6_env_ds7"  class="form-control"  value="${sdgInput.enviornment.sdg6_env_ds7}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg6_env_data8"  value=${sdgMonitoring.enviornment.sdg6_env_data8}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg6_env_ds8"  class="form-control"  value="${sdgInput.enviornment.sdg6_env_ds8}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg14_env_data9"  value=${sdgMonitoring.enviornment.sdg14_env_data9}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg14_env_ds9"  class="form-control"  value="${sdgInput.enviornment.sdg14_env_ds9}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg14_env_data10"  value=${sdgMonitoring.enviornment.sdg14_env_data10}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg14_env_ds10"  class="form-control"  value="${sdgInput.enviornment.sdg14_env_ds10}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg14_env_data11"  value=${sdgMonitoring.enviornment.sdg14_env_data11}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg14_env_ds11"  class="form-control"  value="${sdgInput.enviornment.sdg14_env_ds11}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg14_env_data12"  value=${sdgMonitoring.enviornment.sdg14_env_data12}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg14_env_ds12"  class="form-control"  value="${sdgInput.enviornment.sdg14_env_ds12}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data13"  value=${sdgMonitoring.enviornment.sdg15_env_data13}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds13"  class="form-control"  value="${sdgInput.enviornment.sdg15_env_ds13}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data14"  value=${sdgMonitoring.enviornment.sdg15_env_data14}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds14"  class="form-control"  value="${sdgInput.enviornment.sdg15_env_ds14}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data15"  value=${sdgMonitoring.enviornment.sdg15_env_data15}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds15"  class="form-control"  value="${sdgInput.enviornment.sdg15_env_ds15}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data16"  value=${sdgMonitoring.enviornment.sdg15_env_data16}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds16"  class="form-control"  value="${sdgInput.enviornment.sdg15_env_ds16}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg15_env_data17"  value=${sdgMonitoring.enviornment.sdg15_env_data17}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg15_env_ds17"  class="form-control"  value="${sdgInput.enviornment.sdg15_env_ds17}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg12_env_data18"  value=${sdgMonitoring.enviornment.sdg12_env_data18}>
                </div>
                </div>
                
    </div>
       <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg12_env_ds18"  class="form-control"  value="${sdgInput.enviornment.sdg12_env_ds18}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg12_env_data19"  value=${sdgMonitoring.enviornment.sdg12_env_data19}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg12_env_ds19"  class="form-control"  value="${sdgInput.enviornment.sdg12_env_ds19}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg12_env_data20"  value=${sdgMonitoring.enviornment.sdg12_env_data20}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg12_env_ds20"  class="form-control"  value="${sdgInput.enviornment.sdg12_env_ds20}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg12_env_data21"  value=${sdgMonitoring.enviornment.sdg12_env_data21}>
                </div>
                </div>
                
    </div>
    <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg12_env_ds21"  class="form-control"  value="${sdgInput.enviornment.sdg12_env_ds21}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="enviornment.sdg6_env_data22"  value=${sdgMonitoring.enviornment.sdg6_env_data22}>
                </div>
                </div>
                
    </div>
     <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="enviornment.sdg6_env_ds22"  class="form-control"  value="${sdgInput.enviornment.sdg6_env_ds22}">
                </div>
                </div>
    </div>
    </div>
    </div>
    </div></div></div></div></div>
    
<div class="tab-pane fade" id="employment" role="tabpanel">
			<div class="card">
			<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Employment - Monitored Data</h6></div>
<div class="card-body">
<div class="element-number" style="color:black;">
<label style="color:black;" class="title">Number of new jobs created (total)</label><br>
<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data1" value=${sdgMonitoring.employment.sdg8_emp_data1}>
											</div>
										</div>
									</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds1" class="form-control" value="${sdgInput.employment.sdg8_emp_ds1}">
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
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data2" value=${sdgMonitoring.employment.sdg8_emp_data2}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds2" class="form-control" value="${sdgInput.employment.sdg8_emp_ds2}">
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
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data3" value=${sdgMonitoring.employment.sdg8_emp_data3}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds3" class="form-control" value="${sdgInput.employment.sdg8_emp_ds3}">
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
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data4" value=${sdgMonitoring.employment.sdg8_emp_data4}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds4" class="form-control" value="${sdgInput.employment.sdg8_emp_ds4}">
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
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data5" value=${sdgMonitoring.employment.sdg8_emp_data5}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds5" class="form-control" value="${sdgInput.employment.sdg8_emp_ds5}">
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
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data6" value=${sdgMonitoring.employment.sdg8_emp_data6}>
</div>
</div>
</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds6" class="form-control" value="${sdgInput.employment.sdg8_emp_ds6}">
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
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data7" value=${sdgMonitoring.employment.sdg8_emp_data7}>
											</div>
										</div>

									</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds7" class="form-control" value="${sdgInput.employment.sdg8_emp_ds7}">
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
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data8" value=${sdgMonitoring.employment.sdg8_emp_data8}>
											</div>
										</div>
									</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds8" class="form-control" value="${sdgInput.employment.sdg8_emp_ds8}">
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
<input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="employment.sdg8_emp_data9" value=${sdgMonitoring.employment.sdg8_emp_data9}>
											</div>
										</div>

									</div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
<input type="text" name="employment.sdg8_emp_ds9" class="form-control" value="${sdgInput.employment.sdg8_emp_ds9}">
											</div>
										</div>
									</div></div></div>
								</div></div>
								</div>

	<div class="tab-pane fade" id="education" role="tabpanel">
	<div class="card">
	<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Education - Monitored Data</h6></div>
	<div class="card-body">
	<div class="element-number"><label style="color:black;" class="title">Additional enrollment in primary education (7-12 years)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data1"   value=${sdgMonitoring.education.sdg4_edu_data1}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">

                <input type="text" name="education.sdg4_edu_ds1"  class="form-control"  value="${sdgInput.education.sdg4_edu_ds1}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data2"  value=${sdgMonitoring.education.sdg4_edu_data2}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="education.sdg4_edu_ds2"  class="form-control"  value="${sdgInput.education.sdg4_edu_ds2}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data3"  value=${sdgMonitoring.education.sdg4_edu_data3}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="education.sdg4_edu_ds3"  class="form-control"  value="${sdgInput.education.sdg4_edu_ds3}">
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

                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data4"  value=${sdgMonitoring.education.sdg4_edu_data4}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">

                <input type="text" name="education.sdg4_edu_ds4"  class="form-control"  value="${sdgInput.education.sdg4_edu_ds4}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"  name="education.sdg4_edu_data5"  value=${sdgMonitoring.education.sdg4_edu_data5}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">

                <input type="text"  name="education.sdg4_edu_ds5"  class="form-control" value="${sdgInput.education.sdg4_edu_ds5}">
                </div>
                </div>
    </div>
    </div></div></div></div>
    </div>
    
<div class="tab-pane fade" id="food" role="tabpanel">
<div class="card">
<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Food Security & Hunger - Monitored Data</h6></div>
	<div class="card-body">	
	<div class="element-number"><label style="color:black;" class="title">New land brought under the cultivation (Ha)</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="food.sdg2_food_data1"  value=${sdgMonitoring.food.sdg2_food_data1}>
                </div>
                </div>
    </div>

<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">

                <input type="text" name="food.sdg2_food_ds1"  class="form-control"  value="${sdgInput.food.sdg2_food_ds1}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="food.sdg2_food_data2"  value=${sdgMonitoring.food.sdg2_food_data2}>
                </div>
                </div>
          </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="food.sdg2_food_ds2"  class="form-control"  value="${sdgInput.food.sdg2_food_ds2}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="food.sdg2_food_data3"  value=${sdgMonitoring.food.sdg2_food_data3}>
                </div>
                </div>
                
    </div>
   <div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="food.sdg2_food_ds3"  class="form-control"  value="${sdgInput.food.sdg2_food_ds3}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="food.sdg2_food_data4"  value=${sdgMonitoring.food.sdg2_food_data4}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="food.sdg2_food_ds4"  class="form-control"  value="${sdgInput.food.sdg2_food_ds4}">
                </div>
                </div>
    </div>
    </div>
	</div>
	</div></div></div>

<div class="tab-pane fade" id="water" role="tabpanel">
	<div class="card">
	<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Water and Sanitation - Monitored Data</h6></div>
	<div class="card-body">
	<div class="element-number"><label style="color:black;" class="title">Additional number of water treatments facility level</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data1"  value=${sdgMonitoring.water.sdg6_wat_data1}>
                </div>
                </div>
                </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds1"  class="form-control"  value="${sdgInput.water.sdg6_wat_ds1}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data2"  value=${sdgMonitoring.water.sdg6_wat_data2}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds2"  class="form-control"  value="${sdgInput.water.sdg6_wat_ds2}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data3"  value=${sdgMonitoring.water.sdg6_wat_data3}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds3"  class="form-control"  value="${sdgInput.water.sdg6_wat_ds3}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data4"  value=${sdgMonitoring.water.sdg6_wat_data4}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds4"  class="form-control"  value="${sdgInput.water.sdg6_wat_ds4}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="water.sdg6_wat_data5"  value=${sdgMonitoring.water.sdg6_wat_data5}>
                </div>
                </div>
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="water.sdg6_wat_ds5"  class="form-control"  value="${sdgInput.water.sdg6_wat_ds5}">
                </div>
                </div>
    </div>
    </div>
    </div>
    </div></div></div>
    
<div class="tab-pane fade" id="health" role="tabpanel">
	<div class="card">
	<div class="card-header bg-info-700 ">
							<h6 class="card-title text-uppercase text-left">Health & Well Being - Monitored Data</h6></div>
	<div class="card-body">
	
	<div class="element-number"><label style="color:black;" class="title">Number of additional people provided with access to health services</label><br>
	<div class="row">
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data</label>
<div class="col-sm-6">
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data1"  value=${sdgMonitoring.health.sdg3_hlt_data1}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds1"  class="form-control"  value="${sdgInput.health.sdg3_hlt_ds1}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data2"  value=${sdgMonitoring.health.sdg3_hlt_data2}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds2"  class="form-control"  value="${sdgInput.health.sdg3_hlt_ds2}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data3"  value=${sdgMonitoring.health.sdg3_hlt_data3}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds3"  class="form-control"  value="${sdgInput.health.sdg3_hlt_ds3}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data4"  value=${sdgMonitoring.health.sdg3_hlt_data4}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds4"  class="form-control"  value="${sdgInput.health.sdg3_hlt_ds4}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data5"  value=${sdgMonitoring.health.sdg3_hlt_data5}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds5"  class="form-control"  value="${sdgInput.health.sdg3_hlt_ds5}">
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
                <input class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" name="health.sdg3_hlt_data6"  value=${sdgMonitoring.health.sdg3_hlt_data6}>
                </div>
                </div>
                
    </div>
<div class="col-md-6">
<div class="row">
<label class="col-sm-3 col-form-label" style="color:black;">Data Source</label>
<div class="col-sm-6">
                <input type="text" name="health.sdg3_hlt_ds6"  class="form-control"  value="${sdgInput.health.sdg3_hlt_ds6}">
                </div>
                </div>
    </div>
    </div></div></div></div></div>
<hr>

<div class="form-group">
<span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="poverty.remarks">${sdgMonitoring.getPoverty().getRemarks()}</textarea>
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

<hr>
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
<div id = "rejectionButton" style="display: none">
<button id = "Rejected" onclick="setStatus(this.id);"  class="btn bg-info-700">Reject</button>
</div> 
</div>
</div>
</div>
</div>
</div></div></div></div></form></div></div></div></div></div>

<script>
function getData(){
	var projectId = document.getElementById("projectId").value;
	var year = document.getElementById("yearId").value;
	window.location.href = '/getSDGMonitoring?project='+encodeURIComponent(projectId) + '&year='+year + '&status=Any';	
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
	
	<% if(existingSdgMonitoring!=null && existingSdgMonitoring.getPoverty()!=null) {
	
	%>	
	document.getElementById('dataId').value = "<%=existingSdgMonitoring.getPoverty().getDataId()%>";
	<%
		}		
	%>
	
}	

<% if(existingSdgMonitoring!=null && existingSdgMonitoring.getPoverty()!=null) {
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