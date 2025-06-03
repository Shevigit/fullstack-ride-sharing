import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router";
import {
  useGetAlldriversQuery,
  useDeletedriverMutation,
  
} from "../stores/Slices/endPointsDriver";
import { Driver, User } from "./interfaces/Interface";

const UserProfile = () => {
  const { data: allDrivers, isLoading, isError, error } = useGetAlldriversQuery();
  const [deleteDriver] = useDeletedriverMutation();
  const currentUser=localStorage.getItem("currentUser");
  const navigate = useNavigate();



  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
        <CircularProgress />
        <Typography ml={2}>טוען נתונים...</Typography>
      </Box>
    );
  }

  if (isError || !allDrivers) {
    return (
      <Alert severity="error">שגיאה בטעינת הנסיעות: {JSON.stringify(error)}</Alert>
    );
  }

  if (!currentUser) {
    return <Typography variant="h6">אין משתמש מחובר.</Typography>;
  }

  const myRides = allDrivers.filter(
    (driver) => driver?._id === currentUser._id
  );

  const joinedRides = allDrivers.filter(
    (driver) =>
      Array.isArray(driver.passengers) &&
      driver.passengers.some((p) => p?._id === currentUser._id)
  );

  const handleEdit = (rideId: string) => {
    navigate(`/edit-ride/${rideId}`);
  };

  const handleDelete = async (ride: Driver) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הנסיעה?")) {
      try {
        await deleteDriver(ride);
        // כאן אפשר להוסיף שליחת מייל לכל הנוסעים - אם תרצה
        // ride.passengers?.forEach(p => sendEmail(p.email, ...))
      } catch (err) {
        console.error("שגיאה במחיקה:", err);
      }
    }
  };

  const renderRideCard = (ride: Driver, showActions = false) => (
    <Grid item xs={12} md={6} key={ride._id}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6">
            {ride.source} → {ride.destination}
          </Typography>
          <Typography variant="body2">
            תאריך: {new Date(ride.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">שעה: {ride.time}</Typography>
          <Typography variant="body2">כתובת איסוף: {ride.address}</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">מקומות פנויים: {ride.availableSeats}</Typography>
          {showActions && (
            <Box mt={2} display="flex" gap={1}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(ride._id!)}
              >
                ערוך
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleDelete(ride)}
              >
                מחק
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        פרופיל משתמש
      </Typography>

      <Box mt={4}>
        <Typography variant="h5">🛣️ נסיעות שיצרתי</Typography>
        <Grid container spacing={2} mt={1}>
          {myRides.length > 0 ? (
            myRides.map((ride) => renderRideCard(ride, true))
          ) : (
            <Typography variant="body1" sx={{ ml: 2 }}>
              לא יצרת נסיעות.
            </Typography>
          )}
        </Grid>
      </Box>

      <Box mt={5}>
        <Typography variant="h5">🚗 נסיעות שהצטרפתי אליהן</Typography>
        <Grid container spacing={2} mt={1}>
          {joinedRides.length > 0 ? (
            joinedRides.map((ride) => renderRideCard(ride))
          ) : (
            <Typography variant="body1" sx={{ ml: 2 }}>
              לא הצטרפת לנסיעות.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default UserProfile;
