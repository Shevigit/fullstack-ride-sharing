
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router";
import { useGetAlldriversQuery } from "../stores/Slices/endPointsDriver";
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
<>

    
    </>
  );
};

export default RideCard;
