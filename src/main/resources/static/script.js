document.addEventListener('DOMContentLoaded', function () {
    fetchLksData();
    fetchCurrentUser();

    async function fetchLksData() {
        try {
            const response = await fetch('http://localhost:8080/api/lks');
            const lksList = await response.json();
            displayLksData(lksList);
            observeCards(); // Panggil fungsi ini setelah menampilkan data LKS
        } catch (error) {
            console.error('Error fetching LKS data:', error);
        }
    }

    function displayLksData(lksList) {
        const infoTerkiniContainer = document.querySelector('.info-terkini');
        infoTerkiniContainer.innerHTML = '';

        lksList.forEach(lks => {
            const card = document.createElement('div');
            card.classList.add('card', 'animate-card');

            const imgSrc = `data:image/jpeg;base64,${lks.uploadFoto}`;

            card.innerHTML = `
                <img src="${imgSrc}" class="card-img-top" alt="${lks.namaLks}" />
                <div class="card-body">
                    <h5 class="card-title">${lks.namaLks}</h5>
                    <p class="card-text">${lks.alamatLks}</p>
                </div>
            `;

            infoTerkiniContainer.appendChild(card);
        });
    }

    async function fetchCurrentUser() {
        try {
            const response = await fetch('http://localhost:8080/api/users/current', {
                credentials: 'include' // Ini penting untuk mengirim cookie sesi
            });

            if (response.ok) {
                const user = await response.json();
                document.getElementById('usernameDisplay').textContent = user.username; // Set nama pengguna di elemen HTML

                const lksResponse = await fetch(`http://localhost:8080/api/lks/user`);
                const lksList = await lksResponse.json();
                if (lksList.length > 0) {
                    const namaLks = lksList[0].namaLks;
                    document.getElementById('profileLksName').textContent = namaLks;
                    document.getElementById('formDataLksButton').style.display = 'none'; // Menyembunyikan tombol "Form Data LKS" jika user memiliki data LKS
                }
            } else {
                console.error('Failed to fetch current user, status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    }

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

    function observeCards() {
        const cards = document.querySelectorAll('.animate-card');
        const observerOptions = {
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(card);
        });
    }

    document.querySelector('a[onclick="logout()"]').addEventListener('click', function (event) {
        event.preventDefault();
        logout();
    });
});