// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [titles, setTitles] = useState([]);
  const [count, setCount] = useState(5);

  useEffect(() => {
    fetchTitles();
  }, []);

  const fetchTitles = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setTitles(data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching titles:', error);
    }
  };

  const loadMoreTitles = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setTitles((prevTitles) => [
        ...prevTitles,
        ...data.slice(count, count + 5),
      ]);
      setCount(count + 5);
    } catch (error) {
      console.error('Error fetching more titles:', error);
    }
  };

  return (
    <div className="App">
      <h1>Titles</h1>
      <ul>
        {titles.map((title) => (
          <li key={title.id}>{title.title}</li>
        ))}
      </ul>
      <button onClick={loadMoreTitles}>Next 5</button>
    </div>
  );
}

export default App;
