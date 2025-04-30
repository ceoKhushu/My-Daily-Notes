// --- Data Persistence via localStorage ---
let users    = JSON.parse(localStorage.getItem('st_users')   || '[]');
let posts    = JSON.parse(localStorage.getItem('st_posts')   || '[]');
let chats    = JSON.parse(localStorage.getItem('st_chats')   || '{}');
let current  = JSON.parse(localStorage.getItem('st_current') || 'null');

function saveState() {
  localStorage.setItem('st_users',   JSON.stringify(users));
  localStorage.setItem('st_posts',   JSON.stringify(posts));
  localStorage.setItem('st_chats',   JSON.stringify(chats));
  localStorage.setItem('st_current', JSON.stringify(current));
}

// --- Initialization ---
window.onload = () => {
  if (current) {
    showNav(); showSection('home'); updateFeed(); populateFriends();
  }
};

// --- Registration / Login ---
function registerOrLogin() {
  const u = document.getElementById('regUsername').value.trim();
  const p = document.getElementById('regPassword').value;
  if (!u || !p) return alert('Enter credentials');

  let user = users.find(x => x.username === u);
  if (user) {
    if (user.password !== p) return alert('Wrong password');
  } else {
    user = { username: u, password: p, bio:'', profile:'' };
    users.push(user);
    chats[u] = {};
  }

  current = user;
  saveState();
  showNav(); showSection('home'); updateFeed(); populateFriends();
}

// --- UI Helpers ---
function showNav() {
  document.getElementById('registration').style.display = 'none';
  document.getElementById('nav').style.display          = 'block';
}
function logout() {
  localStorage.removeItem('st_current');
  location.reload();
}
function hideAllSections() {
  ['home','create','search','chat','settings']
    .forEach(id => document.getElementById(id).style.display = 'none');
}
function showSection(id) {
  hideAllSections();
  document.getElementById(id).style.display = 'block';
  if (id === 'home') updateFeed();
}

// --- Posts / Feed ---
function updateFeed() {
  const feed = document.getElementById('feed');
  feed.innerHTML = '';
  posts.slice().reverse().forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `<strong>${post.user}:</strong> ${post.text}` +
                    (post.img? `<img src="${post.img}">` : '');
    feed.appendChild(div);
  });
}
function createPost() {
  const text = document.getElementById('postText').value;
  const file = document.getElementById('postImage').files[0];
  const post = { user: current.username, text, img: '' };
  if (file) post.img = URL.createObjectURL(file);
  posts.push(post);
  saveState(); updateFeed();
  document.getElementById('postText').value = '';
  document.getElementById('postImage').value = '';
  alert('Posted!');
}

// --- User Search ---
function searchUsers() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const res = document.getElementById('searchResults');
  res.innerHTML = '';
  users
    .filter(u => u.username.toLowerCase().includes(q))
    .forEach(u => {
      const d = document.createElement('div');
      d.textContent = u.username;
      res.appendChild(d);
    });
}

// --- Chats / DMs ---
function populateFriends() {
  const fl = document.getElementById('friendList');
  fl.innerHTML = '';
  users
    .filter(u => u.username !== current.username)
    .forEach(u => {
      const d = document.createElement('div');
      d.textContent = u.username;
      d.onclick = () => openChat(u.username);
      fl.appendChild(d);
    });
}
function openChat(friend) {
  showSection('chat');
  document.getElementById('chatWith').textContent = 'Chat with ' + friend;
  const msgs = document.getElementById('messages');
  msgs.innerHTML = '';
  const conv = chats[current.username][friend] || [];
  conv.forEach(m => {
    const p = document.createElement('p');
    p.textContent = m;
    msgs.appendChild(p);
  });
  document.getElementById('chatInput').value = '';
}
function sendMessage() {
  const friend = document.getElementById('chatWith').textContent.replace('Chat with ','');
  const msg    = document.getElementById('chatInput').value.trim();
  if (!msg) return;
  chats[current.username][friend] = chats[current.username][friend] || [];
  chats[current.username][friend].push(msg);
  saveState(); openChat(friend);
}
function deleteChat() {
  const friend = document.getElementById('chatWith').textContent.replace('Chat with ','');
  chats[current.username][friend] = [];
  saveState(); openChat(friend);
}

// --- Settings ---
function toggleDark() {
  document.body.classList.toggle('dark');
}
function changeUsername() {
  const nu = prompt('New username:', current.username);
  if (nu && !users.find(u => u.username === nu)) {
    users.find(u => u.username === current.username).username = nu;
    chats[nu] = chats[current.username];
    delete chats[current.username];
    current.username = nu;
    saveState();
    alert('Username changed');
    showSection('settings');
  } else {
    alert('Invalid or taken');
  }
}
function changePassword() {
  const np = prompt('New password:');
  if (np) {
    users.find(u => u.username === current.username).password = np;
    saveState();
    alert('Password updated');
  }
}
