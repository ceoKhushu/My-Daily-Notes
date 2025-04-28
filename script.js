// Get elements
const saveBtn = document.getElementById('saveBtn');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

// Load page
window.onload = function() {
    loadNotes();
    displayMessages();
    updateFriendsList();

    const theme = localStorage.getItem("theme") || "light";
    document.body.classList.add(theme);

    if (localStorage.getItem("username")) {
        document.getElementById("registration").style.display = "none";
        document.getElementById("notesSection").style.display = "block";
    }
};

// Save Note
saveBtn.onclick = function() {
    const noteText = noteInput.value.trim();
    if (noteText !== "") {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = "";
        loadNotes();
    }
};

// Load Notes
function loadNotes() {
    notesList.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            deleteNote(index);
        };
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });

    // New feature button action
    document.getElementById("new-feature").onclick = function() {
        alert("New feature coming soon!");
    };
}

// Delete Note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

// Register User
function registerUser() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username);
        alert("Registration successful!");
        document.getElementById("registration").style.display = "none";
        document.getElementById("notesSection").style.display = "block";
    } else {
        alert("Please enter a username!");
    }
}

// Add Friend
function addFriend() {
    const friend = document.getElementById("friendUsername").value;
    if (friend) {
        let friends = JSON.parse(localStorage.getItem("friends")) || [];
        friends.push(friend);
        localStorage.setItem("friends", JSON.stringify(friends));
        document.getElementById("friendUsername").value = "";
        updateFriendsList();
    } else {
        alert("Please enter a friend's username!");
    }
}

// Update Friends List
function updateFriendsList() {
    const friends = JSON.parse(localStorage.getItem("friends")) || [];
    const list = document.getElementById("friendsList");
    list.innerHTML = "";

    friends.forEach(friend => {
        const li = document.createElement("li");
        li.textContent = friend;
        list.appendChild(li);
    });
}

// Send Chat Message
function sendMessage() {
    const message = document.getElementById("message").value;
    const sender = localStorage.getItem("username");

    if (message && sender) {
        const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        chatMessages.push({ sender: sender, message: message });
        localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
        document.getElementById("message").value = "";
        displayMessages();
    } else {
        alert("Please enter a message!");
    }
}

// Display Chat Messages
function displayMessages() {
    const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    const chatArea = document.getElementById("chatMessages");
    chatArea.innerHTML = "";

    chatMessages.forEach(msg => {
        const div = document.createElement("div");
        div.textContent = `${msg.sender}: ${msg.message}`;
        chatArea.appendChild(div);
    });
}

// Toggle Theme (Light/Dark)
function toggleTheme() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
}
