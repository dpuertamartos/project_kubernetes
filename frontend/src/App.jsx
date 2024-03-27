//App.jsx
import { useEffect, useState } from 'react';
import imageService from './services/images.js'
import todoServices from './services/todos.js'

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]); // Hardcoded todos

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        console.log('trying to fetch image');
        const data = await imageService.get('/update-image');
        console.log(data);
        if (data.url) {
          setImageUrl(data.url);
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    }

    const fetchTodos = async () => {
      try {
        console.log('trying to fetch todos');
        const data = await todoServices.get();
        console.log(data);
        if (data) {
          setTodos(data);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }

    }

    fetchImageUrl();
    fetchTodos();
  }, []);

  const handleTodoChange = (e) => {
    const inputValue = e.target.value;
    // Limit input to 140 characters
    if (inputValue.length <= 140) {
      setTodo(inputValue);
    }
  };

  const handleSendTodo = async () => {
    // Add the new todo to the list (without sending to a backend for now)
    if (todo) {
      try {
        const newTodo = await todoServices.create({'content':todo})
        setTodos(prevTodos => [...prevTodos, newTodo])
      } catch (error) {
        console.log(error)
      } finally {
        setTodo(''); // Clear input field after adding
      }
    }
  };

  return (
    <div>
      {imageUrl && (
        <div style={{ marginBottom: '20px' }}>
          <img src={imageUrl} alt="Daily Random" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
      <div>
        <input 
          type="text" 
          value={todo} 
          onChange={handleTodoChange} 
          placeholder="Enter your todo..." 
          maxLength="140" // HTML validation for character limit
        />
        <button onClick={handleSendTodo}>Send</button>
      </div>
      <div>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

