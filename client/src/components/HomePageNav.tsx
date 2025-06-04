
import { useNavigate, NavLink } from 'react-router'; 
import { navStyle } from '../CSS/nav';
import { NavbarLink } from '../CSS/homePageNav';
import { Button } from '@mui/material';
import { SignUpBtn } from '../CSS/nav';
import { useDispatch } from 'react-redux';
import { logout } from '../stores/Slices/authSlice'; 

const HomePageNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
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
