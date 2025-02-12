document.addEventListener('DOMContentLoaded', function() {
    // Mengisi opsi tahun pada dropdown
    function populateYearOptions() {
        const yearSelect = document.getElementById('tahunUpload');
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 15; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }

    // Mengambil pengguna saat ini dan menampilkan nama pengguna
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
                document.getElementById('profileLksName').innerText = user.namaLks;
                fetchLksProfile(user.id);
                fetchUserReports();
            } else {
                alert('Gagal mengambil data pengguna saat ini');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Mengecek apakah pengguna memiliki data LKS dan sembunyikan tombol jika ada
    async function fetchCurrentUser() {
        try {
            const response = await fetch('http://localhost:8080/api/users/current');
            const user = await response.json();
            document.getElementById('usernameDisplay').textContent = user.username;

            const lksResponse = await fetch(`http://localhost:8080/api/lks/user`);
            const lksList = await lksResponse.json();
            if (lksList.length > 0) {
                const namaLks = lksList[0].namaLks;
                document.getElementById('profileLksName').textContent = namaLks;
                document.getElementById('formDataLksButton').style.display = 'none'; // Menyembunyikan tombol "Form Data LKS" jika user memiliki data LKS
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    }

    // Fungsi logout
    async function logout() {
        try {
            const response = await fetch('http://localhost:8080/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                alert('Logout gagal');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Mengunggah laporan
    async function uploadLaporan() {
        const fileInput = document.getElementById('inputGroupFile04');
        const tahunSelect = document.getElementById('tahunUpload');
        const triwulanSelect = document.getElementById('triwulanSelect');

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        formData.append('tahunUploadLaporan', tahunSelect.value);
        formData.append('periode', triwulanSelect.value);

        try {
            const response = await fetch('http://localhost:8080/api/laporan', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                alert('Laporan berhasil diunggah');
                fetchUserReports();
            } else {
                alert('Gagal mengunggah laporan');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Mengambil riwayat laporan pengguna
    async function fetchUserReports() {
        try {
            const response = await fetch('http://localhost:8080/api/laporan/my-reports', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const laporanList = await response.json();
                const tbody = document.querySelector('tbody');
                tbody.innerHTML = ''; // Menghapus baris yang ada

                laporanList.forEach(laporan => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${new Date(laporan.uploadDate).toLocaleDateString()}</td>
                        <td>${laporan.tahunUploadLaporan}</td>
                        <td>${laporan.periode}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                alert('Gagal mengambil riwayat laporan');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    document.querySelector('a[onclick="logout()"]').addEventListener('click', logout);
    document.querySelector('#inputGroupFileAddon04').addEventListener('click', uploadLaporan);

    populateYearOptions();
    fetchCurrentUser();
});
