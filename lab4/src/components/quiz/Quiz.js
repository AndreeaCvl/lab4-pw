import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { getQuizByID } from "../../requests";
import { submitQuizAnswers} from "../../requests";

function Quiz() {

    const [questions, setQuestions] = useState([]);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizId, setQuizId] = useState(0);
    const [userId, setUserId] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const location = useLocation();

    useEffect(() => {
        getQuizByID(location.state.id).then(response=>{
            console.log(response.data.questions)
            setQuestions(response.data.questions)
            setQuizTitle(response.data.title)
            setQuizId(response.data.id)
            setUserId(location.state.userId)
        })
    }, []);
    
    const handleAnswerSelection = (questionId, answer) => {
        setSelectedAnswers(prevSelectedAnswers => ({
          ...prevSelectedAnswers,
          [questionId]: answer
        }));
        console.log(selectedAnswers)
        
        const postAnswerRequest = {questionId, answer, userId, quizId};
        
        submitQuizAnswers(postAnswerRequest).then(response=>{
            console.log(response);
        });
    };
    
    return (
        <div>
            <div>{quizTitle}</div>
            {questions.map(question => {
            return (
            <div className="questionElement" key={question.id}>
                <div className="question">{question.question}</div>

                <div className="answers">
                    {question.answers.map((answer, index) => (
                        <label className="answerElement" key={index}>
                        <input
                            type="radio"
                            name={`question_${question.id}`}
                            value={answer}
                            checked={selectedAnswers[question.id] === answer}
                            onChange={() => handleAnswerSelection(question.id, answer)}            
                        />
                        {answer}
                        </label>
                    ))}
                </div>

                <div className="quizQuestionCount">{question.questions_count}</div>
            </div>
            )})}
        </div>
    )
}

export default Quiz
