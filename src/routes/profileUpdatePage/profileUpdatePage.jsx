import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthoContext';
import apiReq from '../../lib/apiRequest';
import toast, { Toaster } from 'react-hot-toast';
import './profileUpdatePage.scss';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/uploadWidget/UploadWidget';

function ProfileUpdatePage() {
    const { currentUser, updateUser } = useContext(AuthContext)
    const [error, setError] = useState("")
    const [avatar, setAvatar] = useState([])
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)

        const { username, email, password } = Object.fromEntries(formData)

        try {
            const res = await apiReq.put(`/users/${currentUser.id}`, {
                username,
                email,
                password,
                avatar: avatar[0]
            });
            console.log(res.data);
            updateUser(res.data)
            toast("✔️ Update user successfully")
            navigate("/")
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
            toast(`❌ ${error}`)
        }
    }
    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={currentUser.username}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={currentUser.email}

                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <button>Update</button>
                </form>
            </div>
            <div className="sideContainer">
                <img src={avatar[0] || currentUser.avatar || "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"} alt="" className="avatar" />
                <UploadWidget uwConfig={{
                    cloudName: "dshsuinsb",
                    uploadPreset: "estate",
                    multiple: false,
                    maxImageFileSize: 2000000,
                    folders: "avatars"
                }} setState={setAvatar} />
            </div>
            <Toaster />
        </div>
    );
}

export default ProfileUpdatePage;