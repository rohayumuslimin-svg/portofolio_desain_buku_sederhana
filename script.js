// Data Detail Karya Portofolio
const portfolioData = {
  puisi: {
    title: "Sampul Buku Antologi Puisi",
    subtitle: "Jejak Kata di Balik Senja",
    badge: "Kategori: Sastra & Puisi",
    colorClass: "accent-purple",
    description: "Buku puisi membutuhkan hembusan ruang kosong (white space) yang cukup agar pembaca merasakan ketenangan batin sebelum membaca tiap baitnya.",
    specs: [
      "Format Ukuran: 13 x 19 cm (Saku Sastra)",
      "Tipografi Judul: Times New Roman, 700 dengan kerning lega",
      "Kertas Rekomendasi: Bookpaper 72 gsm krem lembut",
      "Finishing Sampul: Doff halus (Matte) dengan ornamen garis elegan",
      "Waktu Pengerjaan Rata-rata: 3 - 5 hari kerja"
    ]
  },
  novel: {
    title: "Tata Letak & Sampul Novel Remaja",
    subtitle: "Langkah Kecil, Cita-Cita Besar",
    badge: "Kategori: Fiksi Remaja (YA)",
    colorClass: "accent-coral",
    description: "Dirancang khusus agar pembaca remaja tidak lelah membaca cerita panjang. Pemilihan margin dalam (gutter) yang pas menjamin tulisan tidak tenggelam di lipatan buku saat dijilid lem panas.",
    specs: [
      "Format Ukuran: 14 x 20 cm",
      "Ukuran Huruf Isi: 10.5 pt dengan leading 15 pt yang lapang",
      "Margin: Atas 20mm, Bawah 20mm, Dalam 22mm, Luar 18mm",
      "Dekorasi: Nomor halaman unik dan pemisah bab bernuansa ceria",
      "Waktu Pengerjaan Rata-rata: 5 - 7 hari kerja"
    ]
  },
  panduan: {
    title: "Desain Buku Panduan Sederhana",
    subtitle: "Panduan Menulis & Menerbitkan Mandiri",
    badge: "Kategori: Non-Fiksi Praktis",
    colorClass: "accent-green",
    description: "Membantu pembaca memproses instruksi teknis secara efisien dengan bantuan kotak sorotan (callout box), hierarki sub-judul yang kontras, serta tata letak dua warna yang ekonomis saat dicetak.",
    specs: [
      "Format Ukuran: A5 (14.8 x 21 cm)",
      "Kelengkapan: Daftar isi otomatis, glosarium, & lembar aksi",
      "Format Berkas: PDF/X-1a siap cetak & versi PDF digital klik-able",
      "Tata Letak: Modul 2 kolom untuk perbandingan cepat",
      "Waktu Pengerjaan Rata-rata: 4 - 6 hari kerja"
    ]
  }
};

// Navigasi Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-active');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Tutup menu jika tautan diklik
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Modal Detail Portofolio
function openDetailModal(type) {
  const data = portfolioData[type];
  if (!data) return;

  const modalContent = document.getElementById('modalDynamicContent');
  const specsHtml = data.specs.map(s => `<li style="margin-bottom: 8px; font-size: 14.5px;">✓ ${s}</li>`).join('');

  modalContent.innerHTML = `
    <span class="pill-tag ${data.colorClass}" style="margin-bottom: 12px;">${data.badge}</span>
    <h2 id="modalTitle" style="font-size: 24px; margin-bottom: 4px;">${data.title}</h2>
    <p style="font-size: 15px; font-style: italic; color: var(--color-primary); margin-bottom: 16px;">
      "${data.subtitle}"
    </p>
    <p style="font-size: 15px; line-height: 1.6; color: var(--color-text-muted); margin-bottom: 20px;">
      ${data.description}
    </p>
    <div style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 20px; padding: 20px; margin-bottom: 24px;">
      <h4 style="font-size: 16px; margin-bottom: 12px;">Spesifikasi Teknis Desain:</h4>
      <ul style="list-style: none; padding: 0; margin: 0; color: var(--color-text);">
        ${specsHtml}
      </ul>
    </div>
    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <button class="btn-pill btn-pill-outline" onclick="closeDetailModal()">Tutup</button>
      <a href="#kontak" class="btn-pill btn-pill-primary" onclick="closeDetailModal()">Pesan Desain Serupa</a>
    </div>
  `;

  document.getElementById('detailModal').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.classList.remove('is-open');
  }
  document.body.style.overflow = '';
}

function handleBackdropClick(event) {
  if (event.target.id === 'detailModal') {
    closeDetailModal();
  }
}

// Tangani Pengiriman Formulir dengan Umpan Balik Ramah
function handleFormSubmit(e) {
  e.preventDefault();
  const alertBox = document.getElementById('formSuccessAlert');
  const form = document.getElementById('konsultasiForm');

  if (alertBox) {
    alertBox.style.display = 'block';
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 6000);
  }
  if (form) {
    form.reset();
  }
}

// Penanda Tautan Navigasi Aktif Saat Menggulir
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');
    const correspondingLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

    if (correspondingLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        correspondingLink.classList.add('active');
      }
    }
  });
});

// Pengalih Mode Navy (Terang / Gelap Midnight)
function toggleNavyTheme() {
  const isDark = document.body.classList.toggle('theme-navy-dark');
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.textContent = isDark ? '⚓ Mode Navy: Gelap' : '⚓ Mode Navy: Terang';
  }
  try {
    localStorage.setItem('rohayu_navy_theme', isDark ? 'dark' : 'light');
  } catch (err) { }
}

// Periksa preferensi tema yang tersimpan
try {
  if (localStorage.getItem('rohayu_navy_theme') === 'dark') {
    document.body.classList.add('theme-navy-dark');
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.textContent = '⚓ Mode Navy: Gelap';
  }
} catch (err) { }


/* ==========================================================================
   DEKORASI BUNGA: SISTEM PARTIKEL KELOPAK BUNGA MELAYANG (DRIFTING PETALS)
   ========================================================================== */
class FlowerPetalEngine {
  constructor() {
    this.canvas = document.getElementById('flowerPetalsCanvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'flowerPetalsCanvas';
      this.canvas.className = 'flower-petals-canvas';
      document.body.prepend(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.isActive = true;
    this.animFrameId = null;
    this.width = 0;
    this.height = 0;

    // Palet warna kelopak bunga (Melati krem lembut, Sakura pink, dan Rose blush)
    this.palette = [
      { r: 255, g: 183, b: 197, a: 0.72 }, // Sakura Pink
      { r: 255, g: 210, b: 221, a: 0.68 }, // Pastel Pink
      { r: 254, g: 242, b: 244, a: 0.75 }, // Jasmine Soft Cream
      { r: 244, g: 143, b: 177, a: 0.65 }, // Rose Tint
      { r: 252, g: 228, b: 236, a: 0.70 }  // Soft Magnolia
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Cek preferensi user
    try {
      const saved = localStorage.getItem('rohayu_flower_petals');
      if (saved === 'off') {
        this.isActive = false;
        this.canvas.style.display = 'none';
        this.updateToggleButton(false);
      } else {
        this.updateToggleButton(true);
      }
    } catch (e) {
      this.updateToggleButton(true);
    }

    // Bangun kelopak awal
    const count = window.innerWidth < 768 ? 20 : 36;
    for (let i = 0; i < count; i++) {
      this.petals.push(this.createPetal(true));
    }

    // Pause jika tab tidak aktif untuk menghemat daya baterai & GPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      } else if (this.isActive) {
        this.loop();
      }
    });

    if (this.isActive) {
      this.loop();
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
  }

  createPetal(isInitial = false) {
    const color = this.palette[Math.floor(Math.random() * this.palette.length)];
    return {
      x: Math.random() * this.width,
      y: isInitial ? Math.random() * this.height : -30 - Math.random() * 50,
      size: 7 + Math.random() * 8, // 7px - 15px
      color: color,
      speedY: 0.85 + Math.random() * 1.35,
      speedX: 0.3 + Math.random() * 0.6,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.02,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.03,
      swayAmp: 1 + Math.random() * 1.5
    };
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.rotation);
    // 3D flip effect
    this.ctx.scale(1, Math.cos(p.flip));

    // Desain bentuk kelopak bunga dengan lekukan kurva anggun
    this.ctx.beginPath();
    this.ctx.moveTo(0, -p.size);
    this.ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.7, p.size * 0.9, p.size * 0.5, 0, p.size);
    this.ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.7, 0, -p.size);
    this.ctx.closePath();

    // Gradien lembut dari pangkal ke ujung kelopak
    const grad = this.ctx.createLinearGradient(0, -p.size, 0, p.size);
    grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.a})`);
    grad.addColorStop(1, `rgba(${Math.min(255, p.color.r + 20)}, ${Math.min(255, p.color.g + 20)}, ${Math.min(255, p.color.b + 20)}, ${p.color.a * 0.4})`);
    this.ctx.fillStyle = grad;
    this.ctx.fill();

    // Garis serat tengah kelopak bunga yang halus
    this.ctx.beginPath();
    this.ctx.moveTo(0, -p.size * 0.8);
    this.ctx.lineTo(0, p.size * 0.7);
    this.ctx.strokeStyle = `rgba(${Math.max(0, p.color.r - 30)}, ${Math.max(0, p.color.g - 30)}, ${Math.max(0, p.color.b - 30)}, 0.25)`;
    this.ctx.lineWidth = 0.75;
    this.ctx.stroke();

    this.ctx.restore();
  }

  update() {
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];
      p.y += p.speedY;
      p.angle += p.angleSpeed;
      p.x += Math.sin(p.angle) * p.swayAmp + p.speedX;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      // Jika sudah melewati batas layar bawah atau kanan, buat ulang dari atas
      if (p.y > this.height + 30 || p.x > this.width + 40 || p.x < -40) {
        this.petals[i] = this.createPetal(false);
      }
    }
  }

  loop() {
    if (!this.isActive) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.update();
    for (let i = 0; i < this.petals.length; i++) {
      this.drawPetal(this.petals[i]);
    }
    this.animFrameId = requestAnimationFrame(() => this.loop());
  }

  toggle() {
    this.isActive = !this.isActive;
    try {
      localStorage.setItem('rohayu_flower_petals', this.isActive ? 'on' : 'off');
    } catch (e) { }

    if (this.isActive) {
      this.canvas.style.display = 'block';
      this.loop();
    } else {
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.canvas.style.display = 'none';
    }
    this.updateToggleButton(this.isActive);
  }

  updateToggleButton(active) {
    const btn = document.getElementById('flowerToggleBtn');
    if (btn) {
      btn.innerHTML = active
        ? '🌸 <span class="btn-flower-label">Bunga: Aktif</span>'
        : '🥀 <span class="btn-flower-label">Bunga: Jeda</span>';
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.title = active ? 'Klik untuk menjeda efek bunga' : 'Klik untuk menyalakan efek bunga';
    }
  }
}

// Inisialisasi engine bunga secara global
let flowerEngineInstance = null;
document.addEventListener('DOMContentLoaded', () => {
  flowerEngineInstance = new FlowerPetalEngine();
});

// Fungsi global untuk dipanggil tombol UI
function toggleFlowerAnimation() {
  if (flowerEngineInstance) {
    flowerEngineInstance.toggle();
  }
}
