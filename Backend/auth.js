// Add these routes to your existing server.js
app.use(express.json());

// Simple in-memory user storage (use database in production)
const users = [
  { id: 1, username: 'farmer1', password: 'password123', email: 'farmer1@farm.com' },
  { id: 2, username: 'admin', password: 'admin123', email: 'admin@farm.com' }
];

// Login endpoint
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

// Register endpoint
app.post('/api/auth/register', (req, res) => {
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