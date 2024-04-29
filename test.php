<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();

$username = trim($_POST['UserName']);
  $fname = trim($_POST['FirstName']);
  $lname = trim($_POST['LastName']);
  $pass = trim($_POST['password']);
  $email = trim($_POST['email']);
  $password = hash('sha256', $pass);

  error_log("username is :" . $username);

  session_destroy();

  ?>



