import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./ViewTranscriptPage.css";

const ViewTranscriptPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userEmail } = location.state || {};
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch chat history
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const path = `ProjectBrainsReact/User/${userEmail}/userdetails/Conversations/Conversation1/Transcript/ChatHistory`;
                const docRef = doc(db, path);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setChatHistory(data.Chat || []);
                } else {
                    console.error("No data found at path:", path);
                }
            } catch (error) {
                console.error("Error fetching chat history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChatHistory();
    }, [userEmail]);

    // Function for "Other Details"
    const handleOtherDetails = async () => {
        try {
            const path = `ProjectBrainsReact/User/${userEmail}/userdetails/Conversations/Conversation1`;
            const docRef = doc(db, path);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const filteredData = { ...data };
                delete filteredData.JDCreated;
                delete filteredData.LinkCreated;

                navigate("/otherdetails", { state: { data: filteredData } });
            } else {
                console.error("No data found at path:", path);
            }
        } catch (error) {
            console.error("Error fetching other details:", error);
        }
    };

    // Function for "View J.D."
    const handleViewJD = async () => {
        try {
            const path = `ProjectBrainsReact/User/${userEmail}/userdetails/Conversations/Conversation1`;
            const docRef = doc(db, path);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const filteredData = { ...data };
                delete filteredData.AdditionalFeedback;
                delete filteredData.SessionFeedback;
                delete filteredData.SharedBy;
                delete filteredData.ViewedBy;
                delete filteredData.Timestamp;

                navigate("/viewjd", { state: { data: filteredData } });
            } else {
                console.error("No data found at path:", path);
            }
        } catch (error) {
            console.error("Error fetching View J.D. details:", error);
        }
    };

    if (loading) {
        return <div>Loading Chat Transcript...</div>;
    }

    return (
        <div className="view-transcript-page">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    &larr; Back
                </button>
                <div className="header-info">
                    <span className="user-name">Done by: {userEmail}</span>
                </div>
                <div className="header-actions">
                    <button
                        className="header-button"
                        onClick={handleOtherDetails}
                    >
                        Other Details
                    </button>
                    <button
                        className="header-button"
                        onClick={handleViewJD}
                    >
                        View Final J.D.
                    </button>
                </div>
            </div>
            <div className="chat-container">
                <h1 className="chat-header">Chat Transcript</h1>
                <div className="chat-content">
                    {chatHistory.map((chat, index) => (
                        <React.Fragment key={index}>
                            <div className="chat-bubble prompt">{chat.Prompt}</div>
                            <div className="chat-bubble response">{chat.Response}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewTranscriptPage;
