/* MediPulse - live-style queue demo (client-side only, dummy data) */
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-queue-next]");
  if (!b) return;
  const row = document.querySelector("#queue-body tr:not([hidden])");
  const live = document.getElementById("queue-live");
  if (!row) { live.textContent = "Queue is empty"; return; }
  document.getElementById("serving-token").textContent = row.dataset.token;
  document.getElementById("serving-name").textContent = row.dataset.name;
  row.remove();
  const left = document.querySelectorAll("#queue-body tr").length;
  document.getElementById("waiting-count").textContent = left;
  live.textContent = "Now serving " + row.dataset.name;
});
