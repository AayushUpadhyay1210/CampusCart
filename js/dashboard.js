function initDashboard() {
  if (!restoreSession()) return;

  renderAuthNav("dashboard");
  renderGreeting();
  renderStats();
  drawSalesChart();
  renderRecentListings();
}


function renderGreeting() {
  var greetEl = document.getElementById("dashGreet");
  var hour    = new Date().getHours();
  var greet   = "";

  if (hour < 12) {
    greet = "Good morning";
  } else if (hour < 17) {
    greet = "Good afternoon";
  } else {
    greet = "Good evening";
  }

  var firstName = currentUser.name.split(" ")[0];
  greetEl.innerHTML = greet + ", " + firstName + "!";
}


function renderStats() {
  var activeCount = 0;
  var myCount     = 0;

  
  for (var i = 0; i < listings.length; i++) {
    if (!listings[i].sold) {
      activeCount++;
    }
    if (listings[i].sellerEmail == currentUser.email) {
      myCount++;
    }
  }

  var cartTotal = getCartTotal();

  document.getElementById("statActive").innerHTML = activeCount;
  document.getElementById("statMine").innerHTML   = myCount;
  document.getElementById("statCart").innerHTML   = cart.length;
  document.getElementById("statValue").innerHTML  = formatPrice(cartTotal);
}


function drawSalesChart() {
  var canvas = document.getElementById("salesChart");
  if (canvas == null) return;

  var ctx  = canvas.getContext("2d");
  var W    = canvas.offsetWidth;
  var H    = 180;
  canvas.width  = W;
  canvas.height = H;

  var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var data = [3, 7, 5, 9, 6, 12, 8];
  var maxVal = 0;

  
  var j = 0;
  while (j < data.length) {
    if (data[j] > maxVal) {
      maxVal = data[j];
    }
    j++;
  }

  var padTop    = 20;
  var padBottom = 35;
  var padLeft   = 30;
  var padRight  = 10;
  var barWidth  = (W - padLeft - padRight) / days.length;

  
  ctx.clearRect(0, 0, W, H);

  
  for (var i = 0; i < days.length; i++) {
    var barH = ((data[i] / maxVal) * (H - padTop - padBottom));
    var x    = padLeft + (i * barWidth) + (barWidth * 0.15);
    var y    = H - padBottom - barH;
    var bw   = barWidth * 0.7;

    
    if (i == 5) {
      ctx.fillStyle = "#c8f135";
    } else {
      ctx.fillStyle = "#2a2a2a";
    }

    ctx.beginPath();
    ctx.rect(x, y, bw, barH);
    ctx.fill();

    
    ctx.fillStyle = "#888888";
    ctx.font = "11px DM Sans, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(days[i], x + (bw / 2), H - 10);

    
    if (i == 5) {
      ctx.fillStyle = "#c8f135";
      ctx.fillText(data[i], x + (bw / 2), y - 5);
    }
  }

  
  ctx.strokeStyle = "#2a2a2a";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padLeft - 5, padTop);
  ctx.lineTo(padLeft - 5, H - padBottom);
  ctx.stroke();
}


function renderRecentListings() {
  var el  = document.getElementById("recentListings");
  var out = "";
  var count = 0;

  
  var start = listings.length - 1;
  if (start < 0) {
    el.innerHTML = "<p class='text-muted'>No listings yet.</p>";
    return;
  }

  var i = start;
  do {
    var l = listings[i];
    out += "<a class='recent-row' href='detail.html?id=" + l.id + "'>" +
             "<span class='recent-emoji'>" + l.emoji + "</span>" +
             "<div class='recent-info'>" +
               "<div class='recent-name'>" + l.name + "</div>" +
               "<div class='recent-meta'>" + l.cat + " &middot; " + l.cond + "</div>" +
             "</div>" +
             "<span class='recent-price'>" + formatPrice(l.price) + "</span>" +
           "</a>";
    count++;
    i--;
  } while (i >= 0 && count < 5);

  el.innerHTML = out;
}
