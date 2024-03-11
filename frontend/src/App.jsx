//App.jsx
import { useEffect, useState } from 'react';
import imageService from './services/images.js'

function App() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the image URL from the backend using Axios
    const fetchImageUrl = async () => {
      try {
        // Update this URL to match your server's address if needed
        console.log('trying to fetch image')
        const data = await imageService.get('/update-image');
        console.log(data)
        if (data.url) {
          setImageUrl(data.url);
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <div>
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt="Daily Random" className="daily-image" />
        </div>
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
}

export default App;
