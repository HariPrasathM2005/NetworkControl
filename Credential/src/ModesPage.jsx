import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Frontend.css';

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
        <div className="container">
            <div className="box">
                <h1 className='heading'>Mode Selection</h1>
                <div className="button-group">
                    <button
                        onClick={() => setMode("study")}
                        className="btn btn-back"
                    >
                        Study Mode
                    </button>

                    <button
                        onClick={() => setMode("entertainment")}
                        className="btn btn-purple"
                    >
                        Exam Mode
                    </button>

                    <button
                        onClick={() => setMode("entertainment")}
                        className="btn btn-yellow"
                    >
                        Entertainment Mode (Unblock Sites)
                    </button>

                    <button onClick={moveBack}
                        className="btn btn-red"
                    >
                            Back
                    </button>
                </div>
            </div>
        </div>

    )
}
export default ModesPage;