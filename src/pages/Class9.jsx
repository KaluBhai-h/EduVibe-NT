// src/pages/Class9.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SCRAPER_ORIGIN = "https://47b7e77f-447e-495e-87c3-0f05dead215f-00-13isrhur0zcw1.pike.replit.dev"; // ← change
const SUBJECTS = [
  { id: "Maths", label: "Maths", url: "https://studyverse-for-9th.infy.uk/Maths.html" },
  { id: "Science", label: "Science", url: "https://studyverse-for-9th.infy.uk/Science.html" },
  { id: "chemistry", label: "Chemistry", url: "https://studyverse-for-9th.infy.uk/Chemistry.html" },
  { id: "biology", label: "Biology", url: "https://studyverse-for-9th.infy.uk/Biology.html" }
];

const api = url => `${SCRAPER_ORIGIN}/scrape?url=${encodeURIComponent(url)}`;

export default function Class9() {
  const [active, setActive] = useState(SUBJECTS[0].id);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  /* fetch subject once */
  useEffect(() => {
    const { id, url } = SUBJECTS.find(s => s.id === active);
    if (cache[id]) return;

    setLoading(true);
    setErr(null);
    fetch(api(url))
      .then(r => r.json())
      .then(j => setCache(p => ({ ...p, [id]: j.chapters || [] })))
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  }, [active]);

  /* ---------------- UI helpers ---------------- */

  const Pill = ({ children, href, onClick }) => (
    <a
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800"
    >
      {children}
    </a>
  );

  const ChapterCard = ({ c, subjId }) => (
    <details className="rounded-xl shadow p-4 mb-4 bg-white">
      <summary className="cursor-pointer font-semibold mb-2 select-none">
        {c.chapter}
      </summary>

      {c.videos?.length > 0 && (
        <div className="mb-4">
          <h3 className="font-medium mb-1">Videos</h3>
          <div className="space-y-1">
            {c.videos.map((v, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{v.lecture}</span>
                {v.youtubeUrl ? (
                  <Pill href={v.youtubeUrl}>YouTube</Pill>
                ) : (
                  <Pill onClick={e => { e.preventDefault(); navigate(`/video/9/${subjId}/${i}`); }}>Play</Pill>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {c.notes?.length > 0 && (
        <div>
          <h3 className="font-medium mb-1">Notes</h3>
          <div className="space-y-1">
            {c.notes.map((n, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{n.lecture}</span>
                <Pill href={n.url}>PDF</Pill>
              </div>
            ))}
          </div>
        </div>
      )}
    </details>
  );

  /* ---------------- render ---------------- */

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* top tab row */}
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`px-4 py-2 rounded-full border
              ${active === s.id ? "bg-blue-600 text-white" : "bg-gray-50"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* content area */}
      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600">{err}</p>}

      {!loading && !err && cache[active]?.length > 0 && (
        <div>
          {cache[active].map((c, idx) => (
            <ChapterCard key={idx} c={c} subjId={active} />
          ))}
        </div>
      )}
    </div>
  );
      }
