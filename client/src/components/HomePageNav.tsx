// // import { navStyle } from '../CSS/nav'
// // import { useNavigate, NavLink } from 'react-router'
// // import { NavbarLink } from '../CSS/homePageNav'
// // import { Button } from '@mui/material'
// // import { SignUpBtn } from '../CSS/nav'

// // import { useDispatch } from 'react-redux'
// // import { logout } from '../stores/Slices/UserSlice'



// // const HomePageNav = () => {

// //   const dispatch = useDispatch();

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     localStorage.removeItem('currentUser'); // אם שמרת שם משהו
// //     useNavigate('/loginIn'); // ניתוב לעמוד התחברות
// //   };
// //     return (
// //         <div>
// //             <nav style={navStyle}>
// //                 <div>
// //                     <NavLink to='/' >RideShare</NavLink>
// //                 </div>
// //                 <NavLink to="/Update" >
// //                     <div  style={NavbarLink} >
// //                         פרופיל משתמש
// //                     </div>
// //                 </NavLink>
// //                 <NavLink to="/Offer">
// //                     <div style={NavbarLink}>
// //                         הוספת נסיעה
// //                     </div>
// //                 </NavLink>
// //                 <NavLink to="/SearchDrive">
// //                     <div style={NavbarLink}>
// //                         חיפוש נסיעה
// //                     </div>
// //                 </NavLink>
// //                 <NavLink to="/About">
// //                     <div style={NavbarLink}>
// //                         אודות
// //                     </div>
// //                 </NavLink>
// //                 <NavLink to="/">
// //                     <div style={NavbarLink}>
// //                         עמוד הבית
// //                     </div>
// //                 </NavLink>
               
// //                 <Button style={SignUpBtn} onClick={handleLogout}>
// //               Log out
// //                 </Button >
            
// //             </nav>
// //         </div>
// //     )
// // }

// // export default HomePageNav

// import { useNavigate, NavLink } from 'react-router'; // ← תיקון: השתמש ב-'react-router-dom' ולא ב-'react-router'
// import { navStyle } from '../CSS/nav';
// import { NavbarLink } from '../CSS/homePageNav';
// import { Button } from '@mui/material';
// import { SignUpBtn } from '../CSS/nav';
// import { useDispatch } from 'react-redux';
// import { logout } from '../stores/Slices/UserSlice';

// const HomePageNav = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // ← כאן יוצרים את הפונקציה

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem('currentUser');
//     navigate('/'); // ← ככה נכון לקרוא לה
//   };

//   return (
//     <div>
//       <nav style={navStyle}>
//         <div>
//           <NavLink to="/">RideShare</NavLink>
//         </div>
//         <NavLink to="/Update">
//           <div style={NavbarLink}>פרופיל משתמש</div>
//         </NavLink>
//         <NavLink to="/Offer">
//           <div style={NavbarLink}>הוספת נסיעה</div>
//         </NavLink>
//         <NavLink to="/SearchDrive">
//           <div style={NavbarLink}>חיפוש נסיעה</div>
//         </NavLink>
//         <NavLink to="/About">
//           <div style={NavbarLink}>אודות</div>
//         </NavLink>
//         <NavLink to="/">
//           <div style={NavbarLink}>עמוד הבית</div>
//         </NavLink>

//         <Button style={SignUpBtn} onClick={handleLogout}>
//           Log out
//         </Button>
//       </nav>
//     </div>
//   );
// };

// export default HomePageNav;
import { useNavigate, NavLink } from 'react-router-dom'; // ← ודא שזה react-router-dom
import { navStyle } from '../CSS/nav';
import { NavbarLink } from '../CSS/homePageNav';
import { Button } from '@mui/material';
import { SignUpBtn } from '../CSS/nav';
import { useDispatch } from 'react-redux';
import { logout } from '../stores/Slices/authSlice'; // ← תיקון כאן!

const HomePageNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // זה כבר מסיר גם מ־Redux וגם מ־localStorage
    navigate('/');
  };

  return (
    <div>
      <nav style={navStyle}>
        <div>
          <NavLink to="/">RideShare</NavLink>
        </div>
        <NavLink to="/Update">
          <div style={NavbarLink}>פרופיל משתמש</div>
        </NavLink>
        <NavLink to="/Offer">
          <div style={NavbarLink}>הוספת נסיעה</div>
        </NavLink>
        <NavLink to="/SearchDrive">
          <div style={NavbarLink}>חיפוש נסיעה</div>
        </NavLink>
        <NavLink to="/About">
          <div style={NavbarLink}>אודות</div>
        </NavLink>
        <NavLink to="/">
          <div style={NavbarLink}>עמוד הבית</div>
        </NavLink>

        <Button style={SignUpBtn} onClick={handleLogout}>
          Log out
        </Button>
      </nav>
    </div>
  );
};

export default HomePageNav;
