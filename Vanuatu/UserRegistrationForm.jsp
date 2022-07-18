<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@page import="com.vanuatu.model.user.UserReg"%>
<html>
<head>
<meta charset="utf-8" />
<title>New User Registration Form</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="apple-touch-icon-precomposed" sizes="144x144"
	href="assets/images/icons/apple-touch-icon-144-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114"
	href="assets/images/icons/apple-touch-icon-114-precomposed.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72"
	href="assets/images/icons/apple-touch-icon-72-precomposed.png">
<link rel="apple-touch-icon-precomposed"
	href="assets/images/icons/apple-touch-icon-57-precomposed.png">
<link rel="shortcut icon" href="images/Kenya.png">
<link rel="stylesheet" type="text/css"
	href="assets/bootstrap/css/bootstrap.css">

<!-- HELPERS -->

<link rel="stylesheet" type="text/css" href="assets/helpers/animate.css">
<link rel="stylesheet" type="text/css"
	href="assets/helpers/backgrounds.css">
<link rel="stylesheet" type="text/css"
	href="assets/helpers/boilerplate.css">
<link rel="stylesheet" type="text/css"
	href="assets/helpers/border-radius.css">
<link rel="stylesheet" type="text/css" href="assets/helpers/grid.css">
<link rel="stylesheet" type="text/css"
	href="assets/helpers/page-transitions.css">
<link rel="stylesheet" type="text/css" href="assets/helpers/spacing.css">
<link rel="stylesheet" type="text/css"
	href="assets/helpers/typography.css">
<link rel="stylesheet" type="text/css" href="assets/helpers/utils.css">
<link rel="stylesheet" type="text/css" href="assets/helpers/colors.css">

<!-- ELEMENTS -->

<link rel="stylesheet" type="text/css" href="assets/elements/badges.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/buttons.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/content-box.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/dashboard-box.css">
<link rel="stylesheet" type="text/css" href="assets/elements/forms.css">
<link rel="stylesheet" type="text/css" href="assets/elements/images.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/info-box.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/invoice.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/loading-indicators.css">
<link rel="stylesheet" type="text/css" href="assets/elements/menus.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/panel-box.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/response-messages.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/responsive-tables.css">
<link rel="stylesheet" type="text/css" href="assets/elements/ribbon.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/social-box.css">
<link rel="stylesheet" type="text/css" href="assets/elements/tables.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/tile-box.css">
<link rel="stylesheet" type="text/css"
	href="assets/elements/timeline.css">



<!-- ICONS -->

<link rel="stylesheet" type="text/css"
	href="assets/icons/fontawesome/fontawesome.css">
<link rel="stylesheet" type="text/css"
	href="assets/icons/linecons/linecons.css">
<link rel="stylesheet" type="text/css"
	href="assets/icons/spinnericon/spinnericon.css">


<!-- WIDGETS -->

<link rel="stylesheet" type="text/css"
	href="assets/widgets/accordion-ui/accordion.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/calendar/calendar.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/carousel/carousel.css">

<link rel="stylesheet" type="text/css"
	href="assets/widgets/charts/justgage/justgage.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/charts/morris/morris.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/charts/piegage/piegage.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/charts/xcharts/xcharts.css">

<link rel="stylesheet" type="text/css"
	href="assets/widgets/chosen/chosen.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/colorpicker/colorpicker.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/datatable/datatable.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/datepicker/datepicker.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/datepicker-ui/datepicker.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/daterangepicker/daterangepicker.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/dialog/dialog.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/dropdown/dropdown.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/dropzone/dropzone.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/file-input/fileinput.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/input-switch/inputswitch.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/input-switch/inputswitch-alt.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/ionrangeslider/ionrangeslider.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/jcrop/jcrop.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/jgrowl-notifications/jgrowl.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/loading-bar/loadingbar.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/maps/vector-maps/vectormaps.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/markdown/markdown.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/modal/modal.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/multi-select/multiselect.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/multi-upload/fileupload.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/nestable/nestable.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/noty-notifications/noty.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/popover/popover.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/pretty-photo/prettyphoto.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/progressbar/progressbar.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/range-slider/rangeslider.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/slidebars/slidebars.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/slider-ui/slider.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/summernote-wysiwyg/summernote-wysiwyg.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/tabs-ui/tabs.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/theme-switcher/themeswitcher.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/timepicker/timepicker.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/tocify/tocify.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/tooltip/tooltip.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/touchspin/touchspin.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/uniform/uniform.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/wizard/wizard.css">
<link rel="stylesheet" type="text/css"
	href="assets/widgets/xeditable/xeditable.css">

<!-- SNIPPETS -->

<link rel="stylesheet" type="text/css" href="assets/snippets/chat.css">
<link rel="stylesheet" type="text/css"
	href="assets/snippets/files-box.css">
<link rel="stylesheet" type="text/css"
	href="assets/snippets/login-box.css">
<link rel="stylesheet" type="text/css"
	href="assets/snippets/notification-box.css">
<link rel="stylesheet" type="text/css"
	href="assets/snippets/progress-box.css">
<link rel="stylesheet" type="text/css" href="assets/snippets/todo.css">
<link rel="stylesheet" type="text/css"
	href="assets/snippets/user-profile.css">
<link rel="stylesheet" type="text/css"
	href="assets/snippets/mobile-navigation.css">
<!-- APPLICATIONS -->

<link rel="stylesheet" type="text/css"
	href="assets/applications/mailbox.css">

<!-- Admin theme -->

<link rel="stylesheet" type="text/css"
	href="assets/themes/admin/layout.css">
<link rel="stylesheet" type="text/css"
	href="assets/themes/admin/color-schemes/default.css">

<!-- Components theme -->

<link rel="stylesheet" type="text/css"
	href="assets/themes/components/default.css">
<link rel="stylesheet" type="text/css"
	href="assets/themes/components/border-radius.css">

<!-- Admin responsive -->

<link rel="stylesheet" type="text/css"
	href="assets/helpers/responsive-elements.css">
<link rel="stylesheet" type="text/css"
	href="assets/helpers/admin-responsive.css">

<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

</head>

<style>
.multiselect {
	width: 350px;
}

.selectBox {
	position: relative;
}

.selectBox select {
	width: 100%;
	font-weight: bold;
}

.overSelect {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

#checkboxes {
	display: none;
	border: 1px #dadada solid;
}

#checkboxes label {
	display: block;
}

#checkboxes label:hover {
	background-color: #1e90ff;
}

#checkboxes1 {
	display: none;
	border: 1px #dadada solid;
}

#checkboxes1 label {
	display: block;
}

#checkboxes1 label:hover {
	background-color: #1e90ff;
}

#checkboxes2 {
	display: none;
	border: 1px #dadada solid;
}

#checkboxes2 label {
	display: block;
}

#checkboxes2 label:hover {
	background-color: #1e90ff;
}

#checkboxes3 {
	display: none;
	border: 1px #dadada solid;
}

#checkboxes3 label {
	display: block;
}

#checkboxes3 label:hover {
	background-color: #1e90ff;
}
</style>




<body class="blurBg-false" style="background-color: #EBEBEB">
	<script type="text/javascript" src="js/jquery.min.js"></script>

	<script type="text/javascript">
		function Enablecontrols() {

			document.getElementById('fourEyesStatus').value = 'Pending_Insert';
			user.getNew("New").value = "New";
		}

		var expanded = false;
		function showCheckboxes() {
			var checkboxes = document.getElementById("checkboxes");
			if (!expanded) {
				checkboxes.style.display = "block";
				expanded = true;
			} else {
				checkboxes.style.display = "none";
				expanded = false;
			}
		}

		var expande = false;
		function showCheckboxes1() {
			var checkboxes = document.getElementById("checkboxes1");
			if (!expande) {
				checkboxes.style.display = "block";
				expande = true;
			} else {
				checkboxes.style.display = "none";
				expande = false;
			}
		}

		function showCheckboxes2() {
			var checkboxes = document.getElementById("checkboxes2");
			if (!expanded) {
				checkboxes.style.display = "block";
				expanded = true;
			} else {
				checkboxes.style.display = "none";
				expanded = false;
			}
		}

		function showCheckboxes3() {
			var checkboxes = document.getElementById("checkboxes3");
			if (!expanded) {
				checkboxes.style.display = "block";
				expanded = true;
			} else {
				checkboxes.style.display = "none";
				expanded = false;
			}
		}
	</script>


	<script type="text/javascript">
		$(document).ready(function() {
			$('#select_all1').on('click', function() {
				if (this.checked) {
					$('.checkbox1').each(function() {
						this.checked = true;
					});
				} else {
					$('.checkbox1').each(function() {
						this.checked = false;
					});
				}
			});

			$('.checkbox1').on('click', function() {
				if ($('.checkbox1:checked').length == $('.checkbox1').length) {
					$('#select_all1').prop('checked', true);
				} else {
					$('#select_all1').prop('checked', false);
				}
			});
		});
	</script>

	<script type="text/javascript">
		$(document).ready(function() {
			$('#select_all2').on('click', function() {
				if (this.checked) {
					$('.checkbox2').each(function() {
						this.checked = true;
					});
				} else {
					$('.checkbox2').each(function() {
						this.checked = false;
					});
				}
			});

			$('.checkbox2').on('click', function() {
				if ($('.checkbox2:checked').length == $('.checkbox2').length) {
					$('#select_all2').prop('checked', true);
				} else {
					$('#select_all2').prop('checked', false);
				}
			});
		});
	</script>

	<script type="text/javascript">
		$(document).ready(function() {
			$('#select_all3').on('click', function() {
				if (this.checked) {
					$('.checkbox3').each(function() {
						this.checked = true;
					});
				} else {
					$('.checkbox3').each(function() {
						this.checked = false;
					});
				}
			});

			$('.checkbox3').on('click', function() {
				if ($('.checkbox1:checked').length == $('.checkbox1').length) {
					$('#select_all1').prop('checked', true);
				} else {
					$('#select_all1').prop('checked', false);
				}
			});
		});
	</script>
<body>

	<div class="center-vertical">
		<div class="center-content row">

			<div class="col-md-8 col-lg-6 clearfix center-margin">
				<div class="row">

					<div class="content-box">
						<h3 class="content-box-header content-box-header-alt bg-default">
							 <span class="header-wrapper"> Registration Form </span>
						</h3>

						<div class="content-box-wrapper">
							<div class="form-group">
								<div class="input-group">

									<div class="content-box-wrapper">



										<form action="saveUserDetails" method="post" modelAttribute="userForm">
											<input type="hidden" name="fourEyesStatus"
												id="fourEyesStatus" />
											<input type="hidden" name="dataId" id="dataId"
												value="${user.dataId}">
				<div class="form-group row">
                    <label class="control-label col-sm-2" for="emailId">Email:</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="emailId" placeholder="Enter Email" name="emailId"
                            required>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="control-label col-sm-2" for="name">Name:</label>
                    <div class="col-sm-10">
                        <input type="name" class="form-control" id="name" placeholder="Enter Name" name="name" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="control-label col-sm-2" for="Department">Department:</label>
                    <div class="col-sm-10">
                        <input type="Department" class="form-control" id="Department" placeholder="Enter Department"
                            name="Department" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="control-label col-sm-2" for="Contact">Contact:</label>
                    <div class="col-sm-10">
                        <input type="Contact" class="form-control" id="Contact" placeholder="Enter Contact"
                            name="Contact" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-form-label col-sm-2" for="password">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="password" placeholder="Enter Password" name="password" required>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="control-label col-sm-2" for="confirmPassword">Confirm Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="confirmPassword"
                            placeholder="Confirm Password" name="confirmPassword" required>
                    </div>
                </div>
											<input type=hidden id="approval" name="approval" value=New>
											<input type=hidden id="role" name="role" value=USER_ROLE>
											


											<Label>ACCESS REQUIRED</label>
											<br>


											<div class="multiselect">

												<div class="selectBox" onclick="showCheckboxes()">
													<label class="form-check-label">GHG</label> <select>
														<label>GHG</label>
													</select>
													<div class="overSelect"></div>
												</div>
												
												<div id="checkboxes"  style="display: none;">
													<ul class="dropdown">
														<input type="checkbox" id="select_all1" /> Select all
														<ul>


													<div><input class="checkbox1" type="checkbox" name="ghgPermissions" value="Energy" />Energy</div>
													<div><input class="checkbox1" type="checkbox" name="ghgPermissions" value="IPPU" />IPPU</div>
													<div><input class="checkbox1" type="checkbox" name="ghgPermissions" value="AFOLU" />AFOLU</div>
													<div><input class="checkbox1" type="checkbox" name="ghgPermissions" value="Waste" />Waste</div>
													<!-- <div><input class="checkbox1" type="checkbox" name="permissions" value="Forestry" />Forestry</div>	 -->	
														
														</ul>
													</ul>
												</div>
											</div>


											<div class="multiselect">
												<div class="selectBox" onclick="showCheckboxes1()">
													<label>Project Tracking</label> <select>
														<label>Project Tracking</label>
													</select>
													<div class="overSelect"></div>
												</div>
												<div id="checkboxes1">
													<ul class="dropdown">
														<input type="checkbox" id="select_all2" /> Select all
															<ul>
													<div><input class="checkbox2" type="checkbox" name="projectPermissions" value="Create Project" />Create Project</div>
													<div><input class="checkbox2" type="checkbox" name="projectPermissions" value="Mitigation Tracking" />Mitigation</div>
													<div><input class="checkbox2" type="checkbox" name="projectPermissions" value="Finance Tracking" />Finance</div>
													<div><input class="checkbox2" type="checkbox" name="projectPermissions" value="Adaptation Tracking" />Adaptation</div>
													<div><input class="checkbox2" type="checkbox" name="projectPermissions" value="SDG Tracking" />SDG</div>		
															
														</ul>	
													</ul>
												</div>

											</div>


											<div class="multiselect">
												<div class="selectBox" onclick="showCheckboxes2()">
													<label>Reports</label> <select>
														<label>Reports</label>
													</select>
													<div class="overSelect"></div>
												</div>
												<div id="checkboxes2">
													<ul class="dropdown">
														<input type="checkbox" id="select_all3" /> Select all
														<ul>
													<div><input class="checkbox3" type="checkbox" name="reportPermissions" value="GHG Report" />GHG Inventory</div>
													<div><input class="checkbox3" type="checkbox" name="reportPermissions" value="Project Report" />Project Database</div>
													<div><input class="checkbox3" type="checkbox" name="reportPermissions" value="Mitigation Report" />Mitigation Tracking</div>
													<div><input class="checkbox3" type="checkbox" name="reportPermissions" value="Finance Report" />Finance Tracking</div>
													<div><input class="checkbox3" type="checkbox" name="reportPermissions" value="Adaptation Report" />Adaptation Tracking</div>
													<div><input class="checkbox3" type="checkbox" name="reportPermissions" value="SDG Report" />SDG Tracking</div>	
													<div><input class="checkbox3" type="checkbox" name="reportPermissions" value="MRV Report" />MRV Tracking</div>
													
														
														</ul>
													</ul>
												</div>

											</div>
											
											
											
													<div >
												
													<label>Role</label> 
														
													<div><input type="radio" name="user" required value="User" />User</div>
													<div><input type="radio" name="user" required value="Nodal Officer" />Nodal Officer</div>
													</div>
													</ul>
												

											</div>

										
											<br>
											<input type="submit" class="btn btn-success"
												value="Submit"  onclick="return Validate();" />

<script type="text/javascript">
		function Validate() {
			var password = document.getElementById("password").value;
			var confirmPassword = document.getElementById("confirmPassword").value;
			if (password != confirmPassword) {
				alert("Passwords do not match.");
				return false;
			}

			document.getElementById('fourEyesStatus').value = 'Pending_Insert';
			user.getNew("New").value = "New";
			return true;
		}
	</script>
									</div>
								</div>

							</div>

						</div>
					</div>
				</div>

			</div>

		</div>
	</div>

</body>
</html>