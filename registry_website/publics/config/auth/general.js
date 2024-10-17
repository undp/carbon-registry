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
                            
							notEmpty: {
								message: "Le nom d'utilisateur est réquis"
							}
						}
					},
                    'password': {
                        validators: {
                            notEmpty: {
                                message: 'Le mot de passe est réquis'
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
                if (status == 'Valid') {
                    // Show loading indication
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    // Disable button to avoid multiple click 
                    submitButton.disabled = true;
                    

                    // Simulate ajax request
                    //My request 
                    // Data to be sent in the request
                    const postData = {
                        user: form.querySelector('[name="email"]').value,
                        password: form.querySelector('[name="password"]').value
                    };
                    
                    // URL where you want to send the POST request
                    const url = '/api/login';
                    
                    // Making the POST request using Axios
                    axios.post(url, postData)
                        .then(response => {
                        // Handle success
                        console.log('Response:', response.data);
                        submitButton.removeAttribute('data-kt-indicator');
                        if(response.data.status==200){
                            setTimeout(function() {
                                // Hide loading indication
                               
        
                                // Enable button
                                submitButton.disabled = false;
        
                                // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                Swal.fire({
                                    text: "Vous vous être connecté avec success!",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, compris!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                }).then(function (result) {
                                    if (result.isConfirmed) { 
                                        
                                        let vh=true
                                        
                                        switch (response.data.go) {
                                            case "admin":
                                                //form.submit(); // submit form
                                        var redirectUrl = form.getAttribute('data-kt-redirect-url');
                                        if (redirectUrl) {
                                            location.href = redirectUrl;
                                        }
                                                break;
                                        
                                            default :
                                            location.href="/myregister/doc"
                                                break;
                                           
                                        }
                                        
                                    }
                                });
                            }, 2000);   
                        }else{
                            submitButton.removeAttribute('data-kt-indicator');
                            submitButton.disabled = false;
                            Swal.fire({
                                text: "Désolé, le nom d'utilisateur ou le mot de passe semble incorrect.",
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, compris!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });
                        }
                        })
                        .catch(error => {
                        // Handle error
                        submitButton.removeAttribute('data-kt-indicator');
                        submitButton.disabled = false;
                        console.error('Error:', error);
                        });
                 						
                } else {
                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    Swal.fire({
                        text: "Désolé, il semble avoir une erreur, veuillez réessayer.",
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
