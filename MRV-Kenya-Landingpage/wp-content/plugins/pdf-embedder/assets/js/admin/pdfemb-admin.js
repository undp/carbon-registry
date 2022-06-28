(function ($) {
	$(function () {
		function pdfembSetActionToTab(id) {
			var frm = $('#pdfemb_form');
			frm.attr(
				'action',
				frm.attr('action').replace(/(#.+)?$/, '#' + id),
			);
		}
		$('#pdfemb-tabs')
			.find('a')
			.click(function () {
				$('#pdfemb-tabs').find('a').removeClass('nav-tab-active');
				$('.pdfembtab').removeClass('active');
				var id = $(this).attr('id').replace('-tab', '');
				$('#' + id + '-section').addClass('active');
				$(this).addClass('nav-tab-active');

				if ('about' === id) {
					$('.submit').hide();
				} else {
					$('.submit').show();
				}
				// Set submit URL to this tab
				pdfembSetActionToTab(id);
			});

		// Did page load with a tab active?
		var active_tab = window.location.hash.replace('#', '');
		if (active_tab != '') {
			var activeSection = $('#' + active_tab + '-section');
			var activeTab = $('#' + active_tab + '-tab');

			if ('about' === active_tab) {
				$('.submit').hide();
			} else {
				$('.submit').show();
			}
			if (activeSection && activeTab) {
				$('#pdfemb-tabs').find('a').removeClass('nav-tab-active');
				$('.pdfembtab').removeClass('active');

				activeSection.addClass('active');
				activeTab.addClass('nav-tab-active');
				pdfembSetActionToTab(active_tab);
			}
		}

		$('.lionsher-partners').on(
			'click',
			'.lionsher-partners-install',
			function (e) {
				e.preventDefault();
				var $this = $(this);
				var url = $this.data('url');
				var basename = $this.data('basename');
				var message = $(this)
					.parent()
					.parent()
					.find('.lionsher-partner-status');
				var install_opts = {
					url: pdfemb_args.ajax,
					type: 'post',
					async: true,
					cache: false,
					dataType: 'json',
					data: {
						action: 'pdfemb_partners_install',
						nonce: pdfemb_args.install_nonce,
						basename: basename,
						download_url: url,
					},
					success: function (response) {
						$this.text(pdfemb_args.activate)
							.removeClass('lionsher-partners-install')
							.addClass('lionsher-partners-activate');

						$(message).text(pdfemb_args.inactive);
						// Trick here to wrap a span around he last word of the status
						var heading = $(message),
							word_array,
							last_word,
							first_part;

						word_array = heading.html().split(/\s+/); // split on spaces
						last_word = word_array.pop(); // pop the last word
						first_part = word_array.join(' '); // rejoin the first words together

						heading.html(
							[
								first_part,
								' <span>',
								last_word,
								'</span>',
							].join(''),
						);
						// Proc
					},
					error: function (xhr, textStatus, e) {
						console.log(e);
					},
				};
				$.ajax(install_opts);
			},
		);
		$('.lionsher-partners').on(
			'click',
			'.lionsher-partners-activate',
			function (e) {
				e.preventDefault();
				var $this = $(this);
				var url = $this.data('url');
				var basename = $this.data('basename');
				var message = $(this)
					.parent()
					.parent()
					.find('.lionsher-partner-status');
				var activate_opts = {
					url: pdfemb_args.ajax,
					type: 'post',
					async: true,
					cache: false,
					dataType: 'json',
					data: {
						action: 'pdfemb_partners_activate',
						nonce: pdfemb_args.activate_nonce,
						basename: basename,
						download_url: url,
					},
					success: function (response) {
						$this.text(pdfemb_args.deactivate)
							.removeClass('lionsher-partners-activate')
							.addClass('lionsher-partners-deactivate');

						$(message).text(pdfemb_args.active);
						// Trick here to wrap a span around he last word of the status
						var heading = $(message),
							word_array,
							last_word,
							first_part;

						word_array = heading.html().split(/\s+/); // split on spaces
						last_word = word_array.pop(); // pop the last word
						first_part = word_array.join(' '); // rejoin the first words together

						heading.html(
							[
								first_part,
								' <span>',
								last_word,
								'</span>',
							].join(''),
						);
						location.reload(true);
					},
					error: function (xhr, textStatus, e) {
						console.log(e);
					},
				};
				$.ajax(activate_opts);
			},
		);
		$('.lionsher-partners').on(
			'click',
			'.lionsher-partners-deactivate',
			function (e) {
				e.preventDefault();
				var $this = $(this);
				var url = $this.data('url');
				var basename = $this.data('basename');
				var message = $(this)
					.parent()
					.parent()
					.find('.lionsher-partner-status');
				var deactivate_opts = {
					url: pdfemb_args.ajax,
					type: 'post',
					async: true,
					cache: false,
					dataType: 'json',
					data: {
						action: 'pdfemb_partners_deactivate',
						nonce: pdfemb_args.deactivate_nonce,
						basename: basename,
						download_url: url,
					},
					success: function (response) {
						$this.text(pdfemb_args.activate)
							.removeClass('lionsher-partners-deactivate')
							.addClass('lionsher-partners-activate');

						$(message).text(pdfemb_args.inactive);
						// Trick here to wrap a span around he last word of the status
						var heading = $(message),
							word_array,
							last_word,
							first_part;

						word_array = heading.html().split(/\s+/); // split on spaces
						last_word = word_array.pop(); // pop the last word
						first_part = word_array.join(' '); // rejoin the first words together

						heading.html(
							[
								first_part,
								' <span>',
								last_word,
								'</span>',
							].join(''),
						);
						location.reload(true);
					},
					error: function (xhr, textStatus, e) {
						console.log(e);
					},
				};
				$.ajax(deactivate_opts);
			},
		);
	});
})(jQuery);
