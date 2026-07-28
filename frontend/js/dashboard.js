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
// VENDOR APPROVAL (Admin)
// ===========================
const approveButtons = document.querySelectorAll('table .btn-view');

approveButtons.forEach(btn => {
  btn.addEventListener('click', function () {
    const row = this.closest('tr');
    const statusCell = row.querySelector('.status');

    if (statusCell && statusCell.classList.contains('pending')) {
      statusCell.textContent = 'Approved';
      statusCell.classList.remove('pending');
      statusCell.classList.add('confirmed');
      this.textContent = 'View';
    }
  });
});

// ===========================
// BOOKING STATUS UPDATE (Vendor)
// ===========================
function updateBookingStatus(button, newStatus) {
  const row = button.closest('tr');
  const statusCell = row.querySelector('.status');

  if (!statusCell) return;

  if (newStatus === 'confirmed') {
    statusCell.textContent = 'Confirmed';
    statusCell.classList.remove('pending');
    statusCell.classList.add('confirmed');
  } else if (newStatus === 'declined') {
    statusCell.textContent = 'Declined';
    statusCell.classList.remove('pending');
    statusCell.classList.add('declined');
  }

  const actionCell = button.closest('td');
  if (actionCell) actionCell.innerHTML = '—';
}

// ===========================
// HIGHLIGHT ACTIVE NAV LINK
// ===========================
const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  if (link.getAttribute('href') !== '#' && currentPage.includes(link.getAttribute('href'))) {
    link.style.color = '#e85d26';
  }
});