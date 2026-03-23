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

    alert("Demo usage added");
}

// wait until page loads
window.onload = function () {

    let labels = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri"
    ];

    let values = [5, 7, 6, 8, 9];

    // today usage
    document.getElementById("todayUsage").innerText =
        "Today's Consumption: " + values[4] + " kWh";

    // monthly usage
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
    let ctx = document.getElementById("usageChart");

    if (ctx) {
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
    } else {
        console.log("Canvas not found");
    }

    // prediction
    let avg = sum / values.length;

    let prediction = document.createElement("h3");
    prediction.innerText =
        "⚡ Predicted Tomorrow Usage: " + avg.toFixed(2) + " kWh";

    document.body.appendChild(prediction);
};