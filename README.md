# 🧭 Destination Search (feature in Hotel Booking App)

A fullstack hotel search application with destination autocomplete (uses MongoDB)

## 📁 Project Structure

destination-search/
├── hotel-search/ # Frontend: React app
├── hotel-api/ # Backend: Express + MongoDB API



## 🌐 Frontend (React) – `hotel-search/`

### Features

- Destination search with autocomplete dropdown
- Date selection for check-in and check-out
- Rooms & guests selection
- Clean and responsive UI

### Getting Started

```bash
cd hotel-search
npm install
npm start
```

This app will run on:
http://localhost:3000



## ⚙️ Backend (Node.js + Express + MongoDB) – hotel-api/

### Features

- API endpoint to search destinations from MongoDB
- Case-insensitive search by term, state, or country
- Simple and lightweight backend

### Getting Started
```bash
cd hotel-api
npm install
node server.js
```
The backend server will run on:
http://localhost:4000


MongoDB Setup (Local)
```bash
sudo systemctl start mongod
mongoimport --db hotelApp --collection destinations --file destinations.json --jsonArray
mongosh
use hotelApp
```

## Tech Stack
- Frontend: React, TypeScript, CSS
- Backend: Node.js, Express
- Database: MongoDB
