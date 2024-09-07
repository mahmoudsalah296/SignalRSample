let houseConnection = new signalR.HubConnectionBuilder()
    .withUrl('/hub/houseGroup').build();

let lbl_houseJoined = document.getElementById("lbl_houseJoined");

let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");


btn_gryffindor.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("JoinHouse", "Gryffindor")
})

btn_slytherin.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("JoinHouse", "Slytherin")
})

btn_hufflepuff.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("JoinHouse", "Hufflepuff")
})

btn_ravenclaw.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("JoinHouse", "Ravenclaw")
})


btn_un_gryffindor.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("LeaveHouse", "Gryffindor")
})

btn_un_slytherin.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("LeaveHouse", "Slytherin")
})

btn_un_hufflepuff.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("LeaveHouse", "Hufflepuff")
})

btn_un_ravenclaw.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("LeaveHouse", "Ravenclaw")
})


trigger_gryffindor.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("TriggerNotification", "Gryffindor")
})

trigger_slytherin.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("TriggerNotification", "Slytherin")
})

trigger_hufflepuff.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("TriggerNotification", "Hufflepuff")
})

trigger_ravenclaw.addEventListener("click", function (event) {
    event.preventDefault();
    houseConnection.send("TriggerNotification", "Ravenclaw")
})

houseConnection.on("subscriptionStatus", (strGroupJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupJoined;

    if (hasSubscribed) {
        switch (houseName) {
            case "slytherin":
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            case "gryffindor":
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case "hufflepuff":
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case "ravenclaw":
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            default:
                break;
        }
        toastr.success(`You have joined ${houseName} house successfully!`);
    } else {
        switch (houseName) {
            case "slytherin":
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            case "gryffindor":
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case "hufflepuff":
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case "ravenclaw":
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            default:
                break;
        }
        toastr.success(`You have left ${houseName} house successfully!`);
    }
})

houseConnection.on("newHouseJoined", (houseName) => {
    toastr.success("Someone has joined " + houseName + " house")
})

houseConnection.on("newHouseLeft", (houseName) => {
    toastr.warning("Someone has left " + houseName + " house")
})

houseConnection.on("triggerNotification", (houseName) => {
    toastr.success("New Notification from " + houseName + " has been triggered")
})

function fulfilled() { }
function rejected() { }

houseConnection.start().then(fulfilled, rejected);
