<%@page import="com.sudan.model.ghg.ippu.*"%>
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
<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/uniform.min.js"></script>
<script src="global_assets/js/plugins/extensions/jquery_ui/interactions.min.js"></script>

<script src="assets/js/app.js"></script>

<script src="global_assets/js/demo_pages/form_select2.js"></script>
<script src="global_assets/js/demo_pages/form_layouts.js"></script>
<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />
<%
String selectedYear = (String)request.getAttribute("selectedYear");

if(request.getAttribute("ghgMapping") !=null){
	session.setAttribute("ghgMapping", request.getAttribute("ghgMapping"));
}

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

List<GHGInputCement> existingGHGInputCementList = null;

if(request.getAttribute("existingGHGInputCement")!=null){
	GHGInputCementForm form = (GHGInputCementForm)request.getAttribute("existingGHGInputCement");
	existingGHGInputCementList = form.getGhgInputCementList();
	
	
}
String fromApprovalDashboard = request.getParameter("fromApprovalDashboard"); 
%>

<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
<div class="card border-pink">
	<div class="card-header bg-pink-600">
		<h5 class="card-title text-uppercase text-center">GHG Inventory - Cement</h5>
	</div>

	<div class="card-body">
	<form action="saveGHGInputCement" method="post" onsubmit="return setCementValues();" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
                    <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
                   <input type="hidden" name = "ghgInput.dataId" id = "dataId">
<div class="card-body font-size-lg">
    <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Inventory Year</label>
    <div class="col-lg-4">
  	<select name="ghgInput.year" required onchange="getData();" data-placeholder="--Select--" class="form-control select" id="yearId"  data-fouc>
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
    <label class="col-lg-2 col-form-label text-right">Sector</label>
   <div class="col-lg-4">
     <select name="ghgInput.sector" id="sector" class="form-control select">
     <option value="${ghgMapping.sector}">${ghgMapping.sector}</option>
     </select>
   </div>
   </div>
   <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Category</label>
   <div class="col-lg-4">
   <select name="ghgInput.category" id="category" class="form-control select">
    <option value="${ghgMapping.category}">${ghgMapping.category}</option>
     </select>
   </div>
   <label class="col-lg-2 col-form-label text-right">Sub Sector</label>
   <div class="col-lg-4">
   <select name="ghgInput.subSector" id="subSector" class="form-control select">
   <option value="${ghgMapping.subSector}">${ghgMapping.subSector}</option>
     </select>
   </div>
  </div>
  <div class="form-group row">
   <label class="col-lg-2 col-form-label text-right">Calculation Approach</label>
   <div class="col-lg-4">
   <select name="ghgInput.calcApproach" required data-placeholder="--Select--" class="form-control select" id="calcApproach">
      <option></option>
	  <option value="Tier I">Tier I</option>
	  <option value="Tier II">Tier II</option>
	</select> 
   </div>
  </div>
  <hr>            
                
<div class="form-group">
      				<div class="card">
                    <div class="card-body">
      				<h6 class="card-title">Cement Data</h6>
					<div class="table-responsive">
						<table id="cementTable" class="table table-bordered table-striped">
                            <thead>
                            <tr class="bg-pink-600">
                                <th>Cement Type</th>
                                <th>Amount of Cement Produced (tonnes)</th>
                                <th>Clinker Fraction in Cement (%)</th>
                                <th>Reference</th>
                                <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                             <c:forEach var="output" varStatus="loop" items="${existingGHGInputCement.getGhgInputCementList()}">
	                            <tr>
	                                <td contenteditable='true'>${output.getCementType()}</td>
	                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getAmount()}</td>
	                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getClinkerFraction()}</td>
	                                <td contenteditable='true'>${output.getReference()}</td>
	                                <td><input type="checkbox" name="record"></td>    
	                            </tr>
	                         </c:forEach> 
                            </tbody>
                           </table> 
						</div><br>
						<div>
						<div id="add" style="display: block">
						
                        			<input type="button" class="btn btn-sm bg-pink-600 delete-row1" value="Delete Row">
                        			<button type="button" class="btn btn-sm bg-pink-600" data-toggle="modal" data-target="#modal_form_vertical">Add Row</button></div>
                                   </div><hr>
                                   <div id="modal_form_vertical" class="modal fade" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
   		<div class="modal-body">
   		<div class="modal-header">
								<h5 class="modal-title"><b>Add Cement Data</b></h5>
								<button type="button" class="close" data-dismiss="modal">&times;</button>
							</div>
							<br>
      <div class="form-group row">
   <div class="col-lg-6">Cement Type
   <input name="cementType"  class="form-control" id="cementType">
   </div>
   <div class="col-lg-6">Amount Produced (tonnes)
   <input name="amount" id="amount" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    </div></div>
      <div class="form-group row">
    <div class="col-lg-6">Clinker Fraction in Cement (%)
   <input name="clinkerFraction" id="clinkerFraction" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    </div>
   
   
    <div class="col-lg-6">Reference
   <input type="text" id = 'ref' class="form-control">
    </div></div>
    <div class="form-group row">
   <div class="col-lg-1">
   
   <button type="button" class="btn btn-sm bg-pink-600 add-row1">Add</button>
  </div></div></div></div></div>
						        
						                       
                        </div>
                        
                        <h6 class="card-title">Clinker Data</h6>

<div class="table-responsive">
                         <table class="table table-bordered table-striped" id="clinkerTable">
                            <thead>
                            <tr class="bg-pink-600">
                                
                                <th>Clinker Import (tonnes)</th>
                                <th>Clinker Export (tonnes)</th>
                                <th>Reference</th>
                                
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                              	
                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${existingGHGInputCement.getGhgInputCementClinker().getClinkerImport()}</td>
                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${existingGHGInputCement.getGhgInputCementClinker().getClinkerExport()}</td>
                                <td contenteditable='true'>${existingGHGInputCement.getGhgInputCementClinker().getReference()}</td>
                            </tr>
                            
                            </tbody>
                        </table></div>
                        </div>
                        </div>
				
	     <div class="form-group">
                <span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="remarks">${existingGHGInputCement.getGhgInputCementList()[0].getRemarks()}</textarea>
     </div>
</div>

<div id = "commentButton" style="display: none">
<div class="form-group">
<span class="col-sm-3 control-label">Approver Comments</span>
<div class="col-sm-12">
<textarea class="form-control" id="approverRemarks" name="approverRemarks"> </textarea>
</div>
</div>
</div>



<div class="bg-default content-box text-center pad20A mrg25T">
    <button  id = "submitButton"  class="btn bg-pink-600">Save/Submit</button>
</div>
<br>
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
</div></div>

</div></div></form></div></div></div></div></body>

<script>

function calClinker(i,event){
	if(event.keyCode == 53 && event.key!=='5'){
   	  alert("Value can't contain % sign");
    }
	
	  var cementTable = document.getElementById("cementTable");
	  var clinkerTable = document.getElementById("clinkerTable");
	  var cc = 0;
	  for (i = 1; i < cementTable.rows.length; i++){
	       var cells = cementTable.rows.item(i).cells;
	       var cementProduced = cells.item(2).innerHTML;
		   var clinkerFraction = cells.item(3).innerHTML;

		   if(cementProduced == ''){
			   cementProduced = 0;
		      }
		      
		      if(clinkerFraction == ''){
		    	  clinkerFraction = 0;
		      }
		     
		      cc = Number(cc) + Number(cementProduced) * Number(clinkerFraction)/Number(100);
		  
	 }
	  var clinkerCells = clinkerTable.rows.item(1).cells;
      var clinkerImport = clinkerCells.item(1).innerHTML;
      var clinkerExport = clinkerCells.item(2).innerHTML;
      
      if(clinkerImport == ''){
    	  clinkerImport = 0;
      }
      
      if(clinkerExport == ''){
    	  clinkerExport = 0;
      }

        var cp = cc + Number(clinkerExport) - Number(clinkerImport);
        clinkerCells.item(3).innerHTML = cp.toFixed(0);

}

function setCementValues(){
	
    var table = document.getElementById('cementTable');
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
        	   name = "ghgInputCementList["+x+"].cementType";
           }
           if(j==1){
        	   name = "ghgInputCementList["+x+"].amount";
        	   
           }
           
           if(j==2){
        	   name = "ghgInputCementList["+x+"].clinkerFraction";
        	   
           }
           
           if(j==3){
        	   name = "ghgInputCementList["+x+"].reference";
           }
           createHiddenField(name,cellVal);
          
        }
	 }
    return setClinkerValues();
}

function setClinkerValues(){
	var table = document.getElementById('clinkerTable');
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
        	   name = "ghgInputCementClinker.clinkerImport";        	   
           }
           
           if(j==1){
        	   name = "ghgInputCementClinker.clinkerExport";        	   
           }
                      
           if(j==2){
        	   name = "ghgInputCementClinker.reference";
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
	document.getElementById("ghgInputForm").appendChild(input);
	}
}

function getData(){
	var sector = document.getElementById("sector").value;
	var subSector = document.getElementById("subSector").value;
	var category = document.getElementById("category").value;
	var subCategory = document.getElementById("subSector").value;
	var year = document.getElementById("yearId").value;
	
	var url = '/getGHGInputCementExisting?sector=' + sector + '&subSector='+subSector  + '&category='+category + '&subCategory='+subCategory + '&year='+year + '&status=ANY';
	window.location.href = url;

}

$(document).ready(function(){
	
    $(".add-row1").click(function(){
        var cementType = $("#cementType").val();
        var amount = $("#amount").val();
        var clinkerFraction = $("#clinkerFraction").val();
        var reference = $("#ref").val();
        var markup = "<tr><td contenteditable='true'>" + cementType + "</td><td>" + amount + "</td><td>" + clinkerFraction + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#cementTable tbody").append(markup);
        calClinker();
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#cementTable tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
                calClinker();
            }
        });
    });
});
var fromApproval = "<%=fromApprovalDashboard%>";
handleButtonsGHG(fromApproval);


function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	<% if(existingGHGInputCementList!=null && !existingGHGInputCementList.isEmpty()) { %>
	document.getElementById('dataId').value = "<%=existingGHGInputCementList.get(0).getDataId()%>";
	<% } %>
}

<% if(existingGHGInputCementList!=null && !existingGHGInputCementList.isEmpty()) {
	%>
		document.getElementById('fourEyesStatus').value = 'Pending_Update';
		document.getElementById('calcApproach').value = "<%=existingGHGInputCementList.get(0).getCalcApproach()%>";
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
