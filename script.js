const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

// Load messages from JSON file
fetch('messages.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(message => {
            displayMessage(message);
        });
    });

function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
        const messageObj = { text: message, timestamp: new Date().toLocaleString() };
        displayMessage(messageObj);
        saveMessage(messageObj);
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${message.timestamp}</strong>: ${message.text}`;
    chatBox.appendChild(messageElement);
}

function saveMessage(message) {
    fetch('messages.json')
        .then(response => response.json())
        .then(data => {
            data.push(message);
            return data;
        })
        .then(updatedData => {
            fetch('messages.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });
        });
}
