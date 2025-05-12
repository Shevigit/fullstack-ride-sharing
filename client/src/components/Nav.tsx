import {  NavLink } from 'react-router'
const Nav = () => {

  // console.log("shevi");
    
    return (
        <div>

        <nav style={{ display: "flex", position: "fixed", top: "0px", right: "0px", left: "0px", width: "100vw", backgroundColor: "gray", justifyContent: "space-around" }}>
                <div>
                    <NavLink to='/' style={({ isActive }) => ({ color: isActive ? "red" : "green" })}>Home Page</NavLink>
                </div>
                <div>
                    <NavLink to='/loginForm' style={({ isActive }) => ({ color: isActive ? "red" : "green" })}>loginForm</NavLink>
                </div>

                <div>
                    <NavLink to='/loginIn' style={({ isActive }) => ({ color: isActive ? "red" : "green" })}>LoginIn</NavLink>
                </div>
      </nav>
        </div>
    )
}

export default Nav