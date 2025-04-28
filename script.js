let currentUsername = "";
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let friends = JSON.parse(localStorage.getItem("friends")) || [];
let chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];

window.onload = function() {
    const username = localStorage.getItem("username");
    if (username) {
        currentUsername = username;
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("appSection").style.display = "block";
        loadFeed();
        updateFriendsList();
    }
};

function registerUser() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username);
        currentUsername = username;
        alert("Registration successful!");
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("appSection").style.display = "block";
        loadFeed();
    } else {
        alert("Please enter a username!");
    }
}

function loadFeed() {
    const feedDiv = document.getElementById("feed");
    feedDiv.innerHTML = "";
    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.innerHTML = `<strong>${post.username}</strong><p>${post.text}</p>`;
        if (post.image) {
            const img = document.createElement("img");
            img.src = post.image;
            img.style.width = "100%";
            postDiv.appendChild(img);
        }
        feedDiv.appendChild(postDiv);
    });
}

function createPost() {
    const text = document.getElementById("newPostText").value;
    const image = document.getElementById("newPostImage").files[0];
    
    if (text || image) {
        const reader = new FileReader();
        reader.onloadend = function() {
            posts.push({
                username: currentUsername,
                text: text,
                image: reader.result || null
            });
            localStorage.setItem("posts", JSON.stringify(posts));
            document.getElementById("newPostText").value = "";
            document.getElementById("newPostImage").value = "";
            loadFeed();
        };
        if (image) reader.readAsDataURL(image);
        else loadFeed();
    } else {
        alert("Please add text or an image to your post!");
    }
}

function updateFriendsList() {
    const friendsList = document.getElementById("friendList");
    friendsList.innerHTML = "";
    friends.forEach(friend => {
        const li = document.createElement("li");
        li.textContent = friend;
        friendsList.appendChild(li);
    });
}

function addFriend() {
    const friendName = document.getElementById("friendInput").value;
    if (friendName) {
        friends.push(friendName);
        localStorage.setItem("friends", JSON.stringify(friends));
        updateFriendsList();
        document.getElementById("friendInput").value = "";
    } else {
        alert("Please enter a friend's name!");
    }
}

function sendMessage() {
    const message = document.getElementById("messageText").value;
    if (message) {
        chatMessages.push({ sender: currentUsername, message: message });
        localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
        displayMessages();
        document.getElementById("messageText").value = "";
    }
}

function displayMessages() {
    const chatArea = document.getElementById("chatMessages");
    chatArea.innerHTML = "";
    chatMessages.forEach(msg => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${msg.sender}:</strong> ${msg.message}`;
        chatArea.appendChild(div);
    });
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}

function logout() {
    localStorage.removeItem("username");
    window.location.reload();
}
