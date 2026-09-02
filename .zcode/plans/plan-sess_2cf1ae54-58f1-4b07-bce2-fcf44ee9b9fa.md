## Rencana: Fitur Expand/Collapse Catatan

File yang diubah: `C:\Users\USER\Documents\Habib\ZCode\Aplikasi-aplikasi\catatan\index.html`

### Perilaku yang ditambahkan
1. **Isi catatan panjang dipotong (collapsed)** — jika isi > ~180 karakter, tampilkan hanya 180 karakter pertama dengan CSS `line-clamp` (maks 4 baris) dan tanda "…".
2. **Tombol toggle "Lihat selengkapnya" / "Tutup"** — ditambahkan di bawah isi, hanya muncul untuk catatan yang isinya panjang. Klik = expand (isi penuh), klik lagi = collapse (potongan).
3. **State expand disimpan per sesi** — `Set` berisi id catatan yang sedang expand (module-level), sehingga tetap terbuka saat re-render (cari/filter/edit). Tidak perlu dipersist ke localStorage/Supabase.
4. **Catatan pendek** (≤ 180 karakter) tetap tampil penuh tanpa tombol.
5. CSS baru: `.isi.dipotong` (line-clamp) dan tombol `.btn-toggle` yang konsisten dengan gaya dark-mode yang ada.

### Implementasi teknis
- Di `render()`: setelah membuat `p.isi`, cek `c.isi.length > 180`; jika ya, tambahkan tombol toggle dan set class `dipotong` sesuai status di `Set`.
- Handler toggle: flip status di `Set`, lalu update class + teks tombol pada elemen tersebut (tanpa re-render penuh agar scroll tidak lompat).

### Tes manual yang harus Anda lakukan + indikator keberhasilan
1. **Buat catatan panjang** (>180 karakter, misal 2–3 paragraf) → Indikator: tampil hanya ±4 baris diakhiri "…", ada tombol "Lihat selengkapnya".
2. **Klik "Lihat selengkapnya"** → Indikator: isi tampil penuh, teks tombol berubah jadi "Tutup".
3. **Klik "Tutup"** → Indikator: kembali terpotong, tombol kembali ke "Lihat selengkapnya".
4. **Toggle berkali-kali** → Indikator: expand/collapse konsisten, tidak ada error di console.
5. **Buat catatan pendek** (<180 karakter) → Indikator: tampil penuh, TIDAK ada tombol toggle.
6. **Expand 1 catatan, lalu ketik di kolom cari / ubah filter kategori** → Indikator: catatan yang di-expand tetap terbuka; catatan lain tetap collapsed.
7. **Refresh halaman** → Indikator: semua kembali collapsed (state expand per sesi, perilaku wajar).
8. **Edit catatan panjang menjadi pendek** lalu simpan → Indikator: tombol toggle hilang, isi tampil penuh. Sebaliknya, edit pendek jadi panjang → tombol muncul.
9. **Klik pin, Edit, Hapus pada catatan yang sedang expand** → Indikator: aksi tetap berfungsi normal, tidak mengganggu toggle.
10. **Mode gelap/terang (pengaturan sistem)** → Indikator: tombol dan teks terpotong tetap terbaca di kedua tema.