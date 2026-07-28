-- USERS
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('client', 'vendor', 'admin')) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

-- VENDOR PROFILES
CREATE TABLE IF NOT EXISTS vendor_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(150) NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id),
  location VARCHAR(100),
  pricing_info VARCHAR(255),
  rating DECIMAL(2,1) DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE
);

-- SERVICES
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  vendor_id INTEGER REFERENCES vendor_profiles(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'available'
);

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES users(id),
  vendor_id INTEGER REFERENCES users(id),
  service_id INTEGER REFERENCES services(id),
  event_date DATE,
  event_type VARCHAR(100),
  guest_count INTEGER,
  notes TEXT,
  status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'declined', 'completed')) DEFAULT 'pending',
  total_price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES users(id),
  vendor_id INTEGER REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id),
  receiver_id INTEGER REFERENCES users(id),
  text TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(150),
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- INSERT DEFAULT CATEGORIES
INSERT INTO categories (name) VALUES
  ('DJ'),
  ('Decoration'),
  ('Catering'),
  ('Photography'),
  ('Florist'),
  ('MC'),
  ('Transport')
ON CONFLICT (name) DO NOTHING;