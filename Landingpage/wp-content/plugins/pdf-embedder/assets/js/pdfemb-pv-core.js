;window.PDFEMB_NS = {};

jQuery(document).ready(function($) {

    var PIXEL_RATIO = (function () {
        var ctx = document.createElement("canvas").getContext("2d"),
            dpr = window.devicePixelRatio || 1,
            bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;

        return dpr / bsr;
    })();

    PDFEMB_NS.PIXEL_RATIO = PIXEL_RATIO;

    var CANVAS_MAX_PIXELS = 16777000; // 16777216 is max on iPhone Safari


    createHiDPICanvas = function (w, h, ratio) {
        if (!ratio) {
            ratio = PIXEL_RATIO;
        }
        var can = document.createElement("canvas");
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + "px";
        can.style.height = h + "px";
        can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
        return can;
    };

    var vscrollbarwidth = 0,
        hscrollbarheight = 0;

    (function() {
        // Create the measurement node
        var scrollDiv = document.createElement("div");
        scrollDiv.style.width = '100px';
        scrollDiv.style.height = '100px';
        scrollDiv.style.overflow = 'scroll';
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        document.body.appendChild(scrollDiv);

        // Get the scrollbar width
        vscrollbarwidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        hscrollbarheight = scrollDiv.offsetHeight - scrollDiv.clientHeight;

        // Delete the DIV
        document.body.removeChild(scrollDiv);
    })();

    PDFEMB_NS.vscrollbarwidth = vscrollbarwidth;
    PDFEMB_NS.hscrollbarheight = hscrollbarheight;

    var pdfembPagesViewer = function (pdfDoc, divContainer, showIsSecure) {
        this.pdfDoc = pdfDoc;
        this.divContainer = divContainer;
        this.showIsSecure = showIsSecure;

        this.initialResize = false;
        this.firstPageWidth = 0;
        this.firstPageHeight = 0;
        this.invalidationRound = 1;
        this.currentPageNum = 0;
        this.zoom = 100;
        this.fromZoom = 0;
        this.toZoom = 0;
    };

    pdfembPagesViewer.prototype.setup = function () {
        var self = this;

        var divContainer = this.divContainer;
        var pdfDoc_ = this.pdfDoc;
        var showIsSecure = this.showIsSecure;

        this.numPages = pdfDoc_.numPages;

        var scrollbar = divContainer.data('scrollbar');
        this.vscrollbar = scrollbar == 'both' || scrollbar == 'vertical';
        this.hscrollbar = scrollbar == 'both' || scrollbar == 'horizontal';

        var style = 'overflow-y: ' + (this.vscrollbar ? 'scroll' : 'hidden') + '; ';
        style += 'overflow-x: ' + (this.hscrollbar ? 'scroll' : 'hidden') + '; ';

        divContainer.empty().append(
            $('<div></div>', {'class': 'pdfemb-pagescontainer', 'style': style}));

        divContainer.data('pdfDoc', pdfDoc_);

        var toolbar_location = divContainer.data('toolbar');

        if (toolbar_location == 'top' || toolbar_location == 'both') {
            this.addToolbar(true, divContainer.data('toolbar-fixed') == 'on', showIsSecure);
        }

        if (toolbar_location == 'bottom' || toolbar_location == 'both') {
            this.addToolbar(false, divContainer.data('toolbar-fixed') == 'on', showIsSecure);
        }


        // Annotations layer
        // Set up annotations layer factory

        if (typeof(PDFEMB_NS.pdfembPremiumAnnotationsLayerFactory) != 'undefined') {
            self.annotationsLayerFactory = new PDFEMB_NS.pdfembPremiumAnnotationsLayerFactory();
        }
        else {
            self.annotationsLayerFactory = {
                createAnnotationsLayerBuilder: function (pageDiv, pdfPage) {
                    return null;
                }
            }
        }
        self.annotationLayerFactories = Array();

        // Text Layer

        if (typeof(PDFEMB_NS.pdfembPremiumTextLayerFactory) != 'undefined') {
            self.textLayerFactory = new PDFEMB_NS.pdfembPremiumTextLayerFactory();
        }
        else {
            self.textLayerFactory = {
                createTextLayerBuilder: function (pageDiv, pdfPage) {
                    return null;
                }
            }
        }
        self.textLayerFactories = Array();

        // React to page jump event

        divContainer.on('pdfembGotopage', function (e, pageNum) {
            if (pageNum > this.numPages || pageNum <= 0) {
                return;
            }

            self.gotoPage(pageNum);
            self.jumpToTop();

        });

        divContainer.on('pdfembGotoHash', function (e, destobj) {
            if (!destobj.dest) {
                return;
            }
            dest = destobj.dest;

            var destinationPromise;
            if (typeof dest === 'string') {
                destString = dest;
                destinationPromise = self.pdfDoc.getDestination(dest);
            } else {
                destinationPromise = Promise.resolve(dest);
            }
            destinationPromise.then(function (destination) {

                if (!(destination instanceof Array) || destination.length < 1) {
                    return; // invalid destination
                }

                self.pdfDoc.getPageIndex(destination[0]).then(function (pageIndex) {
                    var pageNum = pageIndex + 1;

                    if (pageNum > self.numPages || pageNum <= 0 || self.currentPageNum == pageNum) {
                        return;
                    }

                    self.gotoPage(pageNum)
                    self.jumpToTop();
                });

            });
        });

        divContainer.on('pdfembGotoAction', function (e, action) {
            var curPage = self.currentPageNum;
            var newPage = curPage;
            switch (action) {
                case 'GoBack':
                    --newPage;
                    break;

                case 'GoForward':
                    ++newPage;
                    break;

                case 'NextPage':
                    ++newPage;
                    break;

                case 'PrevPage':
                    --newPage;
                    break;

                case 'LastPage':
                    newPage = self.pageCount;
                    break;

                case 'FirstPage':
                    newPage = 1;
                    break;

                default:
                    break; // No action according to spec
            }

            if (newPage == curPage || newPage > self.pageCount || newPage <= 0) {
                return;
            }

            self.gotoPage(newPage);

        });

        divContainer.on('pdfembMagnify', function (event) {
            self.magnifyEvent(event);
        });

        divContainer.on('pdfembChangeZoom', function (event, amt) {
            self.changeZoom(amt);
        });


        // Initial/first page rendering

        this.pageCount = pdfDoc_.numPages;

        if (!divContainer.data('pagenum') || divContainer.data('pagenum') < 1 || divContainer.data('pagenum') > this.pageCount) {
            divContainer.data('pagenum', 1);
        }

        divContainer.data('showIsSecure', this.showIsSecure);
        divContainer.data('pageNumPending', null);

        var startZoom = divContainer.data('fullScreen') == 'on' ? parseInt(divContainer.data('startfpzoom')) : parseInt(divContainer.data('startzoom'));
        if (isNaN(startZoom) || startZoom < 20 || startZoom > 800) {
            startZoom = 100;
        }
        this.zoom = startZoom;
        if (startZoom != 100) {
            divContainer.find('span.pdfemb-zoom').text(startZoom + '%');
        }

        divContainer.find('span.pdfemb-page-count').text(this.pageCount);

        this.gotoPage(divContainer.data('pagenum'));

    };

    pdfembPagesViewer.prototype.checkForResize = function () {
        var self = this;
        var divContainer = self.divContainer;
        var newheight = $(window).height();
        var newwidth = $(window).width();

        var oldheight = divContainer.data('checked-window-height');
        var oldwidth = divContainer.data('checked-window-width');

        if (!oldheight || !oldwidth) {
            divContainer.data('checked-window-height', newheight);
            divContainer.data('checked-window-width', newwidth);
        }

        if (oldheight != newheight || oldwidth != newwidth) {
            self.resizeViewer();
            self.resizeInnerDivs();
            self.invalidateAllPages();
            self.renderPage(this.currentPageNum);
            self.prerenderNearbyPages(this.currentPageNum);
            self.pdfembMakeMobile();

            divContainer.data('checked-window-height', newheight);
            divContainer.data('checked-window-width', newwidth);
        }

        if (divContainer.data('fullScreenClosed') != 'true') {
            setTimeout(function () {
                self.checkForResize();
            }, 100);
        }
    };

    pdfembPagesViewer.prototype.setSizesBasedOnPage = function (page) {
        var vp = page.getViewport(1.0); // scale = 1.0

        this.pageWidth = vp.width;
        this.pageHeight = vp.height;

        if (this.pageWidth <= 0 || this.pageHeight <= 0) {
            this.divContainer.empty().append(document.createTextNode(pdfemb_trans.objectL10n.widthheightinvalid));
            return;
        }
    };

    pdfembPagesViewer.prototype.createPageInnerDivs = function () {
        var self = this;
        var pagesContainer = this.divContainer.find('.pdfemb-pagescontainer');

        for (var i = 1; i <= this.pageCount; ++i) {
            var innerdiv = pagesContainer.find('.pdfemb-inner-div.pdfemb-page' + i);
            if (innerdiv.length == 0) {
                innerdiv = $('<div></div>', {'class': 'pdfemb-inner-div pdfemb-page' + i});
                innerdiv.data('pageNum', i);
                pagesContainer.append(innerdiv);
            }
        }

        self.resizeInnerDivs();
    };

    pdfembPagesViewer.prototype.addGrabToPan = function () {
        var self = this;
        var divContainer = self.divContainer;
        var jpagesContainer = divContainer.find('div.pdfemb-pagescontainer');

        var grabtopan = new pdfembGrabToPan({
            element: jpagesContainer[0]
        });
        divContainer.data('grabtopan', grabtopan);

        jpagesContainer.on('scroll', function (e) {
            var pn = self.getTopVisiblePageNum();
            if (pn != self.currentPageNum) {
                self.currentPageNum = pn;
                self.updatePageNumDisplay(pn);
                self.renderPage(pn, false);
                self.prerenderNearbyPages(pn);
                self.deallocateFarAwayPages(pn);
            }
            e.stopPropagation();
        });

        $(window).resize(function () {
            setTimeout(function () {
                self.checkForResize();
            }, 100);
        });
    };

    pdfembPagesViewer.prototype.resizeInnerDivs = function (pageNum) {
        var self = this;
        var wantCanvasWidth = self.wantCanvasWidth,
            wantCanvasHeight = self.wantCanvasHeight,
            wantHeight = self.wantHeight;

        var pagesContainer = this.divContainer.find('.pdfemb-pagescontainer');

        var innerdivs = pagesContainer.find('.pdfemb-inner-div');

        if (pageNum) {
            innerdivs = innerdivs.filter('.pdfemb-page'+pageNum);
        }

        var totalheight = 0;

        innerdivs.each(function(i,elt) {

            var e = $(elt);

            var widthfactor = e.data('widthfactor'),
                heightfactor = e.data('heightfactor');

            if (!widthfactor) {
                widthfactor = 1;
            }
            if (!heightfactor) {
                heightfactor = 1;
            }

            e.data('invalidation-round', this.invalidationRound - 1);

            e.css('width', wantCanvasWidth * widthfactor);

            var height = wantCanvasHeight * heightfactor
                + (pageNum == self.numPages || (!pageNum && i == innerdivs.length-1) ? 0 : 2);
            e.css('height', height);

            totalheight += height;

            var canvas = e.find('.pdfemb-the-canvas');

            canvas.css('width', wantCanvasWidth * widthfactor);
            canvas.css('height', wantCanvasHeight * heightfactor);
        });

        var VMargin = 0;
        if (!pageNum && totalheight < wantHeight) {
            VMargin = (wantHeight - totalheight) / 2;
        }
        innerdivs.first().css('top', VMargin);
    };

    pdfembPagesViewer.prototype.invalidateAllPages = function () {
        ++this.invalidationRound;
    };

    pdfembPagesViewer.prototype.prerenderNearbyPages = function (pageNum) {
        var pagedelta_forward = 3, pagedelta_backward = 2;

        if (this.zoom < 100) {
            pagedelta_forward *= Math.min(Math.ceil(100 / this.zoom), 10);
            pagedelta_backward *= Math.min(Math.ceil(100 / this.zoom), 10);
        }

        for (var pn = Math.max(1, pageNum - pagedelta_backward); pn <= Math.min(pageNum + pagedelta_forward, this.numPages); ++pn) {
            if (pn != pageNum) {
                this.renderPage(pn, false);
            }
        }
    };

    pdfembPagesViewer.prototype.deallocateFarAwayPages = function (pageNum) {
        var pagedelta_forward = 2, pagedelta_backward = 2;

        if (this.zoom < 100) {
            var extra_pages = Math.min(Math.ceil(100 / this.zoom), 50);
            pagedelta_forward += extra_pages;
            pagedelta_backward += extra_pages;
        }

        var removeCanvas = function(pn) {
            var pageInnerDiv = pagesContainer.find('.pdfemb-page' + pn);
            var canvas = pageInnerDiv.find('.pdfemb-the-canvas');
            if (canvas.length) {
                canvas.width = 1;
                canvas.height = 1;
                // const ctx = canvas.getContext('2d');
                // ctx && ctx.clearRect(0, 0, 1, 1);
                canvas.remove();
                pageInnerDiv.data('invalidation-round', 0);
            }
        };

        var pagesContainer = this.divContainer.find('div.pdfemb-pagescontainer');
        var pn;

        for (pn = 3; pn < pageNum - pagedelta_backward; ++pn) {
            removeCanvas(pn);
        }

        for (pn = pageNum + pagedelta_forward; pn < this.numPages; ++pn) {
            removeCanvas(pn);
        }
    };

    pdfembPagesViewer.prototype.resizeViewer = function () {
        var self = this;
        var pageWidth = self.pageWidth,
            pageHeight = self.pageHeight,
            divContainer = self.divContainer;

        var pagesContainer = divContainer.find('div.pdfemb-pagescontainer');

        var oldScrollLeft = pagesContainer[0].scrollLeft;
        var oldScrollTop = pagesContainer[0].scrollTop;

        // Max out at parent container width
        var parentWidth = divContainer.parent().width();

        var wantWidth = pageWidth;

        if (divContainer.data('width') == 'max') {
            wantWidth = parentWidth;
        }
        else if (divContainer.data('width') == 'auto') {
            wantWidth = pageWidth;
        }
        else {
            wantWidth = parseInt(divContainer.data('width'), 10);
            if (isNaN(wantWidth) || wantWidth <= 0) {
                wantWidth = parentWidth;
            }
        }

        if (wantWidth <= 0) {
            wantWidth = pageWidth;
        }

        // Always max at the parent container width
        if (wantWidth > parentWidth && parentWidth > 0) {
            wantWidth = parentWidth;
        }

        var wantHeight = pageHeight * wantWidth / pageWidth;

        var wantMobile = self.pdfembWantMobile(wantWidth, userHeight);

        self.wantMobile = wantMobile;

        var fixedToolbars = divContainer.find('div.pdfemb-toolbar-fixed');

        var actualFixedToolbars = wantMobile ? 0 : fixedToolbars.length;

        // Height can be overridden by user
        var userHeight = parseInt(divContainer.data('height'), 10);
        if (isNaN(userHeight) || userHeight <= 0 || userHeight > wantHeight) {
            if (divContainer.data('height') == "auto") { // Mainly for full screen mode
                userHeight = divContainer.parent().height() - actualFixedToolbars * fixedToolbars.height();
            }
            else { // max
                userHeight = wantHeight;
            }
        }

        self.userHeight = userHeight;

        wantWidth = Math.floor(wantWidth);
        wantHeight = Math.floor(wantHeight);


        var zoom = 100;

        var wantCanvasWidth = wantWidth - (self.vscrollbar ? vscrollbarwidth : 0);
        var wantCanvasHeight = wantHeight - (self.hscrollbar ? hscrollbarheight : 0);

        var reducefactor = 1;

        if (!wantMobile) {

            zoom = self.zoom;

            wantCanvasWidth = wantCanvasWidth * zoom / 100;
            wantCanvasHeight = wantCanvasHeight * zoom / 100;


            // Check canvas won't be too big
            if (wantCanvasWidth*wantCanvasHeight*PIXEL_RATIO*PIXEL_RATIO > CANVAS_MAX_PIXELS) {
                reducefactor = CANVAS_MAX_PIXELS / (wantCanvasWidth*wantCanvasHeight*PIXEL_RATIO*PIXEL_RATIO);
            }

        }

        // Set values

        if (wantWidth != divContainer.width()) {
            divContainer.width(wantWidth);
        }

        if (divContainer.height() != userHeight) {
            divContainer.height(userHeight + actualFixedToolbars * fixedToolbars.height());
        }

        pagesContainer.width(wantWidth);
        pagesContainer.height(userHeight);

        var fixedTopToolbars = fixedToolbars.filter('.pdfemb-toolbar-top');
        if (actualFixedToolbars > 0) {
            pagesContainer.css('top', fixedTopToolbars.height());
        }

        var canvasscale = ( wantWidth - (self.vscrollbar ? vscrollbarwidth : 0) ) / pageWidth;

        if (self.fromZoom != 0 && self.toZoom != 0) {

            var oldMidX = oldScrollLeft + self.pccentreLeft;
            var oldMidY = oldScrollTop + self.pccentreTop;

            pagesContainer[0].scrollLeft = (oldScrollLeft + self.pccentreLeft ) * (self.toZoom / self.fromZoom) - self.pccentreLeft;
            pagesContainer[0].scrollTop = (oldScrollTop + self.pccentreTop) * (self.toZoom / self.fromZoom) - self.pccentreTop;
        }

        self.fromZoom = 0;
        self.toZoom = 0;

        self.wantCanvasWidth = wantCanvasWidth;
        self.wantCanvasHeight = wantCanvasHeight;
        self.reducefactor = reducefactor;

        self.wantWidth = wantWidth;
        self.wantHeight = wantHeight;
        self.canvasscale = canvasscale;
        self.zoom = zoom;
    };

    pdfembPagesViewer.prototype.getTopVisiblePageNum = function () {
        var pagesContainer = this.divContainer.find('.pdfemb-pagescontainer');
        var innerdivs = pagesContainer.find('.pdfemb-inner-div:visible');

        if (innerdivs.length > 0) {
            return innerdivs.first().data('pageNum');
        }
        return 1;
    };

    pdfembPagesViewer.prototype.gotoPage = function (pageNum) {
        if (pageNum <= 0 || pageNum > this.pageCount) {
            return;
        }
        this.renderPage(pageNum, true);
        this.currentPageNum = pageNum;
        this.updatePageNumDisplay(pageNum);
        this.prerenderNearbyPages(pageNum);
        this.deallocateFarAwayPages(pageNum);

    };

    pdfembPagesViewer.prototype.updatePageNumDisplay = function (pageNum) {
        var divContainer = this.divContainer;
        // Update page counters
        divContainer.find('div.pdfemb-toolbar .pdfemb-page-num').each(function (i, pageNumDisplay) {
            var jpageNumDisplay = $(pageNumDisplay);
            if (jpageNumDisplay.is('span')) {
                // Normal span area
                jpageNumDisplay.text(pageNum);
            } else {
                // User-changeable text
                jpageNumDisplay.val(pageNum);
            }
        });

        // Enable or disable next/prev buttons
        if (pageNum < this.pageCount) {
            divContainer.find('.pdfemb-next').removeAttr('disabled').removeClass('pdfemb-btndisabled');
        }
        else {
            divContainer.find('.pdfemb-next').attr('disabled', 'disabled').addClass('pdfemb-btndisabled');
        }

        if (pageNum > 1) {
            divContainer.find('.pdfemb-prev').removeAttr('disabled').removeClass('pdfemb-btndisabled');
        }
        else {
            divContainer.find('.pdfemb-prev').attr('disabled', 'disabled').addClass('pdfemb-btndisabled');
        }

    };

    pdfembPagesViewer.prototype.scrollPageIntoView = function (pageNum) {
        var pagesContainer = this.divContainer.find('.pdfemb-pagescontainer');

        var innerdiv = pagesContainer.find('.pdfemb-page' + pageNum);

        pagesContainer.find('.pdfemb-inner-div').not('.pdfemb-page' + pageNum).hide();

        innerdiv.show();
        pagesContainer[0].scrollTop = 0;
    };

    pdfembPagesViewer.prototype.renderPage = function (pageNum, scrollIntoView) {
        var self = this;

        var myInvalidationRound = self.invalidationRound;

        var divContainer = this.divContainer;

        // Using promise to fetch the page
        var pdfDoc = divContainer.data('pdfDoc');

        var pagesContainer = divContainer.find('.pdfemb-pagescontainer');
        var innerdiv = pagesContainer.find('.pdfemb-page' + pageNum);

        if (innerdiv.length && innerdiv.data('invalidation-round') >= myInvalidationRound) {
            if (scrollIntoView) {
                self.scrollPageIntoView(pageNum);
            }
            return;
        }

        var pendingInvalidationRound = innerdiv.data('pending-drawing-round');

        if (pendingInvalidationRound >= myInvalidationRound) {
            // Already being drawn
            return;
        }
        else if (pendingInvalidationRound > 0 && pendingInvalidationRound < myInvalidationRound) {
            innerdiv.data('pending-drawing-round', myInvalidationRound);
            // Queue up this rendering - but we can't do it right now.
            return;
        }

        innerdiv.data('pending-drawing-round', myInvalidationRound);

        pdfDoc.getPage(pageNum).then(function (page) {

            if (!self.initialResize) {
                self.initialResize = true;

                self.setSizesBasedOnPage(page);

                self.resizeViewer();

                self.createPageInnerDivs();

                self.addGrabToPan();

                self.pdfembMakeMobile();
            }

            // Lookup again if only just created
            if (innerdiv.length == 0) {
                innerdiv = pagesContainer.find('.pdfemb-page' + pageNum);
            }

            // Is this page the same size/shape as the first?

            var widthfactor = innerdiv.data('widthfactor'),
                heightfactor = innerdiv.data('heightfactor');

            if (!widthfactor || !heightfactor) {
                // calculate factors
                var vp = page.getViewport(1.0); // scale = 1.0

                widthfactor = vp.width / self.pageWidth;
                heightfactor = vp.height / self.pageHeight;

                innerdiv.data('widthfactor', widthfactor);
                innerdiv.data('heightfactor', heightfactor);

                if (widthfactor != 1 || heightfactor != 1) {
                    self.resizeInnerDivs(pageNum);
                }
            }

            var canvas = innerdiv.find('.pdfemb-the-canvas');
            if (canvas.length == 0) {
                canvas = $('<canvas></canvas>', {'class': 'pdfemb-the-canvas'});
                innerdiv.append(canvas);
            }

            if (scrollIntoView) {
                self.scrollPageIntoView(pageNum);
            }

            var canvasImg = null;
            var canvasCxt = null;
            var oldCanvasWidth = null;
            var oldCanvasHeight = null;

            var wantCanvasWidth = self.wantCanvasWidth,
                wantCanvasHeight = self.wantCanvasHeight,
                canvasscale = self.canvasscale,
                zoom = self.zoom;

            canvas.css('width', wantCanvasWidth * widthfactor);
            canvas.css('height', wantCanvasHeight * heightfactor);

            if (self.wantMobile) {
                divContainer.data('grabtopan').deactivate();
            }
            else {
                divContainer.data('grabtopan').activate();
            }

            // Render PDF page into canvas context
            var viewport = page.getViewport(canvasscale * zoom / 100);

            // if ( typeof offscreenCanvas !== 'undefined' ) {
            //     releaseCanvas( offscreenCanvas );
            // }
            var offscreenCanvas = document.createElement('canvas');
            offscreenCanvas.width = wantCanvasWidth * PIXEL_RATIO * self.reducefactor * widthfactor;
            offscreenCanvas.height = wantCanvasHeight * PIXEL_RATIO * self.reducefactor * heightfactor;

            var ctx = offscreenCanvas.getContext('2d'); /* memory exceeded Total canvas memory use exceeds the maximum limit (224 MB).
            drawCallback — pdfemb-pv-core-4.6.2.js:776 */
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport,
                transform: [PIXEL_RATIO * self.reducefactor, 0, 0, PIXEL_RATIO * self.reducefactor, 0, 0]
            };

            // No longer set transform on ctx explicitly
            // ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
            // This was not always being picked up first time on some browsers - set via renderContext instead above

            var renderTask = page.render(renderContext);

            var drawCallback = function () {

                canvas[0].width = wantCanvasWidth * PIXEL_RATIO * self.reducefactor * widthfactor;
                canvas[0].height = wantCanvasHeight * PIXEL_RATIO * self.reducefactor * heightfactor;

                // Render any watermark to off-screen image
                self.preRenderCanvas(ctx, pageNum, zoom);

                // Copy from off screen canvas
                var image = ctx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
                canvas[0].getContext('2d').putImageData(image, 0, 0);  /* memory exceeded Total canvas memory use exceeds the maximum limit (224 MB).
                drawCallback — pdfemb-pv-core-4.6.2.js:776 */


                // Do annotations layer
                var annotationLayer = null;
                if (typeof self.annotationLayerFactories[pageNum] == 'undefined') {
                    annotationLayer = self.annotationsLayerFactory.createAnnotationsLayerBuilder(innerdiv[0], page);
                    self.annotationLayerFactories[pageNum] = annotationLayer;
                }
                else {
                    annotationLayer = self.annotationLayerFactories[pageNum];
                }

                if (annotationLayer != null) {
                    annotationLayer.setupAnnotations(viewport, self.divContainer.data('newwindow'));
                }

                // End annotations layer


                // Do Text Layer

                var textLayer = null;
                if (typeof self.textLayerFactories[pageNum] == 'undefined') {
                    textLayer = self.textLayerFactory.createTextLayerBuilder(innerdiv[0], page);
                    self.textLayerFactories[pageNum] = textLayer;
                }
                else {
                    textLayer = self.textLayerFactories[pageNum];
                }

                if (textLayer != null) {
                    textLayer.setupText(viewport);
                }
                // End Text Layer


                innerdiv.data('invalidation-round', myInvalidationRound);

                pendingInvalidationRound = innerdiv.data('pending-drawing-round');

                innerdiv.data('pending-drawing-round', '');

                if (pendingInvalidationRound > myInvalidationRound) {
                    self.renderPage(pageNum, false);
                }



            }



            // Wait for rendering to finish
            renderTask.promise.then( function(){
                if ('requestAnimationFrame' in window) {
                    window.requestAnimationFrame(drawCallback);
                    // releaseCanvas(canvas);
                }
                else {
                    setTimeout(drawCallback, 1);
                    // releaseCanvas(canvas);
                }
            });

            function releaseCanvas(canvas) {
                canvas.width = 1;
                canvas.height = 1;
                const ctx = canvas.getContext('2d');
                ctx && ctx.clearRect(0, 0, 1, 1);
            }


        });

    };

    pdfembPagesViewer.prototype.changeZoom = function (zoomdelta) {
        var self = this;
        var divContainer = self.divContainer;

        var oldzoom = self.zoom;
        var newzoom = oldzoom + zoomdelta;
        self.zoom = newzoom;
        divContainer.find('span.pdfemb-zoom').text(newzoom + '%');

        self.fromZoom = oldzoom;
        self.toZoom = newzoom;

        var pagesContainer = divContainer.find('.pdfemb-pagescontainer');
        self.pccentreLeft = pagesContainer.width()/2;
        self.pccentreTop = pagesContainer.height()/2;

        self.resizeViewer();
        self.resizeInnerDivs();
        self.invalidateAllPages();
        self.renderPage(self.currentPageNum);

        // Ensure top-left remains where it was

        /*var pagesContainer = divContainer.find('.pdfemb-pagescontainer');

         var cscrolltop = pagesContainer[0].scrollTop;
         pagesContainer[0].scrollTop = cscrolltop * newzoom / oldzoom;

         var cscrollleft = pagesContainer[0].scrollLeft;
         pagesContainer[0].scrollLeft = cscrollleft * newzoom / oldzoom; */


        self.prerenderNearbyPages(self.currentPageNum);
    };

    pdfembPagesViewer.prototype.queueRenderPage = function (num, noredraw) {
        var divContainer = this.divContainer;
        this.renderPage(num, noredraw);

        /*if (divContainer.data('pageRendering')) {
         divContainer.data('pageNumPending', num);
         } else {
         this.renderPage(num, noredraw);
         }*/
    };

    pdfembPagesViewer.prototype.addToolbar = function (atTop, fixed, showIsSecure) {
        var divContainer = this.divContainer;
        var self = this;

        var toolbar = $('<div></div>', {'class': 'pdfemb-toolbar pdfemb-toolbar' + (fixed ? '-fixed' : '-hover') + ' ' + (atTop ? ' pdfemb-toolbar-top' : 'pdfemb-toolbar-bottom')});
        var prevbtn = $('<button class="pdfemb-prev" title="' + pdfemb_trans.objectL10n.prev + '" type="button"></button>');
        toolbar.append(prevbtn);
        var nextbtn = $('<button class="pdfemb-next" title="' + pdfemb_trans.objectL10n.next + '" type="button"></button>');
        toolbar.append(nextbtn);

        toolbar.append($('<div class="pdfemb-page-area">' + pdfemb_trans.objectL10n.page + ' <span class="pdfemb-page-num">0</span> / <span class="pdfemb-page-count"></span></div>'));

        var zoomoutbtn = $('<button class="pdfemb-zoomout" title="' + pdfemb_trans.objectL10n.zoomout + '" type="button"></button>');
        toolbar.append(zoomoutbtn);

        var zoominbtn = $('<button class="pdfemb-zoomin" title="' + pdfemb_trans.objectL10n.zoomin + '" type="button"></button>');
        toolbar.append(zoominbtn);

        toolbar.append($('<div>' + pdfemb_trans.objectL10n.zoom + ' <span class="pdfemb-zoom">100%</span></div>'));

        if (showIsSecure) {
            toolbar.append($('<div>' + pdfemb_trans.objectL10n.secure + '</div>'));
        }

        if (atTop) {
            divContainer.prepend(toolbar);
        }
        else {
            divContainer.append(toolbar);
        }

        // Add button functions
        prevbtn.on('click', function (e) {
            if (self.currentPageNum <= 1) {
                return;
            }

            self.gotoPage(self.currentPageNum - 1);
            self.jumpToTop();
        });

        nextbtn.on('click', function (e) {
            if (self.currentPageNum >= self.pageCount || self.currentPageNum == 0) {
                return;
            }
            self.gotoPage(self.currentPageNum + 1);

            self.jumpToTop();
        });

        zoominbtn.on('click', function (e) {
            if (self.zoom >= 800) {
                return;
            }
            self.changeZoom(10);
        });

        zoomoutbtn.on('click', function (e) {
            if (self.zoom <= 20) {
                return;
            }
            self.changeZoom(-10);
        });


        self.addMoreToolbar(toolbar);

        if (!fixed) {

            divContainer.on('mouseenter', function (e) {
                var htoolbar = divContainer.find('div.pdfemb-toolbar-hover');
                if (htoolbar.data('no-hover') !== true) {
                    htoolbar.show();
                }
            });

            divContainer.on('mouseleave',
                function (e) {
                    var htoolbar = divContainer.find('div.pdfemb-toolbar-hover');
                    htoolbar.hide();
                }
            );

            divContainer.on('pdfembTouchTapped', function (e) {
                e.stopPropagation();
                e.preventDefault();

                // We seem to receive two tap events in quick succession, so toggle doesn't work
                // - it just gets cancelled immediately.
                // So set a timed lock on allowing the toggle.
                if (self.locktaps) {
                    return;
                }
                self.locktaps = true;

                var htoolbar = divContainer.find('div.pdfemb-toolbar-hover');

                var wanthide = htoolbar.is(':visible');

                if (htoolbar.data('no-hover') == true) {
                    wanthide = true;
                }

                if (wanthide) {
                    htoolbar.hide();
                }
                else {
                    htoolbar.show();
                }

                setTimeout(function() {
                    // Release lock
                    self.locktaps = false;
                }, 250);

            });

        }

        // Powered by
        //console.log("Hello pdf embedder",pdfemb_trans.poweredby);
        if (pdfemb_trans.poweredby == "on") {
            toolbar.append($('<div></div>', {'class': 'pdfemb-poweredby'}).append($('<a href="https://wp-pdf.com/?utm_source=Poweredby&utm_medium=freemium&utm_campaign=Freemium" target="_blank">wp-pdf.com</a>')));
        }
    };

    pdfembPagesViewer.prototype.magnifyEvent = function (event) {
        //var gtpe = $(event.originalEvent.gtpelement);
        //var divContainer = gtpe.closest('.pdfemb-viewer');
        var mag = event.originalEvent.magnification;

        if (mag == -1) {
            // End of touch
            this.resizeViewer();
            this.resizeInnerDivs();
            this.invalidateAllPages();
            this.renderPage(this.getTopVisiblePageNum());
        }
        else {
            var offset = this.divContainer.find('.pdfemb-pagescontainer').offset();
            this.magnifyZoom(mag, event.originalEvent.centreLeft - offset.left, event.originalEvent.centreTop - offset.top);
        }
    };

    pdfembPagesViewer.prototype.magnifyZoom = function (magnification, centreLeft, centreTop) {
        var oldzoom = this.zoom;
        var newzoom = Math.floor(oldzoom * magnification);

        if (newzoom < 20) {
            newzoom = 20;
        }
        if (newzoom > 800) {
            newzoom = 800;
        }
        this.zoom = newzoom;
        this.divContainer.find('span.pdfemb-zoom').text(newzoom + '%');

        this.fromZoom = oldzoom;
        this.toZoom = newzoom;

        this.pccentreLeft = centreLeft;
        this.pccentreTop = centreTop;

        this.resizeViewer();

        this.resizeInnerDivs();
        this.invalidateAllPages();

    };

    pdfembPagesViewer.prototype.pdfembWantMobile = function(wantWidth, wantHeight) {
        return false;
    }

    pdfembPagesViewer.prototype.pdfembMakeMobile = function() {
    };

    pdfembPagesViewer.prototype.addMoreToolbar = function(toolbar) {
    };

    pdfembPagesViewer.prototype.jumpToTop = function() {
    };

    pdfembPagesViewer.prototype.preRenderCanvas = function(ctx, pageNum, zoom) {
    };

    PDFEMB_NS.pdfembPagesViewer = pdfembPagesViewer;

});
