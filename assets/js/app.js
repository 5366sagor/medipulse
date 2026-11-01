/* MediPulse v1.0 - app.js (vanilla ES6, no jQuery) */
(() => {
  "use strict";
  const root = document.documentElement;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
  };

  /* Theme (light / dark) ------------------------------------- */
  const applyTheme = (t) => root.setAttribute("data-bs-theme", t);
  applyTheme(store.get("mp-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

  /* Direction (LTR / RTL) ------------------------------------ */
  const bsLink = document.getElementById("bs-css");
  const applyDir = (d) => {
    root.setAttribute("dir", d);
    if (bsLink) bsLink.href = bsLink.dataset[d === "rtl" ? "rtl" : "ltr"];
  };
  applyDir(store.get("mp-dir") || "ltr");

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-mp-action]");
    if (!t) return;
    const a = t.dataset.mpAction;
    if (a === "theme") {
      const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      applyTheme(next); store.set("mp-theme", next); drawCharts();
    }
    if (a === "dir") {
      const next = root.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
      applyDir(next); store.set("mp-dir", next);
    }
    if (a === "sidebar") {
      if (matchMedia("(max-width: 991.98px)").matches) document.body.classList.toggle("sidebar-open");
      else document.body.classList.toggle("sidebar-mini");
    }
    if (a === "sidebar-close") document.body.classList.remove("sidebar-open");
  });

  /* Charts (ApexCharts) -------------------------------------- */
  const charts = [];
  function drawCharts() {
    if (!window.ApexCharts) return;
    charts.splice(0).forEach((c) => c.destroy());
    const dark = root.getAttribute("data-bs-theme") === "dark";
    const base = { theme: { mode: dark ? "dark" : "light" }, chart: { background: "transparent", toolbar: { show: false }, fontFamily: "Inter, sans-serif" }, grid: { borderColor: dark ? "#243546" : "#e3eaf0" } };
    const mount = (sel, opts) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const c = new ApexCharts(el, Object.assign({}, base, opts, { chart: Object.assign({}, base.chart, opts.chart) }));
      c.render(); charts.push(c);
    };
    mount("#chart-patients", {
      chart: { type: "area", height: 300 }, colors: ["#0e9f9a", "#3b82f6"],
      series: [{ name: "Outpatients", data: [310, 340, 298, 380, 420, 390, 450, 470, 440, 510, 530, 560] }, { name: "Inpatients", data: [90, 110, 96, 120, 130, 118, 140, 150, 138, 160, 170, 182] }],
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
      stroke: { curve: "smooth", width: 2.5 }, dataLabels: { enabled: false }, fill: { type: "gradient", gradient: { opacityFrom: .28, opacityTo: 0 } }, legend: { position: "top", horizontalAlign: "end" },
    });
    mount("#chart-revenue", {
      chart: { type: "bar", height: 300 }, colors: ["#0e9f9a"], dataLabels: { enabled: false }, plotOptions: { bar: { borderRadius: 4, columnWidth: "55%" } },
      series: [{ name: "Revenue ($k)", data: [52, 58, 61, 66, 63, 70, 74, 79, 76, 82, 85, 91] }],
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    });
    mount("#chart-age", {
      chart: { type: "bar", height: 300 }, colors: ["#3b82f6"], dataLabels: { enabled: false }, plotOptions: { bar: { horizontal: true, borderRadius: 4, barHeight: "55%" } },
      series: [{ name: "Patients", data: [820, 1460, 2380, 2910, 2540, 1590, 780] }],
      xaxis: { categories: ["0-9", "10-19", "20-34", "35-49", "50-64", "65-79", "80+"] },
    });
    mount("#chart-wait", {
      chart: { type: "line", height: 300 }, colors: ["#f5a524", "#0e9f9a"], stroke: { curve: "smooth", width: 2.5 }, dataLabels: { enabled: false },
      series: [{ name: "Average wait (min)", data: [24, 22, 26, 21, 19, 18, 17] }, { name: "Target (min)", data: [20, 20, 20, 20, 20, 20, 20] }],
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }, legend: { position: "top", horizontalAlign: "end" },
    });
    mount("#chart-ui-line", { chart: { type: "line", height: 260 }, colors: ["#0e9f9a"], stroke: { curve: "smooth", width: 3 }, dataLabels: { enabled: false }, series: [{ name: "Visits", data: [31, 40, 36, 52, 49, 62] }], xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] } });
    mount("#chart-ui-bar", { chart: { type: "bar", height: 260 }, colors: ["#1e3a5f", "#3b82f6"], dataLabels: { enabled: false }, plotOptions: { bar: { borderRadius: 4 } }, series: [{ name: "Walk-in", data: [44, 55, 41, 67] }, { name: "Booked", data: [53, 32, 33, 52] }], xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] }, legend: { position: "top" } });
    mount("#chart-ui-pie", { chart: { type: "pie", height: 260 }, colors: ["#0e9f9a", "#3b82f6", "#f5a524", "#e5484d"], series: [44, 31, 15, 10], labels: ["Card", "Cash", "Bank", "Wallet"], stroke: { width: 0 }, legend: { position: "bottom" }, dataLabels: { enabled: false } });
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    mount("#chart-bp", {
      chart: { type: "line", height: 280 }, colors: ["#e5484d", "#3b82f6"], stroke: { curve: "smooth", width: 2.5 }, dataLabels: { enabled: false },
      series: [{ name: "Systolic", data: [132, 128, 135, 126, 130, 127, 128] }, { name: "Diastolic", data: [86, 82, 88, 80, 84, 81, 82] }],
      xaxis: { categories: days }, legend: { position: "top", horizontalAlign: "end" },
    });
    mount("#chart-hr", {
      chart: { type: "area", height: 280 }, colors: ["#0e9f9a"], stroke: { curve: "smooth", width: 2.5 }, dataLabels: { enabled: false },
      series: [{ name: "Heart rate", data: [72, 76, 74, 79, 71, 73, 74] }], xaxis: { categories: days },
      fill: { type: "gradient", gradient: { opacityFrom: .28, opacityTo: 0 } },
    });
    mount("#chart-departments", {
      chart: { type: "donut", height: 280 }, colors: ["#0e9f9a", "#1e3a5f", "#3b82f6", "#f5a524", "#e5484d"],
      series: [34, 24, 18, 14, 10], labels: ["General", "Cardiology", "Pediatrics", "Orthopedics", "Dermatology"],
      stroke: { width: 0 }, legend: { position: "bottom" }, dataLabels: { enabled: false },
    });
  }

  /* Table filter -------------------------------------------- */
  document.addEventListener("input", (e) => {
    const box = e.target.closest("[data-table-filter]");
    if (!box) return;
    const q = box.value.trim().toLowerCase();
    document.querySelectorAll(box.dataset.tableFilter + " [data-row]").forEach((tr) => {
      tr.hidden = q && !tr.textContent.toLowerCase().includes(q);
    });
  });

  /* Form validation (Bootstrap) ------------------------------ */
  document.querySelectorAll(".needs-validation").forEach((form) => {
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) { e.preventDefault(); e.stopPropagation(); }
      form.classList.add("was-validated");
    });
  });

  /* Toast demo ---------------------------------------------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-show-toast]");
    if (b && window.bootstrap) bootstrap.Toast.getOrCreateInstance(document.querySelector(b.dataset.showToast)).show();
  });
  document.addEventListener("DOMContentLoaded", drawCharts);
})();
