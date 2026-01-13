// JAK Tech Firm website interactions
(function () {
  const WHATSAPP_NUMBER = "233594940421"; // Ghana format: country code + number without leading 0
  const DEFAULT_MESSAGE = "Hi JAK Tech Firm, I need assistance.";

  const waUrl = (text) => {
    const msg = encodeURIComponent(text || DEFAULT_MESSAGE);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  // Bind WhatsApp buttons
  const bindWa = (id, textFn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const msg = typeof textFn === "function" ? textFn() : DEFAULT_MESSAGE;
      window.open(waUrl(msg), "_blank", "noopener");
    });
  };

  bindWa("waTop", () => DEFAULT_MESSAGE);
  bindWa("waTopMobile", () => DEFAULT_MESSAGE);
  bindWa("waHero", () => "Hi JAK Tech Firm, I need help. Please share your availability.");
  bindWa("waBookCard", () => "Hi JAK Tech Firm, I want to book a service. Please share your next available time.");
  bindWa("waContact", () => DEFAULT_MESSAGE);
  bindWa("waFab", () => DEFAULT_MESSAGE);

  // Mobile menu
  const menuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      mobileNav.hidden = expanded;
    });

    // Close on click
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  // Booking form -> WhatsApp message
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (document.getElementById("name")?.value || "").trim();
      const phone = (document.getElementById("phone")?.value || "").trim();
      const service = (document.getElementById("service")?.value || "").trim();
      const details = (document.getElementById("details")?.value || "").trim();
      const location = (document.getElementById("location")?.value || "").trim();

      const msg =
`Hi JAK Tech Firm,
My name: ${name}
My WhatsApp: ${phone}
Service: ${service}
Issue: ${details}${location ? `\nLocation: ${location}` : ""}

Please let me know your next available time.`;

      window.open(waUrl(msg), "_blank", "noopener");
      form.reset();
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
