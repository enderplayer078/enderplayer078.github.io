// script.js
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCE4mHHvfUhfYXlGELaqCT1477VVztaEP8",
  authDomain: "chat-f59a6.firebaseapp.com",
  projectId: "chat-f59a6",
  storageBucket: "chat-f59a6.appspot.com",
  messagingSenderId: "50596628510",
  appId: "1:50596628510:web:4bd261c433df8f1767860f",
  measurementId: "G-H4FS11QQG4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var chatRef = database.ref('chat');

function submitText() {
    var inputText = document.getElementById('input-text').value;
    if (inputText.trim() === 'Test') {
        document.getElementById('input-page').style.display = 'none';
        document.getElementById('chat-page').style.display = 'block';
        loadChat();
    } else {
        alert('Please type "Test"');
    }
}

function loadChat() {
    chatRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayMessage(message);
    });
}

function displayMessage(message) {
    var chatBox = document.getElementById('chat-box');
    var messageDiv = document.createElement('div');
    messageDiv.textContent = message.timestamp + ' - ' + message.text;
    chatBox.appendChild(messageDiv);
}

function sendMessage() {
    var messageText = document.getElementById('message-text').value;
    var timestamp = new Date().toLocaleString();
    chatRef.push({
        text: messageText,
        timestamp: timestamp
    });
    document.getElementById('message-text').value = '';
}
