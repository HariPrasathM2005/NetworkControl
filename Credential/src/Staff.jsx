import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import bg from "./ControlPage.jpg"
function Staff()
{
    const navigate=useNavigate();
    const [status, setStatus] = useState("")
    const [sites, setSites]=useState([])
    const moveBack=()=>{
        navigate('/')
    }
    const moveAdd=()=>{
        navigate('/Sites')
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
        <div
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",   // 👈 page background
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            >
        <div className='Staffpage'>
            <h2 style={{color:'purple',fontWeight:1000}}>Teacher Control Panel</h2>

            <button
                onClick={() => setMode("study")}
                style={{ width: "100%", position:'center', padding: "10px", marginBottom: "10px"}}
            >
                Study Mode (Block Sites)
            </button>

            <button
                onClick={() => setMode("entertainment")}
                style={{ width: "100%", padding: "10px", marginBottom: "10px"}}
            >
                Entertainment Mode (Unblock Sites)
            </button>

            <button onClick={moveAdd}
                    style={{width: "100%", padding: "10px",marginBottom:"10px"}}
            >
                Add Sites to block
            </button>

            <button onClick={moveBack}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px"}}   
            >
                    Back
            </button>



            {status && (
                <p style={{ marginTop: "20px", fontWeight: "bold" }}>
                    {status}
                </p>
                
            )}
            <ul>
                {sites.map(site => (
                    <li key={site}>{site}</li>
                ))}
            </ul>
        </div>
        </div>
    )
}
export default Staff