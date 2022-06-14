import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const LogIn = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn} = useContext(UserContext);

  const [ email, setEmail ] = useState(""); // user input value
  const [ passWord, setPassWord ] = useState(""); // user input value
  const [ errorMessage, setErrorMessage ] = useState("");

  const logInAction = (emailInput, passWordInput) => {
 
    fetch("/api/login", {  // connect backend API in server.js: app.post("/api/signin", passUsersAlong, getUserByName)
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      //JSON.stringify() converts a JavaScript object or value to a JSON string
      body: JSON.stringify({ email: emailInput, passWord: passWordInput }), // send input data to server in the type of body object with 1 property "name", value is input value  
    })
    .then((res) => res.json()) //json() returns a promise which resolves with the result of parsing the body text as JSON.
    .then((userDataObj) => {
        // console.log("got res object from backend & assign it to variable userDataObj:", userDataObj)
        // console.log("then assign res object data property(array) to variable users at frontend ", userDataObj.data)
    
        if (userDataObj.status === 200) {
          setCurrentUser(userDataObj);
   // Save data to sessionStorage: sessionStorage.setItem('key', 'value');
   // In userContext: Get saved data from sessionStorage: let data = sessionStorage.getItem('key');
           sessionStorage.setItem("user", JSON.stringify(userDataObj));
           setIsLoggedIn(true);
           navigate("/");
        } else if(userDataObj.status === 402){
           setIsLoggedIn(true);
           setErrorMessage("The user not exists!");
         }else{
          setIsLoggedIn(true);
          setErrorMessage("password not correct!");
         }
         
         setEmail("");
         setPassWord("");
      });
  }; 

  const submitHandle = (e) => {
    e.preventDefault();
    logInAction(email, passWord);
  };

  return (
    <>
      <h2>New user? Please sign up first.</h2>
      <Form onSubmit={submitHandle}>
        <input
          type="text" 
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>

        <input
          type="text" 
          value={passWord}
          placeholder="Pass Word"
          onChange={(e) => setPassWord(e.target.value)}
          required
        ></input>

       <button type="submit">Submit</button>

        {!isLoggedIn
            ? ""
            : <ErrorWarning>{errorMessage}</ErrorWarning>
        }
      </Form>
    </> 
  );
};



const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
`;

const SignInButton = styled.button`
    background-color: var(--primary-color);
    border: none;
    color: white;
    cursor: pointer;
    font-family: var(--heading-font-family);
    font-size: 1rem;
    margin: 5px 0;
`;

const ErrorWarning = styled.div`
  color: blue;
  font-family: var(--heading-font-family);
  font-size: 1.25rem;
  height: 20px;
  margin: 10px 0;
`;

export default LogIn;