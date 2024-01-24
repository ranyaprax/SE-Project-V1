// JS Code for forum.html

// Threads initalised here for testing only.
let threads =
[
    { id: 1, title: 'Thread 1', author: "Peter", timestamp: Date.now(), content: "Welcome to the Fire Ferrets Forum! This is a Test", comments: [{ id: 1, content: "Hey Peeta", author: "Lois", timestamp: Date.now() }] },
    { id: 2, title: 'Thread 2', author: "Raif Costello", timestamp: Date.now(), content: "You can create your own threads, and comment under others'!", comments: [] },
];

// Function to Add Threads to the Forum.
function addThread()
{
    // The new Thread's Title and Content are taken from the Inputs.
    let newTitle = document.getElementById('newTitle').value.trim();
    let newContent = document.getElementById('newContent').value.trim();

    if (newTitle !== '' && newContent !== '')
    {
        // Add New Thread to the Threads Array.
        threads.push({ id: threads.length + 1, title: newTitle, author: "NULL", timestamp: Date.now(), content: newContent, comments: [] });

        // Clear Input Fields 
        document.getElementById('newTitle').value = '';
        document.getElementById('newContent').value = '';

        // Update the Thread List display to include the new Thread.
        updateThreadList();
    }
}

// Function to update the Thread List.
function updateThreadList()
{
    // The Thread List is cleared.
    let threadList = document.getElementById('threadList');
    threadList.innerHTML = '';

    // Using the below HTML template, each element in the Array of Threads is displayed.
    threads.forEach(thread =>
    {
        let li = document.createElement('li');
        li.innerHTML = `
            <a href='thread.html?id=${thread.id}'>
                <h4 class="title">${thread.title}</h4>
                <div class="bottom">
                    <p class="author">Posted by ${thread.author}</p>
                    <p class="timestamp">On ${new Date(thread.timestamp).toLocaleString()}</p>
                    <p class="comment_count">Comments: ${thread.comments.length}</p>
                </div>
            </a>
        `;
        threadList.appendChild(li);
    });
}

// Event Listener checks for any clicks of the "Add Thread" Button.
document.getElementById('addThreadButton').addEventListener('click', addThread);

// Function Called when page Loads to display all previous Threads.
updateThreadList();
