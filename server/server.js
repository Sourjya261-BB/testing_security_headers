const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Allowed origins for complex CORS
const allowedOrigins = [
    'https://www.bigbasket.com',
    'https://www.tataneu.com',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'https://images.unsplash.com'
];

// CORS options delegate function
let corsOptionsDelegate = function (req, callback) {
    let origin = req.header('Origin');
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, { origin: true }); // Allow request
    } else {
        callback(new Error('Not allowed by CORS'), { origin: false });
    }
};

// Simple CORS Endpoint (Allows All Origins)
app.get('/simple_cors/get_data', cors(), (req, res) => {
    res.json({ message: 'This is a simple CORS response!' });
});

// Complex CORS Endpoint (Allows only specific origins)
app.get('/complex_cors/get_data', cors(corsOptionsDelegate), (req, res) => {
    res.json({ message: 'This is a complex CORS response!' });
});

// CSP Example Endpoint
app.get('/csp_example', cors(corsOptionsDelegate), (req, res) => {
    const enableCSP = req.query.csp === 'true';
    const cspHeader = enableCSP ? "default-src 'self'; img-src https://images.unsplash.com" : "default-src 'self';";
    res.setHeader('Content-Security-Policy', cspHeader);

    // HTML response with an external image
    const htmlResponse = `
        <html>
            <head>
                <title>CSP Example</title>
                <meta http-equiv="Content-Security-Policy" content="${cspHeader}">
            </head>
            <body>
                <h1>CSP Example</h1>
                <p>This page includes an external image.</p>
                <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Example Image">
                <p>${enableCSP ? 'CSP is enabled. The image may be blocked if it violates the policy.' : 'CSP is disabled. The image will load without restrictions.'}</p>
            </body>
        </html>
    `;

    res.send(htmlResponse);
});

// Negative Case: Serve fake JavaScript file without nosniff
app.get('/negative_case',cors(corsOptionsDelegate),(req, res) => {
    const filePath = path.join(__dirname, 'fake_html.txt');
    res.setHeader('Content-Type', 'image/png'); // Incorrect MIME type
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); // Disable caching
    res.setHeader('Pragma', 'no-cache'); // For HTTP/1.0
    res.setHeader('Expires', '0'); // Expire immediately
    res.sendFile(filePath);
});
// Positive Case: Serve fake JavaScript file with nosniff
app.get('/positive_case',cors(corsOptionsDelegate), (req, res) => {
    const filePath = path.join(__dirname, 'fake_html.txt');
    res.setHeader('Content-Type', 'image/png'); // Incorrect MIME type
    res.setHeader('X-Content-Type-Options', 'nosniff'); // Prevent MIME sniffing
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); // Disable caching
    res.setHeader('Pragma', 'no-cache'); // For HTTP/1.0
    res.setHeader('Expires', '0'); // Expire immediately
    res.sendFile(filePath);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});