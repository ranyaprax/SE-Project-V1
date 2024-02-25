
document.getElementById("login").addEventListener('click', function(event) {
    // event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    login(email,password);
})

function login(password,email){
    const data = {password,email}; //object
   const testdata = {'title': 'test'};
    fetch('http://127.0.0.1:5001/ct216app-22318961/us-central1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testdata) //turns the object to a string
    })
    .then(response => response.json())
    .then(d => {
        console.log(d);
        const jwToken = d.token;
        localStorage.setItem('jwToken',jwToken);
    })
    .catch(error => {
        console.error('Error Signing in', error);
    });
}
