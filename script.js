const saveBtn = document.getElementById('saveBtn');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

// Save note
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

// Load and display notes
function loadNotes() {
    notesList.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;

        // Add a delete button for each note
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            deleteNote(index);
        };
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

// Delete note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);  // Remove note by index
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

// Update Friend List
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

// Send Message
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

// Theme Toggle
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

// New Feature Alert
document.getElementById("new-feature").addEventListener("click", function() {
    alert("New feature coming soon!");
});

// Load everything when page loads
window.onload = function() {
    const theme = localStorage.getItem("theme") || "light";
    document.body.classList.add(theme);

    const username = localStorage.getItem("username");
    if (username) {
        document.getElementById("registration").style.display = "none";
        document.getElementById("notesSection").style.display = "block";
    }

    loadNotes();
    updateFriendsList();
    displayMessages();
};

