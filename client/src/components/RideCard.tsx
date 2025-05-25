import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  Button
} from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const RideCard = () => {

    const ride = {
    origin: "תל אביב",
    destination: "ירושלים",
    time: "07:30",
    date: "2025-05-13",
    availableSeats: 3,
    isActive: true
  };

  const {
    origin,
    destination,
    time,
    date,
    availableSeats,
    isActive
  } = ride;

  return (
    <Card
      variant="outlined"
      sx={{ mb: 2, p: 2, borderRadius: 3, backgroundColor: "#f9f9ff" }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              {origin} → {destination}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2">
                {date} בשעה {time}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {availableSeats > 0
                ? `${availableSeats} מקומות פנויים`
                : "אין מקומות פנויים"}
            </Typography>
          </Box>

          <Stack alignItems="flex-end" spacing={1}>
            <Chip
              label={isActive ? "פעיל" : "לא פעיל"}
              color={isActive ? "success" : "default"}
              size="small"
            />
           
            <Button
            component={Link}
            to="/SearchDrive/id1"
              variant="outlined"
              size="small"
              disabled={availableSeats === 0}
            >
              {availableSeats === 0 ? "אין מקומות פנויים" : "פרטים נוספים"}
              
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RideCard;
