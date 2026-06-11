/* ==========================================
   Arnav Dutta — site scripts
   Rev lights, scramble links, transitions, reveals
   ========================================== */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Rev lights scroll indicator ---------- */
  var strip = document.getElementById("revlights");
  if (strip) {
    var N = 14;
    var pairColors = ["g", "g", "g", "y", "y", "r", "r"]; // outside -> centre
    var lights = [];
    for (var i = 0; i < N; i++) {
      var pair = Math.min(i, N - 1 - i);
      var el = document.createElement("span");
      el.className = "rev rev-" + pairColors[pair];
      el.dataset.pair = pair;
      strip.appendChild(el);
      lights.push(el);
    }

    var updateRev = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 40 ? Math.min(1, window.scrollY / max) : 0;
      var pairsLit = Math.floor(p * 7.999); // 0..7
      for (var j = 0; j < lights.length; j++) {
        var pr = +lights[j].dataset.pair;
        lights[j].classList.toggle("lit", pr < pairsLit);
      }
      strip.classList.toggle("limiter", p > 0.985);
    };

    window.addEventListener("scroll", updateRev, { passive: true });
    window.addEventListener("resize", updateRev);
    updateRev();
  }

  /* ---------- Scramble links (proximity reveal) ---------- */
  var CHARS = "!<>-_\\/[]{}=+*^?#@$%&";
  var scrambles = document.querySelectorAll(".scramble");

  if (scrambles.length) {
    if (!finePointer || reduced) {
      // Touch devices / reduced motion: just show the real text
      scrambles.forEach(function (el) {
        el.textContent = el.dataset.text;
      });
    } else {
      var mx = -9999, my = -9999;
      window.addEventListener("mousemove", function (e) {
        mx = e.clientX;
        my = e.clientY;
      }, { passive: true });

      var states = [];
      scrambles.forEach(function (el) {
        states.push({ el: el, target: el.dataset.text, reveal: 0 });
      });

      var last = 0;
      var RADIUS = 90;

      var frame = function (t) {
        if (t - last > 50) {
          last = t;
          states.forEach(function (s) {
            var r = s.el.getBoundingClientRect();
            var cx = Math.max(r.left, Math.min(mx, r.right));
            var cy = Math.max(r.top, Math.min(my, r.bottom));
            var near = Math.hypot(mx - cx, my - cy) < RADIUS;

            s.reveal += near ? 2 : -2;
            s.reveal = Math.max(0, Math.min(s.target.length, s.reveal));

            var out = "";
            for (var i = 0; i < s.target.length; i++) {
              if (i < s.reveal || s.target[i] === " " || s.target[i] === "/" || s.target[i] === ".") {
                out += s.target[i];
              } else {
                out += CHARS[(Math.random() * CHARS.length) | 0];
              }
            }
            s.el.textContent = out;
          });
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }
  }

  /* ---------- Page transitions (gear-shift) ---------- */
  if (!reduced) {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.hasAttribute("download")) return;

      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;
      if (/\.(pdf|zip|png|jpg|jpeg)$/i.test(url.pathname)) return;

      e.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(function () {
        location.href = a.href;
      }, 230);
    });

    // Fix for browser back/forward cache showing a blank page
    window.addEventListener("pageshow", function () {
      document.body.classList.remove("page-exit");
    });
  }

  /* ---------- Staggered scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    } else {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      revealEls.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i * 70, 350) + "ms";
        obs.observe(el);
      });
    }
  }
})();
