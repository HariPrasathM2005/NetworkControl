import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import './Frontend.css';

function ModesPage()
{
    const navigate=useNavigate();
    const [status, setStatus] = useState("")
    const [sites, setSites]=useState([])
    const [scheduleEnabled, setScheduleEnabled] = useState(false)

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("scheduleEnabled")) || false

        setScheduleEnabled(stored)

        // sync with backend
        fetch("http://localhost:5000/enable-schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ enabled: stored })
        })
    }, [])

    const toggleSchedule = async () => {
        const newValue = !scheduleEnabled

        setScheduleEnabled(newValue)

        // store in localStorage
        localStorage.setItem("scheduleEnabled", JSON.stringify(newValue))

        // send to backend
        await fetch("http://localhost:5000/enable-schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ enabled: newValue })
        })
    }
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

            localStorage.setItem("mode", mode);

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
                        onClick={() => {
                            setMode("study");
                            alert("Study Mode Activated");
                        }}
                        className="btn btn-back"
                    >
                        Study Mode
                    </button>

                    <button
                        onClick={() => {
                            setMode("exam");
                            alert("Exam Mode Activated");
                        }}
                        className="btn btn-purple"
                    >
                        Exam Mode
                    </button>

                    <button
                        onClick={() => {
                            setMode("entertainment");
                            alert("Entertainment Mode Activated");
                        }}
                        className="btn btn-yellow"
                    >
                        Entertainment Mode (Unblock Sites)
                    </button>

                    <button
                        onClick={toggleSchedule}
                        className="btn btn-green"
                    >
                        {scheduleEnabled ? "Disable Schedule" : "Enable Schedule"}
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