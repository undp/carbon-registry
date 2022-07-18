<%@page import="com.gambia.model.ghg.*"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Gambia's NDC MRV Tool</title>
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
		<script src="assets/js/app.js"></script>
	<script src="global_assets/js/demo_pages/form_select2.js"></script>
	<script src="global_assets/js/demo_pages/components_modals.js"></script>
	<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />

<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
	<div class="card border-slate">
					<div class="card-header bg-slate-700">
						<h5 class="card-title text-uppercase text-center">Welcome</h5>
						</div>
							<div class="card-body">
							<div class="card-deck">
								
							<div class="card card-body text-center">
							<div class="mb-1">
							<h5 class="font-weight-semibold mb-0 mt-1">GHG Inventory</h5>
							</div>
							<a class="d-inline-block mb-1"><img src="global_assets/images/Tabs/GHG.png" class="" width="40" height="40" alt=""></a>
							<div class="btn-group justify-content-center">
							<a href="#" class="btn bg-slate-700 dropdown-toggle" data-toggle="dropdown">Select Sector</a>
							<div class="dropdown-menu">
							
							<div class="dropdown-submenu dropdown-submenu-right">
							<a href="#" class="dropdown-item dropdown-toggle">Energy</a>
							<div class="dropdown-menu">
							<a href="getGHGInputReferenceEnergy" class="dropdown-item">Reference Approach</a>
							<div class="dropdown-submenu dropdown-submenu-right">
							<a href="#" class="dropdown-item dropdown-toggle">Sectoral Approach</a>
							<div class="dropdown-menu">
							<a href="getGHGInputEnergy?subSector=1.A.1-Energy Industries" class="dropdown-item">Energy Industries</a>
							<a href="getGHGInputEnergy?subSector=1.A.2-Manufacturing Industries and Construction" class="dropdown-item">Manufacturing</a>
							<a href="getGHGInputEnergy?subSector=1.A.3-Transport" class="dropdown-item">Transport</a>
							<a href="getGHGInputEnergy?subSector=1.A.4-Other" class="dropdown-item">Other Sectors</a>
							</div></div></div></div>
													
							<div class="dropdown-submenu dropdown-submenu-right">
							<a href="#" class="dropdown-item dropdown-toggle">IPPU</a>
							<div class="dropdown-menu">
							<a href="getGHGInputLubricant?subSector=2.D.1-Lubricant Use" class="dropdown-item">Lubricant Use</a>
							<a href="getGHGInputSolvent?subSector=2.D.3-Solvent Use" class="dropdown-item">Solvent Use</a>
							<a href="getGHGInputRefrigeration?subSector=2.F.1-Refrigeration and Air Conditioning" class="dropdown-item">Refrigeration and Air Conditioning</a>
							</div></div>
										
							<div class="dropdown-submenu dropdown-submenu-right">
							<a href="#" class="dropdown-item dropdown-toggle">AFOLU</a>
							<div class="dropdown-menu">
							<div class="dropdown-submenu dropdown-submenu-right">
							<a href="#" class="dropdown-item dropdown-toggle">Livestock</a>
							<div class="dropdown-menu">
							<a href="getGHGInputEnteric?subSector=3.A.1-Enteric Fermentation" class="dropdown-item">Enteric Fermentation</a>
							<a href="getGHGInputMM?subSector=3.A.2-Manure Management" class="dropdown-item">Manure Management</a>
							</div></div>
										
							<div class="dropdown-submenu dropdown-submenu-right">
							<a href="#" class="dropdown-item dropdown-toggle">Land</a>
							<div class="dropdown-menu">
							<a href="getGHGInputForestLand?subSector=3.B.1-Forest Land" class="dropdown-item">Forest Land</a>
							<a href="getGHGInputCropland?subSector=3.B.2-Cropland" class="dropdown-item">Cropland</a>
							<a href="getGHGInputGrassland?subSector=3.B.3-Grassland" class="dropdown-item">Grassland</a>
							<a href="getGHGInputWetland?subSector=3.B.4-Wetlands" class="dropdown-item">Wetlands</a>
							<a href="getGHGInputSettlement?subSector=3.B.5-Settlements" class="dropdown-item">Settlements</a>
							<a href="getGHGInputOtherLand?subSector=3.B.6-Other Land" class="dropdown-item">Other Lands</a>
							</div></div>
										
							<div class="dropdown-submenu dropdown-submenu-right">
							<a href="#" class="dropdown-item dropdown-toggle">Aggregate Sources and non CO<sub>2</sub> Emissions</a>
							<div class="dropdown-menu">
							<a href="getGHGMappingBiomassBurning?subSector=3.C.1-Emissions from Biomass Burning" class="dropdown-item">Biomass Burning</a>
							<a href="getGHGInputIndirectN2O?subSector=3.C.6-Indirect N2O emissions from manure management" class="dropdown-item">Indirect N<sub>2</sub>O emissions</a>
							</div></div>
							
							</div></div>
												
							<div class="dropdown-submenu dropdown-submenu-right">
							<a href="#" class="dropdown-item dropdown-toggle">Waste</a>
							<div class="dropdown-menu">
							<a href="getGHGMappingSolidWaste?subSector=4.A-Solid Waste Disposal" class="dropdown-item">Solid Waste Disposal</a>
							<a href="getGHGMappingBiological?subSector=4.B-Biological Treatment" class="dropdown-item">Biological Treatment</a>
							<a href="getGHGMappingIncineration?subSector=4.C-Incineration and Open Burning of Waste" class="dropdown-item">Incineration and Open Burning</a>
							<a href="getGHGMappingWasteWater?subSector=4.D-Domestic Wastewaster Treatment and Discharge" class="dropdown-item">Waste Water Treatment</a>
							</div></div>
								
							</div></div></div>
												
							<div class="card card-body text-center">
							<div class="mb-1">
							<h5 class="font-weight-semibold mb-0 mt-1">NDC Action</h5>
							</div>
							<a href="#" class="d-inline-block mb-1"><img src="global_assets/images/Tabs/Project1.png" class="" width="40" height="40" alt=""></a>
							<div class="btn-group justify-content-center">
							<a href="openSearchProject" class="btn bg-slate-700" data-toggle="dropdown">Search NDC Action</a>
							</div></div>
							
							<div class="card card-body text-center">
							<div class="mb-1">
							<h5 class="font-weight-semibold mb-0 mt-1">Mitigation Actions</h5>
							</div>
							<a href="#" class="d-inline-block mb-1"><img src="global_assets/images/Tabs/Mitigation2.png" class="" width="40" height="40" alt=""></a>
							<div class="btn-group justify-content-center">
							<a href="#" class="btn bg-slate-700 dropdown-toggle" data-toggle="dropdown">Mitigation Information</a>
							<div class="dropdown-menu">
							<a href="searchProjects?module=mitigationInput" class="dropdown-item">Project Information</a>
							<a href="#" class="dropdown-item">Monitoring Information</a>
							</div></div></div>
							
							<div class="card card-body text-center">
							<div class="mb-1">
							<h5 class="font-weight-semibold mb-0 mt-1">Adaptation Actions</h5>
							</div>
							<a href="#" class="d-inline-block mb-1"><img src="global_assets/images/Tabs/Adaptation1.png" class="" width="40" height="40" alt=""></a>
							<div class="btn-group justify-content-center">
							<a href="#" class="btn bg-slate-700 dropdown-toggle" data-toggle="dropdown">Adaptation Information</a>
							<div class="dropdown-menu">
							<a href="#" class="dropdown-item">Project Information</a>
							<a href="#" class="dropdown-item">Monitoring Information</a>
							</div></div></div>
							
							</div>
							<br>
							<div class="card-deck">
								
							<div class="card card-body text-center">
							<div class="mb-1">
							<h5 class="font-weight-semibold mb-0 mt-1">Climate Finance</h5>
							</div>
							<a href="#" class="d-inline-block mb-1"><img src="global_assets/images/Tabs/Finance.png" class="" width="34" height="34" alt=""></a>
							<div class="btn-group justify-content-center">
							<a href="#" class="btn bg-slate-700 dropdown-toggle" data-toggle="dropdown">Finance Information</a>
							<div class="dropdown-menu">
							<a href="#" class="dropdown-item">Project Information</a>
							<a href="#" class="dropdown-item">Monitoring Information</a>
							</div></div></div>
							
							<div class="card card-body text-center">
							<div class="mb-1">
							<h5 class="font-weight-semibold mb-0 mt-1">SDG Assessment</h5>
							</div>
							<a href="#" class="d-inline-block mb-1"><img src="global_assets/images/Tabs/SDG1.png" class="" width="34" height="34" alt=""></a>
							<div class="btn-group justify-content-center">
							<a href="#" class="btn bg-slate-700 dropdown-toggle" data-toggle="dropdown">SDG Information</a>
							<div class="dropdown-menu">
							<a href="#" class="dropdown-item">Project Information</a>
							<a href="#" class="dropdown-item">Monitoring Information</a>
							</div></div></div>
							
							<div class="card card-body text-center">
							<div class="mb-1">
							<h5 class="font-weight-semibold mb-0 mt-1">Databases</h5>
							</div>
							<a href="#" class="d-inline-block mb-1"><img src="global_assets/images/Tabs/Database.png" class="" width="34" height="34" alt=""></a>
							<div class="btn-group justify-content-center">
							<a href="#" class="btn bg-slate-700 dropdown-toggle" data-toggle="dropdown">Select Database</a>
							<div class="dropdown-menu">
							<a href="#" class="dropdown-item">Population</a>
							<a href="#" class="dropdown-item">Livestock Population</a>
							<a href="#" class="dropdown-item">Emission Factor - Fuel</a>
							<a href="#" class="dropdown-item">Emission Factor - Livestock</a>
							<a href="#" class="dropdown-item">GWP Database</a>
							</div></div></div>
							
							<div class="card card-body text-center">
							<div class="mb-1">
							<h5 class="font-weight-semibold mb-0 mt-1">Reports</h5>
							</div>
							<a href="#" class="d-inline-block mb-1"><img src="global_assets/images/Tabs/Report.png" class="" width="34" height="34" alt=""></a>
							<div class="btn-group justify-content-center">
							<a href="#" class="btn bg-slate-700 dropdown-toggle" data-toggle="dropdown">Select Report</a>
							<div class="dropdown-menu">
							<a href="#" class="dropdown-item">GHG Inventory</a>
							<a href="#" class="dropdown-item">Mitigation Tracking</a>
							<a href="#" class="dropdown-item">Adaptation Tracking</a>
							<a href="#" class="dropdown-item">Finance Tracking</a>
							<a href="#" class="dropdown-item">SDG Tracking</a>
							<a href="#" class="dropdown-item">MRV Tracking</a>
							</div></div></div>
							
						</div></div>
						</div></div> 
</div></body> 
    
</html>
