<?php

session_start();
include 'db_connect.php';

$user_id = $_SESSION['user_id'];

$sql = "SELECT usage_date, consumption 
        FROM electricity_usage 
        WHERE user_id='$user_id'
        ORDER BY usage_date";

$result = $conn->query($sql);

$data = array();

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

?>