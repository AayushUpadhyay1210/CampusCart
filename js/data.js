var currentUser = null;
var users = [];


var cart = [];
var savedCart = sessionStorage.getItem("cc_cart");
if (savedCart != null && savedCart != "") {
  var cartParts = savedCart.split(",");
  for (var c = 0; c < cartParts.length; c++) {
    cart.push(parseInt(cartParts[c]));
  }
}


var listings = [
  {
    id: 1,
    name: "Engineering Physics (2nd Ed)",
    cat: "Books",
    price: 180,
    cond: "Good",
    desc: "R.K. Bansal. Minimal highlighting, all pages intact. Great for 1st year students.",
    seller: "Priya S.",
    sellerDept: "Electronics",
    sellerEmail: "priya@college.edu.in",
    emoji: "📚",
    sold: false,
    nego: true,
    exchange: false
  },
  {
    id: 2,
    name: "HP 15s Laptop",
    cat: "Electronics",
    price: 28000,
    cond: "Like New",
    desc: "Intel i5, 8GB RAM, 512GB SSD. Used for 6 months only. Includes original charger and box.",
    seller: "Rahul M.",
    sellerDept: "Computer Science",
    sellerEmail: "rahul@college.edu.in",
    emoji: "💻",
    sold: false,
    nego: false,
    exchange: false
  },
  {
    id: 3,
    name: "Study Table + Chair",
    cat: "Furniture",
    price: 1500,
    cond: "Good",
    desc: "Solid wood table (3x2 ft) with cushioned chair. Minor scratches. Self-pickup from hostel B.",
    seller: "Ananya R.",
    sellerDept: "MBA",
    sellerEmail: "ananya@college.edu.in",
    emoji: "🪑",
    sold: false,
    nego: true,
    exchange: true
  },
  {
    id: 4,
    name: "Sony WH-1000XM4",
    cat: "Electronics",
    price: 12000,
    cond: "Like New",
    desc: "6 months old, box included, noise cancellation works perfectly. Minor cosmetic marks.",
    seller: "Dev K.",
    sellerDept: "Computer Science",
    sellerEmail: "dev@college.edu.in",
    emoji: "🎧",
    sold: false,
    nego: false,
    exchange: false
  },
  {
    id: 5,
    name: "Cricket Kit (full)",
    cat: "Sports",
    price: 3500,
    cond: "Fair",
    desc: "Bat, pads, gloves, helmet. Used one season. Bat has some tape wrapping.",
    seller: "Vikram P.",
    sellerDept: "Mechanical",
    sellerEmail: "vikram@college.edu.in",
    emoji: "🏏",
    sold: false,
    nego: true,
    exchange: false
  },
  {
    id: 6,
    name: "Levis Jacket (M)",
    cat: "Clothing",
    price: 900,
    cond: "Like New",
    desc: "Barely worn, bought wrong size. Olive green, size M.",
    seller: "Riya T.",
    sellerDept: "Civil",
    sellerEmail: "riya@college.edu.in",
    emoji: "🧥",
    sold: false,
    nego: false,
    exchange: false
  },
  {
    id: 7,
    name: "Maths Textbook Set (3 books)",
    cat: "Books",
    price: 400,
    cond: "Good",
    desc: "M1, M2, M3 textbooks. Some notes written in margins. Perfect for CS/EC students.",
    seller: "Arun J.",
    sellerDept: "Computer Science",
    sellerEmail: "arun@college.edu.in",
    emoji: "📚",
    sold: true,
    nego: false,
    exchange: false
  },
  {
    id: 8,
    name: "Ceiling Fan (48 inch)",
    cat: "Furniture",
    price: 700,
    cond: "Fair",
    desc: "Works fine, leaving hostel. Self-pickup only. Includes mounting hardware.",
    seller: "Meena L.",
    sellerDept: "Civil",
    sellerEmail: "meena@college.edu.in",
    emoji: "🌀",
    sold: false,
    nego: true,
    exchange: false
  }
];

var savedListings = sessionStorage.getItem("cc_listings");
if (savedListings != null && savedListings != "") {
  listings = [];
  var rows = savedListings.split("||");
  for (var r = 0; r < rows.length; r++) {
    if (rows[r] == "") continue;
    var f = rows[r].split("|");
    var restoredItem = {
      id:          parseInt(f[0]),
      name:        f[1],
      cat:         f[2],
      price:       parseFloat(f[3]),
      cond:        f[4],
      desc:        f[5],
      seller:      f[6],
      sellerDept:  f[7],
      sellerEmail: f[8],
      emoji:       f[9],
      sold:        f[10] == "true",
      nego:        f[11] == "true",
      exchange:    f[12] == "true"
    };
    listings.push(restoredItem);
  }
}


var catEmoji = {
  "Books":       "📚",
  "Electronics": "💻",
  "Clothing":    "👕",
  "Furniture":   "🪑",
  "Sports":      "⚽",
  "Other":       "📦",
  "":            "📦"
};


function findListingById(id) {
  var result = null;
  for (var i = 0; i < listings.length; i++) {
    if (listings[i].id == id) {
      result = listings[i];
      break;
    }
  }
  return result;
}


function findUserByEmail(email) {
  var result = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      result = users[i];
      break;
    }
  }
  return result;
}


function isInCart(id) {
  var i = 0;
  while (i < cart.length) {
    if (cart[i] == id) {
      return true;
    }
    i++;
  }
  return false;
}


function removeFromCartById(id) {
  var newCart = [];
  for (var i = 0; i < cart.length; i++) {
    if (cart[i] != id) {
      newCart.push(cart[i]);
    }
  }
  cart = newCart;
}


function getCartTotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var item = findListingById(cart[i]);
    if (item != null) {
      total = total + item.price;
    }
  }
  return total;
}


function formatPrice(price) {
  return "Rs. " + price;
}


function getNextId() {
  var maxId = 0;
  for (var i = 0; i < listings.length; i++) {
    if (listings[i].id > maxId) {
      maxId = listings[i].id;
    }
  }
  return maxId + 1;
}


function getMyListings() {
  var mine = [];
  for (var i = 0; i < listings.length; i++) {
    if (currentUser != null && listings[i].sellerEmail == currentUser.email) {
      mine.push(listings[i]);
    }
  }
  return mine;
}


function deleteListingById(id) {
  var newList = [];
  for (var i = 0; i < listings.length; i++) {
    if (listings[i].id != id) {
      newList.push(listings[i]);
    }
  }
  listings = newList;
  removeFromCartById(id);
}


if (savedListings == null || savedListings == "") {
  
}


function saveListings() {
  var rows = [];
  for (var i = 0; i < listings.length; i++) {
    var l = listings[i];
    if (l.id > 8) {
      rows.push(l.id + "|" + l.name + "|" + l.cat + "|" + l.price + "|" + l.cond + "|" + l.desc + "|" + l.seller + "|" + l.sellerDept + "|" + l.sellerEmail + "|" + l.emoji + "|" + l.sold + "|" + l.nego + "|" + l.exchange);
    }
  }
  sessionStorage.setItem("cc_listings", rows.join("||"));
}


function saveCart() {
  sessionStorage.setItem("cc_cart", cart.join(","));
}


if (savedListings == null || savedListings == "") {
  saveListings();
}
