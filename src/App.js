import React, {useEffect, useState} from "react";
import fire from "./fire";
import Login from "./Login";
import Hero from "./Hero";
import "./App.css";





const App = () => {

    //Setting States
    const {user, setUser} = useState("");
    const {email, setEmail} = useState("");
    const {password, setPassword} = useState("");
    const {emailError, setEmailError} = useState("");
    const {passwordError, setPasswordError} = useState("");
    const {hasAccount, setHasAccount} = useState(false);  
  
    //clear the input function
    const clearInputs = () => {
      setEmail("");
      setPassword("");
    }; 
  
    //Clear Error function
    const clearErrors = () => {
      setEmailError("");
      setPasswordError("");
    };
  
    //Handle Log In Function
    const handleLogin = () =>{
      clearErrors();
       fire
         .auth()
         .singInWithEmailAndPassword(email, password)
         .catch(err => {
            switch(err.code) {
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(err.message);
                break;
              case "auth/wrong-password":
                setPasswordError(err.message);
                break;   
                   
            }
          });
    };
  
    //Handle Sign Up Function
   const handleSignup = () => {
     clearErrors();
     fire
     .auth()
     .createUserWithEmailAndPassword(email, password)
     .catch(err => {
       switch(err.code) {
         case "auth/email-already-in-use":
         case "auth/invalid-email":
           setEmailError(err.message);
           break;
         case "auth/weak-password":
           setPasswordError(err.message);
           break; 
       }
     });
   };
  
   //Handle log out function
   const handleLogout = () => {
      fire.auth().singOut();
   };
  
   //Listner to track user log in and out
   const authListener = () => {
      fire.auth().onAuthStateChanged(user => {
        if(user){
          clearInputs();
          setUser(user)
        }else{
          setUser("");
        }
      });
   };
  
   //Hook used to listen the events
   useEffect(() => {
     authListener();
   },[]);

  return (
    <div className="App">
      {user ? (
        <Hero handleLogout={handleLogout}/> 
      ) : (
        <Login 
         email={email}
         setEmail={setEmail}
         password={setPassword}
         setPassword={setPassword}
         handleLogin={handleLogin}
         handleSignup={handleSignup}
         hasAccount={hasAccount}
         setHasAccount={setHasAccount}
         emailError={emailError}
         passwordError={passwordError}
         
        />
      )}
      
    </div>
  );
}

export default App;
