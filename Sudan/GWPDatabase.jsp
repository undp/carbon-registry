<%@page import="com.sudan.model.ghg.energy.*"%>

<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>GWP Database</title>
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


<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
	<div class="card border-pink">
					<div class="card-header bg-pink-600">
						<h5 class="card-title text-uppercase text-center">GWP Database</h5>
											</div>
	<div class="card-body">										
<form action="saveGHGGWP" onsubmit="return setValues();" method="post" class="form-horizontal bordered-row" id="gwpForm" data-parsley-validate="">
<div class="card-body font-size-lg">
    					<div class="table-responsive">
						<table class="table table-bordered datatable-button-html5-basic" id="gwpTable">
    <thead>
                            <tr class="bg-pink-600">
                            	<th>Gas Name</th>
                                <th>GWP</th>
                                <th>Reference</th>
                                <th>Select</th>
                             </tr>
                            </thead>
                            <tbody>
	                            <c:forEach var="output" varStatus="loop" items="${ghgGWPList}">
                            	
									<tr class="">
										<td>${output.getGas()}</td>
										<td contenteditable='true' class ="input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">${output.getGwp()}</td>	
										<td contenteditable='true'>${output.getReference()}</td>
										<td><input type="checkbox" name='record'></td>
									</tr>
							    </c:forEach>
							    </tbody>
                        </table>
    </div><input type="button" class="btn btn-sm bg-pink-600 delete-row1" value="Delete Row">
    
    <br><hr>
    
     <div class="form-group row">
      <div class="col-lg-2">
      <br>
      <h6>Add New Gas</h6>
      </div>
   <div class="col-lg-4">Gas
   <input id="gas" class="form-control">
    </div>
    <div class="col-lg-2 font-size-sm">GWP
   <input id = 'gwp' class="form-control input-mask-trigger" data-inputmask="'alias': 'decimal', 'autoGroup': true" im-insert="true">
    </div>
    <div class="col-lg-2 font-size-sm">Reference
   <input type="text" id = 'ref' class="form-control">
   </div>
   <div class="col-lg-1">
   <br>
   <button type="button" class="btn btn-sm bg-pink-600 add-row1">Add</button>
  </div></div><hr>
						 
						 <div class="bg-default content-box text-center pad20A mrg25T">
                    <button  id = "submitButton" class="btn bg-pink-600">Save/Submit</button>
                </div>
	</div></form></div></div></div></div></body>
    
    <script>
    function setValues(){
        var table = document.getElementById('gwpTable');
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
            	   name = "ghgGWPList["+x+"].gas";
            	}
               if(j==1){
            	   name = "ghgGWPList["+x+"].gwp";
            	}
               if(j==2){
            	   name = "ghgGWPList["+x+"].reference";
            	
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
    	document.getElementById("gwpForm").appendChild(input);
    	}
    }

 $(document).ready(function(){
		
	    $(".add-row1").click(function(){
	        var gas = $("#gas").val();
	        var gwp = $("#gwp").val();
	        var reference = $("#ref").val();
	        var markup = "<tr><td contenteditable='true'>" + gas + "</td><td contenteditable='true'>" + gwp + "</td><td contenteditable='true'>" + reference + "</td><td><input type='checkbox' name='record'></td></tr>";
	        $("#gwpTable tbody").append(markup);
	    });
	    
	    // Find and remove selected table rows
	    $(".delete-row1").click(function(){
	        $("#gwpTable tbody").find('input[name="record"]').each(function(){
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
