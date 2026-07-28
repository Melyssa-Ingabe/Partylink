// ===========================
// VENDOR IMAGES MAP
// ===========================
const vendorImages = {
  'DJ': '../images/DJ Kev.jpg',
  'Decoration': '../images/Elegant Events Décor.jpg',
  'Photography': '../images/Lens & Light Studio.jpg',
  'Catering': '../images/Taste of Africa Catering.jpg',
  'Florist': '../images/Bloom & Petal Florist.jpg',
  'MC': '../images/MC Brillant.jpg'
};

const vendorProfiles = {
  'DJ': 'vendor-profile-dj-kev.html',
  'Decoration': 'vendor-profile-decoration.html',
  'Photography': 'vendor-profile-photography.html',
  'Catering': 'vendor-profile-catering.html',
  'Florist': 'vendor-profile-florist.html',
  'MC': 'vendor-profile-mc.html'
};

// ===========================
// FETCH VENDORS FROM BACKEND
// ===========================
async function loadVendors() {
  try {
    const response = await fetch('http://localhost:5000/api/vendors');
    const vendors = await response.json();

    const grid = document.getElementById('vendorGrid');
    const resultsCount = document.getElementById('resultsCount');

    if (vendors.length === 0) {
      grid.innerHTML = '';
      document.getElementById('noResults').classList.remove('hidden');
      resultsCount.textContent = 'Showing 0 vendors';
      return;
    }

    resultsCount.textContent = `Showing ${vendors.length} vendor${vendors.length !== 1 ? 's' : ''}`;

    grid.innerHTML = vendors.map(vendor => `
      <div class="vendor-card"
        data-name="${vendor.business_name.toLowerCase()}"
        data-category="${vendor.category_name}"
        data-location="${vendor.location}"
        data-rating="${vendor.rating}">
        <img src="${vendorImages[vendor.category_name] || '../images/placeholder.jpg'}"
             alt="${vendor.business_name}"
             class="vendor-img"/>
        <div class="vendor-info">
          <span class="vendor-category">${vendor.category_name}</span>
          <h3>${vendor.business_name}</h3>
          <p class="vendor-location"><i class="fas fa-map-marker-alt"></i> ${vendor.location}</p>
          <p class="vendor-price">${vendor.pricing_info}</p>
          <div class="vendor-rating">
            ${'★'.repeat(Math.round(vendor.rating))}${'☆'.repeat(5 - Math.round(vendor.rating))}
            <span>(${vendor.rating} rating)</span>
          </div>
          <a href="${vendorProfiles[vendor.category_name]}" class="btn-view">View Profile</a>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error('Error loading vendors:', err);
    document.getElementById('vendorGrid').innerHTML = '<p>Failed to load vendors. Please try again.</p>';
  }
}

// ===========================
// FILTER VENDORS
// ===========================
function filterVendors() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const location = document.getElementById('locationFilter').value;
  const minRating = parseFloat(document.getElementById('ratingFilter').value) || 0;

  const cards = document.querySelectorAll('.vendor-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.dataset.name;
    const cardCategory = card.dataset.category;
    const cardLocation = card.dataset.location;
    const cardRating = parseFloat(card.dataset.rating);

    const matchesSearch = name.includes(search);
    const matchesCategory = category === '' || cardCategory === category;
    const matchesLocation = location === '' || cardLocation.includes(location);
    const matchesRating = cardRating >= minRating;

    if (matchesSearch && matchesCategory && matchesLocation && matchesRating) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  document.getElementById('resultsCount').textContent = `Showing ${visibleCount} vendor${visibleCount !== 1 ? 's' : ''}`;

  const noResults = document.getElementById('noResults');
  const vendorGrid = document.getElementById('vendorGrid');
  if (visibleCount === 0) {
    noResults.classList.remove('hidden');
    vendorGrid.style.display = 'none';
  } else {
    noResults.classList.add('hidden');
    vendorGrid.style.display = 'grid';
  }
}

// ===========================
// CLEAR FILTERS
// ===========================
function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = '';
  document.getElementById('locationFilter').value = '';
  document.getElementById('ratingFilter').value = '';
  filterVendors();
}

// Load vendors when page opens
loadVendors();