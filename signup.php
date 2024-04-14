<?php

$hostname = 'localhost';
$username = 'root';
$password = '';
$dbname = '3340Final';

// Create connection
$conn=mysqli_connect($hostname,$username,$password,$dbname); 

// Check connection
if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

// get html signup form data
$fname = trim($_POST['fname']);
$lname = trim($_POST['lname']);
$pnumber = trim($_POST['pnumber']);
$email = trim($_POST['email']);
$password = trim($_POST['password']);

//check if email is already registered
$sqlSelect = "SELECT * 
            FROM shopUsers
            WHERE email='$email'";

$result = mysqli_query($conn, $sqlSelect);
if (mysqli_num_rows($result) > 0){          //email already exists in database. return to homepage with error
    header("Location: index.html?error=102");
    exit();
}

// otherwise, insert form data into shopUsers table in database
$sqlInsert = "INSERT INTO shopUsers (fname, lname, pnumber, email, password) 
            VALUES ('$fname', '$lname', '$pnumber', '$email', '$password')";

if (mysqli_query($conn, $sqlInsert)){
    echo "User added successfully.";
} else{
    echo "ERROR: Could not execute query: $sqlInsert. " . mysqli_error($conn);
}

// begin session
session_start();
$_SESSION["email"] = $email;

// redirect to next page
header("Location: shop.html");
exit();
?> 