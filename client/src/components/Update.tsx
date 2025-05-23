import { Box, Button, Checkbox, FormControlLabel, RadioGroup, Stack, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { User } from "./interfaces/Interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useRegisterMutation } from "../stores/Slices/UserApiSlice";
import FormSchema from "../schemas/FormSchema";

const Update=()=>{
   
        const [checked, setChecked] = useState<boolean>(false);
        const navigate = useNavigate();
        const [Register] = useRegisterMutation();
        // הסר את: const [gender, setGender]=useState<string>("") - כבר עשינו את זה
    
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            // רצוי להסיר את ה-useState ל-checked ולתת ל-react-hook-form לנהל את זה
            setChecked(event.target.checked);
        };
    
        // <--- הנה הקוד המעודכן שלך עבור useForm --->
        const {
            register,
            handleSubmit,
            control, // נוסיף את control כדי שנוכל להשתמש ב-Controller
            watch,   // נוסיף את watch כדי לשלוט ב-disabled של שדה הרישיון
            formState: { errors }
        } = useForm<User>({ // מומלץ לציין את הטיפוס כאן אם הוא מוגדר
            mode: "onBlur",
            resolver: zodResolver(FormSchema),
            defaultValues: {
                // הגדרת ערכי ברירת מחדל לכל השדות בטופס
                userName: "",
                phone: "",
                email: "",
                password: "",
                hasCar: false, // ברירת מחדל ל-Checkbox
                driveringLicense: "", // ברירת מחדל לשדה אופציונלי (אם ריק)
                gender: "זכר", // <--- חשוב! הגדרת ברירת מחדל ל-RadioGroup
            }
        });
        // <--- סוף הקוד המעודכן עבור useForm --->
    
        // השתמש ב-watch כדי לעקוב אחר מצב ה-Checkbox
        const hasCarValue = watch("hasCar");
    
        const onSubmit = async (data: User) => {
            // אין צורך ליצור אובייקט user חדש על ידי הקצאות אחד-אחד אם data כבר מסוג User
            // אלא אם כן יש לוגיקה נוספת שאתה רוצה ליישם.
            // אם הטיפוס של `data` הוא `User` (כפי שהגדרת בפונקציה), והוא מגיע כבר מסודר
            // מה-zodResolver, אין צורך ביצירת אובייקט `user` נוסף.
            // אם `data` הוא מטיפוס אחר (למשל FormData), אז כן צריך להמיר אותו.
            // נניח ש-data כבר תואם ל-User (לאחר תיקונים קודמים).
    
            // וודא ש-driveringLicense ו-hasCar מקבלים ערכים תקינים אם הם אופציונליים
            // ה-defaultValues כבר מטפלים בזה בהתחלה, אבל זה מחזק את זה.
            const userToSend: User = {
                ...data,
                hasCar: data.hasCar || false,
                driveringLicense: data.driveringLicense || "",
                // gender אמור להגיע תקין מ-data.gender עכשיו
            };
    
            console.log(userToSend); // זה ה-user שיישלח
            try {
                const result = await Register(userToSend).unwrap();
                console.log(result);
                localStorage.setItem('user', JSON.stringify(userToSend)); // **שוב אזהרה: אל תאחסן סיסמא ב-localStorage!**
                navigate('/')
            } catch (error) {
                console.error("שגיאה ברישום:", error);
                // טיפול בשגיאה - הצג הודעה למשתמש
            }
        };
    return(
        <>
            <h1>Update</h1>
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
    )
}
export default Update
