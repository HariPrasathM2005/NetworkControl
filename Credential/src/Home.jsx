import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import './Frontend.css';
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

    const moveSignup=()=>{
        navigate('/Signup')
    }
   
    return(
        <div className='container'>
            <div className='box'>
                <h1 className="heading">Enter Username and Password</h1>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <input
                        type='text'
                        placeholder='Username'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        style={{ width: "95%", padding: "10px",marginBottom:"5px"}}
                    />
                    <br></br>
                    <input
                        type='text'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        style={{ width: "95%", padding: "10px",marginBottom:"5px"}}
                    />
                    
                    <button
                        onClick={handleSubmit}
                        className='btn btn-purple'
                        style={{ width: "100%", maxWidth: "260px"}}
                    >
                        Login
                    </button>        
                    <button
                        onClick={moveSignup}
                        className='btn btn-yellow'
                        style={{ width: "100%", maxWidth: "260px"}}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
        
    )
}
export default Home