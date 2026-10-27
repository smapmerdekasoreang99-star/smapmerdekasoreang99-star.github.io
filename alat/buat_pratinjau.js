// Pratinjau Beranda (artifact): satu berkas, ikon ditanam sebagai data URI, tautan ke alamat asli.
const fs = require("fs"), path = require("path");
const AKAR = "C:/Development/system_sekolah", SP = process.argv[2];
const ASAL = "https://smapmerdekasoreang99-star.github.io";
const ikon = (folder) => "data:image/png;base64," + fs.readFileSync(path.join(AKAR, folder, "assets/ikon-192.png")).toString("base64");
const logo = "data:image/png;base64," + fs.readFileSync(path.join(AKAR, "beranda/assets/logo.png")).toString("base64");
const ikonBeranda = "data:image/png;base64," + fs.readFileSync(path.join(AKAR, "beranda/assets/ikon-192.png")).toString("base64");
const I = { to: ikon("Tryout_Guru"), md: ikon("Matematika_Dasar"), er: ikon("English_Reading"), ae: ikon("absen_ekskul"), di: ikon("data_induk"), kg: ikon("kehadiran_guru"), ip: ikon("induk_pembiayaan") };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const ubin = (list) => `<ul class="ubin">${list.map(([ik, href, nama, ket, peran]) =>
  `<li><a href="${ASAL}${href}" target="_blank" rel="noopener"><img src="${I[ik]}" alt="" width="60" height="60"><span><b>${esc(nama)}</b><small>${esc(ket)}</small>${peran ? `<span class="peran">${esc(peran)}</span>` : ""}</span></a></li>`).join("")}</ul>`;
const SISWA = [
  ["to", "/Tryout_Guru/", "Asesmen Merdeka", "Ujian daring: masuk dengan NISN dan kode akses, kerjakan soal, hasil langsung tersimpan."],
  ["md", "/matematika_dasar/", "Matematika Dasar", "Latihan hitung bertahap: selesaikan 10 soal dengan benar untuk naik level."],
  ["er", "/english_reading/", "English Reading", "Latihan membaca bahasa Inggris: dengarkan paragraf, baca sendiri, lihat koreksi per kata."]];
const GURU = [
  ["to", "/Tryout_Guru/?guru", "Asesmen Merdeka", "Buka sesi ujian, pantau siswa, dan lihat hasil serta analisis soal.", "Guru & pengawas"],
  ["to", "/Tryout_Guru/admin.html?menu=pustaka", "Pustaka Paket Asesmen", "Bank soal: unggah soal dengan atau tanpa kisi-kisi, dan kelola paket buatan sendiri.", "Guru"],
  ["md", "/matematika_dasar/guru.html", "Matematika Dasar", "Sesi kegiatan per kelompok, kemajuan level siswa, dan rekap.", "Guru"],
  ["er", "/english_reading/guru.html", "English Reading", "Sesi kegiatan per kelompok dan kemajuan membaca siswa.", "Guru"],
  ["ae", "/absen_ekskul/", "Absensi Ekstrakurikuler", "Laporan kegiatan, kehadiran peserta, rekap, dan nilai ekstrakurikuler.", "Pembina"]];
const STAF1 = [
  ["di", "/data_induk/", "Data Induk Sekolah", "Data siswa, guru, kelas, mapel, dan jadwal KBM sekolah.", "Operator"],
  ["kg", "/kehadiran_guru/", "Kehadiran Guru", "Ketidakhadiran guru, guru pengganti, piket, dan rekap kehadiran.", "Kurikulum & piket"],
  ["ip", "/induk_pembiayaan/", "Induk Pembiayaan", "Dasar pembiayaan dari kehadiran dan piket, rekap, dan daftar pembayaran.", "Tata usaha & pimpinan"]];
const STAF2 = [
  ["to", "/Tryout_Guru/admin.html?menu=admin", "Admin Asesmen Merdeka", "Data siswa, PIN pribadi guru, impor kode hasil, dan cadangan.", "Operator"],
  ["ae", "/absen_ekskul/kesiswaan.html", "Admin Kesiswaan Ekskul", "Data pembina, kegiatan ekstrakurikuler, dan periode nilai.", "Kesiswaan"]];

const html = `<title>Beranda Aplikasi Sekolah</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Public+Sans:wght@400;500;600;700&display=swap">
<style>
/* Tata letak: pita biru tua di atas, pilihan kelompok menempel di tepinya, ubin aplikasi di kertas krem.
   Satu tampilan terang yang disengaja, sama dengan aplikasi sekolah lainnya (palet dari dasar.css). */
:root{
  --kertas:#FAF7F0; --kertas-2:#FFFFFF; --kertas-3:#F6F2E8; --gelap:#1D2A3A;
  --tinta:#221E17; --tinta-2:#5E5548; --tinta-3:#8B8173; --tinta-terang:#F7F3E9; --tinta-terang-2:#BDB3A0;
  --garis:#E7E0D1; --garis-2:#D6CCB6; --emas:#C29433; --emas-teks:#8F6B1A; --emas-muda:#FFF6D2; --emas-kabut:#FBF5E6;
  --f-judul:"Fraunces",Georgia,serif; --f-isi:"Public Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --bayang-1:0 1px 2px rgba(34,30,23,.05); --bayang-2:0 1px 2px rgba(34,30,23,.06),0 6px 18px rgba(34,30,23,.05);
  color-scheme:light;
}
*{box-sizing:border-box}
[hidden]{display:none!important}
body{margin:0;background:var(--kertas);color:var(--tinta);font-family:var(--f-isi);font-size:16px;line-height:1.5}
a:focus-visible{outline:3px solid rgba(194,148,51,.45);outline-offset:2px}
.lebar{max-width:992px;margin:0 auto;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.rencana{background:var(--emas-muda);color:var(--tinta);border-bottom:1px solid var(--garis-2);font-size:14px}
.rencana .lebar{padding-block:10px;display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline}
.rencana b{color:var(--emas-teks);text-transform:uppercase;letter-spacing:.06em;font-size:12px}
.kepala{background:var(--gelap);color:var(--tinta-terang)}
.kepala .lebar{padding-block:24px 40px}
.merek{display:flex;align-items:center;gap:12px}
.merek img{width:44px;height:auto;flex:none}
.merek b{display:block;font-family:var(--f-judul);font-size:18px;line-height:1.2}
.merek span{display:block;color:var(--tinta-terang-2);font-size:13px}
h1{font-family:var(--f-judul);font-weight:700;font-size:26px;line-height:1.2;margin:24px 0 4px;text-wrap:balance}
.kepala p{margin:0;color:var(--tinta-terang-2);font-size:14px;max-width:62ch}
main .lebar{padding-block:0 32px}
.pilih{display:flex;flex-wrap:wrap;gap:4px;margin:-24px 0 24px;padding:4px;background:var(--kertas-2);border:1px solid var(--garis);border-radius:999px;box-shadow:var(--bayang-2);width:fit-content;max-width:100%}
.pilih a{min-height:44px;display:flex;align-items:center;justify-content:center;padding:0 16px;border-radius:999px;color:var(--tinta-2);font-weight:600;font-size:14px;text-decoration:none;white-space:nowrap}
.pilih a[aria-current="true"]{background:var(--gelap);color:var(--tinta-terang)}
.pilih a:not([aria-current="true"]):hover{background:var(--kertas-3);color:var(--tinta)}
.pilih .sendiri{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;margin-left:6px;color:var(--emas-teks)}
.pilih a[aria-current="true"] .sendiri{color:var(--emas)}
h2{font-family:var(--f-judul);font-size:18px;color:var(--gelap);margin:0 0 4px;text-wrap:balance}
.kelompok{display:flex;flex-direction:column;gap:32px}
.kelompok>section>p{margin:0 0 16px;color:var(--tinta-2);font-size:14px}
.catatan-staf{margin:0;padding:12px 14px;border:1px dashed var(--garis-2);border-radius:10px;color:var(--tinta-2);font-size:14px;background:var(--kertas-3)}
.ubin{list-style:none;margin:0;padding:0;display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(min(270px,100%),1fr))}
.ubin a{display:flex;align-items:center;gap:16px;height:100%;padding:16px;background:var(--kertas-2);border:1px solid var(--garis);border-radius:14px;box-shadow:var(--bayang-1);color:inherit;text-decoration:none;transition:box-shadow .15s,border-color .15s}
.ubin a:hover{border-color:var(--garis-2);box-shadow:var(--bayang-2)}
.ubin a>span{min-width:0}
.ubin img{width:60px;height:60px;flex:none;border-radius:14px}
.ubin b{display:block;font-size:15px;color:var(--tinta)}
.ubin small{display:block;margin-top:2px;color:var(--tinta-2);font-size:13px;line-height:1.4}
.ubin .peran{display:inline-block;margin-top:8px;padding:1px 8px;border-radius:999px;background:var(--emas-kabut);color:var(--emas-teks);font-size:12px;font-weight:600}
.pasang{margin-top:48px;padding-top:16px;border-top:1px solid var(--garis);display:flex;gap:14px;align-items:center;color:var(--tinta-3);font-size:13px}
.pasang img{width:44px;height:44px;border-radius:11px;flex:none}
.pasang div{min-width:0}
.pasang b{color:var(--tinta-2)}
@media (max-width:420px){h1{font-size:23px}.ubin img{width:52px;height:52px;border-radius:12px}}
@media (prefers-reduced-motion:reduce){.ubin a{transition:none}}
</style>
<div class="rencana"><div class="lebar"><b>Rencana ke depan</b><span>Pratinjau Beranda. Belum dipasang di alamat utama sekolah; tautan di bawah sudah menuju aplikasi aslinya.</span></div></div>
<header class="kepala"><div class="lebar">
  <div class="merek"><img src="${logo}" alt="Logo SMA Plus Merdeka Soreang"><div><b>SMA Plus Merdeka</b><span>Soreang</span></div></div>
  <h1 id="judul">Aplikasi Sekolah</h1>
  <p id="sub">Pilih aplikasi yang ingin dibuka. Simpan halaman ini di layar HP agar cukup mengingat satu alamat.</p>
</div></header>
<main><div class="lebar">
  <nav class="pilih" aria-label="Kelompok pemakai">
    <a href="#siswa" data-ke="siswa">Siswa</a>
    <a href="#guru" data-ke="guru">Guru &amp; pembina</a>
    <a href="#staf" data-ke="staf">Staf<span class="sendiri">halaman terpisah</span></a>
  </nav>
  <div class="kelompok" id="siswa"><section><h2>Untuk siswa</h2><p>Masuk dengan NISN. Kode akses ujian diberikan guru di kelas.</p>${ubin(SISWA)}</section></div>
  <div class="kelompok" id="guru" hidden><section><h2>Untuk guru dan pembina</h2><p>Masuk dengan PIN pribadi masing-masing.</p>${ubin(GURU)}</section></div>
  <div class="kelompok" id="staf" hidden>
    <p class="catatan-staf">Di situs asli, bagian ini adalah halaman tersendiri (staf.html) yang tidak ditautkan dari halaman siswa dan guru, dan tidak muncul di mesin pencari. Alamatnya dibagikan hanya ke staf.</p>
    <section><h2>Administrasi sekolah</h2><p>Masuk dengan akun atau PIN masing-masing aplikasi.</p>${ubin(STAF1)}</section>
    <section><h2>Pengelola aplikasi</h2><p>Bagian pengelola di dalam aplikasi guru.</p>${ubin(STAF2)}</section>
  </div>
  <div class="pasang"><img src="${ikonBeranda}" alt=""><div><b>Ikon di layar HP.</b> Saat dipasang, Beranda tampil dengan ikon ini. Alamat yang direncanakan: smapmerdekasoreang99-star.github.io</div></div>
</div></main>
<script>
(function(){
  var kel=["siswa","guru","staf"],JUDUL={siswa:"Aplikasi Sekolah",guru:"Aplikasi Sekolah",staf:"Aplikasi Staf"},
    SUB={siswa:"Pilih aplikasi yang ingin dibuka. Simpan halaman ini di layar HP agar cukup mengingat satu alamat.",guru:"Pilih aplikasi yang ingin dibuka. Simpan halaman ini di layar HP agar cukup mengingat satu alamat.",
         staf:"Untuk operator, kurikulum, kesiswaan, tata usaha, dan pimpinan. Jangan bagikan alamat halaman ini ke siswa."};
  function pilih(k){if(kel.indexOf(k)<0)k="siswa";
    kel.forEach(function(x){document.getElementById(x).hidden=x!==k});
    document.querySelectorAll(".pilih a").forEach(function(a){a.setAttribute("aria-current",a.dataset.ke===k?"true":"false")});
    document.getElementById("judul").textContent=JUDUL[k];document.getElementById("sub").textContent=SUB[k];
    try{localStorage.setItem("pratinjau_kelompok",k)}catch(e){}}
  var awal=location.hash.slice(1);if(kel.indexOf(awal)<0){try{awal=localStorage.getItem("pratinjau_kelompok")}catch(e){awal=null}}
  pilih(awal);
  document.querySelectorAll(".pilih a").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();pilih(a.dataset.ke)})});
  window.addEventListener("hashchange",function(){pilih(location.hash.slice(1))});
})();
</script>
`;
fs.writeFileSync(path.join(SP, "beranda_pratinjau.html"), html);
console.log("ok", Math.round(html.length / 1024) + " KB");
