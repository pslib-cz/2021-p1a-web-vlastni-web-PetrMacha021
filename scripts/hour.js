window.addEventListener("DOMContentLoaded", async () => {
    let data = await axios.get("https://meteo.mapetr.cz/hour/temp").catch(err => console.error(err));
    data = data.data;
    let keysT = [];
    let keysD = [];
    let time = [];
    for (let i = 0; i < data.length; i++) {
        keysT.unshift(data[i].temperature);
        keysD.unshift(data[i].dewpoint);
        time.unshift(data[i].unix);
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
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
});