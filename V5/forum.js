// Function to add a new thread
async function addThread() {
    try {
        let newTitle = document.getElementById('newTitle').value.trim();
        let newContent = document.getElementById('newContent').value.trim();

        // Ensure the input's title and content aren't empty.
        if (newTitle !== '' && newContent !== '') {
            // Retrieve JWT token from local storage, and check if the Token exists
            const jwToken = localStorage.getItem('jwToken');
            if (!jwToken) {
                console.error('JWT Token not found!');
                return;
            }

            await fetch('https://createthread-pgktbhms6a-uc.a.run.app/',{
                method: 'POST',
                // Request is in json Format
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwToken}`,
                },
                body: JSON.stringify({
                    title: newTitle,
                    content: newContent,
                }),
            });
            // Reset Input Areas and update Thread display. 
            document.getElementById('newTitle').value = '';
            document.getElementById('newContent').value = '';
            updateThreadList();
        }
    } catch (error) { console.error('Error adding Thread! ', error); }
}

// Function to update the Thread display
function updateThreadList() {
    let threadList = document.getElementById('threadList');
    threadList.innerHTML = '';

    // Retrieve JWT token from local storage, and check if the Token exists
    const jwToken = localStorage.getItem('jwToken');
    if (!jwToken) {
        console.error('JWT Token not found!');
        return;
    }

    // Make a GET request to fetch thread data
    fetch('https://getthreads-pgktbhms6a-uc.a.run.app/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwToken}`,
        },
    })
        .then(response => response.json())
        .then(threads => {
            threads.forEach(thread => {
                let li = document.createElement('li');
                let commentCount = thread.comments ? thread.comments.length : 0;
                li.innerHTML = `
                <a href='thread.html?id=${thread.id}'>
                    <h4 class="title">${thread.title}</h4>
                    <div class="bottom">
                        <p class="author">Posted by ${thread.author}</p>
                        <p class="timestamp">On ${new Date(thread.timestamp).toLocaleString()}</p>
                        <p class="comment_count">Comments: ${commentCount}</p>
                    </div>
                </a>
            `;
                threadList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching threads: ', error));
}

document.getElementById('addThreadButton').addEventListener('click', addThread);
updateThreadList();
