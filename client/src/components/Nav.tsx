import { NavLink } from 'react-router'
import "../style/HomePage.css"

const Nav = () => {

    // console.log("shevi");

    return (
        <div>
            {/* style={{ display: "flex", position: "fixed", top: "0px", right: "0px", left: "0px", width: "100vw", backgroundColor: "gray", justifyContent: "space-around" }} */}
            <nav className='main-nav' >
                {/* <div>
                    <NavLink to='/' style={({ isActive }) => ({ color: isActive ? "red" : "green" })}>Home Page</NavLink>
                </div>
                <div>
                    <NavLink to='/loginForm' style={({ isActive }) => ({ color: isActive ? "red" : "green" })}>loginForm</NavLink>
                </div>

                <div>
                    <NavLink to='/loginIn' style={({ isActive }) => ({ color: isActive ? "red" : "green" })}>LoginIn</NavLink>
                </div> */}
                <div>
                    <NavLink to='/about' className="nav-link" >אודות</NavLink>
                </div>

                <div>
                    <NavLink to='/contact' className="nav-link" >צור קשר</NavLink>
                </div>
                <div className="auth-buttons">
                    {/* {
                    isLoggedIn &&( */}
                   
                        <div>
                            <NavLink to='/SearchDrive' className="nav-link" >חיפוש נסיעה</NavLink>
                        </div>

                        <div>
                            <NavLink to='/offer' className="nav-link" >הצעת נסיעה</NavLink>
                        </div>
                        <div>
                            <NavLink to='/MyDrivers' className="nav-link" >הנסיעות שלי</NavLink>
                        </div>
                    </div>
               
                {/* )
                }  */}
            </nav>
        </div>
    )
}

export default Nav


{/* <li><Link to="/about" className="nav-link">אודות</Link></li>
            <li><Link to="/contact" className="nav-link">צור קשר</Link></li>
            {isLoggedIn && (
              <>
                <li><Link to="/search-ride" className="nav-link">חיפוש נסיעה</Link></li>
                <li><Link to="/offer-ride" className="nav-link">הצעת נסיעה</Link></li>
                <li><Link to="/my-rides" className="nav-link">הנסיעות שלי</Link></li>
              </>
            )}
          </ul> */}