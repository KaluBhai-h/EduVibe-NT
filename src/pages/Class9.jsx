import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Your subjects and scraper URLs
const subjects = [
  {
    name: 'Maths',
    api: 'https://47b7e77f-447e-495e-87c3-0f05dead215f-00-13isrhur0zcw1.pike.replit.dev/scrape?url=https://studyverse-for-9th.infy.uk/Maths.html',
  },
  {
    name: 'Science',
    api: 'https://47b7e77f-447e-495e-87c3-0f05dead215f-00-13isrhur0zcw1.pike.replit.dev/scrape?url=https://studyverse-for-9th.infy.uk/Science.html',
  },
  {
    name: 'English',
    api: 'https://studyverse-scraper.replit.app/scrape?url=https://studyverse-for-9th.infy.uk/English.html',
  },
  {
    name: 'SST',
    api: 'https://studyverse-scraper.replit.app/scrape?url=https://studyverse-for-9th.infy.uk/SST.html',
  },
];

const Class9 = () => {
  const [selected, setSelected] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');
  const navigate = useNavigate();

  const handleClick = async (subject) => {
    setSelected(subject.name);
    setLoading(true);
    setChapters([]);
    try {
      const res = await fetch(subject.api);
      const json = await res.json();
      setChapters(json.chapters || []);
    } catch (err) {
      alert("Failed to load chapters");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (lecture, chapter, index) => {
    if (lecture.youtubeUrl) {
      window.open(lecture.youtubeUrl, "_blank");
    } else {
      navigate(`/video/9/${chapter}/${index}`);
    }
  };

  const goBack = () => {
    setSelected(null);
    setChapters([]);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#111',
        color: '#fff',
        fontFamily: 'Poppins, sans-serif',
        padding: 20
      }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');`}
      </style>

      {!selected && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {subjects.map((subj, i) => (
            <div
              key={i}
              onClick={() => handleClick(subj)}
              style={{
                backgroundColor: '#1c1c1c',
                padding: 30,
                borderRadius: 12,
                textAlign: 'center',
                fontWeight: 600,
                fontSize: 20,
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {subj.name}
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div>
          <button
            onClick={goBack}
            style={{
              background: '#333',
              padding: '10px 20px',
              borderRadius: 10,
              marginBottom: 20,
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              color: '#fff'
            }}
          >
            ← Back
          </button>

          <h2 style={{ marginBottom: 20 }}>{selected} Chapters</h2>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <button
              onClick={() => setActiveTab('videos')}
              style={{
                background: activeTab === 'videos' ? '#444' : '#222',
                padding: '10px 20px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              style={{
                background: activeTab === 'notes' ? '#444' : '#222',
                padding: '10px 20px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              Notes
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            chapters.map((chapter, chapIndex) => {
              const hasVideos = chapter.videos?.length > 0;
              const hasNotes = chapter.notes?.length > 0;

              if (activeTab === 'videos' && !hasVideos) return null;
              if (activeTab === 'notes' && !hasNotes) return null;

              return (
                <div key={chapIndex} style={{
                  marginBottom: 20,
                  background: '#1e1e1e',
                  borderRadius: 10,
                  padding: 15,
                  border: '1px solid #333',
                }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{chapter.chapter}</h3>

                  {activeTab === 'videos' && chapter.videos.map((v, vIndex) => (
                    <div
                      key={vIndex}
                      onClick={() => handleVideoClick(v, chapIndex, vIndex)}
                      style={{
                        background: '#2a2a2a',
                        marginBottom: 10,
                        padding: 12,
                        borderRadius: 8,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#2a2a2a'}
                    >
                      {v.lecture}
                    </div>
                  ))}

                  {activeTab === 'notes' && chapter.notes.map((n, nIndex) => (
                    <a
                      key={nIndex}
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        background: '#2a2a2a',
                        marginBottom: 10,
                        padding: 12,
                        borderRadius: 8,
                        textDecoration: 'none',
                        color: '#fff',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#2a2a2a'}
                    >
                      {n.lecture}
                    </a>
                  ))}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Class9;
