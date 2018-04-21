const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome..." });
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {  
      res.json({
        message: "Posts Created",
        authData
      });
    }
  })
});

app.post('/api/login', (req, res) => {
  const user = {
    id: 1,
    username: 'Indra',
    email: 'indragunawanrtf@gmail.com'
  }

  jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    })
  });
});

function verifyToken(req, res, next) {
  // Format Token
  // Authorization: Bearer <access_token>

  // Get Auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if Bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');

    // Get Token from array
    const bearerToken = bearer[1];

    // Set the Token
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(3000, () => {
  console.log("Server Running...");
});
