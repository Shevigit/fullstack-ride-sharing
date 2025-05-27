import { navStyle } from '../CSS/nav'
import { NavLink } from 'react-router'
import { NavbarLink } from '../CSS/homePageNav'

const HomePageNav = () => {
    return (
        <div>
            <nav style={navStyle}>
                <div>
                    <NavLink to='/' >RideShare</NavLink>
                </div>
                <NavLink to="/Update" >
                    <div  style={NavbarLink} >
                        פרופיל משתמש
                    </div>
                </NavLink>
                <NavLink to="/Offer">
                    <div style={NavbarLink}>
                        הוספת נסיעה
                    </div>
                </NavLink>
                <NavLink to="/SearchDrive">
                    <div style={NavbarLink}>
                        חיפוש נסיעה
                    </div>
                </NavLink>
                <NavLink to="/About">
                    <div style={NavbarLink}>
                        אודות
                    </div>
                </NavLink>
                <NavLink to="/">
                    <div style={NavbarLink}>
                        עמוד הבית
                    </div>
                </NavLink>
            </nav>
        </div>
    )
}

export default HomePageNav