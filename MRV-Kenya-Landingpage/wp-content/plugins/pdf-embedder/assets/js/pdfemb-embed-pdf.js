// JQuery Plugin
jQuery(document).ready(function ($) {

    $.fn.pdfEmbedder = function(cmapURL) {
      
    	this.each(function(index, rawAContainer) {

            var divContainer;

            var aContainer = $(rawAContainer);

            if (aContainer.is('a')) {
                // Copy 'a' to a 'div' version
                var adata = aContainer.data();

                divContainer = $('<div></div>', {
                    'class': aContainer.attr('class'),
                    'style': aContainer.attr('style')
                });
                divContainer.data($.extend({'pdf-url': aContainer.attr('href')}, adata));
                aContainer.replaceWith(divContainer);
            }
            else {
                // was a div all along
                divContainer = aContainer;
            }

   		    divContainer.append($('<div></div>', {'class': 'pdfemb-loadingmsg'}).append(document.createTextNode(pdfemb_trans.objectL10n.loading)));

            // Disable right click?

            if (divContainer.data('disablerightclick') == 'on') {
                divContainer.bind("contextmenu", function(e) {
                    e.preventDefault();
                });
            }

            // Load PDF
            var initPdfDoc = function(pdfDoc, showIsSecure) {

                var pagesViewer = new PDFEMB_NS.pdfembPagesViewerUsable(pdfDoc, divContainer, showIsSecure);

                pagesViewer.setup();
            };

	    	var callback = function(pdf, showIsSecure) {

	  	    	  /**
	  	    	   * Asynchronously downloads PDF.
	  	    	   */

                  if (pdf === null) {
                      divContainer.empty().append($('<div></div>', {'class': 'pdfemb-errormsg'}).append(msgnode = $('<span></span>').append(
                          document.createTextNode('Failed to load and decrypt PDF'))));
                      return;
                  }

	  	    	  var loadingTask = pdfjsLib.getDocument(pdf,cmapURL);
                  loadingTask.promise.then(function(pdfDoc_) {
                    // you can now use *pdf* here
                    initPdfDoc(pdfDoc_, showIsSecure)
                  },
                  function(e) {
                      var msgnode = document.createTextNode(e.message);
                          if (e.name == 'UnknownErrorException' && e.message == 'Failed to fetch') {
                                  // "Failed to fetch" - probably cross-domain issue
                              msgnode = $('<span></span>').append(
                                  document.createTextNode(e.message+' '+pdfemb_trans.objectL10n.domainerror+' '))
                                  .append($('<a href="https://wp-pdf.com/kb/error-url-to-the-pdf-file-must-be-on-exactly-the-same-domain-as-the-current-web-page/" target="_blank">'
                                  +pdfemb_trans.objectL10n.clickhereinfo+'</a>'));
                          }
                              divContainer.empty().append($('<div></div>', {'class': 'pdfemb-errormsg'}).append(msgnode));
                          }

                  );

	    	};

            if (divContainer.data('pdfDoc')) {
                initPdfDoc(divContainer.data('pdfDoc'), divContainer.data('showIsSecure'));
            }
            else {
                var url = divContainer.data('pdf-url');
                PDFEMB_NS.pdfembGetPDF(url, callback);
            }
    	});

    	return this;

    };
  
    // Apply plugin to relevant divs
    
    if (pdfemb_trans.cmap_url === "undefined") {
        var cmapURLis = '';
    }else{
      var cmapURLis = pdfemb_trans.cmap_url;
    }
    
	$('.pdfemb-viewer').pdfEmbedder(cmapURLis);
	
});

