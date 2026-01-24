// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileNav.classList.remove('active');
  });
});

// ===== Menu Data =====
const bucketPlans = [
  {
    id: 'small',
    name: 'Family Bucket',
    servings: '4-6',
    chickenPrice: 1499,
    muttonPrice: 1999,
    includes: ['Biriyani', 'Raita', 'Salan', 'Boiled Eggs'],
    notice: 'Order 6+ hours ahead',
    popular: false
  },
  {
    id: 'medium',
    name: 'Party Bucket',
    servings: '8-10',
    chickenPrice: 2499,
    muttonPrice: 3499,
    includes: ['Biriyani', 'Raita', 'Salan', 'Boiled Eggs', 'Mirchi Ka Salan'],
    notice: 'Order 6+ hours ahead',
    popular: true
  },
  {
    id: 'large',
    name: 'Grand Feast',
    servings: '12-15',
    chickenPrice: 3499,
    muttonPrice: 4999,
    includes: ['Biriyani', 'Raita', 'Salan', 'Boiled Eggs', 'Mirchi Ka Salan', 'Sweet Dessert'],
    notice: 'Order 1 day ahead',
    popular: false
  }
];

// ===== Render Menu Cards =====
function renderMenuCards(type) {
  const menuGrid = document.getElementById('menu-grid');
  const isChicken = type === 'chicken';
  
  menuGrid.innerHTML = bucketPlans.map(plan => `
    <div class="menu-card ${plan.popular ? 'popular' : ''}">
      ${plan.popular ? '<span class="popular-badge">Most Popular</span>' : ''}
      <div class="menu-card-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
          <line x1="6" y1="17" x2="18" y2="17"/>
        </svg>
      </div>
      <div class="menu-card-servings">
        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span>${plan.servings} Members</span>
      </div>
      <h3 class="menu-card-name">${plan.name}</h3>
      <div class="menu-card-price">
        <span>Starting at </span>
        <strong>₹${isChicken ? plan.chickenPrice : plan.muttonPrice}</strong>
      </div>
      <div class="menu-card-includes">
        <p>Includes ${isChicken ? 'Chicken' : 'Mutton'} Biriyani:</p>
        <span>${plan.includes.join(', ')}</span>
      </div>
      <div class="menu-card-notice">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
        ${plan.notice}
      </div>
      <a href="#enquiry" class="btn btn-primary btn-block">Pre-Order</a>
    </div>
  `).join('');
}

// Initial render
renderMenuCards('chicken');

// ===== Tab Switching =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenuCards(btn.dataset.type);
  });
});

// ===== Form Submission =====
const enquiryForm = document.getElementById('enquiry-form');
const toast = document.getElementById('toast');

enquiryForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const originalContent = submitBtn.innerHTML;
  
  submitBtn.innerHTML = `
    <div style="width: 1.25rem; height: 1.25rem; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
    Submitting...
  `;
  submitBtn.disabled = true;
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Show toast
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
  
  // Reset form
  enquiryForm.reset();
  submitBtn.innerHTML = originalContent;
  submitBtn.disabled = false;
});

// Add spin animation
const style = document.createElement('style');
style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(style);

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
