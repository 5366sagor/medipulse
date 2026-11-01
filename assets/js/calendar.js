/* MediPulse - appointment calendar (FullCalendar) */
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("calendar");
  if (!el || !window.FullCalendar) return;
  const d = (offset, h, m = 0) => { const x = new Date(); x.setDate(x.getDate() + offset); x.setHours(h, m, 0, 0); return x; };
  const ev = (t, o, h, c, len = 30) => { const s = d(o, h, c ? 30 : 0); return { title: t, start: s, end: new Date(s.getTime() + len * 60000) }; };
  const cls = { c: "#0e9f9a", p: "#f5a524", i: "#3b82f6", x: "#e5484d" };
  const list = [
    ["Amina Rahman, Cardiology", 0, 9, 1, "c"], ["Liam Morgan, Pediatrics", 0, 10, 0, "i"], ["Yuki Tanaka, Orthopedics", 0, 10, 1, "p"],
    ["Sofia Ortega, Dermatology", 1, 11, 0, "c"], ["Daniel Kim, Cardiology", 1, 14, 0, "x"], ["Hannah Berg, Neurology", 2, 9, 0, "c"],
    ["Omar Siddiqui, Orthopedics", 3, 13, 1, "p"], ["Chloe Dubois, General", 4, 15, 0, "c"], ["Amina Rahman, Review", 7, 10, 0, "i"], ["Liam Morgan, Follow-up", -2, 16, 0, "c"],
  ].map(([t, o, h, c, k]) => Object.assign(ev(t, o, h, c), { color: cls[k] }));
  new FullCalendar.Calendar(el, {
    initialView: window.innerWidth < 768 ? "listWeek" : "dayGridMonth", height: "auto", nowIndicator: true,
    headerToolbar: { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek" },
    events: list, direction: document.documentElement.dir,
  }).render();
});
