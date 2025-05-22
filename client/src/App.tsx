

import { RouterProvider } from 'react-router'
import './App.css'

// import router from './app/routes/router2'
import router2 from "./app/router2"
import { Provider } from 'react-redux'
import store from './stores/Store'
import { CookiesProvider } from 'react-cookie'
// import { Provider } from 'react-redux'
// import store from './stores/Store'
function App() {


  return (
    <>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router2} />
      </Provider>
</CookiesProvider>

    </>
  )
}

export default App
