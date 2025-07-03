# Log Ingestion and Querying System

A full-stack application to ingest logs and view/filter them based on various parameters. Built using **Node.js + Express** for the backend and **React + Vite** for the frontend.

---

## Project Structure

log-query-system
    backend/ # Node.js backend API
    frontend/ # React frontend with Vite
    README.md # Setup & instructions


---

##  Features

### Backend API

- **POST /logs**: Ingest a log in predefined JSON format.
- **GET /logs**: Filter logs by:
  - `message` (full-text search)
  - `level` (info, warn, error, debug)
  - `resourceId`
  - `timestamp_start`, `timestamp_end`
  - `traceId`, `spanId`, `commit`

### Frontend

- Dynamic log viewer with real-time filter updates.
- Filters:
  - Full-text search
  - Log level selector
  - Resource ID
  - Timestamp range

---

##  Setup Instructions

### Prerequisites

- Node.js 
- npm

---

### Backend Setup

cd backend
npm install
npm start

### Frontend Setup
cd frontend
npm install
npm run dev

---

## Optional Bonus Challenges

### Basic Analytics View
    Added a small dashboard component to the UI that displays a simple chart showing the count of
logs by level over the currently filtered time range.

### Unit Testing
    Added a few meaningful unit tests for a critical piece of the
application's logic. 

