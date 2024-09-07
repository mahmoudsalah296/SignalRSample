let deathlyHallowconnection = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/deathlyHallows", signalR.HttpTransportType.WebSockets).build();

let cloakSpan = document.getElementById("cloakCounter");
let stoneSpan = document.getElementById("stoneCounter");
let wandSpan = document.getElementById("wandCounter");

deathlyHallowconnection.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
});

function fulfilled() {
    deathlyHallowconnection.invoke("GetRaceStatus").then(raceCounter => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    })
}

function rejected() {

}

deathlyHallowconnection.start().then(fulfilled, rejected);