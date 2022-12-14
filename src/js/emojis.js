export function drawEmojis() {
  const emojisMainDiv = document.getElementById("emojis");
  const emojisArray = [
    "ð",
    "ð",
    "ð",
    "ð",
    "ðĪĢ",
    "ðĨē",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ðĨ°",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ð",
    "ðĒ",
    "ð­",
    "ðĪ",
    "ð ",
    "ðĄ",
    "ðĪŽ",
    "ð",
    "ðĪŊ",
    "ðą",
    "ðĻ",
    "ð°",
    "ðĨ",
    "ð",
    "ðĪ",
    "ðĪ",
    "ðĪ­",
    "ðĪŦ",
    "ðĪĨ",
    "ðķ",
    "ðĨą",
    "ðī",
    "ðĪĪ",
    "ðŠ",
    "ðĩ",
    "ðĪ",
    "ðĨī",
    "ðĪĒ",
    "ðĪŪ",
    "ðĪ§",
    "ð·",
    "ðĪ",
    "ðĪ",
    "ðĪ",
    "ðĪ ",
    "ðđ",
    "ðš",
    "ðĪĄ",
    "ðĐ",
    "ðŧ",
    "ð",
    "ð―",
    "ðū",
    "ðĪ",
    "ð",
    "ðš",
    "ðļ",
    "ðđ",
    "ðŧ",
    "ðž",
    "ð―",
    "ð",
    "ðŋ",
    "ðū",
    "ðķ",
    "ð§",
    "ð§",
    "ðĶ",
    "ðĐ",
    "ð§",
    "ðĻ",
    "ðĐâðĶą",
    "ð§âðĶą",
    "ðĻâðĶą",
    "ðĐâðĶ°",
    "ð§âðĶ°",
    "ðĻâðĶ°",
    "ðąââïļ",
    "ðą",
    "ðąââïļ",
    "ðĐâðĶģ",
    "ð§âðĶģ",
    "ðĻâðĶģ",
    "ðĐâðĶē",
    "ð§âðĶē",
    "ðĻâðĶē",
    "ð§",
    "ðĩ",
    "ð§",
    "ðī",
    "ðē",
    "ðģââïļ",
    "ðģ",
    "ðģââïļ",
    "ð§",
    "ðŪââïļ",
    "ðŪ",
    "ðŪââïļ",
    "ð·ââïļ",
    "ð·",
    "ð·ââïļ",
    "ðĩïļââïļ",
    "ðĐââïļ",
    "ð§ââïļ",
    "ðĻââïļ",
    "ðĐâðū",
    "ð§âðū",
    "ðĻâðū",
    "ðĐâðģ",
    "ð§âðģ",
    "ðĻâðģ",
    "ðĐâð",
    "ð§âð",
    "ðĻâð",
    "ðĐâðĪ",
    "ð§âðĪ",
    "ðĻâðĪ",
    "ðĐâðŦ",
    "ð§âðŦ",
    "ðĻâðŦ",
    "ðĐâð­",
    "ðââïļ",
    "ðââïļ",
    "ðââïļ",
    "ðââïļ",
    "ð",
    "ðââïļ",
    "ðââïļ",
    "ð",
    "ðââïļ",
    "ðââïļ",
    "ð",
    "ðââïļ",
    "ð",
  ];
  // clear drawn emojis
  if (emojisMainDiv.firstChild) {
    closeEmojiPopout();
    return;
  }

  // draw emojis
  for (let x = 0; x < emojisArray.length; x++) {
    const emojisA = document.createElement("a");
    emojisA.innerHTML = emojisArray[x];
    emojisA.setAttribute("id", emojisArray[x]);
    emojisMainDiv.appendChild(emojisA);
    emojisA.addEventListener("click", appendEmojis);
  }
  emojisMainDiv.style.display = "block";
  const emojiCloseButton = document.getElementById("closeEmoji");
  emojiCloseButton.style.display = "block";
}

//append the emojis to the value of the msg text area
function appendEmojis(event) {
  const emoji = event.target.id;
  const messagebox = document.getElementById("messagebox");
  messagebox.value = messagebox.value + emoji;
}

//close the emoji window
export function closeEmojiPopout() {
  const emojisMainDiv = document.getElementById("emojis");
  const emojiCloseButton = document.getElementById("closeEmoji");
  while (emojisMainDiv.firstChild) {
    emojisMainDiv.removeChild(emojisMainDiv.firstChild);
  }
  emojisMainDiv.style.display = "none";
  emojiCloseButton.style.display = "none";
}
