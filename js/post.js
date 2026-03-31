function initPost() {
  if (!restoreSession()) return;
  renderAuthNav("post");
  addHoverBorder("p-name");
  addHoverBorder("p-price");
  addHoverBorder("p-desc");
}



function updateEmojiPreview() {
  var cat  = document.getElementById("p-cat").value;
  var name = document.getElementById("p-name").value.toLowerCase();
  var el   = document.getElementById("emojiPreview");

  var emoji = catEmoji[cat];
  if (emoji == null) emoji = "📦";

  
  if (name.indexOf("laptop") != -1)          emoji = "💻";
  else if (name.indexOf("phone") != -1)       emoji = "📱";
  else if (name.indexOf("fan") != -1)         emoji = "🌀";
  else if (name.indexOf("cycle") != -1)       emoji = "🚲";
  else if (name.indexOf("bike") != -1)        emoji = "🚲";
  else if (name.indexOf("headphone") != -1)   emoji = "🎧";
  else if (name.indexOf("book") != -1)        emoji = "📚";

  el.innerHTML = emoji;
}


function postItem() {
  var name     = document.getElementById("p-name").value.trim();
  var cat      = document.getElementById("p-cat").value;
  var price    = document.getElementById("p-price").value;
  var cond     = document.getElementById("p-cond").value;
  var desc     = document.getElementById("p-desc").value.trim();
  var nego     = document.getElementById("p-nego").checked;      
  var exchange = document.getElementById("p-exchange").checked;  
  var al       = document.getElementById("postAlert");

  
  if (name == "" || cat == "" || price == "" || desc == "") {
    al.innerHTML = "<div class='alert alert-error'>Please fill in all required fields.</div>";
    return;
  }
  var priceNum = parseFloat(price);
  if (priceNum <= 0 || isNaN(priceNum)) {
    al.innerHTML = "<div class='alert alert-error'>Price must be greater than 0.</div>";
    return;
  }

  var emoji = document.getElementById("emojiPreview").innerHTML;

  
  var newItem = {
    id:          getNextId(),
    name:        name,
    cat:         cat,
    price:       priceNum,
    cond:        cond,
    desc:        desc,
    seller:      currentUser.name,
    sellerDept:  currentUser.dept,
    sellerEmail: currentUser.email,
    emoji:       emoji,
    sold:        false,
    nego:        nego,
    exchange:    exchange
  };

  
  listings.push(newItem);
  saveListings();

  al.innerHTML = "";

  
  document.getElementById("p-name").value    = "";
  document.getElementById("p-price").value   = "";
  document.getElementById("p-desc").value    = "";
  document.getElementById("p-cat").value     = "";
  document.getElementById("p-cond").value    = "Like New";
  document.getElementById("p-nego").checked  = false;
  document.getElementById("p-exchange").checked = false;
  document.getElementById("emojiPreview").innerHTML = "📦";

  showToast("Listing posted successfully!");
  window.location.href = "browse.html";
}
