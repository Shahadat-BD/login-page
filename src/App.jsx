import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Component/Header/Header'

function App() {


  return (
    <>
       <Header></Header>
       <Outlet></Outlet>
    </>
  )
}

export default App
