const fs = require('fs');
const path = require('path');
const axios = require('axios');
const express = require('express');
const app = express();

const imagesDirectory = './files'; // Ensure this directory exists
const imageUrl = 'https://picsum.photos/'; // URL for fetching random images
const imageNumberPath = path.join(imagesDirectory, 'image_number.txt');
const timestampPath = path.join(imagesDirectory, 'timestamp.txt');

// Middleware to serve images statically
app.use('/images', express.static(imagesDirectory));

// Function to check if an image update is needed
const updateImageIfNeeded = async () => {
  const now = new Date();
  let lastFetchDate;

  try {
    const timestamp = fs.readFileSync(timestampPath, 'utf8');
    lastFetchDate = new Date(timestamp);
  } catch (err) {
    // If reading the timestamp fails, it likely means we need to fetch a new image
    lastFetchDate = new Date(0); // Set to Epoch time to ensure an update
  }

  // Check if more than 24 hours have passed
  if (now - lastFetchDate >= 24 * 60 * 60 * 1000) {
    console.log('Fetching a new daily image...');
    const rand_number = String(Math.floor(Math.random() * 5000))
    fs.writeFileSync(imageNumberPath, rand_number);
    fs.writeFileSync(timestampPath, now.toISOString());
    console.log('New image fetched and saved.');
  }
};

const getUpdatedUrl = () => imageUrl + fs.readFileSync(imageNumberPath, 'utf8')
  
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint to trigger image update check
app.get('/update-image', async (req, res) => {
  await updateImageIfNeeded();
  const url = await getUpdatedUrl();
  res.json({'url': url}); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  updateImageIfNeeded(); // Check and update image at startup
});
