import { Suspense, useContext } from 'react';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import apiReq from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthoContext.jsx';
import './profilePage.scss';

function ProfilePage() {
    const data = useLoaderData()
    const navigate = useNavigate()
    const { updateUser, currentUser } = useContext(AuthContext)
    const handleLogout = async () => {
        try {
            await apiReq.post("/auth/logout")
            updateUser(null)
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate("/login")
    //     }
    // }, [currentUser])
    return (
        <div className='profilePage'>
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Informations</h1>
                        <Link to="/profile/update"><button>Update Profile</button></Link>
                    </div>
                    <div className="info">
                        <span>Avatar :<img src={currentUser.avatar || "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"} alt="" /></span>
                        <span>Username: <b> {currentUser.username}</b></span>
                        <span>Email: <b> {currentUser.email}</b></span>
                        <button onClick={() => handleLogout()}>
                            Logout
                        </button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <Link to="/add">
                            <button>Create new post</button>
                        </Link>
                    </div>
                    <Suspense fallback={<p>Loading, please wait....</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Oops, something went wrong loading the location</p>}
                        >
                            {
                                (postResponse) => {
                                    {
                                        return (
                                            <List posts={postResponse.data.userPosts} />
                                        )
                                    }
                                }
                            }
                        </Await>
                    </Suspense>
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <Suspense fallback={<p>Loading, please wait....</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Oops, something went wrong loading the location</p>}
                        >
                            {
                                (postResponse) => {
                                    {
                                        return (
                                            <List posts={postResponse.data.savePosts} />
                                        )
                                    }
                                }
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Suspense fallback={<p>Loading,...</p>}>
                        <Await
                            resolve={data.chatResponse}
                            errorElement={<p>Oops, something went wrong loading the chat</p>}
                        >
                            {
                                (chatResponse) => {
                                    {
                                        return (
                                            <Chat chats={chatResponse.data} />
                                        )
                                    }
                                }
                            }
                        </Await>
                    </Suspense>

                </div>
            </div>

        </div>
    );
}

export default ProfilePage;