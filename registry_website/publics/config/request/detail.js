function dataURLToBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

function check_file_load(){
    let val=false
    let type='none'
    let sign= false
    let filch=false
    let file
    if (!signaturePad.isEmpty()){
        sign=true;
        type="sign"
        var dataURL = signaturePad.toDataURL("image/jpeg");
        file=dataURLToBlob(dataURL);
    } 
    if($("#file_charge").val()){
        filch=true;
        type="file"
        file=$('#file_charge')[0].files[0]
    }

    if(sign==filch){
        Swal.fire({
            text: "Désolé, vous devez soit signer soit ajouter le fichier signé .",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, Compris!",
            customClass: {
                confirmButton: "btn btn-primary"
            }
        });
    }else{
        val=true
    }
    return {
        type:type,
        val:val,
        file:file
    }
    
}

$(document).ready(function(){
    $("#r_approuve").click(function(){
        // Votre code à exécuter lors du clic sur le bouton
        swal.fire({
            text: "Êtes-vous sûr de vouloir signer ce document?",
            icon: "warning",
            buttonsStyling: false,
            showDenyButton: true,
            confirmButtonText: "Oui",
            denyButtonText: 'Non',
            customClass: {
                confirmButton: "btn btn-light-success",
                denyButton: "btn btn-danger"
            }
        }).then((result) => {
            if (result.isConfirmed) {
              let order=  check_file_load()
                if(order.val){

              
                const formData = {
                    _id:$("#id_file").val()
                }
                var url="/api/ask_auth_file"
                axios.post(url, formData)
                .then(response => {
                // Handle success
            console.log(response)
                if(response.data.status==200){
                  
                        // Hide loading indication
                       

                        // Enable button
                   

                        // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        Swal.fire({
                            title: "Un code vous a été trasmit par email, veuillez le rentrer.",
                            input: "password",
                            inputLabel: "Entrer le code",
                            inputPlaceholder: "********"
                          }).then((res)=>{
                            if(res.value!=""){
                                const formDatan = new FormData();
                                formDatan.append('Type', order.type);
                                switch (order.type) {
                                    case 'sign':
                                        formDatan.append('file', order.file,'signature.jpg');
                                     
                                        break;
                                    case 'file':
                                        formDatan.append('file', order.file);
                                      
                                        break;
                                  
                                }
                                formDatan.append('Status', "accepted");
                                formDatan.append('Auth_code', res.value);
                                formDatan.append('_id', $("#id_file").val());
                               
                                var url="/api/add_sign"
                                axios.post(url, formDatan)
                                .then(responses => {

                                    if(responses.data.status==200){
                                        Swal.fire({
                                            text: 'Le document a été signé avec succès!', 
                                            icon: 'success',
                                            confirmButtonText: "Ok",
                                            buttonsStyling: false,
                                            customClass: {
                                                confirmButton: "btn btn-light-primary"
                                            }
                                        }).then(()=>{
                                            location.reload()
                                        })

                                       
                                    }else{
                                        Swal.fire({
                                            text: "Désolé,il semblle avoir une erreur veuillez réessayer .",
                                            icon: "error",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, compris!",
                                            customClass: {
                                                confirmButton: "btn btn-primary"
                                            }
                                        });
                                    }
                                })
                            }else{
                             Swal.fire({
                                 text: "Désolé,le code doit être non vide.",
                                 icon: "error",
                                 buttonsStyling: false,
                                 confirmButtonText: "Ok, compris!",
                                 customClass: {
                                     confirmButton: "btn btn-primary"
                                 }
                             });
                            }
                          });
                     
                }else{
                    submitButton.removeAttribute('data-kt-indicator');
                    Swal.fire({
                        text: "Désolé, il semble avoir une error ou  le code est invalides.",
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
            
                console.error('Error:', error);
                });
                
            }

                // Swal.fire({
                //     text: 'La lettre a été accepter avec succès!', 
                //     icon: 'success',
                //     confirmButtonText: "Ok",
                //     buttonsStyling: false,
                //     customClass: {
                //         confirmButton: "btn btn-light-primary"
                //     }
                // })




            } else if (result.isDenied) {
                Swal.fire({
                    text: "L'action a été annulé.", 
                    icon: 'info',
                    confirmButtonText: "Ok",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: "btn btn-light-primary"
                    }
                })
            }
        });
    });
    $("#r_refuser").click(function(){
        // Votre code à exécuter lors du clic sur le bouton
        swal.fire({
            text: "Êtes-vous sûr de vouloir refuser la signature de ce document?",
            icon: "warning",
            buttonsStyling: false,
            showDenyButton: true,
            confirmButtonText: "Oui",
            denyButtonText: 'Non',
            customClass: {
                confirmButton: "btn btn-light-primary",
                denyButton: "btn btn-danger"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = {
                    _id:$("#id_file").val()
                }
                var url="/api/ask_auth_file"
                axios.post(url, formData)
                .then(response => {
                // Handle success
            console.log(response)
                if(response.data.status==200){
                  
                        // Hide loading indication
                       

                        // Enable button
                   

                        // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        Swal.fire({
                            title: "Un code vous a été trasmit par email, veuillez le rentrer.",
                            input: "password",
                            inputLabel: "Entrer le code",
                            inputPlaceholder: "********"
                          }).then((res)=>{
                               
                               if(res.value!=""){
                                var url="/api/add_sign"
                                let data ={
                                    _id:$("#id_file").val(),
                                    Status:"denied",
                                    Auth_code:res.value,
                                }
                                axios.post(url, data).then(responses => {
                                    if(responses.data.status==200){
                                        Swal.fire({
                                            text: 'La signature de document  a été réfusée avec succès!', 
                                            icon: 'success',
                                            confirmButtonText: "Ok",
                                            buttonsStyling: false,
                                            customClass: {
                                                confirmButton: "btn btn-light-primary"
                                            }
                                        }).then(()=>{
                                            location.reload()
                                        })

                                       
                                    }else{
                                        Swal.fire({
                                            text: "Désolé,il semblle avoir une erreur veuillez réessayer .",
                                            icon: "error",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, compris!",
                                            customClass: {
                                                confirmButton: "btn btn-primary"
                                            }
                                        });
                                    }
                                }).catch((error)=>{
                                    Swal.fire({
                                        text: "Désolé,il semblle avoir une erreur veuillez réessayer .",
                                        icon: "error",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, compris!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    });
                                })
                               }else{
                                Swal.fire({
                                    text: "Désolé,le code doit être non vide.",
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, compris!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                });
                               }
                          });
                     
                }else{
                    submitButton.removeAttribute('data-kt-indicator');
                    Swal.fire({
                        text: "Désolé, il semble avoir une error ou  le code est invalides.",
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
            
                console.error('Error:', error);
                });
            } else if (result.isDenied) {
                Swal.fire({
                    text: "L'action a été annulé.", 
                    icon: 'info',
                    confirmButtonText: "Ok",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: "btn btn-light-primary"
                    }
                })
            }
        });
    });
    $("#r_reouvrir").click(function(){
        // Votre code à exécuter lors du clic sur le bouton
        swal.fire({
            text: "Êtes-vous sûr de vouloir rouvrir cette lettre?",
            icon: "warning",
            buttonsStyling: false,
            showDenyButton: true,
            confirmButtonText: "Oui",
            denyButtonText: 'Non',
            customClass: {
                confirmButton: "btn btn-light-primary",
                denyButton: "btn btn-danger"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = {
                    _id:$("#id_file").val()
                }
                var url="/api/ask_auth_file"
                axios.post(url, formData)
                .then(response => {
                // Handle success
            console.log(response)
                if(response.data.status==200){
                  
                        // Hide loading indication
                       

                        // Enable button
                   

                        // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        Swal.fire({
                            title: "Un code vous a été trasmit par email, veuillez le rentrer.",
                            input: "password",
                            inputLabel: "Entrer le code",
                            inputPlaceholder: "********"
                          }).then((res)=>{
                               
                               if(res.value!=""){
                                var url="/api/add_sign"
                                let data ={
                                    _id:$("#id_file").val(),
                                    Status:"waiting",
                                    Auth_code:res.value,
                                }
                                axios.post(url, data).then(responses => {
                                    if(responses.data.status==200){
                                        Swal.fire({
                                            text: 'La lettre a été réouverte avec succès!', 
                                            icon: 'success',
                                            confirmButtonText: "Ok",
                                            buttonsStyling: false,
                                            customClass: {
                                                confirmButton: "btn btn-light-primary"
                                            }
                                        }).then(()=>{
                                            location.reload()
                                        })

                                       
                                    }else{
                                        Swal.fire({
                                            text: "Désolé,il semblle avoir une erreur veuillez réessayer .",
                                            icon: "error",
                                            buttonsStyling: false,
                                            confirmButtonText: "Ok, compris!",
                                            customClass: {
                                                confirmButton: "btn btn-primary"
                                            }
                                        });
                                    }
                                }).catch((error)=>{
                                    Swal.fire({
                                        text: "Désolé,il semblle avoir une erreur veuillez réessayer .",
                                        icon: "error",
                                        buttonsStyling: false,
                                        confirmButtonText: "Ok, compris!",
                                        customClass: {
                                            confirmButton: "btn btn-primary"
                                        }
                                    });
                                })
                               }else{
                                Swal.fire({
                                    text: "Désolé,le code doit être non vide.",
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, compris!",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                });
                               }
                          });
                     
                }else{
                    submitButton.removeAttribute('data-kt-indicator');
                    Swal.fire({
                        text: "Désolé, il semble avoir une error ou  le code est invalides.",
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
            
                console.error('Error:', error);
                });
            } else if (result.isDenied) {
                Swal.fire({
                    text: "L'action a été annulé.", 
                    icon: 'info',
                    confirmButtonText: "Ok",
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: "btn btn-light-primary"
                    }
                })
            }
        });
    });
});

