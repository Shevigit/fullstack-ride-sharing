import React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import Button from '@mui/joy/Button';
import { TextField, Stack } from '@mui/material';
import { useForm } from "react-hook-form";
import FormSchema from '../schemas/FormSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from "react-redux";
// import { v4 as uuidv4 } from 'uuid';
 import { addUser } from "../stores/Slices/LoginSlice";
import { useRegisterMutation } from '../stores/Slices/UserApiSlice';


interface UserSchema {
  userName: string;
  phone: string;
  email: string;
  password: string;
  hasCar: boolean;
  driveringLicense: string;
  gender: string;
  // createdAt: Date;
}    




const LoginForm = () => {

 const [addUserRegister]=useRegisterMutation()
  const [state, setState] = React.useState({ right: false });
  const dispatch = useDispatch();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && !["Tab", "Shift"].includes((event as React.KeyboardEvent).key)) {
      return;
    }
    setState({ right: open });
  };
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserSchema>({
    mode: "onBlur",
    resolver: zodResolver(FormSchema) as any,
    defaultValues: {
      userName: '',
      phone: '',
      email: '',
      password: '',
      hasCar: false,
      driveringLicense: '',
      gender: '',
    //  createdAt: new Date(),
    }
  });
  const onSubmit = (data: UserSchema) => {
    console.log("onSubmit called");
    console.log("Received data:", data);

    const user:UserSchema = {
      // id: uuidv4(),
      userName: data.userName || "",
      phone: data.phone || "",
      email: data.email || "",
      password: data.password || "",
      hasCar: data.hasCar || false,
      driveringLicense: data.driveringLicense || "",
      gender: data.gender || "male",
    };


    // console.log("User object being dispatched:", user);
    addUserRegister(user)
    dispatch(addUser(user));
 
    reset();
};


  return (
   
    <React.Fragment>
      <Button variant="outlined" onClick={toggleDrawer(true)}>Open Right Drawer</Button>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
        <Box role="presentation" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
    //   component="form"
      sx={{ width: '25ch' }}
      spacing={2}
      noValidate
      autoComplete="off"

    >
       <TextField
         hiddenLabel
        id="filled-hidden-label-normal"
          variant="filled"
        size="small"
        color="success"
         placeholder="userName"
         {...register("userName")}
      />
         {errors.userName && <p>{errors.userName.message}</p>}
           <TextField
         hiddenLabel
        id="filled-hidden-label-normal"
        placeholder="phone"
        variant="filled"
        color="success"
         {...register("phone",{required:"the form must include phone"})}
      />
       {errors.phone && <p>{errors.phone.message}</p>}
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
     
         {...register("password")}
         />
              {errors.password && <p>{errors.password.message}</p>}
        
     <Checkbox
      checked={checked}
      {...register("hasCar")}
      onChange={handleChange}
         color="success"
           />
       {errors.hasCar && <p>{errors.hasCar.message}</p>}
      <TextField
         hiddenLabel
        id="filled-hidden-label-normal"
        placeholder="Driving License"
        variant="filled"
        color="success"
         {...register("driveringLicense")}
          />
              {errors.driveringLicense && <p>{errors.driveringLicense.message}</p>}
  
    <RadioGroup  {...register("gender")} >
      <FormControlLabel 
        value="זכר" 
        control={<Radio color="success" />} 
        label="זכר" 
      />
      <FormControlLabel 
        value="נקבה" 
        control={<Radio color="success" />} 
        label="נקבה" 
      />
    </RadioGroup>


           
              {errors.gender && <p>{errors.gender.message}</p>}
            </Stack>

            <Button type="submit" sx={{ marginTop: 2}}>Submit</Button>
          </form>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default LoginForm;