<%@page import="com.vanuatu.model.mitigation.*"%>
<%@page import="com.vanuatu.model.common.Project"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Mitigation Action</title>
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

</head>
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />
<%
String selectedYear = (String)request.getAttribute("selectedYear");

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

MitigationMonitoringForm existingMitigationMonitoring = null;
MitigationInput mitigationInput = null;
MitigationMonitoring mitigationMonitoring = null;

if(request.getAttribute("existingMitigationMonitoring")!=null){
	existingMitigationMonitoring = (MitigationMonitoringForm)request.getAttribute("existingMitigationMonitoring");
	mitigationInput = existingMitigationMonitoring.getMitigationInput();
	mitigationMonitoring = existingMitigationMonitoring.getMitigationMonitoring();
	
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

	 <form action="saveMitigationMonitoring"  onsubmit="return setIndicators();" method="post" class="form-horizontal bordered-row" id="mitigationMonitoringForm" data-parsley-validate="">
                    <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
				<input type="hidden" name = "mitigationMonitoring.dataId" id = "dataId">
	<div class="card border-teal">
		<div class="card-header text-center bg-info-700">
		<h5 class="card-title text-uppercase">Mitigation Action - Monitoring Information</h5>
		</div>
<div class="card-body font-size-lg">
		
    <div class="form-group row">
    <label class="col-lg-3 col-form-label text-right">Project&nbsp<span class="text-danger">*</span></label>
    <div class="col-lg-6">
  	 <select name="mitigationMonitoring.projectId" required id="projectId" onchange="getData(this.value);" data-placeholder="--Select--" class="form-control select" data-fouc>
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
   <label class="col-lg-3 col-form-label text-right">Monitoring Year&nbsp<span class="text-danger">*</span></label>
    <div class="col-lg-3">
  	<select name="mitigationMonitoring.year" required data-placeholder="--Select--" onchange="getData(this.value);" class="form-control select" id="yearId"  data-fouc>
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
    
    <hr>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Mitigation Sector</label>
   <div class="col-lg-3">
   <input name="project.sector" readonly="readonly" id="sectorId" class="form-control" value="${existingMitigationMonitoring.project.sector}">
    </div>
   <label class="col-lg-2 col-form-label text-right">Mitigation Sub-Sector</label>
   <div class="col-lg-3">
   <input name="project.subSector" readonly="readonly" id="subSectorId" class="form-control" value="${existingMitigationMonitoring.project.subSector}">
   </div></div>
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Included in NDC</label>
   <div class="col-lg-3">
   <input name="project.ndc" readonly="readonly" id="ndc" class="form-control" value="${existingMitigationMonitoring.project.ndc}">
    </div>
   <label class="col-lg-2 col-form-label text-right">Project Location</label>
   <div class="col-lg-3">
   <input name="project.location" readonly="readonly" id="location" class="form-control" value="${existingMitigationMonitoring.project.location}">
   </div></div>
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Implementing Agency</label>
   <div class="col-lg-3">
   <input name="project.agency" readonly="readonly" id="agency" class="form-control" value="${existingMitigationMonitoring.project.agency}">
    </div>
    
   <label class="col-lg-2 col-form-label text-right">Executing Agency</label>
   <div class="col-lg-3">
   <input name="project.otherParty" readonly="readonly" id="otherParty" class="form-control" value="${existingMitigationMonitoring.project.otherParty}">
   </div>
   <label class="col-lg-2 col-form-label text-right"></label>
   
   <label class="col-lg-2 col-form-label text-right">Contact Details</label>
   <div class="col-lg-3">
   <input name="mitigationInput.agencyContact" readonly="readonly" id="agencyContact" class="form-control" value="${existingMitigationMonitoring.mitigationInput.agencyContact}">
    </div>
    
   <label class="col-lg-2 col-form-label text-right">Contact Details</label>
   <div class="col-lg-3">
   <input name="mitigationInput.otherPartyContact" readonly="readonly" id="otherPartyContact" class="form-control" value="${existingMitigationMonitoring.mitigationInput.otherPartyContact}">
   </div>
   </div>
  
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Project Cost (USD)</label>
   <div class="col-lg-3">
   <input name="project.costAmount" readonly="readonly" id="costAmount" class="form-control " value="${existingMitigationMonitoring.project.costAmount}">
    </div>
   <label class="col-lg-2 col-form-label text-right">Source of Funding</label>
   <div class="col-lg-3">
   <input name="project.funding" readonly="readonly" id="funding" class="form-control" value="${existingMitigationMonitoring.project.funding}">
   </div></div>
  <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Project End Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.approvalDate" id="id-date-picker-1" value = "${existingMitigationMonitoring.project.approvalDate}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Financial Closure Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.closureDate" id="id-date-picker-1" value = "${existingMitigationMonitoring.project.closureDate}">
   </div></div>
   <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Commissioning Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.commissioningDate" id="id-date-picker-1" value = "${existingMitigationMonitoring.project.commissioningDate}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Part of NAP/NAPA/NAMA</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" name="napa" value = "${existingMitigationMonitoring.project.napa}">
   </div></div>
  <div class="form-group row">
  <label class="col-lg-2 col-form-label text-right">Lifetime (years)</label>
   <div class="col-lg-3">
   <input name="project.lifetime" readonly="readonly" id="lifetime" class="form-control" placeholder="" value = "${existingMitigationMonitoring.project.lifetime}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Target GHGs</label>
   <div class="col-lg-3">
   <input name="mitigationInput.targetGHG" readonly="readonly" id ="targetGHG" class="form-control" value="${existingMitigationMonitoring.mitigationInput.targetGhg}">
   </div>
   </div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Project Contributions</label>
   <div class="col-lg-3">
   <input name="mitigationInput.contributions" readonly="readonly" id ="contributions" class="form-control" value="${existingMitigationMonitoring.mitigationInput.contributions}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Project Status</label>
   <div class="col-lg-3">
   <input name="mitigationInput.status" readonly="readonly" id ="status" class="form-control" value="${existingMitigationMonitoring.mitigationInput.status}">
   </div>
   </div>
  <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Project Beneficiaries</label>
   <div class="col-lg-3">
   <input name="mitigationInput.beneficiary" readonly="readonly" id="beneficiary" class="form-control" placeholder="" value="${existingMitigationMonitoring.mitigationInput.beneficiary}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Gender Inclusiveness Assessment</label>
   <div class="col-lg-3">
   <input name="mitigationInput.genderIncl" readonly="readonly" id ="genderIncl" class="form-control" value="${existingMitigationMonitoring.mitigationInput.genderIncl}">
   </div></div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Expected Project Outputs</label>
   <div class="col-lg-3">
   <input name="mitigationInput.projectOutput" readonly="readonly" id="projectOutput" class="form-control" placeholder="" value="${existingMitigationMonitoring.mitigationInput.projectOutput}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Project Impacts</label>
   <div class="col-lg-3">
   <input name="mitigationInput.projectImpact" readonly="readonly" id="projectImpact" class="form-control" placeholder="" value="${existingMitigationMonitoring.mitigationInput.projectImpact}">
   </div></div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Actual GHG Savings (tCO<sub>2</sub>e/ year)&nbsp<span class="text-danger">*</span></label>
   <div class="col-lg-3">
   <input name="mitigationMonitoring.ghgReduction" required id="ghgRedId" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" placeholder="" value="${existingMitigationMonitoring.mitigationMonitoring.ghgReduction}">
   </div>
   <!-- <label class="col-lg-2 col-form-label text-right">Calculation Sheet</label>
   <div class="col-lg-3">
   <input type="file" class="custom-file-input" multiple="multiple" data-show-preview="false" name="mitigationMonitoring.fileCalculation" id="fileCalculation" data-fouc>
   <label class="custom-file-label" for="customFile">Choose file</label>
   </div> --></div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Registered With Market Based Mechanism</label>
   <div class="col-lg-3">
   <input name="mitigationInput.marketMech" readonly="readonly" id="marketMech" class="form-control" placeholder="" value="${existingMitigationMonitoring.mitigationInput.marketMech}">
   </div>
   
   <label class="col-lg-2 col-form-label text-right">Provide Weblink</label>
	<div class="col-lg-3">
	<input type="text" name="mitigationInput.weblink" readonly="readonly" id = "weblink" class="form-control" value="${existingMitigationMonitoring.mitigationInput.weblink}">
	</div>
   </div>
   <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Issuance of Carbon Benefits</label>
   <div class="col-lg-3">
   <input name="mitigationInput.carbonBen" id="carbonBen" readonly="readonly" class="form-control" placeholder="" value="${existingMitigationMonitoring.mitigationInput.carbonBen}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Verification Status (rounds)</label>
   <div class="col-lg-3">
   <input name="mitigationInput.verification" id="verificationStatus" class="form-control" placeholder="" value="${existingMitigationMonitoring.mitigationInput.verification}">
   </div>
   </div>
   <!-- <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Verification Reports</label>
   <div class="col-lg-3">
   <input type="file" class="custom-file-input" multiple="multiple" data-show-preview="false" name="mitigationInput.fileVerification" id="fileVerification" data-fouc>
   <label class="custom-file-label" for="customFile">Choose file</label>
   </div></div> -->
   <span class="text-danger">* Mandatory Field</span>
   <hr>
   <div class="card">
                     <div class="card-body">
      <h6 class="card-title text-uppercase text-teal-700">Performance Indicators</h6>
					<div class="table-responsive">
						<table id="indicatorTable" class="table table-bordered table-striped">
	                    
                            <thead>
                            <tr class="bg-info-700">
                                <th>Indicator</th>
                                <th>Unit</th>
                                <th>Value</th>
								<th>Data Source</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:if test = "${existingMitigationMonitoring ne null }">
                            <c:forEach var="output" varStatus="loop" items="${existingMitigationMonitoring.getMitigationMonitoring().getIndicators()}">
                            <tr class="font-size-sm">
										<td>${output.getIndicator()}</td>
										<td>${output.getUnit()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getExpectedValue()}</td>
										<td>${output.getReference()}</td>
										
									</tr>
                            </c:forEach>
                            </c:if>
                            </tbody>
                           </table> 
						</div><br>                       
                        			
						</div></div>
						
<hr>
  <div class="form-group">
                <span class="col-sm-3 control-label" style="color:black;">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="mitigationMonitoring.remarks">${existingMitigationMonitoring.getMitigationMonitoring().getRemarks()}</textarea>
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
    <button  id = "submitButton"  class="btn bg-info-700">Submit</button>
</div></div>
  
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
</div></div></form></div></div></div></body>
 
 <script>
 
 function setIndicators(){
	    var table = document.getElementById('indicatorTable');
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
	        	   name = "mitigationMonitoring.indicators["+x+"].indicator";
	           }
	           if(j==1){
	        	   name = "mitigationMonitoring.indicators["+x+"].unit";
	           }
	           if(j==2){
	        	   name = "mitigationMonitoring.indicators["+x+"].expectedValue";
	        
	           }
	           if(j==3){
	        	   name = "mitigationMonitoring.indicators["+x+"].reference";
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
		document.getElementById("mitigationMonitoringForm").appendChild(input);
	}
}


function getData(){
	var projectId = document.getElementById("projectId").value;
	var year = document.getElementById("yearId").value;
	window.location.href = '/getMitigationMonitoring?project='+encodeURIComponent(projectId) + '&year='+year + '&status=Any';
}
if("<%=selectedProjectId%>"){
	document.getElementById('projectId').value = "<%=selectedProjectId%>";
	
}
var fromApproval = "<%=fromApprovalDashboard%>";
var selectedProjectId = "<%=selectedProjectId%>";
handleButtons(fromApproval, selectedProjectId);


function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	
	<% if(existingMitigationMonitoring!=null && existingMitigationMonitoring.getMitigationMonitoring()!=null) {
	
	%>	
	document.getElementById('dataId').value = "<%=existingMitigationMonitoring.getMitigationMonitoring().getDataId()%>";
	<%
		}		
	%>
	
}

<% if(existingMitigationMonitoring!=null && existingMitigationMonitoring.getMitigationMonitoring()!=null) {
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
