// logout
function logout() {
    window.location.href = "login.html";
}

// add usage (demo)
function addUsage() {
    let value = document.getElementById("usageInput").value;

    if (value === "") {
        alert("Enter usage");
        return;
    }

    alert("Demo mode: Usage added");

    location.reload();
}

// Demo Data for Netlify
let labels = [
    "2026-03-01",
    "2026-03-02",
    "2026-03-03",
    "2026-03-04",
    "2026-03-05"
];

let values = [5, 7, 6, 8, 9];

// today usage
document.getElementById("todayUsage").innerText =
    "Today's Consumption: " + values[values.length - 1] + " kWh";

// month usage
let sum = values.reduce((a, b) => a + b, 0);

document.getElementById("monthUsage").innerText =
    "Monthly Consumption: " + sum + " kWh";

// table
let table = document.getElementById("usageTable");

values.forEach((val, i) => {

    let row = `<tr>
        <td>${labels[i]}</td>
        <td>${val}</td>
    </tr>`;

    table.innerHTML += row;
});

// chart
let ctx = document.getElementById("usageChart").getContext("2d");

new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Electricity Usage",
            data: values,
            borderWidth: 2
        }]
    }
});

// AI Prediction
let avg = sum / values.length;

document.body.innerHTML +=
    `<h3>⚡ Predicted Tomorrow Usage: ${avg.toFixed(2)} kWh</h3>`;