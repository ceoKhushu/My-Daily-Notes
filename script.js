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
