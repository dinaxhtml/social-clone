import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import {
  createBrowserRouter,
  RouterProvider, Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import RightBar from "./components/RightBar.jsx";
import LeftBar from "./components/LeftBar.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient= new QueryClient();

function App() {

  const {currentUser}= useContext(AuthContext);

  const Layout = ()=> {
    return (
      <QueryClientProvider client={queryClient}>
      <div>
        <Navbar/>
        <div style={{display: "flex"}}>
        <LeftBar/>
        <div style={{flex:7}}>
          <Outlet/>  {/* from react-router-dom */}
         </div>
        <RightBar/>
        </div>
      </div>
      </QueryClientProvider>
     
    )
  }

  const ProtectedRoute= ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login"/>
    }

    return children;
  }

  const router= createBrowserRouter([
    {
      path:"/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/profile/:id",
          element: <Profile/>
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ]);

  return <div>
    <RouterProvider router={router} />
  </div>;
}

export default App;
