import './singlePage.scss';
import Slider from '../../components/slider/Slider.jsx'
import Map from '../../components/map/Map.jsx'
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthoContext';
import apiReq from '../../lib/apiRequest';
import { useState } from 'react';


function SinglePage() {
    const post = useLoaderData()
    const [isSave, setIsSave] = useState(post.isSaved)
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleSave = async () => {
        if (!currentUser) navigate("/login")
        setIsSave((prev) => !prev)
        try {
            await apiReq.post("/users/save", { postId: post.id })
        } catch (error) {
            console.log(error);
            setIsSave((prev) => !prev) //Nếu bị lỗi thì phải trả trạng thái về như ban đầu (Phủ định + Phủ định => Khẳng định)
        }
    }

    function formatCurrency(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function removeHtmlTags(html) {
        return html.replace(/<\/?[^>]+>/gi, '');
    }
    const cleanDesc = removeHtmlTags(post.postDetails.desc);
    return (
        <div className='singlePage'>
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="" />
                                    <span>{post.address}</span>
                                </div>
                                <div className="price">$ {formatCurrency(post.price)} Vnd</div>
                            </div>
                            <div className="user">
                                <img src={post.user.avatar} alt="" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        <div className="bottom">
                            {/* {post.postDetails.desc} */}
                            {cleanDesc}
                        </div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <div className="title">
                        General
                    </div>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="/utility.png" alt="" />
                            <span>Utilities</span>
                            {
                                post.postDetails.utilities === "owner" ?
                                    (
                                        <p>Owner is responsible</p>
                                    ) :
                                    (
                                        <p>Tenant is responsible</p>
                                    )
                            }
                        </div>

                        <div className="feature">
                            <img src="/pet.png" alt="" />
                            <span>Pet policy</span>
                            {
                                post.postDetails.pet === "allowed" ?
                                    (
                                        <p>Pet is allowed</p>
                                    ) :
                                    (
                                        <p>Pet is not allowed</p>
                                    )
                            }
                        </div>

                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <span>Income Policy</span>
                            <p>{post.postDetails.income}</p>
                        </div>
                    </div>

                    <p className="title">
                        Sizes
                    </p>
                    <div className="sizes">
                        <div className="size">
                            <img src="/size.png" alt="" />
                            <span>{post.postDetails.size} sqft</span>
                        </div>

                        <div className="size">
                            <img src="/bed.png" alt="" />
                            <span>{post.bedroom} beds</span>
                        </div>

                        <div className="size">
                            <img src="/bath.png" alt="" />
                            <span>{post.bathroom} bathroom</span>
                        </div>
                    </div>
                    <div className="title">
                        Nearby places
                    </div>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="/school.png" alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>{post.postDetails.school > 999 ? post.postDetails.school / 1000 + "km" : post.postDetails.school + "m"} away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>{post.postDetails.bus > 999 ? post.postDetails.bus / 1000 + "km" : post.postDetails.bus + "m"} away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>{post.postDetails.restaurant > 999 ? post.postDetails.restaurant / 1000 + "km" : post.postDetails.restaurant + "m"} away</p>
                            </div>
                        </div>
                    </div>
                    <div className="title">
                        Location
                    </div>
                    <div className="mapContainer">
                        <Map items={[post]} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src="/chat.png" alt="" />
                            Send a Message
                        </button>
                        <button onClick={handleSave}
                            style={{ backgroundColor: isSave ? "#fece51" : 'white' }}
                        >
                            <img src="/save.png" alt="" />
                            {isSave === true ? "Location saved" : "Save to list"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePage;