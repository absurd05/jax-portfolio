/* ============================================
   JAX · FUTURE PORTFOLIO
   未来科技风个人网站 — 交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================
     0. ENABLE CUSTOM CURSOR
     ======================================== */
  document.body.classList.add('cc-active');

  /* ========================================
     1. LOADING SCREEN
     ======================================== */
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPercent = document.getElementById('loaderPercent');
  let loadProgress = 0;

  const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 18 + 4;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 350);
    }
    loaderBar.style.width = loadProgress + '%';
    loaderPercent.textContent = Math.round(loadProgress) + '%';
  }, 180);

  /* ========================================
     2. PARTICLE BACKGROUND (Canvas)
     ======================================== */
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  let particles = [];
  const PARTICLE_COUNT = 90;
  const CONNECT_DIST = 140;
  const MOUSE_RADIUS = 160;

  let mouse = { x: -200, y: -200 };
  let animFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
  resizeCanvas();

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.2,
        baseRadius: Math.random() * 2 + 1.2,
      });
    }
  }
  initParticles();

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;

      // Mouse proximity glow
      const dxm = p.x - mouse.x;
      const dym = p.y - mouse.y;
      const distM = Math.sqrt(dxm * dxm + dym * dym);
      if (distM < MOUSE_RADIUS) {
        p.radius = p.baseRadius + (1 - distM / MOUSE_RADIUS) * 2.5;
      } else {
        p.radius += (p.baseRadius - p.radius) * 0.08;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 229, 255, 0.55)';
      if (distM < MOUSE_RADIUS) {
        const glow = 1 - distM / MOUSE_RADIUS;
        ctx.fillStyle = `rgba(0, 229, 255, ${0.55 + glow * 0.4})`;
      }
      ctx.fill();

      // Connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.15;

          // Brighter line if near mouse
          const midX = (p.x + p2.x) / 2;
          const midY = (p.y + p2.y) / 2;
          const dmMouse = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
          const extraAlpha = dmMouse < MOUSE_RADIUS ? (1 - dmMouse / MOUSE_RADIUS) * 0.25 : 0;

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha + extraAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* ========================================
     3. CUSTOM CURSOR
     ======================================== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let cursorX = -100, cursorY = -100;
  let ringX = -100, ringY = -100;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
  });

  function animateRing() {
    ringX += (cursorX - ringX) * 0.15;
    ringY += (cursorY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover targets for ring enlargement
  const hoverTargets = document.querySelectorAll(
    'a, button, .contact-card, .interest-card, .tilt, .copy-btn, .nav-toggle'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  /* ========================================
     4. TYPEWRITER EFFECT
     ======================================== */
  const typedText = document.getElementById('typedText');
  const phrases = [
    '计算机科学专业学生',
    '热爱编程与创造',
    'Jax · 凌拾四',
    '持续迭代中…',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeLoop() {
    const current = phrases[phraseIdx];

    if (!isDeleting) {
      typedText.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else {
        typeSpeed = 80 + Math.random() * 60;
      }
    } else {
      typedText.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 400;
      } else {
        typeSpeed = 35 + Math.random() * 20;
      }
    }

    setTimeout(typeLoop, typeSpeed);
  }
  setTimeout(typeLoop, 1200);

  /* ========================================
     5. SCROLL REVEAL (Intersection Observer)
     ======================================== */
  const revealEls = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ========================================
     6. 3D TILT EFFECT
     ======================================== */
  const tiltCards = document.querySelectorAll('.tilt');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  /* ========================================
     7. NAVBAR SCROLL BEHAVIOR
     ======================================== */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Hide on scroll down, show on scroll up
    if (currentScroll > 120 && currentScroll > lastScroll) {
      navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll) {
      navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;

    // Update active section
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveSection, 50);

    // Back to top visibility
    updateBackToTop();
  });

  /* ========================================
     8. ACTIVE SECTION DETECTION
     ======================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const sideDots = document.querySelectorAll('.side-dot');

  function updateActiveSection() {
    let current = 'home';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.45) {
        current = sec.getAttribute('id');
      }
    });

    // Nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Side dots
    sideDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-section') === current) {
        dot.classList.add('active');
      }
    });
  }

  /* ========================================
     9. MOBILE MENU TOGGLE
     ======================================== */
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  /* ========================================
     10. COPY TO CLIPBOARD
     ======================================== */
  const copyBtn = document.getElementById('copyWechat');
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    toast.textContent = msg || '已复制到剪贴板';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  }

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const text = copyBtn.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.classList.add('copied');
      copyBtn.textContent = '已复制 ✓';
      showToast('微信号已复制到剪贴板');
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.textContent = '复制';
      }, 1800);
    }).catch(() => {
      showToast('复制失败，请手动复制');
    });
  });

  /* ========================================
     10.5 MESSAGE FORM — Server酱 WeChat Push
     ======================================== */
  const SERVER_KEY = 'SCT380582TOENXFgDOpgWxmDwiidfJuqvN';
  const msgForm = document.getElementById('msgForm');
  const msgStatus = document.getElementById('msgStatus');
  const msgSubmit = document.getElementById('msgSubmit');

  msgForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('msgName').value.trim();
    const contact = document.getElementById('msgContact').value.trim();
    const content = document.getElementById('msgContent').value.trim();

    if (!name || !content) {
      msgStatus.textContent = '⚠ 请填写名字和留言内容';
      msgStatus.className = 'msg-status error';
      return;
    }

    // Disable form
    msgSubmit.disabled = true;
    msgSubmit.innerHTML = '<span>发送中…</span>';
    msgStatus.textContent = '📡 正在发送…';
    msgStatus.className = 'msg-status sending';

    const desp = [
      `### 👤 来自：${escapeMd(name)}`,
      contact ? `### 📞 联系方式：${escapeMd(contact)}` : '',
      `### 💬 留言内容：`,
      `> ${escapeMd(content)}`,
      '',
      `---`,
      `⏰ 时间：${new Date().toLocaleString('zh-CN')}`,
      `🌐 来源：jax.me.com`,
    ].filter(Boolean).join('\n\n');

    try {
      const resp = await fetch(`https://sctapi.ftqq.com/${SERVER_KEY}.send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `💬 新留言 from ${name}`,
          desp: desp,
        }),
      });

      const data = await resp.json();

      if (data.code === 0) {
        msgStatus.textContent = '✅ 留言已送达！若留下联系方式，我会主动联系你';
        msgStatus.className = 'msg-status success';
        msgForm.reset();
      } else {
        throw new Error(data.message || '发送失败');
      }
    } catch (err) {
      msgStatus.textContent = '❌ 网络波动，请稍后再试';
      msgStatus.className = 'msg-status error';
      console.error('MSG send error:', err);
    }

    // Re-enable form
    msgSubmit.disabled = false;
    msgSubmit.innerHTML = '<span>发送留言</span><i class="arrow">→</i>';
  });

  function escapeMd(text) {
    return text.replace(/[\\*_#~|`>{}()[\]+\-.!]/g, '\\$&');
  }

  /* ========================================
     11. COUNTER ANIMATION
     ======================================== */
  const counters = document.querySelectorAll('.count[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  function animateCounter(el) {
    const target = el.getAttribute('data-target');
    // Handle infinity
    if (target === '∞') {
      el.textContent = '∞';
      return;
    }

    const targetNum = parseInt(target, 10);
    const duration = 1400;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * targetNum);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  counters.forEach(c => counterObserver.observe(c));

  /* ========================================
     12. BACK TO TOP
     ======================================== */
  const toTop = document.getElementById('toTop');

  function updateBackToTop() {
    if (window.pageYOffset > 500) {
      toTop.classList.add('visible');
    } else {
      toTop.classList.remove('visible');
    }
  }

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ========================================
     13. FOOTER YEAR
     ======================================== */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ========================================
     14. SMOOTH SCROLL FOR SIDE DOTS
     ======================================== */
  sideDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(dot.getAttribute('data-section'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ========================================
     15. INITIAL ACTIVE SECTION CHECK
     ======================================== */
  updateActiveSection();

});
