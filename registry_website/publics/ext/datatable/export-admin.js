"use strict";

// Class definition
var KTModalExportUsers = function () {
    // Shared variables
    const element = document.getElementById('kt_modal_export_utilisateur');
    const form = element.querySelector('#kt_modal_export_users_form');
    const modal = new bootstrap.Modal(element);

    // Init form inputs
    var initForm = function () {

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'nom': {
                        validators: {
                            notEmpty: {
                                message: 'Le nom est réquis'
                            }
                        }
                    },
                    'prenom': {
                        validators: {
                            notEmpty: {
                                message: 'Le prenom est réquis'
                            }
                        }
                    },
                    'email': {
                        validators: {
                            notEmpty: {
                                message: 'L email est réquis'
                            }
                        }
                    },
                    
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        // Submit button handler
        const submitButton = element.querySelector('[data-kt-users-modal-action="submit"]');
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');
                    let user_role=""
                    let gopass=false
                    if (!$('#admin').is(':checked')) {
                        // Si non cochée, récupérer la valeur de l'input avec le nom 'role'
                        var roleValue = $('input[name="role"]').val();
                        // Ajouter cette valeur au tableau
                        if(roleValue!="admin"){
                            user_role=roleValue
                            gopass=true
                        }
                       
                    }else{
                        user_role="admin"
                        gopass=true
                    }
                    if (status == 'Valid' && gopass) {
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable submit button whilst loading
                        submitButton.disabled = true;
                        // charger les fichiers
                    
                   
                        var checkedValues = [];

                    // Sélectionner tous les champs cochés avec la classe 'filetype'
                    $('.filetype:checked').each(function() {
                        // Ajouter la valeur de chaque champ coché au tableau
                        checkedValues.push($(this).val());
                    });
                  
                    // Afficher les valeurs dans la console (ou faire autre chose avec)
               
                     
                    
                        let url ="/api/create/user"
                        let formData = {
                            Nom: form.querySelector('[name="nom"]').value,
                            Prenom : form.querySelector('[name="prenom"]').value,
                            Email : form.querySelector('[name="email"]').value,
                            Role :  user_role,
                            TypeFile:checkedValues,
                            TypeStruct:form.querySelector('[name="minister"]').value
                        };
                       
                            

                            let token = document.querySelector("#token").value
                           
                            let headers = {
                               
                                'Authorization': token // Replace with your token
                              };
                            // Custom headers
                            
                            axios.post(url, formData, {
                            headers: headers
                            })
                            .then(response => {
                                submitButton.removeAttribute('data-kt-indicator');
                                console.log(response.data)
                                if(response.data.status===200){
                                    setTimeout(function () {
                                       
            
                                        Swal.fire({
                                            text: "L'opération a été exécutée avec succès! Un email d'activation et le mot de passe ont été envoyés à l'utilisateur.",
                                            icon: "success",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, compris!",
                                            customClass: {
                                                confirmButton: "btn btn-primary"
                                            }
                                        }).then(function (result) {
                                            if (result.isConfirmed) {
                                                modal.hide();
            
                                                // Enable submit button after loading
                                                submitButton.disabled = false;
                                            }
                                            location.reload();
                                        });
            
                                        //form.submit(); // Submit form
                                    }, 2000);
                                }else{
                                    submitButton.disabled = false;
                                    Swal.fire({
                                        text: "Désolé, il semble avoir un souci, veuillez recommencer",
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
                            console.error('Error:', error);
                            });
                       
                        
                    } else {
                        Swal.fire({
                            text: "Désolé, il semble avoir un souci, veuillez recommencer",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, compris!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }
                });
            }
        });

        // Cancel button handler
        const cancelButton = element.querySelector('[data-kt-users-modal-action="cancel"]');
        cancelButton.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                text: "Are you sure you would like to cancel?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, cancel it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form	
                    modal.hide(); // Hide modal				
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Your form has not been cancelled!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, compris!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        });

        // Close button handler
        const closeButton = element.querySelector('[data-kt-users-modal-action="close"]');
        closeButton.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                text: "Are you sure you would like to cancel?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes, cancel it!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then(function (result) {
                if (result.value) {
                    form.reset(); // Reset form	
                    modal.hide(); // Hide modal				
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: "Your form has not been cancelled!.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, compris!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        }
                    });
                }
            });
        });

        const hide_show_admin = element.querySelector("#admin");
        hide_show_admin.addEventListener('click',function(e){
            
            if(!$("#admin").is(':checked')){
                
                $('.no_admin').show();
                $('.y_admin').hide();
            }else{
                $('.y_admin').show();
                $('.no_admin').hide();

            }
        })
    }
   
    return {
        // Public functions
        init: function () {
            initForm();
            
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTModalExportUsers.init();
});

$('.no_admin').show();
$('.y_admin').hide();