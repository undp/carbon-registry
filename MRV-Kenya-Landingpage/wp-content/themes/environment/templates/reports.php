<?php /* Template Name: Reports */ ?>
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

<?php get_footer(); ?>