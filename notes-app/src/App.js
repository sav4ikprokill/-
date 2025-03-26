import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [tags, setTags] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [searchTag, setSearchTag] = useState('');

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
      const newNote = { text: note, tags: tags.split(',').map(tag => tag.trim()) };
      if (editIndex !== null) {
        const updatedNotes = notes.map((n, index) => (index === editIndex ? newNote : n));
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        setNotes([...notes, newNote]);
      }
      setNote('');
      setTags('');
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const handleEditNote = (index) => {
    setNote(notes[index].text);
    setTags(notes[index].tags.join(', '));
    setEditIndex(index);
  };

  const filteredNotes = notes.filter(note =>
    note.tags.some(tag => tag.toLowerCase().includes(searchTag.toLowerCase()))
  );

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
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Введите теги (через запятую)"
        />
        <button onClick={handleAddOrEditNote}>
          {editIndex !== null ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
      <div>
        <input
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="Поиск по тегам"
        />
      </div>
      <ul>
        {filteredNotes.map((note, index) => (
          <li key={index}>
            {note.text} (Теги: {note.tags.join(', ')})
            <button onClick={() => handleEditNote(index)}>Редактировать</button>
            <button onClick={() => handleDeleteNote(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

