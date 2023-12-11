import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import './App.css';
interface Question {
  kaflaID: number;
  rettsvar: string;
  spurning: string;
  spurning_ID: number;
  v_nafnbokar: string;
  valkostur1: string;
  valkostur2: string;
  valkostur3: string;
  valkostur4: string;
}

const Spurningar: React.FC = () => {
  const { v_nafnbokar, kaflaID, nafn } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const v_nafnbokar_decoded = decodeURIComponent(v_nafnbokar || "bruh");
        const response = await fetch('https://bilazon.pythonanywhere.com/read/Fjolsvarspurningar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            where: `v_nafnbokar='${v_nafnbokar_decoded}' AND kaflaID=${kaflaID}`,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setQuestions(result.info);
          // Reset selected answers and result when questions change
          setSelectedAnswers({});
          setResult(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [v_nafnbokar, kaflaID]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setSelectedAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };

  const checkAnswers = async () => {
    try {
      const newResult = questions.every((question) => {
        const selectedAnswer = selectedAnswers[question.spurning_ID];
        return selectedAnswer === question[`valkostur${parseInt(question.rettsvar, 10) + 1}`];
      });

      setResult(newResult);

      if (newResult) {
        // Make a POST request here
        const v_nafnbokar_decoded = decodeURIComponent(v_nafnbokar || "bruh");

        await fetch('https://bilazon.pythonanywhere.com/change/userProgress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            where: `notendanafn='${nafn}' AND v_nafnbokar='${v_nafnbokar_decoded}'`,
            kaflaID: parseInt(kaflaID || "1", 10) + 1, // Convert kaflaID to integer
          }),
        });

        // Navigate to "/Velgert" after the POST request
        navigate("/Velgert", { state: { username: nafn } });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="spurningar-container">
      
      <h1 className='title'>{v_nafnbokar}</h1>
      {questions.map((question) => (
        <div key={question.spurning_ID} className="question-container">
          <p className="question-text">{question.spurning}</p>
          <ul className="answer-options">
            {[1, 2, 3, 4].map((index) => (
              <li key={index} className="answer-option">
                <label>
                  <input
                    type="radio"
                    name={`question_${question.spurning_ID}`}
                    value={question[`valkostur${index}`]}
                    checked={selectedAnswers[question.spurning_ID] === question[`valkostur${index}`]}
                    onChange={() => handleAnswerChange(question.spurning_ID, question[`valkostur${index}`])}
                  />
                  {question[`valkostur${index}`]}
                </label>
              </li>
            ))}
          </ul>
          <hr className="question-divider" />
        </div>
      ))}
      <button className="check-answers-button" onClick={checkAnswers}>Check Answers</button>
      {result !== null && (
                <p className="result-message">{result ? 'Öll svörin voru rétt! Vel Gert! :)' : 'Eitthvað var vitlaust! :('}</p>
              )}
            </div>
          );
        };

        export default Spurningar;
