
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
  InputAdornment,
} from '@mui/material';
import { AccountCircle, Email, Lock, Phone, Badge } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import FormSchema from '../schemas/FormSchema';
import { User } from './interfaces/Interface';
import { useRegisterMutation } from '../stores/Slices/UserApiSlice';
import { styles } from '../CSS/loginForm';

const LoginForm = () => {
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
    <Box dir="rtl" sx={styles.rootBox}>
      <Paper elevation={6} sx={styles.paper}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" sx={styles.title}>
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

{hasCarValue && (
  <TextField
    label="מספר רישיון נהיגה"
    fullWidth
    variant="outlined"
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
)}
            <Typography variant="subtitle1" fontWeight="medium">
              מין:
            </Typography>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value="זכר" control={<Radio color="secondary" />} label="זכר" />
                  <FormControlLabel value="נקבה" control={<Radio color="secondary" />} label="נקבה" />
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

            <Button type="submit" fullWidth sx={styles.submitButton}>
              הרשם עכשיו
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
