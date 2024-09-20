<?php
// Conectar ao banco de dados
$servername = "localhost"; // Altere para o seu servidor de banco de dados
$username = "root"; // Altere para o seu usuário de banco de dados
$password = ""; // Altere para a sua senha de banco de dados
$dbname = "kanban_db"; // Altere para o nome do seu banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Receber dados via POST
$title = $_POST['title'];
$description = $_POST['description'];
$clientWhatsapp = $_POST['clientWhatsapp'];
$createdAt = date('Y-m-d H:i:s'); // Data e hora atuais

// Inserir dados no banco de dados
$sql = "INSERT INTO tasks (title, description, client_whatsapp, created_at) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $title, $description, $clientWhatsapp, $createdAt);

if ($stmt->execute()) {
    echo "Tarefa salva com sucesso!";
} else {
    echo "Erro: " . $stmt->error;
}

// Fechar conexão
$stmt->close();
$conn->close();
?>
