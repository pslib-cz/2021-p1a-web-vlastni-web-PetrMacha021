function degConv(dir) {
    switch (dir) {
        case "N":
            return 0;
        case "NE":
            return 45;
        case "E":
            return 90;
        case "SE":
            return 135;
        case "S":
            return 180;
        case "SW":
            return 225;
        case "W":
            return 270;
        case "NW":
            return 315;
        default:
            return 0;
    }
}

async function temperature() {
    let data = await axios.get("https://meteo.mapetr.cz/hour/temp").catch(err => console.error(err));
    data = data.data;
    let keysT = [];
    let keysD = [];
    let time = [];
    for (let i = 0; i < data.length; i++) {
        keysT.unshift(data[i].temperature);
        keysD.unshift(data[i].dewpoint);
        time.unshift(new Date(data[i].unix * 1000).toLocaleTimeString("cs-cz"));
    }
    new Chart(document.getElementById("temp"), {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                label: "Teplota (°C)",
                backgroundColor: "#9e788fff",
                borderColor: "#9e788fff",
                data: keysT
            },
                {
                    label: "Rosný bod (°C)",
                    backgroundColor: "#7cdedcff",
                    borderColor: "#7cdedcff",
                    data: keysD
                }]
        },
        options: {
            maintainAspectRatio: false
        }
    });
}

async function humidity() {
    let data = await axios.get("https://meteo.mapetr.cz/hour/humidity").catch(err => console.error(err));
    data = data.data;
    let keysH = [];
    let time = [];
    for (let i = 0; i < data.length; i++) {
        keysH.unshift(data[i].humidity);
        time.unshift(new Date(data[i].unix * 1000).toLocaleTimeString("cs-cz"));
    }
    new Chart(document.getElementById("humidity"), {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                label: "Vlhkost (%)",
                backgroundColor: "#7cdedcff",
                borderColor: "#7cdedcff",
                data: keysH
            }]
        },
        options: {
            maintainAspectRatio: false
        }
    });
}

async function pressure() {
    let data = await axios.get("https://meteo.mapetr.cz/hour/pressure").catch(err => console.error(err));
    data = data.data;
    let keysP = [];
    let time = [];
    for (let i = 0; i < data.length; i++) {
        keysP.unshift(data[i].pressure);
        time.unshift(new Date(data[i].unix * 1000).toLocaleTimeString("cs-cz"));
    }
    new Chart(document.getElementById("pressure"), {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                label: "Tlak (hPa)",
                backgroundColor: "#7284a8ff",
                borderColor: "#7284a8ff",
                data: keysP
            }]
        },
        options: {
            maintainAspectRatio: false
        }
    });
}

async function wind_speed() {
    let data = await axios.get("https://meteo.mapetr.cz/hour/winds").catch(err => console.error(err));
    data = data.data;
    let keysS = [];
    let keysD = [];
    let time = [];
    for (let i = 0; i < data.length; i++) {
        keysS.unshift(data[i].wind_speed);
        keysD.unshift(degConv(data[i].wind_direction));
        time.unshift(new Date(data[i].unix * 1000).toLocaleTimeString("cs-cz"));
    }
    new Chart(document.getElementById("windS"), {
        type: "line",
        data: {
            labels: time,
            datasets: [{
                label: "Rychlost větru (m/s)",
                backgroundColor: "#9e788fff",
                borderColor: "#9e788fff",
                data: keysS
            }]
        },
        options: {
            maintainAspectRatio: false
        }
    });/*
    new Chart(document.getElementById("windD"), {
        type: "scatter",
        data: {
            datasets: [{
                label: "Směr větru",
                data: dataa,
                backgroundColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "linear",
                    position: "bottom"
                }
            }
        }
    });*/
}

window.addEventListener("DOMContentLoaded", async () => {
    temperature();
    humidity();
    pressure();
    wind_speed();
});