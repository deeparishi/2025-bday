import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Phase1Welcome } from './pages/Phase1Welcome';
import { Phase2QuizIntro } from './pages/Phase2QuizIntro';
import { Phase2Quiz } from './pages/Phase2Quiz';
import { Phase3Photos } from './pages/Phase3Photos';
import BirthdayAnimation from './pages/Phase4BirthdayGifs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Phase1Welcome />} />
        <Route path="/quiz" element={<Phase2QuizIntro />} />
        <Route path="/quiz/start" element={<Phase2Quiz />} />
        <Route path="/photos" element={<Phase3Photos />} />
        <Route path="/birthday" element={<BirthdayAnimation />} />
      </Routes>
    </Router>
  );
}

export default App;
