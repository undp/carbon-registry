$("#eligi_update_param").click(function(){

    const formData = new FormData();
                        const fileInput1 =document.querySelector('[name="avatar"]');
						const fileInput2 = document.querySelector('[name="struct_fiscal"]');
						const fileInput3 = document.querySelector('[name="struct_dfe"]');
						
						// const fileInput6= form.querySelector('[name="note_option"]');
					
						if(fileInput1.files[0]){
							formData.append('logo', fileInput1.files[0]);
						}
						if(fileInput2.files[0]){
							formData.append('fiscal', fileInput2.files[0]);
						}
						
                        if(fileInput3.files[0]){
						formData.append('registre', fileInput3.files[0]);
                        }
						// formData.append('justif', fileInput6.files[0]);
						
						formData.append('Denomination_organisation', document.querySelector('[name="struct_name"]').value);
						formData.append('Site_web_organisation', document.querySelector('[name="struct_site"]').value);
						formData.append('Numero_tel_organisation', document.querySelector('[name="struct_tel"]').value);
                        formData.append('_id', $("#myorga").val());

                        var url="/api_central/update_orga"
    axios.post(url, formData)
    .then(response => {
    // Handle success
    $("#eligi_update_param").hide()
console.log(response)
    if(response.data.status==200){
      
            // Hide loading indication
           

            // Enable button
       

            // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
                text: "Succès!",
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
            $("#eligi_update_param").show()
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
        $("#eligi_update_param").show()
        // submitButton.removeAttribute('data-kt-indicator');
    }
    })
    .catch(error => {
    // Handle error

    console.error('Error:', error);
    });
})

$("#eligi_update_note").click(function(){
    const formData = new FormData();
console.log('ok')
let yeh = true
const fileInput4 =	document.querySelector('[name="note_idee"]');
if(fileInput4.files[0]){
    formData.append('note', fileInput4.files[0]);
}else{
    yeh = false
}
if(yeh){
    formData.append('_id', $("#id_note").val());
    var url="/api_central/update_note"
    $("#eligi_update_note").hide()
    axios.post(url, formData)
    .then(response => {
    // Handle success
console.log(response)
    if(response.data.status==200){
      
            // Hide loading indication
           

            // Enable button
       

            // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
            Swal.fire({
                text: "Succès!",
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
            $("#eligi_update_note").show()
         
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
        $("#eligi_update_note").show()
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

$("#eligi_create_note").click(function(){
    const formData = new FormData();
    

    let yeh = true
    const fileInput4 =	document.querySelector('[name="note_idee"]');
    const fileInput5 = document.querySelector('[name="doc_conformite"]');
    if(fileInput4.files[0]){
        formData.append('note', fileInput4.files[0]);
    }else{
        yeh = false
    }
    if(fileInput5.files[0]){
        formData.append('conformite', fileInput5.files[0]);
    }else{
        yeh = false
    }
    if(yeh){
        formData.append('Reference_organisation', $("#id_orga").val());
        $("#eligi_create_note").hide()
        var url="/api_central/add_note"
        axios.post(url, formData)
        .then(response => {
        // Handle success
    console.log(response)
        if(response.data.status==200){
          
                // Hide loading indication
               

                // Enable button
           

                // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                Swal.fire({
                    text: "La note d'idée a été ajouté avec succès!",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, compris!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then(function (result) {
                    if (result.isConfirmed) { 
                        
                                                      
                        //form.submit(); // submit form
                        location.replace("/eligi/myideas")
                    }
                });

                $("#eligi_create_note").show()
             
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
            $("#eligi_create_note").show()
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


$("#eligi_update_recours").click(function(){
let ver = $("#commentaire_note").val()
            if(ver!=""){
                 var url="/api_central/update_note_recours"
                let datas = {
                    _id: $("#id_note").val(),
                    commentaire:$("#commentaire_note").val()
                }
                $("#eligi_update_recours").hide()
                axios.post(url, datas)
            .then(response => {
            // Handle success
        console.log(response)
            if(response.data.status==200){
            
                    // Hide loading indication
                

                    // Enable button
            

                    // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                    Swal.fire({
                        text: "Succès!",
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
                    $("#eligi_update_recours").show()
                
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
                $("#eligi_update_recours").show()
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

