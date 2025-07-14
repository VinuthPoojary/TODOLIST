import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post('/tasks', { text });
      setTasks(prev => [...prev, res.data]);
      setText('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 To-Do List</h2>

      <div style={styles.inputGroup}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>Add</button>
      </div>

      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task._id} style={styles.listItem}>
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task._id)} style={styles.removeButton}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 🎨 Styling
const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    background: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 16px',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    background: '#f9f9f9',
    padding: '10px 12px',
    marginBottom: '10px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    background: 'transparent',
    border: 'none',
    color: 'red',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default App;
