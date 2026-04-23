import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import './Frontend.css';
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
        <div className='container'>
            <div className='box'>
                <h1 className="heading"> Create Account </h1>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <input
                        type='text'
                        placeholder='Username'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        style={{ width: "95%", padding: "10px",marginBottom:"5px"}}
                    />
                    
                    <input
                        type='text'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        style={{ width: "95%", padding: "10px",marginBottom:"5px"}}
                    />


                    <button
                        onClick={handleSignup}
                        className='btn btn-purple'
                    >
                        Create
                    </button>
                    
                    <button
                        onClick={moveBack}
                        className='btn btn-red'
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Signup;