/* ============================================================
   GYO PRO PTY LTD — Main JS
   ============================================================ */

(function () {
  "use strict";

  // 1. Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Close mobile nav after clicking a link
  var navToggle = document.getElementById("nav-toggle");
  if (navToggle) {
    var navLinks = document.querySelectorAll(".site-nav a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.checked = false;
      });
    });
  }

  // 3. Mark active nav link based on scroll position
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".site-nav a[href^='#']");

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navAnchors.forEach(function (a) {
              if (a.getAttribute("href") === "#" + id) {
                a.style.color = "var(--gold)";
              } else {
                a.style.color = "";
              }
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  // ============================================================
  // ============================================================
  // 4. Cookie consent banner
  // ============================================================
  var STORAGE_KEY = "gyo_cookie_consent";
  var CONSENT_TTL_DAYS = 365;

  var banner = document.getElementById("cookie-banner");
  var settingsPanel = document.getElementById("cookie-settings");

  function loadConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      // Expire after TTL
      var ageMs = Date.now() - (data.ts || 0);
      if (ageMs > CONSENT_TTL_DAYS * 24 * 60 * 60 * 1000) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consent) {
    var data = {
      ts: Date.now(),
      essential: true,
      analytics: !!consent.analytics,
      marketing: !!consent.marketing,
      source: consent.source || "unknown"
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* localStorage blocked — silently ignore */ }

    // Notify other scripts (analytics should listen for this)
    try {
      window.dispatchEvent(
        new CustomEvent("cookieconsent", { detail: data })
      );
    } catch (e) { /* CustomEvent on old browsers — ignore */ }

    hideBanner();
  }

  function hideBanner() {
    if (banner) {
      banner.setAttribute("hidden", "");
    }
  }

  function showBanner() {
    if (banner) {
      banner.removeAttribute("hidden");
    }
  }

  function toggleSettings(show) {
    if (!settingsPanel) return;
    if (show) {
      settingsPanel.removeAttribute("hidden");
    } else {
      settingsPanel.setAttribute("hidden", "");
    }
  }

  // Wire up buttons
  if (banner) {
    banner.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cookie-action]");
      if (!btn) return;
      var action = btn.getAttribute("data-cookie-action");

      if (action === "accept") {
        saveConsent({ analytics: true, marketing: true, source: "accept" });
      } else if (action === "decline") {
        saveConsent({ analytics: false, marketing: false, source: "decline" });
      } else if (action === "settings") {
        toggleSettings(true);
      } else if (action === "save") {
        var analytics = banner.querySelector('input[name="analytics"]').checked;
        var marketing = banner.querySelector('input[name="marketing"]').checked;
        saveConsent({ analytics: analytics, marketing: marketing, source: "settings" });
      } else if (action === "learn") {
        e.preventDefault();
        // TODO: link to /privacy.html once it exists
        alert("Privacy policy page coming soon. Contact Manager@gyopro.com.au for details.");
      }
    });

    // Show on first visit (after a small delay so the page can settle)
    if (!loadConsent()) {
      showBanner();
    } else {
      // Re-dispatch consent event for any scripts that loaded after
      var existing = loadConsent();
      if (existing) {
        try {
          window.dispatchEvent(
            new CustomEvent("cookieconsent", { detail: existing })
          );
        } catch (e) { /* ignore */ }
      }
    }
  }

  // Expose a small helper for debugging
  window.gyoResetCookieConsent = function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    showBanner();
  };

  // ============================================================
  // 5. Remove Netlify "Powered by" badge
  // (CSS handles <a>; this handles iframes + late-injected nodes)
  // ============================================================
  function removeNetlifyBadge() {
    var selectors = [
      "#netlify-badge",
      ".netlify-badge",
      'iframe[src*="netlify.com"]',
      'iframe[title*="Netlify"]',
      'a[href="https://www.netlify.com/"]'
    ];
    selectors.forEach(function (sel) {
      var nodes = document.querySelectorAll(sel);
      nodes.forEach(function (n) { n.remove(); });
    });
  }
  // Run once on load and again after a short delay (badge injects async)
  removeNetlifyBadge();
  setTimeout(removeNetlifyBadge, 500);
  setTimeout(removeNetlifyBadge, 2000);

  // Watch for late additions (badge script may append after a few seconds)
  if ("MutationObserver" in window) {
    var mo = new MutationObserver(function () { removeNetlifyBadge(); });
    mo.observe(document.body, { childList: true, subtree: true });
    // Stop observing after 10s — badge either appeared and was killed, or won't appear
    setTimeout(function () { mo.disconnect(); }, 10000);
  }
})();