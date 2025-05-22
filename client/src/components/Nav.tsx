import { NavLink } from 'react-router'
import { containerOfBtns, LoginBtn, navStyle, SignUpBtn } from '../CSS/nav'
import { Button } from '@mui/material'
const Nav = () => {
    return (
        <div>
            <nav style={navStyle}>
                <div>
                    <NavLink to='/' >RideShare</NavLink>
                </div>
                <div style={containerOfBtns}>
                <NavLink to='/loginForm'>
                <Button style={SignUpBtn}>
                   Sign Up
                </Button>
                </NavLink>
                <NavLink to='/loginIn'>
                    <Button sx={LoginBtn}>
                        Log In
                    </Button>
                </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Nav