<%@page import="com.sudan.model.user.UserReg"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link href="global_assets/css/icons/fontawesome/styles.min.css" rel="stylesheet" type="text/css">
	<!-- Global stylesheets -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
	<link href="global_assets/css/icons/icomoon/styles.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/bootstrap_limitless.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/layout.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/components.min.css" rel="stylesheet" type="text/css">
	<link href="assets/css/colors.min.css" rel="stylesheet" type="text/css">

</head>

<%
 	UserReg userInfo = null;
 	
	    if(request.getAttribute("userInfo")!=null){
	    	userInfo = (UserReg)request.getAttribute("userInfo");
	    	session.setAttribute("userInfo", userInfo);
	    	session.setAttribute("userEmailId", userInfo.getEmailId());
	    	
	    }
	    userInfo = (UserReg)session.getAttribute("userInfo");
   %>
<body class="navbar-md-md-top">

	<!-- Main navbar -->
	<div class="fixed-top">

		<!-- Main navbar -->
		<div class="navbar navbar-expand-md navbar-light bg-pink-600">
			<div class="navbar-nav" >
			<a style="margin-left:20px; margin-right:180px;">
				<img src="global_assets/images/ssudan.png" width="60" height="60">
			</a>
			
		</div>

			<div class="d-md-none">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
				<i class="icon-tree5"></i>
			</button>
			<button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
				<i class="fas fa-expand-arrows-alt fa-1x text-light" title="Full Screen"></i>
			</button>
		</div>

			<div class="collapse navbar-collapse" id="navbar-mobile">
				<ul class="navbar-nav">
				<li class="nav-item">
					<a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
						<i class="fas fa-expand-arrows-alt fa-1x text-light" title="Full Screen"></i>
					</a>
				</li></ul>
<ul class="navbar-nav">
					<li class="nav-item" style="margin-left:100px; margin-top:10px">
						<h3><a href="getDashboard" class="text-white text-center text-uppercase">
							South Sudan's Climate Action Impact Assessment MRV Tool</a></h3>
						
					</li></ul>
				
			</div>
		</div>
		<!-- /main navbar -->


		<!-- Alternative navbar -->
		<div class="navbar navbar-expand-md navbar-light">
			
			<div class="navbar-collapse collapse" id="navbar-second">
				<ul class="navbar-nav">
					<li class="nav-item">
					<a href="getDashboard" class="navbar-nav-link font-size-lg font-weight-bold"><i class="fas fa-home mr-3 fa-1x font-weight-bold"></i> Home</a>
						
					</li>
					
				</ul>

				<ul class="navbar-nav ml-md-auto">
					<li class="nav-item">

						<a href="javaScript:{openNewWindow();}" class="navbar-nav-link"><i class="icon-book mr-2"></i>
							User Manual
							
						</a>
						 <!-- <a href="#" class="navbar-nav-link"><i class="icon-book mr-2 font-weight-bold"></i>
							User Manual
						</a>  -->
						
					</li>
						<li class="nav-item">
						<a href="javaScript:{openNewWindowFaq();}" class="navbar-nav-link"><i class="icon-question3 mr-2"></i>
							FAQs
							
						</a>
						
					</li>
					<li class="nav-item dropdown dropdown-user font-weight-semibold">
					<a class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
						<% if(userInfo!=null) %>
						<span><%=userInfo.getFirstName()%></span>
					</a>

					<div class="dropdown-menu dropdown-menu-right">
						<a href="getUserProfile" class="dropdown-item"><i class="icon-user"></i>Profile</a>
						<a href="getUserPassword" class="dropdown-item"><i class="icon-key"></i>Change Password</a>
						<a href="logout" class="dropdown-item"><i class="icon-lock5"></i>Logout</a>
					</div>
				</li>

					
				</ul>
			</div>
		</div>
		<!-- /alternative navbar -->

	</div>
	
	

	<!-- Page content -->
	<div class="page-content">
	
<div class="sidebar sidebar-light sidebar-main bg-light sidebar-expand-md align-self-start">

			<!-- Sidebar mobile toggler -->
			<div class="sidebar-mobile-toggler text-center">
				<a href="#" class="sidebar-mobile-main-toggle">
					<i class="icon-arrow-left8"></i>
				</a>
				<span class="font-weight-semibold"></span>
				<a href="#" class="sidebar-mobile-expand">
					<i class="icon-screen-full"></i>
					<i class="icon-screen-normal"></i>
				</a>
			</div>
			<!-- /sidebar mobile toggler -->


			<!-- Sidebar content -->
			<div class="sidebar-content">
				<div class="card card-sidebar-mobile">
					<!-- Main navigation -->
					<div class="card-body p-1">
					
						<ul class="nav nav-sidebar" data-nav-type="accordion">

							<!-- Main -->
							<li class="nav-item-header mt-0"><div class="text-uppercase text-dark font-size-lg font-weight-bold">Menu</div></li>
							
							
							<!-- /main -->

							<!-- Layout -->
								
					<% if(userInfo!=null && !userInfo.getRole().equals("Nodal Officer") && userInfo.getGhgPermissions()!=null) { %>
							
								<li class="nav-item nav-item-submenu">
						
							<a href="#" class="text-uppercase nav-link"><i class="fas fa-cloud-upload-alt mr-3 fa-1x font-weight-bold"></i><span><b>GHG Inventory</b></span></a>

							<ul class="nav nav-group-sub" data-submenu-title="GHG Inventory">
					  <c:forEach var="permissionList" items="${userInfo.ghgPermissions}">

									
						<c:if test="${permissionList=='Energy'}">
								
								<li class="nav-item nav-item-submenu">
								<a href="#" class="nav-link font-weight-bold text-uppercase"><span>1-Energy</span></a>
								<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
								<li class="nav-item nav-item-submenu">
								<a href="#" class="nav-link font-weight-black text-uppercase font-size-sm">1.A-Fuel Combustion Activities</a>
								<ul class="nav nav-group-sub">
									<li class="nav-item font-weight-bold"><a href="getGHGInputReferenceEnergy" class="nav-link">Reference Approach</a></li>
									<li class="nav-item nav-item-submenu">
										<a href="#" class="nav-link font-weight-bold">Sectoral Approach</a>
										<ul class="nav nav-group-sub">
										<li class="nav-item nav-item-submenu">
										<a href="#" class="nav-link font-weight-bold font-size-sm">1.A.1-Energy Industries</a>
											<ul class="nav nav-group-sub">
											<li class="nav-item font-size-sm"><a href="getGHGInputEnergy?subSector=1.A.1-Energy Industries&subCategory=1.A.1.a.i-Electricity Generation" class="nav-link">1.A.1.a.i-Electricity Generation</a></li>
											<li class="nav-item font-size-sm"><a href="getGHGInputSolidFuel?subSector=1.A.1-Energy Industries&subCategory=1.A.1.c-Manufacture of Solid Fuels and Other Energy Industries" class="nav-link">1.A.1.c-Manufacture of Solid Fuels</a></li>
											</ul>
											</li>
											<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputEnergy?subSector=1.A.2-Manufacturing Industries and Construction&subCategory=" class="nav-link">1.A.2-Manufacturing</a></li>
											<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputEnergy?subSector=1.A.3-Transport&subCategory=" class="nav-link">1.A.3-Transport</a></li>
											<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputEnergy?subSector=1.A.4-Other Sectors&subCategory=" class="nav-link">1.A.4-Others</a></li>
										</ul>
									</li></ul></li>
									
									<li class="nav-item nav-item-submenu">
								<a href="#" class="nav-link font-weight-black text-uppercase font-size-sm">1.B-Fugitive emissions from fuels</a>
								<ul class="nav nav-group-sub">
								<li class="nav-item nav-item-submenu">
										<a href="#" class="nav-link font-weight-bold">1.B.2-Oil and Natural Gas</a>
											<ul class="nav nav-group-sub">
											<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputOil?subSector=1.B.2-Oil and Natural Gas&subCategory=1.B.2.a-Oil"" class="nav-link">1.B.2.a-Oil</a></li>
									<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputGas?subSector=1.B.2-Oil and Natural Gas&subCategory=1.B.2.b-Natural Gas" class="nav-link">1.B.2.b-Natural Gas</a></li>
											</ul>
											</li>
									
									</ul></li>
								</ul>
							</li>
						</c:if>
						
						<c:if test="${permissionList=='IPPU'}">
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link font-weight-bold text-uppercase"><span>2-Industrial Processes and Product Use</span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
							<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-bold">2.A-Mineral Industry</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputCement?subSector=2.A.1-Cement Production" class="nav-link">2.A.1-Cement Production</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputLime?subSector=2.A.2-Lime Production" class="nav-link">2.A.2-Lime Production</a></li>
										
									</ul>
								</li>
							<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-bold">2.D-Non-Energy Products from Fuels and Solvent Use</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputLubricant?subSector=2.D.1-Lubricant Use" class="nav-link">2.D.1-Lubricant Use</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputSolvent?subSector=2.D.3-Solvent Use" class="nav-link">2.D.3-Solvent Use</a></li>
										
									</ul>
								</li>
								
								<li class="nav-item nav-item-submenu ">
									<a href="#" class="nav-link font-weight-bold">2.F-Product Uses as Substitutes for Ozone Depleting Substances</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputRefrigeration?subSector=2.F.1-Refrigeration and Air Conditioning" class="nav-link">2.F.1-Refrigeration and Air Conditioning</a></li>
									</ul>
								</li>
								
								</ul>
						</li></c:if>
						<c:if test="${permissionList=='AFOLU'}">
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link font-weight-bold text-uppercase"><span>3-Agriculture, Forestry and Other Land Use</span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-bold">3.A-Livestock</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputEnteric?subSector=3.A.1-Enteric Fermentation" class="nav-link">3.A.1-Enteric Fermentation</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputMM?subSector=3.A.2-Manure Management" class="nav-link">3.A.2-Manure Management</a></li>
										</ul>
								</li>
								
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-bold">3.B-Land</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputForestLand?subSector=3.B.1-Forest Land" class="nav-link">3.B.1-Forest Land</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputCropland?subSector=3.B.2-Cropland" class="nav-link">3.B.2-Cropland</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputGrassland?subSector=3.B.3-Grassland" class="nav-link">3.B.3-Grassland</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputWetland?subSector=3.B.4-Wetlands" class="nav-link">3.B.4-Wetland</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputSettlement?subSector=3.B.5-Settlements" class="nav-link">3.B.5-Settlements</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputOtherLand?subSector=3.B.6-Other Land" class="nav-link">3.B.6-Other Lands</a></li>
									</ul>
								</li>
								
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-bold">3.C-Aggregate Sources & non-CO2 Emissions Sources on Land</a>
									<ul class="nav nav-group-sub">
										
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGMappingBiomassBurning?subSector=3.C.1-Emissions from Biomass Burning" class="nav-link">3.C.1-Emissions from Biomass Burning</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputLiming?subSector=3.C.2-Liming" class="nav-link">3.C.2-Liming</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputUrea?subSector=3.C.3-Urea Application" class="nav-link">3.C.3-Urea Application</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputDirectN2oManaged?subSector=3.C.4-Direct N2O emissions from managed soils" class="nav-link">3.C.4-Direct N2O emissions from managed soils</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputIndirectN2oManaged?subSector=3.C.5-Indirect N2O emissions from managed soils" class="nav-link">3.C.5-Indirect N2O emissions from managed soils</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputIndirectN2O?subSector=3.C.6-Indirect N2O emissions from manure management" class="nav-link">3.C.6-Indirect N2O emissions from Manure Management</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGInputRice?subSector=3.C.7-Rice Cultivation" class="nav-link">3.C.7-Rice Cultivation</a></li>
										</ul>
								</li>
								</ul>
						</li></c:if>
						<c:if test="${permissionList=='Waste'}">
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link font-weight-bold"><span>4-Waste</span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
								<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGMappingSolidWaste?subSector=4.A-Solid Waste Disposal" class="nav-link">4.A-Solid Waste Disposal</a></li>
								<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGMappingBiological?subSector=4.B-Biological Treatment" class="nav-link">4.B-Biological Treatment of Solid Waste</a></li>
								<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGMappingIncineration?subSector=4.C-Incineration and Open Burning of Waste" class="nav-link">4.C-Incineration and Open Burning of Waste</a></li>
								<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGMappingWasteWater?subSector=4.D-Wastewaster Treatment and Discharge" class="nav-link">4.D-Wastewater Treatment and Discharge</a></li>
							</ul>
						</li></c:if>
						</c:forEach>
						
							</ul></li>
							<% } %>
							
						
						<% if(userInfo!=null && !userInfo.getRole().equals("Nodal Officer") && userInfo.getProjectPermissions()!=null && userInfo.getProjectPermissions().contains("Project")) { %>
						
						<li class="nav-item nav-item-submenu">
						<a href="#" class="nav-link text-uppercase"><i class="fas fa-book-reader mr-3 fa-1x font-weight-bold"></i> <span><b>Projects</b></span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Projects">
								<li class="nav-item font-weight-bold"><a href="createProject" class="nav-link">Create New Project</a></li>
								<li class="nav-item font-weight-bold"><a href="getProjectList" class="nav-link">Search Existing Projects</a></li>
							</ul>
						</li>
						
						<% } %>

						<% if(userInfo!=null && !userInfo.getRole().equals("Nodal Officer") && userInfo.getProjectPermissions()!=null && userInfo.getProjectPermissions().contains("Mitigation")) { %>
						
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link text-uppercase"><i class="icon-power-cord mr-3 font-weight-bold"></i> <span><b>Mitigation Actions</b></span></a>

							<ul class="nav nav-group-sub font-weight-bold" data-submenu-title="Mitigation Actions">
								<li class="nav-item"><a href="searchProjects?module=mitigationInput" class="nav-link">Project Information</a></li>
								<li class="nav-item"><a href="searchProjects?module=mitigationMonitoring" class="nav-link">Monitoring Information</a></li>
								</ul>
						</li>
						
						<% } %>
						<% if(userInfo!=null && !userInfo.getRole().equals("Nodal Officer") && userInfo.getProjectPermissions()!=null && userInfo.getProjectPermissions().contains("Adaptation")) { %>

							<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link text-uppercase"><i class="icon-people mr-3 font-weight-bold"></i> <span><b>Adaptation Actions</b></span></a>

							<ul class="nav nav-group-sub font-weight-bold" data-submenu-title="Adaptation Actions">
								<li class="nav-item"><a href="searchProjects?module=adaptation" class="nav-link">Project Information</a></li>
								<li class="nav-item"><a href="searchProjects?module=adaptationMonitoring" class="nav-link">Monitoring Information</a></li>
								</ul>
						</li>
						<% } %>
						
						<% if(userInfo!=null && !userInfo.getRole().equals("Nodal Officer") && userInfo.getProjectPermissions()!=null && userInfo.getProjectPermissions().contains("Finance")) { %>
						
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link text-uppercase"><i class="fas fa-funnel-dollar mr-3 fa-1x font-weight-bold"></i><span><b>Climate Finance</b></span></a>

							<ul class="nav nav-group-sub font-weight-bold" data-submenu-title="Climate Finance">
								<li class="nav-item"><a href="searchProjects?module=financeInput" class="nav-link">Project Information</a></li>
								<li class="nav-item"><a href="searchProjects?module=financeMonitoring" class="nav-link">Monitoring Information</a></li>
								</ul>
						</li>
						<% } %>
						<% if(userInfo!=null && !userInfo.getRole().equals("Nodal Officer") && userInfo.getProjectPermissions()!=null && userInfo.getProjectPermissions().contains("SDG")) { %>
						
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link"><i class="fas fa-hand-holding-heart mr-3 fa-1x"></i> <span><b>SDGs ASSESSMENTS</b></span></a>

							<ul class="nav nav-group-sub font-weight-bold" data-submenu-title="SDG Assessment">
								<li class="nav-item"><a href="searchProjects?module=sdg" class="nav-link">Project Information</a></li>
								<li class="nav-item"><a href="searchProjects?module=sdgMonitoring" class="nav-link">Monitoring Information</a></li>
								</ul>
						</li>
						<% } %>
						<% if(userInfo!=null && userInfo.getRole().equals("ADMIN")) { %>
						<li class="nav-item-divider"></li>
						<li class="nav-item nav-item-submenu">
						<a href="#" class="nav-link text-uppercase"><i class="fas fa-database mr-3 fa-1x"></i> <span><b>Database</b></span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
							<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-bold">Energy</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGFuelMapping" class="nav-link">Emission Factor - Fuel</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGFugitiveMapping" class="nav-link">Emission Factor - Fugitive Emissions</a></li>
									</ul>
								</li>
							<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-bold">IPPU</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGIPPUEmissionFactor" class="nav-link">Emission Factor - IPPU</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGGWP" class="nav-link">GWP Database</a></li>
										
									</ul>
								</li>
								
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-bold">AFOLU</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item font-weight-bold font-size-sm"><a href="getLivestockPopulation" class="nav-link"> Livestock Population</a></li>
										<li class="nav-item font-weight-bold font-size-sm"><a href="getLivestockDatabase" class="nav-link">Emission Factor - Livestock</a></li>
									</ul>
								</li>
								
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link font-weight-bold">Waste</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item font-weight-bold font-size-sm"><a href="getGHGPopulation?year=" class="nav-link">Population</a></li>
									</ul>
								</li>
								
								</ul>
						</li>	
						<% } %>							
					<% if(userInfo!=null && userInfo.getReportPermissions()!=null && userInfo.getReportPermissions().contains("Report")) { %>
					
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link text-uppercase"><i class="fas fa-chart-area mr-3 fa-1x font-weight-bold"></i> <span><b>Reports</b></span></a>

							<ul class="nav nav-group-sub" data-submenu-title="Reports">
							<% if(userInfo!=null && userInfo.getReportPermissions()!=null && userInfo.getReportPermissions().contains("GHG Report")) { %>
								<li class="nav-item nav-item-submenu">
								<a href="#" class="nav-link font-weight-bold">GHG Inventory</a>
								<ul class="nav nav-group-sub font-weight-bold font-size-sm">
								<li class="nav-item"><a href="getGHGOutputYears" class="nav-link">GHG Inventory (Year wise)</a></li>
								<li class="nav-item"><a href="getGHGOutputGasYears" class="nav-link">GHG Inventory (Gas wise)</a></li>
								</ul>
							<% } %>
							
							<% if(userInfo!=null && userInfo.getReportPermissions()!=null && userInfo.getReportPermissions().contains("Mitigation Report")) { %>
								<li class="nav-item font-weight-bold"><a href="getMitigationYears" class="nav-link">Mitigation Tracking</a></li>
							<% } %>	
								<% if(userInfo!=null && userInfo.getReportPermissions()!=null && userInfo.getReportPermissions().contains("Adaptation Report")) { %>
								<li class="nav-item font-weight-bold"><a href="AdaptationReport.jsp" class="nav-link">Adaptation Tracking</a></li>
							<% } %>
								<% if(userInfo!=null && userInfo.getReportPermissions()!=null && userInfo.getReportPermissions().contains("Finance Report")) { %>
								<li class="nav-item font-weight-bold"><a href="getFinanceYears" class="nav-link">Finance Tracking</a></li>
							<% } %>	
								<% if(userInfo!=null && userInfo.getReportPermissions()!=null && userInfo.getReportPermissions().contains("SDG Report")) { %>
								<li class="nav-item font-weight-bold"><a href="SDGReport.jsp" class="nav-link">SDG Tracking</a></li>
							<% } %>	
								<% if(userInfo!=null && userInfo.getReportPermissions()!=null && userInfo.getReportPermissions().contains("MRV Report")) { %>
								<li class="nav-item font-weight-bold"><a href="getMRVProject" class="nav-link">MRV Tracking</a></li>
							<% } %>	
							</ul>
						</li>
						<% } %>
						
						<% if(userInfo!=null && !userInfo.getRole().equals("User")) { %>
						<li class="nav-item-divider"></li>
						<% if(userInfo!=null && userInfo.getRole().equals("ADMIN")) { %>								
						
						<li class="nav-item text-uppercase"><a href="getAdminDashboard" class="nav-link font-weight-bold"><i class="fas fa-clipboard-list mr-3 fa-1x font-weight-bold"></i><span>User List</span></a></li>
						<% } %>
						
						<% if(userInfo!=null && !userInfo.getRole().equals("User")) { %>	
						<li class="nav-item text-uppercase"><a href="getPendingApprovals" class="nav-link font-weight-bold"><i class="fas fa-check-circle mr-3 fa-1x font-weight-bold"></i><span>My Approvals</span></a></li>
					<% } %>
					<% } %>
					
							<!-- /layout -->
								
						</ul>
					</div>
					<!-- /main navigation -->

				</div>
			</div>
			<!-- /sidebar content -->
			
		</div>
<script> 


function openNewWindow()
{
    window.open("global_assets/User Manual- South Sudan Integrated MRV Tool (Version 1.0) - Feb 2022.pdf")
    }
function openNewWindowFaq()
{
    window.open("global_assets/FAQs_Integrated MRV Tool.pdf")
    }
    </script>		
		<!-- /main sidebar -->
	
	<!-- /page content -->

</body>
</html>