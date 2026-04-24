import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
function RemoveSites(){
    const navigate=useNavigate()

    const moveBack=()=>{
        navigate('/AddorRemove')
    }

    const [sites, setSites] = useState([])
    const [removeSite, setRemoveSite] = useState("")
    const [site, setSite] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/blocked-sites")
            .then(res => res.json())
            .then(data => {
                setSites(data.blocked_sites || [])
            })
            .catch(err => console.error(err))
    }, [])


    const removeSiteHandler2 = async () => {
        if (!removeSite) {
            alert("Please enter a site name");
            return;
        }

        // check BEFORE deleting
        if (!sites.includes(removeSite)) {
            alert("Site not found in blocked list!");
            return;
        }

        // update UI
        const updatedSites = sites.filter(s => s !== removeSite);
        setSites(updatedSites);

        // backend call
        try {
            await fetch("http://localhost:5000/remove-site", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ site: removeSite })
            });

            alert("Deleted " + removeSite);
            setRemoveSite("");

        } catch (err) {
            console.error(err);
            alert("Error deleting site");
        }
    };

    const removeSiteHandler = async () => {
        if (!removeSite)
            {
                alert("Please enter a site name")
                return
            } 
        
        alert("Deleted " + removeSite)

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
        <div className="container">
            <div className="box">
                <h1 className='heading'>Add Sites to unblock</h1>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                    <input 
                            type='text'
                            value={removeSite}
                            placeholder=''
                            onChange={(e)=>setRemoveSite(e.target.value)}
                    />

                    <button onClick={removeSiteHandler2}
                        className='btn btn-purple'
                    >
                        Activate
                    </button>

                    

                    <button onClick={moveBack}
                        className='btn btn-red'
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}
export default RemoveSites