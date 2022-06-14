import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Header = () => {

     const { currentUser, setCurrentUser, setIsLoggedIn } = useContext(UserContext);
  
//   setIsLoggedIn(true);

  const LogOut = () => {
    setCurrentUser(null);
    sessionStorage.clear();
  };
  
  return ( 
    <Wrapper>
        <Link to="/"><Logo>Chat Room</Logo></Link>

        {currentUser 
           ? 
               <Hello> 
                 Howdy, {currentUser.data.logInName}  <Button onClick={LogOut}>Log Out</Button> 
               </Hello>
            
           : (   <>
                  <Link to="/signup"><SignUpSpan>Sign Up</SignUpSpan></Link>
                  <Link to="/login"><LogInSpan>Log In</LogInSpan></Link>
                 </>
            )
        }

    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 80px;
  background-color: #FFEFD5;
`;

const Logo = styled.h1`
  color: red;

  font-size: 30px;
  margin: 10px 10px;
  float: left;
`;

const SignUpSpan = styled.span`

  margin: 13px 200px;
  float: right;

`;

const LogInSpan = styled.span`

  margin: 13px -350px;
  float: right;

`;

const Hello = styled.span`
  color: red;
  font-size: 20px;
  margin: 13px 100px;
  float: right;
`;


const Button = styled.button`
margin-top: -100px;
   
    color:red;
    text-decoration: none;
    font-size:18px;
    font-family: normal;
    background:none;
    font-family: Calibri, sans-serif;
    cursor: pointer;
    border:none;
`;

export default Header;