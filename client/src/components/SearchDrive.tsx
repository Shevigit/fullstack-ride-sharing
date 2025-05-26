import  { useState, useEffect } from "react";
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
} from "@mui/material";
import Grid from '@mui/material/Grid';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";
import { useGetAlldriversQuery } from "../stores/Slices/endPointsDriver";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchDriverSchema from "../schemas/SearchDriverSchema";
import { Driver } from "./interfaces/Interface";
type City = {
  id: number;
  name: string;
};
type SearchData = {
  source: City;
  destination: City;
  date: Date;
  time: string;
};
const SearchDrive = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const { data: GetAlldrivers, isError, isLoading } = useGetAlldriversQuery();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SearchData>({
    resolver: zodResolver(SearchDriverSchema),
  });
  const watchedSource = watch("source");
  const watchedDestination = watch("destination");
  useEffect(() => {
    fetch("http://localhost:7002/api/cities")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: City[]) => {
        const areAllCitiesValid = data.every(
          (city) => typeof city.id === 'number' && typeof city.name === 'string'
        );
        if (!areAllCitiesValid) {
          console.error("ישנם אובייקטים לא תקינים במערך הערים!", data);
        }
        setCities(data);
      })
      .catch((err) => console.error("שגיאה בטעינת ערים:", err));
  }, []);
  const onSubmit = (data: SearchData) => {
    console.log("נתוני הטופס:", data);
    setSearchAttempted(true); 
    if (!GetAlldrivers) {
      console.warn("אין נהגים לסינון.");
      setFilteredDrivers([]); 
      return;
    }
    const filtered = GetAlldrivers.filter(x =>
      (data.source ? x.source === data.source.name : true) && 
      (data.destination ? x.destination === data.destination.name : true) &&
      (data.date && x.date ? format(new Date(x.date), 'yyyy-MM-dd') === format(data.date, 'yyyy-MM-dd') : true)
    );
    setFilteredDrivers(filtered);
  };
  const driversToRender = searchAttempted ? filteredDrivers : (GetAlldrivers || []);
  if (isLoading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
  if (isError) return <Alert severity="error">שגיאה בטעינת נהגים.</Alert>;
  return (
    <div>
      <Box
        sx={{
          maxWidth: "100vw",
          p: 3,
          boxShadow: 2,
          borderRadius: 3,
          backgroundColor: "#f5f5f5",
          marginLeft: "5vw",
          marginTop: "17vh",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="source"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Autocomplete
                    {...field}
                    options={cities}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') return option;
                      if (option && option.name) return option.name;
                      return '';
                    }}
                    isOptionEqualToValue={(option, val) => {
                      if (val === null || typeof val === 'undefined') return false;
                      if (option && typeof option === 'object' && 'id' in option &&
                        val && typeof val === 'object' && 'id' in val) {
                        return option.id === val.id;
                      }
                      return false;
                    }}
                    sx={{ width: "15vw", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
                    value={value}
                    onChange={(event, newValue: City | null) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="עיר מוצא"
                        fullWidth
                        error={!!errors.source}
                        helperText={errors.source?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="destination"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Autocomplete
                    {...field}
                    options={cities}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') return option;
                      if (option && option.name) return option.name;
                      return '';
                    }}
                    isOptionEqualToValue={(option, val) => {
                      if (val === null || typeof val === 'undefined') return false;
                      if (option && typeof option === 'object' && 'id' in option &&
                        val && typeof val === 'object' && 'id' in val) {
                        return option.id === val.id;
                      }
                      return false;
                    }}
                    sx={{ width: "15vw", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
                    value={value}
                    onChange={(event, newValue: City | null) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="עיר יעד"
                        fullWidth
                        error={!!errors.destination}
                        helperText={errors.destination?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <DatePicker
                      {...field}
                      label="תאריך"
                      value={value}
                      onChange={(newValue: Date | null) => {
                        onChange(newValue);
                      }}
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
                {...register('time')}
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
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                sx={{ width: "100%", height: 50, fontSize: "1.1rem", borderRadius: 2 }}
                disabled={!watchedSource || !watchedDestination}
              >
                חפש נסיעות
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box
        mt={4}
        sx={{
          maxWidth: "900px",
          mx: "auto",
          p: 3,
          borderRadius: 3,
        }}
      >
        {driversToRender.length === 0 && (
          <Typography variant="body1" align="center" sx={{ color: "black" }}>
            {searchAttempted
              ? "לא נמצאו נהגים התואמים לסינון." 
              : "אין נהגים זמינים כרגע." 
            }
          </Typography>
        )}
        {driversToRender.map((driver) => {
          const dateObj = driver.date ? new Date(driver.date) : null;
          const formattedDate = dateObj
            ? format(dateObj, "dd/MM/yyyy", { locale: he })
            : "אין תאריך";
          return (
            <Card
              key={driver._id} // ודא ש-driver._id הוא ייחודי ותקין!
              variant="outlined"
              sx={{ mb: 2, p: 2, borderRadius: 3, backgroundColor: "#f9f9ff" }}
            >
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {driver.destination} → {driver.source}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeIcon fontSize="small" />
                      <Typography variant="body2">
                        {formattedDate} בשעה {driver.time}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {driver.availableSeats > 0
                        ? `${driver.availableSeats} מקומות פנויים`
                        : "אין מקומות פנויים"}
                    </Typography>
                  </Box>
                  <Stack alignItems="flex-end" spacing={1}>
                    <Chip
                      label={driver.status ? "פעיל" : "לא פעיל"}
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
        })}
      </Box>
    </div>
  );
};

export default SearchDrive;