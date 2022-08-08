//😀 😃 😄 😁 😆 😅 😂 🤣 🥲 😊 😇 🙂
//"🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋","😛","😝"
//😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞
//😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺
//"😢","😭", "😤", "😠","😡","🤬", "🤯", "😱", "😨", "😰", "😥" "😓", "🤗","🤔","🤭","🤫", "🤥", "😶" 😐 😑 😬 🙄
export function emojis() {
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
  ];
  // clear drawn emojis
  while (emojisMainDiv.firstChild) {
    emojisMainDiv.removeChild(emojisMainDiv.firstChild);
  }

  // draw emojis
  for (let x = 0; x < emojisArray.length; x++) {
    const emojisA = document.createElement("a");
    emojisA.innerHTML = emojisArray[x];
    emojisA.setAttribute("id", emojisArray[x]);
    emojisMainDiv.appendChild(emojisA);
    emojisA.addEventListener("click", appendEmojis);
  }
}

//append the emojis to the value of the msg text area
function appendEmojis(event) {
  const emoji = event.target.id;
  const messagebox = document.getElementById("messagebox");
  messagebox.value = messagebox.value + emoji;
}
