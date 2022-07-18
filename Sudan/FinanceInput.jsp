<%@page import="com.sudan.model.finance.*"%>
<%@page import="com.sudan.model.common.Project"%>
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
	<link rel="shortcut icon" href="global_assets/images/ssudan.png">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
<link href="global_assets/css/icons/icomoon/styles.min.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="global_assets/images/ssudan.png">
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

FinanceInputForm existingFinanceInput = null;
FinanceInput financeInput = null;

if(request.getAttribute("existingFinanceInput")!=null){
	existingFinanceInput = (FinanceInputForm)request.getAttribute("existingFinanceInput");
	financeInput = existingFinanceInput.getFinanceInput();
	
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

	<form action = "saveFinanceInput" onsubmit="return setFinanceValues();"id = "financeInputForm" class="form-horizontal bordered-row" method="post">
                <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
				<input type="hidden" name = "financeInput.dataId" id = "dataId">
	<div class="card border-pink">
		<div class="card-header text-center bg-pink-600">
		<h5 class="card-title text-uppercase">Climate Finance - Project Information</h5>
		</div>
<div class="card-body font-size-lg">
		
    <div class="form-group row">
    <label class="col-lg-3 col-form-label text-right">Project<span class="text-danger">*</span></label>
    <div class="col-lg-6">
  	 <select name="financeInput.projectId"  required id="projectId" onchange="getData(this.value);" data-placeholder="--Select--" class="form-control select" data-fouc>
      <option></option>
	  <% if(fromApprovalDashboard==null) { %>                	
                            <c:forEach var="listValue" items="${projectsList}">
							<option value="${listValue}">${listValue}</option>
							</c:forEach>
				<% } %>			 
				</select>
	  </div>
    </div><hr>
    <div class="tab-container">
                                <ul class="nav nav-tabs justify-content-center nav-fill" role="tablist">
                                 
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#details" role="tab">Project Details</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#flow" role="tab">Financial Flow</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#budget" role="tab">Detailed Budget</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#disbursement" role="tab">Disbursement Year</a>
                                    </li>
                                  </ul>
                                  
<div class="tab-content">
<div class="tab-pane active fade show" id="details" role="tabpanel">
<br>
    <div class="card border-grey">
    <div class="card-body">
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Financial Year<span class="text-danger">*</span></label>
   <div class="col-lg-3">
   <input name="financeInput.financialYear" required id="financialYear" class="form-control" value="${existingFinanceInput.financeInput.financialYear}">
    </div>
   <label class="col-lg-2 col-form-label text-right">Applied Exchange Rate (SSP/USD)<span class="text-danger">*</span></label>
   <div class="col-lg-3">
   <input name="financeInput.exchangeRate" required id="exchangeRate" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" value="${existingFinanceInput.financeInput.exchangeRate}">
   </div></div>
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Financing Mode<span class="text-danger">*</span></label>
   <div class="col-lg-3">
    <select name="financeInput.financeMode" required id ="financeMode" class="form-control select" data-placeholder="--Select--" data-focu>
     <option></option>
     <option value="On Budget">On Budget</option>
	 <option value="Off Budget">Off Budget</option>
	 <option value="Others">Others</option>
	 <option value="Not Applicable">Not Applicable</option>
	  </select>
   </div>
   <label class="col-lg-2 col-form-label text-right">Budget Code<span class="text-danger">*</span></label>
   <div class="col-lg-3">
   <input name="financeInput.budgetCode" required id="budgetCode" class="form-control" placeholder="" value="${existingFinanceInput.financeInput.budgetCode}">
   </div>
   </div>
  
   <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Project End Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.endDate" id="id-date-picker-1" value = "${existingFinanceInput.project.endDate}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Financial Closure Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.closureDate" id="id-date-picker-1" value = "${existingFinanceInput.project.closureDate}">
   </div></div>
   <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Commissioning Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.commissioningDate" id="id-date-picker-1" value = "${existingFinanceInput.project.commissioningDate}">
   </div></div></div></div><span class="text-danger">* Mandatory Field</span></div>
    
   <div class="tab-pane fade show" id="flow" role="tabpanel">
   <br>
   <div class="card border-grey">
    <div class="card-body"><br>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Project Size (million USD)<span class="text-danger">*</span></label>
   <div class="col-lg-3">
    <select name="financeInput.projectSize" reuired id ="projectSize" class="form-control select" data-placeholder="--Select--" data-focu>
     <option></option>
     <option value="Micro (<=0.1)">Micro (<=0.1)</option>
	 <option value="Small (>0.1<=0.5)">Small (>0.1<=0.5)</option>
	 <option value="Medium (>0.5<=1)">Medium (>0.5<=1)</option>
	 <option value="Large(>1.0)">Large(>1.0)</option>
	  </select></div>
   <label class="col-lg-2 col-form-label text-right">Project Cost (USD)</label>
   <div class="col-lg-3">
   <input name="project.costAmount" readonly="readonly" id="costAmount" class="form-control" value="${existingFinanceInput.project.costAmount}">
   </div></div>
   
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">National Budget (USD)<span class="text-danger">*</span></label>
   <div class="col-lg-3">
   <input name="financeInput.nationalBudget" required id="nationalBudget" onchange = "subtractOthers();" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" value="${existingFinanceInput.financeInput.nationalBudget}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Sub National Budget (USD)<span class="text-danger">*</span></label>
   <div class="col-lg-3">
   <input name="financeInput.subnationalBudget" required id="subnationalBudget" onchange = "subtractOthers();" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" value="${existingFinanceInput.financeInput.subnationalBudget}">
   </div>
   </div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Green Bonds (USD)<span class="text-danger">*</span></label>
   <div class="col-lg-3">
   <input name="financeInput.greenBond" required id="greenBond" onchange = "subtractOthers();" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" value="${existingFinanceInput.financeInput.greenBond}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Others (USD)</label>
   <div class="col-lg-3">
   <input name="financeInput.others" readonly id="others" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" value="${existingFinanceInput.financeInput.others}">
   </div>
   </div></div></div>
   
   <div class="card border-grey">
   <div class="card-body">
      <h6 class="card-title text-uppercase text-pink-600">Sources of Finance</h6>
					<div class="table-responsive">
						<table id="sourceTable" class="table table-bordered table-striped">
	                        <thead>
                            <tr class="bg-pink-600">
                                <th>Funding Type</th>
                                <th>National/International</th>
                                <th>Amount (USD)</th>
								<th>Financing Channel</th>
								<th>Funding Agency</th>
                                <th>Select</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:if test = "${existingFinanceInput ne null }">
                            <c:forEach var="output" varStatus="loop" items="${existingFinanceInput.getFinanceSourceDetailsList()}">
                            <tr>
                         	<td>${output.getFundingType()}</td>
							<td contenteditable='true'>${output.getNatInt()}</td>
							<td class ="input-mask-trigger" data-inputmask="'alias': 'decimal'" >${output.getSourceAmount()}</td>
							<td contenteditable='true'>${output.getChannel()}</td>
							<td contenteditable='true'>${output.getFundingAgency()}</td>
							<td><input type="checkbox" name='record'></td>
							</tr>
							</c:forEach>
							</c:if>
                            </tbody>
                           </table> 
						</div><br>                       
                        			<div>
                        			<input type="button" class="btn btn-sm bg-pink-600 delete-row1" value="Delete Row">
                                   </div>
						<br>
						<h6 class="card-title">Add Row</h6>
						<div class="form-group row">
   <div class="col-lg-2 text-center">Funding Type
   <select name="fundingType" id ="fundingType" class="form-control select" data-placeholder="--Select--" data-focu>
     <option></option>
     <option value="Loan-Concessional">Loan-Concessional</option>
     <option value="Loan-Non Concessional">Loan-Non Concessional</option>
	 <option value="Grant">Grant</option>
	 <option value="Public">Public</option>
	 <option value="Private">Private</option>
	 <option value="Others">Others</option>
	  </select>
    </div>
    <div class="col-lg-3 text-center">National/International
  <select name="natInt" id ="natInt" class="form-control select" data-placeholder="--Select--" data-focu>
     <option></option>
     <option value="National">National</option>
	 <option value="International">International</option>
	 </select>
    </div>
    <div class="col-lg-2 text-center">Amount (USD)
   <input name='sourceAmount' id = 'sourceAmount' class="form-control form-control-sm input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   </div>
    <div class="col-lg-2 text-center">Channel
    <select name="channel" id ="channel" class="form-control select" data-placeholder="--Select--" data-focu>
     <option></option>
     <option value="Bilateral">Bilateral</option>
	 <option value="Multilateral">Multilateral</option>
	 <option value="Co-financing">Co-financing</option>
	 <option value="International Fund">International Fund</option>
	 <option value="National Fund">National Fund</option>
	 <option value="Public Fund">Public Fund</option>
	 <option value="Private Fund">Private Fund</option>
	 <option value="Others">Others</option>
	 </select>
    </div>
    <div class="col-lg-2 text-center">Funding Agency
   <input name='fundingAgency' id = 'fundingAgency' class="form-control form-control-sm">
    </div>
    <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-pink-600 add-row1">Add</button>
  </div></div>
   </div></div><span class="text-danger">* Mandatory Field</span></div>
   
                 
	<div class="tab-pane fade show" id="budget" role="tabpanel">
	<br>
	<div class="card border-grey">
   <div class="card-body">  
    <h6 class="card-title text-uppercase text-pink-600">Project Cost Breakdown</h6>
					<div class="table-responsive">
						<table id="catTable" class="table table-bordered table-striped">
	                    
                            <thead>
                            <tr class="bg-pink-600">
                                <th>Disbursement Category</th>
                                <th>Amount (USD)</th>
                                <th>Reference</th>
                                <th>Select</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:if test = "${existingFinanceInput ne null }">
                            <c:forEach var="output" varStatus="loop" items="${existingFinanceInput.getFinanceDetailedBudgetList()}">
                            <tr>
                         	<td>${output.getDisCat()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getCatAmount()}</td>
							<td contenteditable='true'>${output.getCatRef()}</td>
							<td><input type="checkbox" name='record1'></td>
							</tr>
							</c:forEach>
							</c:if>
                            </tbody>
                           </table> 
						</div><br>                       
                        			<div>
                        			<input type="button" class="btn btn-sm bg-pink-600 delete-row2" value="Delete Row">
                                   </div><hr>
					
					<h6 class="card-title text-uppercase text-pink-600">Add Category</h6>
						<div class="form-group row">
   <div class="col-lg-4 text-center">Disbursement Category
    <select name="disCat" id ="disCat" class="form-control select" data-placeholder="--Select--" data-focu>
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
    <div class="col-lg-2 text-center">Amount (USD)
   <input name='catAmount' id = 'catAmount' class="form-control form-control-sm input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   </div>
    <div class="col-lg-3 text-center">Reference
   <input name='catRef' id = 'catRef' class="form-control form-control-sm">
    </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-pink-600 add-row2">Add</button>
  </div></div>
						</div></div></div>	
                
	<div class="tab-pane fade show" id="disbursement" role="tabpanel">
	<br>  
	 <div class="card border-grey">
   <div class="card-body">  
      <h6 class="card-title text-uppercase text-pink-600">Disbursement Schedule</h6>
					<div class="table-responsive">
						<table id="disTable" class="table table-bordered table-striped">
	                    
                            <thead>
                            <tr class="bg-pink-600">
                                <th>Disbursement Year</th>
                                <th>Amount (USD)</th>
								<th>Reference</th>
                                <th>Select</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:if test = "${existingFinanceInput ne null }">
                            <c:forEach var="output" varStatus="loop" items="${existingFinanceInput.getFinanceDisbursementList()}">
                            <tr>
                         	<td>${output.getDisYear()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getDisAmount()}</td>
							<td contenteditable='true'>${output.getDisRef()}</td>
							<td><input type="checkbox" name='record2'></td>
							</tr>
							</c:forEach>
							</c:if>
                            </tbody>
                           </table> 
						</div><br>                       
                        			<div>
                        			<input type="button" class="btn btn-sm bg-pink-600 delete-row3" value="Delete Row">
                                   </div><hr>
                 <h6 class="card-title text-uppercase text-pink-600">Add Year</h6>
                <div class="form-group row">
   <div class="col-lg-4 text-center">Year
   <select name = 'disYear' id = 'disYear' class="form-control select" data-placeholder="--Select--" data-focu>
   <option></option>		
	<c:forEach var="listValue" items="${years}">
	<option value="${listValue}">${listValue}</option>
	</c:forEach>
    </select></div>
    <div class="col-lg-2 text-center">Amount (USD)
   <input name='disAmount' id = 'disAmount' class="form-control form-control-sm">
    </div>
    <div class="col-lg-3 text-center">Reference
   <input name='disRef' id = 'disRef' class="form-control form-control-sm">
    </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-pink-600 add-row3">Add</button>
  </div></div>
						</div></div></div>
						</div></div>
						<hr>
  <div class="form-group">
                <span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="financeInput.remarks">${existingFinanceInput.getFinanceInput().getRemarks()}</textarea>
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
    <button  id = "submitButton"  class="btn bg-pink-600">Submit</button>
</div></div>
  
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
<div id = "rejectionButton" style="display: none">
<button id = "Rejected" onclick="setStatus(this.id);"  class="btn bg-pink-600">Reject</button>
</div> 
</div>
</div>
</div>
</div></div></form></div></div></body>
 
 <script>
 
 function setFinanceValues(){
	    var table = document.getElementById('sourceTable');
	    var rowLength = table.rows.length;
	    
	    for (i = 1; i < rowLength; i++){
	       var cells = table.rows.item(i).cells;
	       var cellLength = cells.length;
	       
	       var x = i-1;
	       for(var j = 0; j < cellLength; j++){
	           var cell = cells.item(j);
	           var cellVal = cell.innerHTML;
	           var name ;
	         
	           if(j==0){
	        	   name = "financeSourceDetailsList["+x+"].fundingType";
	        	}
	           if(j==1){
	        	   name = "financeSourceDetailsList["+x+"].natInt";
	        	}
	           
	           if(j==2){
	        	   name = "financeSourceDetailsList["+x+"].sourceAmount";
	        	}
	          
	           if(j==3){
	        	   name = "financeSourceDetailsList["+x+"].channel";
	           }
	           if(j==4){
	        	   name = "financeSourceDetailsList["+x+"].fundingAgency";
	           }
	           createHiddenField(name,cellVal);
	          
	        }
		 }
	return setCategoryValues();
	}
 
 function setCategoryValues(){
	    var table = document.getElementById('catTable');
	    var rowLength = table.rows.length;
	    
	    for (i = 1; i < rowLength; i++){
	       var cells = table.rows.item(i).cells;
	       var cellLength = cells.length;
	       
	       var x = i-1;
	       for(var j = 0; j < cellLength; j++){
	           var cell = cells.item(j);
	           var cellVal = cell.innerHTML;
	           var name ;

	           if(j==0){
	        	   name = "financeDetailedBudgetList["+x+"].disCat";
	           }

	           if(j==1){
	        	   name = "financeDetailedBudgetList["+x+"].catAmount";
	           }

	           if(j==2){
	        	   name = "financeDetailedBudgetList["+x+"].catRef";
	           }

	           createHiddenField(name,cellVal);
	          
	        }
		 }

	    return setDisbursementValues();
	}
 function setDisbursementValues(){
	    var table = document.getElementById('disTable');
	    var rowLength = table.rows.length;
	    
	    for (i = 1; i < rowLength; i++){
	       var cells = table.rows.item(i).cells;
	       var cellLength = cells.length;
	       
	       var x = i-1;
	       for(var j = 0; j < cellLength; j++){
	           var cell = cells.item(j);
	           var cellVal = cell.innerHTML;
	           var name ;
	         
	           if(j==0){
	        	   name = "financeDisbursementList["+x+"].disYear";
	           }

	           if(j==1){
	        	   name = "financeDisbursementList["+x+"].disAmount";
	           }

	           if(j==2){
	        	   name = "financeDisbursementList["+x+"].disRef";
	           }
	           createHiddenField(name,cellVal);
	          
	        }
		 }
		return validate();
	}
 
 function createHiddenField(name, value){
		if(document.getElementsByName(name).length != 0) { //already exist
			
		}else{
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", name);
		input.setAttribute("value", value); 
		document.getElementById("financeInputForm").appendChild(input);
		}
	}
 
 function subtractOthers(val){
	   var totalCost = document.getElementById("costAmount").value;
	   
	   var budgetField = document.getElementById("nationalBudget");
	   var subBudgetField = document.getElementById("subnationalBudget");
	   var greenBondField = document.getElementById("greenBond");
	   
	   var others = document.getElementById("others");
	   others.value = Number(totalCost);
	   
	   if(budgetField!=null){
		   others.value = Number(others.value) - Number(budgetField.value);
	   }
	   if(subBudgetField!=null){
		   others.value = Number(others.value) - Number(subBudgetField.value);
	   }
	   if(greenBondField!=null){
		   others.value = Number(others.value) - Number(greenBondField.value);
	   }
	   
	   if(val){
		   others.value = Number(others.value) - Number(val);
	   }
	   
	  var table = document.getElementById("sourceTable");
	  var rowLength = table.rows.length;
	  var total = 0 ;
	  
	  for (i = 1; i < rowLength; i++){
	       var cells = table.rows.item(i).cells;
	       var amount = cells.item(2).innerHTML;
	       total = Number(total) + Number(amount);
	           
	  }
	
  	  
 	  var remaining = Number(others.value) - Number(total);
 	  setTimeout(
 			  function(){ 
 		  	  document.getElementById("others").value = remaining.toFixed(0); 
 		  	  }
 			  ,1000);
 		if(remaining<0){
 		  	alert("Total Finance from sources exceed Project Cost. Please check the values.");
 	 		}  
 	  }
 	
 function validate(){
	 var others = document.getElementById("others").value;
	 if(others<0){
		  alert("Total Finance from sources exceed Project Cost. Please check the values.");
		  return false;
  	 }
	 
	  var table = document.getElementById("catTable");
	  var rowLength = table.rows.length;
	  var total = 0 ;
	  
	  for (i = 1; i < rowLength; i++){
	       var cells = table.rows.item(i).cells;
	       var amount = cells.item(1).innerHTML;
	       total = Number(total) + Number(amount);
	           
	  }
	  
	 var costAmount = document.getElementById("costAmount").value;
	 if(total>costAmount){
		  alert("Project Cost Breakdown exceed Project Cost. Please check the values.");
		  return false;
  	 }
	 
	 var table1 = document.getElementById("disTable");
	  var rowLength1 = table1.rows.length;
	  var total1 = 0 ;
	  
	  for (i = 1; i < rowLength1; i++){
	       var cells1 = table1.rows.item(i).cells;
	       var amount = cells1.item(1).innerHTML;
	       total1 = Number(total1) + Number(amount);
	           
	  }
	 if(total1>costAmount){
		  alert("Total Disbursement exceed Project Cost. Please check the values.");
		  return false;
  	 }
	 return true;
 }
 
 function inputmask(){
	 var table = document.getElementById("sourceTable");
	  var rowLength = table.rows.length;
	  var total = 0 ;
	  
	  for (i = 1; i < rowLength; i++){
	       var cells = table.rows.item(i).cells;
	       var cell = cells.item(2);
	       cell.classList.add("input-mask-trigger"); 
//	       cell.setAttribute("data-inputmask", ''alias': decimal');
	       cell.setAttribute("mask", '99:99');
	  }
	  
 }
 $(document).ready(function(){
		
	    $(".add-row1").click(function(){
	        var fundingType = $("#fundingType").val();
	        var natInt = $("#natInt").val();
	        var sourceAmount = $("#sourceAmount").val();
	        var channel = $("#channel").val();
	        var fundingAgency = $("#fundingAgency").val();
	        var markup = "<tr><td contenteditable='true'>" + fundingType + "</td><td>" + natInt + "</td><td contenteditable='true'>" + sourceAmount + "</td><td>" + channel + "</td><td contenteditable='true'>" + fundingAgency + "</td><td><input type='checkbox' name='record'></td></tr>";
	        $("#sourceTable tbody").append(markup);
	        subtractOthers();
	        
	    });
	    
	    // Find and remove selected table rows
	    $(".delete-row1").click(function(){
	        $("#sourceTable tbody").find('input[name="record"]').each(function(){
	            if($(this).is(":checked")){
	                $(this).parents("tr").remove();
	                subtractOthers();
	                
	            }
	        });
	    });
	});  
 
 $(document).ready(function(){
		
	    $(".add-row2").click(function(){
	        var disCat = $("#disCat").val();
	        var catAmount = $("#catAmount").val();
	        var catRef = $("#catRef").val();
	        var markup = "<tr><td>" + disCat + "</td><td contenteditable='true'>" + catAmount + "</td><td contenteditable='true'>" + catRef + "</td><td><input type='checkbox' name='record1'></td></tr>";
	        $("#catTable tbody").append(markup);
	    });
	    
	    // Find and remove selected table rows
	    $(".delete-row2").click(function(){
	        $("#catTable tbody").find('input[name="record1"]').each(function(){
	            if($(this).is(":checked")){
	                $(this).parents("tr").remove();
	            }
	        });
	    });
	});  
 $(document).ready(function(){
		
	    $(".add-row3").click(function(){
	        var disYear = $("#disYear").val();
	        var disAmount = $("#disAmount").val();
	        var disRef = $("#disRef").val();
	        var markup = "<tr><td>" + disYear + "</td><td contenteditable='true'>" + disAmount + "</td><td contenteditable='true'>" + disRef + "</td><td><input type='checkbox' name='record2'></td></tr>";
	        $("#disTable tbody").append(markup);
	    });
	    
	    // Find and remove selected table rows
	    $(".delete-row3").click(function(){
	        $("#disTable tbody").find('input[name="record2"]').each(function(){
	            if($(this).is(":checked")){
	                $(this).parents("tr").remove();
	            }
	        });
	    });
	});
 if("<%=selectedProjectId%>"){
		document.getElementById('projectId').value = "<%=selectedProjectId%>";
		
	}
	function getData(val){
		var url = '/getFinanceInput?project='+encodeURIComponent(val) + '&status=Any';
		window.location.href = url; 
	}	
 </script>
 <% if (financeInput!=null) { %>

 <script>
 document.getElementById('financeMode').value = "<%=financeInput.getFinanceMode()%>";
 document.getElementById('projectSize').value = "<%=financeInput.getProjectSize()%>";
 </script>
 <% } %>
 <script>
 var fromApproval = "<%=fromApprovalDashboard%>";
 var selectedProjectId = "<%=selectedProjectId%>";
 handleButtons(fromApproval, selectedProjectId);
 
 function setStatus(id){
		document.getElementById('fourEyesStatus').value = id;
		
		<% if(existingFinanceInput!=null && existingFinanceInput.getFinanceInput()!=null) {
		
		%>	
		document.getElementById('dataId').value = "<%=existingFinanceInput.getFinanceInput().getDataId()%>";
		<%
			}		
		%>
		
	}	
 
 <% if(existingFinanceInput!=null && existingFinanceInput.getFinanceInput()!=null) {
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
