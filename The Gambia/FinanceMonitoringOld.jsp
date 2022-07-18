<%@page import="com.gambia.model.finance.*"%>
<%@page import="com.gambia.model.common.Project"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Climate Finance</title>
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
<script src="global_assets/js/demo_pages/datatables_extension_buttons_html5.js"></script>
<script src="global_assets/js/demo_pages/form_select2.js"></script>
<script src="global_assets/js/demo_pages/form_multiselect.js"></script>
<script src="global_assets/js/demo_pages/uploader_bootstrap.js"></script>



<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />
<%
String selectedYear = (String)request.getAttribute("selectedYear");

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

List<FinanceMonitoring> existingFinanceMonitoring = null;


if(request.getAttribute("existingFinanceMonitoring")!=null){
	existingFinanceMonitoring = (List<FinanceMonitoring>)request.getAttribute("existingFinanceMonitoring");
}

if(request.getAttribute("projectsList")!=null){
	session.setAttribute("projectsList",request.getAttribute("projectsList"));
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

	<form action = "saveFinanceMonitoring" onsubmit="return setCategoryValues();" id = "financeMonitoringForm" class="form-horizontal bordered-row" method="post">
                <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
				<input type="hidden" name = "dataId" id = "dataId">
	<div class="card border-slate">
		<div class="card-header text-center bg-slate-700">
		<h5 class="card-title text-uppercase">Climate Finance - Project Information</h5>
		</div>
<div class="card-body font-size-lg">
		
    <div class="form-group row">
    <label class="col-lg-3 col-form-label text-right">Project</label>
    <div class="col-lg-6">
  	 <select name="projectId" id="projectId" required onchange="getData();" data-placeholder="--Select--" class="form-control select" data-fouc>
      <option></option>
	  <% if(fromApprovalDashboard==null) { %>                	
                            <c:forEach var="listValue" items="${projectsList}">
							<option value="${listValue}">${listValue}</option>
							</c:forEach>
				<% } %>			 
				</select>
	  </div>
    </div>
     <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Monitoring Year</label>
    <div class="col-lg-3">
  	<select name="year" required data-placeholder="--Select--" required onchange="getData();" class="form-control select" id="yearId"  data-fouc>
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
   <label class="col-lg-2 col-form-label text-right">Financial Year</label>
   <div class="col-lg-3">
   <input name="financialYear" readonly="readonly" id="financialYear" class="form-control" value="${existingFinanceInput.financialYear}">
    </div></div>
    <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Applied Exchange Rate</label>
   <div class="col-lg-3">
   <input name="exchangeRate" readonly="readonly" id="exchangeRate" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" value="${existingFinanceInput.exchangeRate}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Financing Mode</label>
   <div class="col-lg-3">
    <input name="financeMode" readonly="readonly" id ="financeMode" class="form-control"value="${existingFinanceInput.financeMode}">
    </div></div>
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Budget Code</label>
   <div class="col-lg-3">
   <input name="budgetCode" readonly="readonly" id="budgetCode" class="form-control" placeholder="" value="${existingFinanceInput.budgetCode}">
   </div>
   
    <label class="col-lg-2 col-form-label text-right">Approval Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.approvalDate" id="id-date-picker-1" value = "${project.approvalDate}">
   </div></div>
  
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Financial Closure Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.closureDate" id="id-date-picker-1" value = "${project.closureDate}">
   </div>
    <label class="col-lg-2 col-form-label text-right">Effectiveness Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.commissioningDate" id="id-date-picker-1" value = "${project.commissioningDate}">
   </div></div>
    <hr>
    
    
	<div class="card border-grey">
   <div class="card-body">  
    <h6 class="card-title text-uppercase text-slate-700">Disbursement Details</h6>
					<div class="table-responsive">
						<table id="catTable" class="table table-bordered table-striped">
	                    
                            <thead>
                            <tr class="bg-slate-700">
                                <th rowspan="2">Disbursement Category</th>
                                <th class="text-center" colspan="4">Amount (USD)</th>
                                <th rowspan="2">Reference</th>
                                <th rowspan="2">Select</th>
                            </tr>
                            <tr>
                                <th class="text-center">Q1</th>
                                <th class="text-center">Q2</th>
                                <th class="text-center">Q3</th>
                                <th class="text-center">Q4</th>
                            </tr>
                            </thead>
                        <tbody>
                       
                            <c:forEach var="output" varStatus="loop" items="${existingFinanceMonitoring}">
                        <tr>
							<td>${output.getDisCat()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getCatAmountq1()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getCatAmountq2()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getCatAmountq3()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getCatAmountq4()}</td>
							<td contenteditable='true'>${output.getCatRef()}</td>
							<td><input type="checkbox" name='record'></td>
						</tr>
						</c:forEach>
                        </tbody>
                        </table>
                        <br>
                        <div>
                        			<input type="button" class="btn btn-sm bg-slate-700 delete-row2" value="delete row">
                                   </div> 
						</div><hr>                       
                        			
	<h7 class="card-title text-uppercase text-slate-700">Add Row</h7>				
	<div class="form-group row">			
	<label class="col-lg-4 col-form-label text-right">Disbursement Category</label>
   <div class="col-lg-3">				
    <select name="disCat" required id ="disCat" class="form-control select" data-placeholder="--Select--" data-focu>
     <option></option>
     <option value="Civil Work">Civil Work</option>
	 <option value="Equipment & Machinery">Equipment & Machinery</option>
	 <option value="Consultant - Individual - International">Consultant - Individual - International</option>
	 <option value="Consultant - Individual - Local">Consultant - Individual - Local</option>
	 <option value="Professional Services - Companies">Professional Services - Companies</option>
	 <option value="IT Equipment">IT Equipment</option>
	 <option value="Office Supplies">Office Supplies</option>
	 <option value="Travel - International">Travel - International</option>
	 <option value="Travel - Local">Travel - Local</option>
	 <option value="Workshop/Training">Workshop/Training</option>
	 <option value="Meetings/trainings">Meetings/trainings</option>
	 <option value="Audio Visual & Printing">Audio Visual & Printing</option>
	 <option value="Audit Fee">Audit Fee</option>
	 <option value="Others">Others</option>
	 <option value="">New</option>
	 </select>
    </div>
    
   <div class="col-lg-1">
   
   <button type="button" class="btn btn-sm bg-slate-700 add-row2">Add</button>
  </div></div>
</div></div>
			 <div class="form-group">
			 <span class="col-sm-3 control-label">Remarks</span>
			<div class="col-sm-12">
			<textarea class="form-control" id="remarks" name="remarks" placeholder=""></textarea>
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
  <div class="bg-default content-box text-center pad20A mrg25T">
    <button  id = "submitButton"  class="btn bg-slate-700">Submit</button>
</div></div>
  
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
<div id = "rejectionButton" style="display: none">
<button id = "Rejected" onclick="setStatus(this.id);"  class="btn bg-slate-700">Reject</button>
</div> 
</div>
</div>
</div>
</div></div></form></div></div></body>
 
 <script>
 
 
 function setCategoryValues(){
	 alert("ye");
	    var table = document.getElementById('catTable');
	    var rowLength = table.rows.length;
	    
	    for (i = 2; i < rowLength; i++){
	       var cells = table.rows.item(i).cells;
	       var cellLength = cells.length;
	       
	       var x = i-2;
	       for(var j = 0; j < cellLength; j++){
	           var cell = cells.item(j);
	           var cellVal = cell.innerHTML;
	           var name ;

	           if(j==0){
	        	   name = "financeMonitoringList["+x+"].disCat";
	           }

	           if(j==1){
	        	   name = "financeMonitoringList["+x+"].catAmountq1";
	           }
	           
	           if(j==2){
	        	   name = "financeMonitoringList["+x+"].catAmountq2";
	           }
	           
	           if(j==3){
	        	   name = "financeMonitoringList["+x+"].catAmountq3";
	           }
	           
	           if(j==4){
	        	   name = "financeMonitoringList["+x+"].catAmountq4";
	           }

	           if(j==5){
	        	   name = "financeMonitoringList["+x+"].catRef";
	           }
	           createHiddenField(name,cellVal);
	          
	        }
		 }


	}

	function createHiddenField(name, value){
		if(document.getElementsByName(name).length != 0) { //already exist
			
		}else{
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", name);
		input.setAttribute("value", value); 
		document.getElementById("financeMonitoringForm").appendChild(input);
		}
	}
 
  $(document).ready(function(){
		
	    $(".add-row2").click(function(){
	        var disCat = $("#disCat").val();
	        var markup = "<tr><td>" + disCat + "</td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td><td><input type='checkbox' name='record'></td></tr>";
	        $("#catTable tbody").append(markup);
	    });
	    
	    // Find and remove selected table rows
	    $(".delete-row2").click(function(){
	        $("#catTable tbody").find('input[name="record"]').each(function(){
	            if($(this).is(":checked")){
	                $(this).parents("tr").remove();
	            }
	        });
	    });
	});  
  
  function getData(){
		var projectId = document.getElementById("projectId").value;
		var year = document.getElementById("yearId").value;
		window.location.href = '/getFinanceMonitoring?project='+encodeURIComponent(projectId) + '&year='+year + '&status=Any';
	}
  
	if("<%=selectedProjectId%>"){
		document.getElementById('projectId').value = "<%=selectedProjectId%>";
	}
	var fromApproval = "<%=fromApprovalDashboard%>";
	var selectedProjectId = "<%=selectedProjectId%>";
	handleButtons(fromApproval, selectedProjectId);
	
	 function setStatus(id){
		
			document.getElementById('fourEyesStatus').value = id;
			
			<% if(existingFinanceMonitoring!=null && !existingFinanceMonitoring.isEmpty()) {
			
			%>	
			document.getElementById('dataId').value = "<%=existingFinanceMonitoring.get(0).getDataId()%>";
			
			
			<%
				}		
			%>
			
	}
	 
	 <% if(existingFinanceMonitoring!=null  && !existingFinanceMonitoring.isEmpty()) {
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
