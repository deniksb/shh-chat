
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
    chatWindow.appendChild(div)
  }



socket.on('chat', message => {
    renderMessage(message);
  })