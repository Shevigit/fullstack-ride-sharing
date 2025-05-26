import { useEffect, useState } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Driver, Driver_FieldsFillByUser, status, type, User } from './interfaces/Interface';
import SuggestionSchema from '../schemas/SuggestionSchema';
import { useAdddriverMutation } from '../stores/Slices/endPointsDriver';
const SuggestionDrive = () => {
    const [currentUser, setCurrentUser] = useState<User>()
    const [type_, setType_] = useState<type>()
    const [addDriver] = useAdddriverMutation()
    const { register, handleSubmit, formState: { errors }, } = useForm<Driver_FieldsFillByUser>({ mode: 'onBlur', resolver: zodResolver(SuggestionSchema) as any, });
    useEffect(() => {
        const current_User = JSON.parse(localStorage.getItem("currentUser")!) as User;
        setCurrentUser(current_User)
    }, [])
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType_(event.target.value as unknown as type);
    };
    const onSubmit = async (data: Driver_FieldsFillByUser) => {
        const newDriver: Driver_FieldsFillByUser = {
            // driver: currentUser!,
            address: data.address,
            source: data.source,
            destination: data.destination,
            date: new Date(data.date),
            time: data.time,
            availableSeats: data.availableSeats,
            // genderPreference: data.genderPreference,
            // passengers:[],
            // status: status.active,
            // createdAt: new Date(Date.now())
        };
        console.log(currentUser);
        
        const driver: Driver = {
            ...newDriver,
            driver: currentUser?._id!,
            genderPreference: type_ ? type_ : type.זכר,
            passengers: [],
            status: status.פעיל,
            createdAt: new Date(Date.now())
        }
        addDriver(driver)
        console.log(driver);
    };

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

                    <TextField
                        placeholder="עיר מקור"
                        variant="outlined"
                        color="success"
                        {...register('source')}
                    />
                    {errors.source && <p>{errors.source.message}</p>}

                    <TextField
                        placeholder="עיר יעד"
                        variant="outlined"
                        color="success"
                        {...register('destination')}
                    />
                    {errors.destination && <p>{errors.destination.message}</p>}

                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                checked={hasCar}
                                onChange={(e) => setHasCar(e.target.checked)}
                            />
                        }
                        label="יש לך רכב?"
                    />
                    <input type="hidden" value={hasCar ? 'true' : 'false'} {...register('hasCar')} />
                    {errors.hasCar && <p>{errors.hasCar.message}</p>} */}

                    <TextField
                        placeholder="תאריך הנסיעה"
                        variant="outlined"
                        color="success"
                        type='date'
                        {...register('date')}
                    // disabled={!hasCar}
                    />
                    {errors.date && <p>{errors.date.message}</p>}
                    <TextField
                        placeholder="שעת יציאה"
                        variant="outlined"
                        color="success"
                        {...register('time')}
                    // disabled={!hasCar}
                    />
                    {errors.time && <p>{errors.time.message}</p>}
                    <TextField
                        placeholder="מספר מקומות פנויים ברכב"
                        variant="outlined"
                        color="success"
                        type='number'
                        {...register('availableSeats')}
                    // disabled={!hasCar}
                    />
                    {errors.availableSeats && <p>{errors.availableSeats.message}</p>}
                    <div>
                        <RadioGroup value={type_} onChange={handleGenderChange}>
                            <FormControlLabel style={{ color: "black" }} value="זכר" control={<Radio color="success" />} label="זכר" />
                            <FormControlLabel style={{ color: "black" }} value="נקבה" control={<Radio color="success" />} label="נקבה" />
                        </RadioGroup>
                    </div>


                    <Button type="submit" variant="contained" style={{ backgroundColor: "rgba(254, 95, 51, 0.86)" }}>
                        שלח
                    </Button>
                </Stack>
            </form>
        </div>
    );
};

export default SuggestionDrive;
