function initBrowse() {
  if (!restoreSession()) return;
  renderAuthNav("browse");
  addHoverBorder("searchInput");
  filterListings();
}



function filterListings() {
  var searchVal  = document.getElementById("searchInput").value.toLowerCase();
  var catVal     = document.getElementById("catFilter").value;
  var priceVal   = document.getElementById("priceFilter").value;
  var grid       = document.getElementById("listingsGrid");
  var countEl    = document.getElementById("resultsCount");

  var filtered = [];

  
  for (var i = 0; i < listings.length; i++) {
    var l = listings[i];

    
    var matchSearch = (l.name.toLowerCase().indexOf(searchVal) != -1) ||
                      (l.desc.toLowerCase().indexOf(searchVal) != -1);

    
    var matchCat = (catVal == "" || l.cat == catVal);

    
    var matchPrice = true;
    if (priceVal == "0-500")       matchPrice = (l.price < 500);
    else if (priceVal == "500-2000")  matchPrice = (l.price >= 500 && l.price <= 2000);
    else if (priceVal == "2000-10000") matchPrice = (l.price > 2000 && l.price <= 10000);
    else if (priceVal == "10000plus")  matchPrice = (l.price > 10000);

    if (matchSearch && matchCat && matchPrice) {
      filtered.push(l);
    }
  }

  countEl.innerHTML = filtered.length + " item(s) found";

  if (filtered.length == 0) {
    grid.innerHTML =
      "<div class='empty' style='grid-column:1/-1'>" +
        "<div class='empty-icon'>&#128269;</div>" +
        "<div class='empty-text'>No items match your search</div>" +
        "<button class='btn btn-secondary' onclick='clearFilters()'>Clear filters</button>" +
      "</div>";
    return;
  }

  
  var html = "";
  for (var i = 0; i < filtered.length; i++) {
    var l = filtered[i];
    var soldBadge = "";
    if (l.sold) {
      soldBadge = "<div style='text-align:right;margin-bottom:0.3rem'>" +
                    "<span class='sold-stamp'>SOLD</span>" +
                  "</div>";
    }

    var condClass = (l.cond == "Like New") ? "tag-green" : "tag-gray";
    var cartBtn   = "";
    if (!l.sold) {
      var btnLabel = isInCart(l.id) ? "In cart" : "Add to cart";
      var btnClass = isInCart(l.id) ? "btn btn-secondary btn-sm add-to-cart-btn" : "btn btn-primary btn-sm add-to-cart-btn";
      cartBtn = "<button class='" + btnClass + "' data-id='" + l.id + "'>" + btnLabel + "</button>";
    }

    html +=
      "<div class='card'" +
           " onmouseover='highlightCard(this)'" +
           " onmouseout='unhighlightCard(this)'>" +
        "<div class='card-img'>" +
          "<span>" + l.emoji + "</span>" +
        "</div>" +
        "<div class='card-body'>" +
          soldBadge +
          "<div style='display:flex;justify-content:space-between;margin-bottom:0.3rem'>" +
            "<span class='tag tag-gray'>" + l.cat + "</span>" +
            "<span class='tag " + condClass + "'>" + l.cond + "</span>" +
          "</div>" +
          "<div class='card-title'>" + l.name + "</div>" +
          "<div class='card-price'>" + formatPrice(l.price) + "</div>" +
          "<div class='card-seller'>by " + l.seller + " &middot; " + l.sellerDept + "</div>" +
          "<div class='card-actions'>" +
            cartBtn +
            "<a class='btn btn-secondary btn-sm' href='detail.html?id=" + l.id + "'>View</a>" +
          "</div>" +
        "</div>" +
      "</div>";
  }

  grid.innerHTML = html;
  attachCartListeners();
}


function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("catFilter").value   = "";
  document.getElementById("priceFilter").value = "";
  filterListings();
}


function highlightCard(el) {
  el.style.borderColor = "#c8f135";
}

function unhighlightCard(el) {
  el.style.borderColor = "#2a2a2a";
}
