import { Routes, Route } from 'react-router-dom'
import './App.css'
import Mode from './Staff'
import Home from './Home'
import AddSites from './AddSites'
import CreateAccount from './Signup'
import RemoveSites from './RemoveSites'
function App() {
 return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Staff" element={<Mode />} />
      <Route path="/Sites" element={<AddSites/>}/>
      <Route path="/Signup" element={<CreateAccount/>}/>
      <Route path="/Remove" element={<RemoveSites/>}/>
    </Routes>
  )
  

}

export default App
