import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
    const [currentAdmin, setAdminRole] = useState(
        JSON.parse(localStorage.getItem("admin")) || null
    )
    const updateAdmin = (data) => {
        setAdminRole(data)
    }

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(currentAdmin))
    }, [currentAdmin])

    return (
        <AdminContext.Provider value={{ currentAdmin, updateAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}