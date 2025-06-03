import { createBrowserRouter } from "react-router"; // וודא שאתה מייבא מ-react-router
import AppLayout from "../components/AppLayout";
import Home from "../components/Home";
import LoginIn from "../components/Login";
import UserLayout from "../components/UserLayOut";
import LoginForm from "../components/SignUp";
import Update from "../components/Update";
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
      {
        path: "loginForm", element: <UserLayout />,
        children: [
          { index: true, element: <LoginForm /> },
        ]
      },
      { path: "loginIn", element: <LoginIn /> },
      { path: "Update", element: <UserProfile/> },
      { path: "About", element: <BasicPage /> },
      {
        path: "SearchDrive", // <-- הנתיב הבסיסי ל-SearchDrive
        children: [
          { index: true, element: <SearchDrive /> }, // <-- כאשר הנתיב הוא רק /SearchDrive
          { path: ":_id", element: <RideInfoCard /> } // <-- כאשר הנתיב הוא /SearchDrive/:id
        ]
      },
      { path: "Offer", element: <SuggestionDrive /> },
    ]
  }
]);

export default router2;