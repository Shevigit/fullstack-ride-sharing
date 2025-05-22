
import { z } from 'zod';

const FormSchema = z.object({
  userName: z.string()
    .min(2, "שם המשתמש חייב להכיל לפחות 2 תווים")
    .max(50, "שם המשתמש לא יכול להכיל יותר מ-50 תווים"),
  phone: z.string().min(9, { message: "phone must include minimum 9 digits" }).regex(/^\d+$/, { message: "phone must consist of digits only" })
    .max(10, { message: "phone must include maximum 10 digits" }),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  hasCar: z.boolean(),
  driveringLicense: z.string().min(2, " מספר רשיון חייב להכיל לפחות 2 תווים")
    .max(50, "מספר רשיון  לא יכול להכיל יותר מ-50 תווים").optional(),
    gender: z.string()
})

// export type User = z.infer<typeof FormSchema>;

// Export FormSchema as default
export default FormSchema;