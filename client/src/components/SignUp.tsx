// import { Button, Box, TextField, Stack, Checkbox, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form'; // וודא ש-Controller מיובא כאן!
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useNavigate } from 'react-router-dom'; // תיקון: אם זה react-router-dom, הנתיב הוא כזה
// import FormSchema from '../schemas/FormSchema';
// import {  User } from './interfaces/Interface'; // וודא ש-interface User מעודכן
// import { useRegisterMutation } from '../stores/Slices/UserApiSlice';
// const LoginForm = () => {
//     const navigate = useNavigate();
//     const [Register] = useRegisterMutation();
//     const {
//         register,
//         handleSubmit,
//         control,
//         watch,  
//         formState: { errors }
//     } = useForm<User>({ 
//         mode: "onBlur",
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
           
//             userName: "",
//             phone: "",
//             email: "",
//             password: "",
//             hasCar: false, 
//             driveringLicense: "",
//             gender: "זכר", 
//         }
//     });
//     const hasCarValue = watch("hasCar");
//     const onSubmit = async (data: User) => {
//         const userToSend: User = {
//             ...data,
//             hasCar: data.hasCar || false,
//             driveringLicense: data.driveringLicense || "",
//         };
//         console.log(userToSend); 
//         try {
//             const result = await Register(userToSend).unwrap();
//             console.log(result);
//            localStorage.setItem("currentUser", JSON.stringify(result.user));
//             navigate('/')
//         } catch (error) {
//             console.error("שגיאה ברישום:", error);
//         }
//     };
//     return (
//         <>
//             <Box role="presentation" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Stack >
//                         <TextField
//                             hiddenLabel
//                             variant="filled"
//                             size="small"
//                             color="success"
//                             placeholder="שם פרטי "
//                             {...register("userName")}
//                         />
//                         {errors.userName && <p>{errors.userName.message}</p>}

//                         <TextField
//                             hiddenLabel
//                             placeholder="פלאפון"
//                             variant="filled"
//                             color="success"
//                             {...register("phone")}
//                         />
//                         {errors.phone && <p>{errors.phone.message}</p>}

//                         <TextField
//                             hiddenLabel
//                             placeholder="מייל"
//                             variant="filled"
//                             color="success"
//                             {...register("email")}
//                         />
//                         {errors.email && <p>{errors.email.message}</p>}

//                         <TextField
//                             hiddenLabel
//                             placeholder="סיסמא"
//                             variant="filled"
//                             color="success"
//                             {...register("password")}
//                         />
//                         {errors.password && <p>{errors.password.message}</p>}

//                         {/* שימוש ב-watch עבור ה-Checkbox והלייבל */}
//                         <FormControlLabel
//                             control={
//                                 <Checkbox
//                                     color="success"
//                                     checked={hasCarValue} // מצב ה-Checkbox מנוהל על ידי watch
//                                     // אין צורך ב-onChange={handleChange}
//                                     {...register("hasCar")}
//                                 />
//                             }
//                             label="יש לי רכב"
//                         />
//                         {errors.hasCar && <p>{errors.hasCar.message}</p>}

//                         <TextField
//                             disabled={!hasCarValue} // שדה מופעל/מושבת לפי hasCarValue
//                             hiddenLabel
//                             placeholder="מספר רשיון"
//                             variant="filled"
//                             color="success"
//                             {...register("driveringLicense")}
//                         />
//                         {errors.driveringLicense && <p>{errors.driveringLicense.message}</p>}

//                         {/* שימוש ב-Controller עבור RadioGroup */}
//                         <Controller
//                             name="gender" // שם השדה חייב להתאים לסכימה ול-interface
//                             control={control} // מעבירים את control
//                             render={({ field }) => (
//                                 <RadioGroup {...field}> {/* מעבירים את כל מאפייני field */}
//                                     <FormControlLabel style={{ color: "black" }} value="זכר" control={<Radio color="success" />} label="זכר" />
//                                     <FormControlLabel style={{ color: "black" }} value="נקבה" control={<Radio color="success" />} label="נקבה" />
//                                 </RadioGroup>
//                             )}
//                         />
//                         {errors.gender && <p>{errors.gender.message}</p>}
//                     </Stack>
//                     <Button type="submit" sx={{ marginTop: 2 }}>Submit</Button>
//                 </form>
//             </Box>
//         </>
//     );
// }

// export default LoginForm;
import {
  Box,
  TextField,
  Stack,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Typography,
  Paper,
  useTheme,
  InputAdornment,
} from '@mui/material';
import { AccountCircle, Email, Lock, Phone, Badge } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import FormSchema from '../schemas/FormSchema';
import { User } from './interfaces/Interface';
import { useRegisterMutation } from '../stores/Slices/UserApiSlice';
import { useEffect, useState } from 'react';

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [Register] = useRegisterMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<User>({
    mode: 'onBlur',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: '',
      phone: '',
      email: '',
      password: '',
      hasCar: false,
      driveringLicense: '',
      gender: 'זכר',
    },
  });

  const hasCarValue = watch('hasCar');

  useEffect(() => {
    if (!hasCarValue) {
      setValue('driveringLicense', '');
    }
  }, [hasCarValue]);

  const onSubmit = async (data: User) => {
    try {
      const result = await Register(data).unwrap();
      localStorage.setItem('currentUser', JSON.stringify(result.user));
      navigate('/');
    } catch (error) {
      setApiError('אירעה שגיאה. נסה שוב.');
    }
  };

  return (
    <Box
      dir="rtl"
      sx={{
        background: 'linear-gradient(to right, #dbeafe, #ede9fe)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 500,
          padding: 4,
          borderRadius: 5,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.8)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 3, color: '#4f46e5' }}
        >
          הרשמה לשירות
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              label="שם פרטי"
              fullWidth
              variant="outlined"
              {...register('userName')}
              error={!!errors.userName}
              helperText={errors.userName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="טלפון"
              fullWidth
              variant="outlined"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="אימייל"
              fullWidth
              variant="outlined"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="סיסמה"
              type="password"
              fullWidth
              variant="outlined"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  {...register('hasCar')}
                  checked={hasCarValue}
                />
              }
              label="יש לי רכב"
            />

            <TextField
              label="מספר רישיון נהיגה"
              fullWidth
              variant="outlined"
              disabled={!hasCarValue}
              {...register('driveringLicense')}
              error={!!errors.driveringLicense}
              helperText={errors.driveringLicense?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Badge color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="subtitle1" fontWeight="medium">
              מין:
            </Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="זכר"
                    control={<Radio color="secondary" />}
                    label="זכר"
                  />
                  <FormControlLabel
                    value="נקבה"
                    control={<Radio color="secondary" />}
                    label="נקבה"
                  />
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <Typography color="error">{errors.gender.message}</Typography>
            )}

            {apiError && (
              <Typography color="error" textAlign="center">
                {apiError}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#fff',
                background: 'linear-gradient(45deg, #6366f1, #3b82f6)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4f46e5, #2563eb)',
                },
                boxShadow: '0 5px 15px rgba(99,102,241,0.3)',
              }}
            >
              הרשם עכשיו
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
