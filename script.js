let currentUser = null;
let registeredUsers = [];
let chats = {};

// Register a new user
function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    if (registeredUsers.some(user => user.username === username)) {
        alert("Username is already taken. Please choose a different username.");
        return;
    }

    const newUser = { username, password };
    registeredUsers.push(newUser);
    currentUser = newUser;
    document.getElementById("registrationSection").style.display = "none";
    document.getElementById("nav").style.display = "block";
    showHomeFeed();
}

// Login (Simple mock login)
function login(username, password) {
    currentUser = registeredUsers.find(user => user.username === username && user.password === password);
    if (!currentUser) {
        alert("Invalid credentials");
        return;
    }

    document.getElementById("registrationSection").style.display = "none";
    document.getElementById("nav").style.display = "block";
    showHomeFeed();
}

// Show Home Feed Section
function showHomeFeed() {
    document.getElementById("homeFeedSection").style.display = "block";
    document.getElementById("createPostSection").style.display = "none";
    document.getElementById("searchSection").style.display = "none";
    document.getElementById("chatSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";
}

// Create a new post
function createPost() {
    const caption = document.getElementById("post-caption").value;
    const fileInput = document.getElementById("post-image");
    const file = fileInput.files[0];

    if (caption.trim() === "" && !file) {
        alert("Please enter some text or choose an image.");
        return;
    }

    const postContainer = document.createElement("div");
    postContainer.classList.add("post");

    const postCaption = document.createElement("p");
    postCaption.textContent = caption;
    postContainer.appendChild(postCaption);

    if (file) {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        postContainer.appendChild(img);
    }

    document.getElementById("feed").prepend(postContainer);

    document.getElementById("post-caption").value = "";
    fileInput.value = "";
}

// Search for Users
function searchUsers() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = ""; // Clear previous search results

    const filteredUsers = registeredUsers.filter(user =>
        user.username.toLowerCase().includes(searchQuery)
    );

    if (filteredUsers.length === 0) {
        searchResults.innerHTML = "<p>No users found</p>";
    } else {
        filteredUsers.forEach(user => {
            const resultItem = document.createElement("div");
            resultItem.textContent = user.username;
            searchResults.appendChild(resultItem);
        });
    }
}

// Show Search Section
function showSearch() {
    document.getElementById("searchSection").style.display = "block";
    document.getElementById("homeFeedSection").style.display = "none";
    document.getElementById("createPostSection").style.display = "none";
    document.getElementById("chatSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";
}

// Show Chat Section
function showChat() {
    document.getElementById("chatSection").style.display = "block";
    document.getElementById("homeFeedSection").style.display = "none";
    document.getElementById("createPostSection").style.display = "none";
    document.getElementById("searchSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";

    // List of friends for chat
    const chatList = document.getElementById("chatList");
    chatList.innerHTML = ""; // Clear previous chats

    registeredUsers.forEach(user => {
        if (user.username !== currentUser.username) {
            const chatItem = document.createElement("div");
            chatItem.textContent = user.username;
            chatItem.onclick = () => openChat(user.username);
            chatList.appendChild(chatItem);
        }
    });
}

// Open a specific chat
function openChat(friendUsername) {
    document.getElementById("chatWindow").style.display = "block";
    document.getElementById("chatWith").textContent = `Chat with: ${friendUsername}`;
    const messages = document.getElementById("messages");
    messages.innerHTML = "";

    if (!chats[friendUsername]) {
        chats[friendUsername] = [];
    }

    chats[friendUsername].forEach(message => {
        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        messages.appendChild(messageElement);
    });
}

// Send message in a chat
function sendMessage() {
    const message = document.getElementById("newMessage").value;
    const friendUsername = document.getElementById("chatWith").textContent.split(": ")[1];

    if (message.trim() !== "") {
        chats[friendUsername].push(message);
        openChat(friendUsername);
        document.getElementById("newMessage").value = "";
    }
}

// Delete chat history
function deleteChat() {
    const friendUsername = document.getElementById("chatWith").textContent.split(": ")[1];
    chats[friendUsername] = [];
    openChat(friendUsername);
}

// Show Settings Section
function showSettings() {
    document.getElementById("settingsSection").style.display = "block";
    document.getElementById("homeFeedSection").style.display = "none";
    document.getElementById("createPostSection").style.display = "none";
    document.getElementById("searchSection").style.display = "none";
    document.getElementById("chatSection").style.display = "none";
}

// Change Appearance (Dark Mode)
function changeAppearance() {
    document.body.classList.toggle("dark-mode");
}

// Edit Profile
function editProfile() {
    const newBio = prompt("Enter your new bio:");
    if (newBio) {
        document.getElementById("bio").textContent = newBio;
    }
}

// Logout
function logout() {
    currentUser = null;
    document.getElementById("registrationSection").style.display = "block";
    document.getElementById("nav").style.display = "none";
    document.getElementById("homeFeedSection").style.display = "none";
    document.getElementById("createPostSection").style.display = "none";
    document.getElementById("searchSection").style.display = "none";
    document.getElementById("chatSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";
}
