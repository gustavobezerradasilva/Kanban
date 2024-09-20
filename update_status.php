<?php
$servername = "localhost";
$username = "root";
$password = ""; // Substitua pela sua senha
$dbname = "kanban_db";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $taskId = $_POST['taskId'];
    $newStatus = $_POST['newStatus'];

    // Alterar status da tarefa
    updateTaskStatus($taskId, $newStatus);

    echo "Status atualizado com sucesso";
}

function updateTaskStatus($taskId, $newStatus) {
    global $conn;

    // Atualizar status da tarefa
    $stmt = $conn->prepare("UPDATE tasks SET status=? WHERE id=?");
    $stmt->bind_param("si", $newStatus, $taskId);
    $stmt->execute();

    // Registrar o histórico de status
    $stmt = $conn->prepare("INSERT INTO task_status_history (task_id, status) VALUES (?, ?)");
    $stmt->bind_param("is", $taskId, $newStatus);
    $stmt->execute();

    $stmt->close();
}

$conn->close();
?>
