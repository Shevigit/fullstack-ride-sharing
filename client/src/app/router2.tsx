
import { createBrowserRouter } from "react-router";
import AppLayout from "../components/AppLayout";
import Home from "../components/Home";
// import LoginForm from "../../components/LoginForm";
import LoginIn from "../components/LoginIn";
import UserLayout from "../components/UserLayOut";

import PasswordGmail from "../components/PasswordGmail";
import UserAndPassword from "../components/UserAndPassword";
import LoginForm from "../components/LoginForm";
import SearchDrive from "../components/SearchDrive";
import Offer from "../components/Offer";
import MyDrivers from "../components/MyDrivers";
import About from "../components/About";

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
                         { path: "passwordGmail", element: <PasswordGmail /> },
                        { path: "userAndPassword", element: <UserAndPassword /> }

                     ]
                    },
                    
                 {path:"loginIn",element:<LoginIn/>},
                 {path:"SearchDrive",element:<SearchDrive/>},
                 {path:"offer",element:<Offer/>},
                 {path:"MyDrivers",element:<MyDrivers/>},
                 {path:"about",element:<About/>},
                //  {path:"contact",element:<LoginIn/>},
                 {path:"*",element:<div>דף 404 - דף לא נמצא</div>},


                //  {
                //     path: "products", children: [
                //         { index: true, element: <ProductList /> },
                //         { path: ":id", element: <ProductDetails /> },
                //     ]
                // }


    



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