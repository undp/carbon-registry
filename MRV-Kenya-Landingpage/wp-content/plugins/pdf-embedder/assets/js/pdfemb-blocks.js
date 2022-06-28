/*
 * Gutenberg block Javascript code
 */
    var __                = wp.i18n.__; // The __() function for internationalization.
    var createElement     = wp.element.createElement; // The wp.element.createElement() function to create elements.
    var registerBlockType = wp.blocks.registerBlockType; // The registerBlockType() function to register blocks.
	
	
    var make_title_from_url = function(url) {
        var re = RegExp('/([^/]+?)(\\.pdf(\\?[^/]*)?)?$', 'i');
        var matches = url.match(re);
        if (matches.length >= 2) {
            return matches[1];
        }
        return url;
    }
	/**
     * Register block
     *
     * @param  {string}   name     Block name.
     * @param  {Object}   settings Block settings.
     * @return {?WPBlock}          Block itself, if registered successfully,
     *                             otherwise "undefined".
     */
    registerBlockType(
		'pdfemb/pdf-embedder-viewer', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.	
        {
            title: __( 'PDF Embedder' ), // Block title. __() function allows for internationalization.
            icon: 'media-document', // Block icon from Dashicons. https://developer.wordpress.org/resource/dashicons/.
			category: 'common', // Block category. Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
            attributes: {
				pdfID: {
                    type: 'number'
                },
                url: {
                    type: 'string'
                },
                width: {
                    type: 'string'
                },
                height: {
                    type: 'string'
                },
				toolbar: {
                    type: 'string',
                    default: 'bottom'
                },
                toolbarfixed: {
                    type: 'string',
                    default: 'off'
                }
            },

            // Defines the block within the editor.
            edit: function( props ) {
				
				var {attributes , setAttributes, focus, className} = props;
                
				var InspectorControls = wp.editor.InspectorControls;
				var Button = wp.components.Button;
				var RichText = wp.editor.RichText;
				var Editable = wp.blocks.Editable; // Editable component of React.
				var MediaUpload = wp.editor.MediaUpload;
				var btn = wp.components.Button;
				var TextControl = wp.components.TextControl;
				var SelectControl = wp.components.SelectControl;
				var RadioControl = wp.components.RadioControl;
				
				var onSelectPDF = function(media) {
                    return props.setAttributes({
                        url: media.url,
                        pdfID: media.id
                    });
                }

                function onChangeWidth(v) {
                    setAttributes( {width: v} );
                }

                function onChangeHeight(v) {
                    setAttributes( {height: v} );
                }
				
				function onChangeToolbar(v) {
                    setAttributes( {toolbar: v} );
                }

                function onChangeToolbarfixed(v) {
                    setAttributes( {toolbarfixed: v} );
                }
				
				return [
					createElement(
                        MediaUpload,
                        {
                            onSelect: onSelectPDF,
                            type: 'application/pdf',
                            value: attributes.pdfID,
                            render: function(open) {
                                return createElement(btn,{onClick: open.open },
                                    attributes.url ? 'PDF: ' + attributes.url : 'Click here to Open Media Library to select PDF')
                            }
                        }
					),
										
					createElement( InspectorControls, { key: 'inspector' }, // Display the block options in the inspector pancreateElement.
						createElement('div',{ className: 'pdf_div_main'}	,
							createElement(
								'hr',
								{},
							),
							createElement(
								'p',
								{},
								__('Change the Height & Width of the PDF'),
							),
							createElement(
								'hr',
								{},
							),
							createElement(
								'p',
								{},
								__('Enter max or an integer number of pixels.')
							),							
							createElement(
								TextControl,
								{
									label: __('Width'),
									value: attributes.width,
									onChange: onChangeWidth
								}
							),
							createElement(
								TextControl,
								{
									label: __('Height'),
									value: attributes.height,
									onChange: onChangeHeight
								}
							),
							createElement(
								SelectControl,
									{
										label: __('Toolbar Location'),
										value: attributes.toolbar,
										options: [
											{ label: 'Top', value: 'top' },
											{ label: 'Bottom', value: 'bottom' },
											{ label: 'Both', value: 'both' },
											{ label: 'None', value: 'none' }
										],
										onChange: onChangeToolbar
									}
							),
							createElement(
								RadioControl,
								{
									label: __('Toolbar Hover'),
									selected: attributes.toolbarfixed,
									options: [
										{ label: __('Toolbar appears only on hover over document'), value: 'off' },
										{ label: __('Toolbar always visible '), value: 'on' }
									],
									onChange: onChangeToolbarfixed
								}
							),
						),
					),
                ];
            },

            // Defines the saved block.
            save: function( props ) {
				return createElement(
                    'p',
                    {
                        className: props.className,
						key: 'return-key',
                    },props.attributes.content);
			},
        }
    );
