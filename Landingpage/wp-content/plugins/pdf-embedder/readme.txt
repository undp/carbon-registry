=== PDF Embedder ===
Contributors: lionsher, nathansingh, chrisakelley, dimensionmedia
Tags: doc, pdf viewer, office, embed, document, intranet
Requires at least: 5.2.0
Tested up to: 5.8.2
Stable tag: 4.6.4
License: GPLv3
License URI: http://www.gnu.org/licenses/gpl-3.0.html

Embed PDF files directly into your posts and pages, with intelligent responsive resizing, and no third-party services or iframes.

== Description ==

Upload PDF files and embed them directly into your site's posts and pages. It works as simple as adding images! Your PDF files will be automatically sized to their natural size and shape. You can also specify a width and the correct height will be calculated automatically. Our PDF Embedder plugin is fully responsive, so the embedded PDF will also look perfect, on any device. Additionally, the pdf embedder will automatically resize whenever the browser dimensions change.

The plugin has a unique method for embedding PDF files, using Javascript only, and _not_ iframes or third-party services. This offers immense flexibility over the appearance of your document.

The PDF viewer has Next and Previous buttons to navigate the document, and zoom buttons if some areas of a PDF file are too small for your screen.

Your PDF files are embedded within your existing WordPress pages so we have full control over appearance, and all Javascript and other files are served by your own server (not by Google or any other third-party who may not be able to guarantee their own reliability). This means your PDF files will load fast, without any speed penalty.

Other PDF embedder plugins insert the PDF into an 'iframe' which means they do not get the flexibility over sizing. Ours does not and that is a incredible benefit to the overall viewing experience across all devices.

In the free plugin, there is no button for users to download the PDF, but download options are available in the Premium versions along with other awesome features.

Another Premium feature are Hyperlinks in your PDF being clickable. Links in the free plugin cannot be clicked.


= Usage =

1. Once installed and Activated, click Add Media from any page or post, just like adding an image, but drag and drop a PDF file instead.

1. When you insert into your post, it will appear in the editor as a 'shortcode' as follows:

1. [pdf-embedder url='https://mysite.com/wp-content/uploads/2015/01/Plan-Summary.pdf']

1. You can change the default appearance - e.g. width, and toolbar position/appearance through **Settings -> PDF Embedder**.

To override your site-wide defaults on an individual embed, see the [Plugin Instructions](http://wp-pdf.com/free-instructions/?utm_source=PDF%20Readme%20Instructions&utm_medium=freemium&utm_campaign=Freemium) for information about sizing options plus other ways to customize the shortcodes.

= Premium Features =

Features available in the PDF Embedder Premium versions:

* Download button in the toolbar
* Continuous scroll between pages
* Hyperlinks are fully functional
* Full screen mode
* Edit page number to jump straight to page
* Track number of downloads and views
* Mobile-friendly
* Secure option - difficult to download original PDF
* Removes wp-pdf.com branding

**See [wp-pdf.com](http://wp-pdf.com/?utm_source=PDF%20Readme%20Box&utm_medium=freemium&utm_campaign=Freemium) for details!**

= Mobile-friendly embedding using PDF Embedder Premium =

The free version will work on most mobile browsers, but cannot position the document entirely within the screen.

Our **PDF Embedder Premium** plugin solves this problem with an intelligent 'full screen' mode.

When the document is smaller than a certain width, the document displays only as a 'thumbnail' with a large 'View in Full Screen' button for the user to click when they want to study your document.

This opens up the document so it has the full focus of the mobile browser, and the user can move about the document without hitting other parts of the web page by mistake. Viewers can then Click Exit to return to the regular page.

The user can also swipe continuously between all pages of the PDF which is more natural than clicking the navigation buttons to navigate.

See our site [wp-pdf.com](http://wp-pdf.com/premium/?utm_source=PDF%20Readme%20Premium&utm_medium=freemium&utm_campaign=Freemium) for more details and purchase options.

= Protect your PDFs with our secure premium pdf embedder version =

Our **PDF Embedder Premium Secure** plugin provides the same simple but elegant viewer as the premium version, with the added protection that it is difficult for users to download or print the original PDF document.

This means that your PDF is unlikely to be shared outside your site where you have no control over who views, prints, or shares it.

Optionally, add a watermark containing the user's name or email address to discourage sharing of screenshots.

See our site [wp-pdf.com](http://wp-pdf.com/secure/?utm_source=PDF%20Readme%20Secure&utm_medium=freemium&utm_campaign=Freemium) for more details and purchase options.

= PDF Thumbnails =

Our **PDF Thumbnails** plugin automatically generates fixed image versions of all PDF files in your Media Library, to use on your site as you wish.

You can use them as featured images in posts containing an embedded version of the PDF, or as a visual clickable link to download the PDF directly.
It also displays the thumbnail as the â€˜iconâ€™ for the PDF in the Media Library, making it easy for authors to locate the PDFs they need to insert in a post.

See our site [wp-pdf.com/thumbnails/](http://wp-pdf.com/thumbnails/?utm_source=PDF%20Readme%20Thumbnails&utm_medium=freemium&utm_campaign=Freemium) for more details and purchase options.


= Now translation-ready! =

Please contribute your translations.

* Persian translation by Mostafa Safarian i of [Ø³Ø¦Ùˆ](http://www.greenseo.ir/)
* French translation by Thierry Gaillou of [JDFitForme](http://www.jdfitforme.fr/)
* Spanish translation by Armando Landois of [LANDOIS DiseÃ±o](https://landois.com/)


With thanks to the Mozilla team for developing the underlying [pdf.js](https://github.com/mozilla/pdf.js) technology used by this pdf embedder plugin.

== Screenshots ==

1. Uploaded PDF is displayed within your page/post at the correct size to fit.
2. User hovers over document to see Next/Prev page butons.
3. Settings can change appearance of the viewer, including size

== Frequently Asked Questions ==

= How can I obtain support for this product? =

We have [instructions](https://wp-pdf.com/free-instructions/) and a [Knowledge Base](https://wp-pdf.com/kb/) on our website explaining common setup queries and issues.

Please feel free to email [contact@wp-pdf.com](mailto:contact@wp-pdf.com) with any questions.

Always include your full shortcode, plus links to the relevant pages, and screenshots if they would be helpful too.

We may occasionally be able to respond to support queries posted on the 'Support' forum here on the wordpress.org plugin page, but we recommend sending us an email instead if possible.

= How can I change the Size or customize the Toolbar? =

See Settings -> PDF Embedder in your WordPress admin to change site-wide defaults. You can also override individual embeds by modifying the shortcode.

Resizing works as follows:

* If width='max' the width will take as much space as possible within its parent container (e.g. column within your page).
* If width is a number (e.g. width='500') then it will display at that number of pixels wide.

*In all cases, if the parent container is narrower than the width calculated above, then the document width will be reduced to the size of the container.*

The height will be calculated so that the document fits naturally, given the width already calculated.

The Next/Prev toolbar can appear at the top or bottom of the document (or both), and it can either appear only when the user hovers over the document or it can be fixed at all times.

See the [Plugin Instructions](http://wp-pdf.com/free-instructions/?utm_source=PDF%20Readme%20FAQ&utm_medium=freemium&utm_campaign=Freemium) for more details about sizing and toolbar options.

= PDF Embedder Premium feature list =

Features available in the premium versions of the plugin:

* Download button in the toolbar
* Continuous scroll between pages
* Hyperlinks are fully functional
* Full screen mode
* Edit page number to jump straight to page
* Track number of downloads and views
* Removes wp-pdf.com attribution from the toolbar
* Mobile-friendly
* Secure option - difficult to download original PDF

See [wp-pdf.com](http://wp-pdf.com/?utm_source=PDF%20Readme%20Box&utm_medium=freemium&utm_campaign=Freemium) for details!


= Can I improve the viewing experience for mobile users? =

Yes, our **PDF Embedder Premium** plugin has an intelligent 'full screen' mode.
When the document is smaller than a certain width, the document displays only as a 'thumbnail' with a large 'View in Full Screen' button for the user to click when they want to study your document.
This opens up the document so it has the full focus of the mobile browser, and the user can move about the document without hitting other parts of the web page by mistake.
Click Exit to return to the regular web page.

See our website [wp-pdf.com](http://wp-pdf.com/premium/?utm_source=PDF%20Readme%20FAQ%20Premium&utm_medium=freemium&utm_campaign=Freemium) for more details and purchase options.

= Can I protect my PDFs so they are difficult for viewers to download directly? =

Not with the free or (regular) pdf embedder premium versions - it is relatively easy to find the link to download the file directly.

A **secure premium** version is available that encrypts the PDF during transmission, so it is difficult for a casual user to save or print the file for use outside your site.

See our website [wp-pdf.com](http://wp-pdf.com/secure/?utm_source=PDF%20Readme%20FAQ%20Secure&utm_medium=freemium&utm_campaign=Freemium) for more details and purchase options.

= Can I add a Download button to the toolbar? =

This is possible only in the PDF Embedder Premium version. As a workaround in the free version, you could add a direct link to the PDF beneath the embedded version.

To do this, copy the URL from the pdf-embedder shortcode and insert it into a link using HTML such as this:
&lt;a href="(url of PDF)"&gt;Download Here&lt;/a&gt;

= Are Hyperlinks supported? =

The Premium versions allow functioning hyperlinks - both internal links within the document, and links to external websites.

= Can I remove the wp-pdf.com link from the viewer toolbar? =

The easiest way is to upgrade to our Premium version, but if you know how to add entries to your database then you can add a line to the wp_options table
with option_name 'pdfemb_poweredby' and option_value '1'.

For more information on PDF Embedder Premium versions visit [wp-pdf.com](http://wp-pdf.com/?utm_source=PDF%20Readme%20FAQ%20Bottom&utm_medium=freemium&utm_campaign=Freemium).

== Installation ==

Easiest way:

1. Go to your WordPress admin control panel's plugin page
1. Search for 'PDF Embedder'
1. Click Install
1. Click Activate on the plugin

If you cannot install from the WordPress plugins directory for any reason, and need to install from ZIP file:

1. Upload directory and contents to the `/wp-content/plugins/` directory, or upload the ZIP file directly in
the Plugins section of your Wordpress admin
1. Follow the instructions from step 4 above

== Changelog ==

= 4.6.4 =

Resolved Javascript errors in minified JS

= 4.6.3 =

Added about tab
Updated core PDF.js functionality
Addressed mobile issue in Safari iOS

= 4.6.2 =

Added support for Italian language
Security & Bug fixes
Updated compatibility for Wordpress 5.7

= 4.6.1 =

PDF Zoom increase upto 800%
Added compatibility for Wordpress 5.7

= 4.6 =

Fix language compatibility issue in viewer
Fixes js and css files cache issue
Added compatibility for Wordpress 5.3.2

= 4.5 =

Added compatibility for Wordpress 5.3
Fixes multiple PDF rendering issues in viewer

= 4.4 =

Fixed code for policy compatibility

= 4.3 =

Fixed Scrollbar issues with Firefox and iOS devices. Improved compatibility

= 4.2 =

Fixed script problem on some Gutenberg editor installations. Improved compatibility

= 4.1 =

Added compatibility for Wordpress 5.2.1

= 4.0 =

Fixed general bug & added compatibility

= 3.2.1 =

Added compatibility for WordPress 5.2.1

= 3.2 =

Added compatibility with Gutenberg Editor

= 3.1.8 =

Updated version of underlying pdf.js library, fixes some rendering bugs.

Recalculates fresh viewer size more often in response to resize events. Previous versions attempted to increase performance by only recalculating viewer size when it had changed, but this missed some required resizing after Javascript-based tabs are clicked.

Fixed some issues with zoom appearance.

Mouse scroll wheel is now more consistent across all browsers (in terms of scroll speed).

When scrollbars are always visible, no longer cuts off edge of PDF underneath.

= 3.1.2 =

Ready for compatibility with WordPress 4.8.

New mouse wheel scrolling in Firefox wasnâ€™t working with some themes.

Latest version of pdf.js library, and newest code bringing the free version into line with the premium versions.

Mouse wheel scrolling in Firefox no longer also scrolls the window unless at very top or bottom of page.

= 3.0.1 =

Latest version of pdf.js library, and newest code bringing the free version into line with the premium versions.

Improved responsiveness and redraw of pages.

Plugin now respects the SCRIPT_DEBUG flag in wp-config.php and displays non-minified versions of the JS files if this is set to true.
Helps debugging any issues.

= 2.8.2 =

Latest version of pdf.js library to include recent rendering developments/fixes by the team.

= 2.8 =

Internal code refactoring. Added note that 'page turning arrows' are now available in the premium versions.

= 2.7.5 =

Fix for a small number of PDFs rendering as smaller than expected on some high resolution screens.

= 2.7.3 =

**Please clear browser and any WordPress cache if you experience any problems following this upgrade.**

Better support for high resolution screens.

Improved SEO for embedded PDFs (which are now links initially before Javascript converts them into the interactive view).
This also ensures the PDFs are accessible to users even if Javascript problems cause your site to break.

Compatible with WordPress 4.6.

Added a filter named my_pdfemb_override_send_to_editor that means the shortcode generation can be turned off if desired.

Uses latest version of pdf.js library for rendering PDFs.

Toolbar buttons have type="button" attribute to avoid conflicts with some other plugins.

Spanish translation contributed by Armando Landois.

Added pdfemb_filter_shortcode_attrs filter so developers can change default shortcode parameters through code.

= 2.5.5 =

Fixes for right-to-left languages.

= 2.5.4 =

Added French translation thanks to Thierry Gaillou of JDFitForme.
Uses newer version of pdf.js library for rendering PDFs.

= 2.5 =

Uses latest version of pdf.js library for rendering PDFs.
Options page tidied up.

= 2.4.7 =

Some settings were difficult to change on multisite installs.

= 2.4.3 =

Code placeholders for opening links - available only in premium versions.
Updated languages.

= 2.4.1 =

Code placeholders for tracking views/downloaders - available only in premium versions.
Updated languages.

= 2.4 =

Now translation-ready! Your language contributions are welcome.
Compatibility with WordPress 4.4

Contains information about new features in Premium version:
Functioning hyperlinks
Jump to page number

= 2.2.5 =

Better explanation of some error messages (e.g. attempt to access PDF on a different domain).
Forced white background by default - some Theme's CSS would override.

= 2.2.4 =

'Download PDF' button added to options, but function is only available in Premium versions.

= 2.2.2 =

Redesigned toolbar buttons

= 2.2 =

New version of PDF.js, fixes some PDF rendering bugs.

= 2.1.4 =

Obtains PDF over same transport (https/http) as host page, regardless of that specified in the shortcode url parameter. This avoids conflicts and failure to display PDF if the two don't match.

= 2.1 =

Settings -> PDF Embedder page so you can now set site-wide defaults for width, height, and toolbar location/appearance.

= 2.0 =

Added zoom feature. Toolbars can be fixed instead of appearing on hover.

= 1.2.1 =

Fixed 'scrollbars' in IE.

= 1.2 =

Fixed 'scrollbar' issues.

Displays page number on toolbar ("Page 1/10").

Added 'Loading...' indicator.

Improved display of many PDFs (Added 'cmaps' to the distribution).

= 1.0.4 =

Added compatibility.js to support some minor browsers, e.g. Safari which did not allow ranged downloads

= 1.0.2 =

Minified Javascript code. Default width/height (now "max") expands to fill parent container width regardless of the natural size of the document. Use width="auto" to obtain the old behavior.

= 1.0.1 =

Added usage instructions within the settings page.

= 1.0 =
First version
