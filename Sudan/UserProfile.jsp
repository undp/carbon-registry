<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>User List</title>
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

<script src="assets/js/app.js"></script>

<script src="global_assets/js/demo_pages/form_layouts.js"></script>
<script src="global_assets/js/demo_pages/form_checkboxes_radios.js"></script>
<script src="global_assets/js/plugins/tables/datatables/datatables.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/jszip/jszip.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/pdfmake.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/pdfmake/vfs_fonts.min.js"></script>
<script src="global_assets/js/plugins/tables/datatables/extensions/buttons.min.js"></script>
<script src="global_assets/js/demo_pages/datatables_extension_buttons_html5.js"></script>
<script src="global_assets/js/demo_pages/form_select2.js"></script>
</head>

<body>
<jsp:include page="Menu.jsp" />
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
			<form action="updateUserProfile" class="flex-fill" method="post" modelAttribute="userForm">
											<input type="hidden" name="fourEyesStatus"	id="fourEyesStatus"  value = "Approved"/>
											<input type="hidden" name="dataId" id="dataId" value="${userReg.dataId}">		
<div class="card border-pink">

		<div class="card-header text-center bg-pink-600">
		<h5 class="card-title text-uppercase">User Profile</h5>
		</div>
<div class="card-body">
					<div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">First Name</label>
    <div class="col-lg-3">
  	 <input name="firstName" class="form-control" value = "${userReg.firstName}">
      
	  </div>
	  <label class="col-lg-2 col-form-label text-right">Second Name</label>
    <div class="col-lg-3">
  	 <input name="secondName" class="form-control" value = "${userReg.secondName}">
      
	  </div>
	  </div>
	  
	  <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">E-mail</label>
    <div class="col-lg-3">
  	 <input name="emailId" readonly class="form-control" value = "${userReg.emailId}">
      
	  </div>
	  <label class="col-lg-2 col-form-label text-right">Department</label>
    <div class="col-lg-3">
  	 <input name="department" class="form-control" value = "${userReg.department}">
      
	  </div>
	  </div>
	  
	  <div class="form-group row">
    <label class="col-lg-2 col-form-label text-right">Contact No.</label>
    <div class="col-lg-3">
  	 <input name="contact" class="form-control" value = "${userReg.contact}">
      
	  </div>
	  </div>
     <div class="bg-default content-box text-center pad20A mrg25T">
<button  id = "submitButton"  class="btn bg-pink-600">Update Profile</button>
</div>			</div></div></form>
				</div></div></body>
				<script>
function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;	
}
	
</script>
				
				</html>