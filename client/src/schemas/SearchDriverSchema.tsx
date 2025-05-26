import { z } from 'zod';
import CitySchema from './CitySchems';

const SearchDriverSchema = z.object({
   source: CitySchema,
   destination: CitySchema,
   date: z.date(),
   time: z.string()
 
 
 
});
export default SearchDriverSchema