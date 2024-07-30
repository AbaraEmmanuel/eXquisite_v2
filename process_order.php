<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $address = htmlspecialchars($_POST['address']);
    $menuItem = htmlspecialchars($_POST['menu-item']);
    $size = htmlspecialchars($_POST['size']);
    $paymentMethod = htmlspecialchars($_POST['payment-method']);

    if ($paymentMethod == "bank-transfer") {
        // Redirect to bank transfer page
        header("Location: bank_transfer.php?item=$menuItem&size=$size");
        exit();
    }

    // For credit card payments, you might handle it differently
    // Save or process the order (e.g., store in database, send email)
    // For demonstration purposes, we're just echoing the values
    echo "<h1>Order Received</h1>";
    echo "<p>Thank you, $name. Your order for $size of $menuItem has been received.</p>";
    echo "<p>Delivery Address: $address</p>";
    echo "<p>Payment Method: $paymentMethod</p>";
    echo "<p>We will contact you at $phone or $email.</p>";
} else {
    echo "<h1>Error</h1>";
    echo "<p>Invalid request method.</p>";
}
?>
