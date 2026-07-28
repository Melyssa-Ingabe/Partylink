const API_URL = 'https://partylink-backend.onrender.com';

// ===========================
// SIDEBAR MENU TAB SWITCHING
// ===========================
const menuItems = document.querySelectorAll('.sidebar-menu li');

menuItems.forEach(item => {
  item.addEventListener('click', function () {
    menuItems.forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// ===========================
// LOAD REAL BOOKINGS (Vendor)
// ===========================
async function loadVendorBookings() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  try {
    const response = await fetch(`${API_URL}/api/bookings/vendor/${user.id}`);
    const bookings = await response.json();

    const tbody = document.getElementById('bookingsTableBody');
    if (!tbody) return;

    if (bookings.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#888;">No bookings yet.</td></tr>';
      return;
    }

    tbody.innerHTML = bookings.map(b => `
      <tr>
        <td>${b.customer_name}</td>
        <td>${b.event_type}</td>
        <td>${new Date(b.event_date).toLocaleDateString()}</td>
        <td>
          <span class="status ${b.status === 'pending' ? 'pending' : b.status === 'accepted' ? 'confirmed' : 'declined'}">
            ${b.status.charAt(0).toUpperCase() + b.status.slice(1)}
          </span>
        </td>
        <td>
          ${b.status === 'pending' ? `
            <button class="btn-view" onclick="updateBooking(${b.id}, 'accepted')">Accept</button>
            <button style="background:#fee2e2;color:#991b1b;border:none;padding:8px 14px;border-radius:6px;cursor:pointer;font-weight:600;margin-left:6px;" onclick="updateBooking(${b.id}, 'declined')">Decline</button>
          ` : '—'}
        </td>
      </tr>
    `).join('');

  } catch (err) {
    console.error('Error loading bookings:', err);
  }
}

// ===========================
// ACCEPT OR DECLINE BOOKING
// ===========================
async function updateBooking(bookingId, status) {
  try {
    const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    const data = await response.json();

    if (!response.ok) {
      alert('Failed to update booking.');
      return;
    }

    alert(`Booking ${status} successfully!`);
    loadVendorBookings();

  } catch (err) {
    console.error('Error updating booking:', err);
  }
}

// ===========================
// LOAD VENDOR STATS
// ===========================
async function loadVendorStats() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  try {
    const response = await fetch(`http://localhost:5000/api/bookings/vendor/${user.id}`);
    const bookings = await response.json();

    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;

    const totalEl = document.getElementById('statTotal');
    const pendingEl = document.getElementById('statPending');

    if (totalEl) totalEl.textContent = total;
    if (pendingEl) pendingEl.textContent = pending;

  } catch (err) {
    console.error('Error loading stats:', err);
  }
}

// ===========================
// SMOOTH SCROLL SIDEBAR
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Load on page open
loadVendorBookings();
loadVendorStats();