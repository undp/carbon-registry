<%@page import="com.sudan.service.reports.*"%>
<%@page import="com.sudan.model.finance.*"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.DateFormat"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html lang="en">
<head>
<%DateFormat formatter1 = new SimpleDateFormat("dd/MM/yyyy"); %>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Climate Finance Tracking Report (Generated on <%= formatter1.format(new Date())%>)</title>
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
	
	<script src="global_assets/js/demo_pages/Report2.js"></script>
<!-- /theme JS files -->

</head>

<jsp:include page="Menu.jsp" />
<%
Date date = new Date();
String selectedYear = (String)request.getAttribute("selectedYear");
if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

FinanceOutputCumulative financeOutputCumulative = null;
if(request.getAttribute("financeOutputCumulative") !=null){
	financeOutputCumulative = (FinanceOutputCumulative)request.getAttribute("financeOutputCumulative");
}
FinanceOutput financeOutput = null;
if(request.getAttribute("financeOutputList") !=null){
	List<FinanceOutput> financeOutputList = (List<FinanceOutput>)request.getAttribute("financeOutputList");
	if(!financeOutputList.isEmpty()){
		financeOutput = financeOutputList.get(0);	
	}else{
%>
		<script>
		alert("No Data Available");
		</script>
<%	
	}
	
}
%>
<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

<form action="getFinanceOutput" method="post" class="form-horizontal bordered-row" data-parsley-validate="">
	<!-- 2 columns form -->
<div class="card border-pink">
	<div class="card-header bg-pink-600">
		<h5 class="card-title text-center text-uppercase">Climate Finance Tracking Report (${selectedYear})</h5>
	</div>

	<div class="card-body">
	  			<div class="card">
	  			    <div class="card-body">
					
					<div class="form-group row">
   <label class="col-lg-3 col-form-label text-center font-size-lg"><b>Select Year</b></label>
   <div class="col-lg-3">
   <select name="year" required data-placeholder="--Select--" class="form-control select" id="year"  data-fouc>
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
    </div>
  <div class="col-lg-2"></div>
   <div class="col-lg-3">
   <button class="btn bg-pink-600">Get Report</button>
   </div></div>
   	</div></div>
   	
<div class="card">
<div class="card-header header-elements-inline">
						<h6 class="card-title">Finance Graph</h6>
						<div class="header-elements">
							<div class="list-icons">
		                		<a class="list-icons-item" data-action="collapse"></a>
		                	</div>
	                	</div>
					</div>
					<div class="card-body">
					<div id="number_format_chart"></div>
 					</div></div>
			
<div class="form-group">
					
      				<div class="card">
      				<div class="card-header header-elements-inline">
						<h6 class="card-title">Climate Finance Report</h6>
						<div class="header-elements">
							<div class="list-icons">
		                		<a class="list-icons-item" data-action="collapse"></a>
		                	</div>
	                	</div>
					</div>
                    <div class="card-body">
                    <div class="table-responsive">
						<table id="ghgTable" class="table table-bordered datatable-button-html5-columns">
	                    
                            <thead>
                            <tr class="bg-pink-600">
                                <th>Project Id</th>
                                <th>Cause</th>
								<th>Division</th>
								<th>Sector</th>
								<th>Sub-sector</th>
								<th>Project Cost(USD)</th>
								<th>Location</th>
								<th>Implementing Agency</th>
								<th>Executing Agency</th>
								<th>Commissioning Date</th>
								<th>Lifetime(Years)</th>
								<th>Included in NDC</th>
                                <th>Expected Budget Spend(USD)</th>
                                <th>Budget Spent (USD)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="entry" items="${financeOutputList}">                            
                            <tr class="font-size-lg">
                            <c:url value="/getProject" var="url">
								<c:param name="projectId" value="${entry.getProject().getProjectId()}"/>
								</c:url>
								<td>${entry.getProject().getProjectId()}</td>
								<td>${entry.getProject().getCause()}</td>
								<td>${entry.getProject().getDivision()}</td>
								<td>${entry.getProject().getSector()}</td>
								<td>${entry.getProject().getSubSector()}</td>
								<td>${entry.getProject().getCostAmount()}</td>
								<td>${entry.getProject().getLocation()}</td>
								<td>${entry.getProject().getAgency()}</td>
								<td>${entry.getProject().getOtherParty()}</td>
								<td>${entry.getProject().getCommissioningDate()}</td>
								<td>${entry.getProject().getLifetime()}</td>
								<td>${entry.getProject().getNdc()}</td>
							<c:choose>
							<c:when test = "${selectedYear eq 'All'}">
						   		<td>${entry.getDisbursementAllYear()}</td>
						   		<td>${entry.getMonitoringDisbursementAllYear()}</td>
							</c:when>
							<c:otherwise>
								<td>${entry.getDisbursement()}</td>
								<td>${entry.getMonitoringDisbursement()}</td>
							</c:otherwise></c:choose>
							</tr>
                            </c:forEach>
                            </tbody>
                           </table>
                          	</div>  
  <hr></div></div>
<div class="font-size-xs">Report Generated on (<%=date%>)</div>
</div></div></div></form></div></div>

<script type="text/javascript" src="global_assets/js/loader.js"></script>

<% if (financeOutput!=null){
	%>
<script type="text/javascript">
 google.charts.load('current', {packages:['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  
  function drawChart() {
	  var data = google.visualization.arrayToDataTable([
          ['Year', 'Expected Spend (USD)', 'Actual Spend (USD)'],
          
          ["<%=selectedYear%>", <%=financeOutputCumulative.getDisbursementTotal()%>, <%=financeOutputCumulative.getMonitoringTotal()%>],
                    
          ["Till Date", <%=financeOutputCumulative.getDisbursementAllYearTotal()%>, <%=financeOutputCumulative.getMonitoringAllYearTotal()%>],
          
          
      ]);
	  
    var options = {
            fontName: 'Roboto',
            height: 400,
            fontSize: 12,
            backgroundColor: 'transparent',
            chartArea: {
                left: '25%',
                width: 400,
                height: 300
            },
            tooltip: {
                textStyle: {
                    fontName: 'Roboto',
                    fontSize: 13
                }
            },
            vAxis: {
                title: 'Finance Outcomes (Expected vs Actual)',
                titleTextStyle: {
                    fontSize: 13,
                    italic: false,
                    color: '#333'
                },
                textStyle: {
                    color: '#333'
                },
                baselineColor: '#ccc',
                gridlines:{
                    color: '#eee',
                    count: '100%'
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
                1: { color: '#b6a2de' }
            }
        };
    

          var chart = new google.visualization.ColumnChart(document.getElementById('number_format_chart'));
          chart.draw(data, options);

          document.getElementById('format-select').onchange = function() {
            options['vAxis']['format'] = this.value;
            chart.draw(data, options);
          };
  }
  
</script>
<%
}
%>
</body>
</html>
