"use strict";

// Class definition
var KTCreateAccount = function () {
	// Elements
	var modal;	
	var modalEl;

	var stepper;
	var form;
	var formSubmitButton;
	var formContinueButton;
	var formPreviewButton;

	// Variables
	var stepperObj;
	var validations = [];

	// Private Functions
	var initStepper = function () {
		// Initialize Stepper
		stepperObj = new KTStepper(stepper);

		// Stepper change event
		stepperObj.on('kt.stepper.changed', function (stepper) {
			if (stepperObj.getCurrentStepIndex() === 2) {
				formSubmitButton.classList.remove('d-none');
				formSubmitButton.classList.add('d-inline-block');
				formContinueButton.classList.add('d-none');
			} else if (stepperObj.getCurrentStepIndex() === 3) {
				formSubmitButton.classList.add('d-none');
				formContinueButton.classList.add('d-none');
				formPreviewButton.classList.add('d-none');
			} else {
				formSubmitButton.classList.remove('d-inline-block');
				formSubmitButton.classList.remove('d-none');
				formContinueButton.classList.remove('d-none');
			}
		});

		// Validation before going to next page
		stepperObj.on('kt.stepper.next', function (stepper) {
			console.log('stepper.next');

			// Validate form before change stepper step
			console.log(stepper.getCurrentStepIndex())
			var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for currnt step

			if (validator) {
				validator.validate().then(function (status) {
					console.log('validated!');

					if (status == 'Valid') {
						stepper.goNext();

						KTUtil.scrollTop();
					} else {
						Swal.fire({
							text: "Désolé, il semble y avoir des erreurs détectées, veuillez réessayer",
							icon: "error",
							buttonsStyling: false,
							confirmButtonText: "Ok, compris!",
							customClass: {
								confirmButton: "btn btn-light"
							}
						}).then(function () {
							KTUtil.scrollTop();
						});
					}
				});
			} else {
				stepper.goNext();

				KTUtil.scrollTop();
			}
		});

		// Prev event
		stepperObj.on('kt.stepper.previous', function (stepper) {
			console.log('stepper.previous');

			stepper.goPrevious();
			KTUtil.scrollTop();
		});
	}

	var handleForm = function() {
		formSubmitButton.addEventListener('click', function (e) {
			// Validate form before change stepper step
			var validator = validations[1]; // get validator for last form

			validator.validate().then(function (status) {
				console.log('validated!');

				if (status == 'Valid') {
					// Prevent default button action
					e.preventDefault();
					setTimeout(function() {
					// Disable button to avoid multiple click 
					formSubmitButton.disabled = true;

					// Show loading indication
					formSubmitButton.setAttribute('data-kt-indicator', 'on');

					// Simulate form submission
				
				
						const formData = new FormData();
						
						const fileInput1 =form.querySelector('[name="avatar"]');
						const fileInput2 = form.querySelector('[name="struct_fiscal"]');
						const fileInput3 = form.querySelector('[name="struct_dfe"]');
						const fileInput4 =	form.querySelector('[name="note_idee"]');
						const fileInput5 = form.querySelector('[name="doc_conformite"]');
						// const fileInput6= form.querySelector('[name="note_option"]');
						formData.append('logo', fileInput1.files[0]);
						if(fileInput2.files[0]){
							formData.append('fiscal', fileInput2.files[0]);
						}
						

						formData.append('registre', fileInput3.files[0]);
						formData.append('note', fileInput4.files[0]);
						formData.append('conformite',fileInput5.files[0]);
						// formData.append('justif', fileInput6.files[0]);
						
						formData.append('Denomination_organisation', form.querySelector('[name="struct_name"]').value);
						formData.append('Site_web_organisation', form.querySelector('[name="struct_site"]').value);
						formData.append('Email_organisation', form.querySelector('[name="struct_email"]').value);
						formData.append('Numero_tel_organisation', form.querySelector('[name="struct_tel"]').value);
						// formData.append('Methode_paiement', form.querySelector('[name="note_type"]').value);
						// formData.append('numero_transaction', form.querySelector('[name="note_transaction"]').value);
						var url="/api_central/register"
						axios.post(url, formData)
                        .then(response => {
                        // Handle success
                    console.log(response)
							// Hide loading indication
							formSubmitButton.removeAttribute('data-kt-indicator');

							// Enable button
							formSubmitButton.disabled = false;
                        if(response.data.status==200){
                          
                                // Hide loading indication
                               
        
                                // Enable button
                           
        
                                // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                Swal.fire({
                                    text: "Le compte et la note d'idée ont été ajoutés avec succès!",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, compris!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                }).then(function (result) {
                                    if (result.isConfirmed) { 
                                        
                                                                      
                                        //form.submit(); // submit form
										stepperObj.goNext();
                                    }
                                });
                             
                        }else{
                            
                            Swal.fire({
                                text: "Désolé, il semble que l'organisation a déjà été ajouté  ou veuillez réessayer.",
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, compris!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });

							// submitButton.removeAttribute('data-kt-indicator');
                        }
                        })
                        .catch(error => {
                        // Handle error
                    
                        console.error('Error:', error);
                        });
					}, 2000);  
				
				} else {
					Swal.fire({
						text: "Désolé, il semble y avoir des erreurs détectées, veuillez réessayer.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, compris!",
						customClass: {
							confirmButton: "btn btn-light"
						}
					}).then(function () {
						KTUtil.scrollTop();
					});
				}
			});
		});

		// Expiry month. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="card_expiry_month"]')).on('change', function() {
            // Revalidate the field when an option is chosen
            validations[3].revalidateField('card_expiry_month');
        });

		// Expiry year. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="card_expiry_year"]')).on('change', function() {
            // Revalidate the field when an option is chosen
            validations[3].revalidateField('card_expiry_year');
        });

		// Expiry year. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="business_type"]')).on('change', function() {
            // Revalidate the field when an option is chosen
            validations[2].revalidateField('business_type');
        });
	}

	var initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					'avatar': {
						validators: {
							notEmpty: {
								message: 'Le logo est réquis'
							}
						}
					},
					'struct_name': {
						validators: {
							notEmpty: {
								message: 'La dénomination est réquise'
							}
						}
					},
					'struct_dfe': {
						validators: {
							notEmpty: {
								message: 'Le registre de commerce est réquis'
							}
						}
					}
					,
					// 'struct_fiscal': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Le document fiscal est réquis '
					// 		}
					// 	}
					// },
					'struct_email': {
						validators: {
							notEmpty: {
								message: "L'email est réquis"
							},
							emailAddress: {
								message: "Il semble que la structure le l'email n'est pas correcte"
							}
						}
					},
					'struct_tel': {
						validators: {
							notEmpty: {
								message: 'Le numéro de téléphone est réquis '
							}
						}
					},
					
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
					})
				}
			}
		));
	/*
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					'account_team_size': {
						validators: {
							notEmpty: {
								message: 'Time size is required'
							}
						}
					},
					'account_name': {
						validators: {
							notEmpty: {
								message: 'Account name is required'
							}
						}
					},
					'account_plan': {
						validators: {
							notEmpty: {
								message: 'Account plan is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
					})
				}
			}
		));*/

		// Step 2
		validations.push(FormValidation.formValidation(
			form,
			{
				
											
                                            
                                            
                                            
				fields: {
					'note_idee': {
						validators: {
							notEmpty: {
								message: "La note d'idée est requise"
							}
						}
					},
					'doc_conformite': {
						validators: {
							notEmpty: {
								message: 'Le document de respect des critères de validité est réquis'
							}
						}
					},
					// 'note_type': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: 'Le type de transaction est réquis'
					// 		}
					// 	}
					// },
					// 'note_transaction': {
					// 	validators: {
					// 		notEmpty: {
					// 			message: "L'identification de transaction est réquis"
					// 		}
					// 	}
					// },
					
					
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
					})
				}
			}
		));

		
	}

	return {
		// Public Functions
		init: function () {
			// Elements
			modalEl = document.querySelector('#kt_modal_create_account');

			if ( modalEl ) {
				modal = new bootstrap.Modal(modalEl);	
			}					

			stepper = document.querySelector('#kt_create_account_stepper');

			if ( !stepper ) {
				return;
			}

			form = stepper.querySelector('#kt_create_account_form');
			formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
			formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');
			formPreviewButton = stepper.querySelector('[data-kt-stepper-action="previous"]');
			initStepper();
			initValidation();
			handleForm();
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTCreateAccount.init();
});