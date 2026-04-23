import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import './Frontend.css';
function EditPage()
{
    const [scheduleNumber, setScheduleNumber] = useState(null)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [mode, setMode] = useState("")
    const [scheduleList, setScheduleList] = useState([]);

    const navigate=useNavigate();

    /*useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("schedules")) || []
        setScheduleList(stored)
    }, []); */
    useEffect(() => {
        const loadData = () => {
            const stored = JSON.parse(localStorage.getItem("schedules")) || []
            setScheduleList(stored)
        }

        loadData()

        // optional: reload when window gains focus
        window.addEventListener("focus", loadData)

        return () => window.removeEventListener("focus", loadData)
    }, [])

    const editSchedule = (index) => {
        const item = scheduleList[index]
        setStartTime(item.startTime)
        setEndTime(item.endTime)
        setMode(item.mode)
        setScheduleNumber(index)
    }

    const addOrUpdateSchedule = () => {
        if (!startTime || !endTime || !mode) {
            alert("Please fill all fields")
            return
        }

        if (startTime >= endTime) {
            alert("Invalid time range")
            return
        }

        let updated = [...scheduleList]

        if (scheduleNumber !== null) {
            //  UPDATE
            if (scheduleNumber < 0 || scheduleNumber >= scheduleList.length) {
                alert("Invalid schedule number");
                return;
            }
            updated[scheduleNumber] = { startTime, endTime, mode }
            alert("Schedule updated")
        } else {
            //  ADD
            updated.push({ startTime, endTime, mode })
            alert("Schedule added")
        }

        setScheduleList(updated)
        localStorage.setItem("schedules", JSON.stringify(updated))

        // reset
        setStartTime("")
        setEndTime("")
        setMode("")
        setScheduleNumber(null)
    }

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
                        type="number"
                        placeholder="Schedule Number"
                        value={scheduleNumber}
                        onChange={(e) => setScheduleNumber(Number(e.target.value))}
                        style={{ width: "100%", marginBottom: "10px" }}
                    />

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


                    <ul className='contents'>
                        {scheduleList.map((item, index) => (
                            <li key={index}>
                                {item.startTime} - {item.endTime} → {item.mode}

                                <button onClick={() => editSchedule(index)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteSchedule(index)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button className='btn btn-back' onClick={addOrUpdateSchedule}>
                        Edit Schedule
                    </button>

                    <button className='btn btn-remove' onClick={moveBack}>
                        Back
                    </button>



                </div>
            </div>
        </div>

    )
}export default EditPage;