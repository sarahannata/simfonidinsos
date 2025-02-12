async function login() {
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const data = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/api/admins/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = 'admin_beranda.html';
        } else {
            // Handle login failure
            alert('Login failed: Invalid username or password');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed: An error occurred');
    }
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('floatingPassword');
    const passwordToggle = document.getElementById('togglePasswordIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggle.classList.remove('bi-eye-slash');
        passwordToggle.classList.add('bi-eye');
    } else {
        passwordInput.type = 'password';
        passwordToggle.classList.remove('bi-eye');
        passwordToggle.classList.add('bi-eye-slash');
    }
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    login();
});
