const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, username: 'farmer1', password: 'password123', email: 'farmer1@farm.com' },
  { id: 2, username: 'admin', password: 'admin123', email: 'admin@farm.com' }
];

app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
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

app.post('/api/auth/register', (req, res) => {
  console.log('Register attempt:', req.body);
  const { username, password, email } = req.body;
  
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    password,
    email
  };
  
  users.push(newUser);
  
  res.json({ 
    success: true, 
    user: { id: newUser.id, username: newUser.username, email: newUser.email },
    token: 'fake-jwt-token-' + newUser.id 
  });
});

app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
  console.log('Available users:', users.map(u => ({username: u.username, password: u.password})));
});