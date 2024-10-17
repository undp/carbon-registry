
function af_doc(valide,data){
    if(valide){
        let status='Non Signé'
        let link=data[0].Url
        let status_color="red"
        if(data[0].Signed){
            status='Signé'
            link=data[0].upload_link
            status_color="green"
        }
       
        let info= `  <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-4">
                <div class="flex-column flex-lg-row-auto w-100 mw-lg-300px mw-xxl-350px">
                    <!--begin::More channels-->
                    <div class="card-rounded bg-success bg-opacity-5 p-10 mb-15">
                        <!--begin::Title-->
                        <h2 class="text-dark fw-bold mb-11 text-center">Document Existant</h2>
                        <!--end::Title-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-10">
                            <!--begin::Icon-->
                            
                            <svg style="height: 25px;" class="me-5" viewBox="0 0 48 48" id="b" xmlns="http://www.w3.org/2000/svg" fill="green"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style>.c{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}</style> </defs> <path class="c" d="m17.6456,43.2973h12.7088c2.9622,0,5.6993-1.5803,7.1804-4.1456l6.3544-11.0061c1.4811-2.5653,1.4811-5.7259,0-8.2912l-6.3544-11.0061c-1.4811-2.5653-4.2182-4.1456-7.1804-4.1456h-12.7088c-2.9622,0-5.6993,1.5803-7.1804,4.1456l-6.3544,11.0061c-1.4811,2.5653-1.4811,5.7259,0,8.2912l6.3544,11.0061c1.4811,2.5653,4.2182,4.1456,7.1804,4.1456Z"></path> <g> <circle class="c" cx="18.6033" cy="24" r="4.9355"></circle> <line class="c" x1="34.3323" y1="24.0177" x2="23.5388" y2="24.0177"></line> <line class="c" x1="30.7154" y1="26.971" x2="30.7154" y2="24.0177"></line> </g> </g></svg>
                            <!--end::SymIconbol-->
                            <!--begin::Info-->
                            <div class="d-flex flex-column">
                                <h5 class="text-gray-800 fw-bold">Identifiant</h5>
                                <!--begin::Section-->
                                <div class="fw-semibold">
                                    <!--begin::Desc-->
                                    <span class="text-muted">${data[0].Otp_code}</span>
                                    <!--end::Desc-->
                                    <!--begin::Link-->
                                    
                                    <!--end::Link-->
                                </div>
                                <!--end::Section-->
                            </div>
                            <!--end::Info-->
                        </div>
                        <!--end::Item-->
                        <!--begin::Item-->
                        <div class="d-flex align-items-center mb-10">
                            <!--begin::Icon-->
                            
                            <svg style="height: 25px;" class="me-5" fill="green" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="secure--search_1_" d="M11,21.509l-4.254-4.254l0.509-0.509L11,20.491l7.745-7.746l0.51,0.509L11,21.509z M23.623,22.313 l7.202,4.001l0.35-0.629l-7.201-4.001c0.886-1.702,1.387-3.637,1.387-5.685c0-6.815-5.545-12.36-12.36-12.36S0.64,9.185,0.64,16 S6.185,28.36,13,28.36C17.511,28.36,21.464,25.932,23.623,22.313z M24.64,16c0,6.418-5.222,11.64-11.64,11.64S1.36,22.418,1.36,16 S6.582,4.36,13,4.36S24.64,9.582,24.64,16z"></path> <rect id="_Transparent_Rectangle" style="fill:none;" width="32" height="32"></rect> </g></svg>
                            <!--end::SymIconbol-->
                            <!--begin::Info-->
                            <div class="d-flex flex-column">
                                <h5 class="text-gray-800 fw-bold">Immatriculation</h5>
                                <!--begin::Section-->
                                <div class="fw-semibold">
                                    <!--begin::Desc-->
                                    <span class="text-muted">${data[0].Immat}</span>
                                    <!--end::Desc-->
                                    <!--begin::Link-->
                             
                                    <!--end::Link-->
                                </div>
                                <!--end::Section-->
                            </div>
                            <!--end::Info-->
                        </div>
                        <!--end::Item-->
                         <!--begin::Item-->
                        <div class="d-flex align-items-center mb-10">
                            <!--begin::Icon-->
                            <svg style="height: 25px;" class="me-5" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" fill="${status_color}"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill-rule="evenodd"> <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z"></path> <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF" style="fill: var(--svg-status-bg, #fff);"></path> <path d="M6 3.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v4c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-4m0 6c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-1"></path> </g> </g></svg>
                          
                            <!--end::SymIconbol-->
                            <!--begin::Info-->
                            <div class="d-flex flex-column">
                                <h5 class="text-gray-800 fw-bold">Statut</h5>
                                <!--begin::Section-->
                                <div class="fw-semibold">
                                    <!--begin::Desc-->
                                    <span class="text-muted">${status}</span>
                                    <!--end::Desc-->
                                    <!--begin::Link-->
                             
                                    <!--end::Link-->
                                </div>
                                <!--end::Section-->
                            </div>
                            <!--end::Info-->
                        </div>
                        <!--end::Item-->
                     
                    </div>
                    <!--end::More channels-->
                   
                </div>
            </div>
            <div class="col-lg-8">
                <embed src="${link}" type="application/pdf" width="100%" height="600px" />
            </div>

        </div>
       
    </div>
    `
        $("#document_zone").html(info)
    }else{
        $("#document_zone").html(
            `<div class="col-lg-6 offset-lg-3">
            <!--begin::Alert-->
            <div class="alert alert-warning d-flex align-items-center p-5">
                <!--begin::Icon-->
                <svg class="me-4" style="height: 60px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#18dc53"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 8L12 12" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 16.01L12.01 15.9989" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 3H4V6" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 11V13" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20 11V13" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 3H20V6" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 21H4V18" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 21H20V18" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                
                <!--end::Icon-->

                <!--begin::Wrapper-->
                <div class="d-flex flex-column">
                    <!--begin::Title-->
                    <h4 class="mb-1 text-dark">Le document n'a pas été trouvé</h4>
                    <!--end::Title-->

                    <!--begin::Content-->
                    <span>En cas de soucis, veuillez contacter le bureau du marché carbone</span>
                    <!--end::Content-->
                </div>
                <!--end::Wrapper-->
            </div>
            <!--end::Alert-->
        </div>`
        )
    }
}

// document.getElementById('basic-idrc').addEventListener('input', 
    
//     function(event) {
//     // Fonction activée à chaque entrée
//     let inputValue = event.target.value;
//     if(inputValue!=""){
//         //envoi de la requete
//         var url="/api_central/verify"
// 						axios.post(url, {idcr:inputValue})
//                         .then(response => {
//                         // Handle success
//                     console.log(response)
//                         if(response.data.status==200){
                          
//                                 // Hide loading indication
                               
        
//                                 // Enable button
//                                 if(response.data.data.length!=0){
//                                     af_doc(true,response.data.data)
//                                 }else{
//                                     af_doc(false,response.data.data)
//                                 }
                                
//                                 // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                               
                             
//                         }else{
//                             af_doc(false,"ok")
//                         }
//                         })
//                         .catch(error => {
//                         // Handle error
                    
//                         console.error('Error:', error);
//                         af_doc(false,"ok")
//                         });
    
//     }else{
//         $("#document_zone").html(
//             `<div class="col-lg-6 offset-lg-3">
//             <!--begin::Alert-->
//             <div class="alert alert-info d-flex align-items-center p-5">
//                 <!--begin::Icon-->
//                 <svg class="me-4" style="height: 60px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#18dc53"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 8L12 12" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 16.01L12.01 15.9989" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 3H4V6" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 11V13" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20 11V13" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 3H20V6" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 21H4V18" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 21H20V18" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                
//                 <!--end::Icon-->

//                 <!--begin::Wrapper-->
//                 <div class="d-flex flex-column">
//                     <!--begin::Title-->
//                     <h4 class="mb-1 text-dark">Entrer le numéro d'authentification du document</h4>
//                     <!--end::Title-->

//                     <!--begin::Content-->
//                     <span>La vérification se ferra de manière automatique</span>
//                     <!--end::Content-->
//                 </div>
//                 <!--end::Wrapper-->
//             </div>
//             <!--end::Alert-->
//         </div>`
//         )
//     }
   
// }

// );
// Fonction pour traiter l'entrée
async function handleInput() {
    const inputElement = document.getElementById('basic-idrc');
    const inputValue = inputElement.value;

    if (inputValue !== "") {
        // Envoi de la requête
        var url = "/api_central/verify";

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idcr: inputValue })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let data = await response.json();

            if (data.status === 200) {
                // Enable button
                if (data.data.length !== 0) {
                    af_doc(true, data.data);
                } else {
                    af_doc(false, data.data);
                }
            } else {
                af_doc(false, "ok");
            }
        } catch (error) {
            console.error('Error:', error);
            af_doc(false, "ok");
        }

    } else {
        document.getElementById("document_zone").innerHTML = `
            <div class="col-lg-6 offset-lg-3">
                <!--begin::Alert-->
                <div class="alert alert-info d-flex align-items-center p-5">
                    <!--begin::Icon-->
                    <svg class="me-4" style="height: 60px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#18dc53"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 8L12 12" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 16.01L12.01 15.9989" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 3H4V6" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 11V13" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20 11V13" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 3H20V6" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 21H4V18" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 21H20V18" stroke="#095325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    
                    <!--end::Icon-->

                    <!--begin::Wrapper-->
                    <div class="d-flex flex-column">
                        <!--begin::Title-->
                        <h4 class="mb-1 text-dark">Entrer le numéro d'authentification du document</h4>
                        <!--end::Title-->

                        <!--begin::Content-->
                        <span>La vérification se ferra de manière automatique</span>
                        <!--end::Content-->
                    </div>
                    <!--end::Wrapper-->
                </div>
                <!--end::Alert-->
            </div>`;
    }
}

// Ajouter un écouteur d'événement pour l'entrée de l'utilisateur
document.getElementById('basic-idrc').addEventListener('input', handleInput);

// Exécuter la fonction lors du chargement de la page
document.addEventListener('DOMContentLoaded', handleInput);