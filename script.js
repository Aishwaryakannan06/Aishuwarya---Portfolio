const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeLabel = themeToggle.querySelector('.theme-label');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const petalLayer = document.getElementById('petalLayer');

function setTheme(theme) {
  const selected = theme === 'blue' ? 'blue' : 'pink';
  root.dataset.theme = selected;
  const pink = selected === 'pink';
  themeIcon.textContent = pink ? '🌸' : '❄';
  themeLabel.textContent = pink ? 'Pink' : 'Blue';
  themeToggle.setAttribute('aria-label', `Switch to Midnight ${pink ? 'Blue' : 'Pink'} Blossom theme`);
  themeToggle.title = `Switch to Midnight ${pink ? 'Blue' : 'Pink'} Blossom theme`;
  try { localStorage.setItem('aishwarya-portfolio-theme', selected); } catch (_) {}
}
let savedTheme = null;
try { savedTheme = localStorage.getItem('aishwarya-portfolio-theme'); } catch (_) {}
setTheme(savedTheme || 'pink');
themeToggle.addEventListener('click', () => setTheme(root.dataset.theme === 'pink' ? 'blue' : 'pink'));

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

// A gentle stream of petals; reduced-motion preferences are respected.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && petalLayer) {
  const symbols = ['✿', '❀', '✧', '✽'];
  function dropPetal() {
    const petal = document.createElement('span');
    petal.className = 'falling-petal';
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${9 + Math.random() * 9}s`;
    petal.style.fontSize = `${12 + Math.random() * 16}px`;
    petal.style.animationDelay = `${Math.random() * 1.5}s`;
    petalLayer.appendChild(petal);
    window.setTimeout(() => petal.remove(), 20000);
  }
  for (let i = 0; i < 10; i++) window.setTimeout(dropPetal, i * 450);
  window.setInterval(dropPetal, 850);
}
