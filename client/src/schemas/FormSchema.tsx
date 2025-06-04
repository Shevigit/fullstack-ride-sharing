
 import { z } from 'zod';

// const FormSchema = z.object({
//   userName: z.string()
//     .min(2, "שם המשתמש חייב להכיל לפחות 2 תווים")
//     .max(50, "שם המשתמש לא יכול להכיל יותר מ-50 תווים"),
//   phone: z.string().min(9, { message: "phone must include minimum 9 digits" }).regex(/^\d+$/, { message: "phone must consist of digits only" })
//     .max(10, { message: "phone must include maximum 10 digits" }),
//   email: z.string().email("Invalid email").min(1, "Email is required"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
//   hasCar: z.boolean(),
//   driveringLicense: z.string().min(2, " מספר רשיון חייב להכיל לפחות 2 תווים")
//     .max(50, "מספר רשיון  לא יכול להכיל יותר מ-50 תווים").optional(),
//     gender: z.string()
// })

// // export type User = z.infer<typeof FormSchema>;

// // Export FormSchema as default
// export default FormSchema;


const FormSchema = z
  .object({
    userName: z.string()
      .min(2, "שם המשתמש חייב להכיל לפחות 2 תווים")
      .max(50, "שם המשתמש לא יכול להכיל יותר מ-50 תווים"),
    
    phone: z.string()
      .min(9, { message: "מספר הטלפון חייב להכיל לפחות 9 ספרות" })
      .max(10, { message: "מספר הטלפון לא יכול להכיל יותר מ-10 ספרות" })
      .regex(/^\d+$/, { message: "מספר הטלפון חייב להכיל ספרות בלבד" }),

    email: z.string()
      .email("כתובת אימייל לא תקינה")
      .min(1, "אימייל הוא שדה חובה"),

    password: z.string()
      .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים"),

    hasCar: z.boolean(),

    driveringLicense: z.string()
      .optional(), // נסביר בהמשך למה אין פה min/max

    gender: z.enum(['זכר', 'נקבה'], {
      errorMap: () => ({ message: 'יש לבחור מין' }),
    }),
  })
  .refine((data) => {
    // אם יש לו רכב, אז חובה מספר רישיון תקין
    if (data.hasCar && (!data.driveringLicense || data.driveringLicense.length < 2)) {
      return false;
    }
    return true;
  }, {
    path: ['driveringLicense'],
    message: 'יש להזין מספר רישיון נהיגה תקף אם ברשותך רכב',
  })
  .transform((data) => {
    // אם אין לו רכב – ננקה את השדה לפני שליחה לשרת
    if (!data.hasCar) {
      data.driveringLicense = undefined;
    }
    return data;
  });

export default FormSchema;
