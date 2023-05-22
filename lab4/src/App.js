import Homepage from "./components/Homepage";
import AboutMe from "./components/AboutMe";
import QuizzesList from "./components/quizzes-list/QuizzesList"
import RegistrationForm from "./components/register/RegistrationForm"

import {Routes, Route, Link} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <nav className="nav">
        <Link to="/" className="nav-item">Homepage</Link>
        <Link to="/about-me" className="nav-item">About Me</Link>
        <Link to="/quizzes-list" className="nav-item">Quizzes List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/about-me" element={<AboutMe/>}/>
        <Route path="/quizzes-list" element={<QuizzesList/>}/>
        <Route path="/register" element={<RegistrationForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
