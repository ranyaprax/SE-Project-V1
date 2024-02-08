// Initialize Firebase app and Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
import { getFirestore, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js';

// Firebase Configuration - HIDDEN
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// Function to add a new Comment.
async function addComment() {
    try {
        // .trim() removes and whitespaces either side of the Comment.
        const newComment = document.getElementById('newComment').value.trim();

        // Ensure the comment is not Empty.
        if (newComment !== '') {
            // Get the Thread ID from the URL.
            const urlParams = new URLSearchParams(window.location.search);
            const threadId = urlParams.get('id');

            // Get Reference to the Thread Document.
            const threadRef = doc(firestore, 'threads', threadId);

            // Fetch Thread data to get existing Comments.
            const threadSnapshot = await getDoc(threadRef);
            if (threadSnapshot.exists()) {
                const threadData = threadSnapshot.data();
                const comments = threadData.comments || [];

                // Add new Comment to the Array.
                comments.push({
                    author: "Anonymous", // Author Data TBA
                    content: newComment,
                    timestamp: new Date().toISOString() // .toISOString() needed here since Firestore Arrays don't support .toLocaleString() 
                });

                // Update the Thread document with the new Comments Array.
                await updateDoc(threadRef, { comments });

                // Refresh the Thread to display the updated Comments.
                refreshThread();
            } else {
                console.log('Thread not found');
            }

            // Clear the Input Area.
            document.getElementById('newComment').value = '';
        } else {
            console.log('Comment cannot be empty');
        }
    } catch (error) {
        console.error('Error adding comment:', error);
    }
}

// Function to refresh the thread content
async function refreshThread() {
    try {
        // Get the Thread ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const threadId = urlParams.get('id');

        // Get the Reference for the Thread Collection
        const threadRef = doc(firestore, 'threads', threadId);

        // Read Thread Data
        const threadSnapshot = await getDoc(threadRef);
        if (threadSnapshot.exists()) {
            const threadData = threadSnapshot.data();

            // Display thread title, author, and content
            document.getElementById('threadTitle').innerText = threadData.title;
            document.getElementById('threadAuthor').innerText = `Posted by ${threadData.author}`;
            document.getElementById('threadContent').innerText = threadData.content;

            // Update comments section
            updateComments(threadData.comments || []);
        } else {
            console.log('Thread not found');
        }
    } catch (error) {
        console.error('Error updating Thread:', error);
    }
}

// Function to update the Comment Section.
function updateComments(comments) {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    // Each Comment referencing this Thread will be displayed, in this HTML format.
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

    // Update Comment Count.
    document.getElementById('commentCount').innerText = `Comments (${comments.length})`;
}

// Event listener for the "Add Comment" Button.
document.getElementById('addCommentButton').addEventListener('click', addComment);

// Call refreshThread() when the page loads to have an initial Comment List. 
refreshThread();
