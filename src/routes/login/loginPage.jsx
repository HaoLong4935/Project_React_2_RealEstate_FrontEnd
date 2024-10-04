import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import apiReq from "../../lib/apiRequest";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthoContext";

function Login() {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { updateUser } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData(e.target)
        const username = formData.get("username");
        const password = formData.get("password");
        console.log({ username, password });

        try {
            const res = await apiReq.post("/auth/login", { username, password })
            console.log("Res obj", res);
            if (res.data) {
                toast.success("Login success")
                console.log("Login success with the DATA:", res.data.data)
                updateUser(res.data)

                setTimeout(() => navigate("/"), 1500);
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
                        <h1>Welcome back</h1>
                        <input name="username" type="text" placeholder="Username" />
                        <input name="password" type="password" placeholder="Password" />
                        <button disabled={isLoading}>Login</button>
                        <Link to="/register">{"Don't"} you have an account?</Link>
                    </form>
                </div>
                <div className="imgContainer">
                    <img src="/bg.png" alt="" />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;