// Register User
function registerUser() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const error = document.getElementById("regError");

  if (!name || !email || !password) {
    error.textContent = "All fields are required.";
    return false;
  }
  if (!email.includes("@")) {
    error.textContent = "Invalid email.";
    return false;
  }
  if (password.length < 6) {
    error.textContent = "Password must be at least 6 characters.";
    return false;
  }

  if (localStorage.getItem("user_" + email)) {
    error.textContent = "Email already exists.";
    return false;
  }

  const user = { name, email, password };
  localStorage.setItem("user_" + email, JSON.stringify(user));
  window.location.href = "index.html";
  return false;
}

// Login User
function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const error = document.getElementById("loginError");

  const data = localStorage.getItem("user_" + email);
  if (!data) {
    error.textContent = "Email not found.";
    return false;
  }

  const user = JSON.parse(data);
  if (user.password !== password) {
    error.textContent = "Wrong password.";
    return false;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  window.location.href = "home.html";
  return false;
}

// Show Home Page
window.onload = function () {
  const welcomeMsg = document.getElementById("welcomeMsg");
  if (welcomeMsg) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      window.location.href = "index.html";
    } else {
      welcomeMsg.textContent = `Welcome, ${user.name}`;
    }
  }
};

// Logout User
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
