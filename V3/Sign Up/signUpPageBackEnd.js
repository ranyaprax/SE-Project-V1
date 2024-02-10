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
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
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
        //displayErrorMessage('Invalid email format');
        console.log("Invalid email");
        return false;
    }

    // Check minimum password length
    if (!validatePassword(password)) {
        console.log("Invalid password");
        //displayErrorMessage('Password must be at least 6 characters');
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

document.getElementById("test").addEventListener('click', function(event) {
    // event.preventDefault();
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    
    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;

    // let username = document.getElementById("username").value;
    // let age = document.getElementById("age").value;
    // // console.log(fname);
    // ,email,password,username,age
    signup(fname,lname);
})

function signup(fname,lname){ 
    const data = {//object
        'first name':fname,
        'last name':lname,
        'email':email,
        'password':password,
        'username':username,
        'age':age
    }; 
    // console.log(data);
    // const testdata = {'title': 'test'};
    fetch('https://dummyjson.com/products/add', {//npmserve
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) //turns the object to a string
    })
    .then(response => response.json())
    .then(d => {
        console.log(d);
        // if(d.success){
        const jwToken = d.token;
        localStorage.setItem('jwToken',jwToken);
        // console.log(jwToken);
        // }
        // else{
        //     alert('Login failed', d.message);
        // }
    })
    .catch(error => {
        console.error('Error Signing in', error);
    });
}
