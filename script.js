// Seleziona il canvas e ottieni il contesto 2D
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Imposta le dimensioni del canvas pari a quelle della finestra
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Aggiorna le dimensioni in caso di ridimensionamento della finestra
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Classe Particle: ogni particella dell'esplosione
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2; // dimensione casuale fra 2 e 7
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.color = color;
    this.alpha = 1; // opacità iniziale
    this.decay = Math.random() * 0.01 + 0.005; // velocità con cui la particella svanisce
  }
  
  // Aggiorna la posizione e l'opacità
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= this.decay;
  }
  
  // Disegna la particella
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Array che contiene tutte le particelle attive
let particles = [];

// Crea un'esplosione di particelle in corrispondenza delle coordinate (x, y)
function createExplosion(x, y) {
  // Definiamo una palette di colori
  const colors = ['#ff4b1f', '#ff9068', '#ffc371', '#ffdd00', '#e8ff00'];
  const numParticles = 100; // numero di particelle per esplosione
  
  for (let i = 0; i < numParticles; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color));
  }
}

// Funzione di animazione: aggiorna e disegna le particelle
function animate() {
  // Crea un leggero effetto "trail" riempiendo il canvas con un rettangolo semitrasparente
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cicla sulle particelle in ordine inverso (per poterle rimuovere senza problemi)
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    
    // Rimuove la particella se è completamente trasparente
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      p.draw();
    }
  }
  
  requestAnimationFrame(animate);
}

// Gestisce il click sul canvas per creare l'effetto esplosione
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  createExplosion(x, y);
});

// Avvia l'animazione
animate();
