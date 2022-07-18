<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>Gambia's NDC MRV Tool</title>

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
	<script src="global_assets/js/plugins/forms/styling/uniform.min.js"></script>

	<script src="assets/js/app.js"></script>
	<script src="global_assets/js/demo_pages/login.js"></script>
	<!-- /theme JS files -->

</head>
<body class="">
<div class="page-content bg-slate-700">

		<!-- Main content -->
		<div class="content-wrapper">

			<!-- Content area -->
			<div class="content d-flex justify-content-center align-items-center">

				<!-- Login card -->
				<form class="flex-fill" method="post" action="getLoginDetails">
					<div class="row">
						<div class="col-lg-6 offset-lg-3">
					<div class="card mb-0">
					
						<div class="tab-content card-body">
							<div class="tab-pane fade show active" id="login-tab1">
						<div class="card-body">
							<div class="text-center mb-3">
								
								<h1 class="text-slate-700"><b>Welcome to Gambia's Climate Action MRV Tool</b></h1>
								<span class="d-block text-muted">Enter Your credentials</span>
								<h6 class="text-center text-teal">${errorMessage}</h6>
							</div>

							<div class="form-group form-group-feedback form-group-feedback-left">
								<input type="text" name = "emailId" class="form-control" placeholder="Username">
								<div class="form-control-feedback">
									<i class="icon-user text-muted"></i>
								</div>
							</div>

							<div class="form-group form-group-feedback form-group-feedback-left">
								<input type="password" name = "password" class="form-control" placeholder="Password">
								<div class="form-control-feedback">
									<i class="icon-lock4 text-muted"></i>
								</div>
							</div>

							<div class="form-group">
								<button type="submit" class="btn bg-slate-700 btn-block">Sign in</button>
							</div>
							
							
						</div></div></div>
						<span class="d-block text-muted font-size-xs text-center">Version 1.0 Developed by SCS Consulting Ltd.</span>
					</div></div></div>
				</form>
				<!-- /login card -->

			</div>
			<!-- /content area -->

		</div>
		<!-- /main content -->

	</div>
	<!-- /page content -->

</body>
</html>
