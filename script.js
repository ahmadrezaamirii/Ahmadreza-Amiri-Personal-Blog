(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  $('#year').textContent = new Date().getFullYear();

  const header = $('.site-header');
  const progress = $('#progressBar');
  const updateScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  const menuButton = $('.menu-toggle');
  const mobileMenu = $('.mobile-menu');
  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuButton.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });
  $$('a', mobileMenu).forEach((link) => link.addEventListener('click', () => menuButton.click()));

  const typewriter = $('#profileTypewriter');
  const profileMessages = [
    'I started coding at 16, driven by the desire to understand what happens beneath the surface.',
    'Today, I study Computer Engineering and build secure, practical software.',
    'I enjoy mapping networks, automating repeated tasks, and making systems more resilient.',
    'Curiosity is my favourite security tool: it turns every system into a question worth exploring.',
  ];

  const runProfileTypewriter = () => {
    if (!typewriter) return;
    if (reduceMotion) {
      typewriter.textContent = profileMessages.join(' ');
      return;
    }

    let messageIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    const tick = () => {
      const message = profileMessages[messageIndex];
      typewriter.textContent = message.slice(0, characterIndex);

      if (!isDeleting && characterIndex < message.length) {
        characterIndex += 1;
        window.setTimeout(tick, 19);
        return;
      }
      if (!isDeleting) {
        isDeleting = true;
        window.setTimeout(tick, 1900);
        return;
      }
      if (characterIndex > 0) {
        characterIndex -= 1;
        window.setTimeout(tick, 9);
        return;
      }

      isDeleting = false;
      messageIndex = (messageIndex + 1) % profileMessages.length;
      window.setTimeout(tick, 320);
    };
    tick();
  };
  runProfileTypewriter();

  if (!reduceMotion && window.gsap) {
    window.gsap.from('.hero-title .line > span', {
      yPercent: 115, duration: 1.15, stagger: 0.12, ease: 'power4.out', delay: 0.15,
    });
    window.gsap.from('.appear', {
      y: 18, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', delay: 0.75,
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        window.gsap.fromTo(entry.target, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        });
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach((element) => revealObserver.observe(element));
  }

  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (hasFinePointer && !reduceMotion && window.gsap) {
    const cursorDot = $('.cursor-dot');
    const cursorRing = $('.cursor-ring');
    let ringX = -100; let ringY = -100; let mouseX = -100; let mouseY = -100;

    const followCursor = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      window.requestAnimationFrame(followCursor);
    };
    followCursor();

    window.addEventListener('pointermove', (event) => {
      mouseX = event.clientX; mouseY = event.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      cursorDot.style.opacity = '1'; cursorRing.style.opacity = '1';
    });

    $$('a, button').forEach((element) => {
      element.addEventListener('pointerenter', () => cursorRing.classList.add('active'));
      element.addEventListener('pointerleave', () => cursorRing.classList.remove('active'));
    });
    $$('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const box = element.getBoundingClientRect();
        window.gsap.to(element, {
          x: (event.clientX - box.left - box.width / 2) * 0.18,
          y: (event.clientY - box.top - box.height / 2) * 0.18,
          duration: 0.3,
        });
      });
      element.addEventListener('pointerleave', () => window.gsap.to(element, {
        x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, .45)',
      }));
    });
    $$('[data-tilt]').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const box = element.getBoundingClientRect();
        window.gsap.to(element, {
          rotateY: ((event.clientX - box.left) / box.width - 0.5) * 7,
          rotateX: ((event.clientY - box.top) / box.height - 0.5) * -7,
          transformPerspective: 800, duration: 0.35,
        });
      });
      element.addEventListener('pointerleave', () => window.gsap.to(element, {
        rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, .5)',
      }));
    });
  }

  if (window.THREE && !reduceMotion) {
    const canvas = $('#webgl-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(780 * 3);
    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = (Math.random() - 0.5) * 14;
      positions[index + 1] = (Math.random() - 0.5) * 10;
      positions[index + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const field = new THREE.Points(geometry, new THREE.PointsMaterial({
      color: 0xa7eee1, size: 0.026, transparent: true, opacity: 0.86,
    }));
    scene.add(field);

    const brightGeometry = new THREE.BufferGeometry();
    const brightPositions = new Float32Array(70 * 3);
    for (let index = 0; index < brightPositions.length; index += 3) {
      brightPositions[index] = (Math.random() - 0.5) * 14;
      brightPositions[index + 1] = (Math.random() - 0.5) * 10;
      brightPositions[index + 2] = (Math.random() - 0.5) * 3;
    }
    brightGeometry.setAttribute('position', new THREE.BufferAttribute(brightPositions, 3));
    const brightField = new THREE.Points(brightGeometry, new THREE.PointsMaterial({
      color: 0xc7ff5e, size: 0.055, transparent: true, opacity: 0.95,
    }));
    scene.add(brightField);

    const resizeScene = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    resizeScene();
    window.addEventListener('resize', resizeScene);

    let targetX = 0; let targetY = 0;
    window.addEventListener('pointermove', (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.35;
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.25;
    });
    const renderScene = () => {
      field.rotation.y += 0.00035;
      field.rotation.x += (targetY - field.rotation.x) * 0.008;
      field.position.x += (targetX - field.position.x) * 0.006;
      brightField.rotation.y -= 0.00016;
      brightField.position.x += (targetX * 0.45 - brightField.position.x) * 0.004;
      renderer.render(scene, camera);
      window.requestAnimationFrame(renderScene);
    };
    renderScene();
  }
})();
