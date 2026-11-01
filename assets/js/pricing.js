/* MediPulse - pricing billing-period toggle */
const sw = document.getElementById("billing-switch");
if (sw) sw.addEventListener("change", () => {
  const yearly = sw.checked;
  document.querySelectorAll("[data-monthly]").forEach((el) => { el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly; });
  document.querySelectorAll("[data-period]").forEach((el) => { el.textContent = yearly ? "per month, billed yearly" : "per month"; });
});
