import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

const passengers = [
  { name: 'נוסע אחד', gender: 'גבר' },
  { name: 'נוסעת שתיים', gender: 'אישה' },
  { name: 'אילה דויטש', gender: 'אישה' },
];

export default function PassengerList() {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          נוסעים
        </Typography>
        <Divider />
        <Grid container spacing={2} mt={1}>
          {passengers.map((passenger, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box p={2} border="1px solid #ddd" borderRadius={2}>
                <Typography variant="body1">{passenger.name}</Typography>
                <Chip
                  label={passenger.gender}
                  color={passenger.gender === 'גבר' ? 'primary' : 'secondary'}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
