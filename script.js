// import createClient from "@supabase/supabase-js";

// function loadWaitlist() {
//   const supabaseUrl = "https://qpwtsojnrsqbmgjqfyrh.supabase.co";
//   const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwd3Rzb2pucnNxYm1nanFmeXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MDIyMDgsImV4cCI6MjA3OTM3ODIwOH0.ftI-UZVNg0Od-_bD549l3D2p5dMU_6kkjJkpMUG5Occ";
//   const supabase = createClient(supabaseUrl, supabaseKey);
//   return supabase;
// }

// async function getFromWaitlist(supabase) {
//   const { count, error } = await supabase.from("Waitlist").select("*", {count: "exact"});
//   return Promise.all([count, error]);
// }

// async function addToWaitlist(supabase, name, email) {
//   const { data, error } = await supabase.from("Waitlist").insert([
//     { name: name, email: email, notified: false },
//   ]);
//   return Promise.all([data, error]);
// }

const loadingScreen = document.getElementById("loadingScreen");
const loadingProgress = document.getElementById("loadingProgress");
const enterBtn = document.getElementById("enterBtn");
const mainContent = document.getElementById("mainContent");
let progress = 0;

// === DYNAMIC LOADING TEXT ===
const loaderText = document.querySelector(".loader-text"); // Fixed: added dot for class
const loadingTexts = [
  "Initializing systems",
  "Loading portfolio",
  "Compiling algorithms",
  "Preparing experience",
  "Almost ready",
  "Let's begin",
];

let textIndex = 0;

function cycleLoadingText() {
  // Fade out
  loaderText.style.opacity = "0";
  loaderText.style.transform = "translateY(-10px)";

  setTimeout(() => {
    // Change text
    textIndex = (textIndex + 1) % loadingTexts.length;
    loaderText.textContent = loadingTexts[textIndex];

    // Fade in
    loaderText.style.opacity = "1";
    loaderText.style.transform = "translateY(0)";
  }, 300);
}

// Start cycling (only while loading)
const textInterval = setInterval(cycleLoadingText, 1800);

// Stop when loaded
window.addEventListener("load", () => {
  setTimeout(() => {
    clearInterval(textInterval);
    loaderText.textContent = "Portfolio ready";
    loaderText.style.opacity = "1";
  }, 500);
});

// Simulate loading progress
const loadingInterval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingInterval);
  }
  loadingProgress.style.width = progress + "%";
}, 200);

// Function to hide loading screen and show content
function hideLoadingScreen(direction = "up") {
  loadingScreen.classList.add(`slide-${direction}`);

  // Remove loading class from body
  setTimeout(() => {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  }, 300);

  // Remove loading screen from DOM after animation
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 800);
}

// Enter button click
enterBtn.addEventListener("click", () => {
  hideLoadingScreen("up");
});

// Swipe up gesture for mobile
let touchStartY = 0;
let touchEndY = 0;

loadingScreen.addEventListener(
  "touchstart",
  (e) => {
    touchStartY = e.changedTouches[0].screenY;
  },
  { passive: true }
);

loadingScreen.addEventListener(
  "touchend",
  (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  if (touchStartY - touchEndY > 50) {
    // Swipe up detected
    hideLoadingScreen("up");
  }
}

// Optional: Auto-hide after loading completes (remove if not needed)
// setTimeout(() => {
//   hideLoadingScreen('up');
// }, 3000);

// === RESUME MODAL ===
const resumeModal = document.getElementById("resumeModal");
const resumeBtn = document.getElementById("resumeBtn");
// const waitlistCount = document.getElementById("waitlistCount");
const modalClose = document.getElementById("modalClose");

// const supabase = loadWaitlist();
// const res = getFromWaitlist(supabase);
// const count = res[0];

// waitlistCount.textContent = `👥 Join ${count} others on the waitlist!`;

resumeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resumeModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

modalClose.addEventListener("click", closeModal);

resumeModal.addEventListener("click", (e) => {
  if (e.target === resumeModal) {
    closeModal();
  }
});

function closeModal() {
  resumeModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// function notifyMe() {
//   const name = document.getElementById("notifyName").value;
//   const email = document.getElementById("notifyEmail").value;
//   if (email && email.includes("@")) {
//     const supabase = loadWaitlist();
//     const res = addToWaitlist(supabase, name, email);
//     if (res.error) {
//       alert("Something went wrong. Please try again later.");
//       console.error(res.error);
//       return;
//     }
//     else {
//       alert(`Thanks! We'll notify ${name} at ${email} when the resume is ready! 🎉`);
//     }
//     closeModal();
//     document.getElementById("notifyEmail").value = "";
//   } else {
//     alert("Please enter a valid email address!");
//   }
// }

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && resumeModal.classList.contains("active")) {
    closeModal();
  }
});

// === SCROLL PROGRESS ===
const scrollProgress = document.querySelector(".scroll-progress");
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
});

// === OPTIMIZED NAVIGATION SCRIPT ===
const navItems = document.querySelectorAll(".nav-item");
const navIndicator = document.querySelector(".nav-indicator");
const sections = document.querySelectorAll("section[id]");
const themeToggle = document.getElementById("themeToggleBottom");
const themeIcon = document.getElementById("themeIcon");
const html = document.documentElement;

// Initialize theme
const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);
themeIcon.className =
  currentTheme === "dark" ? "ph ph-sun theme-icon" : "ph ph-moon theme-icon";

// Theme toggle
themeToggle.addEventListener("click", () => {
  const theme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeIcon.className =
    theme === "dark" ? "ph ph-sun theme-icon" : "ph ph-moon theme-icon";
});

// Update indicator position
function updateIndicator(element) {
  const rect = element.getBoundingClientRect();
  const parentRect = element.parentElement.getBoundingClientRect();
  navIndicator.style.width = `${rect.width}px`;
  navIndicator.style.left = `${rect.left - parentRect.left}px`;
}

// Initialize indicator
const activeItem = document.querySelector(".nav-item.active");
if (activeItem) updateIndicator(activeItem);

// Click handler
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    // Update active state
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    updateIndicator(item);

    // Smooth scroll
    const targetId = item.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Scroll handler with throttling
let ticking = false;
let lastKnownScrollPosition = 0;

function updateActiveSection(scrollPos) {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPos >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    const isActive = item.getAttribute("data-section") === current;
    if (isActive && !item.classList.contains("active")) {
      navItems.forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");
      updateIndicator(item);
    }
  });
}

window.addEventListener(
  "scroll",
  () => {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveSection(lastKnownScrollPosition);
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true }
);

// Resize handler with debouncing
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const activeItem = document.querySelector(".nav-item.active");
    if (activeItem) updateIndicator(activeItem);
  }, 150);
});

// === TYPING ANIMATION ===
const typingText = document.getElementById("typingText");
const phrases = [
  "Python Developer",
  "ML Enthusiast",
  "AI Product Engineer",
  "Problem Solver",
  "Data Analyst",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => (isDeleting = true), 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  const typingSpeed = isDeleting ? 50 : 100;
  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// === 3D MODEL INTERACTION ===

const modelViewer = document.querySelector(".model-3d");

if (modelViewer) {
  modelViewer.addEventListener("mouseenter", () => {
    modelViewer.autoRotate = false;
  });

  modelViewer.addEventListener("mouseleave", () => {
    modelViewer.autoRotate = true;
  });
}

// === ANIMATED STATS COUNTER ===
const statNumbers = document.querySelectorAll(".stat-number[data-target]");
let statsAnimated = false;

const animateStats = () => {
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const duration = 500;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target;
      }
    };
    updateCount();
  });
};

// === SCROLL ANIMATIONS ===
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      if (!statsAnimated && entry.target.classList.contains("stats-section")) {
        animateStats();
        statsAnimated = true;
      }
    }
  });
}, observerOptions);

document
  .querySelectorAll(".slide-in-left, .slide-in-right, .slide-in-up")
  .forEach((el) => {
    observer.observe(el);
  });

// === SKILL PROGRESS ANIMATION ===
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute("data-progress");
        setTimeout(() => {
          entry.target.style.width = progress + "%";
        }, 300);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// === PROJECT FILTERING ===
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card, index) => {
      const categories = card.getAttribute("data-category").split(" ");

      if (filter === "all" || categories.includes(filter)) {
        setTimeout(() => {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        }, index * 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// === EASTER EGG - SECTION EXPLORER ===
const easterEgg = document.getElementById("easterEgg");
const clickCount = document.getElementById("clickCount");
const easterSections = document.querySelectorAll("section[id]");
let exploredSections = new Set();
let easterEggTimeout;

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const sectionId = entry.target.id;
        if (!exploredSections.has(sectionId)) {
          exploredSections.add(sectionId);
          clickCount.textContent = exploredSections.size;

          easterEgg.classList.add("show");

          clearTimeout(easterEggTimeout);
          easterEggTimeout = setTimeout(() => {
            easterEgg.classList.remove("show");
          }, 3000);

          if (exploredSections.size === easterSections.length) {
            easterEgg.innerHTML =
              "🎉 You explored everything! You're awesome! 🚀";
            easterEgg.classList.add("show");
            setTimeout(() => {
              easterEgg.classList.remove("show");
            }, 5000);
          }
        }
      }
    });
  },
  { threshold: 0.5 }
);

easterSections.forEach((section) => sectionObserver.observe(section));

easterEgg.addEventListener("click", () => {
  easterEgg.style.animation = "none";
  setTimeout(() => {
    easterEgg.style.animation = "";
  }, 10);
});

// === CONTACT FORM ===
const contactForm = document.getElementById("contactForm");
const thankYouCard = document.getElementById("thank-you-card");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_z15np1h", "template_a72o7er", formData)
    .then((thankYouCard.style.display = "block"));
  // Show success message
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "✓ Message Sent!";
  submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";

  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.background = "";
  }, 3000);

  // Reset form
  contactForm.reset();

  console.log("Form submitted:", formData);
  // In production, integrate with Formspree, EmailJS, or your backend
});

// === INITIAL LOAD ANIMATIONS ===
window.addEventListener("load", () => {
  document
    .querySelectorAll(".slide-in-left, .slide-in-right, .slide-in-up")
    .forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        element.classList.add("visible");
      }
    });
});

// === 3D SPHERE INTERACTION ===
const techSphere = document.querySelector(".tech-sphere-container");
let isMouseOverSphere = false;

if (techSphere) {
  techSphere.addEventListener("mouseenter", () => {
    isMouseOverSphere = true;
  });

  techSphere.addEventListener("mouseleave", () => {
    isMouseOverSphere = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (isMouseOverSphere) {
      const rect = techSphere.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      techSphere.style.transform = `
                        rotateX(${deltaY * 20}deg) 
                        rotateY(${deltaX * 20}deg)
                    `;
    }
  });
}

// === TECH ICON TOOLTIPS ===
const techIcons = document.querySelectorAll(".tech-icon");
techIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const title = icon.getAttribute("title");
    const tooltip = document.createElement("div");
    tooltip.textContent = title;
    tooltip.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--glass-bg);
                    backdrop-filter: blur(20px);
                    padding: 1rem 2rem;
                    border-radius: 12px;
                    border: 2px solid var(--accent-primary);
                    font-weight: 700;
                    font-size: 1.2rem;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                `;

    document.body.appendChild(tooltip);

    setTimeout(() => {
      tooltip.style.opacity = "0";
      tooltip.style.transform = "translate(-50%, -50%) scale(0.8)";
      setTimeout(() => tooltip.remove(), 300);
    }, 1500);
  });
});

// === PERFORMANCE OPTIMIZATION ===
let performanceTicking = false;
window.addEventListener("scroll", () => {
  if (!performanceTicking) {
    window.requestAnimationFrame(() => {
      performanceTicking = false;
    });
    performanceTicking = true;
  }
});

// === LOG WELCOME MESSAGE ===
console.log(
  "%c👋 Welcome to my portfolio!",
  "font-size: 20px; font-weight: bold; color: #3b82f6;"
);
console.log(
  "%c🚀 Built with HTML, CSS, and Vanilla JavaScript",
  "font-size: 14px; color: #6c757d;"
);
console.log(
  "%c💼 Want to work together? Reach out!",
  "font-size: 14px; color: #8b5cf6;"
);
