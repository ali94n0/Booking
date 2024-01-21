import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";


function LoginPage(props) {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const {login,user,isAuth}=useAuth()
    const navigate = useNavigate()

    const handleLogin=(e)=>{
        e.preventDefault()
        if(!email || !password )return toast.error("email & password required")
        login(email,password);
        
    }
    useEffect(()=>{
        if(isAuth){
            toast.success(`welcome,${user.name}`)
            navigate("/",{replace:true})
        }
        
    },[isAuth])
    return (
        <div>
            <div className="loginContainer">
                <h2>Login Form</h2>
                <form className="form" onSubmit={handleLogin}>
                    <div className="formControl">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="formControl">
                        <label htmlFor="password">Password:</label>
                        <input type="text" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn--primary" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;