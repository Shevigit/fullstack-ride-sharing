

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredActiveFutureDrivers = (searchAttempted ? filteredDrivers : allDrivers).filter((driver) => {
    const isStatusActive = driver.status === "פעיל";
    const isFutureDate = driver.date && new Date(driver.date).setHours(0, 0, 0, 0) >= today.getTime();
    return isStatusActive && isFutureDate;
  });

  const driversToShow = filteredActiveFutureDrivers;

  return (
    <Box
      sx={{
        p: 4,
        mx: { xs: 2, sm: "8vw", md: "12vw" },
        mt: "15vh",
        backgroundColor: "#ffffff",
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        direction: "rtl",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3} align="center" color="primary">
        חיפוש נסיעות
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          
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
                    disablePortal
                    autoHighlight
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
                    label="תאריך הנסיעה"
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
                              <CalendarIcon color="primary" />
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
              sx={{ width: { xs: "45%", md: "200%" }, height: 52, }}

              label="שעת יציאה"
              type="time"
              {...register("time")}
              fullWidth
              error={!!errors.time}
              helperText={errors.time?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccessTimeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              sx={{ width: { xs: "45%", md: "200%" }, height: 52, fontSize: "1.1rem", borderRadius: 2 }}
              disabled={!watch("source") || !watch("destination") || !watch("date") || !watch("time")}
            >
              חפש נסיעות
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ width: { xs: "45%", md: "200%" }, height: 52, fontSize: "1.1rem", borderRadius: 2 }}
              onClick={handleReset}
            >
              אפס סינון
            </Button>
          </Grid>
        </Grid>
      </form>

      <Box mt={5} mx={{ xs: 1, sm: 6 }}>
        {driversToShow.length === 0 ? (
          <Typography align="center" color="text.secondary" variant="h6" sx={{ mt: 4 }}>
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
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#f0f4ff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                }}
                dir="rtl"
                elevation={3}
              >
                <CardContent>
                  <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Box>
                      <Typography variant="h6" color="primary" fontWeight={600}>
                        {driver.source} → {driver.destination}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" mt={0.5} mb={1}>
                        <CalendarIcon color="action" fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {formattedDate} בשעה {driver.time}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color={driver.availableSeats > 0 ? "success.main" : "error.main"}>
                        {driver.availableSeats > 0 ? `${driver.availableSeats} מקומות פנויים` : "אין מקומות פנויים"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mt={0.5}>
                        {driver.driver.userName ? `שם נהג: ${driver.driver.userName}` : "שם נהג לא נמצא"}
                      </Typography>
                    </Box>

                    <Stack alignItems="flex-end" spacing={1}>
                      <Chip
                        label={isPast ? "הושלם" : driver.status ? "פעיל" : "לא פעיל"}
                        color={driver.status ? "success" : "default"}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                      <Button
                        component={Link}
                        to={`/SearchDrive/${driver._id}`}
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: "medium" }}
                      >
                        פרטים נוספים
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
