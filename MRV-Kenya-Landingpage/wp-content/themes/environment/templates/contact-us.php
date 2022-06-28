<?php /* Template Name: Contact Us */ ?>
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

<div class="contact-area area-padding-2" id="contact">
            <div class="container">
            <div class="section-headline text-center">
                            <h3>Contact Us</h3>
						</div>
                <div class="row">
                    <div class="contact-inner">
                        <!-- Start contact icon column -->
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="contact-icon text-center">
                                <div class="single-icon">
                                    <i class="ti-mobile"></i>
                                    <p>
                                         +254 20 2730808<br>
										 +254 20 2730809 <br>
										 +254 20 2725707<br>
                                        <!--<span>Monday-Friday (10am-18pm)</span>-->
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- Start contact icon column -->
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="contact-icon text-center">
                                <div class="single-icon">
                                    <i class="ti-email"></i>
                                    <p>
                                        psoffice@environment.go.ke<br>
                                        <!--<span>Web: www.website.com</span>-->
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- Start contact icon column -->
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="contact-icon text-center">
                                <div class="single-icon">
                                    <i class="ti-location-pin"></i>
                                    <p>
                                        Climate Change Directorate<br>
										Ministry of Environment and Forestry<br>
										National Climate Change Resource Centre<br>
										Dagoretti Corner, Ngong Road<br>
										P.O BOX 30259, 00100 GPO <br>
										Nairobi, Kenya

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

<?php get_footer(); ?>