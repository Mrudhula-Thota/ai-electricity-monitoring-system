<?php
include 'db_connect.php';

// Today's usage
$today_sql = "SELECT SUM(consumption) AS today_total 
              FROM electricity_usage 
              WHERE usage_date = CURDATE()";

$today_result = $conn->query($today_sql);
$today_row = $today_result->fetch_assoc();

// Monthly usage
$month_sql = "SELECT SUM(consumption) AS month_total 
              FROM electricity_usage 
              WHERE MONTH(usage_date) = MONTH(CURDATE())";

$month_result = $conn->query($month_sql);
$month_row = $month_result->fetch_assoc();

$data = [
    "today" => $today_row['today_total'] ?? 0,
    "month" => $month_row['month_total'] ?? 0
];

echo json_encode($data);
?>