import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const SignUp = () => {
  const navigate = useNavigate();

  const [ logInName, setLogInName ] = useState(""); // user input value
  const [ email, setEmail ] = useState(""); // user input value
  const [ passWord, setPassWord ] = useState(""); // user input value

  const [signUpMessage, setSignUpMessage] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const signUpAction = (logInNameInput, emailInput, passWordInput) => {
  
      fetch("/api/add-user", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      //JSON.stringify() converts a JavaScript object or value to a JSON string
      body: JSON.stringify({ logInName: logInNameInput, email: emailInput, passWord: passWordInput }),//send input data to server in the type of body object with 1 property "name", value is input value  
    })
    .then((res) => res.json()) //json() returns a promise which resolves with the result of parsing the body text as JSON.
    .then((userDataObj) => {
          
        if (userDataObj.status === 200) {
          setIsSignedUp(true);
          setSignUpMessage("Sign up successfully");
            //navigate('/');
        } else if(userDataObj.status === 400){
          setIsSignedUp(true);
          setSignUpMessage("The user exists!");
         // console.log("The user exists!");
         
         } else{
          setSignUpMessage("sign up failed!");
         }
         
         setLogInName("");
         setEmail("");
         setPassWord("");
      });
  }; 

  const submitHandle = (e) => {
    e.preventDefault();
    signUpAction(logInName, email, passWord);
  };

  return (
    <>
      <h2>Welcome new user! Please sign up.</h2>
      <Form onSubmit={submitHandle}>
        <input
          type="text" 
          value={logInName}
          placeholder="Login name"
          onChange={(e) => setLogInName(e.target.value)}
        ></input>

        <input
          type="text" 
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <input
          type="text" 
          value={passWord}
          placeholder="Pass Word"
          onChange={(e) => setPassWord(e.target.value)}
        ></input>

       <button type="submit">Submit</button>
       
       {!isSignedUp
            ? ""
            : <SignUpOK>{signUpMessage}</SignUpOK>
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

const SignUpOK = styled.div`
  color: blue;
  font-family: var(--heading-font-family);
  font-size: 1.25rem;
  height: 20px;
  margin: 10px 0;
`;

export default SignUp;