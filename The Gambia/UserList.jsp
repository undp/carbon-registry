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
	<link rel="shortcut icon" href="global_assets/images/Gambia.png">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
<link href="global_assets/css/icons/icomoon/styles.min.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="global_assets/images/Gambia.png">
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

					
<div class="card border-slate">

		<div class="card-header text-center bg-slate-700">
		<h5 class="card-title text-uppercase">User  - Permissions</h5>
		</div>
<div class="card-body">
					<table class="table table-bordered datatable-button-html5-basic">
						<thead>
							<tr class="font-size-lg">
								<th>User Name</th>
								<th>Email</th>
								<th>Permissions</th>
								<th>Role</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
						<c:forEach var="output" items="${userApprovalList}">
							<tr>
								<td>
										<div class="media-body align-self-center">
											<a class="font-weight-semibold">${output.firstName} ${output.secondName}</a>
											
										</div>
									
								</td>
								<td><a href="#">${output.emailId}</a></td>
								
								<td>
									<ul class="list-unstyled mb-0">
										
										<li>
											GHG:
											<a>${output.ghgPermissions}</a>
										</li>

										<li>
											
											NDC Action:
											<a>${output.projectPermissions}</a>
										</li>
										<li>
											
											Reports:
											<a>${output.reportPermissions}</a>
										</li>
									</ul>
								</td>
								<td><a>${output.role}</a></td>
								
								<c:choose>
											<c:when test="${output.status=='Pending_Insert'}">
										<td>
										<div class="list-icons">
										<div class="dropdown">
										<a
											href="${pageContext.request.contextPath }/adminForm/approve/${output.dataId}"
											id='Approved' onclick="setStatus(this.id);" data-toggle="tooltip" title="Approve"><i class="text-muted"></i>Approve</a>
											<br>
											<br>
										<a href="${pageContext.request.contextPath }/adminForm/rejected/${output.dataId}"
											id='Rejected' onclick="setStatus(this.id);" data-toggle="tooltip" title="Reject"><i class="text-muted"></i>Reject</a></div></div></td></c:when>
										<c:otherwise>
										<td><a
											href="${pageContext.request.contextPath }/adminForm/delete/${output.dataId}"
											id='Deleted' onclick="return confirm('Are you sure you want to delete this user?')" data-toggle="tooltip" title="Delete"><i class="text-muted"></i>Delete</a></td>
											</c:otherwise></c:choose>
								
								<!-- <td class="">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>
										</div>
									</div>
								</td> -->
								
							</tr>
							</c:forEach>
						</tbody>
					</table>
				</div></div>
				</div></div></body>
				<script>
function setStatus(id){
	document.getElementById('fourEyesStatus').value = id;	
}
	
</script>
				
				</html>