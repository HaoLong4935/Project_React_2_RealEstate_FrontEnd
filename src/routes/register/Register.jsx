import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import apiReq from "../../lib/apiRequest";

function Register() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        console.log({ username, email, password });

        try {
            const res = await apiReq.post("/auth/register", { username, email, password })
            if (res) {
                console.log(res.data);
                toast.success("Create user success, please login")
                setTimeout(() => navigate("/login"), 1500);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }

    }


    return (
        <>
            <div className="register">
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <h1>Create an Account</h1>
                        <input name="username" type="text" placeholder="Username" />
                        <input name="email" type="text" placeholder="Email" />
                        <input name="password" type="password" placeholder="Password" />
                        <button >Register</button>
                        <Link to="/login">Do you have an account?</Link>
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

export default Register;