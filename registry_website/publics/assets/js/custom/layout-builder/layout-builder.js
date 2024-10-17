"use strict";

// Class definition
var KTLayoutBuilder = function() {
	var form = document.querySelector("#kt_layout_builder_form");
	var actionInput = document.querySelector("#kt_layout_builder_action");
	var tabInput = document.querySelector("#kt_layout_builder_tab");	
	var url = form.getAttribute("action");

	var previewButton = document.querySelector("#kt_layout_builder_preview");
	var exportButton = document.querySelector("#kt_layout_builder_export");
	var resetButton = document.querySelector("#kt_layout_builder_reset");

	var handleTab = function() {
		var tabs = [].slice.call(document.querySelectorAll('#kt_layout_builder_tabs a[data-bs-toggle="tab"]'));

		tabs.forEach(function (tab) {
			tab.addEventListener("shown.bs.tab", function (e) {
				tabInput.value = tab.getAttribute("href").substring(1);
			});
		});
	};

	var handlePreview = function() {
		previewButton.addEventListener("click", function(e) {
			e.preventDefault();

			// Set form action value
			actionInput.value = "preview";

			// Show progress
			previewButton.setAttribute("data-kt-indicator", "on");

			// Prepare form data
			var data = $(form).serialize();

			// Submit
			$.ajax({
				type: "POST",
				dataType: "html",
				url: url,
				data: data,
				success: function(response, status, xhr) {
					toastr.success(
						"Preview has been updated with current configured layout.", 
						"Preview updated!", 
						{timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0}
					);

					setTimeout(function() {
						if (history.scrollRestoration) {
							history.scrollRestoration = 'manual';
						}

						location.reload(); // reload page
					}, 1500);
				},
				error: function(response) {
					toastr.error(
						"Please try it again later.", 
						"Something went wrong!", 
						{timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0}
					);
				},
				complete: function() {
					previewButton.removeAttribute("data-kt-indicator");
				}
			});
		});
	};

	var handleExport = function() {
		exportButton.addEventListener("click", function(e) {
			e.preventDefault();

			toastr.success(
				"Process has been started and it may take a while.", 
				"Generating HTML!", 
				{timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0}
			);

			// Show progress
			exportButton.setAttribute("data-kt-indicator", "on");

			// Set form action value
			actionInput.value = "export";
			
			// Prepare form data
			var data = $(form).serialize();

			$.ajax({
				type: "POST",
				dataType: "html",
				url: url,
				data: data,
				success: function(response, status, xhr) {
					var timer = setInterval(function() {
						$("<iframe/>").attr({
							src: url + "?layout-builder[action]=export&download=1&output=" + response,
							style: "visibility:hidden;display:none",
						}).ready(function() {
							// Stop the timer
							clearInterval(timer);

							exportButton.removeAttribute("data-kt-indicator");
						}).appendTo("body");
					}, 3000);
				},
				error: function(response) {
					toastr.error(
						"Please try it again later.", 
						"Something went wrong!", 
						{timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0}
					);

					exportButton.removeAttribute("data-kt-indicator");
				},
			});
		});
	};

	var handleReset = function() {
		resetButton.addEventListener("click", function(e) {
			e.preventDefault();

			// Show progress
			resetButton.setAttribute("data-kt-indicator", "on");

			// Set form action value
			actionInput.value = "reset";
			
			// Prepare form data
			var data = $(form).serialize();

			$.ajax({
				type: "POST",
				dataType: "html",
				url: url,
				data: data,
				success: function(response, status, xhr) {
					toastr.success(
						"Preview has been successfully reset and the page will be reloaded.", 
						"Reset Preview!", 
						{timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0}
					);

					setTimeout(function() {
						if (history.scrollRestoration) {
							history.scrollRestoration = 'manual';
						}
						
						location.reload(); // reload page
					}, 1500);
				},
				error: function(response) {
					toastr.error(
						"Please try it again later.", 
						"Something went wrong!", 
						{timeOut: 0, extendedTimeOut: 0, closeButton: true, closeDuration: 0}
					);
				},
				complete: function() {
					resetButton.removeAttribute("data-kt-indicator");
				},
			});
		});
	};

	var handleThemeMode = function() {
		var checkLight = document.querySelector('#kt_layout_builder_theme_mode_light');
		var checkDark = document.querySelector('#kt_layout_builder_theme_mode_dark');
		var check = document.querySelector('#kt_layout_builder_theme_mode_' + KTThemeMode.getMode());

		if (checkLight) {
			checkLight.addEventListener("click", function() {
				this.checked = true;
				this.closest('[data-kt-buttons="true"]').querySelector('.form-check-image.active').classList.remove('active');
				this.closest('.form-check-image').classList.add('active');
				KTThemeMode.setMode('light');
			});
		}
		
		if (checkDark) {
			checkDark.addEventListener("click", function() {
				this.checked = true;
				this.closest('[data-kt-buttons="true"]').querySelector('.form-check-image.active').classList.remove('active');
				this.closest('.form-check-image').classList.add('active');
				KTThemeMode.setMode('dark');
			});
		}

		if ( check ) {
			check.closest('.form-check-image').classList.add('active');
			check.checked = true;
		}
	}

	return {
		// Public functions
		init: function() {
			handlePreview();
			handleExport();
			handleReset();
			handleTab();
			handleThemeMode();
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTLayoutBuilder.init();
});