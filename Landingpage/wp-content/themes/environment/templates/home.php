<?php /* Template Name: Home */ ?>
<?php get_header(); ?>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<?php 
$id=5; 
$post = get_post($id); 
$content = apply_filters('the_content', $post->post_content); 
echo $content;  
?>
<main id="site-content" role="main">

	<?php

	if ( have_posts() ) {

		while ( have_posts() ) {
			the_post();

			get_template_part( 'template-parts/content', get_post_type() );
		}
	}

	?>

</main><!-- #site-content -->
<!-- Start Slider Area -->
        <div class="intro-area-2">
            <div class="intro-carousel">
                <div class="intro-content-2">
                    <div class="slider-images">
                        <img src="http://imrvtool.com/wp-content/uploads/2022/05/sl-1.jpg" alt="">
                    </div>
                    <div class="slider-content">
                        <div class="display-table">
                            <div class="display-table-cell">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <!-- layer 1 -->
                                            <!--<div class="layer-1 wow fadeInUp" data-wow-delay="0.3s">
                                                <h2 class="title2">Title is Goes Here</h2>
                                            </div>-->
                                            <!-- layer 2 -->
                                            <!--<div class="layer-2 wow fadeInUp" data-wow-delay="0.5s">
                                                <p>Content is goes here</p>
                                            </div>-->
                                            <!-- layer 3 -->
                                            <!--<div class="layer-3 wow fadeInUp" data-wow-delay="0.7s">
                                                <a href="#" class="ready-btn left-btn " >Our Services</a>
                                                <a href="#" class="ready-btn right-btn">Contact us</a>
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="intro-content-2 slide-2">
                    <div class="slider-images">
                        <img src="http://imrvtool.com/wp-content/uploads/2022/05/sl-2.jpg" alt="">
                    </div>
                    <div class="slider-content">
                        <div class="display-table">
                            <div class="display-table-cell">
                                <div class="container">
                                    <div class="row">
                                         <div class="col-md-12">
                                            <!-- layer 1 -->
                                            <!--<div class="layer-1 wow fadeInUp" data-wow-delay="0.3s">
                                                <h2 class="title2">Title is Goese Here</h2>
                                            </div>-->
                                            <!-- layer 2 -->
                                           <!-- <div class="layer-2 wow fadeInUp" data-wow-delay="0.5s">
                                                <p>Description is Goese Here</p>
                                            </div>-->
                                            <!-- layer 3 -->
                                            <!--<div class="layer-3 wow fadeInUp" data-wow-delay="0.7s">
                                                <a href="#" class="ready-btn left-btn " >Our Services</a>
                                                <a href="#" class="ready-btn right-btn">Contact us</a>
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="intro-content-2 slide-3">
                    <div class="slider-images">
                        <img src="http://imrvtool.com/wp-content/uploads/2022/05/sl-3.jpg" alt="">
                    </div>
                    <div class="slider-content">
                        <div class="display-table">
                            <div class="display-table-cell">
                                <div class="container">
                                    <div class="row">
                                         <div class="col-md-12">
                                            <!-- layer 1 -->
                                            <!--<div class="layer-1 wow fadeInUp" data-wow-delay="0.3s">
                                                <h2 class="title2">Title is Goese Here</h2>
                                            </div>-->
                                            <!-- layer 2 -->
                                            <!--<div class="layer-2 wow fadeInUp" data-wow-delay="0.5s">
                                                <p>Description is Goese Here</p>
                                            </div>-->
                                            <!-- layer 3 -->
                                            <!--<div class="layer-3 wow fadeInUp" data-wow-delay="0.7s">
                                                <a href="#" class="ready-btn left-btn " >Our Services</a>
                                                <a href="#" class="ready-btn right-btn">Contact us</a>
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div class="intro-content-2 slide-4">
                    <div class="slider-images">
                        <img src="http://imrvtool.com/wp-content/uploads/2022/05/sl-4.jpg" alt="">
                    </div>
                    <div class="slider-content">
                        <div class="display-table">
                            <div class="display-table-cell">
                                <div class="container">
                                    <div class="row">
                                         <div class="col-md-12">
                                            <!-- layer 1 -->
                                            <!--<div class="layer-1 wow fadeInUp" data-wow-delay="0.3s">
                                                <h2 class="title2">Title is Goese Here</h2>
                                            </div>-->
                                            <!-- layer 2 -->
                                            <!--<div class="layer-2 wow fadeInUp" data-wow-delay="0.5s">
                                                <p>Description is Goese Here</p>
                                            </div>-->
                                            <!-- layer 3 -->
                                            <!--<div class="layer-3 wow fadeInUp" data-wow-delay="0.7s">
                                                <a href="#" class="ready-btn left-btn " >Our Services</a>
                                                <a href="#" class="ready-btn right-btn">Contact us</a>
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div class="intro-content-2 slide-5">
                    <div class="slider-images">
                        <img src="http://imrvtool.com/wp-content/uploads/2022/05/sl-5.jpg" alt="">
                    </div>
                    <div class="slider-content">
                        <div class="display-table">
                            <div class="display-table-cell">
                                <div class="container">
                                    <div class="row">
                                         <div class="col-md-12">
                                            <!-- layer 1 -->
                                            <!--<div class="layer-1 wow fadeInUp" data-wow-delay="0.3s">
                                                <h2 class="title2">Title is Goese Here</h2>
                                            </div>-->
                                            <!-- layer 2 -->
                                            <!--<div class="layer-2 wow fadeInUp" data-wow-delay="0.5s">
                                                <p>Description is Goese Here</p>
                                            </div>-->
                                            <!-- layer 3 -->
                                            <!--<div class="layer-3 wow fadeInUp" data-wow-delay="0.7s">
                                                <a href="#" class="ready-btn left-btn " >Our Services</a>
                                                <a href="#" class="ready-btn right-btn">Contact us</a>
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div class="intro-content-2 slide-6">
                    <div class="slider-images">
                        <img src="http://imrvtool.com/wp-content/uploads/2022/05/sl-6.jpg" alt="">
                    </div>
                    <div class="slider-content">
                        <div class="display-table">
                            <div class="display-table-cell">
                                <div class="container">
                                    <div class="row">
                                         <div class="col-md-12">
                                            <!-- layer 1 -->
                                            <!--<div class="layer-1 wow fadeInUp" data-wow-delay="0.3s">
                                                <h2 class="title2">Title is Goese Here</h2>
                                            </div>-->
                                            <!-- layer 2 -->
                                            <!--<div class="layer-2 wow fadeInUp" data-wow-delay="0.5s">
                                                <p>Description is Goese Here</p>
                                            </div>-->
                                            <!-- layer 3 -->
                                            <!--<div class="layer-3 wow fadeInUp" data-wow-delay="0.7s">
                                                <a href="#" class="ready-btn left-btn " >Our Services</a>
                                                <a href="#" class="ready-btn right-btn">Contact us</a>
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Slider Area -->
        <!-- Start Counter area -->
        <!--<div class="counter-area fix area-padding" id="about">
            <div class="container">
               <div class="row">
                   <div class="col-md-12 col-sm-12 col-xs-12 wow fadeInLeft" data-wow-delay="0.3s">
                       <h3>Brief information on IMRV Tool of Kenya</h3>
                       <p>The Ministry of Environment and Forestry developed Kenya’s Monitoring Reporting and Verification (MRV) system/tool to facilitate climate change reporting by sectors as is required by the Climate Change Act, 2016. </p>
                       <p>In the context of NDC implementation and according to the National Climate Change Action Plan (NCCAP) 2018-2022, Kenya’s MRV system entails the process by which the following will be tracked and reported at both national and international levels</p>
                       <a href="about-us">Read More</a>
                    </div>
                    
                </div> 
            </div>
        </div>-->
        <!-- End Counter area -->
       <!-- Start Team Banner area -->
        <!-- End Team Banner area -->
        <!-- Start Tab Area -->
        <div class="tab-area fix bg-color wow fadeInUp" data-wow-delay="0.3s" id="projects">
            <div class="container">
                <div class="section-headline text-center">
							<h3>Our Projects</h3>
						</div>
				<ul class="pr-blw-img-list">
					<li><img src="http://imrvtool.com/wp-content/uploads/2022/05/p-1.jpg"></li>
					<li><img src="http://imrvtool.com/wp-content/uploads/2022/05/p-2.jpg"></li>
					<li><img src="http://imrvtool.com/wp-content/uploads/2022/05/p-3.jpg"></li>
				</ul>
                <div class="row">
					<div class="col-md-12 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.5s">
						<div class="tab-menu">
				            <!-- Start Nav tabs -->
							<ul class="nav nav-tabs" role="tablist">
								<li class="active">
								    <a href="#p-view-1" role="tab" data-toggle="tab">
								        <span class="cha-title">Adaptation Actions</span>
								    </a>
								</li>
								<li>
								    <a href="#p-view-2" role="tab" data-toggle="tab">
								        <span class="cha-title">Mitigation Actions</span>
								    </a>
								</li>
								<li>
								    <a href="#p-view-3" role="tab" data-toggle="tab">
								        <span class="cha-title">Cross Cutting</span>
								    </a>
								</li>
								<li>
								    <a href="#p-view-4" role="tab" data-toggle="tab">
								        <span class="cha-title">Enablers</span>
								    </a>
								</li>
							</ul>
							<!-- End Nav tabs -->
						</div>
					</div>
					<div class="col-md-12 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.7s">
						<div class="tab-content">
						    <!--Start Tab Content -->
                        
							<div class="tab-pane active" id="p-view-1" >
								<div class="tab-inner">
									<table class="project-tbl">
                                        <tr>
                                          <th>Sno</th>
                                          <th>Intervention</th>
                                          <th>Sector</th>
                                          <th>Subsector</th>
                                          <th>Project Title</th>
                                          <th>Implementing Agency</th>
                                          <th>Area Name</th>
                                          <th>Project Cost (USD)</th>
											<th>Sources of Funding</th>
											<th>Start Date</th>
											<th>End Date</th>
                                        </tr>
                                        <tr>
                                          <td>1</td>
                                          <td>Adaptation</td>
                                          <td>Agriculture, Food and Nutrition Security</td>
                                          <td>Crops</td>
                                          <td>Improve crop productivity through the roll out of the Climate Smart Agriculture interventions</td>
											<td>County Governments</td>
                                          <td>County</td>
                                          <td>17920</td>
                                          <td>Gov, Grant or Loan</td>
											<td>2018</td>
											<td>2022</td>
                                        </tr>
                                        <tr>
                                          <td>2</td>
                                          <td>Adaptation</td>
                                          <td>Drought and Epidemic Risk Management /Ending Drought Emergencies</td>
                                          <td>Droughts</td>
                                          <td>Emergency Agricultural Livelihoods and Climate Resilience Project</td>
											<td>Ministry of Blue and Green Economy, Agriculture, and National Food Security</td>
                                          <td>National</td>
                                          <td>250000</td>
                                          <td> Broad Source of funding </td>
											<td>2018</td>
											<td>2023</td>
                                        </tr>
										 <tr>
                                          <td>3</td>
                                          <td>Adaptation</td>
                                          <td>Water and Sanitation</td>
                                          <td>Oters</td>
                                          <td>Sample project</td>
											<td>UNDP</td>
                                          <td>National</td>
                                          <td>250000</td>
                                          <td> Broad Source of funding </td>
											<td>2018</td>
											<td>2023</td>
                                        </tr>
										 <tr>
                                          <td>4</td>
                                          <td>Adaptation</td>
                                          <td>Energy</td>
                                          <td>Others</td>
                                          <td>Sample project</td>
											<td>UNDP</td>
                                          <td>National</td>
                                          <td>250000</td>
                                          <td> Broad Source of funding</td>
											<td>2018</td>
											<td>2023</td>
                                        </tr>
                                         
                                    </table>
								</div>
							</div>
							<!--Start Tab Content -->
							<div class="tab-pane" id="p-view-2">
								<div class="tab-inner">
									<table class="project-tbl">
                                        <tr>
                                          <th>Sno</th>
                                          <th>Intervention</th>
                                          <th>Sector</th>
                                          <th>Subsector</th>
                                          <th>Project Title</th>
                                          <th>Implementing Agency</th>
                                          <th>Area Name</th>
                                          <th>Project Cost (USD)</th>
											<th>Sources of Funding</th>
											<th>Start Date</th>
											<th>End Date</th>
                                        </tr>
                                        <tr>
                                          <td>1</td>
                                          <td>Mitigation</td>
                                          <td>Agriculture</td>
                                          <td>Agroforestry</td>
                                          <td>Implement the dairy NAMA by 2030</td>
											<td>Department of Livestock</td>
                                          <td>National</td>
                                          <td>100000</td>
                                          <td> Others</td>
											<td>2018</td>
											<td>2030</td>
                                        </tr>
                                        <tr>
                                          <td>2</td>
                                          <td>Mitigation</td>
                                          <td>Energy Utilisation</td>
                                          <td>Energy Efficiency</td>
                                          <td>Provide universal access to electricity by 2022</td>
											<td>Ministry of Energy</td>
                                          <td>National</td>
                                          <td>50000</td>
                                          <td>  Broad Source of funding </td>
											<td>2018</td>
											<td>2030</td>
                                        </tr>
										 <tr>
                                          <td>3</td>
                                          <td>Mitigation</td>
                                          <td>Industrial Sector</td>
                                          <td>Waste Recovery/Utilization</td>
                                          <td>Increase share of final energy demand coming from hydrogen in the cement industry</td>
											<td>State Department of Industrialisation</td>
                                          <td>County</td>
                                          <td>75000</td>
                                          <td>Gov, Grant or Loan </td>
											<td>2019</td>
											<td>2030</td>
                                        </tr>
										 <tr>
                                          <td>4</td>
                                          <td>Mitigation</td>
                                          <td>Transport</td>
                                          <td>Rail</td>
                                          <td>Future rail development to design with electricity driven locomotives and Extension of SGR from Naivasha-to-Malaba.</td>
											<td>State Department of Transport</td>
                                          <td>Sub-county</td>
                                          <td>150000</td>
                                          <td>  Broad Source of funding </td>
											<td>2018</td>
											<td>2023</td>
                                        </tr>
                                         
                                    </table>
								</div>
							</div>
<div class="tab-pane" id="p-view-3">
								<div class="tab-inner">
									<table class="project-tbl">
                                        <tr>
                                          <th>Sno</th>
                                          <th>Intervention</th>
                                          <th>Sector</th>
                                          <th>Subsector</th>
                                          <th>Project Title</th>
                                          <th>Implementing Agency</th>
                                          <th>Area Name</th>
                                          <th>Project Cost (USD)</th>
											<th>Sources of Funding</th>
											<th>Start Date</th>
											<th>End Date</th>
                                        </tr>
                                        <tr>
                                          <td>1</td>
                                          <td>Crosscutting</td>
                                          <td><span>Forestry</span>Gender, Youth and Other Vulnerable Groups</td>
                                          <td>Reduce deforestation and forest degradation</td>
                                          <td>Landscape Emission Reductions Project</td>
											<td>Ministry of Environment and forestry</td>
                                          <td>Sub-county</td>
                                          <td>80000</td>
                                          <td> Broad Source of funding</td>
											<td>2017</td>
											<td>2028</td>
                                        </tr>
                                        <tr>
                                          <td>2</td>
                                          <td>Crosscutting</td>
                                          <td><span>Agriculture, Food and Nutrition Security
</span><span>Health</span>Land use and land use change</td>
                                          <td>Land use change</td>
                                          <td>Resilient Landscapes and Livelihoods Project</td>
											<td>Ministry of Environment and forestry</td>
                                          <td>County</td>
                                          <td>90000</td>
                                          <td> Others</td>
											<td>2020</td>
											<td>2026</td>
                                        </tr>
                                         
                                    </table>
								</div>
							</div>
							<div class="tab-pane" id="p-view-4">
								<div class="tab-inner">
									<table class="project-tbl">
                                        <tr>
                                          <th>Sno</th>
                                          <th>Intervention</th>
                                          <th>Sector</th>
                                          <th>Subsector</th>
                                          <th>Project Title</th>
                                          <th>Implementing Agency</th>
                                          <th>Area Name</th>
                                          <th>Project Cost (USD)</th>
											<th>Sources of Funding</th>
											<th>Start Date</th>
											<th>End Date</th>
                                        </tr>
                                        <tr>
                                          <td>1</td>
                                          <td>Enablers</td>
                                          <td>others</td>
                                          <td>others</td>
                                          <td>Agriculture Sector Development Policy Operation</td>
											<td>Ministry of Agriculture and Rural Development</td>
                                          <td>National</td>
                                          <td>50000</td>
                                          <td> Gov, Grant or Loan</td>
											<td>2013</td>
											<td>2015</td>
                                        </tr>
                                        <tr>
                                          <td>2</td>
                                          <td>Enablers</td>
                                          <td>others</td>
                                          <td>others</td>
                                          <td>Rural Capacity Building Project</td>
											<td>Ministry of Rural Development</td>
                                          <td>County</td>
                                          <td>500000</td>
                                          <td>  Broad Source of funding </td>
											<td>2006</td>
											<td>2012</td>
                                        </tr>
                                         
                                    </table>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- end Row -->
            </div>
        </div>
        <!-- End Tab end -->
<div class="about-area report-section about-2 fix wow fadeInUp" data-wow-delay="0.3s" id="reports">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.7s">
                        <div class="support-all about-content">
                            <div class="section-headline right-headline text-center">
                                <h3>National <span class="color">GHG</span> Inventory</h3>
                            </div>
                            <div class="about-company">
                                <div class="row">
                    				<div class="col-md-12 col-sm-12 col-xs-12 wow fadeInUp" data-wow-delay="0.7s">
                        				<img src="http://imrvtool.com/wp-content/uploads/2022/05/reprt.jpg" width="100%">
                                
                            		</div>

                        </div>

                    </div>
                    <!-- column end -->
                </div>
            </div>
        </div>
	</div>
</div>
<div class="blog-area fix bg-color wow fadeInUp" data-wow-delay="0.3s" id="knowleadges">
            <div class="container">
                <div class="row">
					<div class="col-md-12 col-sm-12 col-xs-12">
						<div class="section-headline text-center">
                            <h3>Knowledge Resources</h3>
						</div>
					</div>
				</div>
                <div class="row">
                    <div class="blog-grid home-blog">
                        <!-- Start single blog -->
						<?php
                                $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
                                query_posts(array(
                                'post_type'      => 'post', // You can add a custom post type if you like
                                'paged'          => $paged,
                                'posts_per_page' => 4,
								'order' =>'asc', 	
                                'cat' => 3     )); 

                                while ( have_posts() ) : the_post();
                                $feat_image_url = wp_get_attachment_url( get_post_thumbnail_id() );
                                ?>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <div class="single-blog">
                               <div class="blog-image">
									<?php echo get_the_content(); ?>	
								</div>

                            </div>
                        </div>
						<?php endwhile; ?>
                        <!-- End single blog -->
					</div>
					</div>
						 <div class="row">
                    <div class="blog-grid home-blog">
                        <!-- Start single blog -->
						<?php
                                $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
                                query_posts(array(
                                'post_type'      => 'post', // You can add a custom post type if you like
                                'paged'          => $paged,
                                'posts_per_page' => 3,
								'order' =>'asc', 	
                                'cat' => 4     )); 

                                while ( have_posts() ) : the_post();
                                $feat_image_url = wp_get_attachment_url( get_post_thumbnail_id() );
                                ?>
                        <div class="col-md-4 col-sm-6 col-xs-12">
                            <div class="single-blog">
                                <div class="blog-image">
									<?php echo get_the_content(); ?>
								</div> 
                            </div>
                        </div>
						<?php endwhile; ?>
                      

                    </div>
                </div>
                <!-- End row -->
            </div>
        </div>
<?php get_footer(); ?>