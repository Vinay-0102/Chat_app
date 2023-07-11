
var socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });

const myForm = document.getElementById("formContiner");
const msgInput = document.getElementById("myInputMessage");
const messageContainer = document.querySelector(".container");
var audio = new Audio("./js/sound.mp3");

const append_ = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if (position == 'left') {
        audio.play();
    }

}

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const curMessage = msgInput.value;
    append_(`You : ${curMessage}`, 'right');
    socket.emit('send_msg', curMessage);
    msgInput.value = "";
})

const name = prompt("Enter Your Name ");
// console.log(name);
socket.emit('new_user_joined', name);

socket.on('user_joined', name => {
    append_(`${name} joined the chat`, 'right');
})

socket.on('receive_msg', data => {
    append_(`${data.name} : ${data.message}`, 'left');
})

socket.on('left', name => {
    append_(` ${name} left the chat !!`, 'left');
})


