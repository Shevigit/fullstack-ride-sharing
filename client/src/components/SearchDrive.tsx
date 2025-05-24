

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  Typography,
  Autocomplete,
  Box,
} from "@mui/material";
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

const SearchDrive = ({ onSearch }) => {
  const [cities, setCities] = useState([]);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");

  useEffect(() => {
    fetch("http://localhost:7002/api/cities")
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error("שגיאה בטעינת ערים:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      source,
      destination,
      date: date ? format(date, "yyyy-MM-dd") : "",
      time,
    });
  };

  return (
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
  );
};

export default SearchDrive;
