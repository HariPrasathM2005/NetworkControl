import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import './Frontend.css';
function EditPage()
{
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [mode, setMode] = useState("")
    const [scheduleList, setScheduleList] = useState([]);

    const navigate=useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("schedules")) || []
        setScheduleList(stored)
    }, [])

    const deleteSchedule = (index) => {
        const updated = scheduleList.filter((_, i) => i !== index)
        setScheduleList(updated)
        localStorage.setItem("schedules", JSON.stringify(updated))
    }

    const moveBack=()=>{
        navigate('/Staff')
    }
    return(
        <div className='container'>
            <div className='box'>
                <h1 className='heading'>Edit Schedule</h1>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                    
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

                    <ul className="contents">
                        {scheduleList.map((item, index) => (
                            <li key={index}>
                                {item.startTime} - {item.endTime} → {item.mode}
                            </li>
                        ))}
                    </ul>

                    <button className='btn btn-remove' onClick={moveBack}>
                        Back
                    </button>
                </div>
            </div>
        </div>

    )
}export default EditPage;