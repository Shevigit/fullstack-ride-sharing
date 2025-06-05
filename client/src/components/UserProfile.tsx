

// import React from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   Divider,
// } from "@mui/material";
// import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { RootState } from "../stores/Store"; // נתיב אל ה-root reducer שלך
// import {
//   useGetAlldriversQuery,
//   useDeletedriverMutation,
// } from "../stores/Slices/endPointsDriver";
// import { Driver } from "./interfaces/Interface";

// const UserProfile = () => {

//   const { data: allDrivers, isLoading, isError, error } = useGetAlldriversQuery();
//   const [deleteDriver] = useDeletedriverMutation();
//   const currentUser = localStorage.getItem("currentUser");
//   const navigate = useNavigate();

  
//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
//         <CircularProgress />
//         <Typography ml={2}>טוען נתונים...</Typography>
//       </Box>
//     );
//   }

//   if (isError || !allDrivers) {
//     return <Alert severity="error">שגיאה בטעינת הנסיעות: {JSON.stringify(error)}</Alert>;
//   }

//   if (!currentUser) {
//     return <Typography variant="h6">אין משתמש מחובר.</Typography>;
//   }

//   // סינון נסיעות שיצר המשתמש הנוכחי
//   const myRides = allDrivers.filter(
//     (ride) => ride.driver === currentUser.id
//   );

//   // סינון נסיעות שהמשתמש הצטרף אליהן (בתור נוסע)
//   const joinedRides = allDrivers.filter(
//     (ride) =>
//       Array.isArray(ride.passengers) &&
//       ride.passengers.some((p) => p?._id === currentUser.id)
//   );

//   const handleEdit = (rideId: string) => {
//     navigate(`/edit-ride/${rideId}`);
//   };

//   const handleDelete = async (ride: Driver) => {
//     if (window.confirm("האם אתה בטוח שברצונך למחוק את הנסיעה?")) {
//       try {
//         await deleteDriver(ride);
//         // ניתן להוסיף שליחת מייל לנוסעים כאן אם רוצים
//       } catch (err) {
//         console.error("שגיאה במחיקה:", err);
//       }
//     }
//   };

//   const renderRideCard = (ride: Driver, showActions = false) => (
//     <Grid item xs={12} md={6} key={ride._id}>
//       <Card elevation={3}>
//         <CardContent>
//           <Typography variant="h6">
//             {ride.source} → {ride.destination}
//           </Typography>
//           <Typography variant="body2">
//             תאריך: {new Date(ride.date).toLocaleDateString()}
//           </Typography>
//           <Typography variant="body2">שעה: {ride.time}</Typography>
//           <Typography variant="body2">כתובת איסוף: {ride.address}</Typography>
//           <Divider sx={{ my: 1 }} />
//           <Typography variant="body2">מקומות פנויים: {ride.availableSeats}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {ride.driver ? `שם נהג: ${ride?.driver}` : "שם נהג לא נמצא"}
//           </Typography>
//           {showActions && (
//             <Box mt={2} display="flex" gap={1}>
//               <Button
//                 size="small"
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => handleEdit(ride._id!)}
//               >
//                 ערוך
//               </Button>
//               <Button
//                 size="small"
//                 variant="outlined"
//                 color="error"
//                 onClick={() => handleDelete(ride)}
//               >
//                 מחק
//               </Button>
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </Grid>
//   );

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         פרופיל משתמש
//       </Typography>

//       <Box mt={4}>
//         <Typography variant="h5">🛣️ נסיעות שיצרתי</Typography>
//         <Grid container spacing={2} mt={1}>
//           {myRides.length > 0 ? (
//             myRides.map((ride) => renderRideCard(ride, true))
//           ) : (
//             <Typography variant="body1" sx={{ ml: 2 }}>
//               לא יצרת נסיעות.
//             </Typography>
//           )}
//         </Grid>
//       </Box>

//       <Box mt={5}>
//         <Typography variant="h5">🚗 נסיעות שהצטרפתי אליהן</Typography>
//         <Grid container spacing={2} mt={1}>
//           {joinedRides.length > 0 ? (
//             joinedRides.map((ride) => renderRideCard(ride))
//           ) : (
//             <Typography variant="body1" sx={{ ml: 2 }}>
//               לא הצטרפת לנסיעות.
//             </Typography>
//           )}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default UserProfile;
import React from "react";
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
  useDeletedriverMutation,
  useGetDriverSuggestionsQuery,
  useGetPassengerSuggestionsQuery,
} from "../stores/Slices/endPointsDriver";
import { Driver } from "./interfaces/Interface";

const UserProfile = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const parsedUser = currentUser ? JSON.parse(currentUser) : null;

  const {
    data: myRides,
    isLoading: isLoadingDriver,
    isError: isErrorDriver,
    error: errorDriver,
  } = useGetDriverSuggestionsQuery(parsedUser?._id, {
    skip: !parsedUser,
  });

  const {
    data: joinedRides,
    isLoading: isLoadingPassenger,
    isError: isErrorPassenger,
    error: errorPassenger,
  } = useGetPassengerSuggestionsQuery(parsedUser?._id, {
    skip: !parsedUser,
  });

console.log("joinedRides", joinedRides);
  const [deleteDriver] = useDeletedriverMutation();

  if (!parsedUser) {
    return <Typography variant="h6">אין משתמש מחובר.</Typography>;
  }

  if (isLoadingDriver || isLoadingPassenger) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
        <CircularProgress />
        <Typography ml={2}>טוען נתונים...</Typography>
      </Box>
    );
  }

  if (isErrorDriver || isErrorPassenger) {
    return (
      <Alert severity="error">
        שגיאה בטעינת הנסיעות:
        {JSON.stringify(errorDriver || errorPassenger)}
      </Alert>
    );
  }

  const handleEdit = (rideId: string) => {
    navigate(`/edit-ride/${rideId}`);
  };

  const handleDelete = async (ride: Driver) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הנסיעה?")) {
      try {
        await deleteDriver(ride);
        // TODO: שליחת מייל לנוסעים אם יש צורך
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
          <Typography variant="body2" color="text.secondary">
            {/* {typeof ride.driver === "object" && ride.driver?.name
              ? `שם נהג: ${ride.driver.name}`
              : "שם נהג לא ידוע"} */}
              {/* {ride.driver?.userName ? `שם נהג: ${ride.driver.userName}` : "שם נהג לא ידוע"} */}
{typeof ride.driver === "object" && ride.driver?.userName
  ? `שם נהג: ${ride.driver.userName}`
  : "שם נהג לא ידוע"}

          </Typography>
          {showActions && (
            <Box mt={2} display="flex" gap={1}>
              <Button size="small" variant="outlined" color="primary" onClick={() => handleEdit(ride._id!)}>
                ערוך
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(ride)}>
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
          {myRides?.length ? (
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
          {joinedRides?.length ? (
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
