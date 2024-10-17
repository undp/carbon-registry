"use strict";

// Class definition
var KTSignupGeneral = function() {
    // Elements
    var form;
    var submitButton;
    var validator;
    var passwordMeter;

    // Handle form
    var handleForm  = function(e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        validator = FormValidation.formValidation(
			form,
			{
				fields: {
                    'intitule': {
						validators: {
							notEmpty: {
								message: 'Le nom de la structure est requis'
							}
						}
                    },
                    'phone': {
						validators: {
							notEmpty: {
								message: 'Le numero de la structure est requis'
							}
						}
                    },
					'first-name': {
						validators: {
							notEmpty: {
								message: 'First Name is required'
							}
						}
                    },
                    'last-name': {
						validators: {
							notEmpty: {
								message: 'Last Name is required'
							}
						}
					},
					'email': {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "La valeur n'est pas une adresse e-mail valide",
                            },
							notEmpty: {
								message: 'Adresse e-mail est nécessaire'
							}
						}
					},
                    'password': {
                        validators: {
                            notEmpty: {
                                message: 'Le mot de passe est requis'
                            },
                            callback: {
                                message: 'Veuillez entrer un mot de passe valide',
                                callback: function(input) {
                                    if (input.value.length > 0) {
                                        return validatePassword();
                                    }
                                }
                            }
                        }
                    },
                    'confirm-password': {
                        validators: {
                            notEmpty: {
                                message: 'La confirmation du mot de passe est requise'
                            },
                            identical: {
                                compare: function() {
                                    return form.querySelector('[name="password"]').value;
                                },
                                message: 'Le mot de passe et sa confirmation ne sont pas les mêmes'
                            }
                        }
                    },
                    'toc': {
                        validators: {
                            notEmpty: {
                                message: 'Vous devez accepter les Termes et Conditions'
                            }
                        }
                    }
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger({
                        event: {
                            password: false
                        }  
                    }),
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
            e.preventDefault();

            validator.revalidateField('password');

            validator.validate().then(function(status) {

                // let i_tel = form.querySelector('[name="phone"]').value
                let i_email = form.querySelector('[name="email"]').value
                
                let i_intitule = form.querySelector('[name="intitule"]').value
                let i_password1 = form.querySelector('[name="password"]').value
                let i_password2 = form.querySelector('[name="confirm-password"]').value
           
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
                            url: '/api/v1/create_user_by_email',
                            data: {
                                intitule:i_intitule,
                                email:i_email,
                                pays:i_pays,
                                tel:i_tel,
                                password1:i_password1,
                                password2:i_password2
                              }
                            })
                            .then(function (res) {

                                if(res.data.status==1){
                                    Swal.fire({
                                        text: "Accepter! Un email avec un code vous a été transmis, vous allez être redirigés vers l'espace de confirmation !",
                                        icon: "success",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, compris!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    }).then(function (result) {
            
                                        location.href ="/register_step2?id="+res.data.data+"&trans_id="+id_trans
                                        // if (result.isConfirmed) { 
                                        //     form.querySelector('[name="email"]').value= "";
                                        //     form.querySelector('[name="password"]').value= "";  
                                                                          
                                        //     //form.submit(); // submit form
                                        //     // var redirectUrl = form.getAttribute('data-kt-redirect-url');
                                        //     // if (redirectUrl) {
                                        //     //     location.href = redirectUrl;
                                        //     // }
                                        // }
                                    });
                                }else{
                                    console.log(res.data.info)
                                    if(res.data.info="field_error"){
                                        Swal.fire({
                                            text: "Désolé, il semble qu'un champ ou plusieurs champs sont vides.",
                                            icon: "error",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, compris!",
                                            customClass: {
                                                confirmButton: "btn btn-primary"
                                            }
                                        });
                                    }else{
                                        if(res.data.info="email_error"){
                                            Swal.fire({
                                                text: "Désolé, votre email est déjà enregistré.",
                                                icon: "error",
                                                buttonsStyling: false,
                                                confirmButtonText: "Ok, compris!",
                                                customClass: {
                                                    confirmButton: "btn btn-primary"
                                                }
                                            });
                                        }else{
                                            Swal.fire({
                                                text: "Désolé, votre email ou le mot de passe semble incorrecte.",
                                                icon: "error",
                                                buttonsStyling: false,
                                                confirmButtonText: "Ok, compris!",
                                                customClass: {
                                                    confirmButton: "btn btn-primary"
                                                }
                                            });
                                        }
                                    }
                                    
                                   
                                }


                            })
                       
                    }, 1500);   						
                } else {
                    // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    Swal.fire({
                        text: "Désolé, il semble qu'il y ait des erreurs détectées, veuillez réessayer.",
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

        // Handle password input
        form.querySelector('input[name="password"]').addEventListener('input', function() {
            if (this.value.length > 0) {
                validator.updateFieldStatus('password', 'NotValidated');
            }
        });
    }

    // Password input validation
    var validatePassword = function() {
        return (passwordMeter.getScore() === 100);
    }

    // Public functions
    return {
        // Initialization
        init: function() {
            // Elements
            form = document.querySelector('#kt_sign_up_form');
            submitButton = document.querySelector('#kt_sign_up_submit');
            passwordMeter = KTPasswordMeter.getInstance(form.querySelector('[data-kt-password-meter="true"]'));

            handleForm ();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTSignupGeneral.init();
});
