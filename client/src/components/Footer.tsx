
import { Box, Container, Grid, Typography, Link, Divider, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useSelector } from "react-redux";
import { RootState } from "../stores/Store"; // נתיב נכון למאגר ה-Redux שלך

import {
  footerBox,
  sectionTitle,
  linkList,
  contactText,
  iconGroup,
  dividerStyle,
  copyrightText,
} from "../CSS/FooterStyles";

export default function Footer() {
  // בודקים ב-Redux האם יש משתמש מחובר
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isLoggedIn = Boolean(currentUser);

  return (
    <Box component="footer" sx={footerBox}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* קישורים מהירים */}
          <Grid item xs={12} md={4}>
            <Typography sx={sectionTitle}>קישורים מהירים</Typography>
            <Box sx={linkList}>
              <Link href="/" color="inherit" underline="hover">דף הבית</Link>
              <Link href="/About" color="inherit" underline="hover">אודות</Link>
              {isLoggedIn && (
                <Link href="/SearchDrive" color="inherit" underline="hover">חיפוש נסיעה</Link>
                )}
              {!isLoggedIn && (<>
                <Link href="/loginForm" color="inherit" underline="hover">הרשמה</Link>
                <Link href="/loginIn" color="inherit" underline="hover">התחברות</Link>
                </>
              )}
            </Box>
          </Grid>

          {/* צור קשר */}
          <Grid item xs={12} md={4}>
            <Typography sx={sectionTitle}>צור קשר</Typography>
            <Typography sx={contactText}>
              אימייל: <Link href="mailto:info@rideshare.co.il" color="inherit" underline="hover">info@rideshare.co.il</Link>
            </Typography>
            <Typography sx={{ ...contactText, mt: 1 }}>
              טלפון: <Link href="tel:031234567" color="inherit" underline="hover">03-1234567</Link>
            </Typography>
            <Box sx={iconGroup}>
              <IconButton color="inherit" href="#"><TwitterIcon /></IconButton>
              <IconButton color="inherit" href="#"><InstagramIcon /></IconButton>
              <IconButton color="inherit" href="#"><FacebookIcon /></IconButton>
            </Box>
          </Grid>

          {/* תיאור ולוגו */}
          <Grid item xs={12} md={4}>
            <Typography sx={sectionTitle}>RideShare 🚗</Typography>
            <Typography variant="body2">
              פלטפורמה המחברת בין נהגים לנוסעים לחוויית נסיעה משותפת חלקה, חסכונית וידידותית לסביבה.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={dividerStyle} />

        <Typography sx={copyrightText}>
          כל הזכויות שמורות. © RideShare 2025
        </Typography>
      </Container>
    </Box>
  );
}
