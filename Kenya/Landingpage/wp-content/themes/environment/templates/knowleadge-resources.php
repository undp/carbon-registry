<?php /* Template Name: Knowledge resources */ ?>
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