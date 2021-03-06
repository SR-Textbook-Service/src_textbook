function get_data(uuid, postReq, sellBuy) {
  var ajax = new XMLHttpRequest();

  ajax.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);

      if(data.length > 0) {
        populate(data[0], sellBuy, uuid);
      }
    }
  }

  ajax.open("POST", postReq, true);
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajax.send("query=" + uuid);
}

function get_param() {
  return window.location.search.substr(1);
}
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function populate(data, sellBuy, uuid) {
  $("#none").css("display", "none");

  var offerDetails = $("#offerDetails");
  var bookDetails = $("#bookDetails");
  var extraDetails = $("#extraDetails");

  offerDetails.html(
  `<h2>Offer Details</h2>
  <div class="spacer"></div>
  <p><span class="propname">${sellBuy} Name:</span> ${data["name"]}</p>
  <p><span class="propname">Price:</span> ${data["price"]}</p>
  <p><span class="propname">Contact Email:</span> ${data["email"]}</p>
  <p><span class="propname">Date of Post:</span> ${data["time"]}</p>`);

  bookDetails.html(
  `<h2>Book Details</h2>
  <div class="spacer"></div>
  <p><span class="propname">Book Name:</span> ${data["bookName"]}</p>
  <p><span class="propname">Author:</span> ${data["author"]}</p>
  <p><span class="propname">Edition:</span> ${data["edition"]}</p>
  <p><span class="propname">Publisher:</span> ${data["publisher"]}</p>
  <p><span class="propname">ISBN:</span> ${data["isbn"]}</p>
  <p><span class="propname">Subject:</span> ${data["subjectName"]}</p>
  <div class='tagbox' id="${uuid}"></div>`);

  extraDetails.html(
  `<h2>Additional Details</h2>
  <div class="spacer"></div>
  <i>${data["comment"]}</i>`);

  tags.populate_tags(data["book_id"], uuid);

  offerDetails.css("display", "block");
  bookDetails.css("display", "block");

  if (!isBlank(data["comment"])) {
	extraDetails.css("display", "block");
  }

  update_back(sellBuy);
}
function update_back(sellBuy) {
	var back = document.getElementById("back");
	if (sellBuy === "Seller") {
		back.href += `?state=${STATES.SELL}`;
	}
	else {
		back.href += `?state=${STATES.BUY}`;
	}
}

function init() {
  if(get_param()) {
    get_data(get_param(), "postDetailsBuyingOffers", "Buyer");
    get_data(get_param(), "postDetailsSellingOffers", "Seller");
  }
}