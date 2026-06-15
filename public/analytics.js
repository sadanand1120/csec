// Google Analytics 4 tracking for the salary calculator.
(function () {
  const GA4_MEASUREMENT_ID = "G-YDCPVD6PQS";
  const trackedScrollMilestones = new Set();

  if (window.__csecAnalyticsInitialized) {
    return;
  }
  window.__csecAnalyticsInitialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID, {
    send_page_view: true,
    allow_google_signals: true,
    allow_ad_personalization_signals: true,
  });

  window.trackButtonClick = function (buttonName, section) {
    gtag("event", "click", {
      event_category: "button",
      event_label: buttonName,
      custom_parameter_1: section || "unknown",
      value: 1,
    });
  };

  window.trackExternalLink = function (url) {
    gtag("event", "click", {
      event_category: "external_link",
      event_label: url,
      transport_type: "beacon",
    });
  };

  window.trackFormInteraction = function (formName, field) {
    gtag("event", "form_interaction", {
      event_category: "form",
      event_label: formName,
      custom_parameter_1: field || "",
    });
  };

  function trackScrollDepth() {
    const scrollableHeight = document.body.scrollHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;

    const percent = Math.round((window.scrollY / scrollableHeight) * 100);
    [25, 50, 75, 100].forEach((milestone) => {
      if (percent >= milestone && !trackedScrollMilestones.has(milestone)) {
        trackedScrollMilestones.add(milestone);
        gtag("event", "scroll_depth", {
          event_category: "engagement",
          event_label: `${milestone}%`,
          value: milestone,
        });
      }
    });
  }

  function initializeAutoTracking() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link && link.hostname && link.hostname !== window.location.hostname) {
        window.trackExternalLink(link.href);
      }

      const navLink = event.target.closest(".top-nav a");
      if (navLink) {
        window.trackButtonClick(navLink.textContent.trim(), "top_nav");
      }

      const mapViewButton = event.target.closest(".map-view-button");
      if (mapViewButton) {
        window.trackButtonClick(mapViewButton.textContent.trim(), "map_view");
      }

      const detailButton = event.target.closest(".detail-chip");
      if (detailButton) {
        window.trackButtonClick(detailButton.textContent.trim(), "computation_breakdown");
      }
    });

    document.addEventListener("change", (event) => {
      const field = event.target.closest("select, input");
      if (!field) return;
      window.trackFormInteraction("calculator_controls", field.id || field.name || field.type);
    });

    window.addEventListener("scroll", trackScrollDepth, { passive: true });

    const startTime = Date.now();
    window.addEventListener("beforeunload", () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      gtag("event", "time_on_page", {
        event_category: "engagement",
        event_label: document.title,
        value: timeOnPage,
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAutoTracking);
  } else {
    initializeAutoTracking();
  }
})();
