    
    $('.signup_form').submit((event) =>{
        event.preventDefault();
        fullname = event.target.fullname.value;
        email = event.target.email.value;
        pwd = event.target.pwd.value;
        if(isPasswordValid(pwd))
        {
            //refreshing the form - LB
            event.target.fullname.value = "" ; 
            event.target.email.value="";
            event.target.pwd.value = ""; 
            if(RegisterUser(email,pwd))
            {
                CreateUserObject(fullname,email,pwd);
            }
        }
        else{
            //This case needs to be handled using the password not valid dialog box - LB
            alert("Couldn't Register You "+fullname);
        }
    })

    function isPasswordValid(password)
    {
        //checking if password is valid -LB
        if(password.length >= 8) return true;
        return false;
    }

    function RegisterUser(email,password)
    {
        //Registering User Using Firebase Authentication - LB
        auth = firebase.auth();
        auth.createUserWithEmailAndPassword(email, password).then(function(result) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  // User logged in already or has just logged in.
                  uid = user.uid;
                  console.log(uid);
                  return true;
                } else {
                  // User not logged in or has just logged out.
                }
                return true;
              });
          }).catch(function(error) {
            var errorMessage = error.message;
            alert(errorMessage);
            return false;   
            })
        
            return true;
    }

    function CreateUserObject(fullname,email,password)
    {
        //Creating object of user in the database -LB
        alert("You've succesfully registered " + fullname.toUpperCase())
        userObject = {fullname,email,password};
        database = firebase.database();
        database.ref('users/'+ fullname).set(userObject).catch(function(error){
            var errorMessage = error.message;
            alert(errorMessage)})
        
        
    }