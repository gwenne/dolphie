import languageArray from "./language";
import imageDolphie from '../images/dolphie.png';
import imageGuest from '../images/guest.png';
import { apiProcessing, testResponseOnly } from "./api";

//adding items to the combo select for language options
function languageSelection() {
  let comboLanguage = document.getElementById("language");
  for (let x = 0; x < languageArray.length; x++) {
    const comboLanguageOption = document.createElement("option");
    comboLanguageOption.innerHTML = languageArray[x][0];
    comboLanguageOption.setAttribute("value", languageArray[x][0]);
    comboLanguage.appendChild(comboLanguageOption);
  }
}
//calling the function languageSelection to draw the language selection
languageSelection();

//get language selected
export function selectedLanguage() {
  //get language code
  const lang = document.querySelector("#language").value;
  let langCode;
  for (let x = 0; x < languageArray.length; x++) {
    if (languageArray[x][0] === lang) {
      langCode = languageArray[x][1];
    }
  }
  return langCode;
}

//check if a string is empty
const isEmpty = (str) => !str.trim().length;

// drawing msg bubble for the response of the dolphie bot
export function drawResponse(response) {
  if (response.search(/Simsimi/i) > -1) {
    response = response.replace(/Simsimi/i, "Dolphie");
  }
  const divInnerMsgArea = document.querySelector("#innermessagearea");
  const divMsgMain = document.createElement("div");
  divMsgMain.classList.add("divMsgMain");

  const imgDolphie = document.createElement("img");
  //imgDolphie.setAttribute("src", "src/images/dolphie.png");
  imgDolphie.setAttribute("src", imageDolphie); // had to do thid for parcel to load the image
  imgDolphie.classList.add("imgDolphie", "shake");
  divMsgMain.appendChild(imgDolphie);

  const divMsg = document.createElement("div");
  divMsg.innerHTML = response;
  divMsg.classList.add("msgbubbleleft", "atext", "msgbubbles", "shake");
  divMsg.setAttribute("title", "Bookmark Message");
  divMsg.addEventListener("click", bookmarkMessage);
  divMsgMain.appendChild(divMsg);
  divInnerMsgArea.appendChild(divMsgMain);
  scrollLocation();
  const dolphieChirpAudio = document.querySelector("#audioDolphieResponse");
  dolphieChirpAudio.play();
}
// drawing the msg bubble for the Guest's msg
function drawMessageRequest() {
  const textMsg = document.querySelector("#messagebox");
  if (isEmpty(textMsg.value)) return;
  const divInnerMsgArea = document.querySelector("#innermessagearea");
  const divMsgMain = document.createElement("div");
  divMsgMain.classList.add("divMsgMain");

  const divMsg = document.createElement("div");
  divMsg.innerHTML = textMsg.value.replace(/\n/g, "<br>\n");
  divMsg.classList.add("utext", "msgbubbleright", "msgbubbles");
  divMsgMain.appendChild(divMsg);

  const imgGuest = document.createElement("img");
  //imgGuest.setAttribute("src", "src/images/guest.png");
  imgGuest.setAttribute("src", imageGuest); // had to do thid for parcel to load the image
  imgGuest.classList.add("imgGuest");
  divMsgMain.appendChild(imgGuest);
  divInnerMsgArea.appendChild(divMsgMain);
  scrollLocation();
  const sendMsgAlert = document.querySelector("#audioGuestMsg");
  sendMsgAlert.play();

  textMsg.value = "";
  return divMsg.innerHTML;
}
//to always display the last msg bubble
function scrollLocation() {
  var divInnerMsgArea = document.getElementById("innermessagearea");
  divInnerMsgArea.scrollTop = divInnerMsgArea.scrollHeight;
}

//function to search the msg bubbles based on the keyword entered in search field
function searchMsgs() {
  const searchText = document.querySelector("#search_text").value;
  const divMsgArrays = document.querySelectorAll(".msgbubbles");
  if (divMsgArrays.length > 0) {
    for (let x = 0; x < divMsgArrays.length; x++) {
      divMsgArrays[x].classList.remove("highlight");
      if (!isEmpty(searchText)) {
        const divMsgValue = divMsgArrays[x].innerHTML.toLowerCase();
        const index = divMsgValue.indexOf(searchText.toLowerCase());
        if (index > -1) {
          divMsgArrays[x].classList.add("highlight");
          divMsgArrays[x].scrollIntoView({ behavior: "smooth" });
        }
      } else {
        divMsgArrays[x].classList.remove("highlight");
      }
    }
  }
}

//search handler for keyup = Enter event
function searchMsgsKeyUpHandler(event) {
  if (event.key === "Enter") {
    searchMsgs();
  }
}

//bookmark message from bot dolphie
let bookmarkedMsgsArray = [];
function bookmarkMessage(event) {
  const targetMsgBubble = event.target;
  const indexOfMsg = bookmarkedMsgsArray.indexOf(targetMsgBubble.innerHTML);
  if (indexOfMsg > -1) {
    bookmarkedMsgsArray.splice(indexOfMsg, 1);
    targetMsgBubble.classList.remove("bookmarked");
    targetMsgBubble.setAttribute("title", "Bookmark Message");
  } else {
    bookmarkedMsgsArray.push(targetMsgBubble.innerHTML);
    targetMsgBubble.classList.add("bookmarked");
    targetMsgBubble.setAttribute("title", "Remove Bookmark");
  }
  targetMsgBubble.classList.remove("highlight");
}


//display popout for the list of bookmarked messages
function displayBookmarkedMessages() {
  const divTooltips = document.getElementById("tooltips");
  const closeButton = document.getElementById("close");
  divTooltips.innerHTML = "";
  divTooltips.removeAttribute("title");
  const tableTooltips = document.createElement("table");
  divTooltips.appendChild(tableTooltips);

  const tableHeadTooltips = document.createElement("thead");
  tableTooltips.appendChild(tableHeadTooltips);

  const trHeadTooltip = document.createElement("tr");
  const tdHeadTooltip = document.createElement("th");
  tdHeadTooltip.innerHTML = "Bookmarked Messages";
  trHeadTooltip.appendChild(tdHeadTooltip);
  tableHeadTooltips.appendChild(trHeadTooltip);
  tdHeadTooltip.style.textAlign = "center";
  tdHeadTooltip.style.fontWeight = "bolder";

  for (let x = 0; x < bookmarkedMsgsArray.length; x++) {
    const trTooltip = document.createElement("tr");
    const tdTooltip = document.createElement("td");
    tdTooltip.innerHTML = "> " + bookmarkedMsgsArray[x];
    tdTooltip.setAttribute("title", bookmarkedMsgsArray[x]);
    trTooltip.appendChild(tdTooltip);
    tableTooltips.appendChild(trTooltip);
    divTooltips.style.textAlign = "left";
    tdTooltip.addEventListener("click", highlightMessageBubble);
  }
  if (bookmarkedMsgsArray.length === 0) {
    cleanUpBookmarkList();
  }
  divTooltips.style.display = "block";
  closeButton.style.display = "block";
}

//Setting No Bookmark Message display when no msgs have been bookmark before access Bookmarks popout
function cleanUpBookmarkList() {
  const divTooltips = document.getElementById("tooltips");
  divTooltips.innerHTML = "No Bookmarked Messages";
  divTooltips.style.textAlign = "center";
  divTooltips.setAttribute("title", divTooltips.innerHTML);
}

//adding close(x) button on the pop out for the bookmarks
function closeBookmarkPopout() {
  const divTooltips = document.getElementById("tooltips");
  const closeButton = document.getElementById("close");
  if (getComputedStyle(divTooltips).display === "block") {
    divTooltips.style.display = "none";
    closeButton.style.display = "none";
  }
}

//highlight msg bubble when clicked from the bookmark popout
function highlightMessageBubble(event) {
  const targetMsg = event.target.title;
  const divMsgArrays = document.querySelectorAll(".msgbubbleleft");
  let index;
  if (divMsgArrays.length > 0) {
    for (let x = 0; x < divMsgArrays.length; x++) {
      divMsgArrays[x].classList.remove("highlight");
      const divMsgValue = divMsgArrays[x].innerHTML.toLowerCase();
      index = divMsgValue.indexOf(targetMsg.toLowerCase());
      if (index > -1) {
        divMsgArrays[x].classList.add("highlight");
        divMsgArrays[x].scrollIntoView({ behavior: "smooth" });
        closeBookmarkPopout();
      }
    }
  }
}

//clear messages to indicate restart of conversation or interaction
function clearMsgArea() {
  //clear message area
  const parentDiv = document.querySelector("#innermessagearea");
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
  //clear search field
  const searchField = document.querySelector("#search_text");
  searchField.value = "";
  //clear bookmarks
  bookmarkedMsgsArray = [];
  cleanUpBookmarkList();
  //clear message text box for guest
  const textMsg = document.querySelector("#messagebox");
  textMsg.value = "";
}

//function that will call the functions to draw bubbles for guest and dolphie bot
function guestMsgHandler(event) {
  event.preventDefault();
  const utext = drawMessageRequest();
  if (!utext) return;
  //apiProcessing(utext);
  testResponseOnly();
}

//event listener --> sending message from guest
const sendMsgButton = document.querySelector("form");
sendMsgButton.addEventListener("submit", guestMsgHandler);
//event listener --> search keyword from all msg bubbles
const searchButton = document.querySelector("#search");
searchButton.addEventListener("click", searchMsgs);
//event listener --> search keyword when enter key is pressed
const searchTextField = document.querySelector("#search_text");
searchTextField.addEventListener("keyup", searchMsgsKeyUpHandler);
//event listener --> clear/reset message
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearMsgArea);
//event listener --> show bookmarked messages
const bookmarkButton = document.querySelector("#bookmark");
bookmarkButton.addEventListener("click", displayBookmarkedMessages);
const closeButton = document.querySelector("#close");
closeButton.addEventListener("click", closeBookmarkPopout);