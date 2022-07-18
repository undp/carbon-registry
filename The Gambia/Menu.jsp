<%@page import="com.gambia.model.user.UserReg"%>
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
 	UserReg userinfo = null;
 	
	    if(request.getAttribute("userInfo")!=null){
	    	userinfo = (UserReg)request.getAttribute("userInfo");
	    	session.setAttribute("userInfo", userinfo);
	    	session.setAttribute("userEmailId", userinfo.getEmailId());
	    	
	    }
	    userinfo = (UserReg)session.getAttribute("userInfo");
   %>
<body class="navbar-md-md-top">

	<!-- Main navbar -->
	<div class="fixed-top">

		<!-- Main navbar -->
		<div class="navbar navbar-expand-md navbar-light bg-slate-700">
			<div class="navbar-nav" >
			<a href="" style="margin-left:20px; margin-right:180px;">
				<img src="global_assets/images/Gambia.png">
			</a>
			
		</div>

			<div class="d-md-none">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
				<i class="icon-tree5"></i>
			</button>
			<button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
				<i class="icon-paragraph-justify3 bg-white"></i>
			</button>
		</div>

			<div class="collapse navbar-collapse" id="navbar-mobile">
				<ul class="navbar-nav">
				<li class="nav-item">
					<a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
						<i class="icon-paragraph-justify3 bg-white"></i>
					</a>
				</li></ul>
<ul class="navbar-nav">
					<li class="nav-item" style="margin-left:230px; margin-top:10px">
						<h4><a href="#" class="text-white text-center text-uppercase">
							Gambia's Climate Action Impact Assessment MRV Tool</a></h4>
						
					</li></ul>
				
			</div>
		</div>
		<!-- /main navbar -->


		<!-- Alternative navbar -->
		<div class="navbar navbar-expand-md navbar-light">
			
			<div class="navbar-collapse collapse" id="navbar-second">
				<ul class="navbar-nav">
					<li class="nav-item">
					<a href="Tabs.jsp" class="navbar-nav-link font-size-lg font-weight-bold"><i class="fas fa-home mr-3 fa-1x"></i> Home</a>
						
					</li>
					
					
				</ul>

				<ul class="navbar-nav ml-md-auto">
					<li class="nav-item">
						<a href="download" download="proposed_file_name" class="navbar-nav-link"><i class="icon-book mr-2"></i>
							User Manual
							
						</a>
					</li>
					<li class="nav-item">
						<a href="Login.jsp" class="navbar-nav-link"><i class="icon-switch2 mr-2"></i>
							Logout
							</a>
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
					<div class="card-body p-0">
					
						<ul class="nav nav-sidebar" data-nav-type="accordion">

							<!-- Main -->
							<li class="nav-item-header mt-0"><div class="text-uppercase text-dark font-size-lg font-weight-bold">Menu</div></li>
							
							
							<!-- /main -->

							<!-- Layout -->
								
					<% if(userinfo!=null && !userinfo.getRole().equals("Nodal Officer") && userinfo.getGhgPermissions()!=null) { %>
							
								<li class="nav-item nav-item-submenu">
						
							<a href="#" class="text-uppercase nav-link"><i class="fas fa-industry mr-3 fa-1x"></i><span>GHG Inventory</span></a>

							<ul class="nav nav-group-sub" data-submenu-title="GHG Inventory">
					  <c:forEach var="permissionList" items="${userInfo.ghgPermissions}">

									
						<c:if test="${permissionList=='Energy'}">
								
								<li class="nav-item nav-item-submenu">
								<a href="#" class="nav-link"><span>Energy</span></a>
								<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
								
									<li class="nav-item"><a href="getGHGInputReferenceEnergy" class="nav-link"> Reference Approach</a></li>
									<li class="nav-item nav-item-submenu">
										<a href="#" class="nav-link">Sectoral Approach</a>
										<ul class="nav nav-group-sub">
										<li class="nav-item nav-item-submenu">
										<a href="#" class="nav-link">Energy Industries</a>
											<ul class="nav nav-group-sub">
											<li class="nav-item"><a href="getGHGInputEnergy?subSector=1.A.1-Energy Industries&subCategory=1.A.1.a.i-Electricity Generation" class="nav-link">Electricity Generation</a></li>
											<li class="nav-item"><a href="getGHGInputSolidFuel?subSector=1.A.1-Energy Industries&subCategory=1.A.1.c-Manufacture of Solid Fuels and Other Energy Industries" class="nav-link">Production of Solid Fuels</a></li>
											</ul>
											</li>
											<li class="nav-item"><a href="getGHGInputEnergy?subSector=1.A.2-Manufacturing Industries and Construction&subCategory=" class="nav-link"> Manufacturing</a></li>
											<li class="nav-item"><a href="getGHGInputEnergy?subSector=1.A.3-Transport&subCategory=" class="nav-link"> Transport</a></li>
											<li class="nav-item"><a href="getGHGInputEnergy?subSector=1.A.4-Other Sectors&subCategory=" class="nav-link"> Others</a></li>
										</ul>
									</li>
								</ul>
							</li>
						</c:if>
						
						<c:if test="${permissionList=='IPPU'}">
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link"><span>IPPU</span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
							<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">Mineral Industry</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGInputCement?subSector=2.A.1-Cement Production" class="nav-link">Cement Production</a></li>
										<li class="nav-item"><a href="getGHGInputLime?subSector=2.A.2-Lime Production" class="nav-link">Lime Production</a></li>
										
									</ul>
								</li>
							<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">Non - Energy Products from Fuels and Solvent Use</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGInputLubricant?subSector=2.D.1-Lubricant Use" class="nav-link"> Lubricant Use</a></li>
										<li class="nav-item"><a href="getGHGInputSolvent?subSector=2.D.3-Solvent Use" class="nav-link"> Solvent Use</a></li>
										
									</ul>
								</li>
								
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">Product Uses as Substitutes for Ozone Depleting Substances</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGInputRefrigeration?subSector=2.F.1-Refrigeration and Air Conditioning" class="nav-link"> Refrigeration and Air Conditioning</a></li>
									</ul>
								</li>
								
								<!-- <li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">Other</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGInputFoodBev?subSector=2.H.2-Food and Beverages Industry" class="nav-link">Food and Beverages Industry</a></li>
									</ul>
								</li> -->
								
								</ul>
						</li></c:if>
						<c:if test="${permissionList=='AFOLU'}">
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link"><span>AFOLU</span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">Livestock</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGInputEnteric?subSector=3.A.1-Enteric Fermentation" class="nav-link"> Enteric Fermentation</a></li>
										<li class="nav-item"><a href="getGHGInputMM?subSector=3.A.2-Manure Management" class="nav-link"> Manure Management</a></li>
										</ul>
								</li>
								
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">Land</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGInputForestLand?subSector=3.B.1-Forest Land" class="nav-link"> Forest Land</a></li>
										<li class="nav-item"><a href="getGHGInputCropland?subSector=3.B.2-Cropland" class="nav-link"> Cropland</a></li>
										<li class="nav-item"><a href="getGHGInputGrassland?subSector=3.B.3-Grassland" class="nav-link"> Grassland</a></li>
										<li class="nav-item"><a href="getGHGInputWetland?subSector=3.B.4-Wetlands" class="nav-link"> Wetland</a></li>
										<li class="nav-item"><a href="getGHGInputSettlement?subSector=3.B.5-Settlements" class="nav-link"> Settlements</a></li>
										<li class="nav-item"><a href="getGHGInputOtherLand?subSector=3.B.6-Other Land" class="nav-link"> Other Lands</a></li>
									</ul>
								</li>
								
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">Aggregate Sources & non-CO2 Emissions Sources on Land</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGMappingBiomassBurning?subSector=3.C.1-Emissions from Biomass Burning" class="nav-link"> Emissions from Biomass Burning</a></li>
										<li class="nav-item"><a href="getGHGInputIndirectN2O?subSector=3.C.6-Indirect N2O emissions from manure management" class="nav-link"> Indirect N2O emissions from Manure Management</a></li>
												<li class="nav-item"><a href="getGHGInputRice?subSector=3.C.7-Rice Cultivation" class="nav-link">Rice Cultivation</a></li>
										</ul>
								</li>
								</ul>
						</li></c:if>
						<c:if test="${permissionList=='Waste'}">
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link"><span>Waste</span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
								<li class="nav-item"><a href="getGHGMappingSolidWaste?subSector=4.A-Solid Waste Disposal" class="nav-link">Solid Waste Disposal</a></li>
								<li class="nav-item"><a href="getGHGMappingBiological?subSector=4.B-Biological Treatment" class="nav-link">Biological Treatment of Solid Waste</a></li>
								<li class="nav-item"><a href="getGHGMappingIncineration?subSector=4.C-Incineration and Open Burning of Waste" class="nav-link">Incineration and Open Burning of Waste</a></li>
								<li class="nav-item"><a href="getGHGMappingWasteWater?subSector=4.D-Domestic Wastewaster Treatment and Discharge" class="nav-link">Wastewater Treatment and Discharge</a></li>
							</ul>
						</li></c:if>
						</c:forEach>
						
							</ul></li>
							<% } %>
							
						
						<% if(userinfo!=null && !userinfo.getRole().equals("Nodal Officer") && userinfo.getProjectPermissions()!=null && userinfo.getProjectPermissions().contains("Project")) { %>
						
						<li class="nav-item text-uppercase"><a href="getProjectList" class="nav-link"><i class="fas fa-pen mr-3 fa-1x"></i><span>NDC Actions</span></a></li>

						<% } %>

						<% if(userinfo!=null && !userinfo.getRole().equals("Nodal Officer") && userinfo.getProjectPermissions()!=null && userinfo.getProjectPermissions().contains("Mitigation")) { %>
						
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link text-uppercase"><i class="fas fa-cloud mr-3 fa-1x"></i> <span>Mitigation Actions</span></a>

							<ul class="nav nav-group-sub" data-submenu-title="Mitigation Actions">
								<li class="nav-item"><a href="searchProjects?module=mitigationInput" class="nav-link">Project Information</a></li>
								<li class="nav-item"><a href="searchProjects?module=mitigationMonitoring" class="nav-link">Monitoring Information</a></li>
								</ul>
						</li>
						
						<% } %>
						<% if(userinfo!=null && !userinfo.getRole().equals("Nodal Officer") && userinfo.getProjectPermissions()!=null && userinfo.getProjectPermissions().contains("Adaptation")) { %>

							<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link text-uppercase"><i class="fas fa-universal-access mr-3 fa-1x"></i> <span>Adaptation Actions</span></a>

							<ul class="nav nav-group-sub" data-submenu-title="Adaptation Actions">
								<li class="nav-item"><a href="searchProjects?module=adaptation" class="nav-link">Project Information</a></li>
								<li class="nav-item"><a href="searchProjects?module=adaptationMonitoring" class="nav-link">Monitoring Information</a></li>
								</ul>
						</li>
						<% } %>
						
						<% if(userinfo!=null && !userinfo.getRole().equals("Nodal Officer") && userinfo.getProjectPermissions()!=null && userinfo.getProjectPermissions().contains("Finance")) { %>
						
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link text-uppercase"><i class="fas fa-money-bill-wave mr-3 fa-1x"></i> <span>Climate Finance</span></a>

							<ul class="nav nav-group-sub" data-submenu-title="Climate Finance">
								<li class="nav-item"><a href="searchProjects?module=financeInput" class="nav-link">Project Information</a></li>
								<li class="nav-item"><a href="searchProjects?module=financeMonitoring" class="nav-link">Monitoring Information</a></li>
								</ul>
						</li>
						<% } %>
						<% if(userinfo!=null && !userinfo.getRole().equals("Nodal Officer") && userinfo.getProjectPermissions()!=null && userinfo.getProjectPermissions().contains("SDG")) { %>
						
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link text-uppercase"><i class="fas fa-globe mr-3 fa-1x"></i> <span>SDG Assessment</span></a>

							<ul class="nav nav-group-sub" data-submenu-title="SDG Assessment">
								<li class="nav-item"><a href="searchProjects?module=sdg" class="nav-link">Project Information</a></li>
								<li class="nav-item"><a href="searchProjects?module=sdgMonitoring" class="nav-link">Monitoring Information</a></li>
								</ul>
						</li>
						<% } %>
						<% if(userinfo!=null && userinfo.getRole().equals("ADMIN")) { %>
						<li class="nav-item-divider"></li>
						<li class="nav-item nav-item-submenu">
						<a href="#" class="nav-link text-uppercase"><i class="fas fa-database mr-3 fa-1x"></i> <span>Database</span></a>
							<ul class="nav nav-group-sub" data-submenu-title="Menu levels">
							<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">Energy</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGFuelMapping" class="nav-link">Emission Factor - Fuel</a></li>
									</ul>
								</li>
							<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">IPPU</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGIPPUEmissionFactor" class="nav-link">Emission Factor - IPPU</a></li>
										<li class="nav-item"><a href="getGHGGWP" class="nav-link">GWP Database</a></li>
										
									</ul>
								</li>
								
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">AFOLU</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getLivestockPopulation" class="nav-link"> Livestock Population</a></li>
										<li class="nav-item"><a href="getLivestockDatabase" class="nav-link">Emission Factor - Livestock</a></li>
									</ul>
								</li>
								
								<li class="nav-item nav-item-submenu">
									<a href="#" class="nav-link">Waste</a>
									<ul class="nav nav-group-sub">
										<li class="nav-item"><a href="getGHGPopulation?year=" class="nav-link">Population</a></li>
									</ul>
								</li>
								
								</ul>
						</li>	
						<% } %>							
					<% if(userinfo!=null && userinfo.getReportPermissions()!=null && userinfo.getReportPermissions().contains("Report")) { %>
					
						<li class="nav-item nav-item-submenu">
							<a href="#" class="nav-link text-uppercase"><i class="fas fa-chart-area mr-3 fa-1x"></i> <span>Reports</span></a>

							<ul class="nav nav-group-sub" data-submenu-title="Reports">
							<% if(userinfo!=null && userinfo.getReportPermissions()!=null && userinfo.getReportPermissions().contains("GHG Report")) { %>
								<li class="nav-item nav-item-submenu">
								<a href="#" class="nav-link">GHG Inventory</a>
								<ul class="nav nav-group-sub">
								<li class="nav-item"><a href="getGHGOutputYears" class="nav-link">GHG Inventory (Year wise)</a></li>
								<li class="nav-item"><a href="getGHGOutputGasYears" class="nav-link">GHG Inventory (Gas wise)</a></li>
								</ul>
							<% } %>
							
							<% if(userinfo!=null && userinfo.getReportPermissions()!=null && userinfo.getReportPermissions().contains("Mitigation Report")) { %>
								<li class="nav-item"><a href="getMitigationYears" class="nav-link">Mitigation Tracking</a></li>
							<% } %>	
								<% if(userinfo!=null && userinfo.getReportPermissions()!=null && userinfo.getReportPermissions().contains("Adaptation Report")) { %>
								<li class="nav-item"><a href="AdaptationReport.jsp" class="nav-link">Adaptation Tracking</a></li>
							<% } %>
								<% if(userinfo!=null && userinfo.getReportPermissions()!=null && userinfo.getReportPermissions().contains("Finance Report")) { %>
								<li class="nav-item"><a href="getFinanceYears" class="nav-link">Finance Tracking</a></li>
							<% } %>	
								<% if(userinfo!=null && userinfo.getReportPermissions()!=null && userinfo.getReportPermissions().contains("SDG Report")) { %>
								<li class="nav-item"><a href="SDGReport.jsp" class="nav-link">SDG Tracking</a></li>
							<% } %>	
								<% if(userinfo!=null && userinfo.getReportPermissions()!=null && userinfo.getReportPermissions().contains("MRV Report")) { %>
								<li class="nav-item"><a href="getMRVProject" class="nav-link">MRV Tracking</a></li>
							<% } %>	
							</ul>
						</li>
						<% } %>
						
						<% if(userinfo!=null && !userinfo.getRole().equals("User")) { %>
						<li class="nav-item-divider"></li>
						<% if(userinfo!=null && userinfo.getRole().equals("ADMIN")) { %>								
						
						<li class="nav-item text-uppercase"><a href="getAdminDashboard" class="nav-link"><i class="fas fa-clipboard-list mr-3 fa-1x"></i><span>User List</span></a></li>
						<% } %>
						
						<% if(userinfo!=null && !userinfo.getRole().equals("User")) { %>	
						<li class="nav-item text-uppercase"><a href="getPendingApprovals" class="nav-link"><i class="fas fa-user-check mr-3 fa-1x"></i><span>My Approvals</span></a></li>
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
		
		<!-- /main sidebar -->
	
	<!-- /page content -->

</body>
</html>