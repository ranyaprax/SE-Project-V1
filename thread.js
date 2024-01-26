// JS Code for thread.html

// Get the ID of the Thread from the URL.
const urlParams = new URLSearchParams(window.location.search);
const threadId = parseInt(urlParams.get('id'));

// Threads initalised here for testing only. 
const threads = [
    { id: 1, title: 'Thread 1', author: "Peter", timestamp: Date.now(), content: "Welcome to the Fire Ferrets Forum! This is a Test", comments: [{ cId: 1, content: "Hey Peeta", author: "Lois", timestamp: Date.now() }]},
    { id: 2, title: 'Thread 2', author: "Raif Costello", timestamp: Date.now(), content: "You can create your own threads, and comment under others'!", comments: [] },
];

// Function to update the Thread's Details.
function updateThread() {
    // Find the correct Thread to display based on the ID found from the URL.
    let thread = threads.find(thread => thread.id === threadId);

    // Display the Thread's Title
    document.getElementById('threadTitle').innerText = thread.title;

    // Display the Thread's Stats (Author and Timestamp).
    let threadStats = document.getElementById('threadStats');
    threadStats.innerHTML = `
        <p>Posted by ${thread.author}</p>
        <p class="timestamp">${new Date(thread.timestamp).toLocaleString()}</p>
    `;

    // Display the Thread's Content (Text).
    let contentParagraph = document.getElementById('threadContent');
    contentParagraph.appendChild(document.createTextNode(thread.content));

    // All previous Comments stored with the Thread are displayed in the Comment Section.
    updateComments(thread.comments);
}

// Every Comment inputted is dusplayed in the Thread's Comment Section.
function updateComments(comments) {
    // The Comment Count is updated to reflect the new value.
    let commentCount = document.getElementById('commentCount');
    commentCount.innerHTML = `Comments (${comments.length})`;

    // The Comment List is cleared.
    let commentList = document.getElementById('commentList');
    commentList.innerHTML = '';

    // 
    comments.forEach(comment => {
        let li = document.createElement('li');
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
}

// Function to add a new comment
function addComment() {
    let newComment = document.getElementById('newComment').value.trim();

    // A Comment will only be created if there is some text in the Input Area.
    if (newComment !== '')
    {
        // Find the correct Thread in the Threads Array to add the Comment to. based on the ID found from the URL
        let thread = threads.find(thread => thread.id === threadId);
        thread.comments.push({ cId: comments.length + 1, content: newComment, author: "NULL", timestamp: Date.now() });

        // The Input Area is cleared.
        document.getElementById('newComment').value = '';

        // Update the comment section
        updateComments(thread.comments);
    }
}

// Event Listener checking if the "Add Comment" button is ever pressed.
document.getElementById('addCommentButton').addEventListener('click', addComment);

// Initial update of the thread details
updateThread();