// Daftar semua aplikasi.
// Untuk MENAMBAH aplikasi baru:
//   1. Buat folder baru, misal "todo/", berisi index.html
//   2. Tambahkan satu entri di daftar di bawah ini
// Kosongkan deskripsi & set soon: true untuk menampilkan kartu "Segera hadir".
const APPS = [
  {
    id: "kalkulator",
    nama: "Kalkulator",
    ikon: "🧮",
    deskripsi: "Kalkulator sederhana untuk hitung-hitungan sehari-hari.",
    soon: false,
  },
  {
    id: "catatan",
    nama: "Catatan",
    ikon: "📝",
    deskripsi: "Catatan pribadi dengan kategori, pencarian & pin. Bisa diakses dari PC maupun HP.",
    soon: false,
  },
  {
    id: "todo",
    nama: "Daftar Tugas",
    ikon: "✅",
    deskripsi: "Kelola daftar tugas harian.",
    soon: true, // ganti ke false setelah folder todo/ dibuat
  },
];

const grid = document.getElementById("app-grid");

APPS.forEach((app) => {
  const card = document.createElement("a");
  if (app.soon) {
    card.className = "card";
    card.innerHTML = `
      <span class="icon">${app.ikon}</span>
      <h2>${app.nama}</h2>
      <p>${app.deskripsi}</p>
      <span class="soon">Segera hadir</span>
    `;
  } else {
    card.className = "card";
    card.href = `${app.id}/`;
    card.innerHTML = `
      <span class="icon">${app.ikon}</span>
      <h2>${app.nama}</h2>
      <p>${app.deskripsi}</p>
    `;
  }
  grid.appendChild(card);
});
