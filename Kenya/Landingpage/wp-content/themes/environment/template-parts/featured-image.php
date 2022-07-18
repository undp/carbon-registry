<?php
/**
 * Displays the featured image
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

if ( has_post_thumbnail() && ! post_password_required() ) {

	$featured_media_inner_classes = '';

	// Make the featured media thinner on archive pages.
	if ( ! is_singular() ) {
		$featured_media_inner_classes .= ' medium';
	}
	?>

	<figure class="featured-media">

		<div class="featured-media-inner section-inner<?php echo $featured_media_inner_classes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static output ?>">

			<?php
			the_post_thumbnail();

			$caption = get_the_post_thumbnail_caption();

			if ( $caption ) {
				?>

				<figcaption class="wp-caption-text"></figcaption>

				<?php
			}
			?>

		</div><!-- .featured-media-inner -->

	</figure><!-- .featured-media -->

	<?php
}
else {?>
<section class="breadcrumb-area">
                <div class="row">
                    <div class="col-xl-12">
						<div class="all-banner"><img src="http://environment.goappssolutions.com/wp-content/uploads/2021/11/all.jpg" alt=""/></div>
                     <div class="container">
						<div class="inner-content clearfix">
                            <div class="title">
                                <h1><?php the_title(); ?></h1>
                            </div>
                            <div class="breadcrumb-menu float-right">
                                <ul class="clearfix">
                                    <li><a href="#">Home</a> >> </li>
                                    <li class="active"><?php the_title(); ?></li>
                                </ul>
                            </div>
                        </div>
						</div>
                    </div>
                </div>
        </section>
<?php } ?>