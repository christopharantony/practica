import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../../axiosInstance';
import './AdminLogin.css'

function AdminLogin() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        email:"",
        password:"",
    });

    const generateError = (error) => 
    toast.error(error,{
        position: "bottom-right"
    })

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post("api/admin/login", {
                ...values
            },{
                withCredentials:true
            });
            if (data){
                if (data.errors) {
                    generateError("Invalid Email or Password")
                } else {
                    console.log(data);
                    navigate("/");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="adminLogin">
        <div className='Admin-container'>
            <h2 className='AdminLogin-heading'>Admin Login</h2>
            <form className='AdminLogin-form' onSubmit={handleSubmit} >
                <div className='AdminLogin-div'>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    placeholder='Email' 
                    className='AdminLogin-input'
                    onChange={(e)=>{
                        setValues({...values,[e.target.name]:e.target.value})
                    }}
                    />
                </div>
                <div className='AdminLogin-div'>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Password' 
                    className='AdminLogin-input'
                    onChange={(e)=>{
                        setValues({...values,[e.target.name]:e.target.value})
                    }}
                    />
                </div>
                <button className='AdminLogin-Button' type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>
        </div>
    )
}

export default AdminLogin

