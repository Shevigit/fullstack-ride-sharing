import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PassengerList from "./PassengerList";

export default function RideInfoCard() {
  const [isJoined, setIsJoined] = useState(false);

  const handleClick = () => {
    setIsJoined((prev) => !prev);
  };

  return (
    <>
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">תל אביב → ירושלים</Typography>
          <Chip label="פעיל" color="success" />
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            יום חמישי, 2 בינואר 2025
          </Typography>
        </Box>

        <Box mt={2} display="flex" alignItems="center" gap={1}>
          <AccessTimeIcon fontSize="small" />
          <Typography>07:30</Typography>
        </Box>

        <Box mt={1} display="flex" alignItems="center" gap={1}>
          <LocationOnIcon fontSize="small" />
          <Typography>רחוב הרצל 42, תל אביב</Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="subtitle2">הערות נוספות</Typography>
          <Typography variant="body2" color="text.secondary">
            יציאה מתחנה מרכזית, אני יכול לאסוף/להוריד בכל מקום לאורך הדרך.
          </Typography>
        </Box>

        <Box mt={2}>
          <Chip
            label={isJoined ? "נסיעה טובה" : "2 מקומות פנויים"}
            color={isJoined ? "info" : "success"}
          />
        </Box>

        <Box mt={2}>
          <Button
            variant={isJoined ? "outlined" : "contained"}
            color={isJoined ? "error" : "primary"}
            startIcon={isJoined ? <CancelIcon /> : <CheckCircleIcon />}
            fullWidth
            onClick={handleClick}
          >
            {isJoined ? "בטל השתתפות" : "הצטרף לנסיעה"}
          </Button>
        </Box>
      </CardContent>
    </Card>
    <PassengerList></PassengerList>
    </>
  );
}
