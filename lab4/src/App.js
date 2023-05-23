import QuizzesList from "./components/quizzes-list/QuizzesList"
import RegistrationForm from "./components/register/RegistrationForm"
import Quiz from "./components/quiz/Quiz"
import { UserProvider } from './UserContext';


import {Routes, Route, Link} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <nav className="nav">
        <Link to="/" className="nav-item">Register</Link>
        <Link to="/quizzes-list" className="nav-item">Quizzes List</Link>
      </nav>
      <UserProvider>
        <Routes>
          <Route path="/" element={<RegistrationForm/>}/>
          <Route path="/quizzes-list" element={<QuizzesList/>}/>
          <Route path="/register" element={<RegistrationForm/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
