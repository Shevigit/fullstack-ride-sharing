import { Button, Box, TextField, Stack, Checkbox, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useForm, Controller } from 'react-hook-form'; // וודא ש-Controller מיובא כאן!
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom'; // תיקון: אם זה react-router-dom, הנתיב הוא כזה
import SuggestionSchema from '../schemas/SuggestionSchema';
import {  Drive, User } from './interfaces/Interface'; // וודא ש-interface User מעודכן
import { useRegisterMutation } from '../stores/Slices/UserApiSlice';
import { date } from 'zod/v4';
const LoginForm = () => {
    const navigate = useNavigate();
    const [Register] = useRegisterMutation();
    const {
        register,
        handleSubmit,
        control,
        watch,  
        formState: { errors }
    } = useForm<Drive>({ 
        mode: "onBlur",
        resolver: zodResolver(SuggestionSchema),
        defaultValues: {
            address:"",
             source:"",
            destination:"",
             date: new Date(),
           time: "0000",
          genderPreference:"Without preference"
         
        }
    });
  
    const onSubmit = async (data: User) => {
        const userToSend: User = {
            ...data,
            hasCar: data.hasCar || false,
            driveringLicense: data.driveringLicense || "",
        };
        console.log(userToSend); 
        try {
            const result = await Register(userToSend).unwrap();
            console.log(result);
           localStorage.setItem("currentUser", JSON.stringify(result.user));
            navigate('/')
        } catch (error) {
            console.error("שגיאה ברישום:", error);
        }
    };
    return (
        <>
            <Box role="presentation" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack >
                        <TextField
                            hiddenLabel
                            variant="filled"
                            size="small"
                            color="success"
                            placeholder="עיר מוצא "
                            {...register("source")}
                        />
                        {errors.source && <p>{errors.source.message}</p>}

                        <TextField
                            hiddenLabel
                            placeholder="עיר יעד"
                            variant="filled"
                              size="small"
                            color="success"
                            {...register("destination")}
                        />
                        {errors.destination && <p>{errors.destination.message}</p>}

                        <TextField
                            hiddenLabel
                            placeholder="כתובת האיסוף המדויקת (רחוב,מספר,עיר)"
                            variant="filled"
                            color="success"
                            {...register("address")}
                        />
                        {errors.address && <p>{errors.address.message}</p>}

                        <TextField
                            hiddenLabel
                            placeholder="תאריך"
                            variant="filled"
                            color="success"
                            {...register("date")}
                        />
                        {errors.date && <p>{errors.date.message}</p>}

                        <TextField
                            hiddenLabel
                            placeholder="שעה"
                            variant="filled"
                            color="success"
                            {...register("time")}
                        />
                        {errors.time && <p>{errors.time.message}</p>}
                        
                      
                    </Stack>
                    <Button type="submit" sx={{ marginTop: 2 }}>Submit</Button>
                </form>
            </Box>
        </>
    );
}

export default LoginForm;