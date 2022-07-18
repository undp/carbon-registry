<%@page import="com.gambia.model.mitigation.*"%>
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
	<title>Mitigation Action</title>
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
<script src="global_assets/js/demo_pages/form_inputs.js"></script>
<script src="global_assets/js/plugins/forms/selects/bootstrap_multiselect.js"></script>


<script src="assets/js/app.js"></script>

<script src="global_assets/js/demo_pages/form_layouts.js"></script>
<script src="global_assets/js/demo_pages/form_checkboxes_radios.js"></script>
<script src="global_assets/js/demo_pages/datatables_extension_buttons_html5.js"></script>
<script src="global_assets/js/demo_pages/form_select2.js"></script>
<script src="global_assets/js/demo_pages/form_multiselect.js"></script>
<script src="global_assets/js/demo_pages/uploader_bootstrap.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/plugins/purify.min.js"></script>
<script src="global_assets/js/plugins/uploaders/fileinput/plugins/sortable.min.js"></script>



<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />
<%

MitigationInputForm existingMitigationInput = null;
MitigationInput mitigationInput = null;
List<String> targetGhgList = null;
List<String> contributionList = null;
String fileName = "";

if(request.getAttribute("existingMitigationInput")!=null){

	existingMitigationInput = (MitigationInputForm)request.getAttribute("existingMitigationInput");
	
	mitigationInput = existingMitigationInput.getMitigationInput();
	if(mitigationInput!=null && mitigationInput.getFileCalculation()!=null){
		fileName = mitigationInput.getFileCalculation().getOriginalFilename();
	}
	
if(mitigationInput!=null){
	targetGhgList = Arrays.asList(mitigationInput.getTargetGhg().split("\\s*,\\s*"));
	contributionList = Arrays.asList(mitigationInput.getContributions().split("\\s*,\\s*"));
	}
	
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

	<form action="saveMitigationInput" method="post" enctype="multipart/form-data" onsubmit="return setIndicators();" class="form-horizontal bordered-row" id="mitigationInputForm" data-parsley-validate="">
                    <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
				<input type="hidden" name = "mitigationInput.dataId" id = "dataId">
	<div class="card border-slate">
		<div class="card-header text-center bg-slate-700">
		<h5 class="card-title text-uppercase">Mitigation Action - Project Information</h5>
		</div>
<div class="card-body font-size-lg">
		
    <div class="form-group row">
    <label class="col-lg-3 col-form-label text-right">Project</label>
    <div class="col-lg-6">
  	 <select name="mitigationInput.projectId" required id="projectId" onchange="getData(this.value);" data-placeholder="--Select--" class="form-control select" data-fouc>
      <option></option>
	  <% if(fromApprovalDashboard==null) { %>                	
                            <c:forEach var="listValue" items="${projectsList}">
							<option value="${listValue}">${listValue}</option>
							</c:forEach>
				<% } %>			 
				</select>
	  </div>
    </div><hr>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Mitigation Sector</label>
   <div class="col-lg-3">
   <input name="project.sector" readonly="readonly" id="sectorId" class="form-control" value="${existingMitigationInput.project.sector}">
    </div>
   <label class="col-lg-2 col-form-label text-right">Mitigation Sub-Sector</label>
   <div class="col-lg-3">
   <input name="project.subSector" readonly="readonly" id="subSectorId" class="form-control" value="${existingMitigationInput.project.subSector}">
   </div></div>
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Included in NDC</label>
   <div class="col-lg-3">
   <input name="project.ndc" readonly="readonly" id="ndc" class="form-control" value="${existingMitigationInput.project.ndc}">
    </div>
   <label class="col-lg-2 col-form-label text-right">Project Location</label>
   <div class="col-lg-3">
   <input name="project.location" readonly="readonly" id="location" class="form-control" value="${existingMitigationInput.project.location}">
   </div></div>
   
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Implementing Agency</label>
   <div class="col-lg-3">
   <input name="project.agency" readonly="readonly" id="agency" class="form-control" value="${existingMitigationInput.project.agency}">
    </div>
    
   <label class="col-lg-2 col-form-label text-right">Other Party</label>
   <div class="col-lg-3">
   <input name="project.otherParty" readonly="readonly" id="otherParty" class="form-control" value="${existingMitigationInput.project.otherParty}">
   </div>
   <label class="col-lg-2 col-form-label text-right"></label>
   
   <label class="col-lg-2 col-form-label text-right">Contact Details</label>
   <div class="col-lg-3">
   <input name="mitigationInput.agencyContact" id="agencyContact" class="form-control" value="${existingMitigationInput.mitigationInput.agencyContact}">
    </div>
    
   <label class="col-lg-2 col-form-label text-right">Contact Details</label>
   <div class="col-lg-3">
   <input name="mitigationInput.otherPartyContact" id="otherPartyContact" class="form-control" value="${existingMitigationInput.mitigationInput.otherPartyContact}">
   </div>
   </div>
  
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Project Cost (USD)</label>
   <div class="col-lg-3">
   <input name="project.costAmount" readonly="readonly" id="costAmount" class="form-control " value="${existingMitigationInput.project.costAmount}">
    </div>
   <label class="col-lg-2 col-form-label text-right">Source of Funding</label>
   <div class="col-lg-3">
   <input name="project.funding" readonly="readonly" id="funding" class="form-control" value="${existingMitigationInput.project.funding}">
   </div></div>
  <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Approval Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.approvalDate" id="id-date-picker-1" value = "${existingMitigationInput.project.approvalDate}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Financial Closure Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.closureDate" id="id-date-picker-1" value = "${existingMitigationInput.project.closureDate}">
   </div></div>
   <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Effectiveness Date</label>
   <div class="col-lg-3">
  <input class="form-control" readonly="readonly" type="date" name="project.commDate" id="id-date-picker-1" value = "${existingMitigationInput.project.commissioningDate}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Lifetime (years)</label>
   <div class="col-lg-3">
   <input name="project.lifetime" readonly="readonly" id="lifetime" class="form-control" placeholder="" value = "${existingMitigationInput.project.lifetime}">
   </div>
   <%-- <label class="col-lg-2 col-form-label text-right">Potential End Date</label>
   <div class="col-lg-3">
  <input class="form-control" required type="date" name="endDate" id="id-date-picker-1" value = "${project.commissioningDate}">
   </div> --%></div>
  <div class="form-group row">
  <label class="col-lg-2 col-form-label text-right">Expected GHG Savings (tCO<sub>2</sub>e/ year)</label>
   <div class="col-lg-3">
   <input name="mitigationInput.ghgReduction" required id="ghgRedId" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true" value="${existingMitigationInput.mitigationInput.ghgReduction}">
   </div>
  
   <label class="col-lg-2 col-form-label text-right">Target GHGs</label>
   <div class="col-lg-3">
   <select multiple="multiple" name="mitigationInput.targetGhg" required id ="targetGhg" class="form-control multiselect-select-all-filtering" data-focu>
     <option value="CO2">CO2</option>
	 <option value="CH4">CH4</option>
	 <option value="N2O">N2O</option>
	 <option value="HFCs">HFCs</option>
	 <option value="PFCs">PFCs</option>
	 <option value="SF6">SF6</option>
	  </select>
   </div>
   </div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Project Contributions</label>
   <div class="col-lg-3">
   <select multiple="multiple" name="mitigationInput.contributions" required id ="contributions" class="form-control multiselect-select-all-filtering" data-focu>
     <option value="Economic">Economic</option>
	 <option value="Social">Social</option>
	 <option value="Environmental">Environmental</option>
	 <option value="Gender and other Vulnerable Groups">Gender and other Vulnerable Groups</option>
	 <option value="Cross Cutting">Cross Cutting</option>
	 <option value="Others">Others</option>
	  </select>
   </div>
   <label class="col-lg-2 col-form-label text-right">Project Status</label>
   <div class="col-lg-3">
   <select name="mitigationInput.status" required id ="status" class="form-control select" data-placeholder="--Select--" data-focu>
   <option></option>
     <option value="Planned">Planned</option>
	 <option value="Under Implementation">Under Implementation</option>
	 <option value="Implemented">Implemented</option>
	 <option value="Operational">Operational</option>
	  </select>
   </div>
   </div>
  <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Project Beneficiaries</label>
   <div class="col-lg-3">
   <input name="mitigationInput.beneficiary" required id="beneficiary" class="form-control" placeholder="" value="${existingMitigationInput.mitigationInput.beneficiary}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Gender Inclusiveness Assessment</label>
   <div class="col-lg-3">
   <select name="mitigationInput.genderIncl" required id ="genderIncl" class="form-control select" data-placeholder="--Select--" data-focu>
   <option></option>
     <option value="Yes">Yes</option>
	 <option value="No">No</option>
	 <option value="NA">Not Applicable</option>
	  </select>
   </div></div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Expected Project Outputs</label>
   <div class="col-lg-3">
   <input name="mitigationInput.projectOutput" required id="projectOutput" class="form-control" placeholder="" value="${existingMitigationInput.mitigationInput.projectOutput}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Project Impacts</label>
   <div class="col-lg-3">
   <input name="mitigationInput.projectImpact" required id="projectImpact" class="form-control" placeholder="" value="${existingMitigationInput.mitigationInput.projectImpact}">
   </div></div>
   <div class="form-group row">
   
   <label class="col-lg-2 col-form-label text-right">Calculation Sheet</label>
   <div class="col-lg-3">
    
   <input type="file" class="form-input-styled" data-fouc name="mitigationInput.fileCalculation" id="fileCalculation">
   
   <a href="download?fileName=<%=fileName%>" download="proposed_file_name" class="navbar-nav-link"><i class="icon-book mr-2"></i><%=fileName%></a>
							
   
   </div></div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Registered With Market Based Mechanism</label>
   <div class="col-lg-3">
   <input name="mitigationInput.marketMech" required id="marketMech" class="form-control" placeholder="" value="${existingMitigationInput.mitigationInput.marketMech}">
   </div>
   
   <label class="col-lg-2 col-form-label text-right">Provide Weblink<span class="text-danger">*</span></label>
	<div class="col-lg-3">
	<input type="text" name="mitigationInput.weblink" id = "weblink" class="form-control" value="${existingMitigationInput.mitigationInput.weblink}">
	</div>
   </div>
   <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Issuance of Carbon Benefits</label>
   <div class="col-lg-3">
   <input name="mitigationInput.carbonBen" id="carbonBen" class="form-control" placeholder="" value="${existingMitigationInput.mitigationInput.carbonBen}">
   </div>
   <label class="col-lg-2 col-form-label text-right">Verification Status (rounds)</label>
   <div class="col-lg-3">
   <input name="mitigationInput.verification" id="verificationStatus" class="form-control" placeholder="" value="${existingMitigationInput.mitigationInput.verification}">
   </div>
   </div>
   <div class="form-group row">
   <!-- <label class="col-lg-2 col-form-label text-right">Verification Reports</label> -->
   <!-- <div class="col-lg-3">
   <input type="file" class="custom-file-input" data-show-preview="false" name="mitigationInput.fileVerification" id="fileVerification" data-fouc>
   <label class="custom-file-label" for="customFile">Choose file</label>
   </div> --></div>
   <hr>
   <div class="card">
                     <div class="card-body">
                     
      <h6 class="card-title text-uppercase text-slate-700">Performance Indicators</h6>
					<div class="table-responsive">
						<table id="indicatorTable" class="table table-bordered table-striped">
	                    
                            <thead>
                            <tr class="bg-slate-700">
                                <th>Indicator</th>
                                <th>Unit</th>
                                <th>Value</th>
								<th>Reference</th>
                                <th>Select</th>
                            </tr>
                            </thead>
                            <tbody>
                            
                          <c:if test = "${existingMitigationInput ne null }">
                            <c:forEach var="output" varStatus="loop" items="${existingMitigationInput.getMitigationInput().getIndicators()}">
                            <tr class="font-size-sm">
										<td contenteditable='true'>${output.getIndicator()}</td>
										<td contenteditable='true'>${output.getUnit()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getExpectedValue()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
										<td><input type="checkbox" name='record'></td>
									</tr>
                            </c:forEach>
                            </c:if>
                            </tbody>
                           </table> 
						</div><br>                      
                        			<div>
                        			<input type="button" class="btn btn-sm bg-slate-700 delete-row1" value="delete row">
                                   </div><hr>
                                   
                                   <h6 class="card-title">Add Performance Indicator</h6>
                                   <div class="form-group row">
   <div class="col-lg-4 text-center">Performance Indicator
   <input name = 'indicator' id = 'indicator' class="form-control form-control-sm">
    </div>
    <div class="col-lg-2 text-center">Unit
   <input name='unit' id = 'unit' class="form-control form-control-sm">
    </div>
    <div class="col-lg-2 text-center">Value
   <input name='value' id = 'value' class="form-control form-control-sm input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"">
   </div>
    <div class="col-lg-3 text-center">Reference
   <input name='ref' id = 'ref' class="form-control form-control-sm">
    </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-slate-700 add-row1">Add</button>
  </div></div>
</div></div>
  <div class="form-group">
                <span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="mitigationInput.remarks" placeholder="${existingMitigationInput.getMitigationInput().getRemarks()}"></textarea>
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
	        	   name = "mitigationInput.indicators["+x+"].indicator";
	           }
	           if(j==1){
	        	   name = "mitigationInput.indicators["+x+"].unit";
	           }
	           if(j==2){
	        	   name = "mitigationInput.indicators["+x+"].expectedValue";
	           }
	           if(j==3){
	        	   name = "mitigationInput.indicators["+x+"].reference";
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
		document.getElementById("mitigationInputForm").appendChild(input);
		}
	}
	
	function getData(val){
		var url = '/getMitigationInput?project='+encodeURIComponent(val) + '&status=Any';
		window.location.href = url; 
	}	
</script>

<% if (mitigationInput!=null) { %>

<script>

var selectedGhg = document.getElementById('targetGhg');
var selectedContribution = document.getElementById('contributions');
var targetGhg = [""];
var contributions = [""];
</script>
<% if(targetGhgList !=null) {
	for(String str : targetGhgList){
	
%>
<script>
targetGhg.push("<%=str%>");

</script>
<%
	}
}
%>
<script>
for(var i=0; i < selectedGhg.length; i++){
	if(targetGhg.includes(selectedGhg.options[i].value)) {
	 selectedGhg.options[i].selected = true;
	}
}
</script>
<% if(contributionList !=null) {
	for(String str : contributionList){
	
%>
<script>
contributions.push("<%=str%>");

</script>
<%
	}
}
%>
<script>
for(var i=0; i < selectedContribution.length; i++){
	if(contributions.includes(selectedContribution.options[i].value)) {
		selectedContribution.options[i].selected = true;
	}
}


document.getElementById('status').value = "<%=mitigationInput.getStatus()%>";
document.getElementById('genderIncl').value = "<%=mitigationInput.getGenderIncl()%>";
</script>
<% } %>
<script>

 $(document).ready(function(){
		
	    $(".add-row1").click(function(){
	        var indicator = $("#indicator").val();
	        var unit = $("#unit").val();
	        var value = $("#value").val();
	        var reference = $("#ref").val();
	        var markup = "<tr><td contenteditable='true'>" + indicator + "</td><td contenteditable='true'>" + unit + "</td><td contenteditable='true'>" + value + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
	        $("#indicatorTable tbody").append(markup);
	    });
	    
	    // Find and remove selected table rows
	    $(".delete-row1").click(function(){
	        $("#indicatorTable tbody").find('input[name="record"]').each(function(){
	            if($(this).is(":checked")){
	                $(this).parents("tr").remove();
	            }
	        });
	    });
	});  
 
 if("<%=selectedProjectId%>"){
	 
	 document.getElementById('projectId').value = "<%=selectedProjectId%>";
	}
 var fromApproval = "<%=fromApprovalDashboard%>";
 var selectedProjectId = "<%=selectedProjectId%>";
 handleButtons(fromApproval, selectedProjectId);
 
 function setStatus(id){
		document.getElementById('fourEyesStatus').value = id;
		
		<% if(existingMitigationInput!=null && existingMitigationInput.getMitigationInput()!=null) {
		
		%>	
			document.getElementById('dataId').value = "<%=existingMitigationInput.getMitigationInput().getDataId()%>";
		<%
			}		
		%>
		
} 
 

   <% if(existingMitigationInput!=null && existingMitigationInput.getMitigationInput()!=null) {
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
