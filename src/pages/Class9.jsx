// class9.jsx
import { useState, useEffect } from "react";

const SUBJECTS = [
  { id: "Maths", label: "Maths", url: "https://studyverse-for-9th.infy.uk/Maths.html" },
  { id: "Science", label: "Science", url: "https://studyverse-for-9th.infy.uk/Science.html" },
  { id: "chemistry", label: "Chemistry", url: "https://studyverse-for-9th.infy.uk/Chemistry.html" },
  { id: "biology", label: "Biology", url: "https://studyverse-for-9th.infy.uk/Biology.html" }
];

/* build your scraper endpoint */
const replit = "https://47b7e77f-447e-495e-87c3-0f05dead215f-00-13isrhur0zcw1.pike.replit.dev"
const buildApi = url => `${replit}/scrape?url=${encodeURIComponent(url)}`;

export default function Class9() {
  const [active, setActive] = useState(SUBJECTS[0].id);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const { id, url } = SUBJECTS.find(s => s.id === active);
    if (data[id]) return;                      // already fetched

    setLoading(true);
    setErr(null);

    fetch(buildApi(url))
      .then(r => r.json())
      .then(json => setData(prev => ({ ...prev, [id]: json.chapters || [] })))
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  }, [active]);

  /* ---------------- render helpers ---------------- */
  const VideoLink = ({ subjId, vIdx, v }) => {
    if (v.youtubeUrl)
      return (
        <a href={v.youtubeUrl} target="_blank" rel="noopener noreferrer"
           className="text-blue-600 hover:underline">YouTube</a>
      );

    /* m3u8 – route to /video/:subj/:idx */
    return (
      <a href={`/video/${subjId}/${vIdx}`} className="text-blue-600 hover:underline">
        Play
      </a>
    );
  };

  const renderChapter = (chap, chapIdx, subjId) => (
    <details key={chapIdx} className="mb-4 border rounded-lg">
      <summary className="cursor-pointer select-none p-3 font-semibold bg-gray-100">
        {chap.chapter || `Chapter ${chapIdx + 1}`}
      </summary>

      <div className="p-4 space-y-4">
        {chap.videos?.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Videos</h3>
            {chap.videos.map((v, i) => (
              <div key={i} className="flex justify-between items-center border-b py-1">
                <span>{v.lecture}</span>
                <VideoLink subjId={subjId} vIdx={i} v={v} />
              </div>
            ))}
          </div>
        )}

        {chap.notes?.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Notes</h3>
            {chap.notes.map((n, i) => (
              <div key={i} className="flex justify-between items-center border-b py-1">
                <span>{n.lecture}</span>
                <a href={n.url} target="_blank" rel="noopener noreferrer"
                   className="text-blue-600 hover:underline">PDF</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </details>
  );

  /* ---------------- main render ---------------- */
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* subject tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SUBJECTS.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`px-4 py-2 rounded-md border
              ${active === s.id ? "bg-blue-600 text-white" : "bg-white"}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* content */}
      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600">{err}</p>}

      {!loading && !err && data[active]?.length > 0 && (
        <div>
          {data[active].map((chap, idx) => renderChapter(chap, idx, active))}
        </div>
      )}
    </div>
  );
}
