function loadTab(tabChosen) {
    var tabs = document.querySelectorAll('.tabContent'); //gather all the tab content

        //for each tab that is "active" - hide it (by removing active, alters css class)
        tabs.forEach(tab => 
            { tab.classList.remove('active'); }
        );
    
        //get the selected tab from the id passed in
    var selectedTab = document.getElementById(tabChosen);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
    }

    //on load i want it to display profile 
    document.addEventListener('DOMContentLoaded', function () {
        loadTab('profile');
    });


function attemptDeletion() {
    var userInput = prompt("Enter your password:");

    if (userInput != null) {
        //"123" will eventually be the actual password - this is for testing purposes
        if (userInput == "123") {
            var deleteConfirmation = confirm("Are you sure?");

            //if they do want to del account
            if (deleteConfirmation) {
                deleteAccount();
            } else {
                //user clicked "Cancel" at second confirmation
                alert("Deletion cancelled.");
            }
        } else {//the userInput was not equal to password
            // Incorrect password
            alert("Incorrect password. Account deletion canceled.");
        }
    }
    
}

function deleteAccount() {
    // Code to delete account will go here
    alert("Account deleted successfully!");
}
