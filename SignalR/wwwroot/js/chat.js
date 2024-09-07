let chatConnection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat").build();

let sendBtn = document.getElementById("sendMessage");
sendBtn.disabled = true;

chatConnection.on("newMessage", (sender, message) => {
    let li = document.createElement('li');
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${sender}: ${message}`;
});

sendBtn.addEventListener("click", event => {
    event.preventDefault();
    let sender = document.getElementById("senderEmail").value;
    let message = document.getElementById("chatMessage").value;
    let receiver = document.getElementById("receiverEmail").value;

    if (receiver.length > 0) {
        chatConnection.send("SendPrivateMessage", sender, receiver, message);
    } else {
        // send message to all users
        chatConnection.send("SendPublicMessage", sender, message);
    }
});

chatConnection.start().then(() =>
    sendBtn.disabled = false
);
