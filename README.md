# Partylink

**PartyLink** is a web-based marketplace that connects event service vendors — DJs, decorators, caterers, photographers, florists, and MCs — with individuals and organizations planning events across Africa, starting with Kigali, Rwanda.

## Live Demo
- **Frontend:** https://partylink-app.vercel.app
- **Backend API:** https://partylink-backend.onrender.com

## Neon screenshot showing that the data is coming from the backend
frontend/images/Neon screenshot.png

## Test Accounts

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

## Author
Melyssa Ingabe - African Leadership University (ALU)

## Mission
This project falls under ALU's **Job Creation** GCGO. PartyLink aims to digitize and formalize the informal event services industry in Africa by giving vendors a professional online presence and clients a reliable way to find and book services.

## Tech Stack
**Frontend:**
- HTML, CSS, JavaScript
- Hosted on Vercel

**Backend:**
- Node.js with Express
- PostgreSQL (Neon)
- JWT Authentication
- bcrypt for password hashing
- Hosted on Render

## Project Structure
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

## Features
- Browse and search event vendors by category, location, and rating
- Vendor profiles with services, portfolio, and reviews
- User registration and login (client and vendor roles)
- Send booking requests to vendors
- Vendor dashboard to manage bookings
- Admin dashboard for platform moderation
- Fully responsive on mobile and desktop

## Getting Started

### Prerequisites
- Node.js v18 or higher — download from https://nodejs.org
- A Neon PostgreSQL database — create a free account at https://neon.tech
- VS Code with the Live Server extension installed
- Git installed on your machine

### Step 1 — Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/Melyssa-Ingabe/Partylink.git
cd Partylink
```

### Step 2 — Set Up the Backend
Navigate to the backend folder:
```bash
cd backend
```

Install all dependencies:
```bash
npm install
```

Create a `.env` file inside the `backend` folder with the following content:

PORT=5000
JWT_SECRET=partylink_secret_key_2026
DATABASE_URL=your_neon_connection_string_here


To get your Neon connection string:
1. Go to https://neon.tech and sign in
2. Open your project
3. Click on Dashboard and copy the connection string
4. It should start with `postgresql://`

### Step 3 — Set Up the Database Tables
Still inside the `backend` folder, run:
```bash
node setupDb.js
```

You should see:

Connected to Neon database!
All tables created successfully!


### Step 4 — Start the Backend Server
```bash
npm run dev
```

You should see:

Server running on http://localhost:5000
Connected to Neon database!


### Step 5 — Run the Frontend
1. Open the project in VS Code
2. Right-click on `frontend/index.html`
3. Click **Open with Live Server**
4. The site will open in your browser at `http://localhost:5500`

### Step 6 — Test the Application
You can use the test accounts listed above to log in, or create a new account directly on the register page.

To test API endpoints, use Postman or visit:

http://localhost:5000/api/vendors

### Frontend Setup
Open `frontend/index.html` with Live Server in VS Code.

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get a JWT token

### Vendors
- `GET /api/vendors` - Get all verified vendors
- `GET /api/vendors/:id` - Get a single vendor with services and reviews
- `POST /api/vendors/create` - Create a vendor profile

### Bookings
- `POST /api/bookings/create` - Create a booking request
- `GET /api/bookings/vendor/:id` - Get all bookings for a vendor
- `GET /api/bookings/client/:id` - Get all bookings for a client
- `PATCH /api/bookings/:id/status` - Update booking status

### Reviews
- `POST /api/reviews/create` - Submit a review
- `GET /api/reviews/vendor/:id` - Get all reviews for a vendor

## Future Improvements
- **In-app payments** - Allow clients to pay vendors directly through the platform using a payment gateway
- **Admin dashboard backend connection** - The admin dashboard currently displays sample data; a future version will connect it to real platform data for vendor approvals, content moderation, and user management
- **Real-time messaging** - A live chat feature allowing clients and vendors to communicate directly within the platform
- **Mobile application** - A dedicated iOS and Android app for PartyLink
- **AI-powered vendor recommendations** - Suggest vendors to clients based on their event type, budget, and location
- **Vendor availability calendar** - Allow vendors to set and display their available dates
- **Multi-city expansion** - Expand beyond Kigali to other cities across Rwanda and sub-Saharan Africa

## License
This project was built as part of the ALU Software Engineering program.