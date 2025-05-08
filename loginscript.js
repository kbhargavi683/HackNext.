document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const welcomePage = document.getElementById('welcomePage');
    const loginFormElement = document.getElementById('loginFormElement');
    const registerFormElement = document.getElementById('registerFormElement');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginAlert = document.getElementById('loginAlert');
    const registerAlert = document.getElementById('registerAlert');
  
    // Check if user is already logged in
    checkLoginStatus();
  
    // Event Listeners
    showRegister.addEventListener('click', showRegisterForm);
    showLogin.addEventListener('click', showLoginForm);
    logoutBtn.addEventListener('click', logout);
    loginFormElement.addEventListener('submit', handleLogin);
    registerFormElement.addEventListener('submit', handleRegister);
  
    // Functions
    function showRegisterForm(e) {
      e.preventDefault();
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
      clearAlerts();
    }
  
    function showLoginForm(e) {
      e.preventDefault();
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
      clearAlerts();
    }
  
    function clearAlerts() {
      loginAlert.style.display = 'none';
      registerAlert.style.display = 'none';
    }
  
    function showAlert(alertElement, message, type) {
      alertElement.textContent = message;
      alertElement.style.display = 'block';
      alertElement.className = 'alert ' + type;
      
      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 5000);
    }
  
    function checkLoginStatus() {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      if (currentUser) {
        showWelcomePage(currentUser);
      }
    }
  
    function showWelcomePage(user) {
      loginForm.classList.add('hidden');
      registerForm.classList.add('hidden');
      welcomePage.classList.remove('hidden');
      
      document.getElementById('welcomeMessage').textContent = `Welcome, ${user.name}!`;
      document.getElementById('userFullName').textContent = `${user.name} ${user.surname}`;
      document.getElementById('userEmail').textContent = user.email;
      document.getElementById('userMobile').textContent = user.mobile;
    }
  
    function handleLogin(e) {
      e.preventDefault();
      
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      
      if (!email || !password) {
        showAlert(loginAlert, 'Please fill in all fields', 'alert-danger');
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email || u.mobile === email);
      
      if (!user) {
        showAlert(loginAlert, 'User not found', 'alert-danger');
        return;
      }
      
      if (user.password !== password) {
        showAlert(loginAlert, 'Invalid credentials', 'alert-danger');
        return;
      }
      
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      showWelcomePage(user);
    }
  
    function handleRegister(e) {
      e.preventDefault();
      
      const name = document.getElementById('registerName').value.trim();
      const surname = document.getElementById('registerSurname').value.trim();
      const mobile = document.getElementById('registerMobile').value.trim();
      const email = document.getElementById('registerEmail').value.trim();
      const password = document.getElementById('registerPassword').value.trim();
      const confirmPassword = document.getElementById('registerConfirmPassword').value.trim();
      
      // Validation
      if (!name || !surname || !mobile || !email || !password || !confirmPassword) {
        showAlert(registerAlert, 'Please fill in all fields', 'alert-danger');
        return;
      }
      
      if (!/^\d{10,15}$/.test(mobile)) {
        showAlert(registerAlert, 'Please enter a valid mobile number (10-15 digits)', 'alert-danger');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showAlert(registerAlert, 'Please enter a valid email address', 'alert-danger');
        return;
      }
      
      if (password !== confirmPassword) {
        showAlert(registerAlert, 'Passwords do not match', 'alert-danger');
        return;
      }
      
      if (password.length < 6) {
        showAlert(registerAlert, 'Password must be at least 6 characters long', 'alert-danger');
        return;
      }
      
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const emailExists = users.some(user => user.email === email);
      const mobileExists = users.some(user => user.mobile === mobile);
      
      if (emailExists) {
        showAlert(registerAlert, 'Email already registered', 'alert-danger');
        return;
      }
      
      if (mobileExists) {
        showAlert(registerAlert, 'Mobile number already registered', 'alert-danger');
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        surname,
        mobile,
        email,
        password // Note: In a real app, never store plain text passwords
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Clear form
      registerFormElement.reset();
      
      // Show success and switch to login
      showAlert(registerAlert, 'Registration successful! Please login.', 'alert-success');
      setTimeout(() => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        registerAlert.style.display = 'none';
      }, 2000);
    }
  
    function logout() {
      sessionStorage.removeItem('currentUser');
      welcomePage.classList.add('hidden');
      loginForm.classList.remove('hidden');
      loginFormElement.reset();
    }
  });
  //fixed button icon
  
  