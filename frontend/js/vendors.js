// Filter vendors based on search input and dropdowns
function filterVendors() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const location = document.getElementById('locationFilter').value;
  const minRating = parseFloat(document.getElementById('ratingFilter').value) || 0;

  const cards = document.querySelectorAll('.vendor-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const cardCategory = card.dataset.category;
    const cardLocation = card.dataset.location;
    const cardRating = parseFloat(card.dataset.rating);

    const matchesSearch = name.includes(search);
    const matchesCategory = category === '' || cardCategory === category;
    const matchesLocation = location === '' || cardLocation === location;
    const matchesRating = cardRating >= minRating;

    if (matchesSearch && matchesCategory && matchesLocation && matchesRating) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update results count
  document.getElementById('resultsCount').textContent = `Showing ${visibleCount} vendor${visibleCount !== 1 ? 's' : ''}`;

  // Show/hide no results message
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

// Clear all filters
function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = '';
  document.getElementById('locationFilter').value = '';
  document.getElementById('ratingFilter').value = '';
  filterVendors();
}