# SUBWAY EDU — versi 0.2.0

Game 3D endless runner edukatif berbasis Three.js + TypeScript + Vite. Target utama: browser Android portrait, serta desktop.

## Fitur versi 0.2.0
- Home screen baru dengan tiga aksi: Panel Admin, Main, Pilih Karakter.
- Form identitas siswa: nama, kelas I–VI, dan mata pelajaran sebelum permainan dimulai.
- Panel Admin ber-PIN (PIN awal `1234`; ubah kode sumber sebelum dipakai di lingkungan publik).
- Bank soal tambah/hapus, impor CSV, dan unduh template CSV.
- Soal terisolasi berdasarkan kombinasi kelas dan mata pelajaran.
- Kotak pertanyaan ditampilkan sebagai popup bergambar peti/box pada checkpoint jarak; jarak dapat diatur admin 120–600 meter (default 220 meter).
- Popup menghentikan permainan sampai siswa menjawab, lalu permainan dilanjutkan.
- Pemilihan karakter awal (pilihan tampilan/profil; integrasi model 3D karakter khusus adalah tahap aset berikutnya).

## Menjalankan lokal
Gunakan Node.js 22:

```bash
npm ci
npm run dev -- --host 0.0.0.0
```

Build produksi:

```bash
npm run build
npm run preview
```

## Format CSV bank soal
Header wajib:

```csv
kelas,mapel,pertanyaan,opsiA,opsiB,opsiC,opsiD,kunci,pembahasan
```

- `kelas`: I, II, III, IV, V, atau VI.
- `mapel`: nama mata pelajaran yang akan dipilih siswa.
- `kunci`: A, B, C, atau D.
- Setiap baris merupakan satu soal. Soal hanya masuk ke pasangan kelas dan mapel yang tertulis pada baris tersebut.
- Teks yang mengandung koma harus dibungkus tanda kutip ganda.

## Catatan penyimpanan dan keamanan
Data bank soal, pengaturan, dan rekor saat ini tersimpan di LocalStorage browser. Data belum tersinkron antarperangkat. PIN admin pada versi ini adalah pengunci antarmuka sisi-klien, bukan autentikasi aman; untuk penggunaan sekolah lintas perangkat, tahap berikutnya perlu backend/database dan autentikasi admin di server.

## Kotak pertanyaan
Pada versi ini checkpoint kotak pertanyaan ditampilkan sebagai popup edukasi saat pemain mencapai jarak tertentu. Model peti 3D yang benar-benar muncul sebagai objek di rel dapat ditambahkan pada iterasi aset/level berikutnya.
