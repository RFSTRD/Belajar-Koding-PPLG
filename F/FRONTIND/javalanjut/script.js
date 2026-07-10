const luasPersegiPanjang = (p, l) => p * l;

const luasSegitiga = (a, t) => 0.5 * a * t;

const luasLingkaran = (r) => 3.14 * r * r;

const volumeKubus = (s) => s * s * s;

const kelilingPersegi = (s) => 4 * s;

function tampilkanHasil(nilai) {
  document.getElementById("hasil").innerText = "Hasil Perhitungan: " + nilai;

  let pesan = "";

  if (nilai > 50) {
    pesan = "Hasil besar";
  } else {
    pesan = "Hasil kecil";
  }

  document.getElementById("pesan").innerText = pesan;
}

function prosesHitung() {
  const materi = document.getElementById("materi").value;

  const n1 = parseFloat(document.getElementById("nilai1").value);

  const n2 = parseFloat(document.getElementById("nilai2").value);

  if (isNaN(n1)) {
    alert("Nilai belum diisi!");
    return;
  }

  let hasil = 0;

  if (materi === "pp") {
    hasil = luasPersegiPanjang(n1, n2);
  } else if (materi === "segitiga") {
    hasil = luasSegitiga(n1, n2);
  } else if (materi === "lingkaran") {
    hasil = luasLingkaran(n1);
  } else if (materi === "kubus") {
    hasil = volumeKubus(n1);
  } else if (materi === "keliling") {
    hasil = kelilingPersegi(n1);
  }

  tampilkanHasil(hasil);
}
function tampilRegister() {
  document.getElementById("registerBox").style.display = "block";
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("container").style.display = "none";
}

function tampilLogin() {
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("container").style.display = "none";
}

function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  if (user === "" || pass === "") {
    alert("Isi username dan password!");
    return;
  }

  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);

  alert("Register berhasil!");
}

function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let simpanUser = localStorage.getItem("username");
  let simpanPass = localStorage.getItem("password");

  if (user === simpanUser && pass === simpanPass) {
    localStorage.setItem("loginStatus", "true");

    document.getElementById("userStatus").innerText = "Login sebagai: " + user;

    alert("Login berhasil");
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("container").style.display = "block";
  } else {
    alert("Username atau password salah");
  }
}

function logout() {
  localStorage.removeItem("loginStatus");

  document.getElementById("userStatus").innerText = "Belum login";

  alert("Logout berhasil");
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("container").style.display = "none";
}
function pilihMateri(materiDipilih) {
  document.getElementById("materi").value = materiDipilih;
}
