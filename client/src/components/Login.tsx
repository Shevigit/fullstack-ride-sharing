// import { useState } from 'react';
// import { Button, TextField } from '@mui/material';
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import LoginSchema from '../schemas/LoginSchema';
// import { errorCSS, formStyle, InputStyle, submitBtn } from '../CSS/login';
// import { LoginCredentials } from './interfaces/Interface';
// import { useLoginMutation } from '../stores/Slices/UserApiSlice';
// import { useNavigate } from 'react-router';
// import { useCookies } from 'react-cookie';
// interface UserSchema {
//   email: string;
//   password: string;

// }
// const LoginIn = () => {
//   const { register, formState: { errors }, handleSubmit } = useForm<UserSchema>({
//     mode: "onBlur",
//     resolver: zodResolver(LoginSchema) as any,
//     defaultValues: {
//       email: '',
//       password: '',

//     }
//   });
//   const [isDisplay, setIsDisplay] = useState(false)
//   const [Login] = useLoginMutation()
//   const navigate = useNavigate()
//   const [, setCookie] = useCookies(['token']);
//   const handleBlur = () => {
//     setIsDisplay(!isDisplay)
//   }
//   const [error, setError] = useState<boolean>(false)
//   const onSubmit = async (data: LoginCredentials) => {
//     try {
//       const result = await Login(data).unwrap();
//       console.log(result);
//       setCookie('token', result.accessToken, { path: '/', maxAge: 3600 * 24 * 7 });
//       localStorage.setItem("currentUser", JSON.stringify(result.user));
//       navigate('/')
//     } catch (err) {
//       console.log(err);
//       setError(true)
//     }
//   }
//   return (
//     <>

//       <div style={formStyle}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <TextField
//               sx={InputStyle}
//               hiddenLabel
//               id="filled-hidden-label-normal"
//               placeholder="email"
//               variant="filled"
//               color="success"
//               {...register("email")}

//             />
//             {errors.email && <p style={errorCSS}>{errors.email.message}</p>}
//           </div>
//           <div>
//             <TextField
//               sx={InputStyle}
//               hiddenLabel
//               id="filled-hidden-label-normal"
//               placeholder="password"
//               variant="filled"
//               color="success"
//               {...register("password")}
//               onBlur={handleBlur}
//             />
//             {errors.password && <p style={errorCSS}>{errors.password.message}</p>}
//           </div>
//           <div>{error?<p style={errorCSS}>משתמש אינו קיים</p>:<p></p>}</div>
//           <Button type="submit" sx={submitBtn}>Submit</Button>
//         </form>
//       </div>
//     </>
//   )
// }
// export default LoginIn

import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';

import LoginSchema from '../schemas/LoginSchema';
import { LoginCredentials } from './interfaces/Interface';
import { useLoginMutation } from '../stores/Slices/UserApiSlice';
import { styles } from '../CSS/loginIn';


interface UserSchema {
  email: string;
  password: string;
}

const LoginIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserSchema>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [Login] = useLoginMutation();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['token']);
  const [error, setError] = useState<boolean>(false);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const result = await Login(data).unwrap();
      setCookie('token', result.accessToken, { path: '/', maxAge: 3600 * 24 * 7 });
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <Box sx={styles.rootBox}>
      <Paper elevation={6} sx={styles.paper}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" sx={styles.title}>
          התחברות
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={styles.inputContainer}>
            <TextField
              sx={styles.input}
              hiddenLabel
              placeholder="אימייל"
              variant="filled"
              color="primary"
              fullWidth
              {...register("email")}
            />
            {errors.email && <Typography sx={styles.errorText}>{errors.email.message}</Typography>}
          </Box>

          <Box sx={styles.inputContainer}>
            <TextField
              sx={styles.input}
              hiddenLabel
              placeholder="סיסמה"
              variant="filled"
              color="primary"
              type="password"
              fullWidth
              {...register("password")}
            />
            {errors.password && <Typography sx={styles.errorText}>{errors.password.message}</Typography>}
          </Box>

          {error && (
            <Typography sx={styles.errorText} textAlign="center">
              משתמש אינו קיים
            </Typography>
          )}

          <Button type="submit" fullWidth sx={styles.submitBtn}>
            התחבר
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginIn;
