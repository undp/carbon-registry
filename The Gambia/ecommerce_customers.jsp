<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Climate Finance</title>
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
<script src="global_assets/js/plugins/uploaders/fileinput/fileinput.min.js"></script>
<script src="global_assets/js/plugins/forms/selects/bootstrap_multiselect.js"></script>
<script src="global_assets/js/plugins/forms/inputs/touchspin.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/switch.min.js"></script>
<script src="global_assets/js/plugins/forms/styling/switchery.min.js"></script>

<script src="assets/js/app.js"></script>

<script src="global_assets/js/demo_pages/form_layouts.js"></script>
<script src="global_assets/js/demo_pages/form_checkboxes_radios.js"></script>
<script src="global_assets/js/demo_pages/datatables_extension_buttons_html5.js"></script>
<script src="global_assets/js/demo_pages/form_select2.js"></script>
<script src="global_assets/js/demo_pages/form_multiselect.js"></script>
<script src="global_assets/js/demo_pages/uploader_bootstrap.js"></script>



<!-- /theme JS files -->

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
		<h5 class="card-title text-uppercase">User List</h5>
		</div>

					<table class="table table-striped text-nowrap table-customers">
						<thead>
							<tr>
								<th>Customer</th>
								<th>Registered</th>
								<th>Email</th>
								<th>Payment method</th>
								<th>Orders history</th>
								<th>Value</th>
								<th>Actions</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">James Alexander</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.12.30
											</div>
										</div>
									</div>
								</td>
								<td>July 12, 2016</td>
								<td><a href="#">james@interface.club</a></td>
								<td>MasterCard</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">25 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">34 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 322.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Jeremy Victorino</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.03.05
											</div>
										</div>
									</div>
								</td>
								<td>September 4, 2016</td>
								<td><a href="#">jeremy@interface.club</a></td>
								<td>Cash on delivery</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">43 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">65 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 1,432.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Margo Baker</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.03.27
											</div>
										</div>
									</div>
								</td>
								<td>July 10, 2016</td>
								<td><a href="#">margo@interface.club</a></td>
								<td>Paypal</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">38 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">53 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 489.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Monica Smith</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.10.03
											</div>
										</div>
									</div>
								</td>
								<td>June 27, 2016</td>
								<td><a href="#">monica@interface.club</a></td>
								<td>Cash on delivery</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">15 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">235 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 940.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Jemmy Royle</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.11.25
											</div>
										</div>
									</div>
								</td>
								<td>January 2, 2016</td>
								<td><a href="#">jemmy@interface.club</a></td>
								<td>MasterCard</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">23 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">65 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 772.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Ashlynn Ben</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.04.14
											</div>
										</div>
									</div>
								</td>
								<td>February 25, 2016</td>
								<td><a href="#">ashlynn@interface.club</a></td>
								<td>MasterCard</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">23 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">75 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 662.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Ray Sammy</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.02.20
											</div>
										</div>
									</div>
								</td>
								<td>March 20, 2016</td>
								<td><a href="#">ray@interface.club</a></td>
								<td>Visa</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">42 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">542 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 499.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Brian Leslie</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.12.24
											</div>
										</div>
									</div>
								</td>
								<td>July 12, 2016</td>
								<td><a href="#">brian@interface.club</a></td>
								<td>Paypal</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">14 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">45 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 946.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Patrick Marilynn</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.09.28
											</div>
										</div>
									</div>
								</td>
								<td>October 4, 2016</td>
								<td><a href="#">patrick@interface.club</a></td>
								<td>Wire transfer</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">24 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">76 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 538.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Roland Cydney</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.02.12
											</div>
										</div>
									</div>
								</td>
								<td>August 1, 2016</td>
								<td><a href="#">roland@interface.club</a></td>
								<td>Paypal</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">27 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">236 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 432.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Deanna Joss</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.05.20
											</div>
										</div>
									</div>
								</td>
								<td>May 17, 2016</td>
								<td><a href="#">deanna@interface.club</a></td>
								<td>Visa</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">53 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">236 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 472.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Dawn Justin</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.06.17
											</div>
										</div>
									</div>
								</td>
								<td>May 12, 2016</td>
								<td><a href="#">dawn@interface.club</a></td>
								<td>Wire transfer</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">63 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">75 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 402.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Blondie Madison</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.01.26
											</div>
										</div>
									</div>
								</td>
								<td>March 26, 2016</td>
								<td><a href="#">blondie@interface.club</a></td>
								<td>MasterCard</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">12 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">53 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 839.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Derryl Carrie</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.09.15
											</div>
										</div>
									</div>
								</td>
								<td>July 26, 2016</td>
								<td><a href="#">derryl@interface.club</a></td>
								<td>Visa</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">43 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">90 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 471.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Vincent Doris</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.02.23
											</div>
										</div>
									</div>
								</td>
								<td>June 25, 2016</td>
								<td><a href="#">vincent@interface.club</a></td>
								<td>MasterCard</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">41 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">76 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 902.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Diantha Royston</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.02.04
											</div>
										</div>
									</div>
								</td>
								<td>September 25, 2016</td>
								<td><a href="#">diantha@interface.club</a></td>
								<td>Paypal</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">7 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">234 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 543.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Lilian Knox</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.05.18
											</div>
										</div>
									</div>
								</td>
								<td>March 5, 2016</td>
								<td><a href="#">lilian@interface.club</a></td>
								<td>Visa</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">8 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">34 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 2,472.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Toria Eveline</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.03.28
											</div>
										</div>
									</div>
								</td>
								<td>August 26, 2016</td>
								<td><a href="#">toria@interface.club</a></td>
								<td>MasterCard</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">53 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">90 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 2,372.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Tiffany Willemina</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.07.29
											</div>
										</div>
									</div>
								</td>
								<td>November 19, 2016</td>
								<td><a href="#">tiffany@interface.club</a></td>
								<td>Paypal</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">21 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">42 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 1,930.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Trenton Alison</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.09.16
											</div>
										</div>
									</div>
								</td>
								<td>July 25, 2016</td>
								<td><a href="#">trenton@interface.club</a></td>
								<td>Wire transfer</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">5 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">29 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 830.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Brandon Gilbert</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.11.25
											</div>
										</div>
									</div>
								</td>
								<td>December 26, 2016</td>
								<td><a href="#">brandon@interface.club</a></td>
								<td>Paypal</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">15 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">89 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 903.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Troy Webster</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.10.24
											</div>
										</div>
									</div>
								</td>
								<td>May 29, 2016</td>
								<td><a href="#">troy@interface.club</a></td>
								<td>MasterCard</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">12 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">53 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 394.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Elbert Cailyn</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.08.20
											</div>
										</div>
									</div>
								</td>
								<td>February 28, 2016</td>
								<td><a href="#">elbert@interface.club</a></td>
								<td>Visa</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">10 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">93 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 192.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Coen Grant</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.12.24
											</div>
										</div>
									</div>
								</td>
								<td>June 17, 2016</td>
								<td><a href="#">coen@interface.club</a></td>
								<td>MasterCard</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">19 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">75 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 252.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>

							<tr>
								<td>
									<div class="media">
										<div class="mr-3">
											<a href="user_pages_profile_tabbed.html">
												<img src="global_assets/images/placeholders/placeholder.jpg" width="40" height="40" class="rounded-circle" alt="">
											</a>
										</div>

										<div class="media-body align-self-center">
											<a href="user_pages_profile_tabbed.html" class="font-weight-semibold">Charles Elian</a>
											<div class="text-muted font-size-sm">
												Latest order: 2016.01.28
											</div>
										</div>
									</div>
								</td>
								<td>September 21, 2016</td>
								<td><a href="#">charles@interface.club</a></td>
								<td>MasterCard</td>
								<td>
									<ul class="list-unstyled mb-0">
										<li>
											<i class="icon-infinite font-size-base text-warning mr-2"></i>
											Pending:
											<a href="#">3 orders</a>
										</li>

										<li>
											<i class="icon-checkmark3 font-size-base text-success mr-2"></i>
											Processed:
											<a href="#">19 orders</a>
										</li>
									</ul>
								</td>
								<td>
									<h6 class="mb-0 font-weight-semibold">&euro; 2,345.00</h6>
								</td>
								<td class="text-right">
									<div class="list-icons">
										<div class="dropdown">
											<a href="#" class="list-icons-item" data-toggle="dropdown">
												<i class="icon-menu7"></i>
											</a>

											<div class="dropdown-menu dropdown-menu-right">
												<a href="#" class="dropdown-item"><i class="icon-file-pdf"></i> Invoices</a>
												<a href="#" class="dropdown-item"><i class="icon-cube2"></i> Shipping details</a>
												<a href="#" class="dropdown-item"><i class="icon-credit-card"></i> Billing details</a>
												<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item"><i class="icon-warning2"></i> Report problem</a>
											</div>
										</div>
									</div>
								</td>
								<td class="pl-0"></td>
							</tr>
						</tbody>
					</table>
				</div>
				</div></div></body></html>