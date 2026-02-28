import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
function Home(){
    const navigate = useNavigate()

    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [staff,setStaff]=useState([])



    const handleSubmit = () => {
        if (!name || !password) return 

        // check if staff exists
        const exists = staff.find(
        s => s.name === name && s.password === password
        )

        if (exists) {
        navigate("/Staff")   
        } else {
        alert("Invalid credentials")
        }
    }
    useEffect(()=>{
        const List=JSON.parse(localStorage.getItem("staff"))||[];
        setStaff(List);
    },[]);


   
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
            <p style={{ width: "300px", margin: "10px auto", textAlign: "center",color:"purple",
                        fontWeight: 900
            }}
                >Enter UserName and Password</p>
            <input
                type='text'
                placeholder='Username'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                style={{ width: "95%", padding: "10px",marginBottom:"20px"}}
            />
            <br></br>
            <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                style={{ width: "95%", padding: "10px",marginBotton:"20px"}}
            />


            <button
                onClick={handleSubmit}
                style={{ width: "100%", padding: "10px",marginTop:"20px"}}
            >
                Login
            </button>        
            <button
                style={{ width: "100%", padding: "10px",marginTop:"20px"}}
            >
                Sign Up
            </button>
        </div>
        </div>
    )
}
export default Home