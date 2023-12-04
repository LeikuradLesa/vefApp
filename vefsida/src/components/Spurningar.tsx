import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface QuestionsPageProps {}

const Spurningar: React.FC<QuestionsPageProps> = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({});
  const [result, setResult] = useState<string | null>(null);
  const { bookId, kaflaId } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      const apiUrl = 'https://bilazon.pythonanywhere.com/read/Fjolsvarspurningar';

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            where: `bokID=${bookId} AND kaflaID=${kaflaId}`,
          }),
        });

        const data = await response.json();
        setQuestions(data.info);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [bookId, kaflaId]);

  const handleAnswerSelection = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionIndex]: answer,
    }));
  };

  const checkAnswers = () => { //Þarf að laga þetta feitt
    let allCorrect = true;
  
    for (let i = 0; i < questions.length; i++) {
      const currentQuestion = questions[i];
      const correctAnswer = String.fromCharCode('A'.charCodeAt(0) + i);
      const selectedAnswer = selectedAnswers[i] || null; // Handle the case where the answer is not selected
  
      console.log(`Question ${i + 1}: Correct Answer - ${correctAnswer}, Selected Answer - ${selectedAnswer}`);
  
      if (currentQuestion && selectedAnswer !== correctAnswer) {
        allCorrect = false;
      }
    }
  
    setResult(allCorrect ? 'All Correct!' : 'Some answers are incorrect!');
  };  

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.spurning}</h3>
          {['valkostur1', 'valkostur2', 'valkostur3', 'valkostur4'].map((option, optionIndex) => (
            <p key={optionIndex}>
              <label>
                <input
                  type="radio"
                  id={`question_${index}_${option}`}
                  name={`question_${index}`}
                  value={question[option]}
                  checked={selectedAnswers[index] === question[option]}
                  onChange={() => handleAnswerSelection(index, question[option])}
                />
                {question[option]}
              </label>
            </p>
          ))}
        </div>
      ))}
      <button onClick={checkAnswers}>Check Answers</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default Spurningar;