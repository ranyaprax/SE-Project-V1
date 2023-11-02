function getInfo(){
    var lname = document.getElementById("fname").value;
    var fname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    email.validateEmail();
    password.validatePassword();
}

function validateEmail(email){
    //check if there is an @ sign
    //check if there is a "."
    //check if there are characters infront and behind the @sign

}

function validatePassword(password){
    //check if there are minimum 8 characters
    //check if there is capital and lower case letters
    //check if there is a number
    //check if there is a special character
}