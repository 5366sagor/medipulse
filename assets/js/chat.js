/* MediPulse - chat demo (client-side only) */
document.querySelectorAll("[data-chat]").forEach((box) => {
  const log = box.querySelector(".chat__log");
  const form = box.querySelector(".chat__form");
  const input = form.querySelector("input");
  const add = (text, out) => {
    const m = document.createElement("div");
    m.className = "msg" + (out ? " msg--out" : "");
    const p = document.createElement("span"); p.textContent = text;
    const t = document.createElement("time");
    t.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    m.append(p, t); log.append(m); log.scrollTop = log.scrollHeight;
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    add(v, true); input.value = "";
    setTimeout(() => add("Thanks, noted. I will update the chart shortly.", false), 900);
  });
  box.querySelectorAll(".chat__contact").forEach((b) => b.addEventListener("click", () => {
    box.querySelectorAll(".chat__contact").forEach((x) => { x.classList.remove("active"); x.removeAttribute("aria-current"); });
    b.classList.add("active"); b.setAttribute("aria-current", "true");
    box.querySelector("[data-chat-name]").textContent = b.dataset.name;
  }));
});
