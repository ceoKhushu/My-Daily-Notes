// Store posts and user data in localStorage
let currentUsername = "";
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// On Page Load
window.onload = function() {
    const username = localStorage.getItem("username");
    if (username) {
        currentUsername = username;
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("appSection").style.display = "block";
        loadProfile();
        loadFeed();
    }
};

// Register User
function registerUser() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username);
        currentUsername = username;
        alert("Registration successful!");
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("appSection").style.display = "block";
        loadProfile();
        loadFeed();
    } else {
        alert("Please enter a username!");
    }
}

// Load User Profile
function loadProfile() {
    const profileDiv = document.getElementById("profileInfo");
    profileDiv.innerHTML = `<p>Welcome, <strong>${currentUsername}</strong></p>`;
}

// Load Feed (Posts from users)
function loadFeed() {
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";
    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <strong>${post.username}</strong>
            <p>${post.text}</p>
        `;
        if (post.image) {
            const img = document.createElement("img");
            img.src = post.image;
            postDiv.appendChild(img);
        }
        postsDiv.appendChild(postDiv);
    });
}

// Create a New Post
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

// Logout and Return to Registration
function logout() {
    localStorage.removeItem("username");
    window.location.reload();
}
