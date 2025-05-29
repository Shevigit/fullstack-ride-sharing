// // import { Outlet, useLocation } from 'react-router';
// // import { useEffect, useState } from 'react';
// // import UserLayout from './UserLayOut';
// // import Nav from './Nav';
// // import HomePageNav from './HomePageNav';
// // import Footer from './Footer/Footer'; // ודא שהנתיב נכון

// // const AppLayout = () => {
// //   const [baseNav, setBaseNav] = useState<boolean>(true);
// //   const location = useLocation();

// //   // רשימת עמודים שבהם לא נרצה להציג את הפוטר
// //   const noFooterRoutes = ['/login', '/register', '/admin'];

// //   useEffect(() => {
// //     const user = localStorage.getItem('currentUser');
// //     if (user) {
// //       setBaseNav(false);
// //     }
// //   }, []);

// //   const shouldShowFooter = !noFooterRoutes.includes(location.pathname);

// //   return (
// //     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
// //       <UserLayout />
// //       {/* {baseNav ? <HomePageNav /> : <Nav />} */}
// //       <div style={{ flex: 1 }}>
// //         <Outlet />
// //       </div>
// //       {shouldShowFooter && <Footer />}
// //     </div>
// //   );
// // };

// // export default AppLayout;



// // useLocation() מחזיר את כתובת הדף הנוכחי (location.pathname).

// // אם הנתיב הנוכחי מופיע ברשימת noFooterRoutes, הפוטר לא יוצג.

// // אחרת — הפוטר יוצג כרגיל.




// import { Box, Container, Grid, Typography, Link, Divider, IconButton } from "@mui/material";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import {
//   footerBox,
//   sectionTitle,
//   linkList,
//   contactText,
//   iconGroup,
//   dividerStyle,
//   copyrightText,
// } from "../CSS/FooterStyles";

// export default function Footer() {
//   return (
//     <Box component="footer" sx={footerBox}>
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {/* קישורים מהירים */}
//           <Grid item xs={12} md={4}>
//             <Typography sx={sectionTitle}>קישורים מהירים</Typography>
//             <Box sx={linkList}>
//               <Link href="/" color="inherit" underline="hover">דף הבית</Link>
//               <Link href="/About" color="inherit" underline="hover"> אודות</Link>
//               <Link href="/SearchDrive" color="inherit" underline="hover">חיפוש נסיעה</Link>
//               <Link href="/loginIn" color="inherit" underline="hover">הרשמה</Link>
//             </Box>
//           </Grid>

//           {/* צור קשר */}
//           <Grid item xs={12} md={4}>
//             <Typography sx={sectionTitle}>צור קשר</Typography>
//             <Typography sx={contactText}>
//               אימייל: <Link href="mailto:info@rideshare.co.il" color="inherit" underline="hover">info@rideshare.co.il</Link>
//             </Typography>
//             <Typography sx={{ ...contactText, mt: 1 }}>
//               טלפון: <Link href="tel:031234567" color="inherit" underline="hover">03-1234567</Link>
//             </Typography>
//             <Box sx={iconGroup}>
//               <IconButton color="inherit" href="#"><TwitterIcon /></IconButton>
//               <IconButton color="inherit" href="#"><InstagramIcon /></IconButton>
//               <IconButton color="inherit" href="#"><FacebookIcon /></IconButton>
//             </Box>
//           </Grid>

//           {/* תיאור ולוגו */}
//           <Grid item xs={12} md={4}>
//             <Typography sx={sectionTitle}>RideShare 🚗</Typography>
//             <Typography variant="body2">
//               פלטפורמה המחברת בין נהגים לנוסעים לחוויית נסיעה משותפת חלקה, חסכונית וידידותית לסביבה.
//             </Typography>
//           </Grid>
//         </Grid>

//         <Divider sx={dividerStyle} />

//         <Typography sx={copyrightText}>
//           כל הזכויות שמורות. © RideShare 2024
//         </Typography>
//       </Container>
//     </Box>
//   );
// }


import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Link, Divider, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    setIsLoggedIn(!!user);
  }, []);

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
              <Link href="/SearchDrive" color="inherit" underline="hover">חיפוש נסיעה</Link>
              {!isLoggedIn && (
                <Link href="/loginIn" color="inherit" underline="hover">הרשמה</Link>
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
          כל הזכויות שמורות. © RideShare 2024
        </Typography>
      </Container>
    </Box>
  );
}
