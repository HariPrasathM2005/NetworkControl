import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import bg from "./ControlPage.jpg"
import './Frontend.css';
function Staff()
{
    const navigate=useNavigate();
    const [status, setStatus] = useState("")
    const [sites, setSites]=useState([])
    
    const moveMode=()=>{
        navigate("/Mode")
    }


    const moveAddorRemove=()=>{
        navigate('/AddorRemove')
    }

    const moveDisplay=()=>{
        navigate("/Display")
    }

    const moveScheduling=()=>{
        navigate("/Schedule")
    }

    const moveEdit=()=>{
        navigate("/Edit")
    }

    const moveBack=()=>{
        navigate('/')
    }

    return(
        <div
        
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                
        <div className='Staffpage' 
            style={{ maxWidth: "450px", 
            width: "100%", 
            backgroundColor: "rgba(255, 255, 255, 0.95)", 
            borderRadius: "15px", 
            padding: "40px", 
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)" }}>
                
            <h2 style={{ color: '#6b46c1', fontWeight: 900, textAlign: "center", marginBottom: "35px", fontSize: "28px", letterSpacing: "0.5px" }}>
                    Teacher Control Panel
                </h2>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <button
                    onClick={moveMode}
                    className='btn btn-purple'
                    style={{ width: "100%", maxWidth: "260px" }}
                >
                    Select Mode 
                </button>

                <button onClick={moveAddorRemove}
                    className='btn btn-yellow'
                    style={{ width: "100%", maxWidth: "260px" }}
                >
                    Add/Remove Sites
                </button>

                <button onClick={moveScheduling}
                    className='btn btn-back'
                    style={{ width: "100%", maxWidth: "260px" }}
                >
                    Scheduling
                </button>

                <button onClick={moveDisplay}
                    className='btn btn-green'
                    style={{ width: "100%", maxWidth: "260px" }}
                >
                    Display
                </button>

                <button onClick={moveEdit}
                    className='btn btn-yellow'
                    style={{ width: "100%", maxWidth: "260px" }}
                >
                    Edit
                </button>
            
                <button onClick={moveBack}
                    className='btn btn-red'  
                    style={{ width: "100%", maxWidth: "260px" }} 
                >
                    Log Out
                </button>
            </div>

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