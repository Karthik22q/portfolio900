/* ============================
   GOWTHAM PORTFOLIO — SCRIPT
   ============================ */

// ===== CUSTOM CURSOR =====
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (dot && ring) {
  let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx+'px'; dot.style.top = my+'px';
  });
  document.addEventListener('mousedown', () => ring.classList.add('clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));
  const hoverEls = 'a, button, .gc, .skill-category-card, .project-card, .stat-gc, .about-stat, .contact-link, .resume-close, .social-icon';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
  (function animRing(){
    rx += (mx-rx)*.11; ry += (my-ry)*.11;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(animRing);
  })();
}

// ===== SCROLL PROGRESS =====
const prog = document.querySelector('.progress-bar');
if (prog) window.addEventListener('scroll', () => {
  const h = document.body.scrollHeight - window.innerHeight;
  prog.style.width = (window.scrollY / h * 100) + '%';
}, { passive:true });

// ===== NAV SCROLL =====
const nav = document.querySelector('nav');
if (nav) window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive:true });

// ===== HAMBURGER =====
const ham = document.querySelector('.hamburger');
const ul  = document.querySelector('nav ul');
if (ham && ul) ham.addEventListener('click', () => ul.classList.toggle('open'));

// ===== INTERSECTION OBSERVER =====
const revObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('v');
    // Animate skill bars
    if (en.target.classList.contains('skill-category-card')) {
      setTimeout(() => {
        en.target.querySelectorAll('.skill-fill').forEach(f => { f.style.width = f.dataset.w; });
        setTimeout(() => en.target.classList.add('animated'), 1200);
      }, 200);
    }
    revObs.unobserve(en.target);
  });
}, { threshold:0.12, rootMargin:'0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-scale, .skill-category-card, .project-card, .stat-gc, .gc, .about-stat').forEach(el => {
  revObs.observe(el);
});

// ===== SKILL BARS: save target width =====
document.querySelectorAll('.skill-fill').forEach(f => {
  f.dataset.w = f.style.width || '0%';
  f.style.width = '0%';
});

// ===== TYPING EFFECT =====
const typEl = document.querySelector('.hero-role-typing');
if (typEl) {
  const lines = ['Full Stack Web Developer', 'MERN Stack Developer', 'Java Full Stack Developer', 'UI/UX Designer', 'Frontend Enthusiast'];
  let li=0, ci=0, del=false;
  const cursor = '<span class="cursor-blink" style="display:inline-block;width:2px;height:1em;background:var(--violet);margin-left:2px;vertical-align:text-bottom;animation:blink 1s step-end infinite;"></span>';
  function tick() {
    const cur = lines[li];
    if (!del) {
      ci++;
      typEl.innerHTML = cur.slice(0,ci) + cursor;
      if (ci===cur.length) { del=true; setTimeout(tick,2200); return; }
      setTimeout(tick, 55);
    } else {
      ci--;
      typEl.innerHTML = cur.slice(0,ci) + cursor;
      if (ci===0) { del=false; li=(li+1)%lines.length; setTimeout(tick,400); return; }
      setTimeout(tick, 28);
    }
  }
  setTimeout(tick, 900);
}

// ===== COUNTER ANIMATION =====
function animCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(interval);
  }, 25);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.querySelectorAll('[data-target]').forEach(animCounter);
    counterObs.unobserve(en.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-strip').forEach(el => counterObs.observe(el));

// ===== 3D TILT ON PROJECT CARDS =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    card.style.transform = `translateY(-10px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform .6s cubic-bezier(.25,.8,.25,1)';
    card.style.transform = '';
    setTimeout(() => card.style.transition = '', 600);
  });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2)  * .28;
    const y = (e.clientY - r.top  - r.height/2) * .28;
    btn.style.transform = `translateY(-3px) scale(1.04) translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

// ===== RESUME POPUP =====
const overlay   = document.getElementById('resumeOverlay');
const openBtns  = document.querySelectorAll('.open-resume');
const closeBtn  = document.getElementById('resumeClose');
const downloadBtn = document.getElementById('resumeDownload');

if (overlay) {
  openBtns.forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }));

  function closeResume() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  overlay.addEventListener('click', e => { if (e.target===overlay) closeResume(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeResume(); });

  if (downloadBtn) downloadBtn.addEventListener('click', () => {
    // Generate a simple resume text for download
    const content = generateResumeTxt();
    const blob = new Blob([content], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Gowtham_Resume.txt';
    a.click();
    downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    downloadBtn.style.background = 'linear-gradient(135deg,#10b981,#06b6d4)';
    setTimeout(() => {
      downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
      downloadBtn.style.background = '';
    }, 2500);
  });
}

function generateResumeTxt() {
  return `GOWTHAM
Full Stack Developer | MERN Stack | Java Full Stack

CONTACT
Email : gowtham@email.com
GitHub: github.com/gowtham
LinkedIn: linkedin.com/in/gowtham
Phone : +91 XXXXX XXXXX

OBJECTIVE
Motivated and passionate fresher with strong hands-on skills in Full Stack Web Development,
MERN Stack, and Java Full Stack technologies. Eager to contribute to innovative projects and grow
as a professional developer.

EDUCATION
B.Tech – Computer Science & Engineering | 2021 – 2025
CGPA: 8.5 / 10

SKILLS
Frontend : HTML5, CSS3, JavaScript (ES6+), React.js, TypeScript, Tailwind CSS
Backend  : Node.js, Express.js, Java, Spring Boot, REST APIs, GraphQL
Database : MongoDB, MySQL, PostgreSQL
Tools    : Git, GitHub, Figma, VS Code, Postman, Docker (basics)
Concepts : MERN Stack, MEAN Stack, UI/UX Design, Responsive Web Design

PROJECTS
1. Full Stack E-Commerce Platform
   - React.js frontend with Redux state management
   - Node.js + Express.js REST API backend
   - MongoDB database, JWT authentication
   - Payment gateway integration

2. Task Management App (MERN)
   - Real-time collaboration with Socket.io
   - Role-based access control
   - Responsive mobile-first design

3. Java Spring Boot Blog Platform
   - Spring Boot REST APIs, MySQL database
   - React.js + Tailwind CSS frontend
   - User authentication with Spring Security

4. Portfolio Website
   - Custom animated UI with glassmorphism
   - CSS animations and transitions
   - Fully responsive design

CERTIFICATIONS
- Full Stack Web Development – Udemy
- Java DSA – GeeksForGeeks
- UI/UX Design Fundamentals – Coursera

LANGUAGES: English (Professional), Telugu (Native), Hindi (Basic)
`;
}

// ===== CONTACT FORM =====
const form = document.querySelector('#contactForm');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const sb = form.querySelector('[type="submit"]');
  sb.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  sb.style.background = 'linear-gradient(135deg,#10b981,#06b6d4)';
  setTimeout(() => {
    sb.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    sb.style.background = '';
    form.reset();
  }, 3000);
});

// ===== PAGE LOAD ANIMATION =====
document.body.style.opacity = '0';
document.body.style.transform = 'translateY(16px)';
document.body.style.transition = 'opacity .7s ease, transform .7s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.transform = '';
});

// ===== PARTICLE SPARKLES ON HERO =====
function spawnParticle() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const p = document.createElement('div');
  p.style.cssText = `
    position:absolute;
    width:${2+Math.random()*3}px; height:${2+Math.random()*3}px;
    border-radius:50%;
    background:hsl(${260+Math.random()*80},90%,70%);
    top:${Math.random()*100}%; left:${Math.random()*100}%;
    pointer-events:none; z-index:0; opacity:.8;
    animation: sparkle ${1.5+Math.random()*2}s ease forwards;
  `;
  hero.appendChild(p);
  setTimeout(() => p.remove(), 3500);
}

// Inject sparkle keyframes
const ks = document.createElement('style');
ks.textContent = '@keyframes sparkle{0%{opacity:.8;transform:scale(1) translateY(0)}100%{opacity:0;transform:scale(0) translateY(-40px)}} @keyframes blink{50%{opacity:0}}';
document.head.appendChild(ks);

setInterval(spawnParticle, 600);
