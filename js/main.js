(function () {
  const navBtn = document.querySelector(".menu-toggle");
  if (navBtn) {
    navBtn.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
      const open = document.body.classList.contains("nav-open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".faq-item").forEach(function (item) {
    const btn = item.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function () {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        const otherBtn = other.querySelector("button");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      } else {
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  function showToast(msg) {
    var toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    window.setTimeout(function () {
      toast.classList.remove("show");
    }, 2800);
  }

  document.querySelectorAll(".contact-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.reset();
      showToast("Noted. This desk is dummy - nothing was sent.");
    });
  });

  document.querySelectorAll(".js-buy").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      showToast("Presentation mockup. No checkout on this page.");
    });
  });

  var header = document.querySelector(".layout-a .site-header, .layout-j .site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var stickyBuy = document.querySelector(".jx-sticky-buy, .ax-sticky");
  var buySection = document.getElementById("buy");
  if (stickyBuy && buySection && "IntersectionObserver" in window) {
    var buyIo = new IntersectionObserver(
      function (entries) {
        stickyBuy.classList.toggle("is-hidden", entries[0].isIntersecting);
      },
      { threshold: 0.35 }
    );
    buyIo.observe(buySection);
  }

  var showcase = document.querySelector(".layout-a .ax-show");
  if (showcase) {
    var slides = Array.prototype.slice.call(showcase.querySelectorAll("[data-slide]"));
    var dots = Array.prototype.slice.call(showcase.querySelectorAll("[data-dot]"));
    var slideIndex = 0;

    function showSlide(next) {
      slideIndex = (next + slides.length) % slides.length;
      slides.forEach(function (slide, idx) {
        var on = idx === slideIndex;
        slide.classList.toggle("is-active", on);
        slide.setAttribute("aria-hidden", on ? "false" : "true");
        slide.inert = !on;
      });
      dots.forEach(function (dot, idx) {
        dot.setAttribute("aria-current", idx === slideIndex ? "true" : "false");
      });
    }

    var prevBtn = showcase.querySelector("[data-prev]");
    var nextBtn = showcase.querySelector("[data-next]");
    if (prevBtn) prevBtn.addEventListener("click", function () { showSlide(slideIndex - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { showSlide(slideIndex + 1); });
    dots.forEach(function (dot, idx) {
      dot.addEventListener("click", function () { showSlide(idx); });
    });
    showcase.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      showSlide(e.key === "ArrowLeft" ? slideIndex - 1 : slideIndex + 1);
    });
    showSlide(0);
  }

  var orbit = document.querySelector(".layout-a .ax-orbit");
  if (orbit) {
    var reduceOrbit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceOrbit) {
      Array.prototype.forEach.call(orbit.children, function (card) {
        orbit.appendChild(card.cloneNode(true));
      });
    }
    var orbitCards = Array.prototype.slice.call(orbit.children);
    var orbitPhase = 0;

    function placeOrbit(dt) {
      var width = orbit.clientWidth;
      var cardW = orbitCards[0].offsetWidth || 180;
      if (!width || !cardW) return;
      var step = cardW + Math.max(18, cardW * 0.16);
      var span = step * orbitCards.length;
      if (!reduceOrbit) orbitPhase = (orbitPhase + (dt / 16000) * span) % span;
      var center = width / 2;
      orbitCards.forEach(function (card, i) {
        var x = ((i * step - orbitPhase) % span + span) % span - span / 2;
        var nx = x / (width * 0.46);
        var ax = Math.min(Math.abs(nx), 1.5);
        var rot = Math.max(-26, Math.min(26, -nx * 18));
        card.style.transform = "translate3d(" + (center + x - cardW / 2) + "px," + (Math.abs(nx) * 16) + "px,0) rotateY(" + rot + "deg) scale(" + (1 - Math.min(ax, 1) * 0.08) + ")";
        card.style.opacity = String(Math.max(0.12, 1 - ax * 0.55));
      });
    }

    placeOrbit(0);
    if (!reduceOrbit) {
      var orbitLast = 0;
      function orbitTick(now) {
        if (!orbitLast) orbitLast = now;
        var dt = Math.min(40, now - orbitLast);
        orbitLast = now;
        if (!document.hidden) placeOrbit(dt);
        requestAnimationFrame(orbitTick);
      }
      requestAnimationFrame(orbitTick);
    }
  }

  document.querySelectorAll(".nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
      if (navBtn) navBtn.setAttribute("aria-expanded", "false");
    });
  });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var revealSelector = "main > section, .gx-hero-copy, .gx-hero-visual, .gx-proof li, .gx-matrix [role='row'], .gx-ing article, .gx-ritual li, .hx-copy, .hx-shot, .hx-steps article, .hx-blend > div, .hx-chips li, .ix-count article, .ix-out li, .ix-in li, .ix-bar span, .jx-hero-copy, .jx-hero-visual, .jx-pain-list li, .jx-benefit, .jx-step, .jx-spec-row div, .jx-trust-item, .jx-proof-grid article, .ax-stage-copy, .ax-stage-visual, .ax-stats li, .ax-orbs li, .ax-gallery figure, .ax-compare article, .faq-item, .sample-card, .hero-copy, .product-stage, .contact-points li, .contact-form";
    if (document.body.classList.contains("layout-a")) {
      revealSelector = ".ax-hero-grid, .ax-rail, .ax-formula-head, .ax-blend article, .ax-protocol-head, .ax-steps article, .ax-show, .ax-label-head, .ax-facts, .ax-notes, .ax-faq-head, .faq-item, .ax-reviews-head, .ax-reviews-grid figure, .ax-close-copy, .contact-form";
    }
    const nodes = document.querySelectorAll(revealSelector);
    if (nodes.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
      );
      nodes.forEach(function (el, i) {
        el.classList.add("reveal");
        el.style.setProperty("--d", (i % 8) * 55 + "ms");
        io.observe(el);
      });
    }
  }
})();
