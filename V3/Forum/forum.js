// Initialize Firebase app and Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js';

// Firebase Configuration - HIDDEN
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// Function to add a new thread
async function addThread() {
    let newTitle = document.getElementById('newTitle').value.trim();
    let newContent = document.getElementById('newContent').value.trim();

    // If Function ensures the user cannot pass through an empty Thread.
    if (newTitle !== '' && newContent !== '') {
        await addDoc(collection(firestore, 'threads'), {
            title: newTitle,
            author: "NULL",
            timestamp: serverTimestamp(),
            content: newContent,
            comments: []
        });
        // Clear the Text from the two Input Areas.
        document.getElementById('newTitle').value = '';
        document.getElementById('newContent').value = '';

        updateThreadList();
    }
}

// Function to the list of Threads
function updateThreadList() {
    let threadList = document.getElementById('threadList');
    threadList.innerHTML = '';

    const threadsRef = collection(firestore, 'threads');
    const q = query(threadsRef, orderBy('timestamp', 'desc'));

    getDocs(q)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let thread = doc.data();
                let li = document.createElement('li');
                // Check if any Comments exist for this Thread.
                let commentCount = thread.comments ? thread.comments.length : 0;
                // Each Thread saved in the Collection will be displayed, in this HTML format.
                li.innerHTML = `
                    <a href='thread.html?id=${doc.id}'>
                        <h4 class="title">${thread.title}</h4>
                        <div class="bottom">
                            <p class="author">Posted by ${thread.author}</p>
                            <p class="timestamp">On ${new Date(thread.timestamp.toMillis()).toLocaleString()}</p>
                            <p class="comment_count">Comments: ${commentCount}</p>
                        </div>
                    </a>
                `;
                threadList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error reading Threads: ', error);
        });
}

// Event listener for the "Add Thread" Button.
document.getElementById('addThreadButton').addEventListener('click', addThread);

// Call updateThreadList() when the page loads to have an initial Thread List. 
updateThreadList();
