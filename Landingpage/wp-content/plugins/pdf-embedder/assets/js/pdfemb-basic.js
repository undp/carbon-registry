jQuery(document).ready(function($) {

    var pdfembPagesViewer = PDFEMB_NS.pdfembPagesViewer;

    var pdfembPagesViewerBasic = function () {
        pdfembPagesViewer.apply(this, arguments);
    };

    pdfembPagesViewerBasic.prototype = new pdfembPagesViewer();

    PDFEMB_NS.pdfembPagesViewerUsable = pdfembPagesViewerBasic;

});

PDFEMB_NS.pdfembGetPDF = function(url, callback) {
	    	
	callback(url, false);

};
