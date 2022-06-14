import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import {ProtectedRoute} from "./auth/protectedRoute";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from "./auth";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path={'/'} exact element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path={'/signin'} element={<Signin />} />
          <Route path={'/signup'} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
