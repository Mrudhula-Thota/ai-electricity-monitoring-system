<?php

session_start();
include 'db_connect.php';

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users 
        WHERE email='$email' AND password='$password'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();

    $_SESSION['user_id'] = $row['id'];

   header("Location: ../dashboard.html");

} else {

    echo "Invalid Login";
}

?>