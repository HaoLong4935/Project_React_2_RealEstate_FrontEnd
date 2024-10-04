import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client"
import { AuthContext } from "./AuthoContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        setSocket(io("http://localhost:4000"))
    }, [])

    useEffect(() => {
        currentUser && socket?.emit("newUser", currentUser.id)
    }, [currentUser, socket])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}