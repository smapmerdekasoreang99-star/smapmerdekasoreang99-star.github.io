// Ikon Beranda: kotak biru tua bergradasi, 4 ubin putih (2x2), garis emas di bawah — gaya ikon aplikasi lain.
const fs = require("fs"), zlib = require("zlib"), path = require("path");
const out = process.argv[2];
function crc32(b) { let c, t = crc32.t || (crc32.t = Array.from({ length: 256 }, (_, n) => { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; }));
  c = 0xffffffff; for (const x of b) c = t[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const l = Buffer.alloc(4); l.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, c]); }
function png(w, h, rgba) { const raw = Buffer.alloc((w * 4 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4); }
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ih), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]); }
// jarak bertanda ke kotak membulat (pusat cx,cy, setengah ukuran hx,hy, jari r)
const rr = (x, y, cx, cy, hx, hy, r) => { const qx = Math.abs(x - cx) - hx + r, qy = Math.abs(y - cy) - hy + r; return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r; };
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const ATAS = hex("#33465E"), BAWAH = hex("#16212E"), PUTIH = [255, 255, 255], EMAS = hex("#E0B54A");
function gambar(N, maskable) {
  const S = 4, buf = Buffer.alloc(N * N * 4);
  // isi digambar pada kanvas 0..1; maskable: latar penuh, isi dikecilkan ke zona aman 80%
  const sk = maskable ? 0.78 : 1, o = (1 - sk) / 2;
  for (let py = 0; py < N; py++) for (let px = 0; px < N; px++) {
    let acc = [0, 0, 0, 0];
    for (let sy = 0; sy < S; sy++) for (let sx = 0; sx < S; sx++) {
      const X = (px + (sx + .5) / S) / N, Y = (py + (sy + .5) / S) / N;
      let warna = null, a = 0;
      const bg = maskable ? -1 : rr(X, Y, .5, .5, .5, .5, .19);
      if (bg <= 0) { warna = mix(ATAS, BAWAH, Y); a = 1;
        const x = (X - o) / sk, y = (Y - o) / sk;
        // 4 ubin
        for (const [cx, cy] of [[.37, .35], [.63, .35], [.37, .61], [.63, .61]]) if (rr(x, y, cx, cy, .1, .1, .035) <= 0) warna = PUTIH;
        // ubin kanan bawah berongga sedikit lebih gelap? tidak — sederhana saja. Garis emas:
        if (rr(x, y, .5, .82, .1, .014, .014) <= 0) warna = EMAS;
      }
      if (a) { acc[0] += warna[0]; acc[1] += warna[1]; acc[2] += warna[2]; acc[3] += 1; }
    }
    const n = S * S, i = (py * N + px) * 4;
    if (acc[3]) { buf[i] = Math.round(acc[0] / acc[3]); buf[i + 1] = Math.round(acc[1] / acc[3]); buf[i + 2] = Math.round(acc[2] / acc[3]); }
    buf[i + 3] = Math.round(255 * acc[3] / n);
  }
  return png(N, N, buf);
}
fs.mkdirSync(out, { recursive: true });
if (process.argv[3]) { for (const n of process.argv[3].split(",").map(Number)) fs.writeFileSync(path.join(out, `ikon-${n}.png`), gambar(n, 0)); console.log("ok"); process.exit(0); }
for (const [nama, N, m] of [["ikon-32.png", 32, 0], ["ikon-192.png", 192, 0], ["ikon-512.png", 512, 0], ["ikon-maskable-192.png", 192, 1], ["ikon-maskable-512.png", 512, 1], ["apple-touch-icon.png", 180, 1]])
  fs.writeFileSync(path.join(out, nama), gambar(N, m));
console.log("ok");
