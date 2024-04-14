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
$email = trim($_POST['email']);
$password = trim($_POST['password']);

// get password for given email from shopUsers
$sqlSelect = "SELECT password 
            FROM shopUsers
            WHERE email='$email'";

$result = mysqli_query($conn, $sqlSelect);
if ($result){
    $qPassword = mysqli_fetch_assoc($result)["password"];

    if ($password == $qPassword){       //password matched, sign in successful
        // begin session
        session_start();
        $_SESSION["email"] = $email;
        header("Location: shop.html");
        exit();
    }
    else if ($qPassword == ""){         //email not found, return to home page with error 100
        header("Location: index.html?error=100");
        exit();
    }
    else {                              //password incorrect, return to home page with error 101
        header("Location: index.html?error=101");
        exit();
    }

} else{
    echo "ERROR: Could not execute query: $sqlSelect. " . mysqli_error($conn);
}

?> 