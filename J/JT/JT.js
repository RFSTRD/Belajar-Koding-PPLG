function addRow() { 
    let table = document.getElementById("myTable").getElementsByTagName('tbody')[0]; 
    let newRow = table.insertRow(); 
    let title = prompt("Masukkan judul:"); 
    let author = prompt("Masukkan pengarang:"); 
    let year = prompt("Masukkan tahun terbit:"); 
    let cell1 = newRow.insertCell(0); 
    let cell2 = newRow.insertCell(1); 
    let cell3 = newRow.insertCell(2); 
    cell1.innerHTML = title; 
    cell2.innerHTML = author; 
    cell3.innerHTML = year; 
}