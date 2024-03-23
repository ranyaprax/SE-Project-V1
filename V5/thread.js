// Function to add a new Comment
async function addComment() {
    try {
        let newComment = document.getElementById('newComment').value.trim();
        let urlParams = new URLSearchParams(window.location.search);
        let threadId = urlParams.get('id');

        // Ensure Input Comment isn't empty
        if (newComment !== '') {
            // Retrieve JWT token from local storage, and check if the Token exists
            const jwToken = localStorage.getItem('jwToken');
            if (!jwToken) {
                console.error('JWT Token not found!');
                return;
            }

            // Make a POST request to add a new comment
            await fetch(`https://createthread-pgktbhms6a-uc.a.run.app/`, {
                method: 'POST',
                // Request is in JSON format
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwToken}`,
                },
                body: JSON.stringify({
                    threadId: threadId,
                    content: newComment
                }),
            });

            // Reset Input Areas and refresh Thread.
            document.getElementById('newComment').value = '';
            refreshThread();
        }
    } catch (error) { console.error('Error adding Comment! ', error); }
}

// Function to update Thread Data
async function refreshThread() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const threadId = urlParams.get('id');

        // Fetch thread data using the provided GET method that retrives Every thread
        const response = await fetch('https://getthreads-pgktbhms6a-uc.a.run.app/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const allThreads = await response.json();
        const threadData = allThreads.find(thread => thread.id === threadId)

        // Ensure Thread data is received
        if (threadData) {
            document.getElementById('threadTitle').innerText = threadData.title;
            document.getElementById('threadAuthor').innerText = `Posted by ${threadData.author}`;
            document.getElementById('threadContent').innerText = threadData.content;

            // Call updateComments with threadId
            updateComments(threadId);

        } else { console.log('Thread ' + threadId + ' not found!'); }
    } catch (error) { console.error('Error updating Thread! ', error); }
}

// Function to update the Comments display
async function updateComments(threadId) {
    try {
        // Retrieve JWT token from local storage, and check if the Token exists
        const jwToken = localStorage.getItem('jwToken');
        if (!jwToken) {
            console.error('JWT Token not found!');
            return;
        }

        // Make a GET request to fetch comments for the thread
        const response = await fetch(`https://getcomments-pgktbhms6a-uc.a.run.app${threadId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwToken}`,
            },
        });

        const comments = await response.json();
        const commentList = document.getElementById('commentList');
        commentList.innerHTML = '';

        // Display each Comment using the following HTML
        comments.forEach(comment => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="commentTop">
                    By ${comment.author} - ${new Date(comment.timestamp).toLocaleString()}
                </div>
                <div class="commentBottom">
                    ${comment.content}
                </div>
            `;
            commentList.appendChild(li);
        });

        // Update Comment Count
        document.getElementById('commentCount').innerText = `Comments (${comments.length})`;
    } catch (error) { console.error('Error updating Comments! ', error); }
}

document.getElementById('addCommentButton').addEventListener('click', addComment);
refreshThread();
