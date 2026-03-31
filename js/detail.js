function initDetail() {
  if (!restoreSession()) return;
  renderAuthNav("browse");

  
  var search = window.location.search;
  var id     = 0;

  
  if (search.indexOf("id=") != -1) {
    var parts = search.split("id=");
    id = parseInt(parts[1]);
  }

  if (id == 0) {
    window.location.href = "browse.html";
    return;
  }

  var item = findListingById(id);
  if (item == null) {
    window.location.href = "browse.html";
    return;
  }

  renderDetail(item);
}


function renderDetail(l) {
  
  document.getElementById("detailImg").innerHTML = l.emoji;

  
  document.getElementById("detailTitle").innerHTML = l.name;
  document.getElementById("detailPrice").innerHTML = formatPrice(l.price);

  
  document.getElementById("detailDesc").innerHTML = l.desc;

  
  document.getElementById("detailSellerAvatar").innerHTML = l.seller.charAt(0);
  document.getElementById("detailSellerName").innerHTML   = l.seller;
  document.getElementById("detailSellerDept").innerHTML   = l.sellerDept;

  
  var soldEl = document.getElementById("detailSoldBadge");
  if (l.sold) {
    soldEl.innerHTML = "<span class='sold-stamp'>SOLD</span>";
    soldEl.style.marginBottom = "0.5rem";
  } else {
    soldEl.innerHTML = "";
  }

  
  var tagsHtml = "<span class='tag tag-gray'>" + l.cat + "</span> ";
  if (l.cond == "Like New") {
    tagsHtml += "<span class='tag tag-green'>" + l.cond + "</span> ";
  } else {
    tagsHtml += "<span class='tag tag-gray'>" + l.cond + "</span> ";
  }
  if (l.nego)     tagsHtml += "<span class='tag tag-orange'>Negotiable</span> ";
  if (l.exchange) tagsHtml += "<span class='tag tag-orange'>Exchange OK</span>";
  document.getElementById("detailTags").innerHTML = tagsHtml;

  
  var actionsEl = document.getElementById("detailActions");
  if (!l.sold) {
    var btnLabel = isInCart(l.id) ? "In cart" : "Add to cart";
    var btnClass = isInCart(l.id) ? "btn btn-secondary" : "btn btn-primary";
    actionsEl.innerHTML =
      "<button id='cartBtn' class='" + btnClass + "' onclick='detailAddToCart(" + l.id + ")'>" + btnLabel + "</button>" +
      "<button class='btn btn-secondary' onclick='msgSeller(\"" + l.seller + "\")'>Message seller</button>";
  } else {
    actionsEl.innerHTML = "<span class='text-muted'>This item has been sold.</span>";
  }
}


function detailAddToCart(id) {
  addItemToCart(id, null);
  
  var btn = document.getElementById("cartBtn");
  if (btn != null) {
    btn.innerHTML  = "In cart";
    btn.className  = "btn btn-secondary";
  }
}


function msgSeller(name) {
  showToast("Message sent to " + name + "!");
}
