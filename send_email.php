<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get email address from the request
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;

    // Generate verification token (you can use any method, such as random string)
    $token = bin2hex(random_bytes(16));

    // Store email and token in the database (you need to implement database functionality)
    // For simplicity, we'll just store it in a text file
    // file_put_contents('email_tokens.txt', "$email:$token\n", FILE_APPEND);

    // Send verification email
    $subject = "Email Verification";
    $message = "Click the following link to verify your email address: http://example.com/verify.php?token=$token";
    $headers = "From: your_email@example.com\r\n";
    //can't do this now
    //mail($email, $subject, $message, $headers); can't do this right now

    // Send response to client
    echo json_encode(['message' => 'Verification email sent successfully']);
}
?>