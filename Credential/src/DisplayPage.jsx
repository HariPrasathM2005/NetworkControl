import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import './Frontend.css';

function DisplayPage()
{
    const mode = localStorage.getItem("mode");
    const navigate=useNavigate();
    const [sites, setSites] = useState([])
    const moveBack=()=>{
        navigate("/Staff")
    }


    useEffect(() => {
        fetch("http://localhost:5000/blocked-sites")
            .then(res => res.json())
            .then(data => {
            setSites(data.blocked_sites || [])
            })
            .catch(err => console.error(err))
    }, [])
           
    return(
        <div className="container">
            <div className="box">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <h1 className="heading">Display Page</h1>
                    <ul className="contents">
                    {sites.length === 0 && mode!=="exam" && <li>No sites blocked</li>}
                    {mode === "exam" && <li>All sites are blocked</li>}

                    {mode!=="exam" && sites.map(site => (
                        <li key={site}>{site}</li>
                    ))}
                    </ul>
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
export default DisplayPage;