document.addEventListener('DOMContentLoaded', function () {
    fetchCurrentAdmin();

    document.getElementById('registrationForm').addEventListener('submit', function (e) {
        e.preventDefault();
        showConfirmationModal();
    });

    window.logout = async function () {
        try {
            const response = await fetch('http://localhost:8080/api/admins/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                alert('Logged out!');
                window.location.href = 'index.html';
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
});

function showConfirmationModal() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageElement = document.getElementById('message');

    if (password !== confirmPassword) {
        messageElement.innerText = 'Password dan Konfirmasi Password tidak sesuai.';
        messageElement.classList.remove('text-success');
        messageElement.classList.add('text-danger');
        return;
    }

    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
}

async function addUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    const userData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch('http://localhost:8080/api/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            messageElement.innerText = 'User registered successfully!';
            messageElement.classList.remove('text-danger');
            messageElement.classList.add('text-success');
            document.getElementById('registrationForm').reset();
            const confirmationModal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal'));
            confirmationModal.hide();
        } else if (response.status === 409) {
            messageElement.innerText = 'Username already exists!';
            messageElement.classList.remove('text-success');
            messageElement.classList.add('text-danger');
        } else {
            messageElement.innerText = 'Failed to register user.';
            messageElement.classList.remove('text-success');
            messageElement.classList.add('text-danger');
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.innerText = 'Error registering user.';
        messageElement.classList.remove('text-success');
        messageElement.classList.add('text-danger');
    }
}

async function fetchCurrentAdmin() {
    try {
        const response = await fetch('http://localhost:8080/api/admins/current', {
            credentials: 'include'
        });

        if (response.ok) {
            const admin = await response.json();
            document.getElementById('usernameDisplay').innerText = admin.username;
        } else {
            console.error('Failed to fetch current admin');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
