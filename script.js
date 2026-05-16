const scheduler = document.querySelector("#scheduler");
const openSchedulerButtons = document.querySelectorAll(".open-scheduler");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");
const resultsDots = document.querySelectorAll("[data-results-dot]");

const testimonials = [
  {
    text: '"Atendimento extremamente cuidadoso. O resultado ficou delicado, exatamente como eu queria."',
    author: "Paciente A.",
  },
  {
    text: '"A consulta foi clara e acolhedora. Me senti segura em cada etapa do processo."',
    author: "Paciente B.",
  },
  {
    text: '"O plano respeitou meu rosto e minha rotina. Resultado natural e elegante."',
    author: "Paciente C.",
  },
];

let testimonialIndex = 0;

function openScheduler() {
  if (scheduler?.showModal) {
    scheduler.showModal();
    return;
  }

  document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
}

function closeMobileMenu() {
  mobileMenu?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function renderTestimonial() {
  const quote = document.querySelector("#testimonial-text");
  const author = document.querySelector("#testimonial-author");
  quote.textContent = testimonials[testimonialIndex].text;
  author.textContent = testimonials[testimonialIndex].author;
}

openSchedulerButtons.forEach((button) => {
  button.addEventListener("click", openScheduler);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu?.querySelectorAll("a, button").forEach((item) => {
  item.addEventListener("click", closeMobileMenu);
});

document.querySelectorAll("[data-carousel]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.carousel === "next" ? 1 : -1;
    testimonialIndex = (testimonialIndex + direction + testimonials.length) % testimonials.length;
    renderTestimonial();
  });
});

resultsDots.forEach((dot) => {
  dot.setAttribute("aria-pressed", String(dot.classList.contains("is-active")));
  dot.addEventListener("click", () => {
    resultsDots.forEach((item) => {
      item.classList.toggle("is-active", item === dot);
      item.setAttribute("aria-pressed", String(item === dot));
    });
  });
});

document.querySelector('.dialog-actions a[href="#contato"]')?.addEventListener("click", () => {
  scheduler?.close();
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get("nome");
  const phone = data.get("telefone");
  const procedure = data.get("procedimento");
  const message = `Olá, sou ${name}. Meu telefone é ${phone}. Gostaria de agendar uma avaliação para ${procedure}.`;
  const whatsappUrl = `https://wa.me/5500000000000?text=${encodeURIComponent(message)}`;

  formStatus.textContent = "Solicitação pronta. Abrindo o WhatsApp para finalizar o contato.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  contactForm.reset();
});
