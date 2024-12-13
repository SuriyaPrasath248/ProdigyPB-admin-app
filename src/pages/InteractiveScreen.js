import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./InteractiveScreen.css";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const InteractiveScreen = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userListRef = doc(db, "ProjectBrainsReact", "UserList");
                const userListSnap = await getDoc(userListRef);

                if (userListSnap.exists()) {
                    const emailArray = userListSnap.data().email;

                    const userDataPromises = emailArray.map(async (user) => {
                        const userDetailsRef = doc(
                            db,
                            "ProjectBrainsReact",
                            "User",
                            user.EmailId,
                            "userdetails"
                        );
                        const userDetailsSnap = await getDoc(userDetailsRef);

                        if (userDetailsSnap.exists()) {
                            const userData = userDetailsSnap.data();
                            return {
                                Name: userData.Name || user.displayName || "Unknown Name",
                                Useremail: user.EmailId,
                                Credits: userData.Credits ?? 0,
                                ConversationNumber: userData.ConversationNumber ?? 0,
                            };
                        }
                        return null;
                    });

                    const userData = await Promise.all(userDataPromises);
                    setUserList(userData.filter((user) => user !== null));
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleOtherDetails = async (userEmail) => {
        const path = `ProjectBrainsReact/User/${userEmail}/userdetails/Conversations/Conversation1`;
        const docRef = doc(db, path);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const data = docSnap.data();
            const filteredData = { ...data };
            delete filteredData.JDCreated;
            delete filteredData.LinkCreated;
    
            navigate("/otherdetails", {/*{ state: { data: filteredData, userEmail } } */});
            //navigate("/otherdetails", { state: { data: filteredData, userEmail }});
            
        } else {
            console.error("No data found at path:", path);
        }
    };
    
    const handleViewJD = async (userEmail) => {
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

            navigate("/viewjd", { state: { data: filteredData, userEmail } });
        } else {
            console.error("No data found at path:", path);
        }
    };

    const handleViewTranscript = async (email) => {
        console.log(`Navigating to transcript for: ${email}`);
       // navigate("/viewtranscript",{/* { state: { userEmail: email, chatHistory } }*/}); // Pass userEmail here
        if (!email) {
            console.error("No email provided for fetching the transcript.");
            return;
        }
    
        try {
            const path = `ProjectBrainsReact/User/${email}/userdetails/Conversations/Conversation1/Transcript/ChatHistory`;
            const docRef = doc(db, path);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const chatHistory = docSnap.data().Chat || [];
                console.log("Fetched chat history:", chatHistory);
                //navigate("/viewtranscript",{/* { state: { userEmail: email, chatHistory } }*/}); // Pass userEmail here
                navigate("/viewtranscript", { state: { userEmail: email, chatHistory } }); // Pass userEmail here
            } else {
                console.error("No data found at path:", path);
            }
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };
    

    
    const renderUserRow = (user) => {
        const { Name, Useremail, Credits, ConversationNumber } = user;

        if (ConversationNumber > 1) {
            return (
                <div className="interactive-screen-user-row" key={Useremail}>
                    <div className="interactive-screen-user-info">
                        <span className="interactive-screen-user-name">{Name}</span>
                        <span className="interactive-screen-user-credits">Credits Remaining - {Credits}</span>
                    </div>
                    <div className="interactive-screen-user-actions">
                        <button className="interactive-screen-blue-button" onClick={() => handleOtherDetails(Useremail)}>Other Details</button>
                        <button className="interactive-screen-blue-button" onClick={() => handleViewTranscript(Useremail)}>View Transcript</button>
                        <button className="interactive-screen-blue-button" onClick={() => handleViewJD(Useremail)}>View Final J.D.</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="interactive-screen-user-row" key={Useremail}>
                <div className="interactive-screen-user-info">
                    <span className="interactive-screen-user-name">{Name}</span>
                    <span className="interactive-screen-user-credits">Credits Remaining - {Credits}</span>
                </div>
                <div className="interactive-screen-user-actions">
                    <button className="interactive-screen-blue-button" onClick={() => handleOtherDetails(Useremail)}>Other Details</button>
                    <button className="interactive-screen-blue-button" onClick={() => handleViewTranscript(Useremail)}>View Transcript</button>
                    <button className="interactive-screen-blue-button" onClick={() => handleViewJD(Useremail)}>View Final J.D.</button>
                </div>
            </div>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    
    const handleSettingsClick = async () => {
        console.log("handleSettingsClick triggered");
        try {
            const docRef = doc(db, "ProjectBrainsReact", "Admin"); // Reference to the Admin document
            console.log("Fetching Admin document...");
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                console.log("Admin document fetched successfully:", docSnap.data());
                // Use correct property names (case-sensitive)
                const introtitle = docSnap.data().IntroTitle; 
                const intromessage = docSnap.data().IntroMessage;
                console.log("Navigating to Settings page with data:", { introtitle, intromessage });
                navigate("/Settings", { state: { introtitle, intromessage } });
            } else {
                console.error("Admin document not found.");
            }
        } catch (error) {
            console.error("Error fetching admin data:", error);
        }
    };
    
    
    

    return (
        <div className="interactive-screen">
        <div className="interactive-screen-header">
            <h1>User History</h1>
            <button className="interactive-screen-header-button" onClick={handleSettingsClick}>Settings</button>
        </div>
        <div className="user-list">
            {userList.map((user) => renderUserRow(user))}
        </div>
    </div>
    
    );
};

export default InteractiveScreen;
