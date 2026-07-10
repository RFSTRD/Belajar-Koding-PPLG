// ===== VARIABEL GLOBAL =====
let progress = localStorage.getItem("progress") || 0;
let xp = localStorage.getItem("xp") || 0;

// ===== UPDATE PROGRESS =====
function updateProgress() {
  let text = document.getElementById("progressText");
  let bar = document.getElementById("progressBar");

  if (text) text.innerText = progress + "%";
  if (bar) bar.style.width = progress + "%";
}

function tambahProgress() {
  progress = parseInt(progress) + 10;
  if (progress > 100) progress = 100;
  localStorage.setItem("progress", progress);
  updateProgress();
  updateBadge();
}
// ===== RESET SEMUA PROGRES =====
function resetSemuaProgres() {
  // Konfirmasi sebelum reset
  let konfirmasi = confirm(
    " PERINGATAN! \n\nReset progres akan menghapus:\n- Progress belajar (0%)\n- Semua XP yang didapat\n- Badge yang sudah diperoleh\n\nApakah Anda yakin ingin mereset semua progres?",
  );

  if (konfirmasi) {
    // Reset progress ke 0
    progress = 0;
    xp = 0;

    // Simpan ke localStorage
    localStorage.setItem("progress", progress);
    localStorage.setItem("xp", xp);

    // Update tampilan
    updateProgress();
    updateXPDisplay();
    updateBadge();

    // Reset badge appearance (kembalikan ke opacity-50)
    let badgePemula = document.querySelector(".badge-item:first-child");
    let badgeAktif = document.querySelector(".badge-item:nth-child(2)");
    let badgeMaster = document.querySelector(".badge-item:nth-child(3)");

    // Reset badge Pemula
    if (badgePemula) {
      badgePemula.classList.remove(
        "bg-gradient-to-r",
        "from-yellow-400",
        "to-orange-500",
        "text-white",
      );
      badgePemula.classList.add(
        "opacity-50",
        "bg-gray-200",
        "dark:bg-gray-700",
      );
    }
    if (badgeAktif) {
      badgeAktif.classList.remove(
        "bg-gradient-to-r",
        "from-blue-400",
        "to-purple-500",
        "text-white",
      );
      badgeAktif.classList.add("opacity-50", "bg-gray-200", "dark:bg-gray-700");
    }

    // Reset badge Master
    if (badgeMaster) {
      badgeMaster.classList.remove(
        "bg-gradient-to-r",
        "from-green-400",
        "to-emerald-500",
        "text-white",
      );
      badgeMaster.classList.add(
        "opacity-50",
        "bg-gray-200",
        "dark:bg-gray-700",
      );
    }

    // Tampilkan notifikasi sukses
    alert(
      "Semua progres berhasil direset ke 0!\n\nProgress: 0%\nXP: 0\nBadge: Belum ada",
    );

    console.log("Progres telah direset - Progress: 0%, XP: 0");
  } else {
    console.log("Reset progres dibatalkan");
  }
}

// ===== SISTEM XP DAN LEVEL =====
function updateXPDisplay() {
  let xpText = document.getElementById("xpText");
  let levelText = document.getElementById("levelText");

  if (xpText) xpText.innerText = xp;

  let level = Math.floor(parseInt(xp) / 100) + 1;
  if (levelText) levelText.innerText = "Level " + level;

  localStorage.setItem("xp", xp);
  updateBadge();
}

function tambahXP(nilai) {
  xp = parseInt(xp) + nilai;
  if (xp > 1000) xp = 1000;
  localStorage.setItem("xp", xp);
  updateXPDisplay();

  // Tampilkan notifikasi level up
  let levelBaru = Math.floor(xp / 100) + 1;
  let levelLama = Math.floor((xp - nilai) / 100) + 1;
  if (levelBaru > levelLama) {
    alert(`🎉 SELAMAT! Level Anda naik ke ${levelBaru}! 🎉`);
  }
}

function updateXPDariKuis(skor) {
  // Bonus XP berdasarkan skor kuis
  let bonus = skor * 10;
  tambahXP(bonus);
}

// ===== SISTEM BADGE =====
function updateBadge() {
  let xpValue = parseInt(xp);
  let progressValue = parseInt(progress);

  let badgePemula = document.querySelector(".badge-item:first-child");
  let badgeAktif = document.querySelector(".badge-item:nth-child(2)");
  let badgeMaster = document.querySelector(".badge-item:nth-child(3)");

  if (badgePemula) {
    if (xpValue >= 50 || progressValue >= 20) {
      badgePemula.classList.remove("opacity-50");
      badgePemula.classList.add(
        "bg-gradient-to-r",
        "from-yellow-400",
        "to-orange-500",
        "text-white",
      );
    }
  }

  if (badgeAktif) {
    if (xpValue >= 200 || progressValue >= 50) {
      badgeAktif.classList.remove("opacity-50");
      badgeAktif.classList.add(
        "bg-gradient-to-r",
        "from-blue-400",
        "to-purple-500",
        "text-white",
      );
    }
  }

  if (badgeMaster) {
    if (xpValue >= 500 || progressValue >= 100) {
      badgeMaster.classList.remove("opacity-50");
      badgeMaster.classList.add(
        "bg-gradient-to-r",
        "from-green-400",
        "to-emerald-500",
        "text-white",
      );
    }
  }
}

// ===== API DUMMYJSON =====
async function fetchMateriDariAPI() {
  try {
    const response = await fetch("https://dummyjson.com/posts?limit=3");
    const data = await response.json();

    localStorage.setItem("api_materi", JSON.stringify(data.posts));
    console.log("📡 Data dari DummyJSON:", data.posts);

    tampilkanMateriDariAPI();
    return data.posts;
  } catch (error) {
    console.error("Gagal fetch API:", error);
    return [];
  }
}

function tampilkanMateriDariAPI() {
  const materiContainer = document.getElementById("materi-api-container");
  if (!materiContainer) return;

  const materiAPI = localStorage.getItem("api_materi");
  if (!materiAPI) return;

  const materiList = JSON.parse(materiAPI);
  materiContainer.innerHTML = "";

  materiList.forEach((materi) => {
    const card = document.createElement("div");
    card.className = "glass-card rounded-2xl p-5 text-black dark:text-white";
    card.innerHTML = `
      <h3 class="text-xl font-bold mb-2">📖 ${materi.title}</h3>
      <p class="text-sm opacity-80 mb-3">${materi.body.substring(0, 100)}...</p>
      <button onclick="tambahProgressDanXPDariAPI()" class="bg-green-500 text-white px-4 py-2 rounded-lg text-sm w-full">
        ✅ Tandai Selesai (+10% progress, +20 XP)
      </button>
    `;
    materiContainer.appendChild(card);
  });
}

function tambahProgressDanXPDariAPI() {
  tambahProgress();
  tambahXP(20);
  alert("✅ Materi dari API selesai! Progress +10%, XP +20!");
}

// ===== WELCOME MESSAGE =====
function updateWelcomeMessage() {
  let user = localStorage.getItem("user");
  let el = document.getElementById("welcome");
  if (el && user) {
    el.innerText = "👋 Halo, " + user + "! Selamat belajar 🚀";
  } else if (el) {
    el.innerText = "📚 Dashboard E-Learning";
  }
}

// ===== DARK MODE =====
function toggleDark() {
  document.documentElement.classList.toggle("dark");
  document.body.classList.toggle("bg-gray-100");
  document.body.classList.toggle("dark:bg-gray-900");
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  // Cek login
  let isLogin = localStorage.getItem("login");
  if (!isLogin || isLogin !== "true") {
    if (!window.location.href.includes("login.html")) {
      window.location.href = "login.html";
    }
    return;
  }

  // Load data
  updateProgress();
  updateXPDisplay();
  updateWelcomeMessage();
  updateBadge();

  // Fetch API jika di halaman materi
  if (document.getElementById("materi-api-container")) {
    fetchMateriDariAPI();
  }

  // Update statistik di dashboard
  let totalMateriEl = document.getElementById("totalMateri");
  let totalKuisEl = document.getElementById("totalKuis");
  if (totalMateriEl) totalMateriEl.innerText = "8"; // 5 video + 3 API
  if (totalKuisEl) totalKuisEl.innerText = "5";
});
function logout() {
  localStorage.removeItem("login");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
