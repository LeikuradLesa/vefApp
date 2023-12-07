import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const { v_nafnbokar, kaflaID } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<boolean | null>(null);

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

  const checkAnswers = () => {
    const newResult = questions.every((question) => {
      const selectedAnswer = selectedAnswers[question.spurning_ID];
      return selectedAnswer === question[`valkostur${parseInt(question.rettsvar, 10) + 1}`];
    });

    setResult(newResult);
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.spurning_ID}>
          <p>{question.spurning}</p>
          <ul>
            {[1, 2, 3, 4].map((index) => (
              <li key={index}>
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
          <hr />
        </div>
      ))}
      <button onClick={checkAnswers}>Check Answers</button>
      {result !== null && (
        <p>{result ? 'All answers are correct!' : 'Some answers are incorrect.'}</p>
      )}
    </div>
  );
};

export default Spurningar;