async function login(event) {
    event.preventDefault();

    const name = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (name && password) {
        const res = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                name: name,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(res.statusText);
        }
    }
}

document.getElementById('login-form').addEventListener('submit', login);