<%@page import="com.gambia.model.ghg.afolu.*"%>
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

List<GHGInputRice> existingGHGInputRice = null;

if(request.getAttribute("existingGHGInputRice")!=null){
	existingGHGInputRice = (List<GHGInputRice>)request.getAttribute("existingGHGInputRice");
	
	
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
<div class="card border-slate">
	<div class="card-header bg-slate-700">
		<h5 class="card-title text-uppercase text-center">GHG Inventory - Rice Cultivation</h5>
	</div>

	<div class="card-body">
	<form action="saveGHGInputRice" method="post" onsubmit="return setValues();" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
                    <input type="hidden" name = "fourEyesStatus" id = "fourEyesStatus" value="">
                   <input type="hidden" name = "ghgInput.dataId" id = "dataId" >
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
   <div class="col-lg-3">
   <input name="ghgInput.calcApproach" readonly="readonly" class="form-control" value="Tier 1"> 
   </div>
  </div>
  <hr>            
                
<div class="form-group">
      				<div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Rice Data</h5><hr>

                 <table class="table table-bordered" id="riceTable">
                     <thead>
                     <tr class="bg-slate-700">
                     	<th>Eco system</th>
                         <th>Upland</th>
                         <th>Irrigated</th>
                         <th>Rainfed</th>
                         <th>Deepwater</th>
                         
</tr>
                     </thead>
                     <tbody>
                     <tr>
                         <td>Sub Category</td>
                         <td contenteditable='true'>${riceMap.get("subCat").getUpland()}</td>
                         <td contenteditable='true'>${riceMap.get("subCat").getIrrigated()}</td>
                         <td contenteditable='true'>${riceMap.get("subCat").getRainfed()}</td>
                         <td contenteditable='true'>${riceMap.get("subCat").getDeepwater()}</td>   
                     </tr>
                     <tr>
                     	<td>Harvested Area (Ha)</td>
                     	<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("harvested").getUpland()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("harvested").getIrrigated()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("harvested").getRainfed()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("harvested").getDeepwater()}</td>
                     </tr>
                     <tr>
                         <td>Cultivation Period (days)</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("cultivation").getUpland()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("cultivation").getIrrigated()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("cultivation").getRainfed()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("cultivation").getDeepwater()}</td>
                         </tr>
                         <tr>
                         
                         <td>Baseline Emission Factor w/o Organic Amendments (kgCH<sub>4</sub>/ha/day)</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("baselineEf").getUpland()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("baselineEf").getIrrigated()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("baselineEf").getRainfed()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("baselineEf").getDeepwater()}</td>
                         </tr>
                         <tr>
                         
                         <td>Scaling Factor - Water Regime (Cultivation Period)</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingCult").getUpland()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingCult").getIrrigated()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingCult").getRainfed()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingCult").getDeepwater()}</td>
                         </tr>
                         <tr>
                         
                         <td>Scaling Factor - Water Regime (pre-season)</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingPre").getUpland()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingPre").getIrrigated()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingPre").getRainfed()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingPre").getDeepwater()}</td>
                         </tr>
                         <tr>
                         <td>Organic Amendment Applied (tonnes/ha)</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("organicAmend").getUpland()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("organicAmend").getIrrigated()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("organicAmend").getRainfed()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("organicAmend").getDeepwater()}</td>
                         </tr>
                         <tr>
                         <td>Conversion factor Organic Amendment</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("cfOrganic").getUpland()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("cfOrganic").getIrrigated()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("cfOrganic").getRainfed()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("cfOrganic").getDeepwater()}</td>
                         </tr>
                         <tr>
                         
                         <td>Scaling factor for soil type, rice cultivar, etc.</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingOther").getUpland()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingOther").getIrrigated()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingOther").getRainfed()}</td>
                         <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${riceMap.get("scalingOther").getDeepwater()}</td>
                         </tr>
                         <tr>
                         
			<td>Reference</td>
						 <td contenteditable='true'>${riceMap.get("reference").getUpland()}</td>
                         <td contenteditable='true'>${riceMap.get("reference").getIrrigated()}</td>
                         <td contenteditable='true'>${riceMap.get("reference").getRainfed()}</td>
                         <td contenteditable='true'>${riceMap.get("reference").getDeepwater()}</td>
                         </tr>
                     
                     </tbody>
                 </table>
                   </div>
					</div></div>
				
	     <div class="form-group">
                <span class="col-sm-3 control-label">Remarks</span>
<div class="col-sm-12">
				<textarea class="form-control" id="remarks" name="remarks" placeholder="${existingGHGInputRice[0].getRemarks()}"></textarea>
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
    <button  id = "submitButton"  class="btn bg-slate-700">Save/Submit</button>
</div>

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
</div></div></div></form></div></div></div></div></body>

<script>
var jsMap = new Map(); 
jsMap.set('Sub Category','subCat');
jsMap.set('Harvested Area (Ha)','harvested');
jsMap.set('Cultivation Period (days)','cultivation');
jsMap.set('Baseline Emission Factor w/o Organic Amendments (kgCH<sub>4</sub>/ha/day)','baselineEf');
jsMap.set('Scaling Factor - Water Regime (Cultivation Period)','scalingCult');
jsMap.set('Scaling Factor - Water Regime (pre-season)','scalingPre');
jsMap.set('Organic Amendment Applied (tonnes/ha)','organicAmend');
jsMap.set('Conversion factor Organic Amendment','cfOrganic');
jsMap.set('Scaling factor for soil type, rice cultivar, etc.','scalingOther');
jsMap.set('Reference','reference');

function setValues(){
    var table1 = document.getElementById('riceTable');
    var rowLength1 = table1.rows.length;
    
    for (i = 1; i < rowLength1; i++){
       var cells = table1.rows.item(i).cells;
       var cellLength = cells.length;
       
       var name ;
       var x = i-1;
       for(var j = 0; j < cellLength; j++){
           var cell = cells.item(j);
           var cellVal = cell.innerHTML;
          
           if(j==0){
        	   name = "ghgInputRiceList["+x+"].ecosystem";
        	   cellVal = jsMap.get(cellVal);        	   
           }
           if(j==1){
        	   name = "ghgInputRiceList["+x+"].upland";
           } 
           if(j==2){
        	   name = "ghgInputRiceList["+x+"].irrigated";
        	   
           }
           if(j==3){
        	   name = "ghgInputRiceList["+x+"].rainfed";
        	   
           }
           if(j==4){
        	   name = "ghgInputRiceList["+x+"].deepwater";
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
	
	var url = '/getGHGInputRiceExisting?sector=' + sector + '&subSector='+subSector  + '&category='+category + '&subCategory='+subCategory + '&year='+year + '&status=ANY';
	window.location.href = url;

}
var fromApproval = "<%=fromApprovalDashboard%>";
handleButtons(fromApproval);

function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;
	<% if(existingGHGInputRice!=null && !existingGHGInputRice.isEmpty()) { %>
	document.getElementById('dataId').value = "<%=existingGHGInputRice.get(0).getDataId()%>";
	<% } %>
}

    <% if(existingGHGInputRice!=null && !existingGHGInputRice.isEmpty()) {
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
