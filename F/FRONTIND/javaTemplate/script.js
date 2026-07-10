// =======================
// ANIMASI MASUK HALAMAN
// =======================
window.addEventListener("load", () => {
  document.body.classList.add("show");
});

// =======================
// PINDAH HALAMAN
// =======================
function pindahHalaman(url) {
  document.body.classList.remove("show");
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = url;
  }, 400);
}

// =======================
// VALIDASI INPUT
// =======================
function cekInput() {
  const namaInput = document.getElementById("nama");

  if (!namaInput) return;

  let nama = namaInput.value;

  if (nama.trim() === "") {
    alert("Nama tidak boleh kosong!");
  } else {
    alert("Selamat datang, " + nama);
  }
}

// =======================
// SISTEM SKOR
// =======================
let skor = 0;

function cekJawaban() {
  const input = document.getElementById("jawaban");
  const hasil = document.getElementById("hasil");
  const skorEl = document.getElementById("skor");

  if (!input || !hasil || !skorEl) return;

  let jawaban = input.value;

  if (jawaban === "") {
    alert("Jawaban tidak boleh kosong!");
    return;
  }

  if (parseInt(jawaban) === 2) {
    skor += 10;
    hasil.innerText = "✅ Benar!";
  } else {
    hasil.innerText = " Salah!";
  }

  skorEl.innerText = skor;
}

// =======================
// RESET KUIS
// =======================
function resetKuis() {
  skor = 0;

  const skorEl = document.getElementById("skor");
  const jawaban = document.getElementById("jawaban");
  const hasil = document.getElementById("hasil");
  const nama = document.getElementById("nama");

  if (skorEl) skorEl.innerText = 0;
  if (jawaban) jawaban.value = "";
  if (hasil) hasil.innerText = "";
  if (nama) nama.value = "";
}
