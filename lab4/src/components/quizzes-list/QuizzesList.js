import { useLocation } from "react-router-dom";
import { getQuizes } from "../../requests"
import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";

import { getQuizByID } from "../../requests";

function QuizzesList() {

    const [quizzes, setQuizzes] = useState([])
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        getQuizes().then(response=>{
            setQuizzes(response.data) });
            console.log("props")
            console.log(location.state.id)
    }, []);

    const handleClick = (id) => {
        console.log(id);
        navigate("/quiz",{state:{id:id, userId: location.state.id}});
    };
    
    
    return (
        <div>
            {quizzes.map(quiz => {
            return (
            <div className="quizElement" id={quiz.id} onClick={() => handleClick(quiz.id)}>
                <div className="quizTitle">{quiz.title}</div>
                <div className="quizQuestionCount">{quiz.questions_count}</div>
            </div>
            )})}
        </div>
    )
}

export default QuizzesList
