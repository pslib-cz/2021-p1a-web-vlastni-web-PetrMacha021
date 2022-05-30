const socket = io("https://meteo.mapetr.cz");
let lastUpdate = 0;

function windConv(str) {
    switch (str) {
        case "N":
            return "S";
        case "NE":
            return "SZ";
        case "E":
            return "Z";
        case "SE":
            return "JZ";
        case "S":
            return "J";
        case "SW":
            return "JV";
        case "W":
            return "V";
        case "NW":
            return "SV";
    }
}

setInterval(() => {
    if (lastUpdate === 0) return;
    document.getElementById("update").textContent = `Aktualizováno před ${(((new Date().getTime() / 1000)+1) - lastUpdate).toFixed(0)} sekundami`
}, 750);

socket.on("data", dat => {
    lastUpdate = dat[0];
    document.getElementById("update").textContent = `Aktualizováno před ${(((new Date().getTime() / 1000)+1) - lastUpdate).toFixed(0)} sekundami`
    document.getElementById("temp").textContent = `${dat[1]} °C`;
    document.getElementById("pressure").textContent = `${dat[2]} hPa`
    document.getElementById("humidity").textContent = `${dat[3]} %`;
    document.getElementById("windSpeed").textContent = `${(dat[4] / 3.6).toFixed(1)} m/s`;
    document.getElementById("windDirection").textContent = `${windConv(dat[5])}`;
    document.getElementById("rain").textContent = `${dat[6]} mm/hr`;
});

socket.on("error", err => {
    console.error(err);
})