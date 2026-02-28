import { Routes, Route } from 'react-router-dom'
import './App.css'
import Mode from './Staff'
import Home from './Home'
import AddSites from './AddSites'
function App() {
 return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Staff" element={<Mode />} />
      <Route path="/Sites" element={<AddSites/>}/>
    </Routes>
  )
  

}

export default App
