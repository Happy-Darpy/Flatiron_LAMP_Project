<?php
session_start();

  include_once 'connect.php';

  if ( isset($_POST['sca']) ) {
    $username = trim($_POST['username']);
    $pass = trim($_POST['pwd']);
    $password = hash('sha256', $pass);
    
    $query = "select userid, username, pass from people where username=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$username]);
    $count = $stmt->rowCount();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if( $count == 1 && $row['pass']==$password ) {
        $_SESSION['user'] = $row['userid'];
        header("Location: user_profile.htm");
    }
    else {
        $message = "Invalid Login";
    }
    $_SESSION['message'] = $message;
  }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Log In</title>
</head>

<body class="LogIn">
    <div class="LogIn">
    <form action="log-in.php" method="post" onsubmit="log_in_submit()">
        <label for="LogIn"><h4>Please LogIn</h4></label>
        <input type="text" name="username" required>
        <label for="password-log"><h4>Password</h4></label>
        <input type="password" name="pwd" required>
        <input type="submit" value="Submit" name="sca">
        <?php
           if ( isset($_POST['sca']) )
           {
             echo "<h2>$message</h2>";
           }

           if( isset($_SESSION['user'])!="" ) 
           {
             echo "<h3>Session Already Exists<h3></br>" .
                  "<h4>Log-In again or</h4></br>" .
                  "<h4><a href='logout.php'>Logout</a></h4></br>";
           }
        ?>
    </form>
    </div>
</body>
<script src="log-in.js" defer></script>
</html>