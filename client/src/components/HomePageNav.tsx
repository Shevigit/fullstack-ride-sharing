
// import { useNavigate, NavLink } from 'react-router'; 
// import { navStyle } from '../CSS/nav';
// import { NavbarLink } from '../CSS/homePageNav';
// import { Button } from '@mui/material';
// import { SignUpBtn } from '../CSS/nav';
// import { useDispatch } from 'react-redux';
// import { logout } from '../stores/Slices/authSlice'; 

// import { useSelector } from 'react-redux';

// const HomePageNav = () => {
// const user = useSelector((state: any) => state.auth.currentUser);
//    const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout()); 
//     navigate('/');
//   };
//   return (
//     <nav style={navStyle}>
//       <NavLink to="/">RideShare</NavLink>

//       <NavLink to="/Update">
//         <div style={NavbarLink}>פרופיל משתמש</div>
//       </NavLink>

//       {user?.hasCar && (
//         <NavLink to="/Offer">
//           <div style={NavbarLink}>הוספת נסיעה</div>
//         </NavLink>
//       )}

//       <NavLink to="/SearchDrive">
//         <div style={NavbarLink}>חיפוש נסיעה</div>
//       </NavLink>

//       <NavLink to="/About">
//         <div style={NavbarLink}>אודות</div>
//       </NavLink>

//       <NavLink to="/">
//         <div style={NavbarLink}>עמוד הבית</div>
//       </NavLink>

//       <Button style={SignUpBtn} onClick={handleLogout}>Log out</Button>
//     </nav>
//   );
// };
// export default HomePageNav

import { useNavigate, NavLink } from 'react-router';
import { navStyle } from '../CSS/nav';
import { NavbarLink } from '../CSS/homePageNav';
import { Button } from '@mui/material';
import { SignUpBtn } from '../CSS/nav';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../stores/Slices/authSlice';

const HomePageNav = () => {
  const user = useSelector((state: any) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav style={{ 
      ...navStyle, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 16px',
      direction: 'rtl',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      height: 60,
    }}>
      {/* לוגו/כותרת */}
      <NavLink 
        to="/" 
        style={{ 
          textDecoration: 'none', 
          fontWeight: '700', 
          fontSize: 24, 
          color: '#1976d2' 
        }}
        activeStyle={{ color: '#004ba0' }}
      >
        RideShare
      </NavLink>

      {/* קישורים מרכזיים */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <NavLink to="/Update" style={({ isActive }) => ({
          ...NavbarLink,
          color: isActive ? '#004ba0' : '#333',
          fontWeight: isActive ? '700' : '400',
        })}>
          פרופיל משתמש
        </NavLink>

        {user?.hasCar && (
          <NavLink to="/Offer" style={({ isActive }) => ({
            ...NavbarLink,
            color: isActive ? '#004ba0' : '#333',
            fontWeight: isActive ? '700' : '400',
          })}>
            הוספת נסיעה
          </NavLink>
        )}

        <NavLink to="/SearchDrive" style={({ isActive }) => ({
          ...NavbarLink,
          color: isActive ? '#004ba0' : '#333',
          fontWeight: isActive ? '700' : '400',
        })}>
          חיפוש נסיעה
        </NavLink>

        <NavLink to="/About" style={({ isActive }) => ({
          ...NavbarLink,
          color: isActive ? '#004ba0' : '#333',
          fontWeight: isActive ? '700' : '400',
        })}>
          אודות
        </NavLink>

        <NavLink to="/" style={({ isActive }) => ({
          ...NavbarLink,
          color: isActive ? '#004ba0' : '#333',
          fontWeight: isActive ? '700' : '400',
        })}>
          עמוד הבית
        </NavLink>
      </div>

      {/* כפתור יציאה */}
      <Button 
        variant="outlined"
        color="primary"
        onClick={handleLogout}
        style={{ ...SignUpBtn, minWidth: 100, fontWeight: '600' }}
      >
        יציאה
      </Button>
    </nav>
  );
};

export default HomePageNav;
