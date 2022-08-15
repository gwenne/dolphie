export function drawEmojis() {
  const emojisMainDiv = document.getElementById("emojis");
  const emojisArray = [
    "😄",
    "😆",
    "😅",
    "😂",
    "🤣",
    "🥲",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "😈",
    "🤯",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "👶",
    "👧",
    "🧒",
    "👦",
    "👩",
    "🧑",
    "👨",
    "👩‍🦱",
    "🧑‍🦱",
    "👨‍🦱",
    "👩‍🦰",
    "🧑‍🦰",
    "👨‍🦰",
    "👱‍♀️",
    "👱",
    "👱‍♂️",
    "👩‍🦳",
    "🧑‍🦳",
    "👨‍🦳",
    "👩‍🦲",
    "🧑‍🦲",
    "👨‍🦲",
    "🧔",
    "👵",
    "🧓",
    "👴",
    "👲",
    "👳‍♀️",
    "👳",
    "👳‍♂️",
    "🧕",
    "👮‍♀️",
    "👮",
    "👮‍♂️",
    "👷‍♀️",
    "👷",
    "👷‍♂️",
    "🕵️‍♀️",
    "👩‍⚕️",
    "🧑‍⚕️",
    "👨‍⚕️",
    "👩‍🌾",
    "🧑‍🌾",
    "👨‍🌾",
    "👩‍🍳",
    "🧑‍🍳",
    "👨‍🍳",
    "👩‍🎓",
    "🧑‍🎓",
    "👨‍🎓",
    "👩‍🎤",
    "🧑‍🎤",
    "👨‍🎤",
    "👩‍🏫",
    "🧑‍🏫",
    "👨‍🏫",
    "👩‍🏭",
    "🙎‍♂️",
    "🙍‍♀️",
    "🙅‍♂️",
    "🙆‍♀️",
    "🙆",
    "🙆‍♂️",
    "🙋‍♀️",
    "🙋",
    "🙋‍♂️",
    "🙇‍♀️",
    "🙇",
    "💁‍♀️",
    "💁",
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
