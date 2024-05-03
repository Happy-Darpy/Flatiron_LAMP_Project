<?php
  session_start();

  require_once 'connect.php';

  if(!isset($_SESSION['user'])){
    header("Location: log-in.php");
    exit;
  }

  $query = "SELECT * FROM people WHERE userid=?";
  $stmt = $pdo->prepare($query);
  $stmt->execute([$_SESSION['user']]);
  $userRow = $stmt->fetch(PDO::FETCH_ASSOC);
  $fname = $userRow['fname'];
  $lname = $userRow['lname'];
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    <title>User Profile Page</title>
</head>

<body class="main">
    <div class="main">
        <form class="main" action="logout.php" method="post">
            <table>
                <tr>
                    <td>First Name:</td>
                    <td><?php echo $fname; ?></td>
                </tr>
                <tr>
                    <td>Last Name:</td>
                    <td><?php echo $lname; ?></td>
                </tr>
                <tr>
                    <td>Email Address:</td>
                    <td>sample@example.com</td>
                </tr>
            </table>
            <input type="submit" method="post" name="logout" value="LOGOUT">
        </form>
    </div>
</body>
</html>