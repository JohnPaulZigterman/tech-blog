async function deleteForm(event) {
    event.preventDefault();
    const locationLength = window.location.toString().split('/').length - 1;
    const id = window.location.toString().split('/')[locationLength];
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ post_id: id }),
        headers: { 'Content-Type': 'application/json' }
    });
    if(res.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(res.statusText);
    }
}

document.getElementById('delete-post-button').addEventListener('click', deleteForm);