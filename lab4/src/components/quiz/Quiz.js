import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { getQuizByID } from "../../requests";
import { submitQuizAnswers } from "../../requests";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizId, setQuizId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const location = useLocation();

  useEffect(() => {
    getQuizByID(location.state.id).then((response) => {
      console.log(response.data.questions);
      setQuestions(response.data.questions);
      setQuizTitle(response.data.title);
      setQuizId(response.data.id);
      setUserId(location.state.userId);
    });
  }, []);

  const handleAnswerSelection = (questionId, answer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answer,
    }));
    console.log(selectedAnswers);

    const postAnswerRequest = { questionId, answer, userId, quizId };

    submitQuizAnswers(postAnswerRequest).then((response) => {
      console.log(response);
      if (response.data.correct === true){
        setScore(score + 1);
        console.log(score)
      }
      else {
        console.log("F")
      }
    });

    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (currentQuestionIndex >= questions.length) {
    // All questions have been answered
    return <div>Quiz completed! Score: {score}</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div>{quizTitle}</div>
      <div className="questionElement" key={currentQuestion.id}>
        <div className="question">{currentQuestion.question}</div>

        <div className="answers">
          {currentQuestion.answers.map((answer, index) => (
            <label className="answerElement" key={index}>
              <input
                type="radio"
                name={`question_${currentQuestion.id}`}
                value={answer}
                checked={selectedAnswers[currentQuestion.id] === answer}
                onChange={() =>
                  handleAnswerSelection(currentQuestion.id, answer)
                }
              />
              {answer}
            </label>
          ))}
        </div>

        <div className="quizQuestionCount">
          {currentQuestionIndex + 1}/{questions.length}
        </div>
      </div>
    </div>
  );
}

export default Quiz;