/**
 * app.js — RAIHAN Coding Academy, AI Division
 * Gallery, navigation, form validation, confirm dialog, results.
 */

// ====================================================
// 1. AI GALLERY DATA
// ====================================================
const GALLERY = [
  {
    id: 1, category: 'ml',
    label: 'Machine Learning Lab',
    title: 'Hands-on: Supervised Learning dengan Scikit-learn',
    date: 'Mar 2026', participants: '28 peserta',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    desc: 'Sesi lab intensif membangun pipeline machine learning end-to-end: preprocessing data, feature engineering, pelatihan model regresi dan klasifikasi, evaluasi metrik, serta penyimpanan model ke format produksi.',
    mentor: 'Arif Wibowo — ML Engineer, Tokopedia',
    highlights: ['Scikit-learn Pipeline', 'Feature Engineering', 'Cross-validation', 'Model Export'],
  },
  {
    id: 2, category: 'nlp',
    label: 'NLP & LLM Workshop',
    title: 'Fine-tuning LLM untuk Teks Bahasa Indonesia',
    date: 'Feb 2026', participants: '22 peserta',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80',
    desc: 'Workshop praktik fine-tuning model bahasa besar (LLM) berbasis IndoBERT dan GPT-family untuk tugas NLP bahasa Indonesia: sentiment analysis, named entity recognition, dan question-answering.',
    mentor: 'Nadya Sari — NLP Research Scientist',
    highlights: ['HuggingFace Transformers', 'LoRA Fine-tuning', 'IndoBERT', 'Inference API'],
  },
  {
    id: 3, category: 'vision',
    label: 'Computer Vision',
    title: 'Deteksi Objek Real-time dengan YOLO & OpenCV',
    date: 'Jan 2026', participants: '24 peserta',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    desc: 'Lab membangun sistem deteksi objek real-time menggunakan YOLOv8 dan OpenCV. Peserta melatih model custom pada dataset sendiri, mengoptimalkan inferensi, dan mendeploy ke webcam serta edge device.',
    mentor: 'Bagas Pratama — Computer Vision Engineer',
    highlights: ['YOLOv8 Custom Training', 'OpenCV Pipeline', 'GPU Inference', 'Edge Deployment'],
  },
  {
    id: 4, category: 'ml',
    label: 'Machine Learning Lab',
    title: 'Deep Learning: CNN dari Scratch dengan PyTorch',
    date: 'Apr 2026', participants: '26 peserta',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    desc: 'Membangun Convolutional Neural Network dari nol menggunakan PyTorch: arsitektur layer, fungsi loss, optimasi gradient descent, augmentasi data, transfer learning dengan ResNet dan EfficientNet.',
    mentor: 'Dila Rahmawati — Deep Learning Researcher',
    highlights: ['PyTorch Autograd', 'CNN Architectures', 'Transfer Learning', 'Training Tricks'],
  },
  {
    id: 5, category: 'nlp',
    label: 'NLP & LLM Workshop',
    title: 'RAG System: Membangun AI dengan Knowledge Base Sendiri',
    date: 'Mei 2026', participants: '20 peserta',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    desc: 'Workshop Retrieval-Augmented Generation (RAG): membangun sistem AI yang dapat menjawab pertanyaan berdasarkan dokumen internal menggunakan LangChain, Chroma vector database, dan model embedding lokal.',
    mentor: 'Reza Firmansyah — AI Platform Lead',
    highlights: ['LangChain RAG', 'Vector Database', 'Embedding Models', 'Prompt Engineering'],
  },
  {
    id: 6, category: 'project',
    label: 'AI Project Showcase',
    title: 'Demo Day — Presentasi Proyek AI Siswa Angkatan 5',
    date: 'Jun 2026', participants: '56 peserta',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    desc: 'Presentasi proyek AI akhir program di hadapan panel mentor dan tamu dari industri. Proyek mencakup sistem rekomendasi, chatbot berbasis LLM, pipeline deteksi anomali, dan alat prediksi kesehatan berbasis data tabular.',
    mentor: 'Panel: Mentor + Tamu Industri AI',
    highlights: ['Final Project Demo', 'Industry Feedback', 'AI Portfolio', 'Sertifikat Kompetensi'],
  },
];

// ====================================================
// 2. VIEW NAVIGATION
// ====================================================
function switchView(name) {
  const vGallery  = document.getElementById('view-gallery');
  const vRegister = document.getElementById('view-register');
  const tGallery  = document.getElementById('tab-gallery');
  const tRegister = document.getElementById('tab-register');

  const showPanel = (el) => {
    el.classList.remove('hidden');
    el.classList.add('active');
    requestAnimationFrame(() => el.classList.add('animate-in'));
  };

  const hidePanel = (el) => {
    el.classList.remove('active', 'animate-in');
    el.classList.add('hidden');
  };

  if (name === 'gallery') {
    showPanel(vGallery);
    hidePanel(vRegister);
    tGallery.classList.add('active');
    tRegister.classList.remove('active');
  } else {
    showPanel(vRegister);
    hidePanel(vGallery);
    tRegister.classList.add('active');
    tGallery.classList.remove('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====================================================
// 3. GALLERY RENDER & FILTER
// ====================================================
function renderGallery(filter = 'all') {
  const container = document.getElementById('gallery-container');
  const items = filter === 'all' ? GALLERY : GALLERY.filter(g => g.category === filter);

  container.innerHTML = items.map(item => `
    <article class="gallery-card" onclick="openGalleryModal(${item.id})" role="button" tabindex="0">
      <div class="card-img-wrap">
        <img class="card-img" src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="card-chip">${item.label}</div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <div class="card-meta">
            <div class="meta-item">
              <i data-lucide="calendar" style="width:12px;height:12px;"></i>
              ${item.date}
            </div>
            <div class="meta-item">
              <i data-lucide="users" style="width:12px;height:12px;"></i>
              ${item.participants}
            </div>
          </div>
          <span class="card-arrow">
            Lihat detail
            <i data-lucide="arrow-right" style="width:12px;height:12px;"></i>
          </span>
        </div>
      </div>
    </article>
  `).join('');

  lucide.createIcons();
}

function filterGallery(cat) {
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === cat);
  });
  renderGallery(cat);
}

// ====================================================
// 4. GALLERY DETAIL MODAL
// ====================================================
function openGalleryModal(id) {
  const item = GALLERY.find(g => g.id === id);
  if (!item) return;

  document.getElementById('gallery-modal-body').innerHTML = `
    <img class="gallery-modal-img" src="${item.image}" alt="${item.title}" loading="lazy">
    <div class="gallery-modal-body">
      <span class="gallery-modal-chip">${item.label}</span>
      <h2 class="gallery-modal-title">${item.title}</h2>
      <div class="gallery-modal-meta">
        <div class="meta-item">
          <i data-lucide="calendar" style="width:13px;height:13px;"></i>
          ${item.date}
        </div>
        <div class="meta-item">
          <i data-lucide="users" style="width:13px;height:13px;"></i>
          ${item.participants}
        </div>
        <div class="meta-item">
          <i data-lucide="user-check" style="width:13px;height:13px;"></i>
          ${item.mentor}
        </div>
      </div>
      <p class="gallery-modal-desc">${item.desc}</p>
      <div class="gallery-modal-tags">
        ${item.highlights.map(h => `<span class="tag-item">${h}</span>`).join('')}
      </div>
    </div>
    <div class="gallery-modal-footer">
      <button onclick="closeModal('galleryModal')" class="btn btn-secondary" style="font-size:13px;padding:9px 16px;">
        Tutup
      </button>
      <button onclick="closeModal('galleryModal'); switchView('register');" class="btn btn-primary" style="font-size:13px;padding:9px 18px;">
        Daftar Program
        <i data-lucide="arrow-right" style="width:14px;height:14px;"></i>
      </button>
    </div>
  `;

  openModal('galleryModal');
}

// ====================================================
// 5. MODAL ENGINE
// ====================================================
function openModal(id) {
  const el = document.getElementById(id);
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  lucide.createIcons();
}

function closeModal(id) {
  const el = document.getElementById(id);
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// ====================================================
// 6. FORM INPUT HANDLERS
// ====================================================
function handleNikInput(input) {
  input.value = input.value.replace(/\D/g, '');
  const n = input.value.length;
  const counter = document.getElementById('nik-counter');
  counter.textContent = `${n} / 16`;
  counter.style.color = n === 16 ? '#15803D' : '';
  input.classList.remove('has-error');
  if (n > 0) document.getElementById('error-nik').classList.remove('show');
}

function handlePhoneInput(input) {
  input.value = input.value.replace(/\D/g, '');
  if (input.value.length > 0) document.getElementById('error-nohp').classList.remove('show');
  input.classList.remove('has-error');
}

function handleAlamatInput(textarea) {
  const n = textarea.value.length;
  document.getElementById('alamat-counter').textContent = `${n} / 250`;
  if (n > 0) document.getElementById('error-alamat').classList.remove('show');
  textarea.classList.remove('has-error');
}

function clearFieldError(id) {
  document.getElementById(id)?.classList.remove('show');
}

function getSelectedLanguages() {
  return [...document.querySelectorAll('input[name="languages"]:checked')].map(cb => cb.value);
}

// ====================================================
// 7. FORM SUBMIT & VALIDATION
// ====================================================
let _pendingData = null;

function handleRegistrationSubmit(e) {
  e.preventDefault();

  const nik    = document.getElementById('nik').value.trim();
  const nama   = document.getElementById('nama').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const nohp   = document.getElementById('no_hp').value.trim();
  const alamat = document.getElementById('alamat').value.trim();
  const langs  = getSelectedLanguages();

  let ok = true;

  const setError = (errId, inputId) => {
    document.getElementById(errId).classList.add('show');
    if (inputId) document.getElementById(inputId)?.classList.add('has-error');
    ok = false;
  };

  if (nik.length !== 16) setError('error-nik', 'nik');
  if (!nama)            setError('error-nama', 'nama');
  if (!gender)          setError('error-gender', null);
  if (nohp.length < 9)  setError('error-nohp', 'no_hp');
  if (!alamat)          setError('error-alamat', 'alamat');
  if (!langs.length)    setError('error-lang', null);

  if (!ok) {
    const firstErr = document.querySelector('.field-error.show, .has-error');
    firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  _pendingData = {
    nik, nama,
    gender: gender.value,
    nohp: `+62 ${nohp}`,
    alamat, langs,
    regId: `REG-AI-2026-${Math.floor(100000 + Math.random() * 900000)}`,
  };

  // Show confirm: "Apakah Anda sudah yakin untuk menyimpan?"
  openModal('confirmModal');
}

// ====================================================
// 8. CONFIRM & SAVE
// ====================================================
function executeConfirmSave() {
  closeModal('confirmModal');
  if (!_pendingData) return;

  const d = _pendingData;

  document.getElementById('result-reg-id').textContent  = d.regId;
  document.getElementById('result-nik').textContent     = d.nik;
  document.getElementById('result-nama').textContent    = d.nama;
  document.getElementById('result-gender').textContent  = d.gender;
  document.getElementById('result-nohp').textContent    = d.nohp;
  document.getElementById('result-alamat').textContent  = d.alamat;

  document.getElementById('result-languages').innerHTML =
    d.langs.map(l => `<span class="lang-tag">${l}</span>`).join('');

  setTimeout(() => openModal('resultModal'), 120);
}

// ====================================================
// 9. RESET FORM
// ====================================================
function resetFormState() {
  document.getElementById('formPendaftaran').reset();

  document.getElementById('nik-counter').textContent    = '0 / 16';
  document.getElementById('nik-counter').style.color   = '';
  document.getElementById('alamat-counter').textContent = '0 / 250';

  document.querySelectorAll('.field-error').forEach(el => el.classList.remove('show'));
  document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));

  _pendingData = null;
}

// ====================================================
// 10. INIT
// ====================================================
document.addEventListener('DOMContentLoaded', () => {
  renderGallery('all');
  lucide.createIcons();
});
