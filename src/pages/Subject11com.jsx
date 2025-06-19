import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/global.css";
import tt from "../assets/tt.png";

const Subject11com = () => {
  const navigate = useNavigate();
  const [m3u8Url, setM3u8Url] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  // ⏰ NEW timetable
  const schedule = {
    Monday: { "17:00": "Maths (Core)", "20:00": "Business Studies" },
    Tuesday: { "17:00": "Maths (Core)", "20:00": "Business Studies" },
    Wednesday: { "17:00": "Business Studies", "20:00": "Maths (Core)" },
    Thursday: { "17:00": "Accounts", "20:00": "Economics" },
    Friday: { "17:00": "Accounts", "20:00": "Economics" },
    Saturday: { "17:00": "Accounts", "20:00": "Economics" },
  };

  // 🎥 Subject to M3U8 Link mapping
  const subjectLinks = {
    "Maths (Core)": "",
    "Business Studies": "",
    "Accounts": "",
    "Economics": "https://d133w6ldrek1er.cloudfront.net/out/v1/c923787f6b3b40cbbfbdc51d2d76e51e/index.m3u8",
  };

  useEffect(() => {
    const updateLiveClass = () => {
      const now = new Date();
      const day = now.toLocaleDateString("en-US", { weekday: "long" });
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const slots = [
        { time: "17:00", start: 17 * 60, subject: schedule[day]?.["17:00"] },
        { time: "20:00", start: 20 * 60, subject: schedule[day]?.["20:00"] },
      ];

      for (let slot of slots) {
        if (slot.subject && currentMinutes >= slot.start - 15 && currentMinutes < slot.start + 90) {
          setM3u8Url(subjectLinks[slot.subject] || "");
          return;
        }
      }

      setM3u8Url("");
    };

    updateLiveClass();
    const interval = setInterval(updateLiveClass, 60000);
    return () => clearInterval(interval);
  }, []);

  const subjects = [
    { name: "Notice", path: "/lectures/11/Notice" },
    { name: "Click Here for Live's Recorded", path: "/11/com/lectures" },
  ];

  return (
    <div className="subjects-container">
      <img src={tt} alt="Logo" className="tt" />
      <h2>Select Subject - Class 11 Commerce</h2>

      <div className="live-class-container">
        <Link
          to={`/video/10/live`}
          state={{ chapterName: "Live Class", m3u8Url }}
          className="subject-box live-class-section"
        >
          🔴 Live Class (Click to Join)
        </Link>
      </div>

      <div className="subject-boxes">
        {subjects.map((subject, index) => (
          <Link key={index} to={subject.path} className="subject-box">
            {subject.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subject11com;
