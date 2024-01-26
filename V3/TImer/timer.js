 //fields
 var seconds = 0;
 var mins = 0;
 var hrs = 0;
 var state = false; //used to pause timer
 var timer;

 //fns
 function start() {
     //fn that makes timer go
    while (seconds != 0 && mins != 0 && hrs != 0 && state == true) {
         //timer goes down
         //from set time to 0
    }
 }

 function checkNum() {
     if (isNaN(input) || input == "") {
         //don't allow
         alert("That's not a number...");
     }
     else {
         state = true;
         //start
     }
 }

 function stop() {
     state = false;
 }

 function set() {
     //fn that will start the timer from the specified amount
     var input = document.getElementById("timer").value;
     //if (secinput % 60 == 0) { mins++; }
     //if (mininput % 60 == 0) { hours++; }

     //display sec, min, hours

 }
