document.addEventListener('DOMContentLoaded', function () {
    fetchLksData();
    fetchCurrentUser();

    async function fetchLksData() {
        try {
            const response = await fetch('http://localhost:8080/api/lks');
            if (response.ok) {
                const lksList = await response.json();
                displayLksData(lksList);
            } else {
                console.error('Failed to fetch LKS data');
            }
        } catch (error) {
            console.error('Error fetching LKS data:', error);
        }
    }

    function displayLksData(lksList) {
        const infoTerkiniContainer = document.querySelector('.info-terkini');
        infoTerkiniContainer.innerHTML = '';

        lksList.forEach((lks, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const imgSrc = `data:image/jpeg;base64,${lks.uploadFoto}`;

            card.innerHTML = `
                <img src="${imgSrc}" class="card-img-top" alt="${lks.namaLks}" />
                <div class="card-body">
                    <h5 class="card-title">${lks.namaLks}</h5>
                    <p class="card-text">Alamat: ${lks.alamatLks}</p>
                </div>
            `;

            card.style.animationDelay = `${index * 0.1}s`;
            infoTerkiniContainer.appendChild(card);
        });

        const cards = document.querySelectorAll('.info-terkini .card');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => observer.observe(card));
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

    document.querySelector('a[onclick="logout()"]').addEventListener('click', function (event) {
        event.preventDefault();
        logout();
    });

    async function fetchCurrentUser() {
        try {
            const response = await fetch('http://localhost:8080/api/admins/current');
            const admin = await response.json();
            document.getElementById('usernameDisplay').textContent = admin.username;
        } catch (error) {
            console.error('Error fetching current admin:', error);
        }
    }
});
