// Profile section
function editProfile() {
  const newBio = prompt("Enter your new bio:");
  if (newBio) {
    document.getElementById("bio").textContent = newBio;
  }
}

// Create post
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

  // Add caption
  const postCaption = document.createElement("p");
  postCaption.textContent = caption;
  postContainer.appendChild(postCaption);

  // Add image (if any)
  if (file) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    postContainer.appendChild(img);
  }

  // Add post footer (like, comment buttons)
  const footer = document.createElement("div");
  footer.classList.add("post-footer");
  
  const likeButton = document.createElement("button");
  likeButton.classList.add("react-btn");
  likeButton.textContent = "❤️ Like";
  footer.appendChild(likeButton);
  
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("react-btn");
  deleteButton.textContent = "🗑️ Delete";
  deleteButton.onclick = () => postContainer.remove();
  footer.appendChild(deleteButton);

  postContainer.appendChild(footer);
  
  document.getElementById("feed").prepend(postContainer);
  
  // Clear the input fields after posting
  document.getElementById("post-caption").value = "";
  fileInput.value = "";
}

// Show Explore section (Placeholder)
function showExplore() {
  alert("Explore feature coming soon!");
}

// Show Search section (Placeholder)
function showSearch() {
  alert("Search feature coming soon!");
}

// Show Settings section (Placeholder)
function showSettings() {
  alert("Settings feature coming soon!");
}

// Logout function
function logout() {
  if (confirm("Are you sure you want to log out?")) {
    alert("Logged out successfully!");
    // You can also clear any stored data here (e.g., localStorage or sessionStorage)
    // For now, just redirect to the homepage or login page.
    window.location.reload();
  }
}
