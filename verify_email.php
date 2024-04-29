<?php
// Get token from query parameter
$token = $_GET['token'] ?? '';

// Find the email associated with the token (you need to implement database functionality)
$lines = file('email_tokens.txt');
foreach ($lines as $line) {
    list($email, $storedToken) = explode(':', $line);
    if (trim($storedToken) === trim($token)) {
        // Mark the email as verified (you need to implement this part)
        // For simplicity, we'll just output a success message
        echo "Email $email has been verified successfully!";
        // Remove token from the list as it's no longer needed
        // (you might also want to delete the entry from the database)
        file_put_contents('email_tokens.txt', str_replace($line, '', file_get_contents('email_tokens.txt')));
        exit;
    }
}

// If token is not found or invalid, display an error message
echo "Invalid or expired token!";
?>