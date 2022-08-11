import languageArray from "./language";
import imageDolphie from "../images/dolphie.png";
import imageGuest from "../images/guest.png";
import { apiProcessing, testResponseOnly } from "./api";
import { instructionsModal, closeModal } from "./instructions";
import { emojis } from "./emojis";
import { downloadPDF } from "./downloadPDF";

//drawing emojis
emojis();

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
  if (isEmpty(response)) {
    return;
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
  divMsg.classList.add("msgbubbleleft", "atext", "msgbubbles");
  divMsg.setAttribute("title", "Bookmark Message");
  divMsg.addEventListener("click", bookmarkMessage);
  divMsgMain.appendChild(divMsg);

  const pDateNow = displayDate("left");
  divMsgMain.appendChild(pDateNow);
  divInnerMsgArea.appendChild(divMsgMain);
  scrollLocation();
  playSound("dolphie");
}

//date handler
function displayDate(location) {
  const pDateNow = document.createElement("p");
  const dateValue = new Date().toString();
  const index = dateValue.indexOf("+");
  pDateNow.innerHTML = dateValue.substring(0, index - 4);
  pDateNow.setAttribute("class", location);
  return pDateNow;
}

//sound setting check
function playSound(type) {
  const soundButton = document.getElementById("sound_settings");
  if (!soundButton.classList.contains("soundOff")) {
    if (type == "dolphie") {
      const dolphieChirpAudio = document.querySelector("#audioDolphieResponse");
      dolphieChirpAudio.play();
    } else {
      const sendMsgAlert = document.querySelector("#audioGuestMsg");
      sendMsgAlert.play();
    }
  }
}

//turn on/off Dolpie Chriping sound
function soundHandler() {
  const soundButton = document.getElementById("sound_settings");
  if (soundButton.classList.contains("soundOff")) {
    soundButton.classList.remove("soundOff");
    soundButton.setAttribute("title", "Turn Sound Off");
    soundButton.setAttribute("aria-label", "Turn Sound Off");
  } else {
    soundButton.classList.add("soundOff");
    soundButton.setAttribute("title", "Turn Sound On");
    soundButton.setAttribute("aria-label", "Turn Sound On");
  }
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
  imgGuest.setAttribute("src", imageGuest); // had to do this for parcel to load the image
  imgGuest.classList.add("imgGuest");
  divMsgMain.appendChild(imgGuest);

  const pDateNow = displayDate("right");
  divMsgMain.appendChild(pDateNow);
  divInnerMsgArea.appendChild(divMsgMain);

  scrollLocation();
  playSound("guest");

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
  const divBookmarks = document.getElementById("tooltips");
  if (getComputedStyle(divBookmarks).display === "block") {
    closeBookmarkPopout();
    return;
  }

  divBookmarks.innerHTML = "";
  divBookmarks.removeAttribute("title");

  const dlBookmarksFirst = document.createElement("dl");
  dlBookmarksFirst.innerHTML = "Bookmarked Messages";
  dlBookmarksFirst.style.textAlign = "center";
  dlBookmarksFirst.style.fontWeight = "bolder";
  divBookmarks.appendChild(dlBookmarksFirst);

  const dlBookmarks = document.createElement("dl");
  divBookmarks.appendChild(dlBookmarks);

  for (let x = 0; x < bookmarkedMsgsArray.length; x++) {
    const dtBookmark = document.createElement("dt");
    dtBookmark.innerHTML = "> " + bookmarkedMsgsArray[x];
    dtBookmark.setAttribute("title", bookmarkedMsgsArray[x]);
    dlBookmarks.appendChild(dtBookmark);
    divBookmarks.style.textAlign = "left";
    dtBookmark.addEventListener("click", highlightMessageBubble);
  }
  if (bookmarkedMsgsArray.length === 0) {
    cleanUpBookmarkList();
  }
  divBookmarks.style.display = "block";
  const closeButton = document.getElementById("close");
  closeButton.style.display = "block";
}

//Setting No Bookmark Message display when no msgs have been bookmark before access Bookmarks popout
function cleanUpBookmarkList() {
  const divBookmarks = document.getElementById("tooltips");
  divBookmarks.innerHTML = "No Bookmarked Messages";
  divBookmarks.style.textAlign = "center";
  divBookmarks.setAttribute("title", divBookmarks.innerHTML);
}

//adding close(x) button on the pop out for the bookmarks
export function closeBookmarkPopout() {
  const divTooltips = document.getElementById("tooltips");
  const closeButton = document.getElementById("close");
  if (getComputedStyle(divTooltips).display === "block") {
    divTooltips.style.display = "none";
    closeButton.style.display = "none";
  }
}

//removes highlights on all message bubbles
function clearAllHighlights() {
  const divMsgArrays = document.querySelectorAll(".msgbubbles");
  for (let x = 0; x < divMsgArrays.length; x++) {
    divMsgArrays[x].classList.remove("highlight");
  }
}

//highlight msg bubble when clicked from the bookmark popout
function highlightMessageBubble(event) {
  clearAllHighlights();
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
  apiProcessing(utext);
  //testResponseOnly();
}

//search handler for keyup = Enter event
function keyPressHandler(event) {
  const eventId = event.target.id;
  if (event.key === "Enter") {
    switch (eventId) {
      case "search_text":
        searchMsgs();
        break;
      case "search":
        searchMsgs();
        break;
      case "send":
        guestMsgHandler(event);
        break;
      case "messagebox":
        if (!event.shiftKey) {
          guestMsgHandler(event);
        }
        break;
      case "clear":
        clearMsgArea();
        break;
      case "bookmark":
        displayBookmarkedMessages();
        break;
      case "clickmeforinstructions":
        instructionsModal();
        break;
      case "closeInstructionPopOut":
        closeModal();
        break;
      case "close":
        closeBookmarkPopout();
        break;
      case "sound_settings":
        soundHandler();
        break;
      case "download":
        downloadPDF();
    }
  }
}

//event listener --> sending message from guest, enter or click
const sendMsgButton = document.querySelector("#send");
sendMsgButton.addEventListener("click", guestMsgHandler);
sendMsgButton.addEventListener("keypress", keyPressHandler);
const sendMsgOnEnterMsgBox = document.querySelector(".messagebox");
sendMsgOnEnterMsgBox.addEventListener("keypress", keyPressHandler);
//event listener --> search keyword from all msg bubbles
const searchButton = document.querySelector("#search");
searchButton.addEventListener("click", searchMsgs);
searchButton.addEventListener("keypress", keyPressHandler);
//event listener --> search keyword when enter key is pressed
const searchTextField = document.querySelector("#search_text");
searchTextField.addEventListener("keypress", keyPressHandler);
//event listener --> clear/reset message
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearMsgArea);
clearButton.addEventListener("keypress", keyPressHandler);
//event listener --> show bookmarked messages
const bookmarkButton = document.querySelector("#bookmark");
bookmarkButton.addEventListener("click", displayBookmarkedMessages);
bookmarkButton.addEventListener("keypress", keyPressHandler);
//event listener --> close bookmarks pop out
const closeButton = document.querySelector("#close");
closeButton.addEventListener("click", closeBookmarkPopout);
closeButton.addEventListener("keypress", keyPressHandler);
//pop out modal for instruction details
const divInstructionButton = document.getElementById("clickmeforinstructions");
divInstructionButton.addEventListener("click", instructionsModal);
divInstructionButton.addEventListener("keypress", keyPressHandler);
//close modal pop out for instructions
const closeModalButton = document.querySelector(".closeInstructionPopOut");
closeModalButton.addEventListener("click", closeModal);
closeModalButton.addEventListener("keypress", keyPressHandler);
//event listener for turning on and off sound
const soundButton = document.getElementById("sound_settings");
soundButton.addEventListener("click", soundHandler);
soundButton.addEventListener("keypress", soundHandler);
//event listener for downloading chat transcript to pdf
const downloadPDFButton = document.getElementById("download");
downloadPDFButton.addEventListener("click", downloadPDF);
downloadPDFButton.addEventListener("keypress", downloadPDF);
