function initCart() {
  if (!restoreSession()) return;
  renderAuthNav("browse");
  renderCart();
}


function renderCart() {
  var el = document.getElementById("cartContent");
  updateCartBadge();

  if (cart.length == 0) {
    el.innerHTML =
      "<div class='empty'>" +
        "<div class='empty-icon'>&#128722;</div>" +
        "<div class='empty-text'>Your cart is empty</div>" +
        "<a class='btn btn-primary' href='browse.html'>Browse listings</a>" +
      "</div>";
    return;
  }

  
  var itemsHtml = "";
  for (var i = 0; i < cart.length; i++) {
    var l = findListingById(cart[i]);
    if (l == null) continue;

    itemsHtml +=
      "<div class='cart-item'>" +
        "<div class='cart-item-img'>" + l.emoji + "</div>" +
        "<div class='cart-item-info'>" +
          "<div class='cart-item-name'>" + l.name + "</div>" +
          "<div class='cart-item-price'>" + formatPrice(l.price) + " &middot; " + l.seller + "</div>" +
          "<div style='font-size:0.75rem;color:var(--muted)'>" + l.cond + "</div>" +
        "</div>" +
        "<button class='btn btn-danger btn-sm' onclick='doRemoveFromCart(" + l.id + ")'>Remove</button>" +
      "</div>";
  }

  var total = getCartTotal();

  el.innerHTML =
    itemsHtml +
    "<div class='cart-summary'>" +
      "<div class='cart-row'>" +
        "<span class='text-muted'>Subtotal (" + cart.length + " items)</span>" +
        "<span>" + formatPrice(total) + "</span>" +
      "</div>" +
      "<div class='cart-row'>" +
        "<span class='text-muted'>Platform fee</span>" +
        "<span style='color:var(--accent)'>FREE</span>" +
      "</div>" +
      "<hr class='divider' style='margin:0.75rem 0'>" +
      "<div class='cart-row cart-total'>" +
        "<span>Total</span>" +
        "<span style='color:var(--accent)'>" + formatPrice(total) + "</span>" +
      "</div>" +
      "<button class='btn btn-primary btn-full mt-2' onclick='checkout()'>Request to buy</button>" +
    "</div>";
}


function doRemoveFromCart(id) {
  removeFromCartById(id);
  saveCart();
  renderCart();
  showToast("Removed from cart.");
}


function checkout() {
  if (cart.length == 0) return;

  
  for (var i = 0; i < cart.length; i++) {
    var item = findListingById(cart[i]);
    if (item != null) {
      item.sold = true;
    }
  }

  
  cart = [];
  saveCart();
  updateCartBadge();

  
  var modal = document.getElementById("checkoutModal");
  modal.style.display = "block";
}


function closeCheckout() {
  
  var radios   = document.getElementsByName("delivery");
  var delivery = "";
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      delivery = radios[i].value;
      break;
    }
  }

  var modal = document.getElementById("checkoutModal");
  modal.style.display = "none";

  renderCart();
  showToast("Order placed! Delivery: " + delivery);
}
