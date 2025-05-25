
import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import Home from "../components/Home";
// import LoginForm from "../../components/LoginForm";
import LoginIn from "../components/Login";
import UserLayout from "../components/UserLayOut";

import LoginForm from "../components/SignUp";
import Update from "../components/Update";
import BasicPage from "../components/About";
import SearchDrive from "../components/SearchDrive";
// <<<<<<< HEAD
import RideInfoCard from "../components/RideInfoCard";
// =======
// >>>>>>> 2c666fb639d493fc117214a9790f781c423a2aa0
// import Offer from "../components/Offer";
const router2 = createBrowserRouter([{
  element: <AppLayout />,
  children: [
    { index: true, element: <Home />, },
    {
      path: "loginForm", element: <UserLayout />,
      children: [
        { index: true, element: <LoginForm /> },
  
      ]
    },
    { path: "loginIn", element: <LoginIn /> },
    {path: "Update", element: <Update/>},
    {path: "About", element: <BasicPage/>},
// <<<<<<< HEAD
    {path: "SearchDrive", element: <SearchDrive/>,
      children:[
        {path:"id1",element:<RideInfoCard></RideInfoCard>}
      ]
    },
// =======
//     {path: "SearchDrive", element: <SearchDrive/>},
// >>>>>>> 2c666fb639d493fc117214a9790f781c423a2aa0
    // {path: "Offer", element: <Offer/>},


  ]

}


]

)

//    (property) Children: ({
//     index: boolean;
//     element: JSX.Element;
// } | {
//     path: string;
//     element: JSX.Element;
// })[]
// { path: "contact", element: <Contact /> },
// {
//     path: "users", element: <UserLayout />, children: [
//         { index: true, element: <UserList /> },
//         { path: "newUser", element: <UserDetailForm /> },
//         { path: ":userName", element: <UserDetails /> },
//     ]
// }



export default router2