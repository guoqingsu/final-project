
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./Homepage";
import Header from "./Header";
import SignUp from "./SignUp";
import LogIn from "./LogIn";


// yarn install
// yarn add react-router-dom
// yarn add styled-components
// yarn start

const App = () => {
  return (
    <BrowserRouter>
      {/* <GlobalStyles /> */}
      <Header/>
      <Routes>
        <Route exact path="/" element={<Homepage />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<LogIn />} />




        {/* <Route exact path="/profile/:profileId"><Profile /></Route> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;