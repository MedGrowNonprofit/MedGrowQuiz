import React, { useState, useEffect } from 'react';
import './styles.css';

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
  }
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
  const [timer, setTimer] = useState(0);
  const [quizLocked, setQuizLocked] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [shuffledQuizData, setShuffledQuizData] = useState([]);

  useEffect(() => {
    setShuffledQuizData(shuffleArray(quizData));

    const savedTimestamp = localStorage.getItem('nextAvailableTime');
    const now = Date.now();

    if (savedTimestamp && now < parseInt(savedTimestamp)) {
      const remainingSeconds = Math.floor((parseInt(savedTimestamp) - now) / 1000);
      setTimer(remainingSeconds);
      setQuizLocked(true);
    } else {
      localStorage.removeItem('nextAvailableTime');
      setQuizLocked(false);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (quizLocked && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setQuizLocked(false);
            localStorage.removeItem('nextAvailableTime');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizLocked, timer]);

  const handleAnswer = (option) => {
    const current = shuffledQuizData[currentQuestion];
    const isCorrect = option === current.answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => [...prev, { ...current, selected: option }]);
    }

    setQuestionsAnswered(prev => prev + 1);

    if (questionsAnswered + 1 >= 5) {
      setCompleted(true);
      lockQuizForAnHour();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const lockQuizForAnHour = () => {
    const nextTime = Date.now() + 60 * 60 * 1000; // 1 hour
    localStorage.setItem('nextAvailableTime', nextTime.toString());
    setQuizLocked(true);
    setTimer(3600);
  };

  const renderResults = () => {
    return (
      <div className="results">
        <h2>Quiz Complete! 🎉</h2>
        <p><strong>You answered {score} out of 5 questions correctly!</strong></p>
        <p><strong>You raised ${score} for future medical students!</strong></p>

        {incorrectAnswers.length > 0 && (
          <div className="incorrect-answers">
            <h3>Questions You Missed:</h3>
            <ul>
              {incorrectAnswers.map((item, index) => (
                <li key={index}>
                  <strong>Q: </strong> {item.question}<br />
                  <strong>Your Answer: </strong> {item.selected}<br />
                  <strong>Correct Answer: </strong> {item.answer}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="timer">
          <p>Please come back in:</p>
          <h2>{Math.floor(timer / 60)}m {timer % 60}s</h2>
        </div>
      </div>
    );
  };

  if (quizLocked && !completed) {
    return (
      <div className="container">
        <h1>Welcome to MedGrow Quiz!</h1>
        <div>
          <p className="text-red-500 mb-2">
            Please come back in:
          </p>
          <h2>
            {Math.floor(timer / 60)}m {timer % 60}s
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Welcome to MedGrow Quiz!</h1>
      
      {completed ? (
        renderResults()
      ) : (
        <div>
          <h2 className="mb-4">
            {shuffledQuizData[currentQuestion]?.question}
          </h2>
          <div className="grid gap-2">
            {shuffledQuizData[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="btn"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}