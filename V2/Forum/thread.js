// JS Code for thread.html

// Fetch the ID of the Thread from the URL
const urlParams = new URLSearchParams(window.location.search);
const threadId = parseInt(urlParams.get('id'));

// Threads initalised here for testing only. 
const threads = [
    { id: 1, title: 'Thread 1', author: "Peter", timestamp: Date.now(), content: "Welcome to the Fire Ferrets Forum! This is a Test", comments: [{ cId: 1, content: "Hey Peeta", author: "Lois", timestamp: Date.now() }]},
    { id: 2, title: 'Thread 2', author: "Raif Costello", timestamp: Date.now(), content: "You can create your own threads, and comment under others'!", comments: [] },
];

// Vue Code
const app = new Vue({
    el: '#app',
    data: {
        // thread data is initally null
        thread: null,
        newComment: '',
    },
    created() {
        // Using the ID found from the URL, the mathcing Thread is retrived.
        this.thread = threads.find(thread => thread.id === threadId);
    },
    methods: {
        // Function to Add Comments to the Thread
        addComment() {
            if (this.newComment.trim() !== '') {
                this.thread.comments.push({ cId: comments.length + 1, content: this.newComment, author: "NULL", timestamp: Date.now() });
                this.newComment = '';
            }
        },
    },
});
