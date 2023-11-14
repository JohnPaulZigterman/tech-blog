async function commentForm(event) {
    event.preventDefault();

    const content = document.getElementById('comment-content').value.trim();
    const locationLength = window.location.toString().split('/').length - 1;
    const post_id = window.location.toString().split('/')[locationLength];

    if (content) {
        const res = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                content
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            document.location.reload();
        } else {
            alert(res.statusText);
        }
    }
}

document.getElementById('comment-form').addEventListener('submit', commentForm);