# Aplikasi Pribadi

Kumpulan aplikasi web pribadi dengan satu halaman beranda sebagai penghubung.
Semua gratis — dihosting di **GitHub Pages**, dengan opsi database gratis via **Supabase**.

```
├── index.html        ← BERANDA (halaman penghubung semua aplikasi)
├── css/style.css     ← tampilan beranda
├── js/apps.js        ← daftar aplikasi (tambah app = edit 1 baris)
├── kalkulator/       ← app contoh #1 (statis)
└── catatan/          ← app contoh #2 (simpan data di browser / Supabase)
```

## Cara upload ke internet (GitHub Pages) — gratis

1. Buat akun di [github.com](https://github.com) jika belum punya.
2. Klik **+** di kanan atas → **New repository**.
   - Nama bebas, misal `aplikasi-saya`.
   - Pilih **Public**, jangan centang "Add a README".
3. Upload isi folder ini ke repo tersebut. Dua cara:
   - **Cara mudah (tanpa install apa pun):** di halaman repo, klik **uploading an existing file**, seret semua file di dalam folder ini (bukan foldernya), lalu **Commit changes**.
   - **Cara Git (lebih rapi untuk jangka panjang):**
     ```bash
     cd Aplikasi-aplikasi
     git init
     git add .
     git commit -m "Aplikasi pribadi pertama"
     git branch -M main
     git remote add origin https://github.com/USERNAME/aplikasi-saya.git
     git push -u origin main
     ```
4. Aktifkan GitHub Pages: di repo, buka **Settings → Pages** →
   Source: **Deploy from a branch**, Branch: **main** / **/(root)** → **Save**.
5. Tunggu 1–2 menit. Situs online di:
   `https://USERNAME.github.io/aplikasi-saya/`

## Cara menambah aplikasi baru

1. Buat folder baru, misal `todo/`, berisi minimal satu `index.html`.
2. Buka `js/apps.js`, tambahkan entri baru:
   ```js
   {
     id: "todo",           // = nama folder
     nama: "Daftar Tugas",
     ikon: "✅",
     deskripsi: "Kelola daftar tugas harian.",
     soon: false,          // true = tampil sebagai "Segera hadir"
   },
   ```
3. Kartunya otomatis muncul di beranda.

## Aplikasi yang butuh simpan data online (database)

App `catatan/` sudah siap dua mode:

- **Mode default:** data disimpan di `localStorage` (hanya di browser itu) — jalan langsung tanpa setup.
- **Mode online (gratis):** pakai [Supabase](https://supabase.com) — data tersimpan di PostgreSQL dan bisa diakses dari HP/laptop mana pun. Fitur: judul, kategori, pencarian, pin, edit & hapus.

### Setup Supabase untuk Catatan (5 menit)

1. Daftar gratis di [supabase.com](https://supabase.com), klik **New project** (nama & password bebas, region terdekat: Singapore).
2. Setelah project jadi, buka **SQL Editor** (ikon di sidebar kiri) → **New query**, tempel SQL ini lalu klik **Run**:
   ```sql
   create table catatan (
     id bigint generated always as identity primary key,
     judul text not null default '',
     isi text not null default '',
     kategori text not null default '',
     pinned boolean not null default false,
     created_at timestamptz not null default now(),
     updated_at timestamptz not null default now()
   );
   alter table catatan enable row level security;
   create policy "akses publik" on catatan
     for all using (true) with check (true);
   ```
3. Buka **Settings → API** (atau Project Settings → Data API), salin:
   - **Project URL**, contoh `https://xxxx.supabase.co`
   - **anon public key**
4. Buka `catatan/index.html`, isi kedua konstanta di bagian atas `<script>`:
   ```js
   const SUPABASE_URL = "https://xxxx.supabase.co";
   const SUPABASE_KEY = "eyJhbGciOi...";
   ```
5. Selesai — semua perangkat yang membuka aplikasi ini (PC & HP) kini memakai data yang sama dari Supabase. Catatan lama yang masih di localStorage satu browser akan digantikan tampilannya oleh data online.

> Catatan keamanan: anon key aman dipakai di frontend karena tabel dilindungi Row Level Security dengan policy "akses publik" di atas — siapa pun yang tahu URL aplikasi bisa baca/tulis catatan. Jika isi catatan bersifat rahasia, aktifkan **Supabase Auth** terlebih dahulu sebelum membagikan link.

Supabase gratis tier cukup untuk aplikasi pribadi (500 MB database, 50.000 request/bulan).

## Tips penting soal "gratis"

- **GitHub Pages** hanya untuk situs statis (HTML/JS/CSS) — semua app di sini memang statis. Tidak ada biaya, tidak ada server.
- Untuk database, **Supabase** yang dipakai langsung dari frontend (tanpa backend). Jangan simpan data sensitif/pribadi lain orang — keamanannya mengandalkan Row Level Security.
- Kalau suatu saat butuh backend sungguhan (API server), alternatif gratis: **Cloudflare Workers/Pages Functions**, **Render**, atau **Vercel**.
