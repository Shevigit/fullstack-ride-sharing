
// import { useNavigate } from "react-router";




// const PasswordGmail=()=>{

//     const navigate=useNavigate();
//     const handleBlur=()=>{
//         console.log("hello!!!");
//         navigate('../../loginIn')
       
//     }
//     return(
//         <>
// <h1>שם משתמש וסיסמא</h1>
// <input onBlur={handleBlur}></input>

//         </>
//     )
// }
// export default PasswordGmail

// import { useLocation, useNavigate } from 'react-router';

// const PasswordGmail = () => {
//     const location = useLocation();
//     const user = location.state?.user; // Retrieve user data from the state
//     const navigate = useNavigate();
    
//     const generateTemporaryPassword = () => {
//         // Generate a temporary password
//         return Math.random().toString(36).slice(-8); // Example logic for generating a simple password
//     };

//     const handleBlur = () => {
//         const temporaryPassword = generateTemporaryPassword();
//         console.log("Temporary Password:", temporaryPassword); // This would be sent to the user's email in a real application
        
//         // After generating and "sending" the password, navigate to the login page
//         navigate("../../loginIn", { state: { user, temporaryPassword } }); // Pass user and temporary password to next component
//     };

//     return (
//         <>
//             <h1>שם משתמש וסיסמא</h1>
//             <input onBlur={handleBlur} placeholder="כנס את הסיסמא שהתקבלה במייל"></input>
//         </>
//     );
// }

// export default PasswordGmail;

import {  useLocation, useNavigate, useParams } from 'react-router';
import {  Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../stores/Slices/LoginSlice';
interface Params {
    userName: string;
    phone: string;
    email: string;
    hasCar?: boolean| undefined;
    driveringLicense?: string|undefined;
    gender: string;
}

const PasswordGmail = () => {

    const userlogin=useSelector(selectUser)
  console.log("תודה לד'",userlogin);
  
    // const location = useLocation();
    // const user = location.state?.user; // Retrieve user data
   // const { userName, phone, email, hasCar, driveringLicense, gender } = useParams<Params>();
// ///////////////////////////////const user=useParams()





    const navigate = useNavigate();

    const generateTemporaryPassword = () => {
        // Generate a temporary password (example logic)
        return Math.random().toString(36).slice(-8); // Simple password generation
    };
//    const location = useLocation();
//     const { user } = location.state;
    const handleSubmit =  () => {
        const temporaryPassword = generateTemporaryPassword();
        console.log("Temporary Password:", temporaryPassword);
      

        // navigate("../registerComplete", { state: { user, temporaryPassword } });
    //    console.log("brachi",{user});
        
   ///////////////////////////////////// navigate(`../registerComplete/${{user}}`)
 //navigate("../registerComplete", { state:  user });
     navigate("../registerComplete")
    };

    return (
        <div>
            <h1>Receive Your Temporary Password</h1>
            <p>Your temporary password has been sent to your email.</p>
            <Button onClick={handleSubmit}>Continue to Register</Button>
        </div>
    );
};

export default PasswordGmail;