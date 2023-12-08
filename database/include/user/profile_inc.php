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
// Your existing CORS headers

require_once('../../config/dbcon.php');

$database = new Database();

if ($database->dbState()) {

  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Assuming you have user authentication in place, get the user ID based on their session or token
    // Replace this with your authentication logic
    $userId = 1; // Replace with the actual user ID

    $conn = $database->dbConn();

    $stmt = $conn->prepare("SELECT id, givenname, middlename, surname, email, username, contactnumber, birthdate, gender FROM users WHERE id = :id AND status = 1");
    $stmt->bindParam(':id', $userId);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($result);
    exit;
  } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Your existing POST logic
  } else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
    exit;
  }
} else {
  http_response_code(500);
  echo json_encode(['error' => $database->errMsg()]);
}