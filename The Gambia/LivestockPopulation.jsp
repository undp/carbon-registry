<%@page import="com.gambia.model.ghg.*"%>
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
<%
String selectedYear = (String)request.getAttribute("selectedYear");

if(request.getAttribute("years") !=null){
	session.setAttribute("years", request.getAttribute("years"));
}

//String fromApprovalDashboard = request.getParameter("fromApprovalDashboard"); 
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
		<h5 class="card-title text-uppercase text-center">GHG Inventory - Livestock Population</h5>
	</div>

	<div class="card-body">
	<form action="saveLivestockPopulation" method="post" onsubmit="return setValues();" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
                    
<div class="card-body font-size-lg">
    <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Inventory Year</label>
    <div class="col-lg-3">
  	<select name="year" required onchange="getData();" data-placeholder="--Select--" class="form-control select" id="yearId"  data-fouc>
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
  </div>
  <hr>            
                
<div class="form-group">
      				<div class="card">
                    <div class="card-body">
                   <h6 class="card-title">Livestock Population</h6>
      <div class="table-responsive">
						<table id="livestockTable" class="table table-bordered table-striped">
	                    
                            <thead>
                            <tr class="bg-slate-700">
                                <th>Category</th>
                                <th>Heads</th>
                                <th>Reference</th>
                                 <th>Select</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="output" varStatus="loop" items="${livestockPopulation}">
                            <tr>
                            			<td>${output.getAnimalcategory()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getHead()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
										<td><input type="checkbox" name="record" ></td>
								</tr>		
                            </c:forEach>
                            </tbody>
                           </table><br>
                           <div>
                        			<input type="button" class="btn btn-sm bg-slate-700 delete-row1" value="Delete Row">
                                   </div>
						</div><hr>
						
						
						  <h6 class="card-title">Add Livestock Data</h6>
						  
						 <div class="form-group row">
   <div class="col-lg-3">Category
   <select name="ghgInputElecList[0].fuel" id="animal" data-placeholder="--Select--" class="form-control select">
   <option></option>
   <c:forEach var="listValue" items="${livestockDatabase}">
							<option value="${listValue.getAnimalcategory()}">${listValue.getAnimalcategory()}</option>
							</c:forEach>
    </select>
    </div>
    <div class="col-lg-2">Heads
   <input id = 'heads' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
   </div>
    <div class="col-lg-2">Reference
   <input type="text" id = 'ref'class="form-control">
   </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-slate-700 add-row1">Add</button>
  </div></div>
  </div></div></div>
				
	     <div class="form-group">
                <span class="col-sm-3 control-label" style="color:black;">Remarks</span>
<div class="col-sm-12">
<textarea class="form-control" id="remarks" name="remarks" placeholder="${livestockPopulation[0].getRemarks()}"></textarea>
     </div>
</div>

<div id = "commentButton" style="display: none">
<div class="form-group">
<span class="col-sm-3 control-label" style="color:black;">Approver Comments</span>
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
<button id = "Approved" class="btn bg-info-700">Approve</button>
</div>
</div>
</div>
</div>
 

<div class="col-md-4">
<div class="form-group">
<div class="col-sm-6">
<div id = "rejectionButton" style="display: none">
<button id = "Rejected" class="btn bg-info-700">Reject</button>
</div> 
</div>
</div>
</div></div></div></form></div></div></div></div></div></body>

<script>

var min = 1990,
max = 2050,
select = document.getElementById('yearId');
for (var i = min; i<=max; i++){
   var opt = document.createElement('option');
   opt.value = i;
   opt.innerHTML = i;
   select.appendChild(opt);
}

function setValues(){
    var table = document.getElementById('livestockTable');
    var rowLength = table.rows.length;
    
    for (i = 1; i < rowLength; i++){
       var cells = table.rows.item(i).cells;
       var cellLength = cells.length;
      
       var x = i-1;
       for(var j = 0; j < cellLength; j++){
           var cell = cells.item(j);
           var cellVal = cell.innerHTML;
    
           var name ;
           if(j==0 ){
        	   name = "livestockPopulationList["+x+"].animalcategory";
           }
           if(j==1){
        	   name = "livestockPopulationList["+x+"].head";
           }
           if(j==2){
         	  name = "livestockPopulationList["+x+"].reference";
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
		input.setAttribute("id", name);
		input.setAttribute("value", value); 
		document.getElementById("ghgInputForm").appendChild(input);
	}
	
}

$(document).ready(function(){
	
    $(".add-row1").click(function(){
        var animal = $("#animal").val();
        var value = $("#heads").val();
        var reference = $("#ref").val();
        var markup = "<tr><td>" + animal + "</td><td>" + value + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#livestockTable tbody").append(markup);
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#livestockTable tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});   

function getData(){
	var year = document.getElementById("yearId").value;
	
	var url = '/getLivestockPopulationExisting?year='+year;
	window.location.href = url;

}
</script>                   
<script src="global_assets/input-mask.js"></script>
   <script src="global_assets/js/input-mask.js"></script>
</html>
