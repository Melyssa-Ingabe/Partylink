// ===========================
// SEARCH BAR — HOMEPAGE
// ===========================
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');
const searchSelect = document.querySelector('.search-select');

if (searchBtn) {
  searchBtn.addEventListener('click', function () {
    const category = searchSelect ? searchSelect.value : '';
    const keyword = searchInput ? searchInput.value.trim() : '';

    let url = 'pages/vendors.html?';
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (keyword) url += `search=${encodeURIComponent(keyword)}`;

    window.location.href = url;
  });
}

if (searchInput) {
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
}

// ===========================
// NAVBAR — SCROLL SHADOW
// ===========================
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

// ===========================
// NAVBAR — AUTH STATE
// ===========================
const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.innerHTML = `
      <li><a href="pages/vendors.html">Browse Vendors</a></li>
      <li><span class="nav-username">Hi, ${user.name.split(' ')[0]} </span></li>
      ${user.role === 'vendor' ? '<li><a href="pages/vendor-dashboard.html">Dashboard</a></li>' : ''}
      ${user.role === 'admin' ? '<li><a href="pages/admin-dashboard.html">Dashboard</a></li>' : ''}
      <li><a href="#" onclick="logout()">Log Out</a></li>
    `;
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/frontend/index.html';
}