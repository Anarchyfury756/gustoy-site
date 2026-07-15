const dialog = document.querySelector("#menu-dialog");
const openButton = document.querySelector("#menu-open");
const closeButton = document.querySelector("#menu-close");

function openMenu() {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }

  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }

  document.body.style.overflow = "";
  openButton.focus({ preventScroll: true });
}

openButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);

dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
});

dialog.addEventListener("cancel", () => {
  document.body.style.overflow = "";
});

dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedOutside) {
    closeMenu();
  }
});
