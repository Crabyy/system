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

$database = new Database();

if ($database->dbState()) {
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $username = $requestData['username'];
    $email = $requestData['email'];

    $conn = $database->dbConn();

    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM admins WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);

    echo json_encode(['exists' => $result['count'] > 0]);
  } else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
  }
} else {
  http_response_code(500);
  echo json_encode(['error' => $database->errMsg()]);
}
