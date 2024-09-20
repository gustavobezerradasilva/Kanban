// Variável global para armazenar o ID da tarefa sendo editada
let editingTaskId = null;

// Adicionar tarefa
document.getElementById('addTaskForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const clientWhatsapp = document.getElementById('clientWhatsapp').value;
    const now = new Date().toLocaleString(); // Data e hora atuais
    const cardId = editingTaskId || 'card-' + new Date().getTime();
    
    const card = document.getElementById(cardId) || document.createElement('div');
    card.className = 'card kanban-card';
    card.id = cardId;
    card.draggable = true;
    card.ondragstart = drag;
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <p class="card-text"><small class="text-muted">${now}</small></p>
            <p class="card-text"><small class="text-muted">WhatsApp: ${clientWhatsapp}</small></p>
            <div class="card-buttons">
                <a href="https://wa.me/${clientWhatsapp}" class="btn btn-success btn-sm" target="_blank">WhatsApp</a>
                <button class="btn btn-warning btn-sm" onclick="editTask('${cardId}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask('${cardId}')">Excluir</button>
            </div>
        </div>`;
    
    // Verifica a coluna padrão para adicionar a tarefa
    const defaultColumnId = 'doing'; // Ajuste conforme necessário
    if (!document.getElementById(cardId)) {
        document.getElementById(defaultColumnId).appendChild(card); 
    }

    $('#addTaskModal').modal('hide');
    editingTaskId = null; // Reset ID após a tarefa ser salva
});

// Funções de arrastar e soltar
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const card = document.getElementById(data);
    if (card) {
        const targetColumn = event.target.closest('.kanban-column');
        if (targetColumn && !card.classList.contains('completed')) {
            if (targetColumn.id === 'done') {
                card.classList.add('completed');
                alert("Tarefa concluída!");
            }
            targetColumn.appendChild(card);
            updateTaskStatus(card.id, targetColumn.querySelector('h4').innerText); // Atualiza o status da tarefa
        } else if (card.classList.contains('completed')) {
            alert("Tarefa já concluída!");
        }
    }
}

// Editar Tarefa
function editTask(cardId) {
    const card = document.getElementById(cardId);
    document.getElementById('taskTitle').value = card.querySelector('.card-title').innerText;
    document.getElementById('taskDescription').value = card.querySelector('.card-text').innerText.split('\n')[0];
    document.getElementById('clientWhatsapp').value = card.querySelector('.card-text').innerText.split('WhatsApp: ')[1];
    
    // Salva o ID da tarefa sendo editada
    editingTaskId = cardId;
    
    $('#addTaskModal').modal('show');
}

// Excluir Tarefa
function deleteTask(cardId) {
    const card = document.getElementById(cardId);
    if (confirm("Você tem certeza que deseja excluir esta tarefa?")) {
        card.remove();
    }
}

// Atualizar status da tarefa via AJAX
function updateTaskStatus(taskId, newStatus) {
    fetch('update_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `taskId=${taskId}&newStatus=${newStatus}`
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); // Sucesso ou erro
    })
    .catch(error => console.error('Erro:', error));
}

// Configuração do menu de configurações
document.getElementById('settingsMenu').addEventListener('click', function() {
    const submenu = document.getElementById('settingsSubmenu');
    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
});
