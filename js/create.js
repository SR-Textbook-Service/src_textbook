// Put these into a single object someday
var state, searchState, prevSearchState;

var sellBtn, sellingOffers;
var buyBtn, buyingOffers;

var subjectDown, subjectID;

var formText, merchantName;

var selectBookInfo;

// Set both buttons at the top to be unselected
function set_inactive() {
  sellBtn.className = "inactive";
  buyBtn.className = "inactive";
}

// Update the layout depending on whether "Buy Books" or "Sell Books" is selected
function update_layout(val) {
  state = val;

  set_inactive();

  var show = "display: block";

  switch(state) {
    case STATES.BUY:
      buyBtn.className = "active";
      formText.innerHTML =
      "Don't see a book you want to buy? <br> Submit a <i>buying request</i>.";
      merchantName.innerHTML = "Buyer name";
      break;
    case STATES.SELL:
      sellBtn.className = "active";
      formText.innerHTML =
      "Can't find a book you want to sell? <br> Submit a <i>selling request</i>.";
      merchantName.innerHTML = "Seller name";
      break;
  }
}

function book_change() {
  var newBook = document.getElementById("newBook");

  switch(this.value) {
    case "new":
      newBook.style="display: block";
      break;
    default:
      newBook.style="display: none";
      break;
  }

  bookVal = this.value;
}

function update_search_layout(val) {
  prevSearchState = searchState;
  searchState = val;

  for (var i = 1; i <= TOTALSEARCHSTATES; i++) {
    var el = document.getElementById("searchState" + (i).toString());

    if(i === searchState) {
      el.style = "display: block";
    }
    else {
      el.style = "display: none";
    }
  }
}

function show_form_info() {
  var bookInfo = document.getElementById("bookInfo");
  var form = document.getElementById("bookForm");
  var formData = new FormData(form);

  var htmlStr = "<p>Book Name: " + selectBookInfo["bookName"] + "</p>\
  <p>Author: " + selectBookInfo["author"] + "</p>\
  <p>ISBN: " + selectBookInfo["isbn"] + "</p>\
  <p>Edition/Copyright: " + selectBookInfo["edition"] + "</p>\
  <p>Publisher: " + selectBookInfo["publisher"] + "</p>\
  <p>Subject: " + (selectBookInfo["subjectName"] ?
  selectBookInfo["subjectName"] : get_subject_name(subjectID)) + "</p>";

  bookInfo.innerHTML = htmlStr;
  update_search_layout(4);
}

function info_from_form() {
  var form = document.getElementById("bookForm");
  var formData = new FormData(form);

  // Should be made constant
  var columns = ["bookName", "author", "isbn", "edition", "publisher"];
  selectBookInfo = {}

  for(category of columns) {
    selectBookInfo[category] = formData.get(category);
  }

  show_form_info();
}

function set_book_info(index) {
  selectBookInfo = queriedBookData[index];

  show_form_info();
}

function toggle_element(elementID) {
  var el = document.getElementById(elementID);

  if(el.style.display === "none" ) {
    el.style.display = "block";
  }
  else {
    el.style.display = "none";
  }
}
var STATES = Object.freeze({BUY: 1, SELL: 2});
const TOTALSEARCHSTATES = 4;

const SELLREQUEST = ["postSellData", "sellTable"];
const BUYREQUEST = ["postBuyData", "buyTable"];

const TOTALASSETS = 1;

function get_default() {
  if (window.location.search.substr(1) === "y") return 1;
  return 2;
}

function init() {
  sellBtn = document.getElementById("sellBtn");

  buyBtn = document.getElementById("buyBtn");

  subjectDown = document.getElementById("subjectDown");
  subjectDown.addEventListener("change", function() {
    subjectID = this.value;
  }, false);

  formText = document.getElementById("formText");
  merchantName = document.getElementById("merchantName");

  update_layout(get_default());
  update_search_layout(1);

  loaded = [];
  getData('getSubjects', 'subjectDown');
}
