// State login
let isLoggedIn = false;
let currentUser = "";

// Data materi
const materiList = {
  matematika: {
    title: "Matematika - Penjumlahan",
    content:
      "Penjumlahan adalah proses menjumlahkan dua bilangan atau lebih. Contoh: 2 + 3 = 5",
  },
  ipa: {
    title: "IPA - Fotosintesis",
    content:
      "Fotosintesis adalah proses tumbuhan membuat makanan dari cahaya matahari.",
  },
  bahasa: {
    title: "Bahasa Indonesia - Kata Baku",
    content:
      "Kata baku adalah kata yang sesuai dengan kaidah bahasa Indonesia.",
  },
};

// Elemen DOM
const contentDiv = document.getElementById("content");
const authModal = document.getElementById("authModal");
const closeModal = document.querySelector(".close");
const authActionBtn = document.getElementById("authActionBtn");
const authTitle = document.getElementById("authTitle");
const switchToRegister = document.getElementById("switchToRegister");
const authMessage = document.getElementById("authMessage");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const logoutBtn = document.getElementById("logoutBtn");

// Fungsi untuk menampilkan halaman dashboard
function showDashboard() {
  if (!isLoggedIn) {
    authModal.style.display = "flex";
    return;
  }
  contentDiv.innerHTML = `
        <div class="card fade-in">
            <h2>Selamat Datang, ${currentUser}!</h2>
            <p>Pilih menu di atas untuk belajar.</p>
            <p> Fitur tersedia:</p>
            <ul>
                <li> Materi Pembelajaran</li>
                <li> Kuis Interaktif</li>
                <li> Login/Logout</li>
            </ul>
        </div>
    `;
}

// Fungsi tampil materi
function showMateri() {
  if (!isLoggedIn) {
    authModal.style.display = "flex";
    return;
  }
  contentDiv.innerHTML = `
        <div class="fade-in">
            <h2> Pilih Materi</h2>
            <div class="card" data-materi="matematika"> Matematika - Penjumlahan</div>
            <div class="card" data-materi="ipa"> IPA - Fotosintesis</div>
            <div class="card" data-materi="bahasa"> Bahasa Indonesia - Kata Baku</div>
            <div id="detailMateri" style="margin-top: 20px;"></div>
        </div>
    `;

  document.querySelectorAll("[data-materi]").forEach((card) => {
    card.addEventListener("click", (e) => {
      const materi = materiList[e.target.dataset.materi];
      document.getElementById("detailMateri").innerHTML = `
                <div class="card">
                    <h3>${materi.title}</h3>
                    <p>${materi.content}</p>
                </div>
            `;
    });
  });
}

// Fungsi kuis
function showKuis() {
  if (!isLoggedIn) {
    authModal.style.display = "flex";
    return;
  }
  contentDiv.innerHTML = `
        <div class="fade-in">
            <h2> Kuis Matematika</h2>
            <div class="card">
                <p><strong>Soal: 8 + 3 = ?</strong></p>
                <div class="quiz-option" data-jawaban="10">10</div>
                <div class="quiz-option" data-jawaban="11">11</div>
                <div class="quiz-option" data-jawaban="12">12</div>
                <p id="hasilKuis"></p>
                <button id="resetKuis"> Reset Skor</button>
            </div>
            <p>Skor Anda: <strong id="skor">0</strong></p>
        </div>
    `;

  let skor = 0;
  const skorElem = document.getElementById("skor");
  const hasilElem = document.getElementById("hasilKuis");

  document.querySelectorAll(".quiz-option").forEach((opt) => {
    opt.addEventListener("click", (e) => {
      if (opt.dataset.jawaban === "11") {
        hasilElem.innerHTML = " Jawaban Benar! +1 Skor";
        hasilElem.style.color = "green";
        skor++;
        skorElem.textContent = skor;
      } else {
        hasilElem.innerHTML = " Jawaban Salah! Coba lagi.";
        hasilElem.style.color = "red";
      }
      // Animasi fade
      hasilElem.classList.add("fade-in");
      setTimeout(() => hasilElem.classList.remove("fade-in"), 500);
    });
  });

  document.getElementById("resetKuis").addEventListener("click", () => {
    skor = 0;
    skorElem.textContent = skor;
    hasilElem.innerHTML = "Skor direset!";
    hasilElem.style.color = "orange";
  });
}

// Event menu
document.querySelectorAll("[data-menu]").forEach((menu) => {
  menu.addEventListener("click", (e) => {
    e.preventDefault();
    const pilihan = menu.dataset.menu;
    if (pilihan === "dashboard") showDashboard();
    else if (pilihan === "materi") showMateri();
    else if (pilihan === "kuis") showKuis();
  });
});

// LOGIN / REGISTER LOGIC
let isRegisterMode = false;

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  isRegisterMode = !isRegisterMode;
  if (isRegisterMode) {
    authTitle.textContent = "Register";
    authActionBtn.textContent = "Register";
    switchToRegister.textContent = "Sudah punya akun? Login";
  } else {
    authTitle.textContent = "Login";
    authActionBtn.textContent = "Login";
    switchToRegister.textContent = "Belum punya akun? Register";
  }
  authMessage.textContent = "";
});

authActionBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === "" || password === "") {
    authMessage.textContent = "Username & password tidak boleh kosong!";
    authMessage.style.color = "red";
    return;
  }

  if (isRegisterMode) {
    // Simpan data ke localStorage
    localStorage.setItem(username, password);
    authMessage.textContent = " Registrasi berhasil! Silakan login.";
    authMessage.style.color = "green";
    // Reset ke mode login
    setTimeout(() => {
      isRegisterMode = false;
      authTitle.textContent = "Login";
      authActionBtn.textContent = "Login";
      switchToRegister.textContent = "Belum punya akun? Register";
      usernameInput.value = "";
      passwordInput.value = "";
      authMessage.textContent = "";
    }, 1500);
  } else {
    // Login
    const storedPass = localStorage.getItem(username);
    if (storedPass && storedPass === password) {
      isLoggedIn = true;
      currentUser = username;
      authModal.style.display = "none";
      showDashboard();
      usernameInput.value = "";
      passwordInput.value = "";
      authMessage.textContent = "";
    } else {
      authMessage.textContent = " Username atau password salah!";
      authMessage.style.color = "red";
    }
  }
});

// Logout
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (isLoggedIn) {
    isLoggedIn = false;
    currentUser = "";
    showDashboard(); // akan minta login lagi
    authModal.style.display = "flex";
  } else {
    authModal.style.display = "flex";
  }
});

// Tutup modal
closeModal.addEventListener("click", () => {
  authModal.style.display = "none";
});

// Cek login awal
if (!isLoggedIn) {
  authModal.style.display = "flex";
}
