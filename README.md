# Skrining Kesehatan Mental

Aplikasi web sederhana untuk skrining dini kesehatan mental pada dewasa awal. Pengguna menjawab pertanyaan Ya/Tidak satu per satu. Setelah selesai, aplikasi menampilkan kesimpulan awal dan saran yang relevan. Jika ada tanda bahaya (misalnya pikiran untuk menyakiti diri atau indikasi kondisi berat), aplikasi menampilkan peringatan keselamatan.

Catatan: Semua proses berjalan di browser pengguna (lokal), tidak mengirim data ke server.

---

## Tujuan

- Membantu pengguna melakukan skrining awal secara mandiri dengan alur pertanyaan sederhana.
- Memberikan saran yang mudah dipahami sesuai kondisi yang terindikasi.
- Menyediakan peringatan keselamatan jika terdapat tanda bahaya dan informasi kontak bantuan darurat.

---

## Fitur

- Pertanyaan Ya/Tidak tampil satu per satu (31 pertanyaan/gejala).
- Batang progres untuk menunjukkan kemajuan pengisian.
- Kesimpulan awal yang ditampilkan dengan bahasa non-teknis.
- Saran praktis tanpa penomoran (ditampilkan sebagai daftar poin).
- Peringatan keselamatan:
  - Banner darurat langsung muncul jika pengguna menandai pikiran/percobaan menyakiti diri saat mengisi.
  - Peringatan khusus jika hasil menunjukkan indikasi kondisi berat.
- Privasi: seluruh proses terjadi di browser, tidak ada data yang dikirim ke server.
- Tampilan menggunakan Tailwind CSS, pengembangan menggunakan Vite.

---

## Prasyarat

- Git
- Node.js 18 LTS atau lebih baru (disarankan versi LTS)
- Koneksi internet saat instalasi dependensi (untuk `npm install`)

Cek versi:

```bash
node -v
npm -v
```

---

## Instalasi dari GitHub

1. Kloning repositori

- Jika Anda sudah tahu URL repo Anda, ganti `{owner}` dan `{repo}` sesuai milik Anda.

```bash
git clone https://github.com/raflyrzp/mental-health-screening.git
cd mental-health-screening
```

2. Instal dependensi

```bash
npm install
```

---

## Menjalankan di Lokal

Mode pengembangan (hot reload):

```bash
npm run dev
```

- Buka alamat yang ditampilkan di terminal (biasanya http://localhost:5173).
- Setiap perubahan pada file sumber akan memuat ulang halaman otomatis.

Build produksi dan pratinjau:

```bash
npm run build
npm run preview
```

- Pratinjau biasanya berjalan di http://localhost:5174.

---

## Cara Menggunakan (di Browser)

1. Klik tombol “Ya” atau “Tidak” pada setiap pertanyaan.
2. Lanjutkan hingga pertanyaan terakhir (indikator progres akan mencapai 100%).
3. Setelah selesai, halaman hasil menampilkan:
   - Kesimpulan awal.
   - Saran yang relevan dengan kondisi Anda.
   - Peringatan keselamatan jika diperlukan.
4. Gunakan tombol “Mulai Ulang” untuk mengulang pengisian dari awal.

Catatan keselamatan:

- Jika Anda menandai adanya pikiran atau tindakan menyakiti diri, banner bantuan darurat akan muncul selama proses pengisian. Keselamatan Anda adalah prioritas utama.
- Dalam kondisi darurat, hubungi layanan gawat darurat setempat (112/119) atau layanan dukungan psikologis SEJIWA (119 ext 8).

---

## Struktur Proyek

```
.
├─ index.html            # Halaman utama (memuat container aplikasi)
├─ package.json          # Skrip npm dan dependensi
├─ postcss.config.js     # Konfigurasi PostCSS
├─ tailwind.config.js    # Konfigurasi Tailwind
├─ src/
│  ├─ main.js            # Logika aplikasi (alur pertanyaan, kesimpulan, saran)
│  └─ style.css          # Impor dan komponen Tailwind (kelas .card, .btn, dll.)
└─ dist/                 # Hasil build produksi (terbentuk setelah npm run build)
```

---

## Penjelasan Alur Singkat

- Pertanyaan ditampilkan bergantian. Anda cukup memilih “Ya” atau “Tidak”.
- Sistem mencermati pola jawaban yang sesuai dengan sejumlah aturan internal (logika aturan berada di kode, tidak ditampilkan ke pengguna).
- Jika ditemukan kecocokan pola, sistem memberikan kesimpulan awal yang mudah dipahami dan saran yang sesuai.
- Jika tidak ada pola yang cukup kuat, sistem akan menyatakan “Belum ada indikasi yang jelas” disertai saran umum.
- Jika terdeteksi tanda bahaya, sistem menampilkan peringatan keselamatan dan informasi bantuan.

---

## Kustomisasi

Anda dapat menyesuaikan teks atau aturan di file `src/main.js`:

- Mengubah daftar pertanyaan:

  - Ubah array `SYMPTOMS` (kolom `text` adalah isi pertanyaan yang tampil ke pengguna).
  - Aplikasi hanya menampilkan teks, tidak menampilkan kode internal.

- Mengubah saran:

  - Ubah array `ADVICES` (kolom `text`).
  - Aplikasi menampilkan daftar saran tanpa penomoran.

- Mengubah pemetaan saran per hasil:

  - Ubah objek `ADVICE_MAP` agar kesimpulan tertentu menggunakan saran tertentu.

- Mengubah tampilan:

  - Sesuaikan komponen Tailwind di `src/style.css` (kelas `.card`, `.btn`, `.progress`, dll.).
  - Layout dasar ada di `index.html`.

- Mengubah teks non-teknis di hasil:
  - Perbarui bagian penyusunan teks hasil di fungsi `finalize()` pada `src/main.js`.
  - Pastikan tetap menggunakan bahasa yang mudah dipahami (tanpa istilah teknis).

---

## Teknologi yang Digunakan

- Vite (dev server cepat dan build)
- Tailwind CSS (utility-first CSS)
- JavaScript murni (tanpa framework)

---

## Tips & Pemecahan Masalah

- Port sudah terpakai:

  - Jalankan ulang `npm run dev`; Vite akan menawarkan port lain, atau jalankan `vite --port 5175`.

- Gagal `npm install`:

  - Pastikan koneksi internet stabil dan Node.js telah terpasang dengan benar.
  - Coba hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` lagi.

- Perubahan gaya tidak terlihat:

  - Pastikan daftar `content` di `tailwind.config.js` sudah memuat jalur `./index.html` dan `./src/**/*.{js,ts,jsx,tsx}`.
  - Hentikan lalu jalankan ulang `npm run dev`.

- Build berhasil, tetapi halaman putih:
  - Pastikan Anda melayani folder `dist/` dengan `npm run preview` atau server statis yang benar.
  - Cek konsol browser untuk melihat pesan kesalahan.

---

## Privasi & Batasan

- Skrining ini bukan alat diagnosis medis.
- Hasil tidak menggantikan penilaian tenaga profesional.
- Seluruh proses berlangsung di perangkat Anda; tidak ada data yang dikirim ke server.

Jika Anda merasa tidak aman atau berada dalam situasi darurat, segera cari bantuan profesional atau hubungi layanan darurat setempat (112/119) atau SEJIWA (119 ext 8).

---

## Skrip NPM

- `npm run dev` — Menjalankan mode pengembangan.
- `npm run build` — Membangun aset produksi ke folder `dist/`.
- `npm run preview` — Menjalankan server pratinjau untuk `dist/`.
