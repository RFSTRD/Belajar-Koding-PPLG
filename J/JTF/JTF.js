const form = document.getElementById('materiForm');
const tableBody = document.querySelector('#materiTable tbody');
const searchInput = document.getElementById('search');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nama = document.getElementById('nama').value.trim();
  const kategori = document.getElementById('kategori').value;
  const tingkat = document.getElementById('tingkat').value;

  if (nama.length < 3) {
    alert("Nama Materi minimal 3 karakter.");
    return;
  }

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${nama}</td>
    <td>${kategori}</td>
    <td>${tingkat}</td>
    <td><button onclick="hapusBaris(this)">Hapus</button></td>
  `;
  tableBody.appendChild(row);
  form.reset();
});

function hapusBaris(btn) {
  const row = btn.parentElement.parentElement;
  tableBody.removeChild(row);
}

searchInput.addEventListener('input', function() {
  const filter = this.value.toLowerCase();
  const rows = tableBody.querySelectorAll('tr');
  rows.forEach(row => {
    const nama = row.cells[0].textContent.toLowerCase();
    row.style.display = nama.includes(filter) ? '' : 'none';
  });
});
