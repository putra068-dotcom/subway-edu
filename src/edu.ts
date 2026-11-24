
export type Difficulty = 'Mudah' | 'Sedang' | 'Sulit';

export interface EduQuestion {
  id: string;
  className: string;
  subject: string;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

// Bank soal bawaan. "Semua Kelas" berarti soal dapat digunakan
// oleh siswa dari kelas mana pun.
export const QUESTION_BANK: EduQuestion[] = [
  {
    id: 'q001',
    className: 'Semua Kelas',
    subject: 'Matematika · Pola',
    difficulty: 'Mudah',
    prompt: 'Perhatikan pola: 🔴 🔵 🔴 🔵 ... Warna berikutnya adalah?',
    options: ['🔴 Merah', '🟢 Hijau', '🟡 Kuning', '🟣 Ungu'],
    answer: 0,
    explanation: 'Pola bergantian merah, biru, merah, biru. Jadi berikutnya merah.'
  },
  {
    id: 'q002',
    className: 'Semua Kelas',
    subject: 'Matematika · Bilangan',
    difficulty: 'Mudah',
    prompt: 'Berapakah hasil 8 + 7?',
    options: ['13', '14', '15', '16'],
    answer: 2,
    explanation: '8 ditambah 7 sama dengan 15.'
  },
  {
    id: 'q003',
    className: 'Semua Kelas',
    subject: 'Bahasa Indonesia',
    difficulty: 'Sedang',
    prompt: 'Manakah kalimat aktif?',
    options: [
      'Bola ditendang Rani.',
      'Rani menendang bola.',
      'Buku dibaca Budi.',
      'Pintu dibuka Ayah.'
    ],
    answer: 1,
    explanation: 'Kalimat aktif menggunakan subjek yang melakukan tindakan.'
  },
  {
    id: 'q004',
    className: 'Semua Kelas',
    subject: 'Pendidikan Pancasila',
    difficulty: 'Mudah',
    prompt: 'Saat teman berbeda pendapat, sikap kita sebaiknya ...',
    options: ['Mengejek', 'Marah', 'Menghargai', 'Meninggalkan'],
    answer: 2,
    explanation: 'Kita perlu menghargai pendapat orang lain dan bermusyawarah.'
  },
  {
    id: 'q005',
    className: 'Semua Kelas',
    subject: 'Matematika · Pengukuran',
    difficulty: 'Mudah',
    prompt: 'Alat untuk mengukur panjang pensil adalah ...',
    options: ['Jam', 'Penggaris', 'Timbangan', 'Gelas'],
    answer: 1,
    explanation: 'Penggaris digunakan untuk mengukur panjang benda.'
  },
  {
    id: 'q006',
    className: 'Semua Kelas',
    subject: 'Bahasa Indonesia',
    difficulty: 'Mudah',
    prompt: 'Lawan kata dari “rajin” adalah ...',
    options: ['Tekun', 'Giat', 'Malas', 'Pintar'],
    answer: 2,
    explanation: 'Lawan kata rajin adalah malas.'
  },
  {
    id: 'q007',
    className: 'Semua Kelas',
    subject: 'Pendidikan Pancasila',
    difficulty: 'Mudah',
    prompt: 'Bekerja sama membersihkan kelas mencerminkan sikap ...',
    options: ['Gotong royong', 'Egois', 'Curang', 'Sombong'],
    answer: 0,
    explanation: 'Gotong royong berarti bekerja bersama untuk mencapai tujuan.'
  },
  {
    id: 'q008',
    className: 'Semua Kelas',
    subject: 'Matematika · Bangun Datar',
    difficulty: 'Mudah',
    prompt: 'Bangun datar yang memiliki 3 sisi adalah ...',
    options: ['Persegi', 'Lingkaran', 'Segitiga', 'Persegi panjang'],
    answer: 2,
    explanation: 'Segitiga mempunyai tiga sisi dan tiga sudut.'
  },
  {
    id: 'q009',
    className: 'Semua Kelas',
    subject: 'Bahasa Indonesia',
    difficulty: 'Mudah',
    prompt: 'Kata yang tepat untuk melengkapi: “Ibu ... sayur di dapur.”',
    options: ['memasak', 'berlari', 'berenang', 'menyanyi'],
    answer: 0,
    explanation: 'Kata “memasak” sesuai dengan kegiatan ibu di dapur.'
  },
  {
    id: 'q010',
    className: 'Semua Kelas',
    subject: 'Pendidikan Pancasila',
    difficulty: 'Mudah',
    prompt: 'Lambang sila pertama Pancasila adalah ...',
    options: ['Rantai', 'Bintang', 'Pohon beringin', 'Kepala banteng'],
    answer: 1,
    explanation: 'Sila pertama dilambangkan dengan bintang.'
  }
];

const STORAGE_KEY = 'questionBank';

function makeId(): string {
  return `q_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function isDifficulty(value: unknown): value is Difficulty {
  return value === 'Mudah' || value === 'Sedang' || value === 'Sulit';
}

// Membaca bank soal tersimpan. Jika belum ada, gunakan bank bawaan.
export function getQuestionBank(): EduQuestion[] {
  try {
    const raw = window.localStorage.getItem(`subway.${STORAGE_KEY}`);
    if (!raw) return [...QUESTION_BANK];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...QUESTION_BANK];

    return parsed
      .filter((q): q is Record<string, unknown> =>
        typeof q === 'object' && q !== null
      )
      .map((q) => ({
        id: typeof q.id === 'string' ? q.id : makeId(),
        className: typeof q.className === 'string' ? q.className : 'Semua Kelas',
        subject: typeof q.subject === 'string' ? q.subject : 'Umum',
        difficulty: isDifficulty(q.difficulty) ? q.difficulty : 'Mudah',
        prompt: typeof q.prompt === 'string' ? q.prompt : '',
        options: Array.isArray(q.options)
          ? q.options.filter((v): v is string => typeof v === 'string')
          : [],
        answer: Number.isInteger(q.answer) ? Number(q.answer) : 0,
        explanation: typeof q.explanation === 'string' ? q.explanation : ''
      }))
      .filter(q =>
        q.prompt.trim() !== '' &&
        q.options.length >= 2 &&
        q.answer >= 0 &&
        q.answer < q.options.length
      );
  } catch {
    return [...QUESTION_BANK];
  }
}

// Menyimpan perubahan bank soal di perangkat/browser ini.
export function saveQuestionBank(questions: EduQuestion[]): boolean {
  try {
    window.localStorage.setItem(
      `subway.${STORAGE_KEY}`,
      JSON.stringify(questions)
    );
    return true;
  } catch {
    return false;
  }
}

export function createQuestion(
  data: Omit<EduQuestion, 'id'>
): EduQuestion {
  return {
    ...data,
    id: makeId()
  };
}

// Memilih soal sesuai kelas dan mata pelajaran siswa.
// Parameter pertama tetap "previous" agar pemanggilan lama
// pickQuestion(lastQuestion) di main.ts tidak langsung rusak.
export function pickQuestion(
  previous = -1,
  className = '',
  subject = '',
  bank: EduQuestion[] = getQuestionBank()
): { question: EduQuestion; index: number } {
  let filtered = bank
    .map((question, index) => ({ question, index }))
    .filter(({ question }) => {
      const classMatch =
        !className ||
        question.className === 'Semua Kelas' ||
        question.className === className;

      const subjectMatch =
        !subject ||
        question.subject === 'Semua Mapel' ||
        question.subject === subject;

      return classMatch && subjectMatch;
    });

  // Jika belum ada soal untuk filter yang dipilih, gunakan
  // seluruh bank agar permainan tidak berhenti tanpa pertanyaan.
  if (filtered.length === 0) {
    filtered = bank.map((question, index) => ({ question, index }));
  }

  if (filtered.length === 0) {
    return {
      question: QUESTION_BANK[0],
      index: 0
    };
  }

  let choices = filtered.filter(item => item.index !== previous);
  if (choices.length === 0) choices = filtered;

  const selected = choices[Math.floor(Math.random() * choices.length)];
  return selected;
}
