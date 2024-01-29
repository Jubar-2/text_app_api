import http from 'http';
import querystring from 'querystring';
import url from 'url';

const PORT = 3000;

// In-memory session storage
const sessions = {};

// Helper function to generate a random session ID
const generateSessionId = () => {
  return Math.random().toString(36).slice(2);
};

// Check if the user is authenticated middleware
const isAuthenticated = (sessionId) => {
  return sessions[sessionId] && sessions[sessionId].authenticated;
};

// Basic HTTP server
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url);
  const queryParams = querystring.parse(query);

  // Login route
  if (pathname === '/login') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('Login Page <form method="post" action="/login"><input type="text" name="username" placeholder="Username"><input type="password" name="password" placeholder="Password"><input type="submit" value="Login"></form>');
    } else if (req.method === 'POST') {
      const { username, password } = queryParams;

      // Check credentials (replace with database query)
      if (username === 'user' && password === 'pass') {
        const sessionId = generateSessionId();
        sessions[sessionId] = { authenticated: true, username };
        res.writeHead(302, { 'Location': `/profile?sessionId=${sessionId}` });
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Invalid credentials. <a href="/login">Try again</a>');
      }
    }
  }
  // Profile route
  else if (pathname === '/profile') {
    const sessionId = queryParams.sessionId;

    if (isAuthenticated(sessionId)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`Welcome, ${sessions[sessionId].username}! <a href="/logout?sessionId=${sessionId}">Logout</a>`);
    } else {
      res.writeHead(302, { 'Location': '/login' });
      res.end();
    }
  }
  // Logout route
  else if (pathname === '/logout') {
    const sessionId = queryParams.sessionId;

    if (sessionId && sessions[sessionId]) {
      sessions[sessionId].authenticated = false;
    }

    res.writeHead(302, { 'Location': '/login' });
    res.end();
  }
  // 404 route
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
