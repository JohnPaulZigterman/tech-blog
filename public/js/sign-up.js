async function signup(event) {
    event.preventDefault();

    const name = document.getElementById('signup-name');
    const email = document.getElementById('signup-email');
    const pass = document.getElementById('signup-pass');

    if (name && email && pass) {
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                pass
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

document.getElementById('signup-form').addEventListener('submit', signup);