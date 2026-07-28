// ===========================
// TOGGLE PASSWORD VISIBILITY
// ===========================
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.querySelector('.toggle-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    toggleBtn.textContent = 'Show';
  }
}

// ===========================
// REGISTER FORM
// ===========================
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirm = document.getElementById('confirm-password').value.trim();
    const role = document.getElementById('role').value;
    const errorMsg = document.getElementById('error-msg');

    // Basic validation
    if (!name || !email || !phone || !password || !confirm) {
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = 'Please fill in all fields.';
      return;
    }

    if (password !== confirm) {
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = 'Passwords do not match.';
      return;
    }

    if (password.length < 8) {
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = 'Password must be at least 8 characters.';
      return;
    }

    // Hide error
    errorMsg.classList.add('hidden');

    try {
      const response = await fetch('${API_URL}/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, phone })
      });

      const data = await response.json();

      if (!response.ok) {
        errorMsg.classList.remove('hidden');
        errorMsg.textContent = data.error;
        return;
      }

      // Save token and user info to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === 'vendor') {
        window.location.href = 'vendor-dashboard.html';
      } else {
        window.location.href = '../index.html';
      }

    } catch (err) {
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = 'Something went wrong. Please try again.';
    }
  });
}

// ===========================
// LOGIN FORM
// ===========================
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error-msg');

    if (!email || !password) {
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = 'Please fill in all fields.';
      return;
    }

    errorMsg.classList.add('hidden');

    try {
      const response = await fetch(`${API_URL}/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        errorMsg.classList.remove('hidden');
        errorMsg.textContent = data.error;
        return;
      }

      // Save token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === 'vendor') {
        window.location.href = 'vendor-dashboard.html';
      } else if (data.user.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else {
        window.location.href = '../index.html';
      }

    } catch (err) {
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = 'Something went wrong. Please try again.';
    }
  });
}

// ===========================
// ROLE TAB SWITCHING (Register)
// ===========================
function selectRole(role, btn) {
  document.getElementById('role').value = role;
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const vendorFields = document.getElementById('vendorFields');
  if (role === 'vendor') {
    vendorFields.classList.remove('hidden');
  } else {
    vendorFields.classList.add('hidden');
  }
}