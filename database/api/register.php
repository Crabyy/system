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
// Set content type to JSON

require_once('../config/dbcon.php');

// Create a new Database instance
$database = new Database();

// Check if the database connection is successful
if ($database->dbState()) {
  // Register endpoint
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $givenname = $requestData['givenname'];
    $middlename = $requestData['middlename'];
    $surname = $requestData['surname'];
    $email = $requestData['email'];
    $username = $requestData['username'];
    $password = password_hash($requestData['password'], PASSWORD_DEFAULT);
    $contactnumber = $requestData['contactnumber'];
    $birthdate = $requestData['birthdate'];
    $gender = $requestData['gender'];

    // Use the database connection from the Database class
    $conn = $database->dbConn();

    // Prepare and execute the SQL statement
    $stmt = $conn->prepare("INSERT INTO users (role, status, givenname, middlename, surname, email, username, password, contactnumber, birthdate, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $role = 'user';
    $status = '1';

    $stmt->execute([$role, $status, $givenname, $middlename, $surname, $email, $username, $password, $contactnumber, $birthdate, $gender]);

    echo json_encode(['message' => 'Registration successful']);
  } else {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Invalid request']);
  }
} else {
  http_response_code(500); // Internal Server Error
  echo json_encode(['error' => $database->errMsg()]);
}
