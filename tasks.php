<?php
include 'db.php';

// Define o cabeçalho de resposta JSON
header('Content-Type: application/json');

// Adiciona uma nova tarefa
if (isset($_POST['action']) && $_POST['action'] == 'add') {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $client_whatsapp = $_POST['client_whatsapp'];

    // Verificar se os dados estão recebendo corretamente
    if (empty($title) || empty($description) || empty($client_whatsapp)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos os campos são obrigatórios.']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO tasks (title, description, client_whatsapp) VALUES (?, ?, ?)");
    if (!$stmt) {
        echo json_encode(['status' => 'error', 'message' => 'Erro na preparação da consulta: ' . $conn->error]);
        exit;
    }
    $stmt->bind_param("sss", $title, $description, $client_whatsapp);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $stmt->error]);
    }
    $stmt->close();
}

$conn->close();
?>
