function showToast(msg) {
  var t = document.getElementById("toast");
  if (t == null) return;
  t.innerHTML   = msg;
  t.style.display = "block";

  
  var count = 0;
  var timer = setInterval(function() {
    count++;
    if (count >= 1) {
      clearInterval(timer);
      t.style.display = "none";
    }
  }, 2800);
}



function setActiveNav(pageId) {
  var navIds = ["nb-dashboard", "nb-browse", "nb-post", "nb-mylistings", "nb-profile"];
  for (var i = 0; i < navIds.length; i++) {
    var el = document.getElementById(navIds[i]);
    if (el != null) {
      el.className = "nav-btn";           
    }
  }
  var active = document.getElementById("nb-" + pageId);
  if (active != null) {
    active.className = "nav-btn active-link";   
  }
}


function updateCartBadge() {
  var badge = document.getElementById("cartBadge");
  if (badge != null) {
    badge.innerHTML = cart.length;
  }
}



function addHoverBorder(elementId) {
  var el = document.getElementById(elementId);
  if (el == null) return;
  el.onmouseover = function() {
    el.style.borderColor = "#c8f135";
  };
  el.onmouseout = function() {
    if (document.activeElement != el) {
      el.style.borderColor = "";
    }
  };
}


function renderAuthNav(activePage) {
  var navDiv = document.getElementById("navAuth");
  if (navDiv == null) return;

  var initials = "U";
  if (currentUser != null && currentUser.name.length > 0) {
    initials = currentUser.name.charAt(0).toUpperCase();
  }

  navDiv.innerHTML =
    "<a class='nav-logo' href='dashboard.html'>Campus<span>Cart</span></a>" +
    "<div class='nav-links'>" +
      "<a id='nb-dashboard' class='nav-btn' href='dashboard.html'>Dashboard</a>" +
      "<a id='nb-browse'    class='nav-btn' href='browse.html'>Browse</a>" +
      "<a id='nb-post'      class='nav-btn' href='post.html'>+ Post</a>" +
      "<a id='nb-mylistings' class='nav-btn' href='mylistings.html'>My Listings</a>" +
      "<a id='nb-cart'      class='cart-icon' href='cart.html'>Cart <span id='cartBadge'>0</span></a>" +
      "<a id='nb-profile'   href='profile.html'>" +
        "<button id='navAvatar'>" + initials + "</button>" +
      "</a>" +
    "</div>";

  updateCartBadge();
  setActiveNav(activePage);
}



function attachCartListeners() {
  var btns = document.getElementsByClassName("add-to-cart-btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      var id = parseInt(this.getAttribute("data-id"));
      addItemToCart(id, this);
    });
  }
}


function addItemToCart(id, btn) {
  if (currentUser == null) {
    window.location.href = "login.html";
    return;
  }
  var item = findListingById(id);
  if (item != null && item.sold) {
    showToast("Sorry, this item is already sold.");
    return;
  }
  if (isInCart(id)) {
    showToast("Already in cart!");
    return;
  }
  cart.push(id);
  saveCart();
  updateCartBadge();
  showToast("Added to cart!");
  if (btn != null) {
    btn.innerHTML = "In cart";
    btn.className = "btn btn-secondary btn-sm add-to-cart-btn";
  }
}
