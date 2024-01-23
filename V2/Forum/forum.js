// JS Code for forum.html

// Vue Code
const app = new Vue({
    el: '#app',
    // Threads initalised here for testing only.
    data: {
        newTitle: '',
        newContent: '',
        threads: [
            { id: 1, title: 'Thread 1', author: "Peter", timestamp: Date.now(), content: "Welcome to the Fire Ferrets Forum! This is a Test", comments: [{ content: "Hey Peeta", author: "Lois", timestamp: Date.now() }] },
            { id: 2, title: 'Thread 2', author: "Raif Costello", timestamp: Date.now(), content: "You can create your own threads, and comment under others'!", comments: [] },
        ]
    },
    methods: {
        // Function to Add Threads to the Forum
        addThread() {
            if ((this.newTitle.trim() !== '') && (this.newContent.trim() !== '') ) {
                this.threads.push({ id: 3, title: this.newTitle, author: "NULL", timestamp: Date.now(), content: this.newContent, comments: []});
                this.newTitle = '';
                this.newContent = '';
            }
        },
    }
});
