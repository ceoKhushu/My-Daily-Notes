// Store posts and user data in localStorage
let currentUsername = "";
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

// Register the user
function registerUser() {
    const username = document.getElementById("username").value;
    if (username) {
        currentUsername = username;
        localStorage.setItem("username", currentUsername); // Store username in localStorage
        users.push({ username: currentUsername });
        localStorage.setItem("users", JSON.stringify(users)); // Save users
        alert("Registration successful!");
        document.getElementById("loginSection").style.display = "none"; // Hide login
        document.getElementById("appSection").style.display = "block"; // Show app section
        loadProfile();
        loadPosts();
        displayChatSection();
    } else {
        alert("Please enter a username!");
    }
}

// Logout
function logout() {
    localStorage.removeItem("username");
    document.getElementById("loginSection").style.display = "block"; // Show login
    document.getElementById("appSection").style.display = "none"; // Hide app section
}

// Load Profile
function loadProfile() {
    const profileInfo = document.getElementById("profileInfo");
    profileInfo.innerHTML = `<p>Welcome, ${currentUsername}!</p>`;
}

// Create Post (Image Only)
function createPost() {
    const postImage = document.getElementById("newPostImage").files[0];
    if (postImage) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const post = {
                image: reader.result,
                username: currentUsername
            };
            posts.push(post);
            localStorage.setItem("posts", JSON.stringify(posts)); // Save posts to localStorage
            loadPosts();
        };
        reader.readAsDataURL(postImage); // Read the image file
    } else {
        alert("Please select an image to post!");
    }
}

// Load Posts
function loadPosts() {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";
    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        const postImage = document.createElement("img");
        postImage.src = post.image;
        postDiv.appendChild(postImage);
        postsContainer.appendChild(postDiv);
    });
}

// Display Chat Section
function displayChatSection() {
    const chatSection = document.getElementById("chatSection");
    chatSection.style.display = "block";
}

// Toggle Theme (Light/Dark)
function toggleTheme() {
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
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

// Apply Theme on Load
window.onload = function () {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme);
};
