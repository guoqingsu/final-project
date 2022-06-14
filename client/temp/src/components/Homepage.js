import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const Homepage = () => {

  const [users, setUsers] = useState([]);
  // const [status, setStatus] = useState("loading");
//error: SyntaxError: Unexpected token < in JSON at position 0
// add "proxy": "http://localhost:8000" to client package.json, then restart frontend
  useEffect(() => {//  response.json() can be used only once
    fetch(`/api/get-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
  }}) 
      .then( response => response.json())
      .then(usersDataObj => {
        
        console.log("2nd then: ", usersDataObj);

        setUsers(usersDataObj.data);
        // setStatus("idle");
      })
      .catch(err => {
         console.log("Error Reading data " + err)});
   }, []);

  return (
   
      <>
        <p>This is homepage component</p>
        {users.map((user) => {
            return (
         
                <p> {user.logInName} </p>
            );
        })}
      </>
  );

};

// const Wrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: flex-start;
// `;

// const Title = styled.h2`
//   text-align: left;
//   margin-top: 10px;
//   margin-bottom: 5px;
// `;

// const Div = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: space-around;
// `;
// const Image = styled.img`
//   width: 100px;
//   padding: 1px;
//   margin: 1px;
//   &:hover {
//     border: 3px solid red;
//   }
// `;

// const StyledLink = styled(Link)`
//   border: ${({ isFriend }) => (isFriend ? "2px solid red " : null)};
// `;

export default Homepage;