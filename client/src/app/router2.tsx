
import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import Home from "../components/Home";
// import LoginForm from "../../components/LoginForm";
import LoginIn from "../components/LoginIn";
import UserLayout from "../components/UserLayOut";

import PasswordGmail from "../components/PasswordGmail";
import UserAndPassword from "../components/UserAndPassword";
import RegisterComplete from "../components/RegisterComplete"
import LoginForm from "../components/LoginForm";


const router2=createBrowserRouter(
    [
        {
            element: <AppLayout/>, 
            children: [
                {
                    index: true,
                    element: <Home/>,
                },
                
                { 
                    path: "loginForm",   element: <UserLayout/> ,
                      children:[
                        { index:true, element: <LoginForm /> },
                  
                {path:"passwordGmail",element:<PasswordGmail/>},

                        { path: "userAndPassword", element: <UserAndPassword /> },
            
                   ////////////////////////////////////  {path:"registerComplete/:user" ,element: <RegisterComplete/>}
                {path:"registerComplete" ,element: <RegisterComplete/>}
                     ]
                    },
                    
                 {path:"loginIn",element:<LoginIn/>},
              
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