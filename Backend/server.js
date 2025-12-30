const express = require('express');
const cors = require('cors');
const axios = require('axios');
const chatbot = require('./chatbot');
const connectDB = require('./database/db');
const FarmerSetup = require('./database/models/FarmerSetup');

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(express.json());
app.get('/api/farmer/setup/:username', async (req, res) => {
  try {
    const data = await FarmerSetup.findOne({ username: req.params.username });
    res.json({ exists: !!data, data });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

app.post('/api/farmer/setup', async (req, res) => {
  try {
    const { username, soilType, fieldSize, irrigationType, pastCrops } = req.body;

    // Upsert (update if exists, create if not)
    const data = await FarmerSetup.findOneAndUpdate(
      { username },
      { username, soilType, fieldSize, irrigationType, pastCrops },
      { new: true, upsert: true }
    );

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save data' });
  }
});

app.use('/api/chatbot', chatbot);

const users = [
  { id: 1, username: 'farmer1', password: 'password123', email: 'farmer1@farm.com' },
  { id: 2, username: 'admin', password: 'admin123', email: 'admin@farm.com' }
];

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({
      success: true,
      user: { id: user.id, username: user.username, email: user.email },
      token: 'fake-jwt-token-' + user.id
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password, email, soilType, fieldSize, irrigationType, pastCrops } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

  const newUser = { id: users.length + 1, username, password, email };
  users.push(newUser);

  // Auto-save farmer details
  if (soilType || fieldSize) {
    try {
      await FarmerSetup.findOneAndUpdate(
        { username },
        { username, soilType, fieldSize, irrigationType, pastCrops: pastCrops || [] },
        { new: true, upsert: true }
      );
    } catch (err) {
      console.error("Failed to auto-save setup:", err);
    }
  }

  res.json({
    success: true,
    user: { id: newUser.id, username: newUser.username, email: newUser.email },
    token: 'fake-jwt-token-' + newUser.id
  });
});


app.get('/api/agro/polygons', async (req, res) => {
  try {
    const API_KEY = '08071814b3a79d6a9b0de92bd80107ff';
    const response = await axios.get(`http://api.agromonitoring.com/agro/1.0/polygons?appid=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch polygons data' });
  }
});

// Weather by city name
app.get('/api/weather/city/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const API_KEY = '79544ad5a96d5678372106a037251c9a';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    console.error('City Weather API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});

// Weather by coordinates using OpenWeatherMap
app.get('/api/weather/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const API_KEY = '79544ad5a96d5678372106a037251c9a';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
});

// Test endpoint to check if API is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date() });
});

// Weather forecast by coordinates
app.get('/api/weather/forecast/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const API_KEY = '79544ad5a96d5678372106a037251c9a';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    console.error('Forecast API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch forecast data', details: error.message });
  }
});

app.get('/api/agro/soil/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const API_KEY = '08071814b3a79d6a9b0de92bd80107ff';
    const response = await axios.get(`http://api.agromonitoring.com/agro/1.0/soil?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch soil data' });
  }
});

app.get('/api/crop-data', async (req, res) => {
  try {
    const cropData = {
      crops: [
        {
          name: 'Rice',
          season: 'Kharif',
          avgYield: '2.5 tons/hectare',
          marketPrice: '₹2000/quintal',
          region: 'Punjab, Haryana, UP',
          soilType: 'Clay loam',
          rainfall: '100-200cm'
        },
        {
          name: 'Wheat',
          season: 'Rabi',
          avgYield: '3.2 tons/hectare',
          marketPrice: '₹2100/quintal',
          region: 'Punjab, Haryana, MP',
          soilType: 'Loamy',
          rainfall: '50-75cm'
        },
        {
          name: 'Cotton',
          season: 'Kharif',
          avgYield: '1.8 tons/hectare',
          marketPrice: '₹5500/quintal',
          region: 'Gujarat, Maharashtra, AP',
          soilType: 'Black cotton soil',
          rainfall: '50-100cm'
        }
      ],
      lastUpdated: new Date().toISOString()
    };

    res.json(cropData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch crop data' });
  }
});


app.get('/api/market-prices', async (req, res) => {
  try {
    const marketData = {
      prices: [
        { crop: 'Rice', price: 2000, unit: 'quintal', market: 'Delhi', date: new Date() },
        { crop: 'Wheat', price: 2100, unit: 'quintal', market: 'Mumbai', date: new Date() },
        { crop: 'Cotton', price: 5500, unit: 'quintal', market: 'Ahmedabad', date: new Date() }
      ]
    };

    res.json(marketData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market prices' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
