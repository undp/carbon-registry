<?php /* Template Name: About IMRV Tool */ ?>
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
        
        <!-- Start Counter area -->
        <div class="counter-area fix area-padding" id="about">
            <div class="container">
               <div class="row">
                   <div class="col-md-12 col-sm-12 col-xs-12 wow fadeInLeft" data-wow-delay="0.3s">
                       <h3>Brief information on iMRV Tool of Kenya</h3>
                       <p>The Ministry of Environment and Forestry developed Kenya’s Monitoring Reporting and Verification (MRV) system/tool to facilitate climate change reporting by sectors as is required by the Climate Change Act, 2016.In the context of NDC implementation and according to the National Climate Change Action Plan (NCCAP) 2018-2022, Kenya’s MRV system entails the process by which the following will be tracked and reported at both national and international levels</p>

<p> 1. The implementation and impacts of mitigation actions, including the national GHG inventory to enable tracking of progress on implementing and achieving the mitigation component of the NDC.</p>
<p>2. The implementation and impacts of adaptation actions, including information related to climate change impacts, vulnerabilities and adaptation</p>
<p>3. Climate finance flows- external support needed and received (finance) towards these actions, including information on financial, technology development and transfer, and capacity building needs and support received from developed countries. Such support could be financial, technology transfer or capacity building</p>
 <p>4. Sustainable Development (SDG) impacts based on the UNDP Climate Action Impact Tool (CAIT) also known as UNDP SDG tool</p>
					   
<h3>What’s New and latest development in MRV of Kenya</h3>
                       <p>In line with NDC implementation and according to the National Climate Change Action Plan (NCCAP) 2018-2022, Kenya’s long term MRV plan is to effectively track and report on all key climate change components both nationally and internationally. Kenya hopes to also link MRV with ongoing processes in the country including tracking of climate finance as well as National and County M & E processes</p>
<p>The ultimate goal is to have a system that will be efficient in: </p>
<p> 1. Strengthening national institutions in Kenya for MRV and transparency-related activities in line with Kenya’s national priorities</p>
<p>2. Improving MRV by allowing provision of data to drive development in Kenya’s agricultural sector, food security and natural resource management.</p>
<p>3. Enhancing coordination between national, regional and global transparency-related accomplishments in Kenya</p>
 <p>We should have some provision of the tool to capture the projected LTS and NDC actions for linkage with the reported actions.</p>					   
	
					   
					   
                    </div>
                    
                </div> 
            </div>
        </div>
        

<?php get_footer(); ?>