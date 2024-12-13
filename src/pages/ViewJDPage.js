import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ViewJDPage.css";

const ViewJDPage = () => {
  const location = useLocation();
  const { data, userEmail } = location.state || {};
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleOtherDetails = () => {
    navigate("/otherdetails");
  };

  const handleViewTranscript = () => {
    navigate("/viewtranscript");
  };

  const handleCopyLink = () => {
    if (data && data.LinkCreated) {
      navigator.clipboard.writeText(data.LinkCreated).then(() => {
        alert('JD link copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  const handleCopyJobDescription = () => {
    if (data && data.JDCreated) {
      navigator.clipboard.writeText(data.JDCreated).then(() => {
        alert('Job description copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  // Fetch job description data (replace with your actual data fetching method)
  

  const formatJobDescription = (jd) => {
    console.log("Formatting JD content for display");
    if (!jd) return ""; // Handle undefined jd to avoid errors
    return jd
      .replace(/(?:\s*-\s*)/g, "<br> • ")
      .replace(/\n/g, "<br>")
      .replace(/(Job Opportunity:)/g, "<strong>$1</strong>")
      .replace(/(Location:|Role Summary:|Key Responsibilities:|Company Name:|Responsibilities: |Minimum Qualifications:|Company:|Position:|Required Skills & Qualifications:|Benefits:)/g, "<strong>$1</strong>");
  };

 
  
  return (
    <div className="view-jd-page-container">
    <section className="view-jd-page">
      <div className="view-jd-header">
        <div className="view-jd-header-inside">
          <div className="view-jd-header-left">
            <div 
              className="view-jd-back-button" 
              onClick={handleBackNavigation}
            >
              <img src="/back.jpg" alt="Back" />
            </div>
            {userEmail && <div className="view-jd-user-email">{userEmail}</div>}
          </div>
          <div className="view-jd-header-right">
            <div 
              className="view-jd-OtherDetails-button" 
              onClick={handleOtherDetails}
            >
              Other Details
            </div>
            <div 
              className="view-jd-ViewTranscript-button" 
              onClick={handleViewTranscript}
            >
              View Transcript
            </div>
          </div>
        </div>
      </div>
      
      {data && data.LinkCreated ? (
        <div className="view-jd-jd-link-container">
          <div className="view-jd-jd-link">
            <div className="view-jd-jd-link-header">JD link:</div>
            <div className="view-jd-jd-hyperlink">
              {data.LinkCreated}
            </div>
          </div>
          <div 
            className="copy-icon" 
            onClick={handleCopyLink}
          >
            <div className="copy-border">
              <img 
                src="/copy-icon.svg" 
                alt="Copy" 
                className="copy-img" 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="view-jd-jd-link-container">
          <div className="view-jd-jd-link">No JD link available</div>
        </div>
      )}
      
      <div className="view-jd-chatbox">
        <div className="view-jd-chatbox-header">
          <div className="view-jd-chatbox-header-text">Job Description</div>
        </div>
        <div className="view-jd-content">
            {data && data.JDCreated ? (
              <div
                dangerouslySetInnerHTML={{ __html: formatJobDescription(data.JDCreated) }}
              />
            ) : (
              <p>No job description available</p>
            )}
            {data && data.JDCreated ? (
              <div
                className="copy-icon copy-jd"
                onClick={handleCopyJobDescription}
              >
                <div className="copy-border">
                  <img 
                    src="/copy-icon.svg" 
                    alt="Copy" 
                    className="copy-img" 
                  />
                </div>
              </div>
            ) : (
              <p>No job description available</p>
            )}

        </div>
      </div>
    </section>
  </div>
);
};

export default ViewJDPage;