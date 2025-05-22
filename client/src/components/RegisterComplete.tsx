// import React from 'react';
// import { TextField, Button,Stack } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import { useRegisterMutation } from "../stores/Slices/UserApiSlice"; // Import the mutation hook
// import { zodResolver } from '@hookform/resolvers/zod';
// import LoginSchema from '../schemas/LoginSchema';
// import { useForm } from 'react-hook-form';

// interface UserSchema {
  
//     email: string;
//     password:string;
// }

// const RegisterComplete = () => {
//     const location = useLocation();
//     const { user, temporaryPassword } = location.state; // Retrieve user data and temporary password
//     const [registerUser] = useRegisterMutation();
//     const { register, handleSubmit, formState: { errors } } = useForm<UserSchema>({
//         mode: "onBlur",
//         resolver: zodResolver(LoginSchema) as any,
//     });
//     const onSubmit = (data: UserSchema ) => {
//         // event.preventDefault();
//         // const target = event.target as typeof event.target & {
//         //     email: { value: string };
//         //     password: { value: string };
//         // };

//         // const email = target.email.value;
//         // const password = target.password.value;
//         const user: UserSchema = {
           
//             email: data.email || "",
//             password: data.password || "",
//         };
//         try {
//             const response =  registerUser({ ...user, email, password }).unwrap();
//             console.log("Registration successful:", response);
//             // Redirect to a success page or log in the user
//         } catch (error) {
//             console.error('Registration error:', error);
//         }
//     };

//     return (
  
//          <form onSubmit={handleSubmit(onSubmit)}>
//                         <Stack >
                          
//                             <TextField
//                                 hiddenLabel
//                                 placeholder="email"
//                                 variant="filled"
//                                 color="success"
//                                 {...register("email")}
//                             />
//                             {errors.email && <p>{errors.email.message}</p>}
//                             <TextField
//                                 hiddenLabel
//                                 placeholder="password"
//                                 variant="filled"
//                                 color="success"
//                                 {...register("email")}
//                             />
//                             {errors.password && <p>{errors.password.message}</p>}
//                             </Stack>

//                         <Button type="submit" sx={{ marginTop: 2 }}>Submit</Button>
              
//                     </form>
     
//     );
// };

// export default RegisterComplete;


import React from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { useRegisterMutation } from "../stores/Slices/UserApiSlice";
import { zodResolver } from '@hookform/resolvers/zod';
import LoginSchema from '../schemas/LoginSchema';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectUser } from '../stores/Slices/LoginSlice';

interface UserSchema {
    email: string;
    password: string;
}
// interface Params {
//     userName: string;
//     phone: string;
//     email: string;
//     hasCar?: boolean| undefined;
//     driveringLicense?: string|undefined;
//     gender: string;
// }
interface login {
    userName:string;
    phone:string;
    email: string;
    password: string,
    hasCar:boolean| undefined;
    driveringLicense: string|undefined;
    gender:string,
}

const RegisterComplete = () => {
    const userlogin=useSelector(selectUser)
    // const location = useLocation();
    // const state = location.state || {}; // Fallback to an empty object
    // const { user, temporaryPassword } = state; // Retrieve user data and temporary password

 //   const { userName, phone, email, hasCar, driveringLicense, gender } = useParams<Params>();
/////////////////////////////////////////////const userLogin=useParams()
////////////////console.log("ביבנהבנבנ",userLogin);
// const location = useLocation();
// const  userl = location.state;

    const [registerUser] = useRegisterMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<UserSchema>({
        mode: "onBlur",
        resolver: zodResolver(LoginSchema) as any,
    });

    const onSubmit =  (data: UserSchema) => {
        console.log("Sari",data);
       // console.log("mimi",userl.userName);
        
        const user: login = {
          
            userName: userlogin.userName, 
            phone: userlogin.phone,
            email: data.email ,
            password: data.password ,
            hasCar: userlogin.hasCar  ? true : false,
            driveringLicense: userlogin.driveringLicense||"",
            gender: userlogin.gender,
        };
        // const user: login = {
          
        //     userName: userLogin.userName||"", 
        //     phone: userLogin.phone||"",
        //     email: data.email || "",
        //     password: data.password || "",
        //     hasCar: userLogin.hasCar === "true" ? true : false,
        //     driveringLicense: userLogin.driveringLicense||"",
        //     gender: userLogin.gender||"",
        // };
        console.log("shevi",user);

            const response =  registerUser(user).unwrap();
            console.log("Registration successful:", response);
         
   
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextField
                    hiddenLabel
                    placeholder="email"
                    variant="filled"
                    color="success"
                    {...register("email")}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <TextField
                    hiddenLabel
                    placeholder="password"
                    variant="filled"
                    color="success"
                    type="password" // Ensure this is type="password" for security
                    {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </Stack>
            <Button type="submit" sx={{ marginTop: 2 }}>Submit</Button>
        </form>
    );
};

export default RegisterComplete;