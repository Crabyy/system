<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: http://localhost:9000");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  http_response_code(200);
  exit;
}

header("Access-Control-Allow-Origin: http://localhost:9000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once('../../config/dbcon.php');

// Create a new Database instance
$database = new Database();

// Check if the database connection is successful
if ($database->dbState()) {
    // Signin endpoint
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $requestData = json_decode(file_get_contents('php://input'), true);
        $identifier = $requestData['identifier']; // This can be either email or username
        $password = $requestData['password'];

        // Use the database connection from the Database class
        $conn = $database->dbConn();

        // Prepare and execute the SQL statement to check both email and username
        $stmt = $conn->prepare("SELECT * FROM admins WHERE email = :identifier OR username = :identifier");
        $stmt->execute(['identifier' => $identifier]);

        // Fetch the user data
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            // Login successful
            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            // Login failed
            http_response_code(401); // Unauthorized
            echo json_encode(['error' => 'Invalid email or username or password']);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Invalid request']);
    }
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => $database->errMsg()]);
}
?>
