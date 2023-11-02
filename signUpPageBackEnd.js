// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.post('/submit-data', (req, res) => {
    const { data } = req.body;
    
    // Validate the data (add your validation logic here)
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }
  
    // Save the data to the database (add your database interaction logic here)
    // For example, using a hypothetical database module:
    // database.saveData(data)
  
    res.status(201).json({ message: 'Data saved successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

function getInfo(){
    var lname = document.getElementById("fname").value;
    var fname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
}

function validateEmail(email){
    var validate;
    //check if there is an @ sign and "."
    //check if there are characters infront and behind the @sign
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (emailRegex.test(email)) {
        validate = true;
        // Further actions for a valid email (e.g., submit to a server)
    } else {
        alert('Invalid email. Please enter a valid email address.');
        //change say that it's not an alert but something else ? a sign under the email address box
        validate = false;
    }
    return validate;
}

function validatePassword(password){
    //check if there are minimum 8 characters
    //check if there is capital and lower case letters
    //check if there is a number
    //check if there is a special character
    var validate;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
    if(passwordRegex.test(password)){
        validate = true;
    }
    else{
        alert('Invalid Password. Please enter a valid Password.');
        //change say that it's not an alert 
        //test to see what they are missing and tell them that
        validate = false;
    }
    return validate;
}   
