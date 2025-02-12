let lksId;

async function logout() {
    try {
        const response = await fetch('http://localhost:8080/api/users/logout', {
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
        const response = await fetch('http://localhost:8080/api/users/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('usernameDisplay').innerText = user.username;
            fetchLksProfile();
        } else {
            alert('Failed to fetch current user');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchLksProfile() {
    try {
        const response = await fetch(`http://localhost:8080/api/lks/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (response.ok) {
            const lksList = await response.json();
            if (lksList.length > 0) {
                const lks = lksList[0]; 
                lksId = lks.id; 
                document.getElementById('profileLksName').innerText = lks.namaLks;
                document.getElementById('profileLksTitle').innerText = lks.namaLks;
                document.getElementById('profileLksOwner').innerText = lks.pemilikLks;
                document.getElementById('profileLksAddress').innerText = lks.alamatLks;
                document.getElementById('profileLksContact').innerText = lks.kontakPengurus;
                document.getElementById('profileLksNotaris').innerText = `${lks.nomorAkteNotaris}, Tanggal: ${new Date(lks.tanggalAkteNotaris).toLocaleDateString()}`;
                document.getElementById('profileLksRegistration').innerText = `${new Date(lks.awalTandaDaftar).toLocaleDateString()} - ${new Date(lks.akhirTandaDaftar).toLocaleDateString()}`;
                document.getElementById('profileLksAccreditation').innerText = lks.akreditasi;
                document.getElementById('profileLksType').innerText = lks.jenisLks;
                document.getElementById('profileLksService').innerText = lks.jenisPelayanan;
                document.getElementById('profileImage').src = `data:image/png;base64,${lks.uploadFoto}`;

                document.getElementById('editNamaLks').value = lks.namaLks;
                document.getElementById('editPemilikLks').value = lks.pemilikLks;
                document.getElementById('editAlamatLks').value = lks.alamatLks;
                document.getElementById('editNomorAkteNotaris').value = lks.nomorAkteNotaris;
                document.getElementById('editTanggalAkteNotaris').value = new Date(lks.tanggalAkteNotaris).toISOString().split('T')[0];
                document.getElementById('editAwalTandaDaftar').value = new Date(lks.awalTandaDaftar).toISOString().split('T')[0];
                document.getElementById('editAkhirTandaDaftar').value = new Date(lks.akhirTandaDaftar).toISOString().split('T')[0];
                document.getElementById('editKontakPengurus').value = lks.kontakPengurus;
                document.getElementById('editAkreditasi').value = lks.akreditasi;
                document.getElementById('editJenisLks').value = lks.jenisLks;
                document.getElementById('editJenisPelayanan').value = lks.jenisPelayanan;

                // Menyembunyikan Button Jika User Sudah Mempunyai Profile
                document.getElementById('formDataLksButton').style.display = 'none';
            } else {
                alert('No LKS profile found for this user');
            }
        } else {
            alert('Failed to fetch LKS profile');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function editProfile() {
    document.getElementById('profileDisplay').style.display = 'none';
    document.getElementById('additionalInfo').style.display = 'none';
    document.getElementById('editProfileForm').style.display = 'block';
}

function cancelEdit() {
    document.getElementById('profileDisplay').style.display = 'block';
    document.getElementById('additionalInfo').style.display = 'block';
    document.getElementById('editProfileForm').style.display = 'none';
}

async function saveProfile() {
    const formData = new FormData();
    formData.append('namaLks', document.getElementById('editNamaLks').value);
    formData.append('pemilikLks', document.getElementById('editPemilikLks').value);
    formData.append('alamatLks', document.getElementById('editAlamatLks').value);
    formData.append('nomorAkteNotaris', document.getElementById('editNomorAkteNotaris').value);
    formData.append('tanggalAkteNotaris', document.getElementById('editTanggalAkteNotaris').value);
    formData.append('awalTandaDaftar', document.getElementById('editAwalTandaDaftar').value);
    formData.append('akhirTandaDaftar', document.getElementById('editAkhirTandaDaftar').value);
    formData.append('kontakPengurus', document.getElementById('editKontakPengurus').value);
    formData.append('akreditasi', document.getElementById('editAkreditasi').value);
    formData.append('jenisLks', document.getElementById('editJenisLks').value);
    formData.append('jenisPelayanan', document.getElementById('editJenisPelayanan').value);
    const uploadFoto = document.getElementById('editUploadFoto').files[0];
    if (uploadFoto) {
        formData.append('uploadFoto', uploadFoto);
    } else {
        formData.append('uploadFoto', new Blob());
    }

    try {
        const response = await fetch(`/api/lks/${lksId}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert('Failed to update LKS');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchCurrentUser);
