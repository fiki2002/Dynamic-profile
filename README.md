# Dynamic Profile API — Stage 0

[GitHub Repository](https://github.com/fiki2002/Dynamic-profile)  
[Live API](https://dynamic-profile-production-da30.up.railway.app/me) 🚀

A simple Node.js RESTful API that exposes a `/me` endpoint returning **personal profile information** along with a **dynamic cat fact** from the [Cat Facts API](https://catfact.ninja/fact). This project demonstrates API consumption, JSON formatting, and dynamic data handling.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Installation](#installation)  
- [Running Locally](#running-locally)  
- [API Endpoint](#api-endpoint)  
- [API Response Example](#api-response-example)  
- [Dependencies](#dependencies)  
- [Environment Variables](#environment-variables)  
- [Error Handling](#error-handling)  
- [Notes](#notes)  

---

## Project Overview

This API implements a single GET endpoint `/me` that:

- Returns structured JSON with `status`, `user` information, `timestamp`, and a random cat fact  
- Fetches a new cat fact on every request  
- Returns the current UTC time in ISO 8601 format  
- Handles errors gracefully if the Cat Facts API fails  
- Includes CORS headers for browser compatibility  

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/fiki2002/Dynamic-profile.git
cd Dynamic-profile
```

2. **Install dependencies:**

```bash
npm install
```

*Note: This project uses only Node.js built-in modules (`http` and `https`), so no external dependencies are required.*

---

## Running Locally

1. **Start the server:**

```bash
node server.js
```

2. **Access the endpoint:**

Open your browser or use a tool like `curl` or Postman:

```bash
curl http://localhost:3000/me
```

3. **Expected output:**

The server will log requests and respond with JSON containing your profile and a cat fact.

---

## Live Deployment

The API is deployed on Railway and accessible at:

**Base URL:** `https://dynamic-profile-production-da30.up.railway.app`

**Endpoint:** `https://dynamic-profile-production-da30.up.railway.app/me`

Try it:
```bash
curl https://dynamic-profile-production-da30.up.railway.app/me
```

---

## API Endpoints

### `GET /`

**Description:** Returns API information and available endpoints.

**Method:** `GET`

**URL:** `/`

**Response:**
```json
{
  "status": "success",
  "message": "Welcome to Dynamic Profile API",
  "endpoints": {
    "/me": "GET - Returns user profile with a random cat fact"
  },
  "documentation": "https://github.com/fiki2002/Dynamic-profile"
}
```

---

### `GET /me`

**Description:** Returns user profile information along with a random cat fact.

**Method:** `GET`

**URL:** `/me`

**Query Parameters:** None

**Headers:** None required

---

## API Response Example

### Success Response (200 OK)

```json
{
  "status": "success",
  "user": {
    "email": "adepitanoluwatosin202@gmail.com",
    "name": "Adepitan Oluwatosin",
    "stack": "Node.js"
  },
  "timestamp": "2025-10-18T14:32:45.123Z",
  "fact": "Cats sleep 70% of their lives."
}
```

### Error Response (500 Internal Server Error)

```json
{
  "status": "error",
  "message": "Failed to fetch cat fact"
}
```

### Not Found Response (404 Not Found)

```json
{
  "status": "error",
  "error": "Not Found"
}
```

---

## Dependencies

This project uses **only Node.js built-in modules**:

- `http` - For creating the HTTP server
- `https` - For making requests to the Cat Facts API

**No external npm packages required!**

---

## Environment Variables

You can optionally set the port using an environment variable:

```bash
PORT=8080 node server.js
```

**Default:** `3000`

---

## Error Handling

The API includes several error handling mechanisms:

1. **Request Timeout:** If the Cat Facts API doesn't respond within 5 seconds, the request times out
2. **JSON Parse Error:** If the API returns invalid JSON, an error is returned
3. **Network Error:** If the HTTPS request fails, the error is caught and logged
4. **404 Handling:** Any endpoint other than `/me` returns a 404 error

---

## Notes

- The server includes graceful shutdown handlers for `SIGTERM` and `SIGINT` signals
- CORS headers are enabled to allow cross-origin requests
- Each request is logged with a timestamp to the console
- The Cat Facts API endpoint used: `https://catfact.ninja/fact`

---

## Project Structure

```
Dynamic-profile/
├── catFactService.js    # Service module for fetching cat facts
├── server.js            # Main server file
├── package.json         # Project metadata (if present)
└── README.md           # This file
```

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Adepitan Oluwatosin**  
- Email: adepitanoluwatosin202@gmail.com  
- Stack: Node.js  
- GitHub: [fiki2002](https://github.com/fiki2002)

---

## Contributing

Feel free to open issues or submit pull requests to improve this project!