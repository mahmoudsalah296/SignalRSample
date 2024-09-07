let notificationConnection = new signalR.HubConnectionBuilder()
    .withUrl('/hubs/notification').build();

let notificationInput = document.getElementById("notificationInput");
let sendBtn = document.getElementById("sendButton");
let messageList = document.getElementById("messageList");
let notificationCounter = document.getElementById("notificationCounter");

sendBtn.addEventListener("click", event => {
    event.preventDefault();
    notificationConnection.send("SendNotification", notificationInput.value.trim())
    notificationInput.value = '';
})



notificationConnection.on("newMessageSent", (messages, notificationCount) => {
    messageList.innerHTML = '';
    notificationCounter.innerText = notificationCount;
    notificationCounter.innerHTML = `<span>(${notificationCount})</span>`
    for (var i = messages.length - 1; i >= 0; i--) {
        let li = document.createElement('li');
        li.textContent = `Notification - ${messages[i]}`;
        messageList.appendChild(li);
    }
})

notificationConnection.start().then(function () {
    notificationConnection.send('SendNotification', 'fetch')
})