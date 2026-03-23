// Add Usage
function addUsage() {

    let units = document.getElementById("usageInput").value;

    if (units == "") {
        alert("Enter units");
        return;
    }

    fetch("backend/add_usage.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "consumption=" + units
    })
    .then(res => res.text())
    .then(data => {
        alert("Usage Added Successfully");
        location.reload();
    });

}


// Logout
function logout() {
    window.location.href = "backend/logout.php";
}


// Load Summary
fetch("backend/fetch_summary.php")
.then(res => res.json())
.then(data => {

    document.getElementById("todayUsage").innerText =
        "Today's Consumption: " + data.today + " kWh";

    document.getElementById("monthUsage").innerText =
        "Monthly Consumption: " + data.month + " kWh";
});


// Load Chart
fetch("backend/fetch_usage.php")
.then(response => response.json())
.then(data => {

    console.log(data); // check in console

    let labels = [];
    let values = [];

    data.forEach(item => {
        labels.push(item.usage_date);
        values.push(item.consumption);
    });

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

});


// Load Table
fetch("backend/fetch_usage.php")
.then(res => res.json())
.then(data => {

    let table = document.getElementById("usageTable");

    table.innerHTML = "";

    data.forEach(item => {

        let row = `
            <tr>
                <td>${item.usage_date}</td>
                <td>${item.consumption}</td>
            </tr>
        `;

        table.innerHTML += row;
    });

});

// AI Prediction
fetch("backend/fetch_usage.php")
.then(res => res.json())
.then(data => {

    let values = [];

    data.forEach(item => {
        values.push(parseFloat(item.consumption));
    });

    if(values.length > 0) {

        let sum = values.reduce((a, b) => a + b, 0);
        let avg = sum / values.length;

        let prediction = avg.toFixed(2);

        let pred = document.createElement("h3");

        pred.innerText = "⚡ Predicted Tomorrow Usage: " + prediction + " kWh";

        document.body.appendChild(pred);
    }

});