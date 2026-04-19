const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const siteHeader = document.getElementById("siteHeader");
const toTop = document.getElementById("toTop");
const loader = document.getElementById("loader");
const heroBg = document.getElementById("heroBg");
const scrollCue = document.querySelector(".scroll-cue");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => navMenu.classList.toggle("open"));
}

if (navMenu && navToggle) {
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
      navMenu.classList.remove("open");
    }
  });
}

const pathName = window.location.pathname;
const currentPage = pathName.split("/").pop() || "index.html";
const isHomePath = pathName === "/" || pathName.endsWith("/index.html");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (
    (href === "/" && isHomePath) ||
    href === currentPage ||
    (href === "index.html" && isHomePath)
  ) {
    link.classList.add("active");
  }

  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("open");
    }
  });
});

const revealItems = document.querySelectorAll(".reveal, .slide-left, .scale-in");
if (revealItems.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const counters = document.querySelectorAll("[data-count]");
const statsBar = document.getElementById("statsBar");
if (statsBar && counters.length) {
  let counted = false;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach((counter) => {
          const target = Number(counter.dataset.count);
          const suffix = target === 100 ? "%" : "+";
          let value = 0;
          const step = Math.max(1, Math.ceil(target / 60));

          const interval = setInterval(() => {
            value += step;
            if (value >= target) {
              value = target;
              clearInterval(interval);
            }
            counter.textContent = value + suffix;
          }, 20);
        });
      }
    });
  }, { threshold: 0.45 });

  statsObserver.observe(statsBar);
}

const heroTitle = document.getElementById("heroTitle");
if (heroTitle) {
  const words = heroTitle.textContent.split(" ");
  heroTitle.innerHTML = words
    .map((word, i) => `<span class="word" style="animation-delay:${i * 0.15}s">${word}&nbsp;</span>`)
    .join("");
}

const projectItems = Array.from(document.querySelectorAll(".project-card"));
projectItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 80}ms`;
});

const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
if (filterButtons.length && projectItems.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      projectItems.forEach((card) => {
        const category = card.dataset.category;
        const visible = filter === "all" || filter === category;
        card.classList.toggle("hide", !visible);
      });
    });
  });
}

const serviceItems = Array.from(document.querySelectorAll(".service-item"));
serviceItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 80}ms`;
});

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Thank you. Our team will get back to you shortly.";
    form.reset();
  });
}

let ticking = false;
function onScroll() {
  const y = window.scrollY;

  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", y > 40);
  }

  if (toTop) {
    toTop.classList.toggle("show", y > 300);
  }

  if (heroBg) {
    heroBg.style.transform = `translateY(${y * 0.25}px)`;
  }

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && navMenu) {
    navMenu.classList.remove("open");
  }
});

if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (loader) {
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1500);
}

if (scrollCue) {
  scrollCue.addEventListener("click", (event) => {
    const targetSelector = scrollCue.getAttribute("href");
    if (!targetSelector || !targetSelector.startsWith("#")) {
      return;
    }

    const target = document.querySelector(targetSelector);
    if (!target) {
      return;
    }

    event.preventDefault();
    const headerOffset = siteHeader ? siteHeader.offsetHeight + 12 : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  });
}
