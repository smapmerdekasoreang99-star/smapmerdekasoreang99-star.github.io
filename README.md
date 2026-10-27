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
