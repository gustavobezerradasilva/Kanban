<?php
$servername = "localhost"; // Altere para o seu servidor MySQL
$username = "root"; // Altere para o seu usuário MySQL
$password = ""; // Altere para a sua senha MySQL
$dbname = "kanban_system";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
?>
