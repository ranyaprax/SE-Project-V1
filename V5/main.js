// Function to handle adding and removing tasks
const inputBox = document.getElementById("input-box"); 
const tasksContainer = document.getElementById("tasksContainer"); 


function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!"); 
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value; 
        tasksContainer.appendChild(li); 
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

tasksContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data",tasksContainer.innerHTML);
}

function showTasks(){
    tasksContainer.innerHTML = localStorage.getItem("data");
}
showTasks();


//checks if the email is valid
function validateEmail(email){
    //check if there is an @ sign and "."
    //check if there are characters infront and behind the @
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (emailRegex.test(email)) {
        return true;
        // Further actions for a valid email (e.g., submit to a server)
    } else {
       // alert('Invalid email. Please enter a valid email address.');
        alert("Invalid email. Please make sure the following are in your email address: '@'  '.' ");
        return false;
    }
}

function validatePassword(password){
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/;
    if(passwordRegex.test(password)){
        return true;
    }
    else{
        alert("Invalid Password. Please make sure the following are in your Password: 'A-Z'  'a-z' '@$!%*?&' '1-9' ");
        return false;
    }
}   

function validateForm() {
    // Regular expression for basic email validation
    // var emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value
    // Check email format
    if (!validateEmail(email)) {
        console.log("Invalid email");
        return false;
    }

    // Check minimum password length
    if (!validatePassword(password)) {
        console.log("Invalid password");
        return false;
    }

    // If both email and password are valid, submit the form
    return true;
}

function Next1(){
    document.getElementById("Page1").style = "display:none;";
    document.getElementById("Page2").style = "display:block;";   
}
function Next2(){    
    if(validateForm()){
        document.getElementById("Page2").style = "display:none;";
        document.getElementById("Page3").style = "display:block;";
    }
}

function Back1(){
    document.getElementById("Page1").style = "display:block;";
    document.getElementById("Page2").style = "display:none;";
}
function Back2(){
    document.getElementById("Page2").style = "display:block;";
    document.getElementById("Page3").style = "display:none;";
}

document.getElementById("signup").addEventListener('click', function(event) {
    loggedin();
    
    // event.preventDefault();
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userName = document.getElementById("username").value;
    let age = document.getElementById("age").value;
    
    signUp(firstName,lastName,email,password,userName,age);
})

function signUp(firstName,lastName,email,password,userName,age){ 
    const data = {//object
        'first name':firstName,
        'last name':lastName,
        'email':email,
        'password':password,
        'username':userName,
        'age':age
    }; 
    
    fetch('https://dummyjson.com/products/add', {//npmserve   'http://127.0.0.1:5001/ct216app-22318961/us-central1/signup'
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) //turns the object to a string
    })
    .then(response => response.json())
    .then(d => {
        console.log(d);
        const jwToken = d.token;
        localStorage.setItem('jwToken',jwToken);
        localStorage.setItem("SwiftUserSignedIn", true);
        document.getElementById("done").style = "display:block;";
        document.getElementById("Page3").style = "display:none;";
    })
    .catch(error => {
        console.log('Error Signing in');
    });
}

function loggedin(){
    if(localStorage.getItem("SwiftUserSignedIn") === 'true'){
        document.getElementById("temp").innerHTML = "Log Out";
        document.getElementById("temp").href = "logOut.html";
    }
    else {
        document.getElementById("temp").innerHTML = "Sign Up";
        document.getElementById("temp").href = "signUp.html";
    }
}
window.onload = loggedin;