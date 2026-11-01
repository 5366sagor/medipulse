/* MediPulse - simple step wizard: [data-wizard] with [data-step] panels */
document.querySelectorAll("[data-wizard]").forEach((wiz) => {
  const panels = [...wiz.querySelectorAll("[data-step]")];
  const marks = [...document.querySelectorAll("[data-step-mark]")];
  let i = 0;
  const show = (n) => {
    i = Math.max(0, Math.min(n, panels.length - 1));
    panels.forEach((p, k) => { p.hidden = k !== i; });
    marks.forEach((m, k) => { m.classList.toggle("is-active", k === i); m.classList.toggle("is-done", k < i); });
    const sum = wiz.querySelector("[data-summary]");
    if (sum && i === panels.length - 1) {
      const v = (id) => { const f = wiz.querySelector("#" + id); return f && f.value ? f.value : "Not set"; };
      const t = wiz.querySelector("input[name=slot]:checked");
      sum.innerHTML = "<dt>Patient</dt><dd></dd><dt>Doctor</dt><dd></dd><dt>Date</dt><dd></dd><dt>Time</dt><dd></dd>";
      [v("b-patient"), v("b-doctor"), v("b-date"), t ? t.value : "Not set"].forEach((x, k) => { sum.querySelectorAll("dd")[k].textContent = x; });
    }
  };
  wiz.addEventListener("click", (e) => {
    const b = e.target.closest("[data-wizard-go]");
    if (!b) return;
    if (b.dataset.wizardGo === "next") {
      const bad = [...panels[i].querySelectorAll("[required]")].find((f) => !f.checkValidity());
      if (bad) { bad.reportValidity(); return; }
      show(i + 1);
    } else show(i - 1);
  });
  show(0);
});
