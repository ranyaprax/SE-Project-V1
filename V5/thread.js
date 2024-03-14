// Initialize Firebase app and Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
import { getFirestore, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js';

// TODO: How to handle firebaseConfig (Seperate File?)

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// Function to add a new Comment
async function addComment() {
    try {
        const newComment = document.getElementById('newComment').value.trim();
        const urlParams = new URLSearchParams(window.location.search);
        const threadId = urlParams.get('id');

        // Ensure Input Comment isn't empty
        if (newComment !== '') {

            // Retrieve JWT token from local storage, and check if the Token exists
            const jwToken = localStorage.getItem('jwToken');
            if (!jwToken) {
                console.error('JWT Token not found!');
                return;
            }

            // TODO: Replace 'URL'
            await fetch(`URL`, {
                method: 'POST',
                // Request is in json Format
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwToken}`,
                },
                body: JSON.stringify({
                    content: newComment, 
                    threadId: threadId,
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
        const threadRef = doc(firestore, 'threads', threadId);
        const threadSnap = await getDoc(threadRef);

        // Ensure Thread exists
        if (threadSnap.exists()) {
            const threadData = threadSnap.data();
            document.getElementById('threadTitle').innerText = threadData.title;
            document.getElementById('threadAuthor').innerText = `Posted by ${threadData.author}`;
            document.getElementById('threadContent').innerText = threadData.content;
            updateComments(threadData.comments || []);
        } else { console.log('Thread ' + threadId + ' not found!'); }
    } catch (error) { console.error('Error updating Thread! ', error); }
}

// Function to update the Comments display
function updateComments(comments) {
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
}

document.getElementById('addCommentButton').addEventListener('click', addComment);
refreshThread();