<%@page import="com.gambia.model.ghg.energy.*"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>GHG Inventory</title>
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
	<script src="global_assets/js/plugins/extensions/jquery_ui/interactions.min.js"></script>
	<script src="global_assets/js/plugins/extensions/jquery_ui/touch.min.js"></script>

	<script src="assets/js/app.js"></script>
	<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
	<script src="global_assets/js/demo_pages/form_select2.js"></script>
	<script src="global_assets/js/demo_pages/components_collapsible.js"></script>
	<script src="global_assets/js/demo_pages/ecommerce_customers.js"></script>
	<script src="global_assets/js/demo_charts/pages/ecommerce/light/customers.js"></script>
	<script src="global_assets/js/plugins/visualization/echarts/echarts.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script src="global_assets/js/demo_pages/form_layouts.js"></script>
	
	<script src="global_assets/js/plugins/tables/datatables/extensions/jszip/jszip.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/buttons.min.js"></script>
	
	<script src="global_assets/js/demo_pages/datatables_extension_buttons_htmlGHG.js"></script>
<!-- /theme JS files -->

</head>

<jsp:include page="Menu.jsp" />
<%
Date date = new Date();

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}
Map<String, GHGOutput> ghgOutputMap = null;
if(request.getAttribute("ghgOutputMap") !=null){	
	ghgOutputMap = (Map<String, GHGOutput>)request.getAttribute("ghgOutputMap");
}
%>
<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

<form action="getGHGOutputGas" method="post" class="form-horizontal bordered-row" data-parsley-validate="">
	<!-- 2 columns form -->
<div class="card border-slate">
	<div class="card-header bg-slate-700">
		<h5 class="card-title text-center">GHG Inventory Report ${ghgReportOptions.getUnit()}</h5>
	</div>

	<div class="card-body">
	  			<div class="card">
	  			    <div class="card-body">
                    	
							<div class="row">
								<div class="col-md-4">
									<fieldset>
										<legend class="font-weight-semibold text-center">Select Inventory Year</legend>
										
				
					
					
						
						<div class="form-group row">
											<div class="col-lg-12">
							<select name="fromYear" required data-placeholder="--Select Year--" class="form-control select" id="fromYear" data-fouc>
						  	<c:if test = "${ghgReportOptions.getFromYear() eq null }">
						   	<option></option>
						   	</c:if>
   							<option value="${ghgReportOptions.getFromYear()}">${ghgReportOptions.getFromYear()}</option>
   							<c:forEach var="listValue" items="${years}">
							<c:if test = "${listValue ne selectedYear }">
							<option value="${listValue}">${listValue}</option>
							</c:if>
							</c:forEach>
    						</select>
						</div>
						
					</div>
				
										
							</fieldset>
								</div>
								<div class="col-md-3 offset-md-1">
								<fieldset>
					                	<legend class="font-weight-semibold text-center">Select Inventory Unit</legend>

										<div class="form-group row">

											<div class="col-lg-12">
												<select name="unit" class="form-control select" data-placeholder="--Select--"  id = "unit" required>
												<c:if test = "${ghgReportOptions.getUnit() eq null }">
											   	<option></option>
											   	</c:if>
					   							<option value="${ghgReportOptions.getUnit()}">${ghgReportOptions.getUnit()}</option>
												<option>tCO<sub>2</sub>e</option>
												<option>GgCO<sub>2</sub>e</option>
												</select>
											</div>
										</div>
							</fieldset>
								</div>
								<div class="col-md-1">
								</div>
								<div class="col-md-2">
								<br><br>
								<button class="btn btn-sm bg-slate-700" style="margin-top:12px;">Get Report</button>
							</div>
							</div>
					</div></div>
										
<div class="card">
<div class="card-header header-elements-inline">
						<h6 class="card-title text-center">GHG Inventory ${ghgReportOptions.getUnit()}</h6>
						<div class="header-elements ">
							<div class="list-icons">
		                		<a class="list-icons-item" data-action="collapse"></a>
		                	</div>
	                	</div>
					</div>
					<div class="card-body">
<div id="number_format_chart"></div>
 </div></div>
          
<div class="form-group">
					<div id = "energy">
      				<div class="card">
      				<div class="card-header header-elements-inline">
						<h6 class="card-title">GHG Inventory Table</h6>
						<div class="header-elements">
							<div class="list-icons">
		                		<a class="list-icons-item" data-action="collapse"></a>
		                	</div>
	                	</div>
					</div>
                    <div class="card-body" id="ghgTable" >
                    <div class="table-responsive">
						<table id="data-table" class="table table-bordered datatable-button-html5-basic">
	                    
                            <thead>
                            <tr class="bg-slate-700">
                                <th>Year</th>
                                <th>CO<sub>2</sub> Emissions</th>
                                <th>CH<sub>4</sub> Emissions</th>
                                <th>N<sub>2</sub>O Emissions</th>
								<th>Total Emissions (CO<sub>2</sub>e)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="entry" items="${ghgOutputMap}">
                            <tr class="font-size-lg">
								<td><a data-toggle="collapse" class="text-default text-uppercase" href="#collapsible-item-nested-parent${entry.key}"><b>Year ${entry.key}</b></a></td>
								<td>${entry.value.getTotal().get("Total").getCo2Emission()}</td>
								<td>${entry.value.getTotal().get("Total").getCh4Emission()}</td>
								<td>${entry.value.getTotal().get("Total").getN2oEmission()}</td>
								<td>${entry.value.getTotal().get("Total").getTotalEmission()}</td>
										
							</tr>
                            <tr class="font-size-lg collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-left"><b>1-Energy</b></td>
								<td>${entry.value.getEnergy().get("1-Energy").getCo2Emission()}</td>
								<td>${entry.value.getEnergy().get("1-Energy").getCh4Emission()}</td>
								<td>${entry.value.getEnergy().get("1-Energy").getN2oEmission()}</td>
								<td>${entry.value.getEnergy().get("1-Energy").getTotalEmission()}</td>
							</tr>
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>1.A-Fuel Combustion</b></td>
								<td>${entry.value.getFuelCombustion().get("1.A-Fuel Combustion Activities").getCo2Emission()}</td>
								<td>${entry.value.getFuelCombustion().get("1.A-Fuel Combustion Activities").getCh4Emission()}</td>
								<td>${entry.value.getFuelCombustion().get("1.A-Fuel Combustion Activities").getN2oEmission()}</td>
								<td>${entry.value.getFuelCombustion().get("1.A-Fuel Combustion Activities").getTotalEmission()}</td>
							</tr>	
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">1.A.1-Energy Industries</td>
								<td>${entry.value.getEnergyIndustries().get("1.A.1-Energy Industries").getCo2Emission()}</td>
								<td>${entry.value.getEnergyIndustries().get("1.A.1-Energy Industries").getCh4Emission()}</td>
								<td>${entry.value.getEnergyIndustries().get("1.A.1-Energy Industries").getN2oEmission()}</td>
								<td>${entry.value.getEnergyIndustries().get("1.A.1-Energy Industries").getTotalEmission()}</td>
							</tr>
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">1.A.2-Manufacturing Industries and Construction</td>
								<td>${entry.value.getManufacturing().get("1.A.2-Manufacturing Industries and Construction").getCo2Emission()}</td>
								<td>${entry.value.getManufacturing().get("1.A.2-Manufacturing Industries and Construction").getCh4Emission()}</td>
								<td>${entry.value.getManufacturing().get("1.A.2-Manufacturing Industries and Construction").getN2oEmission()}</td>
								<td>${entry.value.getManufacturing().get("1.A.2-Manufacturing Industries and Construction").getTotalEmission()}</td>

							</tr>
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">1.A.3-Transport</td>
								<td>${entry.value.getTransport().get("1.A.3-Transport").getCo2Emission()}</td>
								<td>${entry.value.getTransport().get("1.A.3-Transport").getCh4Emission()}</td>
								<td>${entry.value.getTransport().get("1.A.3-Transport").getN2oEmission()}</td>
								<td>${entry.value.getTransport().get("1.A.3-Transport").getTotalEmission()}</td>
							</tr>
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">1.A.4-Other Sectors</td>
								<td>${entry.value.getOthers().get("1.A.4-Other Sectors").getCo2Emission()}</td>
								<td>${entry.value.getOthers().get("1.A.4-Other Sectors").getCh4Emission()}</td>
								<td>${entry.value.getOthers().get("1.A.4-Other Sectors").getN2oEmission()}</td>
								<td>${entry.value.getOthers().get("1.A.4-Other Sectors").getTotalEmission()}</td>
							</tr>
							<tr class="font-size-lg collapse" id="collapsible-item-nested-parent${entry.key}">
								<td><b>2-Industrial Processes and Product Use</b></td>
								<td>${entry.value.getIppu().get("2-Industrial Processes and Product Use").getCo2Emission()}</td>
								<td>${entry.value.getIppu().get("2-Industrial Processes and Product Use").getCh4Emission()}</td>
								<td>${entry.value.getIppu().get("2-Industrial Processes and Product Use").getN2oEmission()}</td>
								<td>${entry.value.getIppu().get("2-Industrial Processes and Product Use").getTotalEmission()}</td>
							</tr>
								
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
							<td class="text-center"><b>2.A-Mineral Industry</b></td>
							<td>${entry.value.getMineral().get("2.A-Mineral Industry").getCo2Emission()}</td>
							<td>${entry.value.getMineral().get("2.A-Mineral Industry").getCh4Emission()}</td>
							<td>${entry.value.getMineral().get("2.A-Mineral Industry").getN2oEmission()}</td>
							<td>${entry.value.getMineral().get("2.A-Mineral Industry").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">2.A.1-Cement Production</td>
								<td>${entry.value.getCement().get("2.A.1-Cement Production").getCo2Emission()}</td>
								<td>${entry.value.getCement().get("2.A.1-Cement Production").getCh4Emission()}</td>
								<td>${entry.value.getCement().get("2.A.1-Cement Production").getN2oEmission()}</td>
								<td>${entry.value.getCement().get("2.A.1-Cement Production").getTotalEmission()}</td>
							</tr>
								
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">2.A.2-Lime Production</td>
								<td>${entry.value.getLime().get("2.A.2-Lime Production").getCo2Emission()}</td>
								<td>${entry.value.getLime().get("2.A.2-Lime Production").getCh4Emission()}</td>
								<td>${entry.value.getLime().get("2.A.2-Lime Production").getN2oEmission()}</td>
								<td>${entry.value.getLime().get("2.A.2-Lime Production").getTotalEmission()}</td>
							</tr>
							
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>2.F-Product Uses as Substitutes for Ozone Depleting Substances</b></td>
								<td>${entry.value.getOds().get("2.F-Product Uses as Substitutes for Ozone Depleting Substances").getCo2Emission()}</td>
								<td>${entry.value.getOds().get("2.F-Product Uses as Substitutes for Ozone Depleting Substances").getCh4Emission()}</td>
								<td>${entry.value.getOds().get("2.F-Product Uses as Substitutes for Ozone Depleting Substances").getN2oEmission()}</td>
								<td>${entry.value.getOds().get("2.F-Product Uses as Substitutes for Ozone Depleting Substances").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">2.F.1-Refrigeration and Air Conditioning</td>
								<td>${entry.value.getRefrigeration().get("2.F.1-Refrigeration and Air Conditioning").getCo2Emission()}</td>
								<td>${entry.value.getRefrigeration().get("2.F.1-Refrigeration and Air Conditioning").getCh4Emission()}</td>
								<td>${entry.value.getRefrigeration().get("2.F.1-Refrigeration and Air Conditioning").getN2oEmission()}</td>
								<td>${entry.value.getRefrigeration().get("2.F.1-Refrigeration and Air Conditioning").getTotalEmission()}</td>
							</tr>	
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>2.D-Non-Energy Products from Fuels and Solvent Use</b></td>
								<td>${entry.value.getNonEnergy().get("2.D-Non-Energy Products from Fuels and Solvent Use").getCo2Emission()}</td>
								<td>${entry.value.getNonEnergy().get("2.D-Non-Energy Products from Fuels and Solvent Use").getCh4Emission()}</td>
								<td>${entry.value.getNonEnergy().get("2.D-Non-Energy Products from Fuels and Solvent Use").getN2oEmission()}</td>
								<td>${entry.value.getNonEnergy().get("2.D-Non-Energy Products from Fuels and Solvent Use").getTotalEmission()}</td>
							</tr>
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">2.D.1-Lubricant Use</td>
								<td>${entry.value.getLubricant().get("2.D.1-Lubricant Use").getCo2Emission()}</td>
								<td>${entry.value.getLubricant().get("2.D.1-Lubricant Use").getCh4Emission()}</td>
								<td>${entry.value.getLubricant().get("2.D.1-Lubricant Use").getN2oEmission()}</td>
								<td>${entry.value.getLubricant().get("2.D.1-Lubricant Use").getTotalEmission()}</td>
							</tr>
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">2.D.3-Solvent Use</td>
								<td>${entry.value.getSolvent().get("2.D.3-Solvent Use").getCo2Emission()}</td>
								<td>${entry.value.getSolvent().get("2.D.3-Solvent Use").getCh4Emission()}</td>
								<td>${entry.value.getSolvent().get("2.D.3-Solvent Use").getN2oEmission()}</td>
								<td>${entry.value.getSolvent().get("2.D.3-Solvent Use").getTotalEmission()}</td>
							</tr>	
							<tr class="font-size-lg collapse" id="collapsible-item-nested-parent${entry.key}">
								<td><b>3-Agriculture, Forestry and Other Land Use</b></td>
								<td>${entry.value.getAfolu().get("3-Agriculture, Forestry, and Other Land Use").getCo2Emission()}</td>
								<td>${entry.value.getAfolu().get("3-Agriculture, Forestry, and Other Land Use").getCh4Emission()}</td>
								<td>${entry.value.getAfolu().get("3-Agriculture, Forestry, and Other Land Use").getN2oEmission()}</td>
								<td>${entry.value.getAfolu().get("3-Agriculture, Forestry, and Other Land Use").getTotalEmission()}</td>
							</tr>
							
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>3.A-Livestock</b></td>
								<td>${entry.value.getLivestock().get("3.A-Livestock").getCo2Emission()}</td>
								<td>${entry.value.getLivestock().get("3.A-Livestock").getCh4Emission()}</td>
								<td>${entry.value.getLivestock().get("3.A-Livestock").getN2oEmission()}</td>
								<td>${entry.value.getLivestock().get("3.A-Livestock").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.A.1-Enteric Fermentation</td>
								<td>${entry.value.getEnteric().get("3.A.1-Enteric Fermentation").getCo2Emission()}</td>
								<td>${entry.value.getEnteric().get("3.A.1-Enteric Fermentation").getCh4Emission()}</td>
								<td>${entry.value.getEnteric().get("3.A.1-Enteric Fermentation").getN2oEmission()}</td>
								<td>${entry.value.getEnteric().get("3.A.1-Enteric Fermentation").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.A.2-Manure Management</td>
								<td>${entry.value.getManure().get("3.A.2-Manure Management").getCo2Emission()}</td>
								<td>${entry.value.getManure().get("3.A.2-Manure Management").getCh4Emission()}</td>
								<td>${entry.value.getManure().get("3.A.2-Manure Management").getN2oEmission()}</td>
								<td>${entry.value.getManure().get("3.A.2-Manure Management").getTotalEmission()}</td>
							</tr>
							
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>3.B-Land</b></td>
								<td>${entry.value.getLand().get("3.B-Land").getCo2Emission()}</td>
								<td>${entry.value.getLand().get("3.B-Land").getCh4Emission()}</td>
								<td>${entry.value.getLand().get("3.B-Land").getN2oEmission()}</td>
								<td>${entry.value.getLand().get("3.B-Land").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.B.1-Forest Land</td>
								<td>${entry.value.getForest().get("3.B.1-Forest Land").getCo2Emission()}</td>
								<td>${entry.value.getForest().get("3.B.1-Forest Land").getCh4Emission()}</td>
								<td>${entry.value.getForest().get("3.B.1-Forest Land").getN2oEmission()}</td>
								<td>${entry.value.getForest().get("3.B.1-Forest Land").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.B.2-Cropland</td>
								<td>${entry.value.getCropland().get("3.B.2-Cropland").getCo2Emission()}</td>
								<td>${entry.value.getCropland().get("3.B.2-Cropland").getCh4Emission()}</td>
								<td>${entry.value.getCropland().get("3.B.2-Cropland").getN2oEmission()}</td>
								<td>${entry.value.getCropland().get("3.B.2-Cropland").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.B.3-Grassland</td>
								<td>${entry.value.getGrassland().get("3.B.3-Grassland").getCo2Emission()}</td>
								<td>${entry.value.getGrassland().get("3.B.3-Grassland").getCh4Emission()}</td>
								<td>${entry.value.getGrassland().get("3.B.3-Grassland").getN2oEmission()}</td>
								<td>${entry.value.getGrassland().get("3.B.3-Grassland").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.B.4-Wetlands</td>
								<td>${entry.value.getWetland().get("3.B.4-Wetlands").getCo2Emission()}</td>
								<td>${entry.value.getWetland().get("3.B.4-Wetlands").getCh4Emission()}</td>
								<td>${entry.value.getWetland().get("3.B.4-Wetlands").getN2oEmission()}</td>
								<td>${entry.value.getWetland().get("3.B.4-Wetlands").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.B.5-Settlements</td>
								<td>${entry.value.getSettlement().get("3.B.5-Settlements").getCo2Emission()}</td>
								<td>${entry.value.getSettlement().get("3.B.5-Settlements").getCh4Emission()}</td>
								<td>${entry.value.getSettlement().get("3.B.5-Settlements").getN2oEmission()}</td>
								<td>${entry.value.getSettlement().get("3.B.5-Settlements").getTotalEmission()}</td>
							</tr>
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.B.6-Other Land</td>
								<td>${entry.value.getOtherLand().get("3.B.6-Other Land").getCo2Emission()}</td>
								<td>${entry.value.getOtherLand().get("3.B.6-Other Land").getCh4Emission()}</td>
								<td>${entry.value.getOtherLand().get("3.B.6-Other Land").getN2oEmission()}</td>
								<td>${entry.value.getOtherLand().get("3.B.6-Other Land").getTotalEmission()}</td>
							</tr>
							
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>3.C-Aggregate sources and non-CO2 emissions sources on land</b></td>
								<td>${entry.value.getAggregate().get("3.C-Aggregate sources and non-CO2 emissions sources on land").getCo2Emission()}</td>
								<td>${entry.value.getAggregate().get("3.C-Aggregate sources and non-CO2 emissions sources on land").getCh4Emission()}</td>
								<td>${entry.value.getAggregate().get("3.C-Aggregate sources and non-CO2 emissions sources on land").getN2oEmission()}</td>
								<td>${entry.value.getAggregate().get("3.C-Aggregate sources and non-CO2 emissions sources on land").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.C.1-Emissions from Biomass Burning</td>
								<td>${entry.value.getBiomassBurning().get("3.C.1-Emissions from Biomass Burning").getCo2Emission()}</td>
								<td>${entry.value.getBiomassBurning().get("3.C.1-Emissions from Biomass Burning").getCh4Emission()}</td>
								<td>${entry.value.getBiomassBurning().get("3.C.1-Emissions from Biomass Burning").getN2oEmission()}</td>
								<td>${entry.value.getBiomassBurning().get("3.C.1-Emissions from Biomass Burning").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.C.6-Indirect N<sub>2</sub>O emissions from manure management</td>
								<td>${entry.value.getIndirectn2o().get("3.C.6-Indirect N2O emissions from manure management").getCo2Emission()}</td>
								<td>${entry.value.getIndirectn2o().get("3.C.6-Indirect N2O emissions from manure management").getCh4Emission()}</td>
								<td>${entry.value.getIndirectn2o().get("3.C.6-Indirect N2O emissions from manure management").getN2oEmission()}</td>
								<td>${entry.value.getIndirectn2o().get("3.C.6-Indirect N2O emissions from manure management").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">3.C.7-Rice Cultivation</td>
								<td>${entry.value.getRice().get("3.C.7-Rice Cultivation").getCo2Emission()}</td>
								<td>${entry.value.getRice().get("3.C.7-Rice Cultivation").getCh4Emission()}</td>
								<td>${entry.value.getRice().get("3.C.7-Rice Cultivation").getN2oEmission()}</td>
								<td>${entry.value.getRice().get("3.C.7-Rice Cultivation").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-lg collapse" id="collapsible-item-nested-parent${entry.key}">
								<td><b>4-Waste</b></td>
								<td>${entry.value.getWaste().get("4-Waste").getCo2Emission()}</td>
								<td>${entry.value.getWaste().get("4-Waste").getCh4Emission()}</td>
								<td>${entry.value.getWaste().get("4-Waste").getN2oEmission()}</td>
								<td>${entry.value.getWaste().get("4-Waste").getTotalEmission()}</td>
							</tr>
							
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>4.A-Solid Waste Disposal</b></td>
								<td>${entry.value.getSolid().get("4.A-Solid Waste Disposal").getCo2Emission()}</td>
								<td>${entry.value.getSolid().get("4.A-Solid Waste Disposal").getCh4Emission()}</td>
								<td>${entry.value.getSolid().get("4.A-Solid Waste Disposal").getN2oEmission()}</td>
								<td>${entry.value.getSolid().get("4.A-Solid Waste Disposal").getTotalEmission()}</td>		
							</tr>
								
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>4.B-Biological Treatment</b></td>			
								<td>${entry.value.getBiological().get("4.B-Biological Treatment").getCo2Emission()}</td>	
								<td>${entry.value.getBiological().get("4.B-Biological Treatment").getCh4Emission()}</td>	
								<td>${entry.value.getBiological().get("4.B-Biological Treatment").getN2oEmission()}</td>	
								<td>${entry.value.getBiological().get("4.B-Biological Treatment").getTotalEmission()}</td>
								</tr>
							
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>4.C-Incineration and Open Burning of Waste</b></td>
								<td>${entry.value.getIncineration().get("4.C-Incineration and Open Burning of Waste").getCo2Emission()}</td>	
								<td>${entry.value.getIncineration().get("4.C-Incineration and Open Burning of Waste").getCh4Emission()}</td>	
								<td>${entry.value.getIncineration().get("4.C-Incineration and Open Burning of Waste").getN2oEmission()}</td>	
								<td>${entry.value.getIncineration().get("4.C-Incineration and Open Burning of Waste").getTotalEmission()}</td>
							</tr>
							
							<tr class="collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-center"><b>4.D-Wastewater Treatment and Discharge</b></td>	
								<td>${entry.value.getWasteWater().get("4.D-Domestic Wastewaster Treatment and Discharge").getCo2Emission()}</td>
								<td>${entry.value.getWasteWater().get("4.D-Domestic Wastewaster Treatment and Discharge").getCh4Emission()}</td>
								<td>${entry.value.getWasteWater().get("4.D-Domestic Wastewaster Treatment and Discharge").getN2oEmission()}</td>
								<td>${entry.value.getWasteWater().get("4.D-Domestic Wastewaster Treatment and Discharge").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-lg collapse" id="collapsible-item-nested-parent${entry.key}">
								<td><b>Memo Items</b></td>
								<td>${entry.value.getMemo().get("5-Memo Items").getCo2Emission()}</td>
								<td>${entry.value.getMemo().get("5-Memo Items").getCh4Emission()}</td>
								<td>${entry.value.getMemo().get("5-Memo Items").getN2oEmission()}</td>
								<td>${entry.value.getMemo().get("5-Memo Items").getTotalEmission()}</td>
							</tr>	
								
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">
								<td class="text-right">Memo Items-1.A.3.a.i-International Aviation</td>
								<td>${entry.value.getAviation().get("1.A.3.a.i-Civil Aviation-International").getCo2Emission()}</td>
								<td>${entry.value.getAviation().get("1.A.3.a.i-Civil Aviation-International").getCh4Emission()}</td>
								<td>${entry.value.getAviation().get("1.A.3.a.i-Civil Aviation-International").getN2oEmission()}</td>
								<td>${entry.value.getAviation().get("1.A.3.a.i-Civil Aviation-International").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-sm collapse" id="collapsible-item-nested-parent${entry.key}">  
								<td class="text-right">Memo Items-1.A.3.d.i-International water-borne navigation</td>
								<td>${entry.value.getWater().get("1.A.3.d.i-Water-borne Navigation-International").getCo2Emission()}</td>
								<td>${entry.value.getWater().get("1.A.3.d.i-Water-borne Navigation-International").getCh4Emission()}</td>
								<td>${entry.value.getWater().get("1.A.3.d.i-Water-borne Navigation-International").getN2oEmission()}</td>
								<td>${entry.value.getWater().get("1.A.3.d.i-Water-borne Navigation-International").getTotalEmission()}</td>
							</tr>
							
							<tr class="font-size-lg collapse" id="collapsible-item-nested-parent${entry.key}">
								<td><b>Energy (Reference Approach)</b></td>
								<td>${entry.value.getReferenceApproach().get("Energy (Reference Approach)").getCo2Emission()}</td>
								<td>${entry.value.getReferenceApproach().get("Energy (Reference Approach)").getCh4Emission()}</td>
								<td>${entry.value.getReferenceApproach().get("Energy (Reference Approach)").getN2oEmission()}</td>
								<td>${entry.value.getReferenceApproach().get("Energy (Reference Approach)").getTotalEmission()}</td>
							</tr>
								</c:forEach>
                            </tbody>
                           </table>
                          	</div>  
  <hr></div></div></div>
 <h7>Report Generated on (<%=date%>)</h7>
</div></div></div></form></div></div>
<%-- <script type="text/javascript" src="global_assets/js/loader.js"></script>

<% if (ghgOutputMap!=null){
	%>
<script type="text/javascript">
 google.charts.load('current', {packages:['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  
  function drawChart() {
	  var data = google.visualization.arrayToDataTable([
		  ['Year', 'Energy', 'IPPU', 'AFOLU', 'Waste'],
		  
		 <% for (String year:ghgOutputMap.keySet()){
			 GHGOutput value = ghgOutputMap.get(year);
			 
	     %>
	     
          ["<%=year%>", <%=value.getEnergy().get("1-Energy").getTotalEmission()%>, <%=value.getIppu().get("2-Industrial Processes and Product Use").getTotalEmission()%>, <%=value.getAfolu().get("3-Agriculture, Forestry, and Other Land Use").getTotalEmission()%>, <%=value.getWaste().get("4-Waste").getTotalEmission()%> ],
          
          <% }
          %>
      ]);
	  
	// Options
      var options = {
          fontName: 'Roboto',
          height: 400,
          fontSize: 12,
          backgroundColor: 'transparent',
          isStacked: true,
          chartArea: {
              left: 'auto',
              width: 'auto',
              height: 350
          },
          tooltip: {
              textStyle: {
                  fontName: 'Roboto',
                  fontSize: 13
              }
          },
          vAxis: {
              title: 'GHG Emissions',
              titleTextStyle: {
                  fontSize: 13,
                  italic: true,
                  color: '#333'
              },
              textStyle: {
                  color: '#333'
              },
              baselineColor: '#ccc',
              gridlines:{
                  color: '#eee',
                  count: 10
              },
              minValue: 0
          },
          hAxis: {
              textStyle: {
                  color: '#333'
              }
          },
          legend: {
              position: 'top',
              alignment: 'center',
              textStyle: {
                  color: '#333'
              }
          },
          series: {
              0: { color: '#2ec7c9' },
              1: { color: '#b6a2de' },
              2: { color: '#5ab1ef' },
              3: { color: '#ffb980' },
              4: { color: '#d87a80' },
              5: { color: '#8d98b3' }
          }
      };
          var chart = new google.visualization.ColumnChart(document.getElementById('number_format_chart'));
          chart.draw(data, options);

  }
  
</script>
<%
}
%> --%>

<script type="text/javascript" src="global_assets/js/loader.js"></script>

<% if (ghgOutputMap!=null){
	%>
<script type="text/javascript">
 google.charts.load('current', {packages:['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  
  function drawChart() {
	  var data = google.visualization.arrayToDataTable([
		  ['Year', 'CO2', 'CH4', 'N2O'],
		  
		 <% for (String year:ghgOutputMap.keySet()){
			 GHGOutput value = ghgOutputMap.get(year);
			 
	     %>
	     
          ["<%=year%>", <%=value.getTotal().get("Total").getCo2Emission()%>, <%=value.getTotal().get("Total").getCh4Emission()%>, <%=value.getTotal().get("Total").getN2oEmission()%>],
          
          <% }
          %>
      ]);
	  
	// Options
      var options = {
          fontName: 'Roboto',
          height: 400,
          fontSize: 12,
          backgroundColor: 'transparent',
          isStacked: true,
          chartArea: {
              left: 'auto',
              width: 'auto',
              height: 350
          },
          tooltip: {
              textStyle: {
                  fontName: 'Roboto',
                  fontSize: 13
              }
          },
          vAxis: {
              title: 'GHG Emissions',
              titleTextStyle: {
                  fontSize: 13,
                  italic: true,
                  color: '#333'
              },
              textStyle: {
                  color: '#333'
              },
              baselineColor: '#ccc',
              gridlines:{
                  color: '#eee',
                  count: 10
              },
              minValue: 0
          },
          hAxis: {
              textStyle: {
                  color: '#333'
              }
          },
          legend: {
              position: 'top',
              alignment: 'center',
              textStyle: {
                  color: '#333'
              }
          },
          series: {
              0: { color: '#2ec7c9' },
              1: { color: '#b6a2de' },
              2: { color: '#5ab1ef' },
              3: { color: '#ffb980' },
              4: { color: '#d87a80' },
              5: { color: '#8d98b3' }
          }
      };
          var chart = new google.visualization.ColumnChart(document.getElementById('number_format_chart'));
          chart.draw(data, options);

  }
  
</script>
<%
}
%>
</body>
<script>
function populateToYear(){
 	var toYear = document.getElementById("toYear");
	var fromYear = document.getElementById("fromYear").value;
	var x = Number(fromYear) + 10;
	var i;
	var j;
	
	for(j=toYear.options.length-1;j>=0;j--){
		toYear.remove(j);
	}
	for(i=fromYear;i<=x;i++){
		 toYear.options[toYear.options.length] = new Option(i, i);
	} 
}

function getData(){
	var fromYear = document.getElementById("fromYear").value;
	var toYear = document.getElementById("toYear").value;
	var unit = document.getElementById("unit").value;
	
	var url = '/getGHGOutput?fromYear=' +fromYear + '&toYear='+toYear  + '&unit='+unit;
	window.location.href = url;


}
</script>

<script>

var tablesToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>'
    , templateend = '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>'
    , body = '<body>'
    , tablevar = '<table>{table'
    , tablevarend = '}</table>'
    , bodyend = '</body></html>'
    , worksheet = '<x:ExcelWorksheet><x:Name>'
    , worksheetend = '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>'
    , worksheetvar = '{worksheet'
    , worksheetvarend = '}'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    , wstemplate = ''
    , tabletemplate = '';

    return function (table, name, filename) {
        var tables = table;
        
        for (var i = 0; i < tables.length; ++i) {
            wstemplate += worksheet + worksheetvar + i + worksheetvarend + worksheetend;
            tabletemplate += tablevar + i + tablevarend;
        }

        var allTemplate = template + wstemplate + templateend;
        var allWorksheet = body + tabletemplate + bodyend;
        var allOfIt = allTemplate + allWorksheet;

        var ctx = {};
        for (var j = 0; j < tables.length; ++j) {
            ctx['worksheet' + j] = name[j];
        }

        for (var k = 0; k < tables.length; ++k) {
            var exceltable;
            if (!tables[k].nodeType) exceltable = document.getElementById(tables[k]);
            ctx['table' + k] = exceltable.innerHTML;
        }

        //document.getElementById("dlink").href = uri + base64(format(template, ctx));
        //document.getElementById("dlink").download = filename;
        //document.getElementById("dlink").click();

        window.location.href = uri + base64(format(allOfIt, ctx));

    }
})();


</script>
</html>
