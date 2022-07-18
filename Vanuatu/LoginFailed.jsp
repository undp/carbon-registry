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
	<script src="global_assets/js/demo_pages/components_modals.js"></script>
	<!-- /theme JS files -->

</head>
<style> 
body {
	    background-image: url("global_assets/images/VanuatuHome1.jpg");
	    background-size: 100%;
	}
</style>

<body class="">

	<!-- Page content -->
	<div class="page-content">

		<!-- Main content -->
		<div class="content-wrapper">

			<!-- Content area -->
			<div class="content d-flex justify-content-center" style="margin-top:50px">
				<!-- Login card -->
				<form class="flex-fill" method="post" action="getLoginDetails">
					<div class="row">
					
						<div class="col-lg-3 offset-lg-5">
						
						<a href=""><img src="global_assets/images/vanuatu.png" width="120" height="80"></a>
						
						</div>
						
						<div class="col-lg-9 offset-lg-2">
						<br>
								<h1 class="" style="margin-left:10px; font-size : 40px"><b>Welcome to Vanuatu's Climate Action MRV Tool</b></h1>
							
								
						</div>	
							
							<div class="col-lg-3 offset-lg-4">
					<button type="button" class="btn bg-light btn-block collapsed" data-toggle="collapse" href="#collapseLogin" style="font-size : 20px"><b>Login</b></button>
					</div>	
								
								
								
							<div class="col-lg-4 offset-lg-0">
							<div class="" id="collapseLogin">
					<div class="card mb-0">
						<div class="card-body">
				
							<div class="text-center mb-3">
								
								<span class="d-block text-muted">Enter Your credentials</span>
								<h6 class="text-center text-danger">${errorMessage}</h6>
								
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
								<button type="submit" class="btn bg-info-700 btn-block">Sign in</button>
								
							</div>
							
								<a href="Register.jsp" class="btn btn-link text-info-700 font-size-lg"><i class="mr-2"></i>Not Registered? Create an account</a>
								<a href="recoverPassword.jsp" class="btn btn-link text-info-700 font-size-lg"><i class="mr-2"></i>Forgot Password?</a>													
						</div>
						
						
					</div></div>
					</div></div></form>
							
					
				
				
				<!-- /login card -->

			</div>
			
			<!-- /content area -->

		</div>
		
		<!-- /main content -->

	</div>
<!-- Footer -->
	<div class="navbar navbar-expand-lg bg-light">
		<div class="text-center d-lg-none w-100">
			<button type="button" class="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-footer">
				<i class="icon-unfold mr-2"></i>
				Footer
			</button>
		</div>

		<div class="navbar-collapse collapse" id="navbar-footer">
			

			<span>
			
			<a href="#"><img src="global_assets/images/undp.png" width="80" height="120"></a>
			
				<img src="global_assets/Donor.png" style="margin-left:350px" height="100" width="800">
				
			</span>
			
		</div>
		
	</div>
	
	<span class="text-light font-size-sm text-right">Version 1.0 Developed by SCS Consulting Ltd.</span>
	<!-- /footer -->	
	<!-- /page content -->

</body>
</html>
