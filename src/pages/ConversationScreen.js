import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ConversationScreen.css';
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
const ConversationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail, conversationNumber } = location.state || {};

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (userEmail && conversationNumber) {
          const frames = [];
          for (let i = 1; i <= conversationNumber; i++) {
            const path = `ProjectBrainsReact/User/${userEmail}/userdetails/Conversations/Conversation${i}`;
            const docRef = doc(db, path);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              frames.push({
                id: i,
                data: docSnap.data(),
              });
            }
          }
          setConversations(frames);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [userEmail, conversationNumber]);

  const handleOtherDetails = (userEmail, conversation) => {
    console.log(`Navigating to Other Details for Conversation ${conversation}`);
    navigate('/otherdetails', { state: { userEmail, conversation } });
  };

  const handleViewJD = (userEmail, conversation) => {
    console.log(`Navigating to View JD for Conversation ${conversation}`);
    navigate('/viewjd', { state: { userEmail, conversation } });
  };

  const handleViewTranscript = (userEmail, conversation) => {
    console.log(`Navigating to View Transcript for Conversation ${conversation}`);
    navigate('/viewtranscript', { state: { userEmail, conversation } });
  };

  if (loading) {
    return <div className="loading">Loading conversations...</div>;
  }

  if (conversations.length === 0) {
    return <div className="no-conversations">No conversations found.</div>;
  }

  return (
    <div className="conversation-page">
      <div className="conversation-header">
        <div className="conversation-header-title">Conversations</div>
        <div
          className="conversation-back-button"
          onClick={() => navigate(-1)}
        >
          Back
        </div>
      </div>

      <div className="conversation-list">
        {conversations.map((conversation) => (
          <div className="conversation-frame" key={conversation.id}>
            <div className="conversation-frame-left">
              <div className="conversation-title">
                Conversation {conversation.id}
              </div>
            </div>

            <div className="conversation-frame-right">
              <div
                className="conversation-otherdetails-button"
                onClick={() => handleOtherDetails(userEmail, conversation.id)}
              >
                Other Details
              </div>

              <div className="conversation-buttons">
                <div
                  className="conversation-viewtranscript-button"
                  onClick={() => handleViewTranscript(userEmail, conversation.id)}
                >
                  <div className="conversation-viewtranscript-button-text">
                    View Transcript
                  </div>
                </div>
                <div
                  className="conversation-viewjd-button"
                  onClick={() => handleViewJD(userEmail, conversation.id)}
                >
                  <div className="conversation-viewjd-button-text">
                    View Final J.D.
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationPage;
