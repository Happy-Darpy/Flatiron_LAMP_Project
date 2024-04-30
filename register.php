<?php
session_start();

if( isset($_SESSION['user'])!="" ){
header("Location: log-in.php");
}

include_once 'connect.php';

if ( isset($_POST['submit']) ) {
  $username = trim($_POST['UserName']);
  $fname = trim($_POST['FirstName']);
  $lname = trim($_POST['LastName']);
  $pass = trim($_POST['password']);
  $email = trim($_POST['email']);
  $password = hash('sha256', $pass);

  //Make sure there isn't any duplicate username
  $query = "select * from people where username= :value";
  $stmt = $pdo->prepare($query);
  $stmt->bindParam(':value',$username);
  $stmt->execute();
  $userCount = $stmt->rowCount();

  if ($userCount > 0) {
    $msg = urlencode("yes");
    header("Location: Create-Acct.htm?userexist=$msg");
    exit();
  }

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
    error_log($message);
  }
}
?>