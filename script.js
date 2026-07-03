document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.querySelector(".sidebar-links");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");
  const progressBar = document.getElementById("progressBar");
  const tabs = document.querySelectorAll(".tab");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Only close if it's the mobile menu and active
      if (window.innerWidth <= 768 && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
      }
    });
  });

  /* ---------- Theme toggle ---------- */
  const applyTheme = (light) => {
    document.body.classList.toggle("light-mode", light);
    themeIcon.className = light ? "fa-solid fa-sun" : "fa-solid fa-moon";
  };

  let savedTheme = null;
  try { savedTheme = localStorage.getItem("theme"); } catch (e) { /* storage unavailable */ }
  applyTheme(savedTheme === "light");

  themeToggle.addEventListener("click", () => {
    const light = !document.body.classList.contains("light-mode");
    applyTheme(light);
    try { localStorage.setItem("theme", light ? "light" : "dark"); } catch (e) { /* ignore */ }
  });

  /* ---------- Tab bar smooth scroll ---------- */
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = document.getElementById(tab.dataset.target);
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  /* ---------- Typewriter effect ---------- */
  const typedOutput = document.getElementById("typedOutput");
  const lines = [
    "Ahmadreza Amiri — Cybersecurity & Network Enthusiast",
    "Computer Engineering · Python automation · secure systems"
  ];

  const typeLine = (text, el, onDone) => {
    let i = 0;
    const speed = reduceMotion ? 0 : 22;
    (function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else if (onDone) {
        onDone();
      }
    })();
  };

  const runTypewriter = () => {
    typedOutput.textContent = "";
    if (reduceMotion) {
      typedOutput.textContent = lines.join("\n");
      return;
    }
    typeLine(lines[0], typedOutput, () => {
      const secondLineEl = document.createElement("span");
      secondLineEl.style.display = "block";
      secondLineEl.style.color = "var(--text-dim)";
      secondLineEl.style.fontSize = "0.85em";
      secondLineEl.style.marginTop = "4px";
      typedOutput.appendChild(secondLineEl);
      typeLine(lines[1], secondLineEl);
    });
  };
  runTypewriter();


  const aboutMeTypedText = document.getElementById("aboutMeTypedText");
  const aboutMeLines = [
    `I was born in January 2004 and earned my high school diploma in Mathematics and Physics.
Currently, I study Computer Engineering at Karaj Azad University.
I started programming at 16, and since then, coding has been one of my biggest passions.`,
    `Today my main path is cybersecurity and computer networks.
I enjoy understanding how systems communicate, where they break, and how to make them safer through automation, monitoring, and careful engineering.`,
    `I like projects that feel practical: Python tools, Telegram bots, network-focused experiments, data analysis, and anything that teaches me how real systems behave under pressure.`
  ];
  let aboutTypingStarted = false;

  const runLoopingTypewriter = (el, texts) => {
    if (!el) return;
    if (reduceMotion) {
      el.textContent = texts.join("\n\n");
      return;
    }

    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const step = () => {
      const currentText = texts[textIndex];
      el.textContent = currentText.slice(0, charIndex);

      if (!deleting && charIndex < currentText.length) {
        charIndex++;
        setTimeout(step, 24);
        return;
      }

      if (!deleting && charIndex === currentText.length) {
        deleting = true;
        setTimeout(step, 1800);
        return;
      }

      if (deleting && charIndex > 0) {
        charIndex--;
        setTimeout(step, 10);
        return;
      }

      deleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(step, 350);
    };

    step();
  };

  // Modify the revealObserver to trigger the aboutMe typing effect
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        if (entry.target.id === "about" && !aboutTypingStarted) {
          aboutTypingStarted = true;
          runLoopingTypewriter(aboutMeTypedText, aboutMeLines);
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  /* ---------- Scrollspy: highlight active tab / nav link ---------- */
  const setActive = (id) => {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.target === id));
    navLinks.forEach(n => n.classList.toggle("active", n.dataset.target === id));
  };

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { threshold: 0.4, rootMargin: "-70px 0px -50% 0px" });

  sections.forEach(sec => spyObserver.observe(sec));

  /* ---------- Scroll progress bar ---------- */
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct + "%";
        ticking = false;
      });
      ticking = true;
    }
  });
});
