// ── Starfield canvas ──────────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const COUNT = 180;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      da: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
    }));
  }

  function drawLines() {
    const DIST = 120;
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          const alpha = (1 - d / DIST) * 0.12;
          ctx.strokeStyle = `rgba(163,113,247,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,237,243,${s.a})`;
      ctx.fill();
    });
    drawLines();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  animate();
})();

// ── Scroll-reveal ─────────────────────────────────────────────────────────
(function () {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

// ── Animated counters ─────────────────────────────────────────────────────
(function () {
  function animateCounter(el, target) {
    let start = 0;
    const duration = 1400;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = Math.floor(progress * target) + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        animateCounter(el, parseInt(el.dataset.target, 10));
        io.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => io.observe(el));
})();

// ── Active nav link ───────────────────────────────────────────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => io.observe(s));
})();
