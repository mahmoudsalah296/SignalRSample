// create connection
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build();

// connect to methods that are defined in the hub
connection.on("updateTotalViews", value => {
    let countSpan = document.getElementById("totalViewsCounter");
    countSpan.innerHTML = value.toString();
});

connection.on("updateTotalUsers", value => {
    let countSpan = document.getElementById("totalUsersCounter");
    countSpan.innerHTML = value.toString();
});

// send notification to hub
function newWindowLoadedOnClient() {
    //connection.send("NewWindowLoaded");
    // if we return a value we use invoke
    connection.invoke("NewWindowLoaded").then(value => console.log(value));

}

// start connection
function fulfilled() {
    console.log("Connected successfully to the hub");
    newWindowLoadedOnClient();
}
function rejected() { }

connection.start().then(fulfilled, rejected);