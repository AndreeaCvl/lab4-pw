import { useLocation } from "react-router-dom";
import { getQuizes } from "../../requests"
import React, { useState, useEffect } from "react";

import { getQuizByID } from "../../requests";

function QuizzesList() {

    const [quizzes, setQuizzes] = useState([])
    const location = useLocation();

    useEffect(() => {
        getQuizes().then(response=>{
            setQuizzes(response.data) });
            console.log("props")
            console.log(location.state)
    }, []);

    const handleClick = (id) => {
        console.log(id);

        getQuizByID(id).then(response=>{
            console.log(response.data)
        })

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
