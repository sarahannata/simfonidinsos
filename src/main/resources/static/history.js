document.addEventListener('DOMContentLoaded', function () {
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

    document.querySelector('a[onclick="logout()"]').addEventListener('click', logout);

    fetchLaporan();
});

async function fetchLaporan() {
    try {
        const response = await fetch('http://localhost:8080/api/laporan');
        const laporanList = await response.json();
        populateLaporanTable(laporanList);
    } catch (error) {
        console.error('Error fetching laporan:', error);
    }
}

function populateLaporanTable(laporanList) {
    const historyTableBody = document.getElementById('history-table-body');
    historyTableBody.innerHTML = '';
    laporanList.forEach(laporan => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${laporan.id}</td>
            <td>${laporan.periode}</td>
            <td>${laporan.namaLks}</td>
            <td>
                <button class="btn btn-link" onclick="downloadLaporan(${laporan.id})">
                    <i class="bi bi-download"></i>
                </button>
            </td>
            <td>${laporan.uploadDate}</td>
            <td class="actions">
                <button onclick="deleteEntry(${laporan.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        historyTableBody.appendChild(row);
    });
}

function searchTable() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const tableBody = document.getElementById('history-table-body');
    const rows = tableBody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const cells = row.getElementsByTagName('td');
        const name = cells[2].textContent.toLowerCase();
        const triwulan = cells[1].textContent.toLowerCase();
        if (name.includes(searchInput) || triwulan.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterTable() {
    const filterInput = document.getElementById('filterInput').value.toLowerCase();
    const tableBody = document.getElementById('history-table-body');
    const rows = tableBody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const cells = row.getElementsByTagName('td');
        const triwulan = cells[1].textContent.toLowerCase();
        if (triwulan.includes(filterInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

async function downloadAll() {
    try {
        const response = await fetch('http://localhost:8080/api/laporan/download/all');
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'all_laporan.zip';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            alert('Failed to download all files');
        }
    } catch (error) {
        console.error('Error downloading all files:', error);
    }
}

async function downloadLaporan(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/laporan/download/${id}`);
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `laporan_${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            alert('Failed to download laporan');
        }
    } catch (error) {
        console.error('Error downloading laporan:', error);
    }
}

async function deleteEntry(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        try {
            const response = await fetch(`http://localhost:8080/api/laporan/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Laporan deleted successfully');
                fetchLaporan();
            } else {
                alert('Failed to delete laporan');
            }
        } catch (error) {
            console.error('Error deleting laporan:', error);
        }
    }
}

async function logout() {
    try {
        const response = await fetch('http://localhost:8080/api/admins/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            window.location.href = 'loginadmin.html';
        } else {
            alert('Logout failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
