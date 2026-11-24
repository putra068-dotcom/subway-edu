export interface EduQuestion {
  subject: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

// Starter bank: elementary-school questions. This bank can later be managed from Panel Guru.
export const QUESTION_BANK: EduQuestion[] = [
  { subject: 'Matematika · Pola', prompt: 'Perhatikan pola: 🔴 🔵 🔴 🔵 ... Warna berikutnya adalah?', options: ['🔴 Merah', '🟢 Hijau', '🟡 Kuning', '🟣 Ungu'], answer: 0, explanation: 'Pola bergantian merah, biru, merah, biru. Jadi berikutnya merah.' },
  { subject: 'Matematika · Bilangan', prompt: 'Berapakah hasil 8 + 7?', options: ['13', '14', '15', '16'], answer: 2, explanation: '8 ditambah 7 sama dengan 15.' },
  { subject: 'Bahasa Indonesia', prompt: 'Manakah kalimat aktif?', options: ['Bola ditendang Rani.', 'Rani menendang bola.', 'Buku dibaca Budi.', 'Pintu dibuka Ayah.'], answer: 1, explanation: 'Kalimat aktif menggunakan subjek yang melakukan tindakan: Rani menendang bola.' },
  { subject: 'Pendidikan Pancasila', prompt: 'Saat teman berbeda pendapat, sikap kita sebaiknya ...', options: ['Mengejek', 'Marah', 'Menghargai', 'Meninggalkan'], answer: 2, explanation: 'Kita perlu menghargai pendapat orang lain dan bermusyawarah.' },
  { subject: 'Matematika · Pengukuran', prompt: 'Alat untuk mengukur panjang pensil adalah ...', options: ['Jam', 'Penggaris', 'Timbangan', 'Gelas'], answer: 1, explanation: 'Penggaris digunakan untuk mengukur panjang benda.' },
  { subject: 'Bahasa Indonesia', prompt: 'Lawan kata dari “rajin” adalah ...', options: ['Tekun', 'Giat', 'Malas', 'Pintar'], answer: 2, explanation: 'Lawan kata rajin adalah malas.' },
  { subject: 'Pendidikan Pancasila', prompt: 'Bekerja sama membersihkan kelas mencerminkan sikap ...', options: ['Gotong royong', 'Egois', 'Curang', 'Sombong'], answer: 0, explanation: 'Gotong royong berarti bekerja bersama untuk mencapai tujuan.' },
  { subject: 'Matematika · Bangun Datar', prompt: 'Bangun datar yang memiliki 3 sisi adalah ...', options: ['Persegi', 'Lingkaran', 'Segitiga', 'Persegi panjang'], answer: 2, explanation: 'Segitiga mempunyai tiga sisi dan tiga sudut.' },
  { subject: 'Bahasa Indonesia', prompt: 'Kata yang tepat untuk melengkapi: “Ibu ... sayur di dapur.”', options: ['memasak', 'berlari', 'berenang', 'menyanyi'], answer: 0, explanation: 'Kata “memasak” sesuai dengan kegiatan yang dilakukan ibu di dapur.' },
  { subject: 'Pendidikan Pancasila', prompt: 'Lambang sila pertama Pancasila adalah ...', options: ['Rantai', 'Bintang', 'Pohon beringin', 'Kepala banteng'], answer: 1, explanation: 'Sila pertama, Ketuhanan Yang Maha Esa, dilambangkan dengan bintang.' },
];

export function pickQuestion(previous = -1): { question: EduQuestion; index: number } {
  let index = Math.floor(Math.random() * QUESTION_BANK.length);
  if (QUESTION_BANK.length > 1 && index === previous) index = (index + 1) % QUESTION_BANK.length;
  return { question: QUESTION_BANK[index], index };
}
