// Initialize Firebase app and Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js';

// TODO: How to handle firebaseConfig (Seperate File?)

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

// Function to add a new thread
async function addThread() {
    try {
        let newTitle = document.getElementById('newTitle').value.trim();
        let newContent = document.getElementById('newContent').value.trim();

        // Ensure the input's title and content aren't empty.
        if (newTitle !== '' && newContent !== '')
        {
            // Retrieve JWT token from local storage, and check if the Token exists
            const jwToken = localStorage.getItem('jwToken');
            if (!jwToken) {
                console.error('JWT Token not found!');
                return;
            }

            // TODO: Replace 'URL'
            await fetch('URL',{
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

    const threadsRef = collection(firestore, 'threads');
    const q = query(threadsRef, orderBy('timestamp', 'desc'));

    // Display each Thread using the following HTML
    getDocs(q)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let thread = doc.data();
                let li = document.createElement('li');
                let commentCount = thread.comments ? thread.comments.length : 0;
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
        .catch((error) => { console.error('Error reading Threads! ', error); });
}

document.getElementById('addThreadButton').addEventListener('click', addThread);
updateThreadList();