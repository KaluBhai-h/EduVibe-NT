import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* -------------------------------------------------------------
  CONFIG – set your scraper base once. Each subject URL will be
  appended as /scrape?url=<ENCODED>
--------------------------------------------------------------*/
const SCRAPER = "https://47b7e77f-447e-495e-87c3-0f05dead215f-00-13isrhur0zcw1.pike.replit.dev/scrape?url="; // ✏️ change

const SUBJECTS = [
  { name: "Maths", url: "https://studyverse-for-9th.infy.uk/Maths.html" },
  { name: "Science", url: "https://studyverse-for-9th.infy.uk/Science.html" },
  { name: "English", url: "https://studyverse-for-9th.infy.uk/English.html" },
  { name: "SST", url: "https://studyverse-for-9th.infy.uk/SST.html" }
];

export default function Class9() {
  const [subject, setSubject] = useState(null);          // selected subject name
  const [chapters, setChapters] = useState([]);          // fetched chapters
  const [openIdx, setOpenIdx] = useState(null);          // chapter index expanded
  const [tab, setTab] = useState('videos');              // active tab inside chapter
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  /* fetch chapters when subject chosen */
  const loadChapters = async (subj) => {
    setLoading(true); setErr(null); setChapters([]);
    try {
      const api = SCRAPER + encodeURIComponent(subj.url);
      const res = await fetch(api);
      const json = await res.json();
      setSubject(subj.name);
      setChapters(json.chapters || []);
    } catch (e) { setErr("Failed to load"); }
    finally { setLoading(false); }
  };

  /* handlers */
  const onVideoClick = (lecture, chapIdx, vidIdx) => {
    if (lecture.youtubeUrl) {
      window.open(lecture.youtubeUrl, "_blank");
    } else {
      navigate(`/video/9/${subject}/${vidIdx}`, {
        state: { m3u8Url: lecture.m3u8Url, title: lecture.lecture }
      });
    }
  };

  /* ------------------- STYLES ------------------ */
  const box = {
    background: '#1e1e1e', padding: 20, borderRadius: 12,
    boxShadow: '0 3px 10px rgba(0,0,0,.5)'
  };
  const button = (active=false) => ({
    background: active ? '#444' : '#222', color:'#fff',
    padding:'10px 20px', border:'none', borderRadius:8,
    cursor:'pointer', fontWeight:600
  });

  /* ------------------- RENDER ------------------- */
  return (
    <div style={{ minHeight:'100vh', background:'#111', color:'#fff', fontFamily:'Poppins, sans-serif', padding:20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');`}</style>

      {/* SUBJECT GRID */}
      {!subject && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20 }}>
          {SUBJECTS.map((s,i)=>(
            <div key={i} onClick={()=>loadChapters(s)} style={{...box, textAlign:'center', fontSize:20, fontWeight:600, cursor:'pointer', transition:'transform .2s'}} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
              {s.name}
            </div>
          ))}
        </div>
      )}

      {/* CHAPTER LIST */}
      {subject && (
        <div>
          <button onClick={()=>{setSubject(null); setOpenIdx(null);}} style={{...button(), marginBottom:20}}>
            ← Back
          </button>
          <h2 style={{fontWeight:600, marginBottom:10}}>{subject} Chapters</h2>

          {loading && <p>Loading…</p>}
          {err && <p style={{color:'tomato'}}>{err}</p>}

          {!loading && !err && chapters.map((chap, idx)=>(
            <div key={idx} style={{...box, marginBottom:15}}>
              <div onClick={()=>setOpenIdx(openIdx===idx?null:idx)} style={{cursor:'pointer', fontWeight:600, marginBottom:10}}>
                {chap.chapter}
              </div>

              {openIdx===idx && (
                <>
                  {/* tab buttons */}
                  <div style={{display:'flex', gap:12, marginBottom:15}}>
                    {chap.videos?.length>0 && <button style={button(tab==='videos')} onClick={()=>setTab('videos')}>Videos</button>}
                    {chap.notes?.length>0  && <button style={button(tab==='notes')}  onClick={()=>setTab('notes')}>Notes</button>}
                  </div>

                  {/* Videos list */}
                  {tab==='videos' && chap.videos?.map((v,i)=>(
                    <div key={i} onClick={()=>onVideoClick(v, idx, i)} style={{background:'#2a2a2a', padding:12, borderRadius:8, marginBottom:10, cursor:'pointer', transition:'background .2s'}} onMouseEnter={e=>e.currentTarget.style.background='#333'} onMouseLeave={e=>e.currentTarget.style.background='#2a2a2a'}>
                      {v.lecture}
                    </div>
                  ))}

                  {/* Notes list */}
                  {tab==='notes' && chap.notes?.map((n,i)=>(
                    <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" style={{display:'block', background:'#2a2a2a', padding:12, borderRadius:8, marginBottom:10, textDecoration:'none', color:'#fff', transition:'background .2s'}} onMouseEnter={e=>e.currentTarget.style.background='#333'} onMouseLeave={e=>e.currentTarget.style.background='#2a2a2a'}>
                      {n.lecture}
                    </a>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
                }
