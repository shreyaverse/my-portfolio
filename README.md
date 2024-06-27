# Backend Server Setup and API Documentation

## Introduction

This project is a backend server built with Node.js and Express, connected to a MongoDB database, and capable of handling contact form submissions. The server includes email notifications using Nodemailer.

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (local or cloud instance)
- Nodemailer 

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
PORT=5001
MONGODB_URI=<your-mongodb-uri>
EMAIL_USER=<your-email-username>
EMAIL_PASS=<your-app-password>
```

### 4. Run the Server

```bash
npm start
```

The server should now be running at `http://localhost:5001`.

## API Endpoints

### GET /

**Description:** Welcome endpoint to verify that the API is running.

**Response:**

```plaintext
Welcome to the API
```

### POST /api/contact

**Description:** Endpoint to submit a contact form.

**Request Body:**

```json
{
  "name": "Your Name",
  "email": "your.email@example.com",
  "message": "Your message here"
}
```

**Response:**

- **201 Created**

```plaintext
Message sent successfully!
```

- **400 Bad Request**

```plaintext
All fields are required
```

- **500 Internal Server Error**

```plaintext
Error saving contact message
```
