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
      if (response.data.correct === true) {
        setScore(score + 1);
        console.log(score);
      } else {
        console.log("F");
      }
    });

    // Move to the next question
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1000); // Change the delay time as desired
    };

  if (currentQuestionIndex >= questions.length) {
    // All questions have been answered
    return <div className="quiz final-message">
      <div className="message-parts">
        <div>Quiz completed! </div>
        <div>Score: {score}/{questions.length}</div>
      </div>
    </div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz">
      <div className="play-quiz-title">{quizTitle}</div>
      <div className="questionElement" key={currentQuestion.id}>
        <div className="question">{currentQuestion.question}</div>

        <div className="answers">
          {currentQuestion.answers.map((answer, index) => (
            <button
              className={`answerElement ${
                selectedAnswers[currentQuestion.id] === answer ? "selected" : ""
              }`}
              key={index}
              onClick={() =>
                handleAnswerSelection(currentQuestion.id, answer)
              }
            >
              {answer}
            </button>
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