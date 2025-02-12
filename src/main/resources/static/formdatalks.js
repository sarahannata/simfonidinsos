document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentUser();

    const form = document.getElementById('lksForm');
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            createLks();
        }
        form.classList.add('was-validated');
    });

    document.querySelector('.cancel-btn').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'profile.html';
    });
});

async function createLks() {
    const formData = new FormData();
    formData.append('namaLks', document.getElementById('nama-lks').value);
    formData.append('pemilikLks', document.getElementById('pemilik-lks').value);
    formData.append('alamatLks', document.getElementById('alamat-lks').value);
    formData.append('nomorAkteNotaris', document.getElementById('nomor-akte-notaris').value);
    formData.append('tanggalAkteNotaris', document.getElementById('tanggal-akte-notaris').value);
    formData.append('awalTandaDaftar', document.getElementById('awal-tanda-daftar').value);
    formData.append('akhirTandaDaftar', document.getElementById('akhir-tanda-daftar').value);
    formData.append('kontakPengurus', document.getElementById('kontak-pengurus').value);
    formData.append('akreditasi', document.getElementById('akreditasi').value);
    formData.append('jenisLks', document.getElementById('jenis-lks').value);
    formData.append('jenisPelayanan', document.getElementById('jenis-pelayanan').value);
    formData.append('uploadFoto', document.getElementById('upload-Foto').files[0]);

    try {
        const response = await fetch('/api/lks', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (response.ok) {
            window.location.href = 'profile.html';
        } else {
            alert('Failed to create LKS');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function logout() {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Logout failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchCurrentUser() {
    try {
        const response = await fetch('/api/users/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('usernameDisplay').innerText = user.username;
            document.getElementById('profileLksName').innerText = user.namaLks;
        } else {
            alert('Failed to fetch current user');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
