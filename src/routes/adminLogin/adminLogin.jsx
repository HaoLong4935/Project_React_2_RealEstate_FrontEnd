import './adminLogin.scss';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import apiReq from "../../lib/apiRequest";
import { useContext } from "react";
import { AdminContext } from '../../context/AdminContext';
function AdminLogin() {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { updateAdmin } = useContext(AdminContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData(e.target)
        const username = formData.get("username");
        const password = formData.get("password");
        console.log({ username, password });

        try {
            const res = await apiReq.post("/auth/admin/login", { username, password })
            console.log("Res obj", res);
            if (res.data) {
                toast.success("Login success")
                console.log("Login success with the DATA:", res.data.data)
                updateAdmin(res.data)
                setTimeout(() => navigate("/adminDB"), 1500);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className="login">
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <h1>Welcome back, Administrator</h1>
                        <input name="username" type="text" placeholder="Username" />
                        <input name="password" type="password" placeholder="Password" />
                        <button disabled={isLoading}>Login</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default AdminLogin;