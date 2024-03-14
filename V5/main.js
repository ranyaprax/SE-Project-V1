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
