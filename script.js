/**
 * MVC SHOWCASE - JAVASCRIPT
 */

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
  initCodeBlocks();
  initNavigation();
  console.log('MVC Showcase initialized');
});

// Toggle code block
function tog(header) {
  header.parentElement.classList.toggle('collapsed');
}
window.tog = tog;

// Toggle all blocks
function toggleAll(expand) {
  document.querySelectorAll('.code-block').forEach(function(block) {
    if (expand) {
      block.classList.remove('collapsed');
    } else {
      block.classList.add('collapsed');
    }
  });
}
window.toggleAll = toggleAll;

// Initialize code blocks - LINE CLICK FOR EXPLANATION
function initCodeBlocks() {
  document.querySelectorAll('.code-table tr').forEach(function(row) {
    row.style.cursor = 'pointer';
    
    row.addEventListener('click', function() {
      var table = this.closest('.code-table');
      table.querySelectorAll('tr').forEach(function(r) {
        r.classList.remove('active');
      });
      
      this.classList.add('active');
      
      var explanation = this.getAttribute('data-exp') || 'Pas d explication disponible';
      var lineNumElement = this.querySelector('.line-num');
      var lineNum = lineNumElement ? lineNumElement.textContent : '?';
      
      var codeBody = this.closest('.code-body');
      if (codeBody) {
        var panel = codeBody.querySelector('.exp-panel');
        if (panel) {
          panel.innerHTML = '<h4><i class=\"lucide-book-open\"></i> Explication</h4><span class=\"line-badge\">Ligne ' + lineNum + '</span><p>' + explanation + '</p>';
        }
      }
    });
  });
}

// Navigation
function initNavigation() {
  document.querySelectorAll('.nav-section a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      
      if (target) {
        target.classList.remove('collapsed');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        document.querySelectorAll('.nav-section a').forEach(function(a) {
          a.classList.remove('active');
        });
        this.classList.add('active');
        
        if (window.innerWidth <= 768) {
          toggleMobileMenu();
        }
      }
    });
  });
}

// Mobile menu
function toggleMobileMenu() {
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.querySelector('.sidebar-overlay');
  var btn = document.querySelector('.mobile-menu-btn');
  
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
  if (btn) btn.classList.toggle('active');
}
window.toggleMobileMenu = toggleMobileMenu;
