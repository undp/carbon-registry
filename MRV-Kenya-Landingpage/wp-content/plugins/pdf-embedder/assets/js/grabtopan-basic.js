
window.pdfembGrabToPan = (function GrabToPanClosure() {
    /**
     * Construct a GrabToPan instance for a given HTML element.
     * @param options.element {Element}
     * @param options.ignoreTarget {function} optional. See `ignoreTarget(node)`
     * @param options.onActiveChanged {function(boolean)} optional. Called
     *  when grab-to-pan is (de)activated. The first argument is a boolean that
     *  shows whether grab-to-pan is activated.
     */
    function GrabToPan(options) {
        this.element = options.element;
        this.document = options.element.ownerDocument;
        if (typeof options.ignoreTarget === 'function') {
            this.ignoreTarget = options.ignoreTarget;
        }
        this.onActiveChanged = options.onActiveChanged;

        // Bind the contexts to ensure that `this` always points to
        // the GrabToPan instance.
        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);
        this.toggle = this.toggle.bind(this);
        this._onmousedown = this._onmousedown.bind(this);
        this._onmousemove = this._onmousemove.bind(this);
        this._onmousewheel = this._onmousewheel.bind(this);
        this._endPan = this._endPan.bind(this);

        // This overlay will be inserted in the document when the mouse moves during
        // a grab operation, to ensure that the cursor has the desired appearance.
        var overlay = this.overlay = document.createElement('div');
        overlay.className = 'grab-to-pan-grabbing';
    }
    GrabToPan.prototype = {
        /**
         * Class name of element which can be grabbed
         */
        CSS_CLASS_GRAB: 'grab-to-pan-grab',

        /**
         * Bind a mousedown event to the element to enable grab-detection.
         */
        activate: function GrabToPan_activate() {
            if (!this.active) {
                this.active = true;
                this.element.addEventListener('mousedown', this._onmousedown, true);

                this.element.addEventListener('mousewheel', this._onmousewheel);
                this.element.addEventListener('wheel', this._onmousewheel);
                this.element.addEventListener('DOMMouseScroll', this._onmousewheel);

                this.element.classList.add(this.CSS_CLASS_GRAB);
                if (this.onActiveChanged) {
                    this.onActiveChanged(true);
                }
            }
        },

        /**
         * Removes all events. Any pending pan session is immediately stopped.
         */
        deactivate: function GrabToPan_deactivate() {
            if (this.active) {
                this.active = false;
                this.element.removeEventListener('mousedown', this._onmousedown, true);
                this._endPan();
                this.element.classList.remove(this.CSS_CLASS_GRAB);
                if (this.onActiveChanged) {
                    this.onActiveChanged(false);
                }
            }
        },

        toggle: function GrabToPan_toggle() {
            if (this.active) {
                this.deactivate();
            } else {
                this.activate();
            }
        },

        /**
         * Whether to not pan if the target element is clicked.
         * Override this method to change the default behaviour.
         *
         * @param node {Element} The target of the event
         * @return {boolean} Whether to not react to the click event.
         */
        ignoreTarget: function GrabToPan_ignoreTarget(node) {
            // Use matchesSelector to check whether the clicked element
            // is (a child of) an input element / link
            return node[matchesSelector](
                'a[href], a[href] *, input, textarea, button, button *, select, option'
            );
        },

        /**
         * @private
         */
        _onmousedown: function GrabToPan__onmousedown(event) {
            if (event.button !== 0 || this.ignoreTarget(event.target)) {
                return;
            }
            if (event.originalTarget) {
                try {
                    /* jshint expr:true */
                    var ottn = event.originalTarget.tagName;
                } catch (e) {
                    // Mozilla-specific: element is a scrollbar (XUL element)
                    return;
                }
            }

            this.scrollLeftStart = this.element.scrollLeft;
            this.scrollTopStart = this.element.scrollTop;
            this.clientXStart = event.clientX;
            this.clientYStart = event.clientY;
            this.document.addEventListener('mousemove', this._onmousemove, true);
            this.document.addEventListener('mouseup', this._endPan, true);
            // When a scroll event occurs before a mousemove, assume that the user
            // dragged a scrollbar (necessary for Opera Presto, Safari and IE)
            // (not needed for Chrome/Firefox)
            this.element.addEventListener('scroll', this._endPan, true);
            event.preventDefault();
            event.stopPropagation();
            this.document.documentElement.classList.add(this.CSS_CLASS_GRABBING);

            var focusedElement = document.activeElement;
            if (focusedElement && !focusedElement.contains(event.target)) {
                focusedElement.blur();
            }
        },

        /**
         * @private
         */
        _onmousemove: function GrabToPan__onmousemove(event) {
            this.element.removeEventListener('scroll', this._endPan, true);
            if (isLeftMouseReleased(event)) {
                this._endPan();
                return;
            }
            var xDiff = event.clientX - this.clientXStart;
            var yDiff = event.clientY - this.clientYStart;
            this.element.scrollTop = this.scrollTopStart - yDiff;
            this.element.scrollLeft = this.scrollLeftStart - xDiff;
            if (!this.overlay.parentNode) {
                document.body.appendChild(this.overlay);
            }
        },

        /**
         * @private
         */
        _onmousewheel: function GrabToPan__onmousewheel(event) {
            this.element.removeEventListener('scroll', this._endPan, true);

            var MOUSE_WHEEL_DELTA_FACTOR = 0.5;

            if (event.deltaMode) {
                // if 0, means measured in pixels
                if (event.deltaMode == 1) { //Measured in lines
                    MOUSE_WHEEL_DELTA_FACTOR = 10;
                }
                if (event.deltaMode == 2) { // Measured in pages
                    MOUSE_WHEEL_DELTA_FACTOR = 1000;
                }
            }

            var ticks = event.deltaY ? -event.deltaY  // 'wheel'
                : ( event.wheelDelta ? event.wheelDelta  // 'mousewheel'
                        : -event.detail // 'DOMMouseScroll'
                );

            this.scrollLeftStart = this.element.scrollLeft;
            this.scrollTopStart = this.element.scrollTop;
            var yDiff = ticks * MOUSE_WHEEL_DELTA_FACTOR;
            this.element.scrollTop = this.scrollTopStart - yDiff;

            if (!this.overlay.parentNode) {
                document.body.appendChild(this.overlay);
            }

            if (this.element.scrollTop != this.scrollTopStart || yDiff == 0) {
                event.preventDefault();
                return false;
            }
        },

        /**
         * @private
         */
        _endPan: function GrabToPan__endPan() {
            this.element.removeEventListener('scroll', this._endPan, true);
            this.document.removeEventListener('mousemove', this._onmousemove, true);
            this.document.removeEventListener('mouseup', this._endPan, true);
            if (this.overlay.parentNode) {
                this.overlay.parentNode.removeChild(this.overlay);
            }
        }
    };

    // Get the correct (vendor-prefixed) name of the matches method.
    var matchesSelector;
    ['webkitM', 'mozM', 'msM', 'oM', 'm'].some(function(prefix) {
        var name = prefix + 'atches';
        if (name in document.documentElement) {
            matchesSelector = name;
        }
        name += 'Selector';
        if (name in document.documentElement) {
            matchesSelector = name;
        }
        return matchesSelector; // If found, then truthy, and [].some() ends.
    });

    // Browser sniffing because it's impossible to feature-detect
    // whether event.which for onmousemove is reliable
    var isNotIEorIsIE10plus = !document.documentMode || document.documentMode > 9;
    var chrome = window.chrome;
    var isChrome15OrOpera15plus = chrome && (chrome.webstore || chrome.app);
    //                                       ^ Chrome 15+       ^ Opera 15+
    var isSafari6plus = /Apple/.test(navigator.vendor) &&
        /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);

    /**
     * Whether the left mouse is not pressed.
     * @param event {MouseEvent}
     * @return {boolean} True if the left mouse button is not pressed.
     *                   False if unsure or if the left mouse button is pressed.
     */
    function isLeftMouseReleased(event) {
        if ('buttons' in event && isNotIEorIsIE10plus) {
            // http://www.w3.org/TR/DOM-Level-3-Events/#events-MouseEvent-buttons
            // Firefox 15+
            // Internet Explorer 10+
            return !(event.buttons | 1);
        }
        if (isChrome15OrOpera15plus || isSafari6plus) {
            // Chrome 14+
            // Opera 15+
            // Safari 6.0+
            return event.which === 0;
        }
    }

    return GrabToPan;
})();
