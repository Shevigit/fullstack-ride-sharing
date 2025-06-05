

import { useState } from 'react';
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Autocomplete,
  CircularProgress,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/Store';
import {
  Driver_FieldsFillByUser,
  type,
  CreateSuggestionPayload,
} from './interfaces/Interface';
import SuggestionSchema from '../schemas/SuggestionSchema';
import { useCreateSuggestionMutation } from '../stores/Slices/endPointsDriver';
import { useNavigate } from 'react-router';
import { useGetCitiesQuery } from '../stores/Slices/citiesApi';
import { useLazyGetStreetsQuery } from '../stores/Slices/streetSlice';

const SuggestionDrive = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const [type_, setType_] = useState<type>(type.זכר);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [streetInput, setStreetInput] = useState('');
  const [streetOptions, setStreetOptions] = useState<string[]>([]);

  const [createSuggestion, { isLoading }] = useCreateSuggestionMutation();
  const { data: cities = [] } = useGetCitiesQuery();
  const [getStreets, { isFetching: loadingStreets }] = useLazyGetStreetsQuery();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Driver_FieldsFillByUser>({
    mode: 'onBlur',
    resolver: zodResolver(SuggestionSchema) as any,
  });

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType_(event.target.value as unknown as type);
  };

  const onSubmit = async (data: Driver_FieldsFillByUser) => {
    if (!currentUser?.id) return;

    const [hours, minutes] = data.time.split(':').map(Number);
    const fullDate = new Date(data.date);
    fullDate.setHours(hours);
    fullDate.setMinutes(minutes);

    const newSuggestion: CreateSuggestionPayload & { genderPreference: type } = {
      ...data,
      date: fullDate,
      driver: currentUser.id,
      genderPreference: type_,
    };

    try {
      await createSuggestion(newSuggestion).unwrap();
      navigate('/');
    } catch (err) {
      console.error('שגיאה ביצירת נסיעה:', err);
    }
  };

  const handleCityChange = async (_: any, value: string | null) => {
    setSelectedCity(value);
    setStreetInput('');
    setStreetOptions([]);
    if (value) {
      const res = await getStreets({ city: value });
      if ('data' in res && res.data) {
        const unique = [...new Set(res.data)];
        setStreetOptions(unique);
      }
    }
  };

  const cityNames = cities.map((city) => city.name);

  return (
    <Box
      sx={{
        mt: '15vh',
        mx: 'auto',
        maxWidth: 600,
        p: 4,
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: 3,
        direction: 'rtl',
      }}
      component={Paper}
      elevation={6}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Typography
            variant="h4"
            textAlign="center"
            color="success.main"
            fontWeight="bold"
            mb={1}
          >
            טופס הצעת נסיעה
          </Typography>

          {/* עיר מקור */}
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={cityNames}
                onChange={(e, value) => {
                  field.onChange(value);
                  handleCityChange(e, value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="עיר מקור"
                    error={!!errors.source}
                    helperText={errors.source?.message}
                    variant="outlined"
                    fullWidth
                  />
                )}
                noOptionsText="לא נמצאה עיר מתאימה"
                autoHighlight
              />
            )}
          />

          {/* כתובת */}
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={streetOptions.filter((street) =>
                  street.toLowerCase().includes(streetInput.toLowerCase())
                )}
                inputValue={streetInput}
                onInputChange={(_, val) => setStreetInput(val)}
                onChange={(_, val) => field.onChange(val)}
                disabled={!selectedCity}
                loading={loadingStreets}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="כתובת"
                    variant="outlined"
                    color="success"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingStreets && (
                            <CircularProgress color="inherit" size={20} />
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            )}
          />

          {/* עיר יעד */}
          <Controller
            name="destination"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={cityNames}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="עיר יעד"
                    error={!!errors.destination}
                    helperText={errors.destination?.message}
                    variant="outlined"
                    fullWidth
                  />
                )}
                noOptionsText="לא נמצאה עיר מתאימה"
                autoHighlight
              />
            )}
          />

          {/* תאריך */}
          <TextField
            label="תאריך הנסיעה"
            type="date"
            {...register('date')}
            InputLabelProps={{ shrink: true }}
            error={!!errors.date}
            helperText={errors.date?.message}
            fullWidth
          />

          {/* שעה */}
          <TextField
            label="שעת יציאה"
            type="time"
            {...register('time')}
            error={!!errors.time}
            helperText={errors.time?.message}
            fullWidth
          />

          {/* מקומות פנויים */}
          <TextField
            label="מספר מקומות פנויים ברכב"
            type="number"
            {...register('availableSeats')}
            error={!!errors.availableSeats}
            helperText={errors.availableSeats?.message}
            fullWidth
            inputProps={{ min: 1 }}
          />

          {/* העדפת מגדר */}
          <RadioGroup value={type_} onChange={handleGenderChange} row>
            <FormControlLabel
              value="זכר"
              control={<Radio color="success" />}
              label="זכר"
            />
            <FormControlLabel
              value="נקבה"
              control={<Radio color="success" />}
              label="נקבה"
            />
            <FormControlLabel
              value="מעדיף לא לומר"
              control={<Radio color="success" />}
              label="מעדיף לא לומר"
            />
          </RadioGroup>

          {/* כפתור שליחה */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isLoading}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(81, 165, 12, 0.7)',
              ':hover': {
                backgroundColor: 'success.dark',
                boxShadow: '0 6px 16px rgba(81, 165, 12, 0.9)',
              },
            }}
          >
            שלח
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SuggestionDrive;
