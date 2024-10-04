import { createContext, useEffect, useState } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setPublicId, setState }) {
    const [loaded, setLoaded] = useState(false);
    const [widgetInstance, setWidgetInstance] = useState(null);

    useEffect(() => {
        // Check if the script is already loaded
        if (!loaded) {
            const uwScript = document.getElementById("uw");
            if (!uwScript) {
                const script = document.createElement("script");
                script.setAttribute("async", "");
                script.setAttribute("id", "uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load", () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                setLoaded(true);
            }
        }
    }, [loaded]);

    useEffect(() => {
        if (loaded && !widgetInstance) {
            const myWidget = window.cloudinary.createUploadWidget(
                uwConfig,
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log("Done! Here is the image info: ", result.info);
                        setState(prev => [...prev, result.info.secure_url])
                    }
                }
            );
            setWidgetInstance(myWidget); // Lưu lại instance của widget
        }
    }, [loaded, widgetInstance, uwConfig, setPublicId, setState]);

    const handleClick = () => {
        if (widgetInstance) {
            widgetInstance.open();
        }
    };

    return (
        <CloudinaryScriptContext.Provider value={{ loaded }}>
            <button
                id="upload_widget"
                className="cloudinary-button"
                onClick={handleClick}
            >
                Upload
            </button>
        </CloudinaryScriptContext.Provider>
    );
}

export default UploadWidget;
export { CloudinaryScriptContext };