export class Dialog {
  constructor(text: string) {
    //create a html element for the dialog, and add it to the DOM
    const dialog = document.createElement("div");
    dialog.id = "dialog";
    document.body.appendChild(dialog);
    //make the div stick to the bottom of the screen
    dialog.style.position = "absolute";
    dialog.style.bottom = "0";
    dialog.style.width = "100%";
    dialog.style.backgroundColor = "brown";
    dialog.style.color = "yellow";
    dialog.style.fontSize = "1em";
    dialog.style.textAlign = "center";
    dialog.style.padding = "1em";
    dialog.style.boxSizing = "border-box";
    dialog.style.zIndex = "1000";
    dialog.style.display = "flex";
    dialog.style.alignItems = "center";
    dialog.style.justifyContent = "center";

    //add the text to the dialog
    dialog.innerText = text;

    //add a click event listener to the dialog, so that it disappears when clicked
    dialog.addEventListener("click", () => {
      dialog.remove();
    });
  }

  removeDialog() {
    const dialog = document.getElementById("dialog");
    if (dialog) {
      dialog.remove();
    }
  }
}
