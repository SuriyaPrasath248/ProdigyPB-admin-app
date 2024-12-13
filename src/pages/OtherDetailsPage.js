import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./OtherDetailsPage.css";

const OtherDetailsPage = () => {
    const location = useLocation();
    const { data, userEmail } = location.state || {};
    const [sharedByEmails, setSharedByEmails] = useState([]);
    const [viewedByEmails, setViewedByEmails] = useState([]);

    useEffect(() => {
        // Populate shared and viewed emails from `data`
        if (data) {
            setSharedByEmails(data.SharedBy || []);
            setViewedByEmails(data.ViewedBy || []);
        }
    }, [data]);

    // Derived metrics for total views and shares
    const totalViews = viewedByEmails.length; // Number of unique `ViewedBy` emails
    const totalShares = sharedByEmails.length; // Number of unique `SharedBy` emails

    return (
        <div className="other-details-container">
            {/* Header Section */}
            <div className="header-section">
                <button className="back-button" onClick={() => window.history.back()}>&larr; Back</button>
                <div className="user-info">
                    <span className="user-name">{userEmail}</span>
                    {/*<span className="user-email">{data?.UserEmail || "No email provided"}</span>*/}
                </div>
                <div className="header-buttons">
                    <button className="header-button">View Transcript</button>
                    <button className="header-button">View Final J.D.</button>
                </div>
            </div>

            {/* Session Feedback Section */}
            <div className="session-feedback-section">
                <div className="feedback-header">
                    <span className="feedback-label">Session Feedback</span>
                    <span className="feedback-subtext">Please rate your experience below</span>
                </div>
                <div className="stars-container">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <span
                            key={index}
                            className={`star ${index < (data?.SessionFeedback || 4) ? "filled" : "empty"}`}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <span className="star-text">{data?.SessionFeedback || 4} / 5 stars</span>
            </div>

            <div
    className={`additional-feedback-section ${
        data?.AdditionalFeedback ? "has-feedback" : "no-feedback"
    }`}
>
    <span className="feedback-header">Additional Feedback</span>
    <div className="feedback-content">
        {data?.AdditionalFeedback || "No additional feedback provided."}
    </div>
</div>


            {/* User Statistics Section */}
            <div className="user-statistics">
                <div className="stat-box">
                    <span className="stat-title">Total Views</span>
                    <span className="stat-value">{totalViews}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-title">Number Of Shares</span>
                    <span className="stat-value">{totalShares}</span>
                </div>
                <div className="stat-box scrollable">
                    <span className="stat-title">J.D. Shared By</span>
                    <div className="scroll-content">
                        {sharedByEmails.length > 0 ? (
                            sharedByEmails.map((email, index) => (
                                <div key={index}>{email}</div>
                            ))
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                </div>
                <div className="stat-box scrollable">
                    <span className="stat-title">J.D. Viewed By</span>
                    <div className="scroll-content">
                        {viewedByEmails.length > 0 ? (
                            viewedByEmails.map((email, index) => (
                                <div key={index}>{email}</div>
                            ))
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherDetailsPage;
