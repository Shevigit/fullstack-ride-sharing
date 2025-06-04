


import { useNavigate, NavLink } from 'react-router'; 
import { navStyle } from '../CSS/nav';
import { NavbarLink } from '../CSS/homePageNav';
import { Button } from '@mui/material';
import { SignUpBtn } from '../CSS/nav';
import { useDispatch } from 'react-redux';
import { logout } from '../stores/Slices/authSlice'; // ← תיקון כאן!

import { useSelector } from 'react-redux';

const HomePageNav = () => {
  const user = useSelector((state: any) => state.user.user); // או טיפוס נכון אם יש לך
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // זה כבר מסיר גם מ־Redux וגם מ־localStorage
    navigate('/');
  };
  return (
    <nav style={navStyle}>
      <NavLink to="/">RideShare</NavLink>

      <NavLink to="/Update">
        <div style={NavbarLink}>פרופיל משתמש</div>
      </NavLink>

      {user?.hasCar && (
        <NavLink to="/Offer">
          <div style={NavbarLink}>הוספת נסיעה</div>
        </NavLink>
      )}

      <NavLink to="/SearchDrive">
        <div style={NavbarLink}>חיפוש נסיעה</div>
      </NavLink>

      <NavLink to="/About">
        <div style={NavbarLink}>אודות</div>
      </NavLink>

      <NavLink to="/">
        <div style={NavbarLink}>עמוד הבית</div>
      </NavLink>

      <Button style={SignUpBtn} onClick={handleLogout}>Log out</Button>
    </nav>
  );
};
export default HomePageNav