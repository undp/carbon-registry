"use strict";



// Class definition
var KTModalupadateUser = function () {
    // Shared variables
    const element = document.getElementById('kt_modal2_update_users');
    const form = element.querySelector('#kt_modal2_update_users_form');
    const modal = new bootstrap.Modal(element);

   
    // Init form inputs
    var initForm = function () {

        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        var validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'categorie2': {
                        validators: {
                            notEmpty: {
                                message: 'La catégorie est réquise'
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
        const submitButton = element.querySelector('[data-kt-update-modal2-action="submit"]');
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Validate form before submit
            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');

                    if (status == 'Valid') {
                        //send request
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable submit button whilst loading
                        submitButton.disabled = true;
                        // Data to be sent in the request
                        console.log(id_file)
                        let postData = {
                            id_categorie: form.querySelector('[name="idcategorie2"]').value,
                            _id:id_file
                         
                        };
                        
                        // URL where you want to send the POST request
                        let url = '/api/update/file';
                        
                        // Making the POST request using Axios
                        let token = document.querySelector("#token").value
                 
                        let headers = {

                            'Authorization': token // Replace with your token
                          };
                        axios.post(url, postData,{
                            headers: headers
                          })
                            .then(response => {
                            // Handle success
                            console.log('Response:', response.data);
                            if(response.data.status===200){
                               
                                setTimeout(function () {
                                    submitButton.removeAttribute('data-kt-indicator');
        
                                    Swal.fire({
                                        text: "La catégorie à été ajouter avec succès!",
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
                                            location.reload();
                                        }
                                    });
        
                                    //form.submit(); // Submit form
                                }, 2000);
                            }else{
                                Swal.fire({
                                    text: "Désolé, nous avons détecté un problème, veuillez réesayer.",
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, compris!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                }).then(function(){
                                    submitButton.disabled = false;
                                });
                            }
                            })
                            .catch(error => {
                            // Handle error
                            console.error('Error:', error);
                            });
                           
                    } else {
                        Swal.fire({
                            text: "Désolé, nous avons détecté un problème, veuillez réesayer.",
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
        const cancelButton = element.querySelector('[data-kt-update-modal2-action="cancel"]');
        cancelButton.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                text: "Vous êtes sur de vouloir annuler ?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Oui, annuler!",
                cancelButtonText: "Non, continuer",
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
                        text: "Votre action a bien été annulé !.",
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
        const closeButton = element.querySelector('[data-kt-update-modal2-action="close"]');
        closeButton.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                text: "Vous êtes sur de vouloir annuler ?",
                icon: "warning",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Oui, annuler!",
                cancelButtonText: "Non, continuer",
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
                        text: "Votre action a bien été annulé !.",
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
    KTModalupadateUser.init();
});