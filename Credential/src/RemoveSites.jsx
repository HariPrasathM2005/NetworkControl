import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
function RemoveSites(){
    const navigate=useNavigate()

    const moveStaff=()=>{
        navigate('/Staff')
    }

    const [sites, setSites] = useState([])
    const [removeSite, setRemoveSite] = useState("")

    useEffect(() => {
        fetch("http://localhost:5000/blocked-sites")
            .then(res => res.json())
            .then(data => {
                setSites(data.blocked_sites || [])
            })
            .catch(err => console.error(err))
    }, [])

    const removeSiteHandler = async () => {
        if (!removeSite) return

        const updatedSites = sites.filter(s => s !== removeSite)
        setSites(updatedSites)

        // OPTIONAL: backend call (recommended)
        await fetch("http://localhost:5000/remove-site", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ site: removeSite })
        })

        setRemoveSite("")
    }

    return(
        <div
            style={{
                backgroundColor: "#81868b5e",   
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
        <div className='Homepage'>
            <p>Add Sites to unblock</p>
            <input 
                    type='text'
                    value={removeSite}
                    placeholder=''
                    onChange={(e)=>setRemoveSite(e.target.value)}
            />

            <button onClick={removeSiteHandler}
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
                {sites.length === 0 && <li>Sites Blocked</li>}

                {sites.map(site => (
                    <li key={site}>{site}</li>
                ))}
            </ul>

        </div>
        </div>
    )
}
export default RemoveSites