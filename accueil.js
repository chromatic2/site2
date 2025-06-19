// accueil.js

document.addEventListener('DOMContentLoaded', () => {
  // Animation du header
  const header = document.querySelector('header');
  setTimeout(() => {
    header.style.opacity = '1';
    header.style.transition = 'opacity 1s ease-out';
  }, 500);

  // Effet de clignotement sur le logo
  const logo = document.querySelector('.logo-image');
  logo.addEventListener('mouseover', () => {
    logo.style.animation = 'logo-animation 0.5s infinite alternate';
  });
  logo.addEventListener('mouseout', () => {
    logo.style.animation = 'none';
  });

  // Lance la rotation des témoignages
  rotateTestimonials();
});

// Fonction de rotation avec fondu et contrôle manuel
function rotateTestimonials() {
  const testimonials = document.querySelectorAll('#temoignages blockquote');
  let currentIndex = 0;
  let interval;

  if (testimonials.length === 0) return;

  const showTestimonial = (index) => {
    testimonials.forEach((el) => {
      el.classList.remove('active');
      el.style.opacity = '0';
    });
    testimonials[index].classList.add('active');
    setTimeout(() => {
      testimonials[index].style.opacity = '1';
    }, 50);
  };

  const nextTestimonial = () => {
    testimonials[currentIndex].style.opacity = '0';
    testimonials[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  };

  const prevTestimonial = () => {
    testimonials[currentIndex].style.opacity = '0';
    testimonials[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  };

  // Boutons précédent/suivant
  const controls = document.createElement('div');
  controls.id = 'temoignages-controls';
  controls.innerHTML = `
    <button id="prev-temoignage">Précédent</button>
    <button id="next-temoignage">Suivant</button>
  `;
  document.querySelector('#temoignages').appendChild(controls);

  document.getElementById('next-temoignage').addEventListener('click', () => {
    clearInterval(interval);
    nextTestimonial();
    startAutoRotation();
  });
  document.getElementById('prev-temoignage').addEventListener('click', () => {
    clearInterval(interval);
    prevTestimonial();
    startAutoRotation();
  });

  const startAutoRotation = () => {
    interval = setInterval(nextTestimonial, 15000);
  };

  // Démarrage
  showTestimonial(currentIndex);
  startAutoRotation();
}
