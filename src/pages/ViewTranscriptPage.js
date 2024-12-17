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
                    console.log("Chat History:", data.Chat); // Debug chat history
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
        <div className="transcript-body">
        <section className="ViewTranscriptbg">
          {/* Header Section */}
          <div className="transcript-header">
            <div className="transcript-header-inside">
              {/* Left Header (Back Button) */}
              <div className="transcript-header-left">
                <div className="transcript-back-button"  onClick={() => navigate(-1)}>
                    <img src="/back.png" alt="Back" />
                    </div>
                    {userEmail && <div className="transcript-user-email">{userEmail}</div>}
                    

              </div>
  
              {/* Right Header (Other Details and View JD Buttons) */}
              <div className="transcript-header-right">
                <div className="transcript-OtherDetails-button" onClick={handleOtherDetails}>Other Details</div>
                <div className="transcript-ViewJD-button" onClick={handleViewJD} >View Final J.D</div>
              </div>
            </div>
          </div>
  
        {/* Chatbox Section */}
        <div className="transcript-chatbox">
            <div className="transcript-chatbox-inside">
                {chatHistory.map((chat, index) => (
                <React.Fragment key={index}>
                    {/* Prompt */}
                    <div className="transcript-ai-container">
                    <div class="transcript-ai-img-circle">
                        <img src="/ailogo.png" alt="AI" class="transcript-ai-img" />
                    </div>
                    <div className="transcript-ai-text">{chat.Response || "No AI Message"}</div>
                    </div>

                    {/* User Response */}
                    <div className="transcript-user-container">
                    <div className="transcript-user-text">{chat.Prompt || "No User Prompt"}</div>
                    </div>
                </React.Fragment>
                ))}
            </div>
            </div>

      </section>
    </div>
    );
  };
        

  
export default ViewTranscriptPage;
