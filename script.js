/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  MVC SHOWCASE - PROFESSIONAL JAVASCRIPT                     ║
 * ║  Version: 2.0 Pro                                            ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ═══════════════ CONFIGURATION ═══════════════
const CONFIG = {
  animationDuration: 300,
  scrollOffset: 100,
  particleCount: 30,
  typewriterSpeed: 50,
};

// ═══════════════ DOM READY ═══════════════
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  initCodeBlocks();
  initNavigation();
  initScrollSpy();
  initParticles();
  initButtonRipples();
  initAnimations();
  initKeyboardShortcuts();
  console.log('✨ MVC Showcase initialized');
}

// ═══════════════ CODE BLOCKS ═══════════════
function initCodeBlocks() {
  // Toggle functionality
  document.querySelectorAll('.code-header').forEach(header => {
    header.addEventListener('click', () => toggleCodeBlock(header));
  });

  // Line click for explanations
  document.querySelectorAll('.code-table tr').forEach(row => {
    row.addEventListener('click', () => showExplanation(row));
  });
}

function toggleCodeBlock(header) {
  const block = header.parentElement;
  block.classList.toggle('collapsed');

  // Animate icon
  const toggle = header.querySelector('.toggle');
  if (toggle) {
    toggle.style.transform = block.classList.contains('collapsed')
      ? 'rotate(-90deg)'
      : 'rotate(0deg)';
  }
}

function toggleAll(expand) {
  const blocks = document.querySelectorAll('.code-block');
  blocks.forEach((block, index) => {
    setTimeout(() => {
      if (expand) {
        block.classList.remove('collapsed');
      } else {
        block.classList.add('collapsed');
      }
    }, index * 50); // Staggered animation
  });

  showToast(expand ? 'Tous les blocs deployes' : 'Tous les blocs replies');
}

// Expose to global scope
window.toggleAll = toggleAll;

function showExplanation(row) {
  // Remove active from all rows in the same table
  const table = row.closest('.code-table');
  table.querySelectorAll('tr').forEach(r => r.classList.remove('active'));

  // Add active to clicked row
  row.classList.add('active');

  // Get explanation data
  const explanation = row.dataset.exp || 'Pas d\'explication disponible pour cette ligne.';
  const lineNum = row.querySelector('.line-num')?.textContent || '?';

  // Find and update panel
  const panel = row.closest('.code-body')?.querySelector('.exp-panel');
  if (panel) {
    // Animate out
    panel.style.opacity = '0';
    panel.style.transform = 'translateX(10px)';

    setTimeout(() => {
      panel.innerHTML = `
        <h4>📖 Explication</h4>
        <span class="line-badge">Ligne ${lineNum}</span>
        <p>${explanation}</p>
      `;

      // Animate in
      panel.style.transition = 'all 0.3s ease';
      panel.style.opacity = '1';
      panel.style.transform = 'translateX(0)';
    }, 150);
  }
}

// ═══════════════ NAVIGATION ═══════════════
function initNavigation() {
  document.querySelectorAll('.nav-section a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigateToSection(link);
    });
  });
}

function navigateToSection(link) {
  const targetId = link.getAttribute('href');
  const target = document.querySelector(targetId);

  if (!target) return;

  // Expand if collapsed
  target.classList.remove('collapsed');

  // Smooth scroll with offset
  const y = target.getBoundingClientRect().top + window.pageYOffset - CONFIG.scrollOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });

  // Highlight effect
  target.style.boxShadow = '0 0 50px rgba(99, 102, 241, 0.5)';
  target.style.borderColor = 'rgba(99, 102, 241, 0.5)';

  setTimeout(() => {
    target.style.boxShadow = '';
    target.style.borderColor = '';
  }, 2000);

  // Update active state
  document.querySelectorAll('.nav-section a').forEach(a => a.classList.remove('active'));
  link.classList.add('active');
}

// ═══════════════ SCROLL SPY ═══════════════
function initScrollSpy() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollSpy();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function updateScrollSpy() {
  const blocks = document.querySelectorAll('.code-block');
  let current = '';

  blocks.forEach(block => {
    const rect = block.getBoundingClientRect();
    if (rect.top <= CONFIG.scrollOffset + 50) {
      current = block.id;
    }
  });

  document.querySelectorAll('.nav-section a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ═══════════════ PARTICLES ═══════════════
function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Create particle container
  const container = document.createElement('div');
  container.className = 'particles-container';
  container.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  `;
  hero.appendChild(container);

  // Create particles
  for (let i = 0; i < CONFIG.particleCount; i++) {
    createParticle(container, i);
  }
}

function createParticle(container, index) {
  const particle = document.createElement('div');
  const size = Math.random() * 6 + 2;
  const delay = Math.random() * 5;
  const duration = Math.random() * 10 + 10;
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;

  const colors = [
    'rgba(99, 102, 241, 0.6)',
    'rgba(34, 211, 238, 0.5)',
    'rgba(244, 114, 182, 0.4)',
    'rgba(16, 185, 129, 0.5)',
  ];

  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: ${colors[index % colors.length]};
    border-radius: 50%;
    left: ${startX}%;
    top: ${startY}%;
    animation: particleFloat ${duration}s ease-in-out infinite;
    animation-delay: ${delay}s;
    filter: blur(1px);
  `;

  container.appendChild(particle);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes particleFloat {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.5;
    }
    25% {
      transform: translate(20px, -30px) scale(1.2);
      opacity: 0.8;
    }
    50% {
      transform: translate(-10px, -60px) scale(0.8);
      opacity: 0.6;
    }
    75% {
      transform: translate(30px, -30px) scale(1.1);
      opacity: 0.7;
    }
  }
`;
document.head.appendChild(particleStyle);

// ═══════════════ BUTTON RIPPLES ═══════════════
function initButtonRipples() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => createRipple(e, btn));
  });
}

function createRipple(e, btn) {
  const ripple = document.createElement('span');
  ripple.className = 'btn-ripple';

  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
  `;

  btn.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// ═══════════════ ANIMATIONS ═══════════════
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe code blocks
  document.querySelectorAll('.code-block').forEach((block, index) => {
    block.style.opacity = '0';
    block.style.animationDelay = `${index * 0.1}s`;
    observer.observe(block);
  });
}

// Add fadeInUp animation
const animStyle = document.createElement('style');
animStyle.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(animStyle);

// ═══════════════ KEYBOARD SHORTCUTS ═══════════════
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Ctrl/Cmd + P = Print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      // Let browser handle
    }

    // E = Expand all
    if (e.key === 'e' && !e.ctrlKey && !e.metaKey && !isTyping()) {
      toggleAll(true);
    }

    // C = Collapse all
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !isTyping()) {
      toggleAll(false);
    }

    // Escape = Remove active highlights
    if (e.key === 'Escape') {
      document.querySelectorAll('.code-table tr.active').forEach(row => {
        row.classList.remove('active');
      });
    }
  });
}

function isTyping() {
  const active = document.activeElement;
  return active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
}

// ═══════════════ TOAST NOTIFICATIONS ═══════════════
function showToast(message, duration = 2000) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  // Create new toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 10px 40px rgba(99, 102, 241, 0.4);
    z-index: 9999;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Animate out
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ═══════════════ PERFORMANCE MONITOR ═══════════════
if (process?.env?.NODE_ENV === 'development') {
  const start = performance.now();
  window.addEventListener('load', () => {
    const loadTime = performance.now() - start;
    console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
  });
}

// ═══════════════ HELPER: Toggle function for inline onclick ═══════════════
window.tog = function (header) {
  toggleCodeBlock(header);
};

// ═══════════════ EXPORT FOR MODULES ═══════════════
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { toggleAll, showToast };
}

// Mobile menu toggle
function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const btn = document.querySelector('.mobile-menu-btn');
  
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
  btn.classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMobileMenu();
    }
  });
});

// Expose
window.toggleMobileMenu = toggleMobileMenu;

// Fullscreen code view for mobile
function openFullscreenCode(codeBlock) {
  if (window.innerWidth > 768) return;
  
  const title = codeBlock.querySelector('.code-header h3').textContent.trim();
  const codeTable = codeBlock.querySelector('.code-table').cloneNode(true);
  
  // Create fullscreen modal
  let modal = document.getElementById('fullscreen-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'fullscreen-modal';
    modal.className = 'fullscreen-code';
    modal.innerHTML = +
      <div class="fullscreen-header">
        <h3></h3>
        <button class="fullscreen-close" onclick="closeFullscreen()"></button>
      </div>
      <div class="fullscreen-body"></div>
      <div class="fullscreen-exp">
        <h4>Explication</h4>
        <p>Cliquez sur une ligne pour voir son explication.</p>
      </div>
    ;
    document.body.appendChild(modal);
  }
  
  modal.querySelector('.fullscreen-header h3').textContent = title;
  modal.querySelector('.fullscreen-body').innerHTML = '';
  modal.querySelector('.fullscreen-body').appendChild(codeTable);
  
  // Add click handlers to cloned table
  codeTable.querySelectorAll('tr').forEach(row => {
    row.addEventListener('click', () => {
      codeTable.querySelectorAll('tr').forEach(r => r.classList.remove('active'));
      row.classList.add('active');
      const exp = row.dataset.exp || 'Pas d explication';
      const lineNum = row.querySelector('.line-num')?.textContent || '?';
      modal.querySelector('.fullscreen-exp').innerHTML = +
        <h4>Ligne +lineNum+</h4>
        <p>+exp+</p>
      ;
    });
  });
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
  const modal = document.getElementById('fullscreen-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Add expand buttons to code headers on mobile
if (window.innerWidth <= 768) {
  document.querySelectorAll('.code-header').forEach(header => {
    if (!header.querySelector('.expand-btn')) {
      const btn = document.createElement('button');
      btn.className = 'expand-btn';
      btn.textContent = 'Plein ��cran';
      btn.onclick = (e) => {
        e.stopPropagation();
        openFullscreenCode(header.parentElement);
      };
      header.insertBefore(btn, header.querySelector('.toggle'));
    }
  });
}

window.openFullscreenCode = openFullscreenCode;
window.closeFullscreen = closeFullscreen;
