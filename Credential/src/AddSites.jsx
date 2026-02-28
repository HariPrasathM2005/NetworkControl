import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
function AddSites(){
    const navigate=useNavigate()

    const moveStaff=()=>{
        navigate('/Staff')
    }

    const [site, setSite] = useState("")
    const [sites, setSites] = useState([])

    const addSite = () => {
        if (!site) return
        setSites([...sites, site])
        setSite("")
    }
  

    const sendToBackend = async () => {
        await fetch("http://localhost:5000/add-sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sites })   // 👈 JSON
        })
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
        <div
            style={{
                backgroundColor: "#81868b5e",   // 👈 page background
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
        <div className='Homepage'>
            <p>Add Sites to block/unblock</p>
            <input 
                    type='text'
                    value={site}
                    placeholder=''
                    onChange={(e)=>setSite(e.target.value)}
            />

            <button onClick={addSite}
                    style={{width:"100%",padding:"10px",marginBottom:"10px"}}
            >
                Add Site
            </button>

            <button onClick={sendToBackend}
                    style={{width:"100%",padding:"10px",marginBottom:"10px"}}
            >
                Activate
            </button>

            <button onClick={moveStaff}
                    style={{width:"100%",padding:"10px"}}
            >
                Back
            </button>

            <ul>
            {sites.length === 0 && <li>No sites blocked</li>}

            {sites.map(site => (
                <li key={site}>{site}</li>
            ))}
            </ul>
        </div>
        </div>
    )
}
export default AddSites