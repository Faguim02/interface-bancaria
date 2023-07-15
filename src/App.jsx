import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Deposit from './pages/Deposit'
import Transf from './pages/Transf'


function App() {

  return (
    <BrowserRouter>

      <Header/>

      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dep' element={<Deposit/>}/>
        <Route path='/transf' element={<Transf/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
