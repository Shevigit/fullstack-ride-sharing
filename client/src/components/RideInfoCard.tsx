
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useParams, useNavigate } from "react-router";
import {
  useGetdriverByIdQuery,
  // useUpdatedriverMutation,
  useJoinSuggestionMutation,
} from "../stores/Slices/endPointsDriver";
import { skipToken } from "@reduxjs/toolkit/query";
import { format, isBefore } from "date-fns";
import { he } from "date-fns/locale";
import { Driver, User } from "./interfaces/Interface";

import { styles, buttonStyles, backButtonStyles } from "../CSS/RideInfoCard";

const RideInfoCard=() =>{
  const { _id } = useParams<{ _id: string }>();
  const {
    data: thisDriver,
    isLoading,
    isError,
    error,
  } = useGetdriverByIdQuery(_id ?? skipToken);
  // const [updatedriver] = useUpdatedriverMutation();
  const [ joinSuggestio] =useJoinSuggestionMutation();

  const [isJoined, setIsJoined] = useState(false);

let currentUser: User | null = null;

try {
  const userString = localStorage.getItem("currentUser");
  if (userString) {
    currentUser = JSON.parse(userString);
  }
} catch (error) {
  console.error("שגיאה בקריאת משתמש מה־localStorage:", error);
}

  const [selectedPassengersCount, setSelectedPassengersCount] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userPassengersCount, setUserPassengersCount] = useState(0);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };



const handleJoinConfirm = async () => {
  if (!thisDriver?._id || !currentUser?._id) return;


  try {
console.log("מנסה להוסיף נוסע", thisDriver._id, currentUser._id,selectedPassengersCount);


if(thisDriver._id!= currentUser._id){
const result = await joinSuggestio({
  suggestionId: thisDriver._id,
   userId: currentUser._id,
  countSeat:selectedPassengersCount
}).unwrap(); 
console.log("נוסע נוסף בהצלחה", result);

console.log("נוסע נוסף בהצלחה");

    setUserPassengersCount(selectedPassengersCount);
}else{
  alert("ןוארכקראטיוחלךף")
}



    setIsJoined(selectedPassengersCount > 0);
  } catch (err) {
    console.error("שגיאה בעת עדכון נסיעה:", err);
  } finally {
    setIsDialogOpen(false);
  }
};

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress />
        <Typography ml={2}>טוען פרטי נסיעה...</Typography>
      </Box>
    );
  }

  if (isError) {
    console.error("שגיאה בטעינת פרטי נהג:", error);
    return (
      <Box sx={styles.loadingBox}>
        <Alert severity="error">שגיאה בטעינת פרטי הנסיעה. אנא נסה שוב מאוחר יותר.</Alert>
      </Box>
    );
  }

  if (!thisDriver) {
    return (
      <Box sx={styles.loadingBox}>
        <Typography variant="h6">פרטי נסיעה לא נמצאו.</Typography>
      </Box>
    );
  }

  const rideDate = thisDriver.date ? new Date(thisDriver.date) : null;
  const formattedDate = rideDate
    ? format(rideDate, "EEEE, dd MMMM", { locale: he })
    : "אין תאריך";
  const isPastDate = rideDate ? isBefore(rideDate, new Date()) : false;

  const groupedPassengers = thisDriver.passengers.reduce((acc, passenger) => {
    const key = passenger._id;
    if (!acc[key]) {
      acc[key] = { ...passenger, count: 1 };
    } else {
      acc[key].count += 1;
    }
    return acc;
  }, {} as { [key: string]: User & { count: number } });

  const passengersToDisplay = Object.values(groupedPassengers);

  return (
    <Box sx={styles.container}>
      <Card elevation={3} sx={styles.card}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {thisDriver.destination} ← {thisDriver.source}
            </Typography>
            <Chip
              label={isPastDate ? "הושלם" : thisDriver.status ? "פעיל" : "לא פעיל"}
              color={
                isPastDate ? "default" : thisDriver.status ? "success" : "error"
              }
            />
          </Box>

          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>

          <Box mt={2} display="flex" alignItems="center" gap={1}>
            <AccessTimeIcon fontSize="small" />
            <Typography>{thisDriver.time}</Typography>
          </Box>

          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <LocationOnIcon fontSize="small" />
            <Typography>{thisDriver.address}</Typography>
          </Box>

          <Box mt={2}>
            <Chip
              label={
          
                `${thisDriver.availableSeats} מקומות פנויים`
              }
              color={
                isJoined
                  ? "info"
                  : thisDriver.availableSeats > 0
                  ? "success"
                  : "default"
              }
              sx={{ fontWeight: "bold" }}
            />
          </Box>
        </CardContent>

        <Box sx={buttonStyles.wrapper}>
          <Button
            size="medium"
            variant={isJoined ? "outlined" : "contained"}
            color={isJoined ? "error" : "primary"}
            startIcon={isJoined ? <CancelIcon /> : <CheckCircleIcon />}
            fullWidth
            onClick={handleClick}
            disabled={
              !thisDriver || (thisDriver.availableSeats === 0 && !isJoined) || isPastDate
            }
            sx={buttonStyles.button}
          >
            {isPastDate
              ? "הנסיעה הסתיימה"
              : isJoined
              ? "עדכן/בטל השתתפות"
              : "הצטרף לנסיעה"}
          </Button>
        </Box>
      </Card>

      <Card elevation={3} sx={[styles.card, { mt: 3 }]}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            נוסעים
          </Typography>
          <Divider />
          <Grid container spacing={2} mt={1}>
            {passengersToDisplay.map((passenger, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Box p={2} border="1px solid #ddd" borderRadius={2}>
                  <Typography variant="body1">
                    {passenger.userName}{" "}
                    {passenger.count > 1 && (
                      <Typography variant="caption" color="text.secondary" component="span">
                        ({passenger.count} מקומות)
                      </Typography>
                    )}
                  </Typography>
                  <Chip
                    label={passenger.gender}
                    color={passenger.gender === "גבר" ? "primary" : "secondary"}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Box sx={backButtonStyles.wrapper}>
        <Button variant="text" size="small" onClick={handleBack} sx={backButtonStyles.button}>
          ← חזרה
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>אישור {isJoined ? "עדכון/ביטול" : "הצטרפות"}</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {isJoined
              ? "עדכן או בטל את מספר הנוסעים שהצטרפו לנסיעה זו"
              : `ברצונך להצטרף לנסיעה מ-${thisDriver.source} ל-${thisDriver.destination}?`}
          </Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="passenger-count-label">כמות נוסעים</InputLabel>
            <Select
              labelId="passenger-count-label"
              value={selectedPassengersCount}
              label="כמות נוסעים"
              onChange={(e) => setSelectedPassengersCount(Number(e.target.value))}
            >
              {Array.from(
                { length: thisDriver.availableSeats + userPassengersCount + 1 },
                (_, i) => i
              ).map((count) => (
                <MenuItem key={count} value={count}>
                  {count === 0 ? "בטל השתתפות" : count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>סגור</Button>
          <Button onClick={handleJoinConfirm} autoFocus>
            אשר
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default RideInfoCard