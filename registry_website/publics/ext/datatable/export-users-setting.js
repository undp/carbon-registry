"use strict";

// Class definition
var KTModalExportUsers = function () {
    // Shared variables
    const element = document.getElementById('kt_modal_export_myusers');
    const form = element.querySelector('#kt_modal_export_users_form');
    const modal = new bootstrap.Modal(element);

    // Init form inputs
    var initForm = function () {

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'file': {
                        validators: {
                            notEmpty: {
                                message: 'Un ou plusieurs fichiers réquis'
                            }
                        }
                    },
                    'idcategorie': {
                        validators: {
                            notEmpty: {
                                message: 'La categorie est réquise'
                            }
                        }
                    },
                    'idstatus': {
                        validators: {
                            notEmpty: {
                                message: 'Le status est réquis'
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

                    if (status == 'Valid') {
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable submit button whilst loading
                        submitButton.disabled = true;
                        // charger les fichiers
                        let formData = new FormData();
                        let fileInput = form.querySelector('[name="file"]') ;
                        let id_cat=form.querySelector('[name="idcategorie"]').value;
                        let privates =form.querySelector('[name="idstatus"]').value;
                        let files = fileInput.files;
                        let url ="/api/create/file"
                        
                        if (files.length > 0) {
                            for (let i = 0; i < files.length; i++) {
                            formData.append('file', files[i]);
                            }

                            formData.append('private',privates)
                            formData.append('id_categorie',id_cat)
                            let token = document.querySelector("#token").value
                           
                            let headers = {
                                'Content-Type': 'multipart/form-data',
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
                                            text: "L'opération a été exécutée avec succès!",
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
                            console.error('No files selected.');
                        }
                        
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