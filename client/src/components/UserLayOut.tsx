import { Outlet } from "react-router"
import Nav from "./Nav"


const UserLayout = () => {
    return (
        <div>
        <Nav/>
            <Outlet/>
        </div>
    )
}

export default UserLayout