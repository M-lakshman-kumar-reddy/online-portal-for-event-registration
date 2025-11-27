# Online Portal for Event Registration

An online portal for event registration, allowing users to register by submitting their name, email, and event choice. Registration data is stored in MySQL, and the backend validates user inputs. The portal displays all registered participants on the frontend.

## Tech Stack

- **Frontend**: React (with Vite)
- **Backend**: Node.js with Express
- **Database**: MySQL

## Project Structure

```
├── backend/                 # Node.js backend
│   ├── config/
│   │   └── database.js     # MySQL database configuration
│   ├── routes/
│   │   └── registration.js # Registration API routes
│   ├── server.js           # Express server entry point
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── RegistrationForm.jsx
│   │   │   ├── RegistrationForm.css
│   │   │   ├── ParticipantsList.jsx
│   │   │   └── ParticipantsList.css
│   │   ├── services/
│   │   │   └── api.js      # API service for backend communication
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd online-portal-for-event-registration
```

### 2. Set Up the Database

1. Install MySQL and start the MySQL service
2. Create the database (optional - the application will create it automatically):

```sql
CREATE DATABASE event_registration;
```

### 3. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=event_registration
PORT=5000
```

Start the backend server:

```bash
npm start
```

### 4. Set Up the Frontend

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

## API Endpoints

### POST /api/register

Register a new participant.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "event_choice": "Tech Conference 2024"
}
```

**Response (Success - 201):**
```json
{
  "message": "Registration successful",
  "registration": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "event_choice": "Tech Conference 2024"
  }
}
```

### GET /api/registrations

Get all registered participants.

**Response (Success - 200):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "event_choice": "Tech Conference 2024",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

## Features

- User-friendly registration form
- Input validation (both client-side and server-side)
- Duplicate email prevention
- Real-time participant list updates
- Responsive design
- Error handling and user feedback

## Available Events

- Tech Conference 2024
- Web Development Workshop
- AI & Machine Learning Summit
- Cybersecurity Bootcamp
- Cloud Computing Meetup