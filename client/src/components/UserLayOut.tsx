import { Outlet } from "react-router"
import Nav from "./Nav"
import { useEffect, useState } from "react"
import HomePageNav from "./HomePageNav"
const UserLayout = () => {
    const [baseNav, setBaseNav] = useState<boolean>(true)
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        console.log(user);
        if (user) {
            setBaseNav(false)
        }
    }, [])
    return (
        <div>
            {
                baseNav ? <Nav /> : <HomePageNav/>
            }
        </div>
    )
}

export default UserLayout