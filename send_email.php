<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $to = "yonasgetaw5444@gmail.com";
    $subject = "New Contact from Marvels Creative Website";
    $message = "A new user wants to contact you. Their email is: $email";
    $headers = "From: noreply@marvelscreative.com";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>