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
                    
                    

                    // Simulate ajax request
                    //My request 
                    // Data to be sent in the request
                    const postData = {
                        email: form.querySelector('[name="email"]').value,
                        password: form.querySelector('[name="password"]').value
                    };
                    
                    // URL where you want to send the POST request
                    const url = '/api_central/login';
                    
                    // Making the POST request using Axios
                    axios.post(url, postData)
                        .then(response => {
                        // Handle success
                        submitButton.disabled = true;
                        console.log('Response:', response.data);
                        submitButton.removeAttribute('data-kt-indicator');
                        if(response.data.status==200){
                            setTimeout(function() {
                                // Hide loading indication
                               
        
                                // Enable button
                                submitButton.disabled = false;
        
                                // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                                Swal.fire({
                                    text: "Connexion avec succès!",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, compris!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                }).then(function (result) {
                                    if (result.isConfirmed) { 
                                        
                                                                      
                                        //form.submit(); // submit form
                                        var redirectUrl = form.getAttribute('data-kt-redirect-url');
                                        if (redirectUrl) {
                                            location.href = redirectUrl;
                                        }
                                    }
                                });
                            }, 2000);   
                        }else{
                            submitButton.disabled = false;
                            submitButton.removeAttribute('data-kt-indicator');
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
                        submitButton.disabled = false;
                        submitButton.removeAttribute('data-kt-indicator');
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


$("#eligi_update_pass").click(function(){
    let ver = $("#email_orga").val()
                if(ver!=""){
                     var url="/api_central/update_orga_pass"
                    let datas = {
                       
                        email:$("#email_orga").val()
                    }
                    $("#eligi_update_pass").hide()
                    axios.post(url, datas)
                .then(response => {
                // Handle success
            console.log(response)
                if(response.data.status==200){
                
                        // Hide loading indication
                    
    
                        // Enable button
                
    
                        // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        Swal.fire({
                            text: "Un email avec votre mot de passe vous a été transmis!",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, compris!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function (result) {
                        
                                
                                                            
                                //form.submit(); // submit form
                                location.reload()
                    
                        });
                        $("#eligi_update_pass").show()
                    
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
                    $("#eligi_update_pass").show()
                    // submitButton.removeAttribute('data-kt-indicator');
                }
                })
                .catch(error => {
                // Handle error
    
                console.error('Error:', error);
                });
        }else{
            Swal.fire({
                text: "Désolé, il semble y avoir des erreurs détectées, veuillez réessayer.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, compris!",
                customClass: {
                    confirmButton: "btn btn-light"
                }
            })
        }
        
    })
