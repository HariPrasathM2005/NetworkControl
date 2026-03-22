import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
function Signup()
{
    const navigate = useNavigate()
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [staff,setStaff]=useState([])

    const handleSignup = () => {
            if (!name) return
            const Staff={
            name,
            password
            };
            //JSON.parse - change from JSON format to our structure format
            const ExistingStaff=JSON.parse(localStorage.getItem("staff"))||[];

            ExistingStaff.push(Staff);

            //JSON.stringify - change JavaScript value to JSON format
            localStorage.setItem("staff",JSON.stringify(ExistingStaff));
            setStudent(ExistingStaff);

            setName('');
            setPassword('');
    }

    const moveBack=()=>{
        navigate('/')
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
        <div className='SignupPage'>
            <p style={{ width: "300px", margin: "10px auto", textAlign: "center",color:"purple",
                        fontWeight: 900
            }}
                >Create Account</p>
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
                onClick={handleSignup}
                style={{ width: "100%", padding: "10px",marginTop:"20px"}}
            >
                Create
            </button>
            <button
                onClick={moveBack}
                style={{ width: "100%", padding: "10px",marginTop:"20px"}}
            >
                Back
            </button>
        </div>
        </div>
    )
}
export default Signup;