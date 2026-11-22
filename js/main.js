(function () {
  var LANG_KEY = "portfolio-lang";
  var THEME_KEY = "portfolio-theme";
  var lang = "en";
  var CV = {
    en: { href: "assets/cv-nicolas-iavicoli-en.pdf", download: "cv-nicolas-iavicoli-en.pdf" },
    es: { href: "assets/cv-nicolas-iavicoli.pdf", download: "cv-nicolas-iavicoli.pdf" }
  };

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function activeTheme() {
    var set = document.documentElement.getAttribute("data-theme");
    if (set === "light" || set === "dark") return set;
    return systemTheme();
  }

  function applyTheme(theme, persist) {
    if (persist && (theme === "light" || theme === "dark")) {
      document.documentElement.setAttribute("data-theme", theme);
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }
    var button = document.getElementById("theme-toggle");
    if (!button || !window.I18N) return;
    var current = activeTheme();
    var key = current === "dark" ? "theme.ariaToLight" : "theme.ariaToDark";
    button.setAttribute("aria-pressed", current === "dark" ? "true" : "false");
    button.setAttribute("aria-label", window.I18N[lang][key]);
  }

  function applyLang(next, persist) {
    if (next !== "en" && next !== "es") next = "en";
    lang = next;
    var dict = window.I18N[lang];
    document.documentElement.lang = lang === "es" ? "es" : "en";
    document.title = dict["meta.title"];
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", dict["meta.description"]);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (dict[key] != null) el.setAttribute("alt", dict[key]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });

    document.querySelectorAll("[data-lang-set]").forEach(function (button) {
      var on = button.getAttribute("data-lang-set") === lang;
      button.setAttribute("aria-pressed", on ? "true" : "false");
    });

    var other = lang === "es" ? "en" : "es";
    document.querySelectorAll("[data-cv='primary']").forEach(function (el) {
      el.setAttribute("href", CV[lang].href);
      el.setAttribute("download", CV[lang].download);
    });
    document.querySelectorAll("[data-cv='alt']").forEach(function (el) {
      el.setAttribute("href", CV[other].href);
      el.setAttribute("download", CV[other].download);
    });

    if (persist) {
      try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
      var url = new URL(window.location.href);
      if (lang === "es") url.searchParams.set("lang", "es");
      else url.searchParams.delete("lang");
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
    applyTheme(null, false);
  }

  function initialLang() {
    var fromQuery = new URLSearchParams(window.location.search).get("lang");
    if (fromQuery === "en" || fromQuery === "es") return fromQuery;
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === "en" || stored === "es") return stored;
    } catch (e) {}
    return "en";
  }

  document.querySelectorAll("[data-lang-set]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyLang(button.getAttribute("data-lang-set"), true);
    });
  });

  var themeButton = document.getElementById("theme-toggle");
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      applyTheme(activeTheme() === "dark" ? "light" : "dark", true);
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (!document.documentElement.getAttribute("data-theme")) applyTheme(null, false);
  });

  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("nav-toggle");
  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNav();
        navToggle.focus();
      }
    });
  }

  applyLang(initialLang(), false);
  document.documentElement.classList.add("ready");
  document.documentElement.classList.remove("i18n-pending");
})();
