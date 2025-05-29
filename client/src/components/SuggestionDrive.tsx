// import { useEffect, useState } from 'react';
// import { Button, FormControlLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Driver, Driver_FieldsFillByUser, status, type, User } from './interfaces/Interface';
// import SuggestionSchema from '../schemas/SuggestionSchema';
// import { useAdddriverMutation } from '../stores/Slices/endPointsDriver';
// import { useNavigate } from 'react-router';
// const SuggestionDrive = () => {
//     const [currentUser, setCurrentUser] = useState<User>()
//     const [type_, setType_] = useState<type>()
//     const [addDriver] = useAdddriverMutation()
//     const { register, handleSubmit, formState: { errors }, } = useForm<Driver_FieldsFillByUser>({ mode: 'onBlur', resolver: zodResolver(SuggestionSchema) as any, });
//     useEffect(() => {
//         const current_User = JSON.parse(localStorage.getItem("currentUser")!) as User;
//         setCurrentUser(current_User)
//     }, [])
//     const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setType_(event.target.value as unknown as type);
//     };
//     const navigate=useNavigate()
//     const onSubmit = async (data: Driver_FieldsFillByUser) => {
//         const newDriver: Driver_FieldsFillByUser = {
//             address: data.address,
//             source: data.source,
//             destination: data.destination,
//             date: new Date(data.date),
//             time: data.time,
//             availableSeats: data.availableSeats,
//         };
//         console.log(currentUser);
        
//         const driver: Driver = {
//             ...newDriver,
//             driver: currentUser?._id!,
//             genderPreference: type_ ? type_ : type.זכר,
//             passengers: [],
//             status: status.פעיל,
//             createdAt: new Date(Date.now())
//         }
//         addDriver(driver)
//         console.log(driver);
//         navigate('/')
//     };

//     return (
//         <div style={{ marginTop: "20vh", marginLeft: "15vw" }}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <Stack spacing={2}>
//                     <TextField
//                         placeholder="כתובת"
//                         variant="outlined"
//                         color="success"
//                         {...register('address')}
//                     />
//                     {errors.address && <p>{errors.address.message}</p>}
//                     <TextField
//                         placeholder="עיר מקור"
//                         variant="outlined"
//                         color="success"
//                         {...register('source')}
//                     />
//                     {errors.source && <p>{errors.source.message}</p>}
//                     <TextField
//                         placeholder="עיר יעד"
//                         variant="outlined"
//                         color="success"
//                         {...register('destination')}
//                     />
//                     {errors.destination && <p>{errors.destination.message}</p>}
//                     <TextField
//                         placeholder="תאריך הנסיעה"
//                         variant="outlined"
//                         color="success"
//                         type='date'
//                         {...register('date')}
//                     // disabled={!hasCar}
//                     />
//                     {errors.date && <p>{errors.date.message}</p>}
//                     <TextField
//                         placeholder="שעת יציאה"
//                         variant="outlined"
//                         color="success"
//                         {...register('time')}
//                     // disabled={!hasCar}
//                     />
//                     {errors.time && <p>{errors.time.message}</p>}
//                     <TextField
//                         placeholder="מספר מקומות פנויים ברכב"
//                         variant="outlined"
//                         color="success"
//                         type='number'
//                         {...register('availableSeats')}
//                     // disabled={!hasCar}
//                     />
//                     {errors.availableSeats && <p>{errors.availableSeats.message}</p>}
//                     <div>
//                         <RadioGroup value={type_} onChange={handleGenderChange}>
//                             <FormControlLabel style={{ color: "black" }} value="זכר" control={<Radio color="success" />} label="זכר" />
//                             <FormControlLabel style={{ color: "black" }} value="נקבה" control={<Radio color="success" />} label="נקבה" />
//                         </RadioGroup>
//                     </div>


//                     <Button type="submit" variant="contained" style={{ backgroundColor: "rgba(81, 165, 12, 0.86)" }}>
//                         שלח
//                     </Button>
//                 </Stack>
//             </form>
//         </div>
//     );
// };

// export default SuggestionDrive;

import { useEffect, useState } from 'react';
import {
  Button, FormControlLabel, Radio, RadioGroup, Stack, TextField, Autocomplete
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Driver, Driver_FieldsFillByUser, status, type, User } from './interfaces/Interface';
import SuggestionSchema from '../schemas/SuggestionSchema';
import { useAdddriverMutation } from '../stores/Slices/endPointsDriver';
import { useNavigate } from 'react-router';
import { useGetCitiesQuery } from '../stores/Slices/apiSliceDrivers';

const SuggestionDrive = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [type_, setType_] = useState<type>();
  const [addDriver] = useAdddriverMutation();
  const { data: cities = [] } = useGetCitiesQuery();

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

  useEffect(() => {
    const current_User = JSON.parse(localStorage.getItem("currentUser")!) as User;
    setCurrentUser(current_User);
  }, []);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType_(event.target.value as unknown as type);
  };

  const onSubmit = async (data: Driver_FieldsFillByUser) => {
    const newDriver: Driver_FieldsFillByUser = {
      ...data,
      date: new Date(data.date),
    };

    const driver: Driver = {
      ...newDriver,
      driver: currentUser?._id!,
      genderPreference: type_ ?? type.זכר,
      passengers: [],
      status: status.פעיל,
      createdAt: new Date(),
    };

    await addDriver(driver);
    console.log(driver);
    navigate('/');
  };

  const cityNames = cities.map(city => city.name);

  return (
    <div style={{ marginTop: "20vh", marginLeft: "15vw" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>

          <TextField
            placeholder="כתובת"
            variant="outlined"
            color="success"
            {...register('address')}
          />
          {errors.address && <p>{errors.address.message}</p>}

          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={cityNames}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="עיר מקור"
                    error={!!errors.source}
                    helperText={errors.source?.message}
                  />
                )}
                noOptionsText="לא נמצאה עיר מתאימה"
                freeSolo={false}
              />
            )}
          />

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
                  />
                )}
                noOptionsText="לא נמצאה עיר מתאימה"
                freeSolo={false}
              />
            )}
          />

          <TextField
            placeholder="תאריך הנסיעה"
            variant="outlined"
            color="success"
            type="date"
            {...register('date')}
          />
          {errors.date && <p>{errors.date.message}</p>}

          <TextField
            placeholder="שעת יציאה"
            variant="outlined"
            color="success"
            {...register('time')}
          />
          {errors.time && <p>{errors.time.message}</p>}

          <TextField
            placeholder="מספר מקומות פנויים ברכב"
            variant="outlined"
            color="success"
            type="number"
            {...register('availableSeats')}
          />
          {errors.availableSeats && <p>{errors.availableSeats.message}</p>}

          <RadioGroup value={type_} onChange={handleGenderChange}>
            <FormControlLabel value="זכר" control={<Radio color="success" />} label="זכר" />
            <FormControlLabel value="נקבה" control={<Radio color="success" />} label="נקבה" />
          </RadioGroup>

          <Button type="submit" variant="contained" style={{ backgroundColor: "rgba(81, 165, 12, 0.86)" }}>
            שלח
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default SuggestionDrive;
