
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

import { useDispatch } from 'react-redux';
import { login } from '../stores/Slices/authSlice'; 

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
  const dispatch = useDispatch();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const result = await Login(data).unwrap();

      // שמירת הטוקן בקוקיז
      setCookie('token', result.accessToken, { path: '/', maxAge: 3600 * 24 * 7 });

      // שמירת המשתמש ב-localStorage
      localStorage.setItem("currentUser", JSON.stringify(result.user));

      // עדכון ה-Redux state
      dispatch(login(result.user));

      // ניתוב לעמוד הבית (או כל עמוד אחר שמכיל UserLayout)
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
