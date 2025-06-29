import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/****************  CONFIG  *****************/
const SCRAPER = "https://tust-pink.vercel.app/scrape?url="; // ← change

const SUBJECTS = [
  { name: "Maths",   url: "https://studyverse-for-9th.infy.uk/Maths.html" },
  { name: "Science", url: "https://studyverse-for-9th.infy.uk/Science.html" },
  { name: "English", url: "https://studyverse-for-9th.infy.uk/English.html" },
  { name: "SST",     url: "https://studyverse-for-9th.infy.uk/SST.html" }
];

/****************  STYLES  *****************/
const box = {
  background: "#1e1e1e",
  padding: 20,
  borderRadius: 12,
  boxShadow: "0 3px 10px rgba(0,0,0,.5)",
};
const btn = (active = false) => ({
  background: active ? "#444" : "#222",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
});
const Spinner = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
    <div
      style={{
        width: 32,
        height: 32,
        border: "4px solid #555",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

/****************  COMPONENT  **************/
export default function Class9() {
  const [subject, setSubject] = useState(null);  // current subject name
  const [chapters, setChapters] = useState([]);  // fetched chapters
  const [openIdx, setOpenIdx] = useState(null);  // currently opened chapter index
  const [tab, setTab] = useState("videos");      // active tab in opened chapter
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const loadChapters = async ({ name, url }) => {
    setLoading(true);
    setErr(null);
    setSubject(name);
    setOpenIdx(null);
    try {
      const res = await fetch(SCRAPER + encodeURIComponent(url));
      const json = await res.json();
      setChapters(json.chapters || []);
    } catch {
      setErr("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  const handleVideo = (lecture, chapIdx, vidIdx) => {
    if (lecture.youtubeUrl) {
      window.open(lecture.youtubeUrl, "_blank");
    } else {
      navigate(`/video/9/${subject}/${vidIdx}`, {
        state: { m3u8Url: lecture.m3u8Url, title: lecture.lecture },
      });
    }
  };

  const backToSubjects = () => {
    setSubject(null);
    setChapters([]);
    setOpenIdx(null);
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: 20,
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');`}
      </style>

      {/* SUBJECT GRID */}
      {!subject && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 20,
          }}
        >
          {SUBJECTS.map((s, i) => (
            <div
              key={i}
              onClick={() => loadChapters(s)}
              style={{ ...box, textAlign: "center", fontSize: 20, fontWeight: 600, cursor: "pointer", transition: "transform .2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {s.name}
            </div>
          ))}
        </div>
      )}

      {/* CHAPTER VIEW */}
      {subject && (
        <>
          <button onClick={backToSubjects} style={{ ...btn(), marginBottom: 20 }}>
            ← Back
          </button>
          <h2 style={{ fontWeight: 600, marginBottom: 20 }}>{subject} Chapters</h2>

          {loading && <Spinner />}
          {err && <p style={{ color: "tomato" }}>{err}</p>}

          {!loading && !err && chapters.length > 0 && (
            <div>
              {/* Show list or single chapter depending on openIdx */}
              {openIdx === null ? (
                chapters.map((c, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setOpenIdx(idx);
                      setTab(c.videos?.length ? "videos" : "notes");
                    }}
                    style={{ ...box, marginBottom: 15, cursor: "pointer" }}
                  >
                    {c.chapter}
                  </div>
                ))
              ) : (
                <div style={box}>
                  <div onClick={() => setOpenIdx(null)} style={{ cursor: "pointer", marginBottom: 15, fontWeight: 600 }}>
                    ← {chapters[openIdx].chapter}
                  </div>

                  {/* Tabs */}
                  <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    {chapters[openIdx].videos?.length > 0 && (
                      <button style={btn(tab === "videos")}
                              onClick={() => setTab("videos")}>Videos</button>
                    )}
                    {chapters[openIdx].notes?.length > 0 && (
                      <button style={btn(tab === "notes")}
                              onClick={() => setTab("notes")}>Notes</button>
                    )}
                  </div>

                  {/* Videos */}
                  {tab === "videos" &&
                    chapters[openIdx].videos.map((v, i) => (
                      <div
                        key={i}
                        onClick={() => handleVideo(v, openIdx, i)}
                        style={{ background: "#2a2a2a", padding: 12, borderRadius: 8, marginBottom: 10, cursor: "pointer", transition: "background .2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#2a2a2a")}
                      >
                        {v.lecture}
                      </div>
                    ))}

                  {/* Notes */}
                  {tab === "notes" &&
                    chapters[openIdx].notes.map((n, i) => (
                      <a
                        key={i}
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "block", background: "#2a2a2a", padding: 12, borderRadius: 8, marginBottom: 10, textDecoration: "none", color: "#fff", transition: "background .2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#2a2a2a")}
                      >
                        {n.lecture}
                      </a>
                    ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
                                 }
