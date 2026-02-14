

// ===== Theme Toggle =====
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  if (theme === "light") root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme || "dark");

themeToggle?.addEventListener("click", () => {
  const isLight = root.getAttribute("data-theme") === "light";
  setTheme(isLight ? "dark" : "light");
});

// ===== Mobile Menu =====
const hamburger = document.getElementById("hamburger");
const mobilePanel = document.getElementById("mobilePanel");
const closeMobile = document.getElementById("closeMobile");

function openMobile() {
  mobilePanel.classList.add("show");
  mobilePanel.setAttribute("aria-hidden", "false");
  hamburger.setAttribute("aria-expanded", "true");
}
function closeMobilePanel() {
  mobilePanel.classList.remove("show");
  mobilePanel.setAttribute("aria-hidden", "true");
  hamburger.setAttribute("aria-expanded", "false");
}

hamburger?.addEventListener("click", openMobile);
closeMobile?.addEventListener("click", closeMobilePanel);
mobilePanel?.addEventListener("click", (e) => {
  if (e.target === mobilePanel) closeMobilePanel();
});
document.querySelectorAll(".m-link").forEach(a => {
  a.addEventListener("click", () => closeMobilePanel());
});

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let current = "home";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ===== Reveal Animations =====
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// ===== Animate Skill Bars =====
const barEls = document.querySelectorAll(".bar");
const barIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const bar = entry.target;
    const level = Number(bar.getAttribute("data-level") || 0);
    const fill = bar.querySelector(".bar-fill");
    if (fill && fill.style.width === "0%") fill.style.width = `${level}%`;
  });
}, { threshold: 0.25 });

barEls.forEach(el => barIO.observe(el));

// ===== Project Filter =====
const filterBtns = document.querySelectorAll(".fbtn");
const projectCards = document.querySelectorAll(".p-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const f = btn.getAttribute("data-filter");
    projectCards.forEach(card => {
      const tags = (card.getAttribute("data-tags") || "").split(",").map(s => s.trim());
      const show = f === "all" || tags.includes(f);
      card.style.display = show ? "block" : "none";
    });
  });
});

// ===== Testimonials Slider =====
const testimonials = [
  { quote: "“Arun delivered a fast WordPress website with clean design and strong SEO setup.”", name: "Akhil", role: "Business Owner" },
  { quote: "“Quick turnaround and great communication. Our site speed improved a lot.”", name: "Priya", role: "Marketing Lead" },
  { quote: "“WooCommerce setup was perfect. Checkout flow is smooth and conversions increased.”", name: "Suresh", role: "Store Founder" },
  { quote: "“Fixed multiple 404 and indexing issues. Rankings became stable.”", name: "Meena", role: "Agency Client" },
];

const tQuote = document.getElementById("tQuote");
const tName = document.getElementById("tName");
const tRole = document.getElementById("tRole");
const tDots = document.getElementById("tDots");

let tIndex = 0;
function renderDots() {
  tDots.innerHTML = "";
  testimonials.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dotbtn" + (i === tIndex ? " active" : "");
    b.setAttribute("aria-label", `Testimonial ${i + 1}`);
    b.addEventListener("click", () => {
      tIndex = i;
      renderTestimonial();
      renderDots();
    });
    tDots.appendChild(b);
  });
}
function renderTestimonial() {
  const t = testimonials[tIndex];
  tQuote.textContent = t.quote;
  tName.textContent = t.name;
  tRole.textContent = t.role;
}
renderTestimonial();
renderDots();

setInterval(() => {
  tIndex = (tIndex + 1) % testimonials.length;
  renderTestimonial();
  renderDots();
}, 4500);

// ===== FAQ Accordion =====
document.querySelectorAll(".acc").forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    const icon = btn.querySelector("span");
    const isOpen = panel.classList.toggle("open");
    if (icon) icon.textContent = isOpen ? "−" : "+";
  });
});

// ===== Contact Form Validation =====
const form = document.getElementById("contactForm");
function setErr(name, msg) {
  const el = document.querySelector(`[data-err-for="${name}"]`);
  if (el) el.textContent = msg || "";
}
function isEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let ok = true;
  setErr("name", "");
  setErr("email", "");
  setErr("message", "");

  if (name.length < 2){ setErr("name", "Please enter your name."); ok = false; }
  if (!isEmail(email)){ setErr("email", "Please enter a valid email."); ok = false; }
  if (message.length < 10){ setErr("message", "Please enter at least 10 characters."); ok = false; }

  if (!ok) return;

  alert("Message sent (demo). Connect this form to email/API.");
  form.reset();
});

// ===== Back to top =====
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 600) toTop.classList.add("show");
  else toTop.classList.remove("show");
});
toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Typing Effect =====
const typingEl = document.getElementById("typing");
const words = [
  "high-converting landing pages.",
  "speed-optimized WordPress sites.",
  "WooCommerce stores that sell.",
  "SEO-ready pages that rank.",
  "custom plugins and features."
];
let wi = 0, ci = 0, del = false;

function typeLoop() {
  const w = words[wi];
  if (!del) {
    ci++;
    typingEl.textContent = w.slice(0, ci);
    if (ci === w.length) {
      del = true;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
    ci--;
    typingEl.textContent = w.slice(0, ci);
    if (ci === 0) {
      del = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(typeLoop, del ? 35 : 55);
}
typeLoop();

