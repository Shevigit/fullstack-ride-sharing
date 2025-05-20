
import { Outlet } from "react-router"
import Nav from "./Nav"
import "../style/HomePage.css"


const AppLayout = () => {
    return (
        <div>
       {/* <header className="header">
      <div className="logo">
           <i className="fas fa-car-side"></i>
       </div>
        
 
        <Nav/>
            <Outlet/>
     
            <span>RideShare</span>
              </header> */}


              <header className="header">
        <div className="logo">
          <i className="fas fa-car-side"></i>
          <span>RideShare</span>
        </div>
        
        <nav className="main-nav">
        <Nav/>
      
        </nav>
        
        <div className="auth-buttons">
          {/* {!isLoggedIn ? ( */}
            <>
              <button className="btn btn-outline" >התחברות</button>
              <button className="btn btn-primary">הרשמה</button>
            </>
          {/* ) : ( */}
            <button className="btn btn-outline" >התנתקות</button>
          {/* )} */}
        </div>
      </header> 
       <Outlet/>










      
              </div> 






    )
}

export default AppLayout