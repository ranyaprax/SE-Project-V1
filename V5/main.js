// Function to handle adding and removing tasks
const inputBox = document.getElementById("input-box"); 
const tasksContainer = document.getElementById("tasksContainer"); 

//updated here
function loggedin(){
    if(localStorage.getItem("SwiftUserSignedIn") === 'true'){
        document.getElementById("temp").innerHTML = "Log Out";
        document.getElementById("temp").href = "landing.html";
        document.getElementById("temp").name = "logOut";
        document.getElementById("home").innerHTML = localStorage.getItem("username")+" | Swift";
        document.getElementById("timer").href = "personal.html";
        document.getElementById("forum").href = "forum.html";
        document.getElementById("settings").href = "settings.html";
    }
    else {
        document.getElementById("temp").innerHTML = "Sign Up";
        document.getElementById("temp").href = "signUp.html";
        document.getElementById("temp").name = "signOut";
        document.getElementById("home").innerHTML = "Home | Swift";
        document.getElementById("timer").href = "signUp.html";
        document.getElementById("forum").href = "signUp.html";
        document.getElementById("settings").href = "signUp.html";
    }
}
window.onload = loggedin ;

function loggedOut(){
    if(document.getElementById("temp").name === "logOut"){
        document.getElementById("temp").href = "#";
        document.getElementById("loggedOut").style ="display:block;z-index:100000;position:absolute;";
        document.getElementById("All").style = "opacity:.5;";
        console.log("sign up page");
    }
}

document.getElementById("yes").addEventListener('click',function(event){
    localStorage.setItem("username",null);
    localStorage.setItem("SwiftUserSignedIn",false)
    document.getElementById("All").style="opacity:1;"
    document.getElementById("loggedOut").style = "display:none;"
    loggedin();
    document.getElementById("temp").href = "signUp.html";
})
document.getElementById("no").addEventListener('click',function(event){
    document.getElementById("All").style="opacity:1;"
    document.getElementById("loggedOut").style = "display:none;"
    document.getElementById("temp").href = "landing.html";
})

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
