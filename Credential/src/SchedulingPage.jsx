import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import bg from "./ControlPage.jpg"
import './Frontend.css';
function SchedulingPage()
{
    const navigate=useNavigate();

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [mode, setMode] = useState("")
    const [scheduleList, setScheduleList] = useState([])



    const addSchedule = async () => {
        if (!startTime || !endTime || !mode) {
            alert("Please fill all fields")
            return
        }

        try {
            const response = await fetch("http://localhost:5000/set-schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mode:mode,
                    startTime:startTime,
                    endTime:endTime
                })
            })

            if (!response.ok) {
                throw new Error("Server error")
            }

            const data = await response.json()

            // Show backend response
            alert(data.message || data.error)

            // Store locally (UI)
            const newSchedule = { startTime, endTime, mode }
            setScheduleList([...scheduleList, newSchedule])

            // Clear inputs
            setStartTime("")
            setEndTime("")
            setMode("")

            } catch (error) {
                alert("Backend not reachable")
                console.error(error)
            }
    }

    const moveBack=()=>{
        navigate("/Staff")
    }
    return(
        <div
            style={{
                minHeight: "20vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5"
            }}>
            <div style={{
                width: "500px",
                height: "400px",
                padding: "5px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>

                <h1 className="heading">Scheduling</h1>

                {/* Time Inputs */}
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                />

                {/* Mode Selection */}
                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                >
                    <option value="">Select Mode</option>
                    <option value="study">Study Mode</option>
                    <option value="entertainment">Entertainment Mode</option>
                    <option value="exam">Exam Mode</option>
                </select>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
                <button onClick={addSchedule}
                    className="btn btn-purple"
                    style={{ width: "100%", maxWidth: "260px" }}>
                    Add Schedule
                </button>

                {/* Display Schedules */}
                <ul>
                    {scheduleList.map((item, index) => (
                        <li key={index}>
                            {item.startTime} - {item.endTime} → {item.mode}
                        </li>
                    ))}
                </ul>

                <button onClick={moveBack}
                    className="btn btn-red"
                    style={{ width: "100%", maxWidth: "260px" }}>
                    
                    Back
                </button>
                </div>

            </div>
        </div>
    )
}
export default SchedulingPage; 