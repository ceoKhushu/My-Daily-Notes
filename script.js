let currentUsername = "";

window.onload = function() {
    // Check if the user is logged in
    const username = localStorage.getItem("username");
    if (username) {
        currentUsername = username;
        document.getElementById("registration").style.display = "none";
        document.getElementById("home").style.display = "block";
        loadFeed();
    }
};

function registerUser() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username);
        currentUsername = username;
        alert("Registration successful!");
        document.getElementById("registration").style.display = "none";
        document.getElementById("home").style.display = "block";
        loadFeed();
    } else {
        alert("Please enter a username!");
    }
}

function loadFeed() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.innerHTML = `<strong>${post.username}</strong><p>${post.text}</p>`;
        if (post.image) {
            const img = document.createElement("img");
            img.src = post.image;
            img.style.width = "100%";
            postDiv.appendChild(img);
        }
        feed.appendChild(postDiv);
    });
}

function createPost() {
    const text = document.getElementById("postText").value;
    const image = document.getElementById("postImage").files[0];

    if (text || image) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const posts = JSON.parse(localStorage.getItem("posts")) || [];
            posts.push({
                username: currentUsername,
                text: text,
                image: reader.result || null
            });
            localStorage.setItem("posts", JSON.stringify(posts));
            document.getElementById("postText").value = "";
            document.getElementById("postImage").value = "";
            loadFeed();
        };
        if (image) reader.readAsDataURL(image);
        else loadFeed();
    } else {
        alert("Please add a text or image to your post!");
    }
}

function showPostArea() {
    document.getElementById("postArea").style.display = "block";
}

function showProfile() {
    document.getElementById("profile").style.display = "block";
    document.getElementById("myPosts").innerHTML = `<strong>${currentUsername}'s Posts:</strong>`;
    loadFeed();
}

function showFriends() {
    document.getElementById("friends").style.display = "block";
}

function showChat() {
    document.getElementById("chat").style.display = "block";
}

function showSettings() {
    document.getElementById("settings").style.display = "block";
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}

function logout() {
    localStorage.removeItem("username");
    window.location.reload();
}
