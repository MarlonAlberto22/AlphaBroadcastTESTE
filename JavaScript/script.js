document.addEventListener('DOMContentLoaded', () => {
  // Menu Mobile (mantido igual)
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
      menuToggle.innerHTML = navbar.classList.contains('active') ? '&#10005;' : '&#9776;';
    });
  }

  // Configuração do Carrossel Infinito
  const setupInfiniteCarousel = () => {
    const carousel = document.querySelector('.logos-empresas');
    if (!carousel) return;

    const logos = carousel.querySelectorAll('img');
    if (logos.length === 0) return;

    // Duplica os itens para criar o efeito infinito
    const cloneLogos = () => {
      const logosArray = Array.from(logos);
      logosArray.forEach(logo => {
        const clone = logo.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        carousel.appendChild(clone);
      });
    };

    // Configura animação apenas para desktop
    if (window.innerWidth > 630) {
      cloneLogos();
      
      // Calcula a largura total de uma "volta" do carrossel
      const singleLoopWidth = Array.from(logos).reduce((total, logo) => {
        return total + logo.offsetWidth + 60; // 60px é o gap
      }, 0);

      let currentPosition = 0;
      const animationSpeed = 1; // pixels por frame (ajuste conforme necessário)

      const animate = () => {
        currentPosition += animationSpeed;
        
        // Quando chegar ao final da primeira sequência, reseta suavemente
        if (currentPosition >= singleLoopWidth) {
          currentPosition = 0;
          carousel.style.transition = 'none';
          carousel.style.transform = `translateX(0)`;
          // Força um reflow antes de continuar a animação
          void carousel.offsetWidth;
        }

        // Aplica a transformação com transição suave (exceto no reset)
        if (currentPosition > 0 && currentPosition < singleLoopWidth - 1) {
          carousel.style.transition = 'transform 0.1s linear';
        }
        
        carousel.style.transform = `translateX(-${currentPosition}px)`;
        requestAnimationFrame(animate);
      };

      // Inicia a animação
      animate();

      // Pausa animação no hover para melhor usabilidade
      carousel.addEventListener('mouseenter', () => {
        animationSpeed = 0;
      });

      carousel.addEventListener('mouseleave', () => {
        animationSpeed = 1;
      });
    } else {
      // Configuração para mobile (scroll horizontal)
      carousel.style.overflowX = 'auto';
      carousel.style.scrollSnapType = 'x mandatory';
      carousel.style.webkitOverflowScrolling = 'touch';
    }
  };

  // Inicializa o carrossel
  setupInfiniteCarousel();

  // Reconfigura ao redimensionar
  window.addEventListener('resize', () => {
    const carousel = document.querySelector('.logos-empresas');
    if (carousel) {
      // Remove clones antes de recriar
      const clones = carousel.querySelectorAll('[aria-hidden="true"]');
      clones.forEach(clone => clone.remove());
    }
    setupInfiniteCarousel();
  });

  // Função para abrir o chat (mantida)
  window.abrirChat = function () {
    const url =
      'https://broadmedia.tomticket.com/chat/balao/EP42696/2732544P27032020021858' +
      '?ts=' +
      new Date().getTime() +
      '&ref=' +
      encodeURIComponent(document.URL);
    window.open(url, '_blank', 'width=400,height=600,resizable=yes');
  };
});