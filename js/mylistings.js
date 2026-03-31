function initMyListings() {
  if (!restoreSession()) return;
  renderAuthNav("mylistings");
  renderMyListings();
}


function filterMyListings() {
  renderMyListings();
}


function renderMyListings() {
  var el     = document.getElementById("myListingsContent");
  var filter = "all";
  var sel    = document.getElementById("statusFilter");
  if (sel != null) {
    filter = sel.value;
  }

  var allMine = getMyListings();

  
  var mine = [];
  for (var i = 0; i < allMine.length; i++) {
    if (filter == "active" && allMine[i].sold)  continue;
    if (filter == "sold"   && !allMine[i].sold) continue;
    mine.push(allMine[i]);
  }

  if (mine.length == 0) {
    el.innerHTML =
      "<div class='empty'>" +
        "<div class='empty-icon'>&#128230;</div>" +
        "<div class='empty-text'>You haven't posted anything yet.</div>" +
        "<a class='btn btn-primary' href='post.html'>Post your first item</a>" +
      "</div>";
    return;
  }

  var html = "";

  
  for (var i = 0; i < mine.length; i++) {
    var l = mine[i];

    var soldText = l.sold ? " &middot; <span style='color:var(--accent2)'>SOLD</span>" : "";

    var markBtn = "";
    if (!l.sold) {
      markBtn = "<button class='btn btn-outline btn-sm' onclick='markSold(" + l.id + ")'>Mark sold</button>";
    }

    html +=
      "<div class='my-item'>" +
        "<div class='my-item-img'>" + l.emoji + "</div>" +
        "<div class='my-item-info'>" +
          "<div class='my-item-name'>" + l.name + "</div>" +
          "<div class='my-item-price'>" + formatPrice(l.price) + "</div>" +
          "<div class='my-item-meta'>" + l.cat + " &middot; " + l.cond + soldText + "</div>" +
        "</div>" +
        "<div class='my-item-actions'>" +
          markBtn +
          "<button class='btn btn-danger btn-sm' onclick='deleteItem(" + l.id + ")'>Delete</button>" +
        "</div>" +
      "</div>";
  }

  el.innerHTML = html;
}


function markSold(id) {
  var item = findListingById(id);
  if (item != null) {
    item.sold = true;
    saveListings();
    renderMyListings();
    showToast("Marked as sold!");
  }
}


function deleteItem(id) {
  deleteListingById(id);
  saveListings();
  renderMyListings();
  updateCartBadge();
  showToast("Listing deleted.");
}
