<?php
session_start();
include 'db_connect.php';

$user_id = $_SESSION['user_id'];
$consumption = $_POST['consumption'];

// temporary user_id = 1 (we improve later)
$sql = "INSERT INTO electricity_usage (user_id, consumption, usage_date)
        VALUES ('$user_id', '$consumption', CURDATE())";

if ($conn->query($sql) === TRUE) {
    header("Location: ../frontend/dashboard.html");
} else {
    echo "Error: " . $conn->error;
}
?>