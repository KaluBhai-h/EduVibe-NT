import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Subject9 from "./pages/Subject9";
import Subject10 from "./pages/Subject10";
import Subject11 from "./pages/Subject11";
import Lectures9 from "./pages/Lectures9";
import Lectures from "./pages/Lectures";
import Lectures11 from "./pages/Lectures11";
import ChapterLectures9 from "./pages/ChapterLectures9";
import ChapterLectures10 from "./pages/ChapterLectures10";
import ChapterLectures11 from "./pages/ChapterLectures11";
import VideoPlayer from "./pages/VideoPlayer";
import ProtectedRoute from "./components/ProtectedRoute";
import LecturesPage11 from './pages/LecturesPage11';
import Subject11com from './pages/Subject11com';
import Com11 from './pages/Com11';
import TestPlatform from './pages/TestPlatform';
import Class9 from './pages/Class9';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:token" element={<Verify />} />

        {/* Subject Pages */}
        <Route path="/subjects/9" element={<ProtectedRoute><Subject9 /></ProtectedRoute>} />
        <Route path="/subjects/10" element={<ProtectedRoute><Subject10 /></ProtectedRoute>} />
        <Route path="/subjects/11" element={<ProtectedRoute><Subject11 /></ProtectedRoute>} />
        <Route path="/subjectss/9" element={<Class9 />} />

        {/* Lecture Pages */}
        <Route path="/lectures/9/:subject" element={<ProtectedRoute><Lectures9 /></ProtectedRoute>} />
        <Route path="/lectures/10/:subject" element={<ProtectedRoute><Lectures /></ProtectedRoute>} />
        <Route path="/lectures/11/:subject" element={<ProtectedRoute><Lectures11 /></ProtectedRoute>} />
        <Route path="/11/lectures" element={<LecturesPage11 />} />
        <Route path="/subjects/113" element={<Subject11com />} />
        <Route path="/11/com/lectures" element={<Com11 />} />
        <Route path="/10/test" element={<ProtectedRoute><TestPlatform /></ProtectedRoute>} />

        {/* Chapter Lectures */}
        <Route path="/chapter-lectures/9/:subject/:chapterIndex" element={<ProtectedRoute><ChapterLectures9 /></ProtectedRoute>} />
        <Route path="/chapter-lectures/10/:subject/:chapterIndex" element={<ProtectedRoute><ChapterLectures10 /></ProtectedRoute>} />
        <Route path="/chapter-lectures/11/:subject/:chapterIndex" element={<ProtectedRoute><ChapterLectures11 /></ProtectedRoute>} />

        {/* Video Player - Recorded */}
        <Route path="/video/9/:subject/:chapterIndex" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
        <Route path="/video/10/:subject/:chapterIndex" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
        <Route path="/video/11/:subject/:chapterIndex" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />

        {/* Video Player - Live */}
     <Route path="/video/9/live" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
<Route path="/video/10/live" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
<Route path="/video/11/live" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
          <Route path="/video/11/bio/live" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
          <Route path="/video/11/com/live" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
