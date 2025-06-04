
import { useSelector } from "react-redux";
import { RootState } from "../stores/Store";
import Nav from "./Nav";
import HomePageNav from "./HomePageNav";
import { Outlet } from "react-router";

const UserLayout = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <>
   
    <div>
      {currentUser ? <HomePageNav /> : <Nav />}
      <Outlet/>
    </div>
     </>
  );
};

export default UserLayout;
