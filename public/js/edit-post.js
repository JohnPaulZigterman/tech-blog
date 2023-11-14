async function editForm(event) {
    event.preventDefault();
    const name = document.getElementById('post-name').value.trim();
    const content = document.getElementById('post-content').value.trim();
    const locationLength = window.location.toString().split('/').length - 1;
    const id = window.location.toString().split('/')[locationLength];

    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id,
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
}

document.getElementById('edit-post-form').addEventListener('submit', editForm);