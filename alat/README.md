# Alat pembuat Beranda

Dijalankan dengan Node dari folder `beranda/`. `<kerja>` adalah folder sementara mana saja.

| Perintah | Hasil |
|---|---|
| `node alat/buat_ikon.js assets` | ikon PNG Beranda (32, 192, 512, maskable, apple-touch) |
| `node alat/buat_pratinjau.js <kerja>` | `<kerja>/beranda_pratinjau.html`: satu berkas, ikon aplikasi ditanam (untuk artifact Claude) |
| `node alat/buat_laptop.js <kerja> laptop` | `laptop/berkas/beranda.html`, `beranda-staf.html`, `beranda.ico` (jalankan buat_pratinjau dulu) |

Daftar ubin ada di `buat_pratinjau.js` (SISWA, GURU, STAF1, STAF2) dan di `index.html` / `staf.html`;
bila menambah aplikasi, ubah keduanya lalu buat ulang paket laptop.
