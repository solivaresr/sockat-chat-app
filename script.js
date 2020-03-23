// contiene todo el javasript del cliente

const socket = io('http://localhost:3000') // donde está el socket del servidor
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Indique su nombre')
appendMessage('Bienvenido')
socket.emit('new-user', name)

// recibe el mensaje del servidor
socket.on('chat-message', data => {// data contiene el mensaje enviado
  appendMessage(`${data.name}: ${data.message}`)
})

// captura el submit(click) del boton
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value // captura el mensaje 
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

// recibe el mensaje
socket.on('user-connected', name => {// data contiene el mensaje enviado
  appendMessage(`${name} disconnected`)
})

// recibe el mensaje
socket.on('user-disconnected', name => {// data contiene el mensaje enviado
  appendMessage(`${name} connected`)
})


// Se encarga de mostar el mensaje en html
function appendMessage(message){
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}