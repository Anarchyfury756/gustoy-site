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

const tipLinks = {
  1: "https://netmonet.co/tip/session?qrId=12118201-2452-486b-9ae8-ff016ae26dcb&wpid=5296099&o=4",
  2: "https://netmonet.co/tip/session?qrId=44453214-5a5b-40d7-b297-d706341b3bb9&wpid=5296099&o=4",
  3: "https://netmonet.co/tip/session?qrId=90e1acf4-a30e-4f02-9ceb-3fce9aadbcaf&wpid=5296099&o=4",
  4: "https://netmonet.co/tip/session?qrId=d99167ed-4ebf-411d-8235-19ccd4d1af88&wpid=5296099&o=4",
  5: "https://netmonet.co/tip/session?qrId=f79894a6-3740-43f8-bf83-f843b91c8a9b&wpid=5296099&o=4",
  6: "https://netmonet.co/tip/session?qrId=60e9d6b4-83ad-40e7-8517-38d78ee46022&wpid=5296099&o=4",
  7: "https://netmonet.co/tip/session?qrId=3511e748-b53e-4330-8c24-9ebdd9ae47e4&wpid=5296099&o=4",
  8: "https://netmonet.co/tip/session?qrId=402a171b-2d93-4d90-abee-0416cebe172b&wpid=5296099&o=4",
  9: "https://netmonet.co/tip/session?qrId=a4a07d61-d389-40bf-bae5-b1ca0789a27c&wpid=5296099&o=4",
  10: "https://netmonet.co/tip/session?qrId=f4a55609-f39c-4891-a0b2-caa2b009e0af&wpid=5296099&o=4",
};

const tipsDialog = document.querySelector("#tips-dialog");
const tipsOpenButton = document.querySelector("#tips-open");
const tipsCloseButton = document.querySelector("#tips-close");
const tipsCaption = document.querySelector("#tips-card-caption");
const tableButtons = document.querySelectorAll("[data-table]");
const requestedTable = new URLSearchParams(window.location.search).get("table");
const activeTable = Object.hasOwn(tipLinks, requestedTable) ? requestedTable : null;

if (activeTable) {
  tipsCaption.textContent = `стол ${activeTable.padStart(2, "0")} · перейти в нетмонет`;
  tipsOpenButton.removeAttribute("aria-haspopup");
  tipsOpenButton.setAttribute(
    "aria-label",
    `Оплатить счёт или оставить чаевые за столом ${activeTable}`,
  );
}

function openTipsDialog() {
  if (typeof tipsDialog.showModal === "function") {
    tipsDialog.showModal();
  } else {
    tipsDialog.setAttribute("open", "");
  }
}

function closeTipsDialog() {
  if (typeof tipsDialog.close === "function") {
    tipsDialog.close();
  } else {
    tipsDialog.removeAttribute("open");
  }

  tipsOpenButton.focus({ preventScroll: true });
}

function openTipsForTable(table) {
  const url = tipLinks[table];
  if (!url) return;

  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("table", table);
  window.history.replaceState({}, "", currentUrl);
  window.location.assign(url);
}

tipsOpenButton.addEventListener("click", () => {
  if (activeTable) {
    openTipsForTable(activeTable);
    return;
  }

  openTipsDialog();
});

tipsCloseButton.addEventListener("click", closeTipsDialog);

tableButtons.forEach((button) => {
  button.addEventListener("click", () => openTipsForTable(button.dataset.table));
});

tipsDialog.addEventListener("click", (event) => {
  const bounds = tipsDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedOutside) {
    closeTipsDialog();
  }
});
