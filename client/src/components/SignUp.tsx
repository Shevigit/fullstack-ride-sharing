import { Button, Box, TextField, Stack, Checkbox, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useForm, Controller } from 'react-hook-form'; // וודא ש-Controller מיובא כאן!
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom'; // תיקון: אם זה react-router-dom, הנתיב הוא כזה
import FormSchema from '../schemas/FormSchema';
import {  User } from './interfaces/Interface'; // וודא ש-interface User מעודכן
import { useRegisterMutation } from '../stores/Slices/UserApiSlice';
const LoginForm = () => {
    const navigate = useNavigate();
    const [Register] = useRegisterMutation();
    const {
        register,
        handleSubmit,
        control,
        watch,  
        formState: { errors }
    } = useForm<User>({ 
        mode: "onBlur",
        resolver: zodResolver(FormSchema),
        defaultValues: {
           
            userName: "",
            phone: "",
            email: "",
            password: "",
            hasCar: false, 
            driveringLicense: "",
            gender: "זכר", 
        }
    });
    const hasCarValue = watch("hasCar");
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
                            placeholder="שם פרטי "
                            {...register("userName")}
                        />
                        {errors.userName && <p>{errors.userName.message}</p>}

                        <TextField
                            hiddenLabel
                            placeholder="פלאפון"
                            variant="filled"
                            color="success"
                            {...register("phone")}
                        />
                        {errors.phone && <p>{errors.phone.message}</p>}

                        <TextField
                            hiddenLabel
                            placeholder="מייל"
                            variant="filled"
                            color="success"
                            {...register("email")}
                        />
                        {errors.email && <p>{errors.email.message}</p>}

                        <TextField
                            hiddenLabel
                            placeholder="סיסמא"
                            variant="filled"
                            color="success"
                            {...register("password")}
                        />
                        {errors.password && <p>{errors.password.message}</p>}

                        {/* שימוש ב-watch עבור ה-Checkbox והלייבל */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="success"
                                    checked={hasCarValue} // מצב ה-Checkbox מנוהל על ידי watch
                                    // אין צורך ב-onChange={handleChange}
                                    {...register("hasCar")}
                                />
                            }
                            label="יש לי רכב"
                        />
                        {errors.hasCar && <p>{errors.hasCar.message}</p>}

                        <TextField
                            disabled={!hasCarValue} // שדה מופעל/מושבת לפי hasCarValue
                            hiddenLabel
                            placeholder="מספר רשיון"
                            variant="filled"
                            color="success"
                            {...register("driveringLicense")}
                        />
                        {errors.driveringLicense && <p>{errors.driveringLicense.message}</p>}

                        {/* שימוש ב-Controller עבור RadioGroup */}
                        <Controller
                            name="gender" // שם השדה חייב להתאים לסכימה ול-interface
                            control={control} // מעבירים את control
                            render={({ field }) => (
                                <RadioGroup {...field}> {/* מעבירים את כל מאפייני field */}
                                    <FormControlLabel style={{ color: "black" }} value="זכר" control={<Radio color="success" />} label="זכר" />
                                    <FormControlLabel style={{ color: "black" }} value="נקבה" control={<Radio color="success" />} label="נקבה" />
                                </RadioGroup>
                            )}
                        />
                        {errors.gender && <p>{errors.gender.message}</p>}
                    </Stack>
                    <Button type="submit" sx={{ marginTop: 2 }}>Submit</Button>
                </form>
            </Box>
        </>
    );
}

export default LoginForm;