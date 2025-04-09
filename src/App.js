import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';

// 100 quiz data
const quizData = [
  {
    question: "Which organ is responsible for pumping blood throughout the body?",
    options: ["Lungs", "Brain", "Heart", "Liver"],
    answer: "Heart"
  },
  {
    question: "What does a stethoscope help doctors do?",
    options: ["Take blood samples", "Listen to the heart and lungs", "Perform surgery", "Check vision"],
    answer: "Listen to the heart and lungs"
  },
  {
    question: "True or False: Nurses can specialize in surgery.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    question: "Which vitamin is primarily responsible for helping our bodies absorb calcium?",
    options: ["Vitamin A", "Vitamin D", "Vitamin C", "Vitamin B12"],
    answer: "Vitamin D"
  },
  {
    question: "What part of the body produces insulin?",
    options: ["Liver", "Stomach", "Pancreas", "Lungs"],
    answer: "Pancreas"
  },
  {
    question: "What is the primary purpose of the red blood cells in our body?",
    options: ["Transport oxygen", "Fight infection", "Carry nutrients", "Digest food"],
    answer: "Transport oxygen"
  },
  {
    question: "True or False: The heart has four chambers.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    question: "Which system in the body is responsible for fighting infections?",
    options: ["Nervous system", "Digestive system", "Immune system", "Respiratory system"],
    answer: "Immune system"
  },
  {
    question: "Which of these is not a function of the liver?",
    options: ["Detoxification", "Blood sugar regulation", "Producing insulin", "Bile production"],
    answer: "Producing insulin"
  },
  {
    question: "What does an X-ray help doctors examine?",
    options: ["Soft tissues", "Bones", "Blood flow", "Nerve function"],
    answer: "Bones"
  },
  {
    question: "What part of the brain controls voluntary movements?",
    options: ["Cerebellum", "Medulla", "Cerebrum", "Hypothalamus"],
    answer: "Cerebrum"
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Lung"],
    answer: "Skin"
  },
  {
    question: "True or False: The human body has 206 bones.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    question: "What organ is primarily responsible for digestion?",
    options: ["Liver", "Stomach", "Pancreas", "Kidneys"],
    answer: "Stomach"
  },
  {
    question: "Which type of muscle is found in the heart?",
    options: ["Skeletal muscle", "Smooth muscle", "Cardiac muscle", "Voluntary muscle"],
    answer: "Cardiac muscle"
  },
  {
    question: "True or False: The appendix has no known function.",
    options: ["True", "False"],
    answer: "False"
  },
  {
    question: "What is the purpose of the white blood cells?",
    options: ["Transport oxygen", "Fight infections", "Regulate metabolism", "Store energy"],
    answer: "Fight infections"
  },
  {
    question: "What is the term for a doctor who specializes in children's health?",
    options: ["Cardiologist", "Pediatrician", "Neurologist", "Gynecologist"],
    answer: "Pediatrician"
  },
  {
    question: "What does the term 'neurology' refer to?",
    options: ["Study of the heart", "Study of the lungs", "Study of the brain and nervous system", "Study of bones"],
    answer: "Study of the brain and nervous system"
  },
  {
    question: "True or False: A heart attack occurs when blood flow to the heart muscle is blocked.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    question: "What is the most common blood type?",
    options: ["A", "B", "AB", "O"],
    answer: "O"
  },
  {
    question: "Which part of the body is affected by asthma?",
    options: ["Lungs", "Heart", "Kidneys", "Stomach"],
    answer: "Lungs"
  },
  {
    question: "What is the function of the kidneys?",
    options: ["Regulate blood sugar", "Filter waste from blood", "Produce insulin", "Control digestion"],
    answer: "Filter waste from blood"
  },
  // Add more questions here up to 100!
  {
    question: "What does MRI stand for?",
    options: ["Magnetic Resistance Imaging", "Magnetic Resonance Imaging", "Molecular Radiation Imaging", "Medical Radio Imaging"],
    answer: "Magnetic Resonance Imaging"
  },
  {
    question: "True or False: A dentist can perform surgeries.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    question: "Which of these is not a type of doctor?",
    options: ["Orthopedic", "Pediatric", "Agricultural", "Cardiologist"],
    answer: "Agricultural"
  },
  {
    question: "What is the main function of platelets?",
    options: ["Fight infections", "Clot blood", "Transport oxygen", "Produce red blood cells"],
    answer: "Clot blood"
  },
  {
    question: "What is a common method used to test for bone fractures?",
    options: ["CT scan", "X-ray", "MRI", "Ultrasound"],
    answer: "X-ray"
  },
  // Repeat the pattern above for the rest of your 100 questions.
];

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [questionLimitReached, setQuestionLimitReached] = useState(false);
  const [timer, setTimer] = useState(0); // Track time remaining
  const [timerActive, setTimerActive] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0); // Track questions answered

  // Initialize quiz with shuffled questions
  const shuffledQuizData = shuffleArray(quizData);

  // Check for saved timer and questions answered from localStorage
  useEffect(() => {
    const savedTimer = localStorage.getItem('quizTimer');
    const savedLimitReached = localStorage.getItem('questionLimitReached') === 'true';
    const savedQuestionsAnswered = Number(localStorage.getItem('questionsAnswered')) || 0;

    if (savedTimer && savedLimitReached) {
      setTimer(Number(savedTimer));
      setQuestionLimitReached(true);
      setQuestionsAnswered(savedQuestionsAnswered);
    }
  }, []);

  // Start the timer and set up localStorage
  useEffect(() => {
    if (timerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            setTimerActive(false);
            setQuestionLimitReached(false);
            localStorage.removeItem('quizTimer');
            localStorage.removeItem('questionLimitReached');
          } else {
            localStorage.setItem('quizTimer', newTime);
          }
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive, timer]);

  const handleAnswer = (option) => {
    const current = shuffledQuizData[currentQuestion];
    const isCorrect = option === current.answer;

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setIncorrectAnswers([...incorrectAnswers, { ...current, selected: option }]);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < shuffledQuizData.length && questionsAnswered < 5) {
      setCurrentQuestion(nextQuestion);
      setQuestionsAnswered(questionsAnswered + 1);
      localStorage.setItem('questionsAnswered', questionsAnswered + 1);
    } else {
      setCompleted(true);
      setQuestionLimitReached(true);
      localStorage.setItem('questionLimitReached', 'true');
      setTimer(60 * 60); // 1 hour timer
      setTimerActive(true);
      localStorage.setItem('quizTimer', 60 * 60); // Save 1 hour timer to localStorage
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 text-center flex flex-col justify-center items-center min-h-screen">
      <h1>Welcome to MedGrow Quiz!</h1>
      {!completed && !questionLimitReached ? (
        <div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{shuffledQuizData[currentQuestion].question}</h2>
            <div className="grid gap-2">
              {shuffledQuizData[currentQuestion].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)} className="bg-blue-500 text-white p-2 rounded">
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">You did it! 🎉</h2>
          <p>You answered {score} out of {shuffledQuizData.length} questions correctly.</p>
          <p>That means ${score} will be donated to support future medical students!</p>
          <div>
            {incorrectAnswers.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">What You Missed:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {incorrectAnswers.map((item, index) => (
                    <li key={index}>
                      <strong>Q:</strong> {item.question}<br />
                      <strong>Your Answer:</strong> {item.selected}<br />
                      <strong>Correct Answer:</strong> {item.answer}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {questionLimitReached && !timerActive && (
        <div>
          <p>You have answered 5 questions. Please come back after an hour to answer more questions.</p>
        </div>
      )}

      {timerActive && (
        <div>
          <h3>Time remaining to answer again: {Math.floor(timer / 60)} minutes {timer % 60} seconds</h3>
        </div>
      )}
    </div>
  );
}
