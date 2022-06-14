import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  // A common use of JSON is to exchange data to/from a web server.

  // When receiving data from a web server, the data is always a string.
  
  // Parse the data with JSON.parse(), and the data becomes a JavaScript object.

// Make sure the text is in JSON format, or else you will get a syntax error.

// When using the JSON.parse() on a JSON derived from an array, the method will return a JavaScript array, instead of a JavaScript object.

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user"))); // SignIn.js: sessionStorage.setItem("user", JSON.stringify(data));
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};