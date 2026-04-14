import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
function DisplayPage()
{
    const navigate=useNavigate();
    const moveBack=()=>{
        navigate("/Staff")
    }
    return(
        <div>
            <button onClick={moveBack}
                    style={{width:"100%",padding:"10px",marginBottom:"10px"}}
            >
                Back
            </button>
        </div>
    )
}
export default DisplayPage; 