# Subway Edu — Web Android Starter

Subway Edu adalah prototipe game endless runner 3D berbasis Three.js yang diadaptasi pada tingkat konsep dan struktur teknis dari proyek referensi yang diberikan. Fokus tahap awal: kontrol tiga jalur, lari otomatis, lompat, merunduk, rintangan, koin, HUD, dan kuis pembelajaran.

## Teknologi
- Three.js + TypeScript + Vite
- WebGL untuk grafis 3D
- Pointer Events untuk swipe pada layar sentuh
- LocalStorage untuk rekor, koin, dan jumlah jawaban benar
- PWA manifest + service worker sebagai fondasi instalasi Android

## Menjalankan di komputer
1. Pasang Node.js 22.
2. Buka folder proyek ini di VS Code.
3. Jalankan `npm install`.
4. Jalankan `npm run dev -- --host 0.0.0.0`.
5. Buka alamat lokal yang ditampilkan Vite.

## Build produksi
```bash
npm run build
npm run preview -- --host 0.0.0.0
```
Folder hasil produksi: `dist/`.

## Uji di Android
- Komputer dan HP harus berada pada jaringan Wi-Fi yang sama.
- Jalankan dev server dengan `npm run dev -- --host 0.0.0.0`.
- Buka alamat IP komputer dan port Vite dari Chrome Android.
- Untuk pemasangan PWA dan service worker pada produksi, hosting harus menggunakan HTTPS.

## Kontrol
- Geser kiri/kanan: pindah jalur.
- Geser ke atas: lompat.
- Geser ke bawah: merunduk/berguling.
- Tombol jeda di layar: pause.
- Keyboard PC: panah atau WASD, Spasi untuk lompat, Esc untuk jeda.

## Fitur edukasi prototipe
Setelah pemain mengumpulkan 5 koin, permainan berhenti sementara dan menampilkan satu soal pilihan ganda. Bank soal awal ada di `src/edu.ts`. Soal mencakup Matematika, Bahasa Indonesia, dan Pendidikan Pancasila. Jawaban benar menambah penghitung jawaban benar yang disimpan pada LocalStorage.

## Tahap pengembangan berikutnya
1. Menu awal khusus Subway Edu (Main, Panel Guru, Pengaturan Karakter).
2. Panel Guru: kelas, mapel, kategori, tingkat kesulitan, jumlah soal, dan bank soal.
3. Profil siswa: nama dan kelas.
4. Rekap nilai per siswa dan ekspor CSV.
5. Sistem akun/backend bila dibutuhkan untuk sinkronisasi lintas perangkat.
6. Optimasi model, animasi, efek suara, dan pengujian pada beberapa ukuran Android.

Catatan: ZIP referensi tidak menyertakan file lisensi di root. Sebelum distribusi publik/komersial, pastikan hak penggunaan source code dan aset model 3D telah diperoleh. Proyek ini belum boleh dianggap sebagai produk final atau salinan resmi Subway Surfers.
