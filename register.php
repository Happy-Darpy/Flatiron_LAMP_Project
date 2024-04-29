<?php
session_start();

if( isset($_SESSION['user'])!="" ){
header("Location: profile.php");
}

include_once 'connect.php';

if ( isset($_POST['sca']) ) {
  $username = trim($_POST['UserName']);
  $fname = trim($_POST['FirstName']);
  $lname = trim($_POST['LastName']);
  $pass = trim($_POST['password']);
  $email = trim($_POST['email']);
  $password = hash('sha256', $pass);

  $query = "insert into people(username,fname,lname,pass) values(?, ?, ?, ?)";
  $stmt = $pdo->prepare($query);
  $stmt->execute([$username,$fname,$lname,$password]);
  $rowsAdded = $stmt->rowCount();

  if ($rowsAdded == 1) {
    $message = "Success! Proceed to login";
    unset($fname);
    unset($lname);
    unset($pass);
    header("Location: formSubmission.htm");
  }
  else
  {
    $message = "Failed! For some reason";
  }
}
?>