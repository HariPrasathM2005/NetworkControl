import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'

function ModesPage()
{
    const navigate=useNavigate();
    const [status, setStatus] = useState("")
    const [sites, setSites]=useState([])

    const moveBack=()=>{
        navigate("/Staff")
    }

    const setMode = async (mode) => {
        try {
            const response = await fetch("http://localhost:5000/set-mode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mode })
            })

            const data = await response.json()
            setStatus(data.message|| data.error)
            setSites(data.blocked_sites||[])

        } catch (error) {
            setStatus("Backend not reachable")
            console.error(error)
        }
    }
    return(
        <div>
            <h2 style={{color:'purple',fontWeight:1000}}>Mode Selection</h2>
            <button
                onClick={() => setMode("study")}
                style={{ width: "100%", position:'center', padding: "10px", marginBottom: "10px"}}
            >
                Study Mode
            </button>

            <button
                onClick={() => setMode("entertainment")}
                style={{ width: "100%", padding: "10px", marginBottom: "10px"}}
            >
                Exam Mode
            </button>

            <button
                onClick={() => setMode("entertainment")}
                style={{ width: "100%", padding: "10px", marginBottom: "10px"}}
            >
                Entertainment Mode (Unblock Sites)
            </button>

            

            <button onClick={moveBack}>Back</button>
        </div>

    )
}
export default ModesPage;