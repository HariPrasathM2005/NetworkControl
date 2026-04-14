import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
function DisplayPage()
{
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
        <div>
            <p>Display Page</p>
            <ul>
            {sites.length === 0 && <li>No sites blocked</li>}

            {sites.map(site => (
                <li key={site}>{site}</li>
            ))}
            </ul>
            <button onClick={moveBack}
                    style={{width:"100%",padding:"10px",marginBottom:"10px"}}
            >
                Back
            </button>

            
        </div>
    )
}
export default DisplayPage;