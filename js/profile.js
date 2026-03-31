function initProfile() {
  if (!restoreSession()) return;
  renderAuthNav("profile");
  renderProfile();
}


function renderProfile() {
  document.getElementById("profileName").innerHTML   = currentUser.name;
  document.getElementById("profileEmail").innerHTML  = currentUser.email;
  document.getElementById("profileDept").innerHTML   = currentUser.dept;
  document.getElementById("profileAvatar").innerHTML = currentUser.name.charAt(0).toUpperCase();

  
  document.getElementById("edit-name").value = currentUser.name;
  document.getElementById("edit-dept").value = currentUser.dept;

  
  var totalCount = 0;
  var soldCount  = 0;
  for (var i = 0; i < listings.length; i++) {
    if (listings[i].sellerEmail == currentUser.email) {
      totalCount++;
      if (listings[i].sold) {
        soldCount++;
      }
    }
  }

  var listingCountEl = document.getElementById("profileListingCount");
  var soldCountEl    = document.getElementById("profileSoldCount");
  if (listingCountEl != null) { listingCountEl.innerHTML = totalCount; }
  if (soldCountEl    != null) { soldCountEl.innerHTML    = soldCount; }
}


function saveProfile() {
  var name = document.getElementById("edit-name").value;
  name = name.trim();
  var dept = document.getElementById("edit-dept").value;

  if (name == "") {
    
    document.getElementById("edit-name").focus();
    showToast("Name cannot be empty.");
    return;
  }

  currentUser.name = name;
  currentUser.dept = dept;
  sessionStorage.setItem("cc_name", name);
  sessionStorage.setItem("cc_dept", dept);

  
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == currentUser.email) {
      users[i].name = name;
      users[i].dept = dept;
      break;
    }
  }

  renderProfile();
  renderAuthNav("profile");
  showToast("Profile updated!");
}


function saveNotifPrefs() {
  var msg   = document.getElementById("notif-msg").checked;
  var newer = document.getElementById("notif-new").checked;
  var price = document.getElementById("notif-price").checked;

  var count = 0;
  var prefs = [msg, newer, price];
  for (var i = 0; i < prefs.length; i++) {
    if (prefs[i]) {
      count++;
    }
  }

  showToast("Preferences saved! (" + count + " notification(s) enabled)");
}
