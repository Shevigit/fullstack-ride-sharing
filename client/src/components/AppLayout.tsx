// // import { Outlet } from "react-router"
// // import Nav from "./Nav"
// // import { useEffect, useState } from "react"
// // import HomePageNav from "./HomePageNav"
// // const AppLayout = () => {
// //     const [baseNav, setBaseNav] = useState<boolean>(true)
// //     useEffect(() => {
// //         const user = localStorage.getItem('currentUser');
       
        
// //         if (user) {
// //             setBaseNav(false)
// //         }

// //     }, [])
// //     return (
// //         <div>
// //             {
// //                 baseNav ? <Nav /> : <HomePageNav/>
// //             }

// //             <Outlet />
// //         </div>
// //     )
// // }

// // export default AppLayout
// import { Outlet } from 'react-router';
// import Nav from './Nav';
// import HomePageNav from './HomePageNav';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '../stores/Store';
// import { useEffect, useState } from 'react';
// import UserLayout from './UserLayOut';

// const AppLayout = () => {
//   // const user = useSelector((state: RootState) => state.user.user);
//     const [baseNav, setBaseNav] = useState<boolean>(true)
//     useEffect(() => {
//         const user = localStorage.getItem('currentUser');
//         if (user) {
//             setBaseNav(false)
//         }

//     }, [])
//   return (
//     <div>
//       <UserLayout/>
//       {/* {baseNav ? <HomePageNav /> : <Nav />} */}
//       <Outlet />
//     </div>
//   );
// };

// export default AppLayout;


import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import UserLayout from './UserLayOut';
import Nav from './Nav';
import HomePageNav from './HomePageNav';
import Footer from './Footer'; // ודא שהנתיב נכון

const AppLayout = () => {
  const [baseNav, setBaseNav] = useState<boolean>(true);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setBaseNav(false);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <UserLayout />
      {/* {baseNav ? <HomePageNav /> : <Nav />} */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
