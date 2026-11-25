/* Gildong Hong — Portfolio interactions
   - mobile menu, scroll reveal, VIEW cursor, copy email
   - case study: active TOC + progress, A/B toggle, before/after slider
   Every effect respects "prefers-reduced-motion". */

document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Mobile menu ---------- */
document.querySelectorAll("[data-menu-btn]").forEach((btn) => {
  const nav = document.getElementById(btn.getAttribute("aria-controls"));
  if (!nav) return;
  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    nav.classList.toggle("is-open", open);
  };
  btn.addEventListener("click", () => setOpen(btn.getAttribute("aria-expanded") !== "true"));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
});

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
}

/* ---------- VIEW cursor (mouse only) ---------- */
const cursor = document.querySelector(".cursor");
if (cursor && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion) {
  document.addEventListener("pointermove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll("[data-cursor]").forEach((el) => {
    el.addEventListener("pointerenter", () => cursor.classList.add("is-active"));
    el.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
  });
}

/* ---------- Copy email ---------- */
const toast = document.querySelector(".toast");
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const value = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast("이메일 주소를 복사했어요");
    } catch {
      showToast(value);
    }
  });
});

/* ---------- Case study: TOC + progress ---------- */
const sections = [...document.querySelectorAll(".cs-section")];
if (sections.length) {
  const tocLinks = [...document.querySelectorAll("[data-toc] a")];
  const bars = document.querySelectorAll("[data-progress]");
  const curNum = document.querySelector("[data-toc-num]");
  const curName = document.querySelector("[data-toc-name]");
  const content = document.querySelector("[data-case-content]");
  const tocBar = document.querySelector(".toc-bar details");
  let activeId = "";

  const setActive = (id) => {
    if (id === activeId) return;
    activeId = id;
    tocLinks.forEach((a) => {
      const on = a.getAttribute("href") === `#${id}`;
      a.classList.toggle("is-active", on);
      if (on) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
    const i = sections.findIndex((s) => s.id === id);
    if (i >= 0 && curNum && curName) {
      curNum.textContent = String(i + 1).padStart(2, "0");
      curName.textContent = sections[i].dataset.title || "";
    }
  };

  const onScroll = () => {
    const offset = 160;
    let current = sections[0].id;
    for (const s of sections) {
      if (s.getBoundingClientRect().top - offset <= 0) current = s.id;
    }
    setActive(current);
    if (content) {
      const r = content.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const pct = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.3) / total));
      bars.forEach((b) => { b.style.width = `${(pct * 100).toFixed(1)}%`; });
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  if (tocBar) tocBar.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { tocBar.open = false; }));
}

/* ---------- A/B decision toggle ---------- */
document.querySelectorAll("[data-ab]").forEach((root) => {
  const buttons = root.querySelectorAll("[data-ab-btn]");
  const options = root.querySelectorAll("[data-ab-option]");
  const reason = root.querySelector("[data-ab-reason]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.abBtn; // "A" or "B"
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      options.forEach((o) => o.classList.toggle("is-selected", o.dataset.abOption === key));
      if (reason) reason.textContent = reason.dataset[`reason${key}`] || "";
    });
  });
});

/* ---------- Before / After slider ---------- */
document.querySelectorAll("[data-ba]").forEach((root) => {
  const input = root.querySelector("input[type='range']");
  if (!input) return;
  const update = () => {
    root.style.setProperty("--pos", `${input.value}%`);
    input.setAttribute("aria-valuetext", `개선 전 ${input.value}% 보기`);
  };
  input.addEventListener("input", update);
  update();
});
