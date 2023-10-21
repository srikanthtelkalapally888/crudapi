const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

mongoose.connect('mongodb+srv://srikanth:srikanth@testingapi.gnmta8u.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.json()); 

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

// Create an item
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//temporary api for sending the data .. 
app.get('/api/temp', async (req, res) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "wordpress_logged_in_0bcca5f0a5bc2025568ed6b31489525d=srikanth%40gmail.com%7C1697889391%7Cfs6iEbBGwpSKCgw9Xyrkd8k8iMtyKhi0e7ZFn3p1Vwx%7C3a4a7357e0f6b916253ee815b49a2e24dccc9c6831280f9e21c94eef666e6ce3; PHPSESSID=6hpsej9h9j0jc3tlcevuujolnh");
    myHeaders.append("X-WP-Nonce", "11815e51c0");
    
    var raw = JSON.stringify({
      "title": "My New Posddfsdfsd",
      "body": "This is the co.",
      "userId": 5
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://hitsongs.in/wp-json/wp/v2/posts", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Read a specific item by ID
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an item by ID
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an item by ID
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndRemove(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(deletedItem);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
