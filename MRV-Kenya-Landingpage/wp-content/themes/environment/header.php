<?php
/**
 * Header file for the Twenty Twenty WordPress default theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

?><!DOCTYPE html>

<html class="no-js" <?php language_attributes(); ?>>

	<head>

		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- bootstrap v3.3.6 css -->
		<link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/bootstrap.min.css">
		<!-- owl.carousel css -->
		<link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/owl.carousel.css">
		<link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/owl.transitions.css">
       <!-- Animate css -->
        <link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/animate.css">
        <!-- meanmenu css -->
        <link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/meanmenu.min.css">
		<!-- font-awesome css -->
		<link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/font-awesome.min.css">
		<link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/themify-icons.css">
		<link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/flaticon.css">
		<!-- venobox css -->
		<link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/venobox.css">
		<!-- magnific css -->
        <link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/magnific.min.css">
		<!-- style css -->
		<link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/style.css">
		<!-- responsive css -->
		<link rel="stylesheet" href="<?php echo bloginfo('template_directory');?>/assets/css/responsive.css">

		<!-- modernizr css -->
		<script src="<?php echo bloginfo('template_directory');?>/assets/js/vendor/modernizr-2.8.3.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
		<link rel="profile" href="https://gmpg.org/xfn/11">

		<?php wp_head(); ?>

	</head>

	<body <?php body_class(); ?>>

		        <header class="header-one">
              <div class="lower-topbar">
                            <div class="container">
                                <div class="row">
                                    <div class="col col-sm-3">
                                        <div class="site-logo">
                                            <a href="http://imrvtool.com/"><img src="http://imrvtool.com/wp-content/uploads/2022/03/logo.png" alt=""></a>
                                        </div>
                                    </div>
                                    <div class="col col-sm-9">
                                        <!---<div class="awards">
                                            <div>
                                                <div class="icon"><i class="fa fa-phone-square"></i></div>
                                                <div class="award-info">
                                                    <h4>Call Us</h4>
                                                    <p>+254719439126</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="icon"><i class="fa fa-envelope"></i></div>
                                                <div class="award-info">
                                                    <h4>Email Us</h4>
                                                    <p>muchiri66@Yahoo.com</p>
                                                </div>
                                            </div>
                                        </div>--->
                                    </div>
                                </div>
                            </div>
              </div>
           
            <!-- header-area start -->
            <div id="sticker" class="header-area header-area-2 hidden-xs">
                <div class="container">
                    <div class="row">
                        <!-- logo start -->
                        
                        <div class="col-md-12 col-sm-12">
                            <div class="header-right-link">
                                <!-- search option start -->
                                <div class="search-inner">
                                    <form action="#">
                                        <div class="search-option">
                                            <input type="text" placeholder="Search...">
                                            <button class="button" type="submit"><i class="fa fa-search"></i></button>
                                        </div>
                                        <a class="main-search" href="#"><i class="fa fa-search"></i></a>
                                    </form>
                                </div>
								<a class="s-menu" href="http://144.91.97.45:3000/" target="_blank">Login</a>
                            </div>
                            <!-- mainmenu start -->
                            <nav class="navbar navbar-default">
                                <div class="collapse navbar-collapse" id="navbar-example">
                                    <div class="main-menu">
                                        <ul class="nav navbar-nav navbar-right">
                                            <li><a href="http://imrvtool.com/">Home</a></li>
											<li><a href="http://imrvtool.com/about-imrv-tool/">About IMRV Tool</a></li>
											<li><a href="http://imrvtool.com/projects/">Projects</a></li>
											<li><a href="http://imrvtool.com/reports/">Reports</a></li>
											<li><a href="http://imrvtool.com/knowledge-resources/">Knowledge  Resources</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                            <!-- mainmenu end -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- header-area end -->
            <!-- mobile-menu-area start -->
            <div class="mobile-menu-area hidden-lg hidden-md hidden-sm">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="mobile-menu">
                                <div class="logo">
                                    <a href="http://imrvtool.com/"><img src="http://imrvtool.com/wp-content/uploads/2022/03/logo.png" alt="" /></a>
                                </div>
                                <nav id="dropdown">
                                    <ul class="nav navbar-nav navbar-right">
                                           <li><a href="http://imrvtool.com/">Home</a></li>
											<li><a href="http://imrvtool.com/about-imrv-tool/">About IMRV Tool</a></li>
											<li><a href="http://imrvtool.com/projects/">Projects</a></li>
											<li><a href="http://imrvtool.com/reports/">Reports</a></li>
											<li><a href="http://imrvtool.com/knowledge-resources/">Knowledge  Resources</a></li>
                                        </ul>
                                </nav>
                            </div>					
                        </div>
                    </div>
                </div>
            </div>
            <!-- mobile-menu-area end -->		
        </header>
        <!-- header end -->
