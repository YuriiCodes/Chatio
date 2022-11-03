const socket = io()

console.log("scipt loaded succesfully")

const form = document.querySelector("#msgForm")
const nameInput = document.querySelector("#name")
const messageInput = document.querySelector("#message")


const addMessage = function(name, text){
    const chatWindow = document.querySelector("#chatWindow")
    const li = document.createElement("li")
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start")

        li.innerHTML =
            `<div class="ms-2 me-auto">
            <div class="fw-bold">${name}</div>
            ${text}
            </div>`
        chatWindow.appendChild(li);

}

form.addEventListener("submit", e => {
    e.preventDefault();
    const name = nameInput.value.replace("<", "").replace(">", "")
    const message = messageInput.value.replace("<", "").replace(">", "")
    if ( name !== "" &&  message!== "") {
        socket.emit("newMsg", {name: name, message: message})
        messageInput.value = ''
    }
    
}, false)


socket.on('newMsg', (data) => {
    addMessage(data.name, data.message)
} )

console.log(form)


