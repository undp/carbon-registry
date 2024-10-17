document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

const chatBox = document.getElementById('chat-box');
const APIBOX= $("#ai_message");
const APIBOX2=document.getElementById('ai_message');
const messageInput = document.getElementById('message-input');

async function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;

    appendMessage(message, 'user');
    let go ={
        sourceId: data_ia.source,
        
  messages: [
    {
      role: "user",
      content: message,
    },
  ],
    }
    try {
        const response = await axios.post('https://api.chatpdf.com/v1/chats/message', go, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': data_ia.api_key
            }
        });
        console.log(response.data)
        if (response.data && response.data.content) {
            let infomark =marked.parse(response.data.content)
            appendMessage(infomark, 'bot');
        } else {
            appendMessage('Pas de reponse', 'bot');
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('Error communication API.', 'bot');
    }

    messageInput.value = '';
}

function appendMessage(message, sender) {
  console.log(sender)

    if(sender==="bot"){
        APIBOX.append(`<div class="d-flex justify-content-start mb-10">
                        <!--begin::Wrapper-->
                        <div class="d-flex flex-column align-items-start">
                            <!--begin::User-->
                            <div class="d-flex align-items-center mb-2">
                                <!--begin::Avatar-->
                                <div class="symbol symbol-35px symbol-circle">
                                    <img alt="Pic" src="/ext/ai/ai.jpg">
                                </div>
                                <!--end::Avatar-->
                                <!--begin::Details-->
                                <div class="ms-3">
                                    <a href="#" class="fs-5 fw-bold text-gray-900 text-hover-primary me-1">Register AI</a>
                            
                                </div>
                                <!--end::Details-->
                            </div>
                            <!--end::User-->
                            <!--begin::Text-->
                            <div class="p-5 rounded bg-light-info text-dark fw-semibold mw-lg-400px text-start" data-kt-element="message-text">${message}</div>
                            <!--end::Text-->
                        </div>
                        <!--end::Wrapper-->
                    </div>`)
    }else{
        APIBOX.append(`<div class="d-flex justify-content-end mb-10">
                        <!--begin::Wrapper-->
                        <div class="d-flex flex-column align-items-end">
                            <!--begin::User-->
                            <div class="d-flex align-items-center mb-2">
                                <!--begin::Details-->
                                <div class="me-3">
                                  
                                    <a href="#" class="fs-5 fw-bold text-gray-900 text-hover-primary ms-1">Vous</a>
                                </div>
                                <!--end::Details-->
                                <!--begin::Avatar
                                <div class="symbol symbol-35px symbol-circle">
                                    <img alt="Pic" src="/assets/media/avatars/300-1.jpg">
                                </div>
                             end::Avatar-->
                            </div>
                            <!--end::User-->
                            <!--begin::Text-->
                            <div class="p-5 rounded bg-light-primary text-dark fw-semibold mw-lg-400px text-end" data-kt-element="message-text">${message}</div>
                            <!--end::Text-->
                        </div>
                        <!--end::Wrapper-->
                    </div>`)
    }

      // const messageElement = document.createElement('div');
    // messageElement.className = `message ${sender}-message`;
    // messageElement.textContent = message;
    // chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    APIBOX2.scrollTop=APIBOX2.scrollHeight;
    window.scrollTo({
        top: document.body.scrollHeight, 
        behavior: 'smooth'
      });
}
