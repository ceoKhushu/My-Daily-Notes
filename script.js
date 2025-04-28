const saveBtn = document.getElementById('saveBtn');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

// Load notes from localStorage when page loads
window.onload = function() {
    loadNotes();
};

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
        document.getElementById("new-feature").addEventListener("click", function() {
  alert("New feature coming soon!");
});


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
function registerUser() {
  const username = document.getElementById("username").value;
  if (username) {
    localStorage.setItem("username", username);  // Save username in localStorage
    alert("Registration successful!");
    document.getElementById("registration").style.display = "none";  // Hide registration
  } else {
    alert("Please enter a username!");
  }
}
function addFriend() {
  const friend = document.getElementById("friendUsername").value;
  if (friend) {
    let friends = JSON.parse(localStorage.getItem("friends")) || [];
    friends.push(friend);
    localStorage.setItem("friends", JSON.stringify(friends));  // Save friends list
    document.getElementById("friendUsername").value = "";  // Clear input field
    updateFriendsList();
  } else {
    alert("Please enter a friend's username!");
  }
}

function updateFriendsList() {
  const friends = JSON.parse(localStorage.getItem("friends")) || [];
  const list = document.getElementById("friendsList");
  list.innerHTML = "";  // Clear current list

  friends.forEach(friend => {
    const li = document.createElement("li");
    li.textContent = friend;
    list.appendChild(li);
  });
}

updateFriendsList();  // Update the list on page load
function sendMessage() {
  const message = document.getElementById("message").value;
  const sender = localStorage.getItem("username");

  if (message && sender) {
    const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    chatMessages.push({ sender: sender, message: message });
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));

    document.getElementById("message").value = "";  // Clear input
    displayMessages();
  } else {
    alert("Please enter a message!");
  }
}

function displayMessages() {
  const chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  const chatArea = document.getElementById("chatMessages");
  chatArea.innerHTML = "";  // Clear chat area

  chatMessages.forEach(msg => {
    const div = document.createElement("div");
    div.textContent = `${msg.sender}: ${msg.message}`;
    chatArea.appendChild(div);
  });
}

displayMessages();  // Display messages on page load
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

window.onload = function() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.add(theme);
};
