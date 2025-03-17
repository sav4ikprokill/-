import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Загрузка заметок из локального хранилища при первом рендере
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    // Сохранение заметок в локальное хранилище при каждом изменении
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddOrEditNote = () => {
    if (note.trim()) {
      if (editIndex !== null) {
        const updatedNotes = notes.map((n, index) => (index === editIndex ? note : n));
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, note]);
      }
      setNote('');
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const handleEditNote = (index) => {
    setNote(notes[index]);
    setEditIndex(index);
  };

  return (
    <div className="App">
      <h1>Мои заметки</h1>
      <div>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Введите заметку"
        />
        <button onClick={handleAddOrEditNote}>
          {editIndex !== null ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button onClick={() => handleEditNote(index)}>Редактировать</button>
            <button onClick={() => handleDeleteNote(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
