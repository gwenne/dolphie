import { closeBookmarkPopout } from "./dolphie";

// Get the modal
var modal = document.getElementById("myModal");

//opens the modal
export function instructionsModal() {
  modal.style.display = "block";
  modal.children[0].focus();
  closeBookmarkPopout();
}

// When the user clicks on <span> (x), close the modal
export function closeModal() {
  modal.style.display = "none";
}
