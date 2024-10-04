import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthoContext';
import apiReq from '../../lib/apiRequest';
import { format } from 'timeago.js'
import './chat.scss';
import { SocketContext } from '../../context/SocketContext';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNotificationStore } from '../../lib/notificationStore';

function Chat({ chats }) {
    const [chat, setChat] = useState(null)
    const { currentUser } = useContext(AuthContext)
    const { socket } = useContext(SocketContext)
    const messageEndRef = useRef()
    const decrease = useNotificationStore((state) => state.decrease);
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chat])


    const handleOpenChat = async (id, reciver) => {
        try {
            const res = await apiReq("/chats/" + id)
            // console.log("data cua res la: ", res.data);
            const data = { ...res.data, reciver }
            if (!res.data.seenBy.includes(currentUser.id)) {
                decrease();
            }
            setChat(data)
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const text = formData.get("text")
        if (!text) {
            return
        }
        try {
            const res = await apiReq.post("/messages/" + chat.id, { text })
            console.log("Dữ liệu khi gửi:", res.data);
            setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }))
            // console.log("data sau khi update them reciver send la", chat);
            e.target.reset()
            socket.emit("sendMessage", {
                reciverId: chat.reciver.id,
                data: res.data,
                username: currentUser.username
            })
            console.log("Dữ liệu gửi qua socket:", {
                reciverId: chat.reciver.id,
                data: res.data,
                username: currentUser.username
            }); // Ghi nhận dữ liệu gửi qua socket
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("Giá trị chat:", chat); // Kiểm tra giá trị chat
        console.log("Giá trị socket:", socket);
        const read = async () => {
            try {
                await apiReq.put("/chats/read/" + chat.id)
            } catch (error) {
                console.log(error);
            }
        }

        if (chat && socket) {
            socket.on("getMessage", (data) => {
                if (chat.id === data.chatId) {
                    setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }))
                    read()
                }
            })
        }
        return () => {
            socket.off("getMessage");
        };
    }, [socket, chat])

    // useEffect(() => {
    //     console.log("Giá trị chat:", chat); // Kiểm tra giá trị chat
    //     console.log("Giá trị socket:", socket);
    //     const read = async () => {
    //         try {
    //             await apiRequest.put("/chats/read/" + chat.id);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };

    //     if (chat && socket) {
    //         socket.on("getMessage", (data) => {
    //             if (chat.id === data.chatId) {
    //                 setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
    //                 read();
    //             }
    //         });
    //     }
    //     return () => {
    //         socket.off("getMessage");
    //     };
    // }, [socket, chat]);

    // console.log("Item is: ", chat);
    return (
        <div className='chat'>
            <div className="messages">
                <h1>Messages</h1>
                {chats?.map((chat) => (
                    <div className="message" key={chat.id}
                        onClick={() => handleOpenChat(chat.id, chat.reciver)}
                        style={{ backgroundColor: chat.seenBy.includes(currentUser.id) || chat?.id === chat.id ? "white" : "#fecd4f" }}>
                        <img src={chat.reciver.avatar || "https://yt3.googleusercontent.com/hOcnv8jJF9MbnZntB7vVtvt-hH8caaZq1_znxTZQOx_mp0Jt2Quoew7JddDHdrv_C7h3-tfuLg=s900-c-k-c0x00ffffff-no-rj"} alt="" />
                        <span>{chat.reciver.username}</span>
                        <p>
                            {chat.lastMessage}
                        </p>
                    </div>
                ))}
            </div>
            {chat &&
                (
                    <div className="chatBox">
                        <div className="top">
                            <div className="user">
                                <img src={chat.reciver.avatar || "https://yt3.googleusercontent.com/hOcnv8jJF9MbnZntB7vVtvt-hH8caaZq1_znxTZQOx_mp0Jt2Quoew7JddDHdrv_C7h3-tfuLg=s900-c-k-c0x00ffffff-no-rj"} alt="" />
                                {chat.reciver.username}
                            </div>
                            <span className='close' onClick={() => setChat(false)}>X</span>
                        </div>
                        <div className="center">
                            {chat.messages.map((message) => {
                                return (
                                    <div className="chatMessage"
                                        style={{
                                            alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                                            textAlign: message.userId === currentUser.id ? "right" : "left"
                                        }}

                                        key={message.id}>
                                        <p>{message.text}</p>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                )
                            })}
                            <div ref={messageEndRef}></div>
                        </div>
                        <form onSubmit={handleSubmit} className="bottom">
                            <textarea name="text" id="" cols="30" rows="10">

                            </textarea>
                            <button>Send</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
}

export default Chat;