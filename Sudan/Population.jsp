<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Population Database</title>
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
	<script src="global_assets/js/plugins/tables/datatables/datatables.min.js"></script>
	<script src="global_assets/js/plugins/forms/selects/select2.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/jszip/jszip.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js"></script>
	<script src="global_assets/js/plugins/tables/datatables/extensions/buttons.min.js"></script>

	<script src="assets/js/app.js"></script>
	<script src="global_assets/js/demo_pages/datatables_extension_buttons_html5.js"></script>
	<script src="global_assets/js/demo_pages/form_select2.js"></script>
	<!-- /theme JS files -->

</head>
<jsp:include page="Menu.jsp" />

<%
String selectedYear = null;

if(request.getAttribute("year") !=null){
	selectedYear = (String)request.getAttribute("year");

}

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
						<h5 class="card-title text-uppercase text-center">Population</h5>
											</div>
	<div class="card-body">										
<form action="saveGHGPopulation" onsubmit="return setValues();" method="post" class="form-horizontal bordered-row" id="populationForm" data-parsley-validate="">
<div class="card-body">
   
    					<div class="table-responsive">
							<table id="populationTable" class="table table-bordered">
						<thead>
                            <tr class="bg-pink-600">
                                <th>Year</th>
                                <th>Rural Population</th>
                                <th>Urban Population</th>
                                <th>Total Population</th>
                                <th>Reference</th>
                                <th>Action</th>
                             </tr>
                            </thead>
                            <tbody>
	                          <c:forEach var="output" varStatus="loop" items="${ghgPopulation}">
                            		<tr class="font-size-sm">
										<td>${output.getYear()}</td>
										<td contenteditable='true' onkeyup= 'javascript:addTotal(this,event);'>${output.getRuralPopulation()}</td>
										<td contenteditable='true' onkeyup= 'javascript:addTotal(this,event);'>${output.getUrbanPopulation()}</td>
										<td contenteditable='true'>${output.getTotalPopulation()}</td>
										<td contenteditable='true'>${output.getReference()}</td>
										<td><input type="checkbox" name='record'></td>
									</tr>
							    </c:forEach>  
                            </tbody>
                        </table>
                        <br>
                         <input type="button" class="btn btn-sm bg-pink-600 delete-row1" value="Delete Row">
                        <hr>
                          <h6 class="card-title">Add Population</h6>
                        <div class="form-group row">
   
   <div class="col-lg-2 font-size-sm">Inventory Year
  <select name="year" id="year" data-placeholder="--Select--" class="form-control select" data-fouc>
  	<option></option>
    </select>
     </div>
   <div class="col-lg-2 font-size-sm">Rural Population
   <input id="ruralPopulation" class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
  </div>
    <div class="col-lg-2 font-size-sm">Urban Population
   <input id = 'urbanPopulation'  class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
  </div>
    <div class="col-lg-2 font-size-sm">Reference
   <input type="text" id = 'ref'class="form-control">
    </div>
    <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-pink-600 add-row1">Add</button>
  </div>
   </div>
    </div></div>
    <div class="bg-default content-box text-center pad20A mrg25T">
                    	<button  id = "submitButton" class="btn bg-pink-600">Save/Submit</button>
                		</div>
    </form></div></div></div></div></body>
    
    <script>
    function setValues(){
        var table = document.getElementById('populationTable');
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
              	 name = "ghgPopulationList["+x+"].year";
              	   
                 }
               
               if(j==1){
            	 name = "ghgPopulationList["+x+"].ruralPopulation";
            	   
               }
               if(j==2){
            	   name = "ghgPopulationList["+x+"].urbanPopulation";
            	   
               }
               if(j==3){
            	   name = "ghgPopulationList["+x+"].totalPopulation";
            	   
               }
               if(j==4){
            	   name = "ghgPopulationList["+x+"].reference";
            	   
               }
               createHiddenField(name,cellVal);
              
            }
    	 }

    }
    
    function addTotal(k,event){
    	
    	var table = document.getElementById("populationTable");
    	 var rowLength = table.rows.length;
    	 for (var i = 1; i < rowLength; i++){
             var cells = table.rows.item(i).cells;
             var cellLength = cells.length;
        
             var ruralPopulation = cells.item(1).innerHTML;
             
             var urbanPopulation = cells.item(2).innerHTML;
             var totalCell = cells.item(3);
             
             if(ruralPopulation == ''){
             	ruralPopulation = 0;
              }
             
             if(urbanPopulation == ''){
             	urbanPopulation = 0;
              }
             
             var totalPopulation = Number(urbanPopulation) + Number(ruralPopulation);
             
             totalCell.innerHTML = totalPopulation;
    	 }
    	 
    }

    function checkYear (){
    	var year = document.getElementById("year").value;
    	if (year==''){
    		alert("Select Inventory Year");
    		return false;
    	}
    	return true;
    }
    
    function createHiddenField(name, value){
    	if(document.getElementsByName(name).length != 0) { //already exist
    	}else{
    	var input = document.createElement("input");
    	input.setAttribute("type", "hidden");
    	input.setAttribute("name", name);
    	input.setAttribute("value", value); 
    	document.getElementById("populationForm").appendChild(input);
    	}
    }
    populateYear('Select');

    function populateYear(val){
    	var min = 1990,
    	max = 2050,
    	select = document.getElementById('year');
    	var opt = document.createElement('option');
    	opt.value = val;
    	opt.innerHTML = val;
    	select.appendChild(opt);
    	
    	for (var i = min; i<=max; i++){
    	   //if(i!=val)){
    		   var opt = document.createElement('option');
    		   opt.value = i;
    		   opt.innerHTML = i;
    		   select.appendChild(opt);
    	  // }
    	}
    }
    
    
</script>

    <%
    if(selectedYear!=null && !selectedYear.equals("") && !selectedYear.equals("Select")) {
    %>
    <script>	
    	var yearToSet = "<%=selectedYear%>";
    	var yearSelect = document.getElementById("year");
    	
    	var i;
    	
    	for(i=yearSelect.options.length-1;i>=0;i--)
    	{
    		yearSelect.remove(i);
    	}
    	yearSelect.options[yearSelect.options.length] = new Option(yearToSet,yearToSet);
    </script>

    <%
    } else {
    %>
<script>
populateYear();
</script>

<% } %>      
<script>
$(document).ready(function(){
	
    $(".add-row1").click(function(){
    	var status = checkYear();
    	if (status == true){
    	var year = $("#year").val();
    	var rural = $("#ruralPopulation").val();
        var urban = $("#urbanPopulation").val();
        var reference = $("#ref").val();
        var markup = "<tr><td>" + year + "</td><td contenteditable='true' onkeyup= 'javascript:addTotal(this,event);'>" + rural + "</td><td contenteditable='true' onkeyup= 'javascript:addTotal(this,event);'>" + urban + "</td><td></td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
        $("#populationTable tbody").append(markup);
		addTotal();
    	}
        
    });
    
    // Find and remove selected table rows
    $(".delete-row1").click(function(){
        $("#populationTable tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
            }
        });
    });
});  
</script>
	<script src="global_assets/input-mask.js"></script>
   <script src="global_assets/js/input-mask.js"></script>
</html>
