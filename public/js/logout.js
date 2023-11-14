async function logout() {
    const res = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        document.location.replace('/');
    } else {
        alert(res.statusText);
    }
}

document.getElementById('logout-button').addEventListener('click', logout);