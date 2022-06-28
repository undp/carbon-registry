<?php
/**
 * The template for displaying the footer
 *
 * Contains the opening of the #site-footer div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

?>
<!-- Start Footer Area -->
        <footer class="footer1">
            <div class="footer-area">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="footer-content logo-footer">
                                <div class="footer-head">
                                    <div class="footer-logo">
                                    	<a href="http://imrvtool.com/"><img src="http://imrvtool.com/wp-content/uploads/2022/03/footer-logo.png" alt=""></a>
										<p>
											The Ministry of Environment and Forestry developed Kenya’s Monitoring Reporting and Verification (MRV) system/tool to facilitate climate change reporting by sectors as is required by the Climate Change Act, 2016.The Development of the system was supported by the NDC support project
										</p>
                                    </div>
                                   
                                    
                                </div>
                            </div>
                        </div>
                        <!-- end single footer -->
                        <div class="col-md-3 col-sm-3 col-xs-12">
                            <div class="footer-content">
                                <div class="footer-head">
                                    <h4>Quick Link</h4>
                                    <ul class="footer-list">
                                        <li><a href="http://imrvtool.com/">Home</a></li>
											<li><a href="about-imrv-tool">About IMRV Tool</a></li>
											<li><a href="projects">Projects</a></li>
											<li><a href="reports">Reports</a></li>
											<li><a href="knowledge-resources">Knowledge  Resources</a></li>
                                            <li><a href="contact-us">Contact Us</a></li>
											
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <!-- end single footer -->
                        <div class="col-md-5 col-sm-5 col-xs-12">
                            <div class="footer-content last-content">
                                <div class="footer-head">
                                    <h4>Contact Information</h4>
                                    <div class="footer-contacts">
                                        <p><span>Location :</span> Climate Change Directorate<br>
										Ministry of Environment and Forestry<br>
										National Climate Change Resource Centre<br>
										Dagoretti Corner, Ngong Road<br>
										P.O BOX 30259, 00100 GPO <br>
										Nairobi, Kenya</p>
										<p><span>Tel :</span> +254 20 2730808, +254 20 2730809, +254 20 2725707
</p>
										<p><span>Email :</span> psoffice@environment.go.ke</p>
									</div> 
                                    <!----<div class="footer-icons">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-google"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-pinterest"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i class="fa fa-instagram"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>--->
                                </div>
                            </div>
                        </div>
                    </div>
					<div class="digital-services-area">
                <div class="row">
					<div class="col-md-12 col-sm-12 col-xs-12">
						<div class="section-headline text-left">
							<h3>Our Partners </h3>
							</div>
					</div>
				</div>
                <div class="row">
                    <div class="we-services">

				        <!-- digital-services -->
						<?php
                                $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
                                query_posts(array(
                                'post_type'      => 'post', // You can add a custom post type if you like
                                'paged'          => $paged,
                                'posts_per_page' => 8,
                                'cat' => 2     )); 

                                while ( have_posts() ) : the_post();
                                $feat_image_url = wp_get_attachment_url( get_post_thumbnail_id() );
                                ?>
				        <div class="col-md-2 col-sm-4 col-xs-12">
							<div class="digital-services">
								<div class="digital-wel s2-item">
                                    <div class="digital-img">
                                        <a class="digital-icon" href="#"><img src="<?php echo $feat_image_url;?>" alt=""></a>
                                    </div>
								</div>
							</div>
				        </div>
						<?php endwhile; ?>
				      
                    </div>
                </div>
        </div>
                </div>
            </div>
            <!-- Start Footer Bottom Area -->
            <div class="footer-area-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <div class="copyright">
                                <p>
                                    Copyright © 2022
                                    <a href="#">imrvtool.com</a> All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Footer Bottom Area -->
        </footer>
        <!-- End Footer Area -->
		
		<!-- all js here -->

		<!-- jquery latest version -->
		<script src="<?php echo bloginfo('template_directory');?>/assets/js/vendor/jquery-1.12.4.min.js"></script>
		<!-- bootstrap js -->
		<script src="<?php echo bloginfo('template_directory');?>/assets/js/bootstrap.min.js"></script>
		<!-- owl.carousel js -->
		<script src="<?php echo bloginfo('template_directory');?>/assets/js/owl.carousel.min.js"></script>
		<!-- Counter js -->
		<script src="<?php echo bloginfo('template_directory');?>/assets/js/jquery.counterup.min.js"></script>
		<!-- waypoint js -->
		<script src="<?php echo bloginfo('template_directory');?>/assets/js/waypoints.js"></script>
		<!-- magnific js -->
        <script src="<?php echo bloginfo('template_directory');?>/assets/js/magnific.min.js"></script>
        <!-- wow js -->
        <script src="<?php echo bloginfo('template_directory');?>/assets/js/wow.min.js"></script>
         <!-- venobox js -->
        <script src="<?php echo bloginfo('template_directory');?>/assets/js/venobox.min.js"></script>
        <!-- meanmenu js -->
        <script src="<?php echo bloginfo('template_directory');?>/assets/js/jquery.meanmenu.js"></script>
		<!-- Form validator js -->
		<script src="<?php echo bloginfo('template_directory');?>/assets/js/form-validator.min.js"></script>
		<!-- plugins js -->
		<script src="<?php echo bloginfo('template_directory');?>/assets/js/plugins.js"></script>
		<!-- main js -->
		<script src="<?php echo bloginfo('template_directory');?>/assets/js/main.js"></script>
		<?php wp_footer(); ?>

	</body>
</html>
