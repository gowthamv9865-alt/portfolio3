const mobileNavToggle = document.getElementById("mobileNavToggle");
const sidebar = document.getElementById("sidebar");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("backToTop");
const typedText = document.getElementById("typedText");
const skillFills = document.querySelectorAll(".skill-fill");
const counters = document.querySelectorAll(".counter");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const typedWords = [
  "ECE Undergraduate",
  "Embedded Systems Learner",
  "IoT Enthusiast",
  "Aspiring Software Engineer",
  "Microcontroller Programmer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = typedWords[wordIndex];
  const currentText = currentWord.substring(0, charIndex);
  typedText.textContent = currentText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 110);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 60);
  } else {
    isDeleting = !isDeleting;

    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % typedWords.length;
    }

    setTimeout(typeEffect, isDeleting ? 1200 : 300);
  }
}

if (typedText) {
  typeEffect();
}

if (mobileNavToggle) {
  mobileNavToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    document.body.classList.toggle("sidebar-open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 1199) {
      sidebar.classList.remove("open");
      document.body.classList.remove("sidebar-open");
    }
  });
});

function setActiveNavLink() {
  let currentSectionId = "";

  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

let skillsAnimated = false;
function animateSkills() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const triggerPoint = skillsSection.getBoundingClientRect().top;

  if (triggerPoint < window.innerHeight - 100 && !skillsAnimated) {
    skillFills.forEach((fill) => {
      const width = fill.getAttribute("data-width");
      fill.style.width = `${width}%`;
    });
    skillsAnimated = true;
  }
}

let countersStarted = false;
function animateCounters() {
  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const triggerPoint = aboutSection.getBoundingClientRect().top;

  if (triggerPoint < window.innerHeight - 120 && !countersStarted) {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const increment = Math.max(1, Math.ceil(target / 60));

      const updateCounter = () => {
        count += increment;

        if (count >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = count;
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });

    countersStarted = true;
  }
}

window.addEventListener("scroll", () => {
  setActiveNavLink();
  toggleBackToTop();
  animateSkills();
  animateCounters();
});

window.addEventListener("load", () => {
  setActiveNavLink();
  toggleBackToTop();
  animateSkills();
  animateCounters();
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.style.color = "#d93025";
      return;
    }

    formStatus.textContent = "Your message has been prepared successfully. Connect the form to Formspree, EmailJS, or a backend to receive real messages.";
    formStatus.style.color = "#0d7db0";
    contactForm.reset();
  });
}

window.addEventListener("click", (event) => {
  if (
    window.innerWidth <= 1199 &&
    sidebar.classList.contains("open") &&
    !sidebar.contains(event.target) &&
    !mobileNavToggle.contains(event.target)
  ) {
    sidebar.classList.remove("open");
    document.body.classList.remove("sidebar-open");
  }
});
