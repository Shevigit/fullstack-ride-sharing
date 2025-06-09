

import { RouterProvider } from 'react-router'
import './App.css'

import router2 from "./app/router2"
import { Provider } from 'react-redux'
import store from './stores/Store'
import { CookiesProvider } from 'react-cookie'

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
