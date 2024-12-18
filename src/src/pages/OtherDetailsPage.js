import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OtherDetailsPage.css";

const OtherDetailsPage = () => {
    const location = useLocation();
   
    const navigate = useNavigate();
    const { data, userEmail } = location.state || {};
    const [sharedByEmails, setSharedByEmails] = useState([]);
    const [viewedByEmails, setViewedByEmails] = useState([]);

    console.log("OtherDetailsPage loaded with data:", data); // Log fetched data
    console.log("OtherDetailsPage userEmail:", userEmail); // Log user email
    useEffect(() => {
        // Populate shared and viewed emails from `data`
        if (data) {
            setSharedByEmails(data.SharedBy || []);
            setViewedByEmails(data.ViewedBy || []);
            console.log("Shared By Emails:", data?.SharedBy || []);
            console.log("Viewed By Emails:", data?.ViewedBy || []);
        }
    }, [data]);

    const renderEmailList = (emails, title) => {
      return (
        <div className="user-statistics-sharedby-container">
          <div className="user-statistics-sharedby-header">
            <div className="user-statistics-sharedby-header-text">{title}</div>
          </div>
          {emails.length > 0 ? (
            emails.map((email, index) => (
              <div className="user-statistics-email-container" key={`${title}-${index}`}>
                <div className="user-statistics-email">{email}</div>
              </div>
            ))
          ) : (
            <div className="user-statistics-email-container">
              <div className="user-statistics-email">No {title.toLowerCase()} available</div>
            </div>
          )}
        </div>
      );
    };
    

    // Derived metrics for total views and shares
    const totalViews = viewedByEmails.length; // Number of unique `ViewedBy` emails
    const totalShares = sharedByEmails.length; // Number of unique `SharedBy` emails

    return (
        <section className="Otherdetails-bg">
        {/* Header */}
        <div className="Otherdetails-header">
            <div className="Otherdetails-header-inside">
              {/* Left Header (Back Button) */}
              <div className="Otherdetails-header-left">
                <div className="Otherdetails-back-button"  onClick={() => navigate(-1)}>
                    <img src="/back.png" alt="Back" />
                    </div>
                    {userEmail && <div className="Otherdetails-user-email">{userEmail}</div>}
                    

              </div>
  
              {/* Right Header (Other Details and View JD Buttons) */}
              <div className="Otherdetails-header-right">
                <div className="Otherdetails-OtherDetails-button" >View Transcript</div>
                <div className="Otherdetails-ViewJD-button"  >View Final J.D</div>
              </div>
            </div>
          </div>
  
  
        {/* Session Feedback */}
        <div className="Session-feedback-container">
          <div className="Session-feedback-header">
            <div className="session-feedback-text-container">
              <div className="session-feedback-text">Session feedback</div>
              <div className="session-feedback-subtext">
                Please rate your experience below
              </div>
            </div>
            <div style={{ width: "2px", height: "54px", background: "#000" }}></div>
           
              <div className="stars-container">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`star ${index < (data?.SessionFeedback ) ? "filled" : "empty"}`}
                  >
                    ★
                  </span>
                ))}
             
              <span className="star-text">{data?.SessionFeedback } / 5 stars</span>
            </div>
            
          </div>
          <div className="addtional-feedback-container">
            <div className="addtional-feedback-title-container">
              <div className="addtional-feedback-title">Additional feedback</div>
            </div>
            <div className="addtional-feedback-text-container">
              <div className="addtional-feedback-text">
              {data?.AdditionalFeedback || "No additional feedback provided."}
              </div>
            </div>
          </div>
        </div>
        
        {/* User Statistics Heading */}
        <div className="user-statistics-heading-container">
            <div className="user-statistics-header">User statistics</div>
        </div>
        
        {/* User Statistics */}
        <div className="user-statistics-container">
        
          <div className="user-statistics-viewcount-container">
            <div className="user-statistics-viewcount-totalviews-container">
              <div className="user-statistics-viewcount-totalviews-header">
                Total Views
              </div>
              <div className="user-statistics-viewcount-totalviews-text">{totalViews}</div>
            </div>
            <div className="user-statistics-viewcount-share-container">
              <div className="user-statistics-viewcount-share-header">
                Number Of Shares
              </div>
              <div className="user-statistics-viewcount-share-text">{totalShares}</div>
            </div>
          </div>
  
          {/* Shared-by Emails */}
          {renderEmailList(sharedByEmails, "Shared-by")}

          {/* Viewed-by Emails */}
          {renderEmailList(viewedByEmails, "Viewed-by")}
        </div>
      </section>
    );
  };
  
export default OtherDetailsPage;
