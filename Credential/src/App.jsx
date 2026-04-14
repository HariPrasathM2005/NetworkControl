import { Routes, Route } from 'react-router-dom'
import './App.css'
import Mode from './Staff'
import Home from './Home'
import AddSites from './AddSites'
import CreateAccount from './Signup'
import RemoveSites from './RemoveSites'
import ModesPage from './ModesPage'
import AddorRemovePage from './AddorRemovePage'
import DisplayPage from './DisplayPage'
import SchedulingPage from './SchedulingPage'
function App() {
 return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Staff" element={<Mode />} />
      <Route path="/Sites" element={<AddSites/>}/>
      <Route path="/Signup" element={<CreateAccount/>}/>
      <Route path="/Remove" element={<RemoveSites/>}/>
      <Route path="/Mode" element={<ModesPage/>}/>
      <Route path="/AddorRemove" element={<AddorRemovePage/>}/>
      <Route path="/Display" element={<DisplayPage/>}/>
      <Route path="/Schedule" element={<SchedulingPage/>}/>
    </Routes>
  )
}

export default App
