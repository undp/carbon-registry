


"use strict";

// Class definition
var KTSigninGeneral = function() {
    // Elements
    var form;
    var submitButton;
    var validator;

    // Handle form
    var handleForm = function(e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
			form,
			{
				fields: {					
					'email': {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'The value is not a valid email address',
                            },
							notEmpty: {
								message: 'Email address is required'
							}
						}
					},
                    'name': {
                        validators: {
                            notEmpty: {
                                message: 'The name is required'
                            }
                        }
                    } 
                    ,
                    'tel': {
                        validators: {
                            notEmpty: {
                                message: 'The phone number is required'
                            }
                        }
                    } 
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',  // comment to enable invalid state icons
                        eleValidClass: '' // comment to enable valid state icons
                    })
				}
			}
		);		

        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            // Prevent button default action
            e.preventDefault();

            // Validate form
            validator.validate().then(function (status) {


                let i_email = form.querySelector('[name="email"]').value
                
                let i_name = form.querySelector('[name="name"]').value
               
           
                let i_tel =phoneInput.getNumber()
		        var contry = phoneInput.getSelectedCountryData()
                // console.log(contry.name)
                // console.log(contry.iso2)
                // console.log(contry.dialCode)
                let i_pays=contry.name
                if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click 
                    submitButton.disabled = true;
                    

                    // Simulate ajax request
                    setTimeout(function() {
                        // Hide loading indication
                        submitButton.removeAttribute('data-kt-indicator');

                        // Enable button
                        submitButton.disabled = false;

                        // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        axios({
                            method: 'post',
                            url: '/api/waiting',
                            data: {
                              
                                email:i_email,
                                country:i_pays,
                                tel:i_tel,
                                name:i_name,
                                
                              }
                            })
                            .then(function (res) {
                                console.log(res)
                                if(res.data.status===200){
                                    Swal.fire({
                                        text: "You have been successfully added to the waiting list, we will contact you shortly!!!",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, compris!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then(function (result) {
            
                                        location.href ="https://scraping-flow.io"
                                        
                                    });
                                }else{
                                    
                                    if(res.data.message="Email error"){
                                        Swal.fire({
                                            text: "Sorry it looks like your email has already been saved.",
                                            icon: "error",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, compris!",
                                            customClass: {
                                                confirmButton: "btn btn-primary"
                                            }
                                        });
                                    }else{
                                       
                                            Swal.fire({
                                                text:"Sorry there seems to be an error, please try again.",
                                                icon: "error",
                                                buttonsStyling: false,
                                                confirmButtonText: "Ok, compris!",
                                                customClass: {
                                                    confirmButton: "btn btn-primary"
                                                }
                                            });
                                        
                                    }
                                    
                                   
                                }


                            })
                       

                    }, 2000);   						
                } else {
                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, compris!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                }
            });
		});
    }

    // Public functions
    return {
        // Initialization
        init: function() {
            form = document.querySelector('#kt_sign_in_form');
            submitButton = document.querySelector('#kt_sign_in_submit');
            
            handleForm();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTSigninGeneral.init();
});
