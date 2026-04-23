import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import './Frontend.css';
function AddSites(){
    const navigate=useNavigate()

    const moveBack=()=>{
        navigate('/AddorRemove')
    }

    const [site, setSite] = useState("")
    const [sites, setSites] = useState([])

    /*const addSite = () => {
        if (!site) return
        setSites([...sites, site])
        setSite("")
    }
  

    const sendToBackend = async () => {
        await fetch("http://localhost:5000/add-sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sites })   
        })
    }*/
   const addSite = async () => {
        if (!site) return;

        const updatedSites = [...sites, site];  // create new array
        setSites(updatedSites);                 // update state
        setSite("");

        // send to backend
        await fetch("http://localhost:5000/add-sites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sites: updatedSites })
        });
    };


    
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
                <h1 className='heading'>Add Sites to Block</h1>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

                    <input 
                        type='text'
                        value={site}
                        placeholder=''
                        onChange={(e)=>setSite(e.target.value)}
                    />

                    <button onClick={addSite}
                        className='btn btn-purple'
                    >
                        Add Site
                    </button>

                    {/* <button onClick={sendToBackend}
                            className='btn btn-yellow'
                    >
                        Activate
                    </button>
 */}

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
export default AddSites