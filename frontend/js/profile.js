// Open booking modal
function openBookingModal() {
  document.getElementById('modalOverlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Close booking modal
function closeBookingModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// Submit booking request
async function submitBooking(e) {
  e.preventDefault();

  const eventType = document.getElementById('eventType').value;
  const eventDate = document.getElementById('eventDate').value;
  const guestCount = document.getElementById('guestCount').value;
  const notes = document.getElementById('notes').value;
  const errorMsg = document.getElementById('booking-error');

  // Basic validation
  if (!eventType || !eventDate || !guestCount) {
    errorMsg.classList.remove('hidden');
    errorMsg.textContent = 'Please fill in event type, date, and guest count.';
    return;
  }

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    errorMsg.classList.remove('hidden');
    errorMsg.textContent = 'You must be logged in to send a booking request.';
    return;
  }

  errorMsg.classList.add('hidden');

  try {
    const response = await fetch('${API_URL}/api/bookings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_id: user.id,
        vendor_id: VENDOR_ID,
        event_date: eventDate,
        event_type: eventType,
        guest_count: parseInt(guestCount),
        notes: notes
      })
    });

    const data = await response.json();

    if (!response.ok) {
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = data.error;
      return;
    }

    closeBookingModal();
    alert('Booking request sent successfully! The vendor will respond soon.');

  } catch (err) {
    errorMsg.classList.remove('hidden');
    errorMsg.textContent = 'Something went wrong. Please try again.';
  }
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeBookingModal();
  }
});