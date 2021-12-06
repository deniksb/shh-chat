
const socket = io()

const chat = document.querySelector('.chat-form')
const Input = document.querySelector('#chat-box')
const Username = document.querySelector('#username-box')

const chatWindow = document.querySelector('.chat-window')

let username;



chat.addEventListener('submit', event => {
  event.preventDefault()
  socket.emit('chat', Username.value + ': '+ Input.value)
  Input.value = ''
})



function renderMessage(message){
    const div = document.createElement('div')
    div.classList.add('render-message')

    div.innerText = message
    let displayedMessages = document.getElementsByClassName('render-message');
    let characterCount = 0;
    for(let i=0; i<displayedMessages.length;i++){
      characterCount += (displayedMessages[i].innerHtml).length;
    }
    if( characterCount + message.length <= 310){
      chatWindow.appendChild(div)
    }
    else {
      chatWindow.removeChild(displayedMessages[0])
      chatWindow.removeChild(displayedMessages[1])
      chatWindow.appendChild(div)
    }
    
  }



socket.on('chat', message => {
    renderMessage(message);
  })
