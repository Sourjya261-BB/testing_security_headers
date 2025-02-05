```markdown
# CORS, CSP, and X-Content-Type-Options Demo

This project demonstrates the behavior of **Cross-Origin Resource Sharing (CORS)**, **Content Security Policy (CSP)**, and **X-Content-Type-Options** headers in a web application. It includes a server and a client to showcase how these security mechanisms work.

---

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Setup](#setup)
4. [Endpoints](#endpoints)
5. [Client Functionality](#client-functionality)
6. [Testing](#testing)
7. [Contributing](#contributing)
8. [License](#license)

---

## Introduction

This project consists of:
- A **Node.js server** built with Express to demonstrate CORS, CSP, and `X-Content-Type-Options` headers.
- A **client-side HTML/JavaScript application** to interact with the server and observe the behavior of these security mechanisms.

The server provides endpoints to test:
- **Simple CORS**: Allows requests from all origins.
- **Complex CORS**: Restricts requests to specific origins.
- **CSP**: Demonstrates how Content Security Policy controls resource loading.
- **X-Content-Type-Options**: Shows how `nosniff` prevents MIME sniffing.

---

## Features

- **CORS**:
  - Simple CORS: Allows all origins.
  - Complex CORS: Restricts access to specific origins.
- **CSP**:
  - Enables or disables CSP headers to control resource loading.
- **X-Content-Type-Options**:
  - Demonstrates the effect of `nosniff` on MIME sniffing.
- **Client-Side Interaction**:
  - Buttons to test each feature.
  - Responses displayed in the same page using an `iframe`.

---

## Setup

### Prerequisites
- Node.js (v14 or higher)
- NPM (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/cors-csp-demo.git](https://github.com/Sourjya261-BB/testing_security_headers.git]
   cd cors-csp-demo
   ```

2. Install dependencies:
   ```bash
   npm install express cors
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open the `index.html` file in a browser (e.g., using `live-server`):
   ```bash
   npx live-server
   ```

---

## Endpoints

### 1. Simple CORS
- **Endpoint**: `/simple_cors/get_data`
- **Description**: Allows requests from all origins.
- **Response**:
  ```json
  { "message": "This is a simple CORS response!" }
  ```

### 2. Complex CORS
- **Endpoint**: `/complex_cors/get_data`
- **Description**: Restricts requests to specific origins (`https://www.bigbasket.com`, `https://www.tataneu.com`, `http://localhost:8080`, `http://127.0.0.1:8080`).
- **Response**:
  ```json
  { "message": "This is a complex CORS response!" }
  ```

### 3. CSP Example
- **Endpoint**: `/csp_example`
- **Description**: Demonstrates how CSP headers control resource loading.
- **Query Parameter**:
  - `csp=true`: Enables CSP.
  - `csp=false`: Disables CSP.
- **Response**: An HTML page with an external image.

### 4. Negative Case (No `nosniff`)
- **Endpoint**: `/negative_case`
- **Description**: Serves a fake HTML file as an image without `X-Content-Type-Options: nosniff`. The browser may sniff the content and execute JavaScript.
- **Response**: A fake HTML file served with `Content-Type: image/png`.

### 5. Positive Case (With `nosniff`)
- **Endpoint**: `/positive_case`
- **Description**: Serves a fake HTML file as an image with `X-Content-Type-Options: nosniff`. The browser will not sniff the content and will treat it as an image.
- **Response**: A fake HTML file served with `Content-Type: image/png` and `X-Content-Type-Options: nosniff`.

---

## Client Functionality

The client-side application provides buttons to test each feature:
1. **Fetch Simple CORS Data**: Tests the `/simple_cors/get_data` endpoint.
2. **Fetch Complex CORS Data**: Tests the `/complex_cors/get_data` endpoint.
3. **Test CSP Header**: Tests the `/csp_example` endpoint with or without CSP.
4. **Test Negative Case (No nosniff)**: Tests the `/negative_case` endpoint.
5. **Test Positive Case (With nosniff)**: Tests the `/positive_case` endpoint.

Responses are displayed in the same page using an `iframe`.

---

## Testing

1. **CORS**:
   - Click **Fetch Simple CORS Data** to see the response from the simple CORS endpoint.
   - Click **Fetch Complex CORS Data** to see the response from the complex CORS endpoint.

2. **CSP**:
   - Click **Test CSP Header** and choose whether to enable or disable CSP. Observe how the external image is loaded or blocked.

3. **X-Content-Type-Options**:
   - Click **Test Negative Case (No nosniff)** to see how the browser sniffs and executes JavaScript.
   - Click **Test Positive Case (With nosniff)** to see how the browser respects the `nosniff` header and treats the file as an image.

---

## Contributing

Contributions are welcome!

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

Sourjya Mukherjee

---

Enjoy exploring security headers`! Let me know if you have any questions or feedback. 😊
```
