<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Vanuatu's NDC MRV Tool</title>
	<!-- Global stylesheets -->
	<link rel="shortcut icon" href="global_assets/images/vanuatu.png">
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
	<script src="global_assets/js/plugins/forms/styling/uniform.min.js"></script>

	<script src="assets/js/app.js"></script>
	<script src="global_assets/js/demo_pages/login.js"></script>
	<!-- /theme JS files -->

</head>

<body>

	<!-- Main navbar -->
		<!-- /main navbar -->
<div class="navbar navbar-expand-md navbar-light bg-info-700">
		<div class="navbar-brand">
			<!-- <a href="index.html" class="d-inline-block">
				<img src="global_assets/images/vanuatu.png">
			</a> -->
		</div>

		
<ul class="navbar-nav">
					<li class="nav-item" style="margin-left:120px; margin-top:10px">
						<h4><a href="#" class="text-white text-center text-uppercase">
							Vanuatu's Climate Action Impact Assessment MRV Tool</a></h4>
						
					</li></ul>
		
	</div>

	<!-- Page content -->
	<div class="page-content ">

		<!-- Main content -->
		<div class="content-wrapper">

			<!-- Content area -->
			<div class="content d-flex justify-content-center align-items-center">

				<!-- Registration form -->
				<form action="saveUserDetails" class="flex-fill" method="post" modelAttribute="userForm">
											<input type="hidden" name="fourEyesStatus"	id="fourEyesStatus"  value = "Pending_Insert"/>
											<input type="hidden" name="dataId" id="dataId" value="${user.dataId}">
					<div class="row">
						<div class="col-lg-6 offset-lg-3">
							<div class="card mb-0">
								<div class="card-body">
									<div class="text-center mb-3">
										<i class="icon-plus3 icon-1x text-success border-success border-3 rounded-round p-3 mb-3 mt-1"></i>
										<h5 class="mb-0">Create account</h5>
										<span class="d-block text-muted">All fields are required</span>
									</div>

									<div class="row">
										<div class="col-md-6">
											<div class="form-group form-group-feedback form-group-feedback-right">
												<input type="email" required = "required" name = "emailId" class="form-control" placeholder="Your email">
												<div class="form-control-feedback">
													<i class="icon-mention text-muted"></i>
												</div>
											</div>
										</div>

										
										<div class="col-md-6">
											<div class="form-group form-group-feedback form-group-feedback-right">
												<input type="password" required = "required" name = "password" class="form-control" placeholder="Create password">
												<div class="form-control-feedback">
													<i class="icon-user-lock text-muted"></i>
												</div>
											</div>
										</div>

									</div>
									<div class="row">
										<div class="col-md-6">
											<div class="form-group form-group-feedback form-group-feedback-right">
												<input type="text" required = "required" name = "firstName" class="form-control" placeholder="First name">
												<div class="form-control-feedback">
													<i class="icon-user-check text-muted"></i>
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="form-group form-group-feedback form-group-feedback-right">
												<input type="text" required = "required" name = "secondName" class="form-control" placeholder="Second name">
												<div class="form-control-feedback">
													<i class="icon-user-check text-muted"></i>
												</div>
											</div>
										</div>
									</div>

									<div class="row">
										<div class="col-md-6">
											<div class="form-group form-group-feedback form-group-feedback-right">
												<input type="text" required = "required" name = "department" class="form-control" placeholder="Department">
												<div class="form-control-feedback">
													<i class="icon-address-book text-muted"></i>
												</div>
											</div>
										</div>

										<div class="col-md-6">
											<div class="form-group form-group-feedback form-group-feedback-right">
												<input type="text" required = "required" name = "contact" class="form-control" placeholder="Contact Number">
												<div class="form-control-feedback">
													<i class="icon-phone text-muted"></i>
												</div>
											</div>
										</div>
									</div>
									<div class="form-group text-center text-muted content-divider">
									<span class="px-2">User Role</span>
								</div>
								<div class="form-group row">
										
										<div class="col-md-2">
											</div>
										<div class="col-md-5">
											<div class="form-check form-check-inline">
												<label class="form-check-label">
													<input type="radio" class="form-input-styled" name="role" required value="User" checked data-fouc>
													User
												</label>
											</div></div>
											<div class="col-md-5">
											<div class="form-check form-check-inline">
												<label class="form-check-label">
													<input type="radio" class="form-input-styled" name="role" required value="Nodal Officer" data-fouc>
													Nodal Officer
												</label>
											</div></div>
										
									</div>
									<div class="form-group text-center text-muted content-divider">
									<span class="px-2">Access Required</span>
								</div>
									
									<div class="row">
									
									<div class="col-md-4">
									<span class="text-uppercase"><b>GHG Inventory</b></span>
									<div class="form-group">
									<br>
										<div class="form-check">
										
											<label class="form-check-label">
												<input type="checkbox" name="ghgPermissions" value="Energy" class="form-input-styled"  data-fouc>
												<a>Energy</a>
											</label>
										</div>
										<div class="form-check">
										
											<label class="form-check-label">
												<input type="checkbox" name="ghgPermissions" value="IPPU" class="form-input-styled"  data-fouc>
												<a>IPPU</a>
											</label>
										</div>
										<div class="form-check">
										
											<label class="form-check-label">
												<input type="checkbox" name="ghgPermissions" value="AFOLU" class="form-input-styled"  data-fouc>
												<a>AFOLU</a>
											</label>
										</div>
										<div class="form-check">
										
											<label class="form-check-label">
												<input type="checkbox" name="ghgPermissions" value="Waste" class="form-input-styled"  data-fouc>
												<a>Waste</a>
											</label>
										</div>
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="reportPermissions" value="GHG Report" class="form-input-styled"  data-fouc>
												<a>GHG Inventory Report</a>
											</label>
										</div>
										
									</div></div>
									<div class="col-md-4">
									<span class="text-uppercase"><b>NDC Actions</b></span>
									<div class="form-group">
									<br>
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="projectPermissions" value="Create Project" class="form-input-styled"  data-fouc>
												<a>Create NDC Action</a>
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="projectPermissions" value="Adaptation Tracking" class="form-input-styled"  data-fouc>
												<a>Adaptation Actions</a>
											</label>
										</div>
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="projectPermissions" value="Mitigation Tracking" class="form-input-styled"  data-fouc>
												<a>Mitigation Actions</a>
											</label>
										</div>
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="projectPermissions" value="Finance Tracking" class="form-input-styled"  data-fouc>
												<a>Climate Finance</a>
											</label>
										</div>
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="projectPermissions" value="SDG Tracking" class="form-input-styled"  data-fouc>
												<a>SDG Assessment</a>
											</label>
										</div>
									</div></div>
									<div class="col-md-4">
									<span class="text-uppercase"><b>Reports</b></span>
									<div class="form-group">
									<br>
										
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="reportPermissions" value="Adaptation Report" class="form-input-styled"  data-fouc>
												<a>Adaptation Summary</a>
											</label>
										</div>

										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="reportPermissions" value="Mitigation Report" class="form-input-styled"  data-fouc>
												<a>Mitigation Summary</a>
											</label>
										</div>
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="reportPermissions" value="Finance Report" class="form-input-styled"  data-fouc>
												<a>Finance Summary</a>
											</label>
										</div>
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="reportPermissions" value="SDG Report" class="form-input-styled"  data-fouc>
												<a>SDG Summary</a>
											</label>
										</div>
										<div class="form-check">
											<label class="form-check-label">
												<input type="checkbox" name="reportPermissions" value="MRV Report" class="form-input-styled"  data-fouc>
												<a>Project MRV Report</a>
											</label>
										</div>
									</div></div>
									
									</div>

									<button type="submit" class="btn bg-info-400 btn-labeled btn-labeled-right"><b><i class="icon-plus3"></i></b> Create account</button>
								</div>
							</div>
						</div>
					</div>
				</form>
				<!-- /registration form -->

			</div>
			<!-- /content area -->


			<!-- Footer -->
			
			<!-- /footer -->

		</div>
		<!-- /main content -->

	</div>
	<!-- /page content -->

</body>
</html>
