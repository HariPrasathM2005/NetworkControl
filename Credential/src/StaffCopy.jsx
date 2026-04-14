import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import bg from "./ControlPage.jpg"

// filepath: /home/mhp/Documents/Project/VSCode/Credential/src/StaffCopy.jsx

function StaffCopy() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("")
    const [sites, setSites] = useState([])

    const handleNavigation = (path) => {
        navigate(path)
    }

    const menuItems = [
        { label: "Select Mode", path: "/Mode" },
        { label: "Add/Remove Sites", path: "/AddorRemove" },
        { label: "Scheduling", path: "/Scheduling" },
        { label: "Display", path: "/Display" },
        { label: "Edit", path: "/Edit" },
        { label: "Back", path: "/" }
    ]

    return (
        <div
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px"
            }}
        >
            <div className='Staffpage' style={{ maxWidth: "450px", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.95)", borderRadius: "15px", padding: "40px", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)" }}>
                <h2 style={{ color: '#6b46c1', fontWeight: 900, textAlign: "center", marginBottom: "35px", fontSize: "28px", letterSpacing: "0.5px" }}>
                    Teacher Control Panel
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            style={{
                                width: "100%",
                                padding: "14px 16px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer",
                                borderRadius: "8px",
                                border: "none",
                                backgroundColor: "#6b46c1",
                                color: "white",
                                transition: "all 0.3s ease",
                                boxShadow: "0 4px 6px rgba(107, 70, 193, 0.2)"
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = "#553399";
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 6px 12px rgba(107, 70, 193, 0.4)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#6b46c1";
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 6px rgba(107, 70, 193, 0.2)";
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {status && (
                    <p style={{ marginTop: "25px", fontWeight: "bold", textAlign: "center", color: "#6b46c1", fontSize: "16px", padding: "12px", backgroundColor: "#f3e8ff", borderRadius: "8px" }}>
                        {status}
                    </p>
                )}

                {sites.length > 0 && (
                    <ul style={{ marginTop: "25px", paddingLeft: "20px", color: "#333" }}>
                        {sites.map(site => (
                            <li key={site} style={{ marginBottom: "8px", fontSize: "15px" }}>{site}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default StaffCopy