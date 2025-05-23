
import { z } from 'zod';


const GenderEnum = ['Without preference', 'male', 'female'] as const
const statusEnum = ['active', 'canceled', 'completed'] as const


const SuggestionSchema = z.object({
    address: z.string()
    .min(2, "כתובת חייבת להכיל לפחות 2 תווים")
    .max(50, "כתובת לא יכולה להכיל יותר מ-50 תווים"),
    source: z.string()
    .min(2, "שם עיר חייב להכיל לפחות 2 תווים")
    .max(50, "שם עיר לא יכול להכיל יותר מ-50 תווים"),
    destination: z.string().min(2, "שם עיר חייב להכיל לפחות 2 תווים")
    .max(50, "שם עיר לא יכול להכיל יותר מ-50 תווים"),
     date: z.date().refine((date) => date >= new Date(), {
        message: "התאריך חייב להיות מהיום או מאוחר יותר",
      }),
  time: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/, {
    message: "יש להזין זמן בתבנית של ארבע ספרות (hhmm)",
  }),
    genderPreference:z.enum(GenderEnum, {
    required_error: "יש להזין סוג מין תקני",
  })

})

export default SuggestionSchema;

