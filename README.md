# Partylink

**PartyLink** is a web-based marketplace that connects event service vendors — DJs, decorators, caterers, photographers, florists, and MCs — with individuals and organizations planning events across Africa, starting with Kigali, Rwanda.

## 🌍 Live Demo
- **Frontend:** https://partylink-app.vercel.app
- **Backend API:** https://partylink-backend.onrender.com

## Neon screenshot showing that the data is coming from the backend
frontend/images/Neon screenshot.png

## 🔑 Test Accounts

**Client Account:**
- Email: `aline@gmail.com`
- Password: `password123`

**Vendor Account:**
- Email: `djkev@partylink.rw`
- Password: `password123`

**Admin Account:**
- Email: `admin@partylink.rw`
- Password: `password123`
- Access: Admin Dashboard at `/pages/admin-dashboard.html`

## 👤 Author
Melyssa Ingabe — African Leadership University (ALU)

## 🎯 Mission
This project falls under ALU's **Job Creation** GCGO. PartyLink aims to digitize and formalize the informal event services industry in Africa by giving vendors a professional online presence and clients a reliable way to find and book services.

## 🛠️ Tech Stack
**Frontend:**
- HTML, CSS, JavaScript
- Hosted on Vercel

**Backend:**
- Node.js with Express
- PostgreSQL (Neon)
- JWT Authentication
- bcrypt for password hashing
- Hosted on Render

## 📁 Project Structure
partylink/
├── frontend/
│ ├── css/
│ ├── images/
│ ├── js/
│ ├── pages/
│ └── index.html
├── backend/
│ ├── routes/
│ │ ├── auth.js
│ │ ├── vendors.js
│ │ ├── bookings.js
│ │ └── reviews.js
│ ├── db.js
│ ├── db.sql
│ └── server.js
└── README.md

## ✨ Features
- Browse and search event vendors by category, location, and rating
- Vendor profiles with services, portfolio, and reviews
- User registration and login (client and vendor roles)
- Send booking requests to vendors
- Vendor dashboard to manage bookings
- Admin dashboard for platform moderation
- Fully responsive on mobile and desktop

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL database (we use Neon)

### Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# JWT_SECRET=your_secret
# DATABASE_URL=your_neon_connection_string
npm run dev
```

### Frontend Setup
Open `frontend/index.html` with Live Server in VS Code.

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get a JWT token

### Vendors
- `GET /api/vendors` — Get all verified vendors
- `GET /api/vendors/:id` — Get a single vendor with services and reviews
- `POST /api/vendors/create` — Create a vendor profile

### Bookings
- `POST /api/bookings/create` — Create a booking request
- `GET /api/bookings/vendor/:id` — Get all bookings for a vendor
- `GET /api/bookings/client/:id` — Get all bookings for a client
- `PATCH /api/bookings/:id/status` — Update booking status

### Reviews
- `POST /api/reviews/create` — Submit a review
- `GET /api/reviews/vendor/:id` — Get all reviews for a vendor

## 📄 License
This project was built as part of the ALU Software Engineering program.