# Beranda — Aplikasi Sekolah SMA Plus Merdeka Soreang

Halaman pembuka di alamat utama akun GitHub sekolah:
https://smapmerdekasoreang99-star.github.io/

Isinya hanya tautan ke aplikasi yang sudah ada (tanpa login, tanpa database).

| Berkas | Isi |
|---|---|
| `index.html` | Halaman umum: pilihan **Siswa** dan **Guru & pembina** (diingat di perangkat; `#siswa` / `#guru` bisa dibagikan) |
| `staf.html` | Halaman staf: Data Induk, Kehadiran Guru, Induk Pembiayaan, Admin Asesmen, Admin Kesiswaan. **Sengaja tidak ditautkan** dari `index.html` dan diberi `noindex`; bagikan alamatnya hanya ke staf |
| `manifest*.webmanifest` | Ikon untuk dipasang di layar HP (umum dan staf terpisah) |
| `assets/dasar.css` | Salinan yang sama dengan aplikasi lain (`md5sum */assets/dasar.css` harus sama) |
| `assets/beranda.css` | Tata letak halaman ini |

Ikon tiap ubin diambil langsung dari aplikasinya (`/<aplikasi>/assets/ikon-192.png`),
jadi bila ikon aplikasi berubah, beranda ikut berubah. Menambah aplikasi baru cukup
menambah satu `<li>` di `index.html` atau `staf.html`.

## Versi laptop (tanpa menunggu alamat utama)

Folder `laptop/` berisi pemasang untuk laptop Windows: `PASANG.cmd`, `HAPUS.cmd`, `BACA SAYA.txt`,
dan `berkas/` (halaman mandiri dengan ikon tertanam + `beranda.ico`). Pemasang berupa `.cmd` biasa:
tanpa hak admin dan tanpa PowerShell. Halaman disalin ke `%LOCALAPPDATA%\BerandaSekolah`, lalu pintasan
`Aplikasi Sekolah.url` dibuat di Desktop (lokasi dibaca dari registri, ikut bila Desktop dialihkan ke OneDrive)
dan menu Start. Pilihan 1 = Siswa & guru, pilihan 2 = lengkap dengan Staf (berkas staf hanya disalin bila
pilihan 2). Halamannya terbuka tanpa internet, aplikasinya tetap perlu internet. Untuk dibagikan:
`Pasang_Beranda_Laptop.zip` (dibuat ulang dari `laptop/`, tidak di-commit). Cara membuat ulang: `alat/README.md`.
