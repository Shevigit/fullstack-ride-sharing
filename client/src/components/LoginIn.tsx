//import React, { useState } from 'react';
import { useState } from 'react';
//import Button from '@mui/joy/Button';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
//import { useDispatch } from "react-redux";
//import { useLoginMutation } from '../stores/Slices/UserApiSlice';
import LoginSchema from '../schemas/LoginSchema';
//import { loginUser } from "../stores/Slices/LoginSlice";

interface UserSchema {
    email: string;
      password: string;

  }    
  

const LoginIn=()=>{
    const { register, formState: { errors } } = useForm<UserSchema>({
        mode: "onBlur",
        resolver: zodResolver(LoginSchema) as any,
        defaultValues: {
            email: '',
          password: '',
     
        }
      });
      //const dispatch = useDispatch();
      const [isDisplay,setIsDisplay]=useState(false)
     // const [addUserLogin]=useLoginMutation()
    //   const onSubmit = (data: UserSchema) => {
    //     console.log("onSubmit called");
    //     console.log("Received data:", data);
    
    //     const user:UserSchema = {
    //         email: data.email || "",
    //          password: data.password || "",
    //            };

    
    //     // console.log("User object being dispatched:", user);
    //     addUserLogin(user)
    //     dispatch(loginUser(user));
 
    // };
   const handleBlur=()=>{
      setIsDisplay(!isDisplay)
      
   }
    return(
        <>

     <h1>כניסה להקשת שם משתמש וסיסמא</h1>
     {/* <form onSubmit={handleSubmit(onSubmit)}> */}
     <TextField
         hiddenLabel
        id="filled-hidden-label-normal"
        placeholder="email"
        variant="filled"
        color="success"
     
         {...register("email")}
    
         />
              {errors.email && <p>{errors.email.message}</p>}
              <TextField
         hiddenLabel
        id="filled-hidden-label-normal"
        placeholder="password"
        variant="filled"
        color="success"
 //האם על input אפשר onBlur?

         {...register("password")}
         onBlur={handleBlur}
         />
              {errors.password && <p>{errors.password.message}</p>}
          
              {/* <Button type="button" sx={{ marginTop: 2}}>Submit</Button> */}
          {/* </form> */}
        </>
    )
}
export default LoginIn

