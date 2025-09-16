# 🚐 Shuttle Mediation Website (Client-Server Project)

A full-stack web application for coordinating and managing rides (shuttle mediation).  
The project is built with **React + TypeScript** on the client side and **Node.js + Express** on the server side, with data stored in **MongoDB**.

---

## 📂 Project Structure

client-server/
│
├── client/ # React + TypeScript frontend (Vite)
├── server/ # Node.js + Express backend
└── README.md


---

## 🚀 Features
- **Frontend (React + TypeScript)**  
  - State management using **Redux Toolkit**  
  - Styled with **MUI** (Material UI)  
  - Communication with backend REST API  

- **Backend (Node.js + Express)**  
  - REST API for client communication  
  - User authentication and authorization using **JWT**  
  - Password hashing with **Bcrypt**  
  - **Integrated with the Open Data API (data.gov.il) to retrieve and process city and street data**  
  - Structured error handling  

- **Database**  
  - **MongoDB** for storing user and ride information  

- **Version Control**  
  - Project managed with **Git & GitHub**

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/client-server.git
   cd client-server

Install dependencies for both client and server:

cd server
npm install

cd ../client
npm install

▶️ Running the Project

Start the server

cd server
node app.js


Server will run by default on: http://localhost:7002

Start the client

cd client
npm run dev


Client will run by default on: http://localhost:5173

🌐 API Endpoints
Cities

GET /cities?q=<query>

Retrieves a unique list of cities from data.gov.il
.

Streets

GET /streets?city=<city>

Retrieves a unique list of streets for a given city.

📅 Future Development

Google Calendar API integration for scheduling rides

Advanced user role management

Deployment on cloud services (Vercel/Netlify for client, Render/Heroku/AWS for server)

🛠️ Technologies

Frontend: React, TypeScript, Vite, Redux Toolkit, MUI

Backend: Node.js, Express, JWT, Bcrypt, Axios

Database: MongoDB

Version Control: Git, GitHub

External APIs: Open Data API (data.gov.il)

👩‍💻 Author

Developed as part of a full-stack web development project, 2025.

