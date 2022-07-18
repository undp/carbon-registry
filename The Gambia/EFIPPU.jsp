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
<title>EF Database</title>

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

<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
<div class="card border-slate">
	<div class="card-header bg-slate-700">
		<h5 class="card-title text-uppercase text-center">Emission Factor - IPPU</h5>
	</div>

	<div class="card-body">
	<form action="saveGHGIPPUEmissionFactor" onsubmit="return setValues();" method="post" class="form-horizontal bordered-row" id="ghgInputForm" data-parsley-validate="">
                    
<div class="card-body font-size-lg">
                
                
<div class="form-group">
      				<div class="card">
                    <div class="card-body">
                   <h6 class="card-title">Emission Factors - IPPU</h6>
      <div class="table-responsive">
						<table class="table table-bordered" id="ippuTable">
                            <thead>
                            <tr class="bg-slate-700">
                            	<th>Sub-Sector</th>
                                <th>Emission factor</th>
                                <th>Unit</th>
                                <th>Reference</th>
                             </tr>
                            </thead>
                            <tbody>
	                            <tr>
	                               
	                                <td>Cement</td>
	                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${emissionFactorList[0].getEmissionFactor()}</td>
	                                <td>tCO<sub>2</sub>/ton of clinker</td>
									<td contenteditable='true'>${emissionFactorList[0].getReference()}</td>
	                            </tr>
	                            
	                           <tr>
	                              
	                                <td>Lime</td>
	                                <td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${emissionFactorList[1].getEmissionFactor()}</td>
	                                <td>tCO<sub>2</sub>/ton of lime</td>
									<td contenteditable='true'>${emissionFactorList[1].getReference()}</td>
	                            </tr>
	                            
                            </tbody>
                        </table>
                           </div></div></div></div>
				<div class="bg-default content-box text-center pad20A mrg25T">
    <button  id = "submitButton"  class="btn bg-slate-700">Save/Submit</button>
</div>

</div></form></div></div></div></div></body>

<script>

function setValues(){
    var table = document.getElementById('ippuTable');
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
        	   name = "ghgIPPUEmissionFactorList["+x+"].subSector";
           }
           if(j==1){
        	   name = "ghgIPPUEmissionFactorList["+x+"].emissionFactor";
           }
           if(j==3){
        	   name = "ghgIPPUEmissionFactorList["+x+"].reference";
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
        var markup = "<tr><td>" + animal + "</td><td contenteditable='true'>" + value + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
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
