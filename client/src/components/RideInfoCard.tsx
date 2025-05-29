import { useEffect, useState } from "react";
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
  Grid
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useParams } from "react-router";
import { useGetdriverByIdQuery, useUpdatedriverMutation } from "../stores/Slices/endPointsDriver";
import { skipToken } from "@reduxjs/toolkit/query";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { Driver, User } from "./interfaces/Interface";

export default function RideInfoCard() {
  const { _id } = useParams<{ _id: string }>();
  const { data: thisDriver, isLoading, isError, error } = useGetdriverByIdQuery(_id ?? skipToken);
  const [updatedriver] = useUpdatedriverMutation();
  const [isJoined, setIsJoined] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      try {
        const parsedUser: User = JSON.parse(currentUserString);
        setCurrentUser(parsedUser);
      } catch (e) {
        console.error("שגיאה בניתוח currentUser מ-LocalStorage:", e);
      }
    } else {
      console.log("currentUser לא נמצא ב-LocalStorage.");
    }
  }, []);

  const handleClick = async () => {
    if (!thisDriver) {
      console.error("ניסיון לעדכן נהג כאשר thisDriver אינו מוגדר.");
      return;
    }
    setIsJoined((prev) => !prev);
    console.log(thisDriver);
    const forUpdate: Driver = {
      ...thisDriver,
      availableSeats: isJoined ? thisDriver.availableSeats + 1 : thisDriver.availableSeats - 1,
      passengers: isJoined
        ? thisDriver.passengers.filter(p => p?._id !== currentUser?._id)
        : currentUser ? [...thisDriver.passengers, currentUser] : thisDriver.passengers,
      _id: thisDriver._id,
    };
    try {
      const res = await updatedriver(forUpdate);
      console.log("עדכון נהג בוצע בהצלחה:", res);
    } catch (err) {
      console.error("שגיאה בעת עדכון נהג:", err);
      setIsJoined((prev) => !prev);
    }
  };
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography ml={2}>טוען פרטי נסיעה...</Typography>
      </Box>
    );
  }
  if (isError) {
    console.error("שגיאה בטעינת פרטי נהג:", error);
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert severity="error">
          שגיאה בטעינת פרטי הנסיעה. אנא נסה שוב מאוחר יותר.
        </Alert>
      </Box>
    );
  }
  if (!thisDriver) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">פרטי נסיעה לא נמצאו.</Typography>
      </Box>
    );
  }
  const dateObj = thisDriver.date ? new Date(thisDriver.date) : null;
  const formattedDate = dateObj
    ? format(dateObj, "EEEE, dd MMMM", { locale: he })
    : "אין תאריך";
  return (
    <>
      <div style={{ marginTop: "20vh", marginLeft: "15vw", direction: "rtl" }}>
        <Card elevation={3}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">
                {thisDriver.destination} ← {thisDriver.source}{" "}
              </Typography>
              <Chip
                label={thisDriver.status ? "פעיל" : "לא פעיל"}
                color={thisDriver.status ? "success" : "default"}
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
                label={isJoined ? "נסיעה טובה" : `${thisDriver.availableSeats} מקומות פנויים`}
                color={isJoined ? "info" : (thisDriver.availableSeats > 0 ? "success" : "default")}
              />
            </Box>
            <Box mt={2}>
              <Button
                variant={isJoined ? "outlined" : "contained"}
                color={isJoined ? "error" : "primary"}
                startIcon={isJoined ? <CancelIcon /> : <CheckCircleIcon />}
                fullWidth
                onClick={handleClick}
                disabled={!thisDriver || (thisDriver.availableSeats === 0 && !isJoined)}
              >
                {isJoined ? "בטל השתתפות" : "הצטרף לנסיעה"}
              </Button>
            </Box>
          </CardContent>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                נוסעים
              </Typography>
              <Divider />
              <Grid container spacing={2} mt={1}>
                {thisDriver.passengers.map((passenger, index) => (
                  <div key={index}>
                    <Box p={2} border="1px solid #ddd" borderRadius={2}>
                      <Typography variant="body1">{passenger.userName}</Typography>
                      <Chip
                        label={passenger.gender}
                        color={passenger.gender === 'גבר' ? 'primary' : 'secondary'}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </div>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Card>

      </div>
    </>
  );
}