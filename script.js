const dialog = document.querySelector("#menu-dialog");
const openButton = document.querySelector("#menu-open");
const closeButton = document.querySelector("#menu-close");
const landing = document.querySelector(".landing");
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

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionFrame = 0;

function updateScrollMotion() {
  motionFrame = 0;

  if (reducedMotion.matches) {
    return;
  }

  const distance = Math.max(220, Math.min(window.innerHeight * 0.55, 460));
  const progress = Math.min(Math.max(window.scrollY / distance, 0), 1);

  landing.style.setProperty("--dj-x", `${(progress * 5).toFixed(2)}px`);
  landing.style.setProperty("--dj-y", `${(progress * 30).toFixed(2)}px`);
  landing.style.setProperty("--dj-rotate", `${(progress * 0.45).toFixed(3)}deg`);
  landing.style.setProperty("--logo-x", `${(progress * -12).toFixed(2)}px`);
  landing.style.setProperty("--logo-y", `${(progress * 14).toFixed(2)}px`);
  landing.style.setProperty("--logo-scale", (1 - progress * 0.018).toFixed(4));
  landing.style.setProperty("--tagline-x", `${(progress * 18).toFixed(2)}px`);
  landing.style.setProperty("--tagline-y", `${(progress * 8).toFixed(2)}px`);
}

function requestScrollMotion() {
  if (!motionFrame) {
    motionFrame = window.requestAnimationFrame(updateScrollMotion);
  }
}

window.addEventListener("scroll", requestScrollMotion, { passive: true });
window.addEventListener("resize", requestScrollMotion, { passive: true });
reducedMotion.addEventListener?.("change", requestScrollMotion);
updateScrollMotion();

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
