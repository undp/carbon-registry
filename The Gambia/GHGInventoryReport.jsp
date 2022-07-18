<%@page import="com.gambia.model.common.GHGReportOptions"%>
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
	<script src="global_assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script src="global_assets/js/demo_pages/form_layouts.js"></script>
	<script src="global_assets/js/plugins/forms/selects/bootstrap_multiselect.js"></script>
	<script src="global_assets/js/demo_pages/form_multiselect.js"></script>
	
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
String unit=null;
if(request.getAttribute("ghgReportOptions") !=null){	
	GHGReportOptions ghgReportOptions = (GHGReportOptions)request.getAttribute("ghgReportOptions");
	if(ghgReportOptions.getUnit().equals("tCO2e")){
		unit="tonnes";
	}else{
		unit=ghgReportOptions.getUnit();
	}
}
%>
<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

<form action="getGHGOutput" method="post" class="form-horizontal bordered-row" data-parsley-validate="">
	<!-- 2 columns form -->
<div class="card border-slate">
	<div class="card-header bg-slate-700">
		<h5 class="card-title text-center text-uppercase">GHG Inventory Report</h5>
	</div>

	<div class="card-body">
	  			<div class="card">
	  			    <div class="card-body">
                    	
							<div class="row">
								<div class="col-md-4">
									<fieldset>
										<legend class="font-weight-semibold text-center">Select Inventory Years</legend>
										
				<div class="form-group row">
					<div class="col-lg-12">
					<div class="row">
						<div class="col-md-6">
							<select name="fromYear" required data-placeholder="--From--" onchange="populateToYear();" class="form-control select" id="fromYear" data-fouc>
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

						<div class="col-md-6">
							<select name="toYear" required data-placeholder="--To--" class="form-control select" id="toYear"  data-fouc>
  							<c:if test = "${ghgReportOptions.getToYear() eq null }">
						   	<option></option>
						   	</c:if>
   							<option value="${ghgReportOptions.getToYear()}">${ghgReportOptions.getToYear()}</option>
    						</select>
						</div>
					</div>
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
	<tr class="bg-dark">
		<th>GHG Emissions (${ghgReportOptions.getUnit()})</th>
			<c:forEach var="entry" items="${ghgOutputMap}">
				<th>${entry.key}</th>
			</c:forEach>

	</tr>
</thead>
	 

<tbody>	
 <tr class="font-size-lg bg-light">
		<td><b>Total GHG Emissions</b></td>
		<c:forEach var="entry" items="${ghgOutputMap}">
		<td>${entry.value.getTotal().get("Total").getTotalEmission()}</td>
		</c:forEach>
		</tr>
		<tr>
			<td><a data-toggle="collapse" class="text-default " href="#collapsible-item-nested-parent1"><b>1-Energy</b></a></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
				<td>${entry.value.getEnergy().get("1-Energy").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
			<tr class="collapse" id="collapsible-item-nested-parent1">
			<td><b>1.A-Fuel Combustion Activities</b></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getFuelCombustion().get("1.A-Fuel Combustion Activities").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent1">
			<td>1.A.1-Energy Industries</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getEnergyIndustries().get("1.A.1-Energy Industries").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="font-size-lg collapse" id="collapsible-item-nested-parent1">
			<td>1.A.2-Manufacturing Industries and Construction</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getManufacturing().get("1.A.2-Manufacturing Industries and Construction").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent1">
			<td>1.A.3-Transport</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getTransport().get("1.A.3-Transport").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent1">
			<td>1.A.4-Others</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getOthers().get("1.A.4-Other Sectors").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr>
			<td><a data-toggle="collapse" class="text-default " href="#collapsible-item-nested-parent2"><b>2-IPPU</b></a></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getIppu().get("2-Industrial Processes and Product Use").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="collapse" id="collapsible-item-nested-parent2">
			<td><b>2.A-Mineral Industry</b></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getMineral().get("2.A-Mineral Industry").getTotalEmission()}</td>
			</c:forEach>
			
			</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent2">
			<td>2.A.1-Cement Production</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getCement().get("2.A.1-Cement Production").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent2">
			<td>2.A.2-Lime Production</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getLime().get("2.A.2-Lime Production").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="collapse" id="collapsible-item-nested-parent2">
			<td><b>2.D-Non-Energy Products from Fuels and Solvent Use</b></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getNonEnergy().get("2.D-Non-Energy Products from Fuels and Solvent Use").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent2">
			<td>2.D.1-Lubricant Use</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getLubricant().get("2.D.1-Lubricant Use").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
		<tr class="font-size-sm collapse" id="collapsible-item-nested-parent2">
			<td>2.D.3-Solvent Use</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getSolvent().get("2.D.3-Solvent Use").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
		<tr class="collapse" id="collapsible-item-nested-parent2">
			<td><b>2.F-Product Uses as Substitutes for Ozone Depleting Substances</b></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getOds().get("2.F-Product Uses as Substitutes for Ozone Depleting Substances").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent2">
			<td>2.F.1-Refrigeration and Air Conditioning</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getRefrigeration().get("2.F.1-Refrigeration and Air Conditioning").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
				<tr>
		<td><a data-toggle="collapse" class="text-default " href="#collapsible-item-nested-parent3"><b>3-AFOLU</b></a></td>
		<c:forEach var="entry" items="${ghgOutputMap}">
		<td>${entry.value.getAfolu().get("3-Agriculture, Forestry, and Other Land Use").getTotalEmission()}</td>
		</c:forEach>
		</tr>
		
			<tr class="collapse" id="collapsible-item-nested-parent3">
			<td><b>3.A-Livestock</b></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getLivestock().get("3.A-Livestock").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.A.1-Enteric Fermentation</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getEnteric().get("3.A.1-Enteric Fermentation").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.A.2-Manure Management</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getManure().get("3.A.2-Manure Management").getTotalEmission()}</td>
			</c:forEach>
		</tr>
			<tr class="collapse" id="collapsible-item-nested-parent3">
			<td><b>3.B-Land</b></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getLand().get("3.B-Land").getTotalEmission()}</td>
			</c:forEach>
		</tr>
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.B.1-Forest land</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getForest().get("3.B.1-Forest Land").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.B.2-Cropland</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getCropland().get("3.B.2-Cropland").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
		<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.B.3-Grassland</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getGrassland().get("3.B.3-Grassland").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
		<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.B.4-Wetlands</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getWetland().get("3.B.4-Wetlands").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
		<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.B.5-Settlements</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getSettlement().get("3.B.5-Settlements").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
		<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.B.6-Other Land</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getOtherLand().get("3.B.6-Other Land").getTotalEmission()}</td>
			</c:forEach>
		</tr>
		
			<tr class="collapse" id="collapsible-item-nested-parent3">
			<td><b>3.C-Aggregate sources and non-CO2 emissions sources on land</b></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getAggregate().get("3.C-Aggregate sources and non-CO2 emissions sources on land").getTotalEmission()}</td>
			</c:forEach>
		</tr>
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.C.1-Emissions from Biomass Burning</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getBiomassBurning().get("3.C.1-Emissions from Biomass Burning").getTotalEmission()}</td>
			</c:forEach>
		</tr>
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.C.6-Indirect N<sub>2</sub>O emissions from manure management</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getIndirectn2o().get("3.C.6-Indirect N2O emissions from manure management").getTotalEmission()}</td>
			</c:forEach>
		</tr>
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent3">
			<td>3.C.7-Rice Cultivation</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getRice().get("3.C.7-Rice Cultivation").getTotalEmission()}</td>
			</c:forEach>
		</tr>
			<tr>
			<td><a data-toggle="collapse" class="text-default " href="#collapsible-item-nested-parent4"><b>4-Waste</b></a></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getWaste().get("4-Waste").getTotalEmission()}</td>
			</c:forEach>
		</tr>
			<tr class="collapse" id="collapsible-item-nested-parent4">
			<td>4.A-Solid Waste Disposal</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getSolid().get("4.A-Solid Waste Disposal").getTotalEmission()}</td>
			</c:forEach>		
			</tr>
			
			<tr class="collapse" id="collapsible-item-nested-parent4">
			<td>4.B-Biological Treatment</td>
			<c:forEach var="entry" items="${ghgOutputMap}">			
			<td>${entry.value.getBiological().get("4.B-Biological Treatment").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="collapse" id="collapsible-item-nested-parent4">
			<td>4.C-Incineration and Open Burning of Waste</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getIncineration().get("4.C-Incineration and Open Burning of Waste").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="collapse" id="collapsible-item-nested-parent4">
			<td>4.D-Wastewater Treatment and Discharge</td>
			<c:forEach var="entry" items="${ghgOutputMap}">	
			<td>${entry.value.getWasteWater().get("4.D-Domestic Wastewaster Treatment and Discharge").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr>
			<td><a data-toggle="collapse" class="text-default " href="#collapsible-item-nested-parent5"><b>Memo Items</b></a></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getMemo().get("5-Memo Items").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
					
			<tr class=" font-size-sm collapse" id="collapsible-item-nested-parent5">
			<td>Memo Item-1.A.3.a.i-International Aviation</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getAviation().get("1.A.3.a.i-Civil Aviation-International").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
			<tr class="font-size-sm collapse" id="collapsible-item-nested-parent5">
			<td>Memo Item-1.A.3.d.i-International water-borne navigation</td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getWater().get("1.A.3.d.i-Water-borne Navigation-International").getTotalEmission()}</td>
			</c:forEach>
			</tr>
		
		<tr>
			<td><b>Energy (Reference)</b></td>
			<c:forEach var="entry" items="${ghgOutputMap}">
			<td>${entry.value.getReferenceApproach().get("Energy (Reference Approach)").getTotalEmission()}</td>
			</c:forEach>
			</tr> 
		
		</tbody>

</table>


</div> 
</div></div></div>
<div class="card">
<div class="card-header header-elements-inline">
						<h6 class="card-title text-center">GHG Inventory Graph (by Sector)</h6>
						<div class="header-elements ">
							<div class="list-icons">
		                		<a class="list-icons-item" data-action="collapse"></a>
		                	</div>
	                	</div>
					</div>
					<div class="card-body">
<div id="number_format_chart"></div>
 </div></div>
 
 <div class="card">
<div class="card-header header-elements-inline">
						<h6 class="card-title text-center">GHG Inventory Graph (by Gas)</h6>
						<div class="header-elements ">
							<div class="list-icons">
		                		<a class="list-icons-item" data-action="collapse"></a>
		                	</div>
	                	</div>
					</div>
					<div class="card-body">
<div id="number_format_chart1"></div>
 </div></div>
 <div class="font-size-xs">Report Generated on (<%=date%>)</div>
</div></div></div></form></div></div>
<script type="text/javascript" src="global_assets/js/loader.js"></script>

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
              title: 'GHG Emissions (${ghgReportOptions.getUnit()})',
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
                  count: 'auto'
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
              title: 'GHG Emissions (<%=unit%>)',
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
                  count: 'auto'
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
          var chart = new google.visualization.ColumnChart(document.getElementById('number_format_chart1'));
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


</html>
