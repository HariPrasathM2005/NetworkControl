import { useState,useEffect} from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("student")
  const [message, setMessage] = useState("")


  const handleLogin = async () => {
  const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        role
      })
    })

    const data = await response.json()
    alert(`${data.message} (${data.role})`)
  }
  


  const setMode = async (mode) => {
    const response = await fetch("http://127.0.0.1:5000/set-mode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mode })
    })

    const data = await response.json()
    setMessage(data.message)
  }

  return (
      <div style={{ width: "300px", margin: "100px auto", textAlign: "center" }}>
      <h2>Credential</h2>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      <button
        onClick={handleLogin}
        style={{ width: "100%", padding: "10px" }}
      >
        Login
      </button>

      <h2>Teacher Control Panel</h2>

      <button
        onClick={() => setMode("study")}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        Study Mode (Block Sites)
      </button>

      <button
        onClick={() => setMode("entertainment")}
        style={{ width: "100%", padding: "10px" }}
      >
        Entertainment Mode (Unblock Sites)
      </button>
    </div>
    
  )
}

export default App
