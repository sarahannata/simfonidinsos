document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('a[onclick="logout()"]').addEventListener('click', function (event) {
        event.preventDefault();
        logout();
    });

    async function fetchCurrentAdmin() {
        try {
            const response = await fetch('http://localhost:8080/api/admins/current');
            const admin = await response.json();
            document.getElementById('usernameDisplay').textContent = admin.username;
        } catch (error) {
            console.error('Error fetching current admin:', error);
        }
    }

    fetchCurrentAdmin();
    fetchLksData();
    fetchUserData();

    // Tambahkan event listener untuk submit form edit LKS
    document.getElementById('editLksForm').addEventListener('submit', function (event) {
        event.preventDefault();
        updateLks();
    });

    // Tambahkan event listener untuk submit form edit User
    document.getElementById('editUserForm').addEventListener('submit', function (event) {
        event.preventDefault();
        updateUser();
    });
});

async function fetchLksData() {
    try {
        const response = await fetch('http://localhost:8080/api/lks');
        const lksList = await response.json();
        console.log('LKS List:', lksList);
        if (Array.isArray(lksList)) {
            populateLksTable(lksList);
        } else {
            console.error('Error: Expected an array but got:', typeof lksList);
        }
    } catch (error) {
        console.error('Error fetching LKS data:', error);
    }
}

function populateLksTable(lksList) {
    const lksTableBody = document.getElementById('lksTableBody');
    lksTableBody.innerHTML = '';
    lksList.forEach((lks, index) => {
        const logoSrc = lks.uploadFoto ? `data:image/png;base64,${lks.uploadFoto}` : 'path/to/default/logo.png';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${logoSrc}" alt="Logo"></td>
            <td>${lks.namaLks}</td>
            <td class="operations">
                <i class="bi bi-pencil-square" title="Edit" onclick="openEditLksModal(${lks.id})"></i>
                <i class="bi bi-trash" title="Delete" onclick="showDeleteModal(${lks.id}, 'LKS')"></i>
            </td>
        `;
        lksTableBody.appendChild(row);
    });
}

function searchTable() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const rows = document.getElementById('lksTableBody').getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        const cells = row.getElementsByTagName('td');
        const namaLks = cells[2].textContent.toLowerCase();
        if (namaLks.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

async function openEditLksModal(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/lks/${id}`);
        if (response.ok) {
            const lks = await response.json();
            document.getElementById('editLksId').value = lks.id;
            document.getElementById('editNamaLks').value = lks.namaLks;
            document.getElementById('editPemilikLks').value = lks.pemilikLks;
            document.getElementById('editAlamatLks').value = lks.alamatLks;
            document.getElementById('editNomorAkteNotaris').value = lks.nomorAkteNotaris;
            document.getElementById('editTanggalAkteNotaris').value = lks.tanggalAkteNotaris.split('T')[0];
            document.getElementById('editKontakPengurus').value = lks.kontakPengurus;
            document.getElementById('editAkreditasi').value = lks.akreditasi;
            document.getElementById('editJenisLks').value = lks.jenisLks;
            document.getElementById('editJenisPelayanan').value = lks.jenisPelayanan;
            document.getElementById('editAwalTandaDaftar').value = lks.awalTandaDaftar.split('T')[0];
            document.getElementById('editAkhirTandaDaftar').value = lks.akhirTandaDaftar.split('T')[0];
            document.getElementById('editUploadFoto').value = '';

            const editLksModal = new bootstrap.Modal(document.getElementById('editLksModal'));
            editLksModal.show();
        } else {
            alert('Failed to fetch LKS data');
        }
    } catch (error) {
        console.error('Error fetching LKS data:', error);
    }
}

async function updateLks() {
    const id = document.getElementById('editLksId').value;
    const namaLks = document.getElementById('editNamaLks').value;
    const pemilikLks = document.getElementById('editPemilikLks').value;
    const alamatLks = document.getElementById('editAlamatLks').value;
    const nomorAkteNotaris = document.getElementById('editNomorAkteNotaris').value;
    const tanggalAkteNotaris = document.getElementById('editTanggalAkteNotaris').value;
    const kontakPengurus = document.getElementById('editKontakPengurus').value;
    const akreditasi = document.getElementById('editAkreditasi').value;
    const jenisLks = document.getElementById('editJenisLks').value;
    const jenisPelayanan = document.getElementById('editJenisPelayanan').value;
    const awalTandaDaftar = document.getElementById('editAwalTandaDaftar').value;
    const akhirTandaDaftar = document.getElementById('editAkhirTandaDaftar').value;
    const uploadFoto = document.getElementById('editUploadFoto').files[0];

    const formData = new FormData();
    formData.append('namaLks', namaLks);
    formData.append('pemilikLks', pemilikLks);
    formData.append('alamatLks', alamatLks);
    formData.append('nomorAkteNotaris', nomorAkteNotaris);
    formData.append('tanggalAkteNotaris', tanggalAkteNotaris);
    formData.append('kontakPengurus', kontakPengurus);
    formData.append('akreditasi', akreditasi);
    formData.append('jenisLks', jenisLks);
    formData.append('jenisPelayanan', jenisPelayanan);
    formData.append('awalTandaDaftar', awalTandaDaftar);
    formData.append('akhirTandaDaftar', akhirTandaDaftar);
    if (uploadFoto) {
        formData.append('uploadFoto', uploadFoto);
    }

    try {
        const response = await fetch(`http://localhost:8080/api/lks/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            alert('LKS updated successfully');
            fetchLksData();
            const editLksModal = bootstrap.Modal.getInstance(document.getElementById('editLksModal'));
            editLksModal.hide();
        } else {
            alert('Failed to update LKS');
        }
    } catch (error) {
        console.error('Error updating LKS:', error);
    }
}

async function deleteLks(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/lks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('LKS deleted successfully');
            fetchLksData();
        } else {
            alert('Failed to delete LKS');
        }
    } catch (error) {
        console.error('Error deleting LKS:', error);
    }
}

async function fetchUserData() {
    try {
        const response = await fetch('http://localhost:8080/api/users');
        const userList = await response.json();
        if (Array.isArray(userList)) {
            populateUserTable(userList);
        } else {
            console.error('Error: Expected an array but got:', typeof userList);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

function populateUserTable(userList) {
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    userList.forEach((user, index) => {
        const statusText = user.status ? 'Aktif' : 'Nonaktif';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${statusText}</td>
            <td class="operations">
                <i class="bi bi-pencil-square" title="Edit" onclick="openEditUserModal(${user.id})"></i>
                <i class="bi bi-trash" title="Delete" onclick="showDeleteModal(${user.id}, 'User')"></i>
                <i class="bi ${user.status ? 'bi-x-circle' : 'bi-check-circle'}" title="Toggle Status" onclick="toggleUserStatus(${user.id}, ${!user.status})"></i>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

function searchUserTable() {
    const searchInput = document.getElementById('searchUser').value.toLowerCase();
    const rows = document.getElementById('userTableBody').getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        const cells = row.getElementsByTagName('td');
        const username = cells[1].textContent.toLowerCase();
        if (username.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

async function openEditUserModal(id) {
    document.getElementById('editUserId').value = id;
    document.getElementById('editUsername').value = '';
    document.getElementById('editPassword').value = '';
    const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    editUserModal.show();
}

async function updateUser() {
    const id = document.getElementById('editUserId').value;
    const username = document.getElementById('editUsername').value;
    const password = document.getElementById('editPassword').value;

    const userData = {};
    if (username) {
        userData.username = username;
    }
    if (password) {
        userData.password = password;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/users/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('User updated successfully');
            fetchUserData();
            const editUserModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
            editUserModal.hide();
        } else {
            alert('Failed to update user');
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

async function showDeleteModal(id, type) {
    document.getElementById('deleteItemId').value = id;
    document.getElementById('deleteItemType').value = type;
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    confirmDeleteModal.show();
}

async function confirmDelete() {
    const id = document.getElementById('deleteItemId').value;
    const type = document.getElementById('deleteItemType').value;
    if (type === 'LKS') {
        await deleteLks(id);
    } else if (type === 'User') {
        await deleteUser(id);
    }
    const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
    confirmDeleteModal.hide();
}

async function deleteUser(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/users/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('User deleted successfully');
            fetchUserData();
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

async function toggleUserStatus(id, newStatus) {
    try {
        const response = await fetch(`http://localhost:8080/api/users/status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStatus)
        });

        if (response.ok) {
            alert('User status updated successfully');
            fetchUserData();
        } else {
            alert('Failed to update user status');
        }
    } catch (error) {
        console.error('Error updating user status:', error);
    }
}

async function logout() {
    try {
        const response = await fetch('http://localhost:8080/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            alert('Logged out!');
            window.location.href = 'loginadmin.html';
        } else {
            console.error('Failed to log out');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
