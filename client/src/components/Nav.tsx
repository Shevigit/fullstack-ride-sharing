import { NavLink } from 'react-router'
import { LoginBtn, navStyle, SignUpBtn } from '../CSS/nav'
import { Button } from '@mui/material'
const Nav = () => {
    return (
        <div>
            <nav style={navStyle}>
                <div>
                    <NavLink to='/' >Home Page</NavLink>
                </div>
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
            </nav>
        </div>
    )
}

export default Nav