/* MediPulse - auth helpers: password toggle and one-time code inputs */
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-toggle-password]");
  if (!b) return;
  const f = document.getElementById(b.dataset.togglePassword);
  const show = f.type === "password";
  f.type = show ? "text" : "password";
  b.setAttribute("aria-label", show ? "Hide password" : "Show password");
  b.firstElementChild.className = "bi " + (show ? "bi-eye-slash" : "bi-eye");
});
document.querySelectorAll(".otp").forEach((g) => {
  const f = [...g.querySelectorAll("input")];
  f.forEach((el, i) => {
    el.addEventListener("input", () => { el.value = el.value.replace(/\D/g, "").slice(0, 1); if (el.value && f[i + 1]) f[i + 1].focus(); });
    el.addEventListener("keydown", (e) => { if (e.key === "Backspace" && !el.value && f[i - 1]) f[i - 1].focus(); });
    el.addEventListener("paste", (e) => {
      const d = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, f.length);
      if (!d) return; e.preventDefault();
      [...d].forEach((c, k) => { f[k].value = c; }); f[Math.min(d.length, f.length - 1)].focus();
    });
  });
});
