


// import { useState } from "react";
// import { format } from "date-fns";
// import { he } from "date-fns/locale";
// import {
//   TextField,
//   Button,
//   InputAdornment,
//   Typography,
//   Autocomplete,
//   Box,
//   Card,
//   CardContent,
//   Stack,
//   Chip,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import Grid from '@mui/material/Grid';
// import {
//   Search as SearchIcon,
//   CalendarToday as CalendarIcon,
//   AccessTime as AccessTimeIcon,
// } from "@mui/icons-material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Link } from "react-router-dom";
// import { useGetAlldriversQuery } from "../stores/Slices/endPointsDriver";
// import { useGetCitiesQuery } from "../stores/Slices/apiSliceDrivers"; 
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import SearchDriverSchema from "../schemas/SearchDriverSchema";
// import { Driver } from "./interfaces/Interface";

// type City = {
//   id: number;
//   name: string;
// };

// type SearchData = {
//   source: City;
//   destination: City;
//   date: Date;
//   time: string;
// };

// const SearchDrive = () => {
//   const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
//   const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

//   const { data: GetAlldrivers, isError, isLoading } = useGetAlldriversQuery();
//   const { data: cities = [], isLoading: isCitiesLoading, error: citiesError } = useGetCitiesQuery();

//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     formState: { errors },
//   } = useForm<SearchData>({
//     resolver: zodResolver(SearchDriverSchema),
//   });

//   const watchedSource = watch("source");
//   const watchedDestination = watch("destination");
//   const watchedDate = watch("date");
//   const watchedTime = watch("time");

//   const handleReset = () => {
//     if (GetAlldrivers) {
//       setFilteredDrivers(GetAlldrivers);
//     }
//   };

//   const onSubmit = (data: SearchData) => {
//     setSearchAttempted(true);
//     if (!GetAlldrivers) {
//       setFilteredDrivers([]);
//       return;
//     }
//     const filtered = GetAlldrivers.filter((x) =>
//       (data.source ? x.source === data.source.name : true) &&
//       (data.destination ? x.destination === data.destination.name : true) &&
//       (data.date && x.date ? format(new Date(x.date), 'yyyy-MM-dd') === format(data.date, 'yyyy-MM-dd') : true)
//     );
//     setFilteredDrivers(filtered);
//   };

//   const driversToRender = searchAttempted ? filteredDrivers : (GetAlldrivers || []);

//   if (isLoading || isCitiesLoading) {
//     return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
//   }

//   if (isError || citiesError) {
//     return <Alert severity="error">שגיאה בטעינת מידע.</Alert>;
//   }

//   return (
//     <div>
//       <Box sx={{ p: 3, boxShadow: 2, borderRadius: 3, backgroundColor: "#f5f5f5", marginLeft: "10vw", marginTop: "17vh", width: "100%" }}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={2}>
//             {[{ name: "source", label: "עיר מוצא" }, { name: "destination", label: "עיר יעד" }].map((field, idx) => (
//               <Grid item xs={12} md={6} key={field.name}>
//                 <Controller
//                   name={field.name as "source" | "destination"}
//                   control={control}
//                   render={({ field: { onChange, value, ...fieldProps } }) => (
//                     <Autocomplete
//                       {...fieldProps}
//                       options={cities}
//                       getOptionLabel={(option) => typeof option === "string" ? option : option?.name || ""}
//                       isOptionEqualToValue={(option, val) => option?.id === val?.id}
//                       sx={{ width: "15vw" }}
//                       value={value}
//                       onChange={(_, newValue: City | null) => onChange(newValue)}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label={field.label}
//                           fullWidth
//                           error={!!errors[field.name as keyof typeof errors]}
//                           helperText={errors[field.name as keyof typeof errors]?.message}
//                         />
//                       )}
//                     />
//                   )}
//                 />
//               </Grid>
//             ))}
//             <Grid item xs={12} md={6}>
//               <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
//                 <Controller
//                   name="date"
//                   control={control}
//                   render={({ field: { onChange, value, ...field } }) => (
//                     <DatePicker
//                       {...field}
//                       label="תאריך"
//                       value={value}
//                       onChange={(newValue: Date | null) => onChange(newValue)}
//                       disablePast
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           fullWidth
//                           error={!!errors.date}
//                           helperText={errors.date?.message}
//                           InputProps={{
//                             ...params.InputProps,
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <CalendarIcon />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       )}
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="שעה"
//                 type="time"
//                 {...register('time')}
//                 fullWidth
//                 error={!!errors.time}
//                 helperText={errors.time?.message}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <AccessTimeIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//                 inputProps={{ step: 300 }}
//               />
//             </Grid>
//             <Grid item xs={12} display="flex" justifyContent="center">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 startIcon={<SearchIcon />}
//                 sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2, marginRight: "1vw" }}
//                 disabled={!watchedSource || !watchedDestination || !watchedDate || !watchedTime}
//               >
//                 חפש נסיעות
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
//                 onClick={handleReset}
//               >
//                 אפס סינון
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>

//       <Box mt={4} sx={{ maxWidth: "100%", mx: "auto", p: 3, borderRadius: 3, marginLeft: "17vw" }}>
//         {driversToRender.length === 0 && (
//           <Typography variant="body1" align="center" sx={{ color: "black" }}>
//             {searchAttempted ? "לא נמצאו נהגים התואמים לסינון." : "אין נהגים זמינים כרגע."}
//           </Typography>
//         )}

//         {driversToRender.map((driver) => {
//           const dateObj = driver.date ? new Date(driver.date) : null;
//           const formattedDate = dateObj ? format(dateObj, "dd/MM/yyyy", { locale: he }) : "אין תאריך";
//           return (
//             <Card key={driver._id} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: 3, backgroundColor: "#f9f9ff" }}>
//               <CardContent>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center">
//                   <Box>
//                     <Typography variant="h6" color="primary" gutterBottom>
//                       {driver.destination} → {driver.source}
//                     </Typography>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <AccessTimeIcon fontSize="small" />
//                       <Typography variant="body2">
//                         {formattedDate} בשעה {driver.time}
//                       </Typography>
//                     </Stack>
//                     <Typography variant="body2" color="text.secondary">
//                       {driver.availableSeats > 0 ? `${driver.availableSeats} מקומות פנויים` : "אין מקומות פנויים"}
//                     </Typography>
//                   </Box>
//                   <Stack alignItems="flex-end" spacing={1}>
//                     <Chip
//                       label={
//                         new Date(driver.date) < new Date()
//                           ? "הושלם"
//                           : driver.status
//                           ? "פעיל"
//                           : "לא פעיל"
//                       }
//                       color={driver.status ? "success" : "default"}
//                       size="small"
//                     />
//                     <Button
//                       component={Link}
//                       to={`/SearchDrive/${driver._id}`}
//                       variant="outlined"
//                       size="small"
//                       disabled={driver.availableSeats === 0}
//                     >
//                       {driver.availableSeats === 0 ? "אין מקומות פנויים" : "פרטים נוספים"}
//                     </Button>
//                   </Stack>
//                 </Stack>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </Box>
//     </div>
//   );
// };

// export default SearchDrive;













// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { he } from "date-fns/locale";
// import {
//   TextField,
//   Button,
//   InputAdornment,
//   Typography,
//   Autocomplete,
//   Box,
//   Card,
//   CardContent,
//   Stack,
//   Chip,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import Grid from '@mui/material/Grid';
// import {
//   Search as SearchIcon,
//   CalendarToday as CalendarIcon,
//   AccessTime as AccessTimeIcon,
// } from "@mui/icons-material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Link } from "react-router-dom";
// import { useGetAlldriversQuery } from "../stores/Slices/endPointsDriver";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import SearchDriverSchema from "../schemas/SearchDriverSchema";
// import { Driver } from "./interfaces/Interface";

// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../stores/Store";
// import { fetchCities, City } from "../stores/Slices/citiesSlice";

// type SearchData = {
//   source: City | null;
//   destination: City | null;
//   date: Date | null;
//   time: string;
// };

// const SearchDrive = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { cities, isLoading: isCitiesLoading, error: citiesError } = useSelector(
//     (state: RootState) => state.cities
//   );

//   const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
//   const [searchAttempted, setSearchAttempted] = useState<boolean>(false);

//   const { data: GetAlldrivers, isError, isLoading } = useGetAlldriversQuery();

//   // טוענים את הערים פעם אחת בטעינה
//   useEffect(() => {
//     if (cities.length === 0) {
//       dispatch(fetchCities());
//     }
//   }, [dispatch, cities.length]);

//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     formState: { errors },
//   } = useForm<SearchData>({
//     resolver: zodResolver(SearchDriverSchema),
//     defaultValues: {
//       source: null,
//       destination: null,
//       date: null,
//       time: "",
//     },
//   });

//   const watchedSource = watch("source");
//   const watchedDestination = watch("destination");
//   const watchedDate = watch("date");
//   const watchedTime = watch("time");

//   const handleReset = () => {
//     if (GetAlldrivers) {
//       setFilteredDrivers(GetAlldrivers);
//       setSearchAttempted(false);
//     }
//   };

//   const onSubmit = (data: SearchData) => {
//     setSearchAttempted(true);
//     if (!GetAlldrivers) {
//       setFilteredDrivers([]);
//       return;
//     }
//     const filtered = GetAlldrivers.filter((x) =>
//       (data.source ? x.source === data.source.name : true) &&
//       (data.destination ? x.destination === data.destination.name : true) &&
//       (data.date && x.date ? format(new Date(x.date), 'yyyy-MM-dd') === format(data.date, 'yyyy-MM-dd') : true)
//     );
//     setFilteredDrivers(filtered);
//   };

//   const driversToRender = searchAttempted ? filteredDrivers : (GetAlldrivers || []);

//   if (isLoading || isCitiesLoading) {
//     return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
//   }

//   if (isError || citiesError) {
//     return <Alert severity="error">שגיאה בטעינת מידע.</Alert>;
//   }

//   return (
//     <div>
//       <Box
//         sx={{
//           p: 3,
//           boxShadow: 2,
//           borderRadius: 3,
//           backgroundColor: "#f5f5f5",
//           marginLeft: "10vw",
//           marginTop: "17vh",
//           width: "100%",
//         }}
//       >
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={2}>
//             {[{ name: "source", label: "עיר מוצא" }, { name: "destination", label: "עיר יעד" }].map(
//               (field) => (
//                 <Grid item xs={12} md={6} key={field.name}>
//                   <Controller
//                     name={field.name as "source" | "destination"}
//                     control={control}
//                     render={({ field: { onChange, value, ...fieldProps } }) => (
//                       <Autocomplete
//                         {...fieldProps}
//                         options={cities}
//                         getOptionLabel={(option) =>
//                           typeof option === "string" ? option : option?.name || ""
//                         }
//                         isOptionEqualToValue={(option, val) => option?.id === val?.id}
//                         sx={{ width: "15vw" }}
//                         value={value}
//                         onChange={(_, newValue: City | null) => onChange(newValue)}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label={field.label}
//                             fullWidth
//                             error={!!errors[field.name as keyof typeof errors]}
//                             helperText={errors[field.name as keyof typeof errors]?.message}
//                           />
//                         )}
//                       />
//                     )}
//                   />
//                 </Grid>
//               )
//             )}
//             <Grid item xs={12} md={6}>
//               <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
//                 <Controller
//                   name="date"
//                   control={control}
//                   render={({ field: { onChange, value, ...field } }) => (
//                     <DatePicker
//                       {...field}
//                       label="תאריך"
//                       value={value}
//                       onChange={(newValue: Date | null) => onChange(newValue)}
//                       disablePast
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           fullWidth
//                           error={!!errors.date}
//                           helperText={errors.date?.message}
//                           InputProps={{
//                             ...params.InputProps,
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <CalendarIcon />
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       )}
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="שעה"
//                 type="time"
//                 {...register("time")}
//                 fullWidth
//                 error={!!errors.time}
//                 helperText={errors.time?.message}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <AccessTimeIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//                 inputProps={{ step: 300 }}
//               />
//             </Grid>
//             <Grid item xs={12} display="flex" justifyContent="center">
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 startIcon={<SearchIcon />}
//                 sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2, marginRight: "1vw" }}
//                 disabled={!watchedSource || !watchedDestination || !watchedDate || !watchedTime}
//               >
//                 חפש נסיעות
//               </Button>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
//                 onClick={handleReset}
//               >
//                 אפס סינון
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>

//       <Box mt={4} sx={{ maxWidth: "100%", mx: "auto", p: 3, borderRadius: 3, marginLeft: "17vw" }}>
//         {driversToRender.length === 0 && (
//           <Typography variant="body1" align="center" sx={{ color: "black" }}>
//             {searchAttempted ? "לא נמצאו נהגים התואמים לסינון." : "אין נהגים זמינים כרגע."}
//           </Typography>
//         )}

//         {driversToRender.map((driver) => {
//           const dateObj = driver.date ? new Date(driver.date) : null;
//           const formattedDate = dateObj ? format(dateObj, "dd/MM/yyyy", { locale: he }) : "אין תאריך";
//           return (
//             <Card
//               key={driver._id}
//               variant="outlined"
//               sx={{ mb: 2, p: 2, borderRadius: 3, backgroundColor: "#f9f9ff" }}
//             >
//               <CardContent>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center">
//                   <Box>
//                     <Typography variant="h6" color="primary" gutterBottom>
//                       {driver.destination} → {driver.source}
//                     </Typography>
//                     <Stack direction="row" spacing={1} alignItems="center">
//                       <AccessTimeIcon fontSize="small" />
//                       <Typography variant="body2">
//                         {formattedDate} בשעה {driver.time}
//                       </Typography>
//                     </Stack>
//                     <Typography variant="body2" color="text.secondary">
//                       {driver.availableSeats > 0
//                         ? `${driver.availableSeats} מקומות פנויים`
//                         : "אין מקומות פנויים"}
//                     </Typography>
//                   </Box>
//                   <Stack alignItems="flex-end" spacing={1}>
//                     <Chip
//                       label={
//                         new Date(driver.date) < new Date()
//                           ? "הושלם"
//                           : driver.status
//                           ? "פעיל"
//                           : "לא פעיל"
//                       }
//                       color={driver.status ? "success" : "default"}
//                       size="small"
//                     />
//                     <Button
//                       component={Link}
//                       to={`/SearchDrive/${driver._id}`}
//                       variant="outlined"
//                       size="small"
//                       disabled={driver.availableSeats === 0}
//                     >
//                       {driver.availableSeats === 0 ? "אין מקומות פנויים" : "פרטים נוספים"}
//                     </Button>
//                   </Stack>
//                 </Stack>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </Box>
//     </div>
//   );
// };

// export default SearchDrive;
// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { he } from "date-fns/locale";
// import {
//   TextField,
//   Button,
//   InputAdornment,
//   Typography,
//   Autocomplete,
//   Box,
//   Card,
//   CardContent,
//   Stack,
//   Chip,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import Grid from '@mui/material/Grid';
// import {
//   Search as SearchIcon,
//   CalendarToday as CalendarIcon,
//   AccessTime as AccessTimeIcon,
// } from "@mui/icons-material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Link } from "react-router-dom";
// import { useGetAlldriversQuery } from "../stores/Slices/endPointsDriver";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import SearchDriverSchema from "../schemas/SearchDriverSchema";
// import { Driver } from "./interfaces/Interface";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../stores/Store";
// import { fetchCities, City } from "../stores/Slices/citiesSlice";

// type SearchData = {
//   source: City | null;
//   destination: City | null;
//   date: Date | null;
//   time: string;
// };

// const SearchDrive = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { cities, isLoading: isCitiesLoading, error: citiesError } = useSelector((state: RootState) => state.cities);
//   const { data: GetAlldrivers, isError, isLoading } = useGetAlldriversQuery();

//   const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
//   const [searchAttempted, setSearchAttempted] = useState(false);

//   useEffect(() => {
//     if (cities.length === 0) dispatch(fetchCities());
//   }, [dispatch, cities.length]);

//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     formState: { errors },
//   } = useForm<SearchData>({
//     resolver: zodResolver(SearchDriverSchema),
//     defaultValues: { source: null, destination: null, date: null, time: "" },
//   });

//   const handleReset = () => {
//     if (GetAlldrivers) {
//       setFilteredDrivers(GetAlldrivers);
//       setSearchAttempted(false);
//     }
//   };

//   const onSubmit = (data: SearchData) => {
//     setSearchAttempted(true);
//     if (!GetAlldrivers) return setFilteredDrivers([]);

//     const filtered = GetAlldrivers.filter(driver =>
//       (!data.source || driver.source === data.source.name) &&
//       (!data.destination || driver.destination === data.destination.name) &&
//       (!data.date || (driver.date && format(new Date(driver.date), 'yyyy-MM-dd') === format(data.date, 'yyyy-MM-dd')))
//     );

//     setFilteredDrivers(filtered);
//   };

//   if (isLoading || isCitiesLoading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
//   if (isError || citiesError) return <Alert severity="error">שגיאה בטעינת מידע.</Alert>;

//   const drivers = searchAttempted ? filteredDrivers : (GetAlldrivers || []);

//   return (
//     <Box sx={{ p: 3, mx: "10vw", mt: "17vh", backgroundColor: "#f5f5f5", borderRadius: 3, boxShadow: 2 }}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={2}>
//           {[{ name: "source", label: "עיר מוצא" }, { name: "destination", label: "עיר יעד" }].map(({ name, label }) => (
//             <Grid item xs={12} md={6} key={name}>
//               <Controller
//                 name={name as "source" | "destination"}
//                 control={control}
//                 render={({ field: { onChange, value, ...rest } }) => (
//                   <Autocomplete
//                     {...rest}
//                     options={cities}
//                     getOptionLabel={(option) => typeof option === "string" ? option : option?.name || ""}
//                     isOptionEqualToValue={(option, val) => option?.id === val?.id}
//                     sx={{ width: "15vw" }}
//                     value={value}
//                     onChange={(_, newValue) => onChange(newValue)}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label={label}
//                         fullWidth
//                         error={!!errors[name as keyof typeof errors]}
//                         helperText={errors[name as keyof typeof errors]?.message}
//                       />
//                     )}
//                   />
//                 )}
//               />
//             </Grid>
//           ))}

//           <Grid item xs={12} md={6}>
//             <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
//               <Controller
//                 name="date"
//                 control={control}
//                 render={({ field: { onChange, value, ...rest } }) => (
//                   <DatePicker
//                     {...rest}
//                     label="תאריך"
//                     value={value}
//                     onChange={onChange}
//                     disablePast
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         fullWidth
//                         error={!!errors.date}
//                         helperText={errors.date?.message}
//                         InputProps={{
//                           ...params.InputProps,
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <CalendarIcon />
//                             </InputAdornment>
//                           )
//                         }}
//                       />
//                     )}
//                   />
//                 )}
//               />
//             </LocalizationProvider>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               label="שעה"
//               type="time"
//               {...register("time")}
//               fullWidth
//               error={!!errors.time}
//               helperText={errors.time?.message}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <AccessTimeIcon />
//                   </InputAdornment>
//                 )
//               }}
//               inputProps={{ step: 300 }}
//             />
//           </Grid>

//           <Grid item xs={12} display="flex" justifyContent="center">
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               startIcon={<SearchIcon />}
//               sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2, mr: 2 }}
//               disabled={!watch("source") || !watch("destination") || !watch("date") || !watch("time")}
//             >
//               חפש נסיעות
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
//               onClick={handleReset}
//             >
//               אפס סינון
//             </Button>
//           </Grid>
//         </Grid>
//       </form>

//       <Box mt={4} sx={{ mx: "7vw" }}>
//         {drivers.length === 0 ? (
//           <Typography align="center" sx={{ color: "black" }}>
//             {searchAttempted ? "לא נמצאו נהגים התואמים לסינון." : "אין נהגים זמינים כרגע."}
//           </Typography>
//         ) : (
//           drivers.map(driver => {
//             const dateObj = driver.date ? new Date(driver.date) : null;
//             const formattedDate = dateObj ? format(dateObj, "dd/MM/yyyy", { locale: he }) : "אין תאריך";
//             return (
//               <Card key={driver._id} sx={{ mb: 2, p: 2, borderRadius: 3, backgroundColor: "#f9f9ff" }}>
//                 <CardContent>
//                   <Stack direction="row" justifyContent="space-between" alignItems="center">
//                     <Box>
//                       <Typography variant="h6" color="primary">
//                         {driver.destination} → {driver.source}
//                       </Typography>
//                       <Stack direction="row" spacing={1} alignItems="center">
//                         <AccessTimeIcon fontSize="small" />
//                         <Typography variant="body2">
//                           {formattedDate} בשעה {driver.time}
//                         </Typography>
//                       </Stack>
//                       <Typography variant="body2" color="text.secondary">
//                         {driver.availableSeats > 0 ? `${driver.availableSeats} מקומות פנויים` : "אין מקומות פנויים"}
//                       </Typography>
//                     </Box>
//                     <Stack alignItems="flex-end" spacing={1}>
//                       <Chip
//                         label={new Date(driver.date) < new Date() ? "הושלם" : driver.status ? "פעיל" : "לא פעיל"}
//                         color={driver.status ? "success" : "default"}
//                         size="small"
//                       />
//                       <Button
//                         component={Link}
//                         to={`/SearchDrive/${driver._id}`}
//                         variant="outlined"
//                         size="small"
//                         disabled={driver.availableSeats === 0}
//                       >
//                         {driver.availableSeats === 0 ? "אין מקומות פנויים" : "פרטים נוספים"}
//                       </Button>
//                     </Stack>
//                   </Stack>
//                 </CardContent>
//               </Card>
//             );
//           })
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default SearchDrive;

// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { he } from "date-fns/locale";
// import {
//   TextField,
//   Button,
//   InputAdornment,
//   Typography,
//   Autocomplete,
//   Box,
//   Card,
//   CardContent,
//   Stack,
//   Chip,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import {
//   Search as SearchIcon,
//   CalendarToday as CalendarIcon,
//   AccessTime as AccessTimeIcon,
// } from "@mui/icons-material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { Link } from "react-router-dom";
// import { useGetAlldriversQuery } from "../stores/Slices/endPointsDriver";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import SearchDriverSchema from "../schemas/SearchDriverSchema";
// import { Driver } from "./interfaces/Interface";
// import { useGetCitiesQuery, City } from "../stores/Slices/citiesApi"; // ✅ שימוש ב־RTK Query

// type SearchData = {
//   source: City | null;
//   destination: City | null;
//   date: Date | null;
//   time: string;
// };

// const SearchDrive = () => {
//   const { data: cities = [], isLoading: isCitiesLoading, error: citiesError } = useGetCitiesQuery();
//   const { data: GetAlldrivers, isError, isLoading } = useGetAlldriversQuery();

//   const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
//   const [searchAttempted, setSearchAttempted] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     formState: { errors },
//   } = useForm<SearchData>({
//     resolver: zodResolver(SearchDriverSchema),
//     defaultValues: { source: null, destination: null, date: null, time: "" },
//   });

//   const handleReset = () => {
//     if (GetAlldrivers) {
//       setFilteredDrivers(GetAlldrivers);
//       setSearchAttempted(false);
//     }
//   };

//   const onSubmit = (data: SearchData) => {
//     setSearchAttempted(true);
//     if (!GetAlldrivers) return setFilteredDrivers([]);

//     const filtered = GetAlldrivers.filter(driver =>
//       (!data.source || driver.source === data.source.name) &&
//       (!data.destination || driver.destination === data.destination.name) &&
//       (!data.date || (driver.date && format(new Date(driver.date), 'yyyy-MM-dd') === format(data.date, 'yyyy-MM-dd')))
//     );

//     setFilteredDrivers(filtered);
//   };

//   if (isLoading || isCitiesLoading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
//   if (isError || citiesError) return <Alert severity="error">שגיאה בטעינת מידע.</Alert>;

//   const drivers = searchAttempted ? filteredDrivers : (GetAlldrivers || []);

//   return (
//     <Box sx={{ p: 3, mx: "10vw", mt: "17vh", backgroundColor: "#f5f5f5", borderRadius: 3, boxShadow: 2 }}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={2}>
//           {[{ name: "source", label: "עיר מוצא" }, { name: "destination", label: "עיר יעד" }].map(({ name, label }) => (
//             <Grid item xs={12} md={6} key={name}>
//               <Controller
//                 name={name as "source" | "destination"}
//                 control={control}
//                 render={({ field: { onChange, value, ...rest } }) => (
//                   <Autocomplete
//                     {...rest}
//                     options={cities}
//                     getOptionLabel={(option) => typeof option === "string" ? option : option?.name || ""}
//                     isOptionEqualToValue={(option, val) => option?.id === val?.id}
//                     sx={{ width: "15vw" }}
//                     value={value}
//                     onChange={(_, newValue) => onChange(newValue)}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label={label}
//                         fullWidth
//                         error={!!errors[name as keyof typeof errors]}
//                         helperText={errors[name as keyof typeof errors]?.message}
//                       />
//                     )}
//                   />
//                 )}
//               />
//             </Grid>
//           ))}

//           <Grid item xs={12} md={6}>
//             <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
//               <Controller
//                 name="date"
//                 control={control}
//                 render={({ field: { onChange, value, ...rest } }) => (
//                   <DatePicker
//                     {...rest}
//                     label="תאריך"
//                     value={value}
//                     onChange={onChange}
//                     disablePast
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         fullWidth
//                         error={!!errors.date}
//                         helperText={errors.date?.message}
//                         InputProps={{
//                           ...params.InputProps,
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <CalendarIcon />
//                             </InputAdornment>
//                           )
//                         }}
//                       />
//                     )}
//                   />
//                 )}
//               />
//             </LocalizationProvider>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               label="שעה"
//               type="time"
//               {...register("time")}
//               fullWidth
//               error={!!errors.time}
//               helperText={errors.time?.message}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <AccessTimeIcon />
//                   </InputAdornment>
//                 )
//               }}
//               inputProps={{ step: 300 }}
//             />
//           </Grid>

//           <Grid item xs={12} display="flex" justifyContent="center">
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               startIcon={<SearchIcon />}
//               sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2, mr: 2 }}
//               disabled={!watch("source") || !watch("destination") || !watch("date") || !watch("time")}
//             >
//               חפש נסיעות
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
//               onClick={handleReset}
//             >
//               אפס סינון
//             </Button>
//           </Grid>
//         </Grid>
//       </form>

//       <Box mt={4} sx={{ mx: "7vw" }}>
//         {drivers.length === 0 ? (
//           <Typography align="center" sx={{ color: "black" }}>
//             {searchAttempted ? "לא נמצאו נהגים התואמים לסינון." : "אין נהגים זמינים כרגע."}
//           </Typography>
//         ) : (
//           drivers.map(driver => {
//             const dateObj = driver.date ? new Date(driver.date) : null;
//             const formattedDate = dateObj ? format(dateObj, "dd/MM/yyyy", { locale: he }) : "אין תאריך";
//             return (
//               <Card key={driver._id} sx={{ mb: 2, p: 2, borderRadius: 3, backgroundColor: "#f9f9ff" }}>
//                 <CardContent>
//                   <Stack direction="row" justifyContent="space-between" alignItems="center">
//                     <Box>
//                       <Typography variant="h6" color="primary">
//                         {driver.destination} → {driver.source}
//                       </Typography>
//                       <Stack direction="row" spacing={1} alignItems="center">
//                         <AccessTimeIcon fontSize="small" />
//                         <Typography variant="body2">
//                           {formattedDate} בשעה {driver.time}
//                         </Typography>
//                       </Stack>
//                       <Typography variant="body2" color="text.secondary">
//                         {driver.availableSeats > 0 ? `${driver.availableSeats} מקומות פנויים` : "אין מקומות פנויים"}
//                       </Typography>
//                     </Box>
//                     <Stack alignItems="flex-end" spacing={1}>
//                       <Chip
//                         label={new Date(driver.date) < new Date() ? "הושלם" : driver.status ? "פעיל" : "לא פעיל"}
//                         color={driver.status ? "success" : "default"}
//                         size="small"
//                       />
//                       <Button
//                         component={Link}
//                         to={`/SearchDrive/${driver._id}`}
//                         variant="outlined"
//                         size="small"
//                         disabled={driver.availableSeats === 0}
//                       >
//                         {driver.availableSeats === 0 ? "אין מקומות פנויים" : "פרטים נוספים"}
//                       </Button>
//                     </Stack>
//                   </Stack>
//                 </CardContent>
//               </Card>
//             );
//           })
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default SearchDrive;

import { useState } from "react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import {
  TextField,
  Button,
  InputAdornment,
  Typography,
  Autocomplete,
  Box,
  Card,
  CardContent,
  Stack,
  Chip,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router";
import { useGetAlldriversQuery } from "../stores/Slices/endPointsDriver";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchDriverSchema from "../schemas/SearchDriverSchema";
import { Driver } from "./interfaces/Interface";
import { useGetCitiesQuery, City } from "../stores/Slices/citiesApi";

type SearchData = {
  source: City | null;
  destination: City | null;
  date: Date | null;
  time: string;
};

const SearchDrive = () => {
  const { data: cities = [], isLoading: isCitiesLoading, error: citiesError } = useGetCitiesQuery();
  const { data: allDrivers = [], isError: isDriversError, isLoading: isDriversLoading } = useGetAlldriversQuery();

  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<SearchData>({
    resolver: zodResolver(SearchDriverSchema),
    defaultValues: { source: null, destination: null, date: null, time: "" },
  });

  const onSubmit = (data: SearchData) => {
    setSearchAttempted(true);

    const filtered = allDrivers.filter((driver) => {
      const matchSource = !data.source || driver.source === data.source.name;
      const matchDestination = !data.destination || driver.destination === data.destination.name;
      const matchDate =
        !data.date ||
        (driver.date && format(new Date(driver.date), "yyyy-MM-dd") === format(data.date, "yyyy-MM-dd"));
      const matchTime = !data.time || driver.time === data.time;

      return matchSource && matchDestination && matchDate && matchTime;
    });

    setFilteredDrivers(filtered);
  };

  const handleReset = () => {
    reset();
    setFilteredDrivers(allDrivers);
    setSearchAttempted(false);
  };

  if (isCitiesLoading || isDriversLoading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  }

  if (citiesError || isDriversError) {
    return <Alert severity="error">שגיאה בטעינת מידע.</Alert>;
  }

  // אם לא חיפשנו עדיין, מציגים את כל הנהגים
  const driversToShow = searchAttempted ? filteredDrivers : allDrivers;

  return (
    <Box
      sx={{
        p: 3,
        mx: "10vw",
        mt: "17vh",
        backgroundColor: "#f5f5f5",
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {[{ name: "source", label: "עיר מוצא" }, { name: "destination", label: "עיר יעד" }].map(({ name, label }) => (
            <Grid item xs={12} md={6} key={name}>
              <Controller
                name={name as "source" | "destination"}
                control={control}
                render={({ field: { onChange, value, ...rest } }) => (
                  <Autocomplete
                    {...rest}
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, val) => val !== null && option.id === val.id}
                    sx={{ width: "100%" }}
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={label}
                        fullWidth
                        error={!!errors[name as keyof typeof errors]}
                        helperText={errors[name as keyof typeof errors]?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
          ))}

          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
              <Controller
                name="date"
                control={control}
                render={({ field: { onChange, value, ...rest } }) => (
                  <DatePicker
                    {...rest}
                    label="תאריך"
                    value={value}
                    onChange={onChange}
                    disablePast
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.date}
                        helperText={errors.date?.message}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <InputAdornment position="end">
                              <CalendarIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="שעה"
              type="time"
              {...register("time")}
              fullWidth
              error={!!errors.time}
              helperText={errors.time?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              }}
              inputProps={{ step: 300 }}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
              disabled={!watch("source") || !watch("destination") || !watch("date") || !watch("time")}
            >
              חפש נסיעות
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "10vw", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
              onClick={handleReset}
            >
              אפס סינון
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box mt={4} sx={{ mx: "7vw" }}>
        {driversToShow.length === 0 ? (
          <Typography align="center" sx={{ color: "black" }}>
            {searchAttempted ? "לא נמצאו נהגים התואמים לסינון." : "אין נהגים זמינים כרגע."}
          </Typography>
        ) : (
          driversToShow.map((driver) => {
            const dateObj = driver.date ? new Date(driver.date) : null;
            const formattedDate = dateObj ? format(dateObj, "dd/MM/yyyy", { locale: he }) : "אין תאריך";
            const isPast = dateObj ? dateObj < new Date() : false;

            return (
              <Card
                key={driver._id}
                sx={{ mb: 2, p: 2, borderRadius: 3, backgroundColor: "#f9f9ff" }}
                dir="rtl"
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" color="primary">
                        {driver.source} → {driver.destination}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <AccessTimeIcon fontSize="small" />
                        <Typography variant="body2">
                          {formattedDate} בשעה {driver.time}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {driver.availableSeats > 0 ? `${driver.availableSeats} מקומות פנויים` : "אין מקומות פנויים"}
                      </Typography>
                    </Box>
                    <Stack alignItems="flex-end" spacing={1}>
                      <Chip
                        label={isPast ? "הושלם" : driver.status ? "פעיל" : "לא פעיל"}
                        color={driver.status ? "success" : "default"}
                        size="small"
                      />
                      <Button
                        component={Link}
                        to={`/SearchDrive/${driver._id}`}
                        variant="outlined"
                        size="small"
                        disabled={driver.availableSeats === 0}
                      >
                        {driver.availableSeats === 0 ? "אין מקומות פנויים" : "פרטים נוספים"}
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default SearchDrive;