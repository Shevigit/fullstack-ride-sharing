// import { Outlet } from "react-router"
// import Nav from "./Nav"
// import { useEffect, useState } from "react"
// import HomePageNav from "./HomePageNav"
// const UserLayout = () => {
//     const [baseNav, setBaseNav] = useState<boolean>(true)
//     useEffect(() => {
//         const user = localStorage.getItem('currentUser');
//         console.log(user);
//         if (user) {
//             setBaseNav(false)
//         }
//     }, [])
//     return (
//         <div>
//             {
//                 baseNav ? <Nav /> : <HomePageNav/>
//             }
//         </div>
//     )
// }

// export default UserLayout

// components/UserLayout.tsx
import { useSelector } from "react-redux";
import { RootState } from "../stores/Store";
import Nav from "./Nav";
import HomePageNav from "./HomePageNav";
import { Outlet } from "react-router";

const UserLayout = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <div>
      {currentUser ? <HomePageNav /> : <Nav />}
      <Outlet/>
    </div>
  );
};

export default UserLayout;
