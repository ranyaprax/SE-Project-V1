var valEmaill;
var valPwd;
function getInfo(){
    var lname = document.getElementById("fname").value;
    var fname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    //validateEmail(email);
}


function pageOne(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    validateEmail(email);
    validatePassword(password);

}

function validateEmail(email){
    //check if there is an @ sign and "."
    //check if there are characters infront and behind the @sign
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (emailRegex.test(email)) {
        valEmail = true;
        // Further actions for a valid email (e.g., submit to a server)
    } else {
       // alert('Invalid email. Please enter a valid email address.');
        document.getElementById("resEmail").innerHTML = "Invalid email. Please make sure the following are in your email address: '@'  '.' "
        valEmail = false;
    }
}

function validatePassword(password){
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
    if(passwordRegex.test(password)){
        valPwd = true;
    }
    else{
        document.getElementById("resPwd").innerHTML = "Invalid Password. Please make sure the following are in your Password: 'A-Z'  'a-z' '@$!%*?&' '1-9' "
        valPwd = false;
    }
}   

function Next1(){
    document.getElementById("Page1").style = "display:none;";
    document.getElementById("Page2").style = "display:contents;";   
}
function Next2(){
    validateEmail(email);
    validatePassword(password);
    if(valEmail && valPwd){
        document.getElementById("Page2").style = "display:none;";
        document.getElementById("Page3").style = "display:contents;";
    }
}

function Back1(){
    document.getElementById("Page1").style = "display:contents;";
    document.getElementById("Page2").style = "display:none;";
}
function Back2(){
    document.getElementById("Page2").style = "display:contents;";
    document.getElementById("Page3").style = "display:none;";
}

function Create(){
    //creates the account and adds it to the firebase
}