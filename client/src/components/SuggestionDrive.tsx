import React, { useState } from 'react';
import { Button, TextField, Stack, Checkbox, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import FormSchema from '../schemas/FormSchema'; // Assume you have a validation schema

import {  RegisterUser, User } from './interfaces/Interface';
const SuggestionDrive = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterUser>({
        mode: "onBlur",
        resolver: zodResolver(FormSchema) as any,
    });
    const onSubmit = (data: RegisterUser) => {
        // Create the user object based on RegisterUser interface
        const user: RegisterUser = {
            userName: data.userName || "", 
            phone: data.phone || "",
            email: data.email || "",
            hasCar: data.hasCar || false,
            driveringLicense: data.driveringLicense || "",
            gender: data.gender || "",
        };
    
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user)); // Store the user data directly
    };


  // 🟢 מצב לסימון checkbox
  const [checked, setChecked] = useState(false);

  // 🟢 פונקציה שמשנה את המצב
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };


    return (
        <>
        
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack >
                        <TextField
                            hiddenLabel
                            variant="filled"
                            size="small"
                            color="success"
                            placeholder="userName"
                            {...register("userName")}
                        />
                        {errors.userName && <p>{errors.userName.message}</p>}

                        <TextField
                            hiddenLabel
                            placeholder="phone"
                            variant="filled"
                            color="success"
                            {...register("phone", { required: "Phone number is required" })}
                        />
                        {errors.phone && <p>{errors.phone.message}</p>}

                        <TextField
                            hiddenLabel
                            placeholder="email"
                            variant="filled"
                            color="success"
                            {...register("email")}
                        />
                        {errors.email && <p>{errors.email.message}</p>}

                        <Checkbox
                            checked={checked}
                            {...register("hasCar")}
                            onChange={handleChange}
                            color="success"
                        />
                        {errors.hasCar && <p>{errors.hasCar.message}</p>}

                        <TextField
                            disabled={!checked}
                            hiddenLabel
                            placeholder="Driving License"
                            variant="filled"
                            color="success"
                            {...register("driveringLicense")}
                        />
                        {errors.driveringLicense && <p>{errors.driveringLicense.message}</p>}

                        <RadioGroup {...register("gender")}>
                            <FormControlLabel value="זכר" control={<Radio color="success" />} label="זכר" />
                            <FormControlLabel value="נקבה" control={<Radio color="success" />} label="נקבה" />
                        </RadioGroup>
                        {errors.gender && <p>{errors.gender.message}</p>}
                    </Stack>

                    <Button type="submit" sx={{ marginTop: 2 }}>Submit</Button>
                </form>
    
        </>
    )
}

export default SuggestionDrive