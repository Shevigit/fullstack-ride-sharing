

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import {
  TextField,
  Button,
  InputAdornment,
  Typography,
  Autocomplete,
  Box,
} from "@mui/material";

import Grid from '@mui/material/Grid';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RideCard from "./RideCard";
import { Outlet } from "react-router";
// =======
// import { useGetAlldriversQuery } from "../stores/Slices/endPointsDriver";
// import { main } from "../CSS/home";
// >>>>>>> 2c666fb639d493fc117214a9790f781c423a2aa0

type City = {
  id: number;
  name: string;
};

type SearchData = {
  source: City | null;
  destination: City | null;
  date: string;
  time: string;
};

type SearchDriveProps = {
  onSearch: (data: SearchData) => void;
};

const SearchDrive: React.FC<SearchDriveProps> = ({ onSearch }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [source, setSource] = useState<City | null>(null);
  const [destination, setDestination] = useState<City | null>(null);
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState("");
  //const { data: GetAlldrivers, isError, isLoading } = useGetAlldriversQuery();
  useEffect(() => {
    fetch("http://localhost:7002/api/cities")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("שגיאה בטעינת ערים:", err));

  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      source,
      destination,
      date: date ? format(date, "yyyy-MM-dd") : "",
      time,
    });
  };

  return (
// <<<<<<< HEAD
    <>
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          p: 3,
          boxShadow: 2,
          borderRadius: 3,
          backgroundColor: "#f5f5f5",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom align="center">
            חיפוש נסיעה
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={cities}
                 sx={{ width: "100%", height: 50, fontSize: "1.1rem", borderRadius: 2 }}

                value={source}
                onChange={(e, newValue) => setSource(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="עיר מוצא" fullWidth />
                )}
              />
            </Grid>
{/* ======= */}
    {/* <div style={main}>
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        חיפוש נסיעה
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option.name}
            value={source}
            onChange={(e, newValue) => setSource(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="עיר מוצא" placeholder="בחר עיר" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option.name}
            value={destination}
            onChange={(e, newValue) => setDestination(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="עיר יעד" placeholder="בחר עיר" fullWidth />
            )}
          />
        </Grid>
>>>>>>> 2c666fb639d493fc117214a9790f781c423a2aa0 */}

            <Grid item xs={12} md={6}>
              <Autocomplete
                options={cities}
                value={destination}
                onChange={(e, newValue) => setDestination(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="עיר יעד" fullWidth />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
                <DatePicker
                  label="תאריך"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  disablePast
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
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
              </LocalizationProvider>
            </Grid>

{/* <<<<<<< HEAD */}
            <Grid item xs={12} md={6}>
              <TextField
                label="שעה"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ClockIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ step: 300 }}
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                sx={{ width: "100%", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
                disabled={!source || !destination}
              >
                חפש נסיעות
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* תוצאות */}
      <Box mt={4} 
      sx={{
          maxWidth: "900px",
          mx: "auto",
          p: 3,
          // boxShadow: 2,
          borderRadius: 3,
          // backgroundColor: "#f5f5f5",
        }}>
        <Outlet/>

        <RideCard />

      </Box>
    </>
// =======
//         <Grid item xs={12} md={6}>
//           <TextField
//             label="שעה"
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             fullWidth
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <ClockIcon />
//                 </InputAdornment>
//               ),
//             }}
//             inputProps={{ step: 300 }} // 5 דקות
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             startIcon={<SearchIcon />}
//             sx={{ height: 48 }}
//             disabled={!source || !destination}
//           >
//             חפש נסיעות
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//     </div>
// >>>>>>> 2c666fb639d493fc117214a9790f781c423a2aa0
  );
};

export default SearchDrive;



// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { he } from "date-fns/locale";
// import {
//   TextField,
//   Button,
//   InputAdornment,
//   Typography,
//   Autocomplete,
//   Box,
//   Grid,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   CalendarToday as CalendarIcon,
//   AccessTime as ClockIcon,
// } from "@mui/icons-material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import RideCard from "./RideCard";
// import { Outlet } from "react-router";

// type City = {
//   id: number;
//   name: string;
// };

// type SearchData = {
//   source: City | null;
//   destination: City | null;
//   date: string;
//   time: string;
// };

// type SearchDriveProps = {
//   onSearch: (data: SearchData) => void;
// };

// const SearchDrive: React.FC<SearchDriveProps> = ({ onSearch }) => {
//   const [cities, setCities] = useState<City[]>([]);
//   const [source, setSource] = useState<City | null>(null);
//   const [destination, setDestination] = useState<City | null>(null);
//   const [date, setDate] = useState<Date | null>(new Date());
//   const [time, setTime] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:7002/api/cities")
//       .then((res) => res.json())
//       .then((data) => setCities(data))
//       .catch((err) => console.error("שגיאה בטעינת ערים:", err));
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch({
//       source,
//       destination,
//       date: date ? format(date, "yyyy-MM-dd") : "",
//       time,
//     });
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           maxWidth: "900px",
//           mx: "auto",
//           p: 3,
//           boxShadow: 2,
//           borderRadius: 3,
//           backgroundColor: "#f5f5f5",
//         }}
//       >
//         <form onSubmit={handleSubmit}>
//           <Typography variant="h4" gutterBottom align="center">
//             חיפוש נסיעה
//           </Typography>

//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Autocomplete
//                 options={cities}
//                 getOptionLabel={(option) => option.name}
//                 value={source}
//                 onChange={(e, newValue) => setSource(newValue)}
//                 renderInput={(params) => (
//                   <TextField {...params} label="עיר מוצא" fullWidth />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Autocomplete
//                 options={cities}
//                 getOptionLabel={(option) => option.name}
//                 value={destination}
//                 onChange={(e, newValue) => setDestination(newValue)}
//                 renderInput={(params) => (
//                   <TextField {...params} label="עיר יעד" fullWidth />
//                 )}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
//                 <DatePicker
//                   label="תאריך"
//                   value={date}
//                   onChange={(newValue) => setDate(newValue)}
//                   disablePast
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       fullWidth
//                       InputProps={{
//                         ...params.InputProps,
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <CalendarIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   )}
//                 />
//               </LocalizationProvider>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="שעה"
//                 type="time"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//                 fullWidth
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <ClockIcon />
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
//                 sx={{
//                   width: "100%",
//                   height: 50,
//                   fontSize: "1.1rem",
//                   borderRadius: 2,
//                 }}
//                 disabled={!source || !destination}
//               >
//                 חפש נסיעות
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>

//       {/* תוצאות */}
//       <Box
//         mt={4}
//         sx={{
//           maxWidth: "900px",
//           mx: "auto",
//           p: 3,
//           borderRadius: 3,
//         }}
//       >
//         <Outlet />
//         <RideCard />
//       </Box>
//     </>
//   );
// };

// export default SearchDrive;
