import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';

export function ChapterTest() {
    const { course_id, chap_id } = useParams();
    const [questiondata, setQuestiondata] = useState(null);
    const [userAnswers, setUserAnswers] = useState({}); // 存學生選的答案

    // 抓該章節的題目
    useEffect(() => {
        fetch(`http://localhost/getchaptertest.php?course_id=${course_id}&chap_id=${chap_id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.log(data.error);
              return;
            }
    
            setQuestiondata(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    const handleAnswerChange = (questionId, option) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: option,
        });
    };
    const [score, setScore] = useState(0);
    let currentScore =0;
    const handleSubmit = () => {
        const userScores = {}; // 紀錄使用者答案是否正確

        // 遍歷該章節所有題目(questiondata)，並和使用者的答案做比對
        questiondata.forEach((question) => {
          const questionId = question.question_id;
          const userAnswer = userAnswers[questionId];
          const correctAnswer = question.answer;
          console.log(userAnswers)

          if (userAnswer === correctAnswer) {
            userScores[questionId] = '正確';
            currentScore++;
          } else {
            userScores[questionId] = '錯誤';
          }
        });
        
        console.log("Score：", userScores);
        setScore(currentScore);
      };
      

    if (questiondata == null) {
      return <div>正在加载...</div>;
    }

    return (
      <div className="wordcardinfo">
        <h3>Course ID: {course_id}</h3>
        <h3>Chap ID: {chap_id}</h3>

        {questiondata.map((question, index) => (
          <div key={question.question_id}>
            <h3>{index + 1}. {question.question_describe}</h3>
            <h4>
              (A) {question.option1} <input
                type="radio"
                name={`question_${question.question_id}`}
                value={question.option1}
                onChange={() => handleAnswerChange(question.question_id, question.option1)}
              />
              <br/> (B) {question.option2} <input
                type="radio"
                name={`question_${question.question_id}`}
                value={question.option2}
                onChange={() => handleAnswerChange(question.question_id, question.option2)}
              />
              <br/> (C) {question.option3} <input
                type="radio"
                name={`question_${question.question_id}`}
                value={question.option3}
                onChange={() => handleAnswerChange(question.question_id, question.option3)}
              />
              <br/> (D) {question.option4} <input
                type="radio"
                name={`question_${question.question_id}`}
                value={question.option4}
                onChange={() => handleAnswerChange(question.question_id, question.option4)}
              />
            </h4>
          </div>
        ))}

        <button onClick={handleSubmit}>Submit</button>

        
        <div>
          <h3>使用者選的答案:</h3>
          {Object.entries(userAnswers).map(([questionId, answer], index) => (
            <p key={index}>
              Question {index+1}: {answer}
            </p>
          ))}
          <p>Score：{score}</p>
        </div>
      </div>
    );
}
