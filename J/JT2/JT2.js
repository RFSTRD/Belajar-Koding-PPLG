function validateForm () {
    let nama = document.getElementById("nama").value;
    let email = document.getElementById("email").value;
    let nomor = document.getElementById("Nomor").value;
    let alamat = document.getElementById("Alamat").value;

    if (nama == "" || email == "" || nomor == "" || alamat == "") {
        alert ("Semua field harus diisi!");
        return false;
    }
    return true;
}