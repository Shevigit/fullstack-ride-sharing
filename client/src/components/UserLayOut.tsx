import { Outlet } from "react-router"
import Nav2 from "./Nav2"


const UserLayout = () => {
    return (
        <div>
        <Nav2/>
            <Outlet/>
        </div>
    )
}

export default UserLayout