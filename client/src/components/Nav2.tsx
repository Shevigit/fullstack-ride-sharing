// import {  NavLink } from 'react-router'
const Nav = () => {

    //  console.log("shevi");
      
      return (
          <div>
          
              
          <nav style={{ display: "flex", position: "fixed", top: "0px", right: "0px", left: "0px", width: "100vw", backgroundColor: "gray", justifyContent: "space-around" }}>
          
  {/*              
                  <div>
                      <NavLink to='/loginForm/passwordGmail' style={({ isActive }) => ({ color: isActive ? "red" : "green" })}>passwordGmail</NavLink>
                  </div> */}
                  {/* <div>
                      <NavLink to='/loginForm/passwordGmail' style={({ isActive }) => ({ color: isActive ? "red" : "green" })}>UserAndPassword</NavLink>
                  </div> */}
              </nav>
          </div>
      )
  }
  
  export default Nav