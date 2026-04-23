import { useNavigate } from 'react-router-dom'
import './Frontend.css';


function AddorRemovePage()
{
    const navigate=useNavigate();
    const moveAdd=()=>{
        navigate('/Sites')
    }
    const moveRemove=()=>{
        navigate('/Remove')
    }
    const moveBack=()=>{
        navigate('/Staff')
    }
    return(
        <div className="container">
            <div className="box">
                <h1 className="heading">Add/Block Sites</h1>
                <div className="button-group">
                    <button className="btn btn-add" onClick={moveAdd}>
                        Add Sites
                    </button>
                    <button className="btn btn-back" onClick={moveRemove}>
                        Remove Sites
                    </button>
                    <button className="btn btn-remove" onClick={moveBack}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AddorRemovePage;