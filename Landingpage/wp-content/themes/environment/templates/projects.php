<?php /* Template Name: Projects */ ?>
<?php get_header(); ?>
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
        <!-- Start Tab Area -->
        <div class="tab-area fix area-padding bg-color wow fadeInUp" data-wow-delay="0.3s" id="projects">
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


<?php get_footer(); ?>