// Versi laptop Beranda: dari pratinjau → 2 berkas HTML mandiri (umum, lengkap+staf) + ikon .ico.
const fs = require("fs"), path = require("path"), zlib = require("zlib");
const SP = process.argv[2], OUT = process.argv[3];
const src = fs.readFileSync(path.join(SP, "beranda_pratinjau.html"), "utf8");
const satu = (s, a, b) => { const n = s.split(a).length - 1; if (n !== 1) throw new Error(`ditemukan ${n}x: ${a.slice(0, 80)}`); return s.split(a).join(b); };
const potong = (s, awal, akhir) => { const i = s.indexOf(awal); if (i < 0) throw new Error("tidak ada: " + awal.slice(0, 60)); const j = s.indexOf(akhir, i); if (j < 0) throw new Error("akhir: " + akhir); return s.slice(0, i) + s.slice(j + akhir.length); };
const ikonPng = fs.readFileSync("C:/Development/system_sekolah/beranda/assets/ikon-32.png").toString("base64");

function buat(lengkap) {
  let s = src;
  s = satu(s, "<title>Beranda Aplikasi Sekolah</title>\n<meta name=\"claude:viewport-fit-sides\" content=\"cover\">\n", "");
  s = potong(s, '<div class="rencana">', "</div></div>\n");
  s = satu(s, "localStorage.setItem(\"pratinjau_kelompok\"", "localStorage.setItem(\"beranda_kelompok\"");
  s = satu(s, "localStorage.getItem(\"pratinjau_kelompok\")", "localStorage.getItem(\"beranda_kelompok\")");
  s = potong(s, '<div class="pasang">', "</div></div>\n");
  s = satu(s, "</div></main>", `  <p class="kaki">Versi laptop. Membuka aplikasi memerlukan internet.${lengkap ? " Berisi bagian Staf: pasang hanya di laptop staf." : ""}</p>\n</div></main>`);
  s = satu(s, "@media (max-width:420px)", ".kaki{margin-top:48px;padding-top:16px;border-top:1px solid var(--garis);color:var(--tinta-3);font-size:13px}\n@media (max-width:420px)");
  { const t="Pilih aplikasi yang ingin dibuka. Simpan halaman ini di layar HP agar cukup mengingat satu alamat."; if (s.split(t).length!==4) throw new Error("sub"); s = s.split(t).join("Pilih aplikasi yang ingin dibuka. Aplikasi terbuka di tab baru, halaman ini tetap ada."); }
  if (lengkap) {
    s = satu(s, '<span class="sendiri">halaman terpisah</span>', "");
    s = potong(s, '<p class="catatan-staf">', "</p>\n");
  } else {
    s = satu(s, '\n    <a href="#staf" data-ke="staf">Staf<span class="sendiri">halaman terpisah</span></a>', "");
    s = potong(s, '  <div class="kelompok" id="staf" hidden>', "</section>\n  </div>\n");
    s = satu(s, 'var kel=["siswa","guru","staf"]', 'var kel=["siswa","guru"]');
  }
  const k = s.indexOf("</style>\n") + "</style>\n".length;
  const judul = lengkap ? "Aplikasi Sekolah (Staf) — SMA Plus Merdeka Soreang" : "Aplikasi Sekolah — SMA Plus Merdeka Soreang";
  return `<!doctype html>\n<html lang="id">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${judul}</title>\n<link rel="icon" type="image/png" href="data:image/png;base64,${ikonPng}">\n${s.slice(0, k)}</head>\n<body>\n${s.slice(k)}</body>\n</html>\n`;
}

// .ico berisi PNG (didukung Windows Vista ke atas): 16, 32, 48, 256 dari gambar ikon Beranda
function ico(pngs) {
  const h = Buffer.alloc(6); h.writeUInt16LE(0, 0); h.writeUInt16LE(1, 2); h.writeUInt16LE(pngs.length, 4);
  let off = 6 + 16 * pngs.length; const dir = [], data = [];
  for (const [n, b] of pngs) { const d = Buffer.alloc(16); d[0] = n >= 256 ? 0 : n; d[1] = n >= 256 ? 0 : n; d.writeUInt16LE(1, 4); d.writeUInt16LE(32, 6); d.writeUInt32LE(b.length, 8); d.writeUInt32LE(off, 12); off += b.length; dir.push(d); data.push(b); }
  return Buffer.concat([h, ...dir, ...data]);
}
fs.mkdirSync(path.join(OUT, "berkas"), { recursive: true });
fs.writeFileSync(path.join(OUT, "berkas", "beranda.html"), buat(false));
fs.writeFileSync(path.join(OUT, "berkas", "beranda-staf.html"), buat(true));
// ikon: pakai pembuat ikon yang sama ke folder sementara
const tmp = path.join(SP, "ikon_ico"); require("child_process").execFileSync("node", [path.join(__dirname, "buat_ikon.js"), tmp, "16,32,48,256"]);
fs.writeFileSync(path.join(OUT, "berkas", "beranda.ico"), ico([16, 32, 48, 256].map((n) => [n, fs.readFileSync(path.join(tmp, `ikon-${n}.png`))])));
console.log("ok");
