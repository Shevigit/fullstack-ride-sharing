
import { Outlet } from "react-router"
import Nav from "./Nav"


const AppLayout = () => {
    return (
        <div>
        <Nav/>
            <Outlet/>
        </div>
    )
}

export default AppLayout