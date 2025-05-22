import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema from '../schemas/LoginSchema';
import { errorCSS, formStyle, InputStyle, submitBtn } from '../CSS/login';
interface UserSchema {
  email: string;
  password: string;

}
const LoginIn = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<UserSchema>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema) as any,
    defaultValues: {
      email: '',
      password: '',

    }
  });
  const [isDisplay, setIsDisplay] = useState(false)

  const handleBlur = () => {
    setIsDisplay(!isDisplay)

  }
  const onSubmit = () => {

  }
  return (
    <>

      <div style={formStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              sx={InputStyle}
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="email"
              variant="filled"
              color="success"
              {...register("email")}

            />
            {errors.email && <p style={errorCSS}>{errors.email.message}</p>}
          </div>
          <div>
            <TextField
              sx={InputStyle}
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder="password"
              variant="filled"
              color="success"
              {...register("password")}
              onBlur={handleBlur}
            />
            {errors.password && <p style={errorCSS}>{errors.password.message}</p>}
          </div>
          <Button type="button" sx={submitBtn}>Submit</Button>
        </form>
      </div>
    </>
  )
}
export default LoginIn

