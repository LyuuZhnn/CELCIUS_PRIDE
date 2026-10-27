# CELCIUS PRIDE — One Circle. One Identity.

Website informasi circle Free Fire berbasis HTML, CSS, dan JavaScript murni. Proyek tidak membutuhkan backend, database, proses build, atau panel admin. Dirancang agar dapat dipublikasikan melalui GitHub Pages.

## Isi website

- Beranda dengan statistik yang dihitung dari satu sumber data.
- Tentang Circle.
- Struktur Organisasi: Founder Kazaya, Pengurus Kin Ramzy, Kang OP Test Kin Ramzy.
- Anggota: MOBI (2 entri) dan HP (12 entri), lengkap dengan pencarian dan filter.
- Aktivitas, Pengumuman, dan Peraturan dengan empty state atau placeholder yang ditandai.
- Gabung Circle dengan kontak nonaktif sampai URL resmi tersedia.
- Sidebar responsif; tombol menu hamburger mobile simetris dengan garis yang bertransformasi menjadi X ketika drawer terbuka.

## Struktur direktori

```text
CELCIUS-PRIDE/
├── index.html
├── pages/
│   ├── tentang.html
│   ├── struktur.html
│   ├── anggota.html
│   ├── aktivitas.html
│   ├── pengumuman.html
│   ├── peraturan.html
│   └── gabung.html
├── css/
│   ├── style.css
│   ├── components.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── anggota.js
│   └── aktivitas.js
├── data/
│   ├── anggota.js
│   ├── aktivitas.js
│   ├── pengumuman.js
│   └── peraturan.js
├── assets/
│   └── favicon.svg
└── README.md
```

## Mengubah data

### Anggota dan jabatan

Edit `data/anggota.js`. Jangan mengganti ejaan nama jika ingin mempertahankan daftar awal. Total anggota dan statistik beranda dibaca dari file ini. Ramzy yang berada di kategori MOBI dan HP sengaja dicatat sebagai dua entri.

### Aktivitas

Edit `data/aktivitas.js`, lalu tambahkan item ke dalam array `window.CP_DATA.activities`. Contoh format (ubah menjadi data kegiatan yang benar sebelum digunakan):

```js
window.CP_DATA.activities = [
  {
    title: "Nama kegiatan resmi",
    category: "Mabar",
    date: "2026-11-01",
    time: "20:00",
    description: "Keterangan kegiatan",
    status: "Akan Datang"
  }
];
```

Kategori yang didukung: `Mabar`, `OP Test`, `Sparing`, `Scrim`, `Event internal`, atau `Lainnya`. Status: `Akan Datang`, `Berlangsung`, `Selesai`. Contoh di atas hanya menunjukkan bentuk data dan bukan jadwal resmi circle.

### Pengumuman

Edit `data/pengumuman.js`. Contoh format:

```js
window.CP_DATA.announcements = [
  {
    title: "Judul pengumuman resmi",
    content: "Isi pengumuman",
    date: "2026-11-01",
    category: "Informasi",
    important: false
  }
];
```

### Peraturan

Edit `data/peraturan.js`. Konten yang tersedia pada awal proyek adalah **placeholder**, bukan keputusan resmi. Setelah isi disepakati, ubah teksnya dan set `draft: false` pada item yang sudah final.

### Kontak halaman Gabung

Nomor WhatsApp, UID, tautan grup, serta media sosial belum disediakan. Tombol kontak sengaja nonaktif. Tambahkan hanya tautan resmi yang benar-benar sudah dikonfirmasi.

## Publikasi GitHub Pages lewat Termux (Android)

### 1. Siapkan Termux dan ekstrak ZIP

Unduh `CELCIUS_PRIDE_GitHub_Pages.zip` ke folder **Download**, kemudian jalankan:

```bash
termux-setup-storage
pkg update -y
pkg install git unzip -y
unzip -o ~/storage/downloads/CELCIUS_PRIDE_GitHub_Pages.zip -d ~/
cd ~/CELCIUS-PRIDE
ls
```

Pastikan `index.html`, folder `css`, `js`, `data`, `pages`, dan `assets` terlihat setelah perintah `ls`.

### 2. Buat repositori di GitHub

1. Buka GitHub di browser dan masuk ke akunmu.
2. Tekan **New repository**.
3. Beri nama `CELCIUS-PRIDE` (atau nama lain yang kamu pilih).
4. Pilih **Public**.
5. Agar proses push pertama sederhana, jangan centang pilihan untuk membuat README, `.gitignore`, atau lisensi di GitHub. Proyek sudah memiliki README sendiri.
6. Buat repositorinya dan salin URL HTTPS repositori tersebut.

### 3. Unggah proyek dari Termux

Jalankan dari folder `~/CELCIUS-PRIDE`:

```bash
git init
git branch -M main
git add .
git commit -m "Initial CELCIUS PRIDE website"
git remote add origin https://github.com/USERNAME/CELCIUS-PRIDE.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub milikmu. Jika nama repositorinya berbeda, sesuaikan `CELCIUS-PRIDE` pada URL. Jika Git meminta identitas commit, isi nama dan email Git dengan milikmu:

```bash
git config --global user.name "Nama Kamu"
git config --global user.email "email-yang-dipakai-di-github@example.com"
```

Lalu ulangi `git commit` dan `git push` jika diperlukan. Jika autentikasi HTTPS meminta password, GitHub tidak menerima password akun biasa untuk Git; gunakan Personal Access Token (PAT) yang dibuat sendiri sebagai pengganti password pada prompt autentikasi. **Jangan menaruh token di kode website atau menyisipkannya ke URL remote.** Simpan token secara rahasia.

### 4. Aktifkan GitHub Pages

1. Buka repositori yang baru diunggah di GitHub.
2. Masuk ke **Settings** → **Pages**.
3. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/ (root)`, lalu tekan **Save**.
5. Tunggu sampai GitHub menampilkan alamat situs pada halaman Pages.

Biasanya alamat website berbentuk:

```text
https://USERNAME.github.io/CELCIUS-PRIDE/
```

Gunakan URL yang benar-benar ditampilkan oleh GitHub Pages pada repositorimu. Publikasi pertama dapat memerlukan beberapa menit.

### 5. Perbarui website setelah mengubah data

Setelah file data atau tampilan diubah, masuk kembali ke folder proyek di Termux lalu jalankan:

```bash
cd ~/CELCIUS-PRIDE
git add .
git commit -m "Update circle information"
git push
```

Setelah GitHub Pages selesai memperbarui situs, muat ulang halaman website. Bila perubahan tidak langsung terlihat di HP, coba refresh atau buka kembali situs.

## Catatan teknis

- Website menggunakan tautan relatif sehingga halaman dapat berjalan di domain GitHub Pages berbasis nama repositori.
- Tidak ada backend, database, login, panel admin bersama, atau penyimpanan data browser untuk mengubah isi yang dilihat semua pengunjung.
- Data hanya diperbarui bersama ketika file proyek diubah dan di-push ke GitHub.
- Ikon utama dibuat dengan SVG inline dan favicon SVG lokal; gambar eksternal tidak diperlukan.
