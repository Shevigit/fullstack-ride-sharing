import { createBrowserRouter } from "react-router"; 
import AppLayout from "../components/AppLayout";
import Home from "../components/Home";
import LoginIn from "../components/Login";
import LoginForm from "../components/LoginForm";
import BasicPage from "../components/About";
import SearchDrive from "../components/SearchDrive";
import RideInfoCard from "../components/RideInfoCard";
import SuggestionDrive from "../components/SuggestionDrive";
import UserProfile from "../components/UserProfile";

const router2 = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
    
      { path: "loginForm", element: <LoginForm /> },

      { path: "loginIn", element: <LoginIn /> },
      { path: "Update", element: <UserProfile/> },
      { path: "About", element: <BasicPage /> },
      {
        path: "SearchDrive", 
        children: [
          { index: true, element: <SearchDrive /> }, 
          { path: ":_id", element: <RideInfoCard /> } 
        ]
      },
      { path: "Offer", element: <SuggestionDrive /> },
    ]
  }
]);

export default router2;