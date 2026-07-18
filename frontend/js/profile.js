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
function submitBooking(e) {
  e.preventDefault();

  const eventType = document.getElementById('eventType').value;
  const eventDate = document.getElementById('eventDate').value;
  const guestCount = document.getElementById('guestCount').value;
  const errorMsg = document.getElementById('booking-error');

  // Basic validation
  if (!eventType || !eventDate || !guestCount) {
    errorMsg.classList.remove('hidden');
    errorMsg.textContent = 'Please fill in event type, date, and guest count.';
    return;
  }

  // Hide error if previously shown
  errorMsg.classList.add('hidden');

  // Placeholder — replace with real API call later
  console.log('Booking request sent:', { eventType, eventDate, guestCount });

  // Close modal and show success
  closeBookingModal();
  alert('Booking request sent! The vendor will respond within 2 hours. (Backend not connected yet)');
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeBookingModal();
  }
});