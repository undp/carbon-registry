<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>My Approvals</title>
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

					
<div class="card border-pink">

		<div class="card-header text-center bg-pink-600">
		<h5 class="card-title text-uppercase">Pending Approvals</h5>
		</div>
<div class="card-body">
					<table class="table table-bordered">
						<thead>
							<tr class="font-size-lg">
								<th>Entity</th>
								<th>Entity Id</th>
								<th>Created By</th>
								<th>Created At</th>
								
							</tr>
						</thead>
						<tbody>
							<c:forEach var="output" items="${pendingApprovalsList}">
		<tr>
			<td>${output.getFourEyesState().getEntity()}</td>
			<td>
			<a href=${output.getUrl()}>${output.getFourEyesState().getEntityId()}</a>
			</td>
			<td>${output.getFourEyesState().getCreatedBy()}</td>
			<td>${output.getFourEyesState().getCreatedAt()}</td>
		</tr>	
	</c:forEach>
							
						</tbody>
					</table>
				</div></div>
				</div></div></body></html>