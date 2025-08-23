// Scroll animation utility
export const initScrollAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  // Observe all elements with the animate-on-scroll class
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  return observer;
};