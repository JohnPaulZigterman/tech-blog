async function newForm(event) {
    event.preventDefault();

    const name = document.getElementById('post-name').value;
    const content = document.getElementById('post-content').value;
    const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            name,
            content
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(res.statusText);
    }
};

document.getElementById('new-post-form').addEventListener('submit', newForm)