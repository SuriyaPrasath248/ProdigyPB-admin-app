import React from 'react';
import { useLocation } from "react-router-dom";
import "./Settings.css";

const SettingsPage = () => {
  const location = useLocation();
  const { introtitle, intromessage } = location.state || { introtitle: "", intromessage: "" };
  console.log("SettingsPage loaded with state:", location.state);


  return (
    <div className="Settings-body">
    <section className="Settings-page">
      <div className="Settings-page-header">
        <div className="Settings-page-header-inside">
          <div className="Settings-page-header-left">
            <div className="Settings-page-back-button">
              <img src="back.jpg" alt="Back" />
            </div>
            <div className="settings-header-text" data-settings="value">
                  Settings
              </div>
          </div>
        </div>
      </div>

      <div className="Settings-page-content-background">
        <div className="Settings-page-text-display-content">
          <div className="Settings-page-title-content">
            <div className="Settings-page-title-text">
              Title
            </div>
            <div className="Settings-page-title-box">
              <div className="Settings-page-title-box-rules">
                {introtitle || "No Title Available"}
              </div>
            </div>
          </div>
        </div>

        <div className="Settings-page-intro-display-content">
          <div className="Settings-page-intro-content">
            <div className="Settings-page-intro-text">
              Introduction
            </div>
            <div className="Settings-page-intro-box">
              <div className="Settings-page-intro-box-rules">
                {intromessage || "No Message Available"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Settings-page-rules-content">
        <div className="Settings-page-rules-1-2-content">
          <div className="Settings-page-rules-1-content">
            <div className="Settings-page-jd-rules-content">
              <div className="Settings-page-jd-rules-text">J.D. Rules</div>
              <div className="Settings-page-rules-upload-box"></div>
            </div>
            <div className="Settings-page-rules-description">
              Maximum combined file size 50 MB • Only zip, pdf, doc, ppt, xls, png, jpg, mp3, mp4 allowed
            </div>
          </div>
          
          <div className="Settings-page-rules-2-content">
            <div className="Settings-page-jd-rules-content">
              <div className="Settings-page-jd-rules-text">J.D. Interaction</div>
              <div className="Settings-page-rules-upload-box"></div>
            </div>
            <div className="Settings-page-rules-description">
            Maximum combined file size 50 MB • Only zip, pdf, doc, ppt, xls, png, jpg, mp3, mp4 allowed
          </div>
          </div>
        </div>
        
        <div className="Settings-page-rules-3">
          <div className="Settings-page-jd-rules-content">
            <div className="Settings-page-jd-rules-text">Miscellaneous</div>
            <div className="Settings-page-rules-upload-box"></div>
          </div>
          <div className="Settings-page-rules-description">
            Maximum combined file size 50 MB • Only zip, pdf, doc, ppt, xls, png, jpg, mp3, mp4 allowed
          </div>
        </div>
      </div>
    </section>

    </div>
  );
};

export default SettingsPage;