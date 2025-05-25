import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import {
  TextField,
  Button,
  InputAdornment,
  Typography,
  Autocomplete,
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
    <div >
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
            inputProps={{ step: 300 }} // 5 דקות
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<SearchIcon />}
            sx={{ height: 48 }}
            disabled={!source || !destination}
          >
            חפש נסיעות
          </Button>
        </Grid>
      </Grid>
    </form>
    </div>
  );
};

export default SearchDrive;
