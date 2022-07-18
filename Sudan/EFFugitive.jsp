<%@page import="com.sudan.model.ghg.*"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
<title>EF Database</title>

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

<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
<div class="card border-pink">
	<div class="card-header bg-pink-600">
		<h5 class="card-title text-uppercase text-center">Emission Factor - Fugitive Emissions</h5>
	</div>

	<div class="card-body">
	<form action="saveGHGFugitiveMapping" onsubmit="return setValues();" method="post" class="form-horizontal bordered-row" id="energyForm" data-parsley-validate="">
                    
<div class="card-body font-size-lg">
                
                
<div class="form-group">
<div class="tab-container">
<ul class="nav nav-tabs justify-content-center nav-fill "  role="tablist">
    <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#oil" role="tab">Fugitive Emission Factors - Oil</a>
</li>
<li class="nav-item">
    <a class="nav-link" data-toggle="tab" href="#gas" role="tab">Fugitive Emission Factors - Natural Gas</a>
</li>
</ul>
<br>                                    
   <div class="tab-content">
      <div class="tab-pane active fade show" id="oil" role="tabpanel">
      				<div class="card">
                    <div class="card-body">
                                
                             <h6 class="card-title">Fugitive Emissions - Oil</h6>
      <div class="table-responsive">
						<table id="oilTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-pink-600">
                                <th>Category</th>
                                <th>Sub-Category</th>
                                <th>Source</th>
                                 <th>CH<sub>4</sub> Emission Factor</th>
                                 <th>CO<sub>2</sub> Emission Factor</th>
                                 <th>N<sub>2</sub>O Emission Factor</th>
                              	<th>Unit</th>
                              	<th>Reference</th>
                                 
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="output" varStatus="loop" items="${ghgFugitiveMappingList}">
                            <c:if test = "${output.getType() eq 'oilTable' }">
                            <tr class="font-size-sm">
                            <td>${output.getCat()}</td>
							<td>${output.getSubCat()}</td>
							<td>${output.getSource()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEfch4()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEfco2()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getEfn2o()}</td>
							<td>${output.getUnit()}</td>
							<td contenteditable='true'>${output.getReference()}</td>
							</tr>
                            </c:if>
                            </c:forEach>
                            </tbody>
                           </table> 
						</div><br>
                                   </div></div></div>   
	     
	     <div class="tab-pane fade" id="gas" role="tabpanel">
	     	<div class="card">
                    <div class="card-body">
                                       
                             <h6 class="card-title">Fugitive Emissions - Natural Gas</h6>
    				  <div class="table-responsive">
						<table id="gasTable" class="table table-bordered table-striped">
	                    
                           <thead>
                            <tr class="bg-pink-600">
                                <th>Category</th>
                                <th>Sub-Category</th>
                                <th>Source</th>
                                 <th>CH<sub>4</sub> Emission Factor</th>
                                 <th>CO<sub>2</sub> Emission Factor</th>
                                 <th>N<sub>2</sub>O Emission Factor</th>
                              	<th>Unit</th>
                              	<th>Reference</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:forEach var="output" varStatus="loop" items="${ghgFugitiveMappingList}">
                            <c:if test = "${output.getType() eq 'gasTable'}">
                            <tr class="font-size-sm">
                            <td>${output.getCat()}</td>
							<td>${output.getSubCat()}</td>
							<td>${output.getSource()}</td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"><fmt:formatNumber type="number" minFractionDigits="4" maxFractionDigits="20" value="${output.getEfch4()}"></fmt:formatNumber> </td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"><fmt:formatNumber type="number" minFractionDigits="4" maxFractionDigits="20" value="${output.getEfco2()}"></fmt:formatNumber></td>
							<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true"><fmt:formatNumber type="number" minFractionDigits="4" maxFractionDigits="20" value="${output.getEfn2o()}"></fmt:formatNumber></td>
							<td>${output.getUnit()}</td>
							<td contenteditable='true'>${output.getReference()}</td>
							</tr>
                            </c:if>
                            </c:forEach>
                            </tbody>
                           </table> 
						</div><br>
								</div></div></div>  
	     
	     



</div></div></div>
				<div class="bg-default content-box text-center pad20A mrg25T">
    <button  id = "submitButton"  class="btn bg-pink-600">Save/Submit</button>
</div>

</div></form></div></div></div></div></body>

<script>

function setValues(){
	var table1 = document.getElementById('oilTable');
    var rowLength1 = table1.rows.length;
    var index1 = 0 ;
    handle(table1,rowLength1,index1,'oilTable');
    
    var table2 = document.getElementById('gasTable');
    var rowLength2 = table2.rows.length;
    var index2 = document.getElementById('oilTable').rows.length - 1;
    handle(table2,rowLength2,index2,'gasTable');
    
}

function handle(table,rowLength,x,tableId){
	
	for (i = 1; i < rowLength; i++){
	       var cells = table.rows.item(i).cells;
	       var cellLength = cells.length;
	       for(var j = 0; j < cellLength; j++){
	           var cell = cells.item(j);
	           var cellVal = cell.innerHTML;
	           var name ;
	           if(j==0){
	        	   name = "fugitiveMappingList["+x+"].cat";
	        	   
	        	   var name2 = "fugitiveMappingList["+x+"].type";
	        	   var cellVal2 = tableId;
	        	   createHiddenField(name2,cellVal2);
	        	}
	           if(j==1){
	        	   name = "fugitiveMappingList["+x+"].subCat";
	        	}
	           if(j==2){
	        	   name = "fugitiveMappingList["+x+"].source";
	           }
	           
	           if(j==3){
	        	   name = "fugitiveMappingList["+x+"].efch4";
	           }
	           
	           if(j==4){
	        	   name = "fugitiveMappingList["+x+"].efco2";
	           }
	           
	           if(j==5){
	        	   name = "fugitiveMappingList["+x+"].efn2o";
	           }
	           
	           if(j==6){
	        	   name = "fugitiveMappingList["+x+"].unit";
	           }
	           
	           if(j==7){
	        	   name = "fugitiveMappingList["+x+"].reference";
	           }
	           
	           createHiddenField(name,cellVal);
	          
	        }
	       
	       x++;
	}
	return true;
}
function createHiddenField(name, value){
	if(document.getElementsByName(name).length != 0) { //already exist
		
	}else{
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", name);
		input.setAttribute("id", name);
		input.setAttribute("value", value); 
		document.getElementById("energyForm").appendChild(input);
	}
	
}

</script>                   
<script src="global_assets/input-mask.js"></script>
   <script src="global_assets/js/input-mask.js"></script>
</html>
