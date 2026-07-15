const dialog = document.querySelector("#menu-dialog");
const openButton = document.querySelector("#menu-open");
const closeButton = document.querySelector("#menu-close");
const interactiveHotspots = document.querySelectorAll(
  '.hotspot:not([aria-disabled="true"])',
);

function playTouchFeedback(event) {
  const hotspot = event.currentTarget;
  const bounds = hotspot.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
  const y = ((event.clientY - bounds.top) / bounds.height) * 100;

  hotspot.style.setProperty("--tap-x", `${x}%`);
  hotspot.style.setProperty("--tap-y", `${y}%`);
  hotspot.classList.remove("is-pressed");
  void hotspot.offsetWidth;
  hotspot.classList.add("is-pressed");

  window.setTimeout(() => hotspot.classList.remove("is-pressed"), 440);

  if (typeof navigator.vibrate === "function") {
    navigator.vibrate(12);
  }
}

interactiveHotspots.forEach((hotspot) => {
  hotspot.addEventListener("pointerdown", playTouchFeedback, { passive: true });
});

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
