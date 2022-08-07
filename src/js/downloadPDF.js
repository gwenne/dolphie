import { jsPDF } from "jspdf";

export function downloadPDF() {
  const doc = new jsPDF();
  let text = "";
  const divMsgArrays = document.querySelectorAll(".msgbubbles");
  for (let x = 0; x < divMsgArrays.length; x++) {
    if (divMsgArrays[x].classList.contains("msgbubbleright")) {
      text = text + "\n" + "You: " + divMsgArrays[x].innerHTML;
    } else {
      text = text + "\n" + "Dolphie: " + divMsgArrays[x].innerHTML;
    }
  }
  doc.setFontSize(8);
  doc.text(text, 10, 10);
  doc.save("Chat-Transcript.pdf");
}
