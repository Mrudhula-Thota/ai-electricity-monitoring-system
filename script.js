// logout
function logout() {
    window.location.href = "login.html";
}

// load stored usage or default
let values = JSON.parse(localStorage.getItem("usageValues")) || [5, 7, 6, 8, 9];

let labels = JSON.parse(localStorage.getItem("usageDates")) || [
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5"
];

// add usage
function addUsage() {

    let input = document.getElementById("usageInput").value;

    if (input === "") {
        alert("Enter usage");
        return;
    }

    let today = new Date().toLocaleDateString();

    values.push(Number(input));
    labels.push(today);

    localStorage.setItem("usageValues", JSON.stringify(values));
    localStorage.setItem("usageDates", JSON.stringify(labels));

    location.reload();
}

// run after page loads
window.onload = function () {

    // today usage
    document.getElementById("todayUsage").innerText =
        "Today's Consumption: " + values[values.length - 1] + " kWh";

    // monthly usage
    let sum = values.reduce((a, b) => a + b, 0);

    document.getElementById("monthUsage").innerText =
        "Monthly Consumption: " + sum + " kWh";

    // table
    let table = document.getElementById("usageTable");
    table.innerHTML = "";

    values.forEach((val, i) => {

        let row = `<tr>
            <td>${labels[i]}</td>
            <td>${val}</td>
        </tr>`;

        table.innerHTML += row;
    });

    // chart
    let ctx = document.getElementById("usageChart");

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

    // prediction
    let avg = sum / values.length;

    let prediction = document.createElement("h3");
    prediction.innerText =
        "⚡ Predicted Tomorrow Usage: " + avg.toFixed(2) + " kWh";

    document.body.appendChild(prediction);
};