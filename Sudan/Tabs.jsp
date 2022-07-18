<%@page import="com.sudan.model.ghg.*"%>
<%@page import="com.sudan.model.user.UserReg"%>
<%@page import="java.util.*"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
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
		<script src="assets/js/app.js"></script>
	<script src="global_assets/js/demo_pages/form_select2.js"></script>
	<script src="global_assets/js/demo_pages/components_modals.js"></script>
	<!-- /theme JS files -->

</head>
<%

Date date = new Date(); 	
UserReg userinfo = null;
 	
	    if(request.getAttribute("userInfo")!=null){
	    	userinfo = (UserReg)request.getAttribute("userInfo");
	    	session.setAttribute("userInfo", userinfo);
	    	session.setAttribute("userEmailId", userinfo.getEmailId());
	    	
	    }
	    userinfo = (UserReg)session.getAttribute("userInfo");
   %>
<jsp:include page="Menu.jsp" />
<jsp:include page="common.jsp" />

<body>
	<!-- Page content -->

	<!-- Main content -->
<div class="content-wrapper">
	
	<!-- Content area -->
<div class="content">

	<!-- 2 columns form -->
	<div class="card border-pink">
					<div class="card-header bg-pink-600">
						<h5 class="card-title text-uppercase text-center">GHG Inventory & NDC Action Dashboard</h5>
						</div>
						<br>
						
						<div class="content">	
							<div class="row">
							
					<div class="col-sm-6 col-xl-4">
						<div class="card card-body bg-info-600">
							<div class="media">
								<div class="mr-3 align-self-center">
									
									<img src="global_assets/images/Tabs/GHG.png" class="" width="40" height="40" alt="">
								</div>

								<div class="media-body text-center">
									<span class="text-uppercase font-size-lg">GHG Inventory (${dashboard.year})</span>
									<h3 class="font-weight-semibold mb-3">${dashboard.totalGHG} tCO<sub>2</sub>e</h3>
									
									
								</div>
							</div>
						</div>
					</div>
					
					<div class="col-sm-6 col-xl-4">
						<div class="card card-body bg-info-600">
							<div class="media">
								<div class="mr-3 align-self-center">
									<img src="global_assets/images/Tabs/GHGPotential.png" class="" width="40" height="40" alt="">
								</div>

								<div class="media-body text-center">
									<span class="text-uppercase font-size-lg">GHG Reduction Expected *</span>
									<h3 class="font-weight-semibold mb-3">${dashboard.expectedGhgReduction} tCO<sub>2</sub>e</h3>
									
								</div>
							</div>
						</div>
					</div>
					
					<div class="col-sm-6 col-xl-4">
						<div class="card card-body bg-info-600">
							<div class="media">
								<div class="mr-3 align-self-center">
									<img src="global_assets/images/Tabs/GHG1.png" class="" width="40" height="40" alt="">
								</div>

								<div class="media-body text-center">
									<span class="text-uppercase font-size-lg">GHG Reduction Achieved *</span>
									<h3 class="font-weight-semibold mb-3">${dashboard.actualGhgReduction} tCO<sub>2</sub>e</h3>
									
								</div>
							</div>
						</div>
					</div>
					</div>
					<br>
						<div class="row">
						
					<div class="col-sm-6 col-xl-4">
						<div class="card card-body bg-info-600">
							<div class="media">
								<div class="mr-3 align-self-center">
									<img src="global_assets/images/Tabs/Mitigation.png" class="" width="40" height="40" alt="">
								</div>

								<div class="media-body text-center">
									<span class="text-uppercase font-size-lg">Actions Undertaken *</span>
									<h3 class="font-weight-semibold mb-3">${dashboard.projectCount} </h3>
									
								</div>
							</div>
						</div>
					</div>
					
					<div class="col-sm-6 col-xl-4">
						<div class="card card-body bg-info-600">
							<div class="media">
								<div class="mr-3 align-self-center">
									<img src="global_assets/images/Tabs/Finance.png" class="" width="40" height="40" alt="">
								</div>

								<div class="media-body text-center">
									<span class="text-uppercase font-size-lg">Budget Allocated *</span>
									<h3 class="font-weight-semibold mb-3">USD ${dashboard.disbursement}</h3>
									
								</div>
							</div>
						</div>
					</div>
					
					<div class="col-sm-6 col-xl-4">
						<div class="card card-body bg-info-600">
							<div class="media">
								<div class="mr-3 align-self-center">
									<img src="global_assets/images/Tabs/Finance.png" class="" width="40" height="40" alt="">
								</div>

								<div class="media-body text-center">
									<span class="text-uppercase font-size-lg">Budget Spent *</span>
									<h3 class="font-weight-semibold mb-3">USD ${dashboard.financeMonitoring}</h3>
									
								</div>
							</div>
						</div>
					</div>
					</div>
					<br>
						<div class="row">
						
					<div class="col-sm-6 col-xl-4">
						<div class="card card-body bg-info-600">
							<div class="media">
								<div class="mr-3 align-self-center">
									<img src="global_assets/images/Tabs/Mitigation2.png" class="" width="40" height="40" alt="">
								</div>

								<div class="media-body text-center">
									<span class="text-uppercase font-size-lg">Mitigation Actions *</span>
									<h3 class="font-weight-semibold mb-3">${dashboard.mitigationCount}</h3>
									
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-6 col-xl-4">
						<div class="card card-body bg-info-600">
							<div class="media">
								<div class="mr-3 align-self-center">
									<img src="global_assets/images/Tabs/Adaptation.png" class="" width="40" height="40" alt="">
								</div>

								<div class="media-body text-center">
									<span class="text-uppercase font-size-lg">Adaptation Actions *</span>
									<h3 class="font-weight-semibold mb-3">${dashboard.adaptationCount}</h3>
									
								</div>
							</div>
						</div>
					</div>
					
					<div class="col-sm-6 col-xl-4">
						<div class="card card-body bg-info-600">
							<div class="media">
								<div class="mr-3 align-self-center">
									<img src="global_assets/images/Tabs/Crosscutting1.png" class="" width="40" height="40" alt="">
								</div>

								<div class="media-body text-center">
									<span class="text-uppercase font-size-lg">Cross Cutting Actions *</span>
									<h3 class="font-weight-semibold mb-3">${dashboard.crossCuttingCount}</h3>
									
								</div>
							</div>
						</div>
					</div>
					
					</div>
					</div>
					
						<span class = "text-pink-300">* data till date and as on (<%=date%>) </span>
						</div></div> 
</div></body> 
    
</html>
