
import {
  getQuestionBank,
  saveQuestionBank,
  createQuestion,
  type EduQuestion,
  type Difficulty
} from './edu';

export interface StudentProfile {
  name: string;
  className: string;
  subject: string;
}

const CLASSES = [
  'Kelas 1', 'Kelas 2', 'Kelas 3',
  'Kelas 4', 'Kelas 5', 'Kelas 6'
];

const SUBJECTS = [
  'Matematika',
  'Bahasa Indonesia',
  'Pendidikan Pancasila',
  'IPAS',
  'Seni Budaya',
  'PJOK',
  'Umum'
];

const CHARACTERS = [
  { id: 'runner-1', name: 'Runner Biru', emoji: '🏃' },
  { id: 'runner-2', name: 'Runner Merah', emoji: '🦸' },
  { id: 'runner-3', name: 'Runner Hijau', emoji: '🥷' },
  { id: 'runner-4', name: 'Runner Emas', emoji: '🏆' }
];

function escapeHTML(value: string): string {
  return value.replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char] || char);
}

function closePortal(): void {
  document.getElementById('subway-portal')?.remove();
}

function showPortal(title: string, content: string): HTMLElement {
  closePortal();

  const overlay = document.createElement('div');
  overlay.id = 'subway-portal';
  overlay.className = 'portal-backdrop';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:10000;
    display:flex;align-items:center;justify-content:center;
    padding:16px;background:rgba(5,15,35,.88);
    overflow:auto;touch-action:pan-y;
  `;

  overlay.innerHTML = `
    <div class="portal-card" style="
      width:min(100%,620px);max-height:92vh;overflow:auto;
      background:#fff;color:#17243b;border-radius:22px;
      padding:22px;box-shadow:0 20px 70px #0008;
    ">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
        <h2 style="margin:0;font-size:22px">${escapeHTML(title)}</h2>
        <button type="button" id="portal-close"
          style="border:0;border-radius:12px;padding:10px 14px;cursor:pointer">
          ✕
        </button>
      </div>
      <div id="portal-content" style="margin-top:18px">${content}</div>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.querySelector('#portal-close')?.addEventListener('click', closePortal);

  return overlay;
}

function fieldStyle(): string {
  return `
    width:100%;box-sizing:border-box;padding:13px;
    border:1px solid #d5deea;border-radius:12px;
    font-size:15px;background:#fff;color:#17243b;
  `;
}

function buttonStyle(color = '#1769e0'): string {
  return `
    border:0;border-radius:12px;padding:13px 17px;
    background:${color};color:#fff;font-weight:700;
    cursor:pointer;font-size:14px;
  `;
}

// FORM IDENTITAS SISWA
export function openStudentForm(
  onStart: (profile: StudentProfile) => void
): void {
  const overlay = showPortal('🎓 Identitas Pemain', `
    <form id="student-form" class="portal-form">
      <label>Nama lengkap siswa</label>
      <input id="student-name" required maxlength="60"
        placeholder="Masukkan nama siswa" style="${fieldStyle()}" />

      <label style="display:block;margin-top:14px">Kelas</label>
      <select id="student-class" required style="${fieldStyle()}">
        <option value="">Pilih kelas</option>
        ${CLASSES.map(c => `<option>${c}</option>`).join('')}
      </select>

      <label style="display:block;margin-top:14px">Mata pelajaran</label>
      <select id="student-subject" required style="${fieldStyle()}">
        <option value="">Pilih mata pelajaran</option>
        ${SUBJECTS.map(s => `<option>${s}</option>`).join('')}
      </select>

      <button type="submit" style="${buttonStyle()}width:100%;margin-top:22px">
        🚀 MULAI BERMAIN
      </button>
    </form>
  `);

  const form = overlay.querySelector<HTMLFormElement>('#student-form')!;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const name = (overlay.querySelector<HTMLInputElement>('#student-name')!.value).trim();
    const className = overlay.querySelector<HTMLSelectElement>('#student-class')!.value;
    const subject = overlay.querySelector<HTMLSelectElement>('#student-subject')!.value;

    if (!name || !className || !subject) {
      alert('Lengkapi nama, kelas, dan mata pelajaran.');
      return;
    }

    const profile: StudentProfile = { name, className, subject };

    try {
      localStorage.setItem('subway.student', JSON.stringify(profile));
    } catch {
      alert('Data identitas tidak dapat disimpan di perangkat ini.');
    }

    closePortal();
    onStart(name);
  });
}

// PILIH KARAKTER
export function openCharacterPicker(): void {
  const selected = localStorage.getItem('subway.character') || 'runner-1';

  const overlay = showPortal('👤 Pilih Karakter', `
    <p style="color:#52627a">Pilih karakter favorit sebelum bermain.</p>
    <div class="character-grid" style="
      display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px
    ">
      ${CHARACTERS.map(c => `
        <button type="button" data-character="${c.id}"
          class="character-choice"
          style="
            padding:22px 10px;border:2px solid ${c.id === selected ? '#1769e0' : '#dce4ef'};
            border-radius:16px;background:${c.id === selected ? '#eaf2ff' : '#fff'};
            color:#17243b;cursor:pointer;font-size:16px
          ">
          <div style="font-size:42px">${c.emoji}</div>
          <strong>${c.name}</strong>
          <div style="font-size:12px;margin-top:6px">
            ${c.id === selected ? '✓ Dipilih' : 'Pilih karakter'}
          </div>
        </button>
      `).join('')}
    </div>
    <p style="font-size:12px;color:#78869a;margin-top:16px">
      Pilihan tersimpan di perangkat. Penggantian model 3D karakter
      akan disambungkan pada tahap integrasi aset permainan.
    </p>
  `);

  overlay.querySelectorAll<HTMLButtonElement>('[data-character]').forEach(button => {
    button.addEventListener('click', () => {
      localStorage.setItem('subway.character', button.dataset.character || 'runner-1');
      openCharacterPicker();
    });
  });
}

// PANEL ADMIN
export function openAdminPanel(): void {
  let bank = getQuestionBank();

  const overlay = showPortal('🛡️ Panel Admin — Bank Soal', `
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button id="add-question" style="${buttonStyle()}">＋ Tambah Soal</button>
      <button id="export-questions" style="${buttonStyle('#16834a')}">⬇ Ekspor JSON</button>
      <button id="import-questions" style="${buttonStyle('#8054c7')}">⬆ Impor JSON</button>
      <input id="question-file" type="file" accept=".json,application/json" hidden />
    </div>

    <div style="margin-top:18px">
      <input id="question-search" placeholder="Cari soal atau mata pelajaran..."
        style="${fieldStyle()}" />
    </div>

    <div style="display:flex;gap:8px;margin-top:10px">
      <select id="filter-class" style="${fieldStyle()}">
        <option value="">Semua kelas</option>
        ${CLASSES.map(c => `<option>${c}</option>`).join('')}
        <option>Semua Kelas</option>
      </select>
      <select id="filter-subject" style="${fieldStyle()}">
        <option value="">Semua mapel</option>
        ${SUBJECTS.map(s => `<option>${s}</option>`).join('')}
        <option>Semua Mapel</option>
      </select>
    </div>

    <p id="bank-count" style="font-weight:700;margin:16px 0 8px"></p>
    <div id="bank-list" class="bank-list"></div>
  `);

  const list = overlay.querySelector<HTMLDivElement>('#bank-list')!;
  const count = overlay.querySelector<HTMLParagraphElement>('#bank-count')!;
  const search = overlay.querySelector<HTMLInputElement>('#question-search')!;
  const classFilter = overlay.querySelector<HTMLSelectElement>('#filter-class')!;
  const subjectFilter = overlay.querySelector<HTMLSelectElement>('#filter-subject')!;

  function render(): void {
    const term = search.value.toLowerCase();

    const filtered = bank.filter(q => {
      const matchesText =
        q.prompt.toLowerCase().includes(term) ||
        q.subject.toLowerCase().includes(term);

      const matchesClass =
        !classFilter.value ||
        q.className === classFilter.value;

      const matchesSubject =
        !subjectFilter.value ||
        q.subject === subjectFilter.value;

      return matchesText && matchesClass && matchesSubject;
    });

    count.textContent = `${filtered.length} soal ditampilkan dari ${bank.length} soal`;

    list.innerHTML = filtered.map(q => `
      <div class="bank-item" style="
        padding:13px;margin-bottom:10px;border:1px solid #dce4ef;
        border-radius:12px;background:#f8faff
      ">
        <strong>${escapeHTML(q.prompt)}</strong>
        <p style="font-size:12px;color:#64748b">
          ${escapeHTML(q.className)} · ${escapeHTML(q.subject)} · ${q.difficulty}
        </p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button data-edit="${escapeHTML(q.id)}"
            style="${buttonStyle('#1769e0')}">Edit</button>
          <button data-delete="${escapeHTML(q.id)}"
            style="${buttonStyle('#c63d48')}">Hapus</button>
        </div>
      </div>
    `).join('') || '<p>Belum ada soal yang cocok dengan filter.</p>';

    list.querySelectorAll<HTMLButtonElement>('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => editQuestion(btn.dataset.edit!));
    });

    list.querySelectorAll<HTMLButtonElement>('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => deleteQuestion(btn.dataset.delete!));
    });
  }

  function persist(): void {
    if (!saveQuestionBank(bank)) {
      alert('Gagal menyimpan bank soal. Periksa ruang penyimpanan browser.');
      return;
    }
    render();
  }

  function editQuestion(id?: string): void {
    const old = id ? bank.find(q => q.id === id) : undefined;

    const content = `
      <form id="edit-question-form">
        <label>Kelas</label>
        <select id="q-class" style="${fieldStyle()}">
          ${['Semua Kelas', ...CLASSES].map(c =>
            `<option ${old?.className === c ? 'selected' : ''}>${c}</option>`
          ).join('')}
        </select>

        <label style="display:block;margin-top:12px">Mata pelajaran</label>
        <select id="q-subject" style="${fieldStyle()}">
          ${['Semua Mapel', ...SUBJECTS].map(s =>
            `<option ${old?.subject === s ? 'selected' : ''}>${s}</option>`
          ).join('')}
        </select>

        <label style="display:block;margin-top:12px">Tingkat kesulitan</label>
        <select id="q-difficulty" style="${fieldStyle()}">
          ${(['Mudah', 'Sedang', 'Sulit'] as Difficulty[]).map(d =>
            `<option ${old?.difficulty === d ? 'selected' : ''}>${d}</option>`
          ).join('')}
        </select>

        <label style="display:block;margin-top:12px">Pertanyaan</label>
        <textarea id="q-prompt" required style="${fieldStyle()}">${escapeHTML(old?.prompt || '')}</textarea>

        <label style="display:block;margin-top:12px">Pilihan jawaban (satu pilihan per baris)</label>
        <textarea id="q-options" required style="${fieldStyle()}" rows="4">${escapeHTML(old?.options.join('\n') || '')}</textarea>

        <label style="display:block;margin-top:12px">Nomor jawaban benar</label>
        <select id="q-answer" style="${fieldStyle()}">
          ${[0, 1, 2, 3].map(n =>
            `<option value="${n}" ${old?.answer === n ? 'selected' : ''}>${n + 1}</option>`
          ).join('')}
        </select>

        <label style="display:block;margin-top:12px">Pembahasan</label>
        <textarea id="q-explanation" style="${fieldStyle()}">${escapeHTML(old?.explanation || '')}</textarea>

        <button type="submit" style="${buttonStyle()}width:100%;margin-top:18px">
          Simpan Soal
        </button>
      </form>
    `;

    const editor = showPortal(old ? '✏️ Edit Soal' : '＋ Tambah Soal', content);
    const form = editor.querySelector<HTMLFormElement>('#edit-question-form')!;

    form.addEventListener('submit', event => {
      event.preventDefault();

      const options = (editor.querySelector<HTMLTextAreaElement>('#q-options')!.value)
        .split('\n').map(v => v.trim()).filter(Boolean);

      const answer = Number(editor.querySelector<HTMLSelectElement>('#q-answer')!.value);
      const prompt = editor.querySelector<HTMLTextAreaElement>('#q-prompt')!.value.trim();

      if (!prompt || options.length < 2 || answer >= options.length) {
        alert('Isi pertanyaan, minimal dua pilihan, dan nomor jawaban yang tersedia.');
        return;
      }

      const data = {
        className: editor.querySelector<HTMLSelectElement>('#q-class')!.value,
        subject: editor.querySelector<HTMLSelectElement>('#q-subject')!.value,
        difficulty: editor.querySelector<HTMLSelectElement>('#q-difficulty')!.value as Difficulty,
        prompt,
        options,
        answer,
        explanation: editor.querySelector<HTMLTextAreaElement>('#q-explanation')!.value.trim()
      };

      if (old) {
        bank = bank.map(q => q.id === old.id ? { ...old, ...data } : q);
      } else {
        bank.push(createQuestion(data));
      }

      closePortal();
      openAdminPanel();
      alert('Soal berhasil disimpan.');
    });
  }

  function deleteQuestion(id: string): void {
    if (!confirm('Hapus soal ini?')) return;
    bank = bank.filter(q => q.id !== id);
    persist();
  }

  overlay.querySelector('#add-question')?.addEventListener('click', () => editQuestion());

  search.addEventListener('input', render);
  classFilter.addEventListener('change', render);
  subjectFilter.addEventListener('change', render);

  overlay.querySelector('#export-questions')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(bank, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subway-edu-bank-soal.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  overlay.querySelector('#import-questions')?.addEventListener('click', () => {
    overlay.querySelector<HTMLInputElement>('#question-file')?.click();
  });

  overlay.querySelector<HTMLInputElement>('#question-file')?.addEventListener('change', async event => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      const imported: unknown = JSON.parse(await file.text());
      if (!Array.isArray(imported)) throw new Error('Format harus berupa array JSON.');

      const valid = imported.filter((q): q is EduQuestion =>
        typeof q === 'object' &&
        q !== null &&
        typeof q.prompt === 'string' &&
        typeof q.subject === 'string' &&
        Array.isArray(q.options) &&
        q.options.length >= 2 &&
        Number.isInteger(q.answer) &&
        q.answer >= 0 &&
        q.answer < q.options.length
      );

      if (!valid.length) throw new Error('Tidak ditemukan soal yang valid.');

      bank = valid.map(q => ({
        ...q,
        id: typeof q.id === 'string' ? q.id : `import_${Date.now()}_${Math.random()}`,
        className: typeof q.className === 'string' ? q.className : 'Semua Kelas',
        difficulty: q.difficulty || 'Mudah',
        explanation: q.explanation || ''
      }));

      persist();
      alert(`${bank.length} soal berhasil diimpor.`);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Gagal membaca file JSON.');
    }
  });

  render();
}
