// import { Outlet } from "react-router"
// import Nav from "./Nav"
// import { useEffect, useState } from "react"
// import HomePageNav from "./HomePageNav"
// const AppLayout = () => {
//     const [baseNav, setBaseNav] = useState<boolean>(true)
//     useEffect(() => {
//         const user = localStorage.getItem('currentUser');
       
        
//         if (user) {
//             setBaseNav(false)
//         }

//     }, [])
//     return (
//         <div>
//             {
//                 baseNav ? <Nav /> : <HomePageNav/>
//             }

//             <Outlet />
//         </div>
//     )
// }

// export default AppLayout
import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import HomePageNav from './HomePageNav';
import { useSelector } from 'react-redux';
import { RootState } from '../stores/Store';

const AppLayout = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      {user ? <HomePageNav /> : <Nav />}
      <Outlet />
    </div>
  );
};

export default AppLayout;