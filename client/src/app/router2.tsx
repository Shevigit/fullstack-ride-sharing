
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
    {path: "SearchDrive", element: <SearchDrive/>},
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