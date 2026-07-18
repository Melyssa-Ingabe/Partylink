// Toggle password visibility
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

// Login form handling
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error-msg');

    // Basic validation
    if (!email || !password) {
      errorMsg.classList.remove('hidden');
      errorMsg.textContent = 'Please fill in all fields.';
      return;
    }

    // Placeholder — replace with real API call later
    console.log('Logging in with:', email, password);

    // Simulate successful login (remove this when backend is ready)
    alert('Login successful! (Backend not connected yet)');
  });
}

// Register form handling
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirm = document.getElementById('confirm-password').value.trim();
    const errorMsg = document.getElementById('error-msg');

    // Basic validation
    if (!name || !email || !password || !confirm) {
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

    // Placeholder — replace with real API call later
    console.log('Registering:', name, email, password);

    // Simulate successful registration
    alert('Account created! (Backend not connected yet)');
  });
}