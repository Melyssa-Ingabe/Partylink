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