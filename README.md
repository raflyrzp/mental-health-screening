# Skrining Kesehatan Mental — Aplikasi Web (Vite + Tailwind)

Aplikasi web sederhana untuk skrining dini kesehatan mental pada dewasa awal. Pengguna menjawab pertanyaan Ya/Tidak satu per satu. Setelah selesai, aplikasi menampilkan kesimpulan awal dan saran yang relevan. Jika ada tanda bahaya (misalnya pikiran untuk menyakiti diri atau indikasi kondisi berat), aplikasi menampilkan peringatan keselamatan.

Catatan penting:

- Semua proses berjalan di browser pengguna (lokal), tidak mengirim data ke server.
- Jika tidak ada tanda yang mengkhawatirkan, pengguna akan melihat status “Kategori Aman” (mental sehat) beserta saran pemeliharaan kebiasaan baik.

---

## Tujuan

- Membantu pengguna melakukan skrining awal secara mandiri dengan alur pertanyaan sederhana.
- Memberikan saran yang mudah dipahami sesuai kondisi yang terindikasi.
- Menyediakan peringatan keselamatan jika terdapat tanda bahaya dan informasi kontak bantuan darurat.

---

## Fitur

- Pertanyaan Ya/Tidak tampil satu per satu (31 pertanyaan/gejala).
- Progress bar untuk menunjukkan kemajuan pengisian.
- Kesimpulan awal.
- Status “Kategori Aman” bila tidak ditemukan tanda yang mengkhawatirkan.
- Saran praktis.
- Peringatan keselamatan:
  - Banner darurat langsung muncul jika pengguna menandai pikiran/percobaan menyakiti diri saat mengisi.
  - Peringatan khusus jika hasil menunjukkan indikasi kondisi berat.
- Privasi: seluruh proses terjadi di browser; tidak ada data yang dikirim ke server.
- Tampilan menggunakan Tailwind CSS, pengembangan menggunakan Vite.
- Arsitektur modular: data, aturan, mesin inferensi, dan UI terpisah sehingga mudah dikembangkan.

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

1. Kloning repositori:

```bash
git clone https://github.com/raflyrzp/mental-health-screening.git
cd mental-health-screening
```

2. Instal dependensi:

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
- Perubahan pada file sumber akan memuat ulang halaman otomatis.

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
   - Saran yang relevan.
   - Peringatan keselamatan jika diperlukan.
   - Jika tidak ada tanda yang mengkhawatirkan, akan tampil status “Kategori Aman”.
4. Gunakan tombol “Mulai Ulang” untuk mengulang pengisian dari awal.

Catatan keselamatan:

- Jika Anda menandai adanya pikiran atau tindakan menyakiti diri, banner bantuan darurat akan muncul selama proses pengisian. Keselamatan Anda adalah prioritas utama.
- Dalam kondisi darurat, hubungi layanan gawat darurat setempat (112/119) atau layanan dukungan psikologis SEJIWA (119 ext 8).

---

## Struktur Proyek

```
.
├─ index.html               # Halaman utama (container aplikasi)
├─ package.json             # Skrip npm dan dependensi
├─ postcss.config.js        # Konfigurasi PostCSS
├─ tailwind.config.js       # Konfigurasi Tailwind
├─ src/
│  ├─ main.js               # Orkestrasi UI, state, alur pertanyaan/hasil
│  ├─ style.css             # Impor Tailwind dan komponen utilitas
│  ├─ inference.js          # Mesin inferensi & deteksi tanda bahaya
│  └─ data/
│     ├─ symptoms.js        # Daftar pertanyaan/gejala
│     ├─ diagnoses.js       # Nama-nama kesimpulan & tingkatannya
│     ├─ rules.js           # Aturan pemetaan gejala → kesimpulan
│     └─ advices.js         # Saran & pemetaan saran per kesimpulan
└─ dist/                    # Hasil build produksi (terbentuk setelah npm run build)
```

---

## Penjelasan Alur Singkat

- Pertanyaan ditampilkan bergantian. Anda cukup memilih “Ya” atau “Tidak”.
- Sistem mencermati pola jawaban berdasarkan aturan internal (logika tersimpan di kode, tidak ditampilkan ke pengguna).
- Jika ditemukan kecocokan pola, sistem memberikan kesimpulan awal yang mudah dipahami dan saran yang sesuai.
- Jika tidak ada pola yang cukup kuat:
  - Jika tidak ada tanda bahaya, sistem menampilkan “Kategori Aman” beserta saran pemeliharaan kebiasaan baik.
  - Jika ada tanda bahaya, sistem menampilkan status “Perlu Perhatian” dan peringatan keselamatan.
- Jika terdeteksi tanda bahaya yang kuat, sistem menampilkan peringatan dan informasi bantuan.

---

## Kustomisasi

- Pertanyaan:

  - Ubah file `src/data/symptoms.js` (kolom `text` adalah isi pertanyaan yang tampil ke pengguna).
  - Aplikasi hanya menampilkan teks, tidak menampilkan kode internal.

- Saran:

  - Ubah daftar di `src/data/advices.js` (kolom `text`).
  - Pemetaan saran per kesimpulan ada di `ADVICE_MAP` pada file yang sama.

- Aturan & Kesimpulan:

  - Aturan: `src/data/rules.js`.
  - Nama kesimpulan dan tingkatannya: `src/data/diagnoses.js`.
  - Mesin inferensi & penentuan prioritas hasil: `src/inference.js`.

- Tampilan:

  - Sesuaikan komponen Tailwind di `src/style.css` (kelas `.card`, `.btn`, `.progress`, `.tag`, dll.).
  - Struktur HTML dasar ada di `index.html`.

- Teks hasil non-teknis:
  - Logika penyusunan tampilan hasil ada di `src/main.js` (fungsi `finalize()`).
  - Pastikan tetap menggunakan bahasa yang mudah dipahami.

---

## Teknologi yang Digunakan

- Vite
- Tailwind CSS
- JavaScript murni

---

## Tips & Pemecahan Masalah

- Port sudah terpakai:

  - Jalankan ulang `npm run dev`; Vite akan menawarkan port lain, atau jalankan `vite --port 5175`.

- Gagal `npm install`:

  - Pastikan koneksi internet stabil dan Node.js telah terpasang dengan benar.
  - Coba hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` lagi.

- Perubahan gaya tidak terlihat:

  - Pastikan daftar `content` di `tailwind.config.js` memuat `./index.html` dan `./src/**/*.{js,ts,jsx,tsx}`.
  - Hentikan lalu jalankan ulang `npm run dev`.

- Build berhasil, tetapi halaman putih:
  - Layani folder `dist/` dengan `npm run preview` atau server statis yang benar.
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
