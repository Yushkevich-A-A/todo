import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import ProjectsListPage from 'pages/ProjectsListPage';
import ProjectPage from 'pages/ProjectPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectsListPage/>}/> 
        <Route path="/project/:id" element={<ProjectPage/>}/> 
        <Route  path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
