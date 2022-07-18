<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<%@page import="com.sudan.model.user.UserReg"%>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>South Sudan's NDC MRV Tool</title>

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
	<script src="global_assets/js/plugins/forms/styling/uniform.min.js"></script>

	<script src="assets/js/app.js"></script>
	<script src="global_assets/js/demo_pages/login.js"></script>
	<script src="global_assets/js/demo_pages/components_modals.js"></script>
	<!-- /theme JS files -->

</head>

<style> 
body {
	    /* background-image: url("global_assets/images/ministry.png"); */
	    background-color: light;
	    background-size: 100%;
	}
</style>




   <%
	   UserReg userReg = null;
	
	    if(request.getAttribute("userReg")!=null){
	    	userReg = (UserReg)request.getAttribute("userReg");
	    	
	    }
     
   %>

<div class="fixed-top">
		
		<!-- /main navbar -->



	</div>
	<!-- Page content -->
	<div class="page-content">
<div class="fixed-top">

		<!-- Main navbar -->
		
		<!-- /main navbar -->


		

	</div>
		<!-- Main content -->
		<div class="content-wrapper">

			<!-- Content area -->
			<div class="content d-flex justify-content-center" style="margin-top:50px">
				<!-- Login card -->
				<form class="flex-fill" method="get" action="forgotPassword">
					<div class="row">
					
						<div class="col-lg-4 offset-lg-5">
						
						<a href=""><img src="global_assets/images/ssudan.png" width="120" height="120"></a>
						
						</div>
						
						<div class="col-lg-9 offset-lg-2">
						<br>
								<h1 class="" style="margin-left:10px; font-size : 40px"><b>Welcome to South Sudan's Climate Action MRV Tool</b></h1>
							
								
						</div>	
							
							<div class="col-lg-4 offset-lg-4">
							<div class="" id="collapseLogin">
							
					<div class="card mb-0">
						<div class="card-body">
				
							<div class="text-center mb-3">
								<span class="btn btn-link text-pink-600" style="font-size: 20px">Forgot Password</span>
								
							</div>
							<%
	if(null!=request.getAttribute("errorMessage")) 
	{
%>

<p align="center" style=" color:#830c20; font-size:15px;"><%=request.getAttribute("errorMessage") %></p>

<% 
	}
%>

							<div class="form-group form-group-feedback form-group-feedback-left">
								<input type="text" name = "emailId" class="form-control" placeholder="enter your email id">
								<div class="form-control-feedback">
									<i class="icon-user text-muted"></i>
								</div>
							</div>
														<div class="form-group">
								<button type="submit" class="btn bg-pink-600 btn-block" onclick="showAlert()">Submit</button>
								
							</div>
																				
						</div></div>
						
						
				</div></div></div>
					
							
					</form>	</div></div>
				
				
				
				<!-- /login card -->

			</div>
			
			<!-- /content area -->

		</div>
<script>
function showAlert() {
	alert("If you email Id is registered with us, you will receive the password on your registered email id.");
}
</script>		
		<!-- /main content -->

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
			
			<a href="#">
			<img src="global_assets/images/ministry.png" width="120" height="120">
			<img src="global_assets/images/undp.png" style="margin-left:50px"  width="80" height="120"></a>
			
				<img src="global_assets/Donor.png" style="margin-left:80px" width="700px">
				<img src="global_assets/images/scs1.png" style="margin-left: 74px" width="120" height="70">
				
			</span>
			
		</div>
		
	</div>
	
	<span class="text-light text-right"><i>Best viewed in Google Chrome</i></span>
	<span class="text-light text-right"><i>Version 1.0 Developed by SCS Consulting Ltd.</i></span>
	<!-- /footer -->	
	<!-- /page content -->

</body>
</html>