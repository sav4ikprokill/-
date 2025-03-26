function saveNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value;

    if (noteText) {
        // Получаем существующие заметки из Local Storage
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));

        noteInput.value = ''; // Очищаем поле ввода
        displayNotes(); // Обновляем отображение заметок
    }
}

function displayNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = ''; // Очищаем контейнер

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.textContent = note;
        notesContainer.appendChild(noteElement);
    });
}

// Загружаем заметки при загрузке страницы
window.onload = displayNotes;
