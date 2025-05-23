import { Outlet } from "react-router"
import Nav from "./Nav"
import { useEffect, useState } from "react"
import HomePageNav from "./HomePageNav"
const AppLayout = () => {
    const [baseNav, setBaseNav] = useState<boolean>(true)
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user) {
            setBaseNav(false)
        }

    }, [])
    return (
        <div>
            {
                baseNav ? <Nav /> : <HomePageNav/>
            }

            <Outlet />
        </div>
    )
}

export default AppLayout