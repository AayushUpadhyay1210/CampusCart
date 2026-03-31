function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function doSignup() {
  var name  = document.getElementById("su-name").value;
  var email = document.getElementById("su-email").value;
  var pass  = document.getElementById("su-pass").value;
  var dept  = document.getElementById("su-dept").value;
  var al    = document.getElementById("signupAlert");

  name  = name.trim();
  email = email.trim();

  if (name == "" || email == "" || pass == "" || dept == "") {
    al.innerHTML = "<div class='alert alert-error'>Please fill in all fields.</div>";
    return;
  }

  // ✅ Email format validation
  if (!isValidEmail(email)) {
    al.innerHTML = "<div class='alert alert-error'>Please enter a valid email address.</div>";
    return;
  }

  if (pass.length < 6) {
    al.innerHTML = "<div class='alert alert-error'>Password must be at least 6 characters.</div>";
    return;
  }

  var existing = findUserByEmail(email);
  if (existing != null) {
    al.innerHTML = "<div class='alert alert-error'>This email is already registered.</div>";
    return;
  }

  var newUser = {
    name:  name,
    email: email,
    pass:  pass,
    dept:  dept
  };

  users.push(newUser);
  al.innerHTML = "";
  loginUser(newUser);
}


function doLogin() {
  var email = document.getElementById("li-email").value;
  var pass  = document.getElementById("li-pass").value;
  var al    = document.getElementById("loginAlert");

  email = email.trim();

  if (email == "" || pass == "") {
    al.innerHTML = "<div class='alert alert-error'>Please enter your email and password.</div>";
    return;
  }

  // ✅ Email format validation
  if (!isValidEmail(email)) {
    al.innerHTML = "<div class='alert alert-error'>Please enter a valid email address.</div>";
    return;
  }

  al.innerHTML = "";

  var user = findUserByEmail(email);
  if (user == null) {
    user = { name: email.split("@")[0], email: email, pass: pass, dept: "General" };
    users.push(user);
  }
  loginUser(user);
}


function quickDemo() {
  var demo = {
    name:  "Demo Student",
    email: "demo@college.edu.in",
    pass:  "demo123",
    dept:  "Computer Science"
  };

  var existing = findUserByEmail(demo.email);
  if (existing == null) {
    users.push(demo);
    loginUser(demo);
  } else {
    loginUser(existing);
  }
}


function loginUser(user) {
  currentUser = user;
  sessionStorage.setItem("cc_user", user.email);
  sessionStorage.setItem("cc_name", user.name);
  sessionStorage.setItem("cc_dept", user.dept);
  window.location.href = "dashboard.html";
}


function doLogout() {
  currentUser = null;
  cart = [];
  sessionStorage.removeItem("cc_user");
  sessionStorage.removeItem("cc_name");
  sessionStorage.removeItem("cc_dept");
  sessionStorage.removeItem("cc_cart");
  sessionStorage.removeItem("cc_listings");
  window.location.href = "index.html";
}


function updateDeptPreview() {
  var dept = document.getElementById("su-dept").value;
  var el   = document.getElementById("deptPreview");

  if (dept == "") {
    el.style.display = "none";
    return;
  }

  var tips = "";
  if (dept == "Computer Science") tips = "Popular: Laptops, programming books, cables";
  else if (dept == "Electronics")    tips = "Popular: Lab kits, multimeters, textbooks";
  else if (dept == "Mechanical")     tips = "Popular: Drawing instruments, reference books";
  else if (dept == "Civil")          tips = "Popular: AutoCAD books, measuring tools";
  else if (dept == "Chemical")            tips = "Popular: Case study books, formal wear";
  else                               tips = "Browse all categories on CampusCart";

  el.style.display = "block";
  el.innerHTML     = "Tip: " + tips;
}


function checkAlreadyLoggedIn() {
  var savedEmail = sessionStorage.getItem("cc_user");
  if (savedEmail != null) {
    window.location.href = "dashboard.html";
  }
}


function restoreSession() {
  var savedEmail = sessionStorage.getItem("cc_user");
  if (savedEmail == null) {
    window.location.href = "login.html";
    return false;
  }

  currentUser = {
    name:  sessionStorage.getItem("cc_name"),
    email: savedEmail,
    dept:  sessionStorage.getItem("cc_dept")
  };
  return true;
}