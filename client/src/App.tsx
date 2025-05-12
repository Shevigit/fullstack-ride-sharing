

import { RouterProvider } from 'react-router'
import './App.css'

// import router from './app/routes/router2'
import router2 from "./app/router2"
import { Provider } from 'react-redux'
import store from './stores/Store'
// import { Provider } from 'react-redux'
// import store from './stores/Store'
function App() {


  return (
    <>
       <Provider store={store}>
// <RouterProvider router={router2}/>
   </Provider>
{/* <RouterProvider router={router}/> */}

    </>
  )
}

export default App
