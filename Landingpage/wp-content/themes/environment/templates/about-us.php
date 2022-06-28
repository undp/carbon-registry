<?php /* Template Name: About us */ ?>
<?php get_header(); ?>
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
        <!-- Start Counter area -->
        <div class="counter-area fix area-padding" id="about">
            <div class="container">
               <div class="row">
                   <div class="col-md-12 col-sm-12 col-xs-12 wow fadeInLeft" data-wow-delay="0.3s">
         <h3>What’s New and latest development in MRV of Kenya</h3>
<p>1.	Developing a common framework for tracking and reporting on climate action at the national, county and sectoral levels, and for ensuring alignment with the NDC.</p>
<p>2.	Establishing formal data collection and sharing arrangements, including Memorandums of Understanding (MoUs), between data suppliers and users, and ensuring adequate quality assurance and control of the data.</p>
<p>3.	Providing adequate budgetary allocation for MRV activities.</p>
<p>4.	Establishing climate action (mitigation and adaptation) registries and systems for the coordination of climate action, and for assessing and tracking the effectiveness of the actions, together with climate finance that has been allocated to them.</p>
<p>5.	Conducting awareness creation and training activities for key stakeholders in government and the public sector, civil society and the private sector, with a special focus on devolved county governments where a significant proportion of climate action is expected to take place.</p>

					   <h3>Long term MRV and LTS plan etc</h3>
					   <p>In line with NDC implementation and according to the National Climate Change Action Plan (NCCAP) 2018-2022, Kenya’s long term MRV plan is to effectively track and report on all key climate change components both nationally and internationally.</p> 
					   <p>Kenya hopes to also link MRV with ongoing processes in the country including tracking of climate finance as well as National and County M & E processes</p>
					   <p>The ultimate goal is to have a system that will be efficient in:</p>
					   <p>1.	Strengthening national institutions in Kenya for MRV and transparency-related activities in line with Kenya’s national priorities</p>
					   <p>2.	Improving MRV by allowing provision of data to drive development in Kenya’s agricultural sector, food security and natural resource management.</p>
					   <p>3.	Enhancing coordination between national, regional and global transparency-related accomplishments in Kenya</p>
					   <p>We should have some provision of the tool to capture the projected LTS and NDC actions for linkage with the reported actions  </p>
					   
					   
                    </div>
                    
                </div> 
            </div>
        </div>
        <!-- End Counter area -->
       
<?php get_footer(); ?>