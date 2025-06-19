// import React, { useState } from "react";
// import CustomButton from "./components/CustomButton";
// import { motion, AnimatePresence } from "framer-motion";
// import wrong from "./sounds/wrong0.mp3";
// import correct from "./sounds/right.mp3";
// import { useLocation } from 'react-router-dom';

// const correctSound = new Audio(correct);
// const wrongSound = new Audio(wrong);

// export default function QuizLab() {
//   const [score, setScore] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [answered, setAnswered] = useState(false);
//   const [finished, setFinished] = useState(false);

//   const { state } = useLocation();
//   const { questions, title } = state || {};

//   if (!questions) {
//     return <div>No quiz data available.</div>;
//   }

//   const current = questions[currentIndex];

//   console.log(current);

//   const handleAnswer = (index) => {
//     if (answered) return;
//     setSelected(index);
//     setAnswered(true);

//     if (current.answers[index].is_correct) {
//       setScore((s) => s + 1);
//       setShowExplanation(false);
//       correctSound.play();
//     } else {
//       setShowExplanation(true);
//       wrongSound.play();
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex + 1 < questions.length) {
//       setCurrentIndex((i) => i + 1);
//       setSelected(null);
//       setAnswered(false);
//       setShowExplanation(false);
//     } else {
//       setFinished(true);
//     }
//   };

//   const handleRestart = () => {
//     setScore(0);
//     setCurrentIndex(0);
//     setSelected(null);
//     setAnswered(false);
//     setShowExplanation(false);
//     setFinished(false);
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.4 }}
//     >
//       <div className="w-full max-w-7xl">
//         {!finished ? (
//           <>
//             {/* Header Score */}
//             <motion.div
//               className="flex justify-between items-center bg-gradient-to-r from-gray-200 to-gray-400 rounded-full px-8 py-4 mb-6 shadow-md"
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-black">{score}</p>
//                 <p className="text-sm text-gray-700">Score</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-black">
//                   {currentIndex + 1}/{questions.length}
//                 </p>
//                 <p className="text-sm text-gray-700">Questions</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-black">
//                   {Math.round((score / (currentIndex + 1)) * 100) || 0}%
//                 </p>
//                 <p className="text-sm text-gray-700">Réussite</p>
//               </div>
//             </motion.div>

//             {/* Carte Question */}
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentIndex}
//                 className="bg-white rounded-xl shadow-md p-6"
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="flex gap-2 mb-4">
//                   <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow">
//                     {current.theme || 'Category'}
//                   </span>
//                   <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold shadow">
//                     {current.difficulty || 'Difficulty'}
//                   </span>
//                 </div>

//                 <motion.h2
//                   className="text-center text-lg font-playfair font-medium mb-6"
//                   initial={{ y: 10, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   {current.text}
//                 </motion.h2>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {current.answers.map((opt, idx) => (
//                     <motion.button
//                       key={idx}
//                       onClick={() => handleAnswer(idx)}
//                       className={`py-4 px-6 rounded font-semibold text-left text-white shadow-md transition-all duration-300 hover:scale-105 ${
//                         selected === idx
//                           ? current.answers[idx].is_correct
//                             ? "bg-green-500 scale-105"
//                             : "bg-red-500 scale-105"
//                           : [
//                               "bg-blue-500",
//                               "bg-red-500",
//                               "bg-indigo-500",
//                               "bg-cyan-500",
//                             ][idx % 4]
//                       }`}
//                       disabled={answered}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       {String.fromCharCode(65 + idx)}. {opt.text}
//                     </motion.button>
//                   ))}
//                 </div>

//                 <AnimatePresence mode="wait">
//                   {showExplanation && (
//                     <motion.div
//                       className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <strong className="block mb-1">Explication :</strong>
//                       <p className="text-sm text-gray-700">
//                         {current.description || 'Description'}
//                       </p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//                 {answered && (
//                   <div className="mt-6 text-right">
//                     <CustomButton
//                       text={
//                         currentIndex + 1 < questions.length
//                           ? "Suivant"
//                           : "Terminer"
//                       }
//                       size="lg"
//                       textSize="text-lg"
//                       fontWeight="font-bold"
//                       color="bg-blue-500 hover:bg-blue-600"
//                       textColor="text-white"
//                       rounded="rounded-xl"
//                       onClick={handleNext}
//                     />
//                   </div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           </>
//         ) : (
//           <motion.div
//             className="flex flex-col items-center justify-center text-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-3xl font-bold mb-4">Quiz Terminé !</h2>
//             <p className="text-xl mb-2">
//               Votre score : {score}/{questions.length}
//             </p>
//             <p className="text-lg mb-6">
//               Taux de réussite : {Math.round((score / questions.length) * 100)}%
//             </p>
//             <CustomButton
//               text="Recommencer"
//               size="lg"
//               textSize="text-lg"
//               fontWeight="font-bold"
//               color="bg-green-500 hover:bg-green-600"
//               textColor="text-white"
//               rounded="rounded-xl"
//               onClick={handleRestart}
//             />
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

import React, { useState } from "react";
import CustomButton from "./components/CustomButton";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from 'react-router-dom';
import { Trophy, RotateCcw, Zap, Target, TrendingUp } from 'lucide-react';

import wrong from "./sounds/wrong0.mp3";
import correct from "./sounds/right.mp3";

// Mock audio objects since we can't access actual audio files
const correctSound = new Audio(correct);
const wrongSound = new Audio(wrong);

export default function QuizLab() {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const { state } = useLocation();
  const { questions, title } = state || {};

  // Mock data for demonstration
  const mockQuestions = [
    {
      text: "Quelle est la capitale de la France ?",
      theme: "Géographie",
      difficulty: "Facile",
      answers: [
        { text: "Londres", is_correct: false },
        { text: "Berlin", is_correct: false },
        { text: "Paris", is_correct: true },
        { text: "Madrid", is_correct: false }
      ],
      description: "Paris est la capitale et la plus grande ville de France."
    },
    {
      text: "Combien font 2 + 2 ?",
      theme: "Mathématiques",
      difficulty: "Très Facile",
      answers: [
        { text: "3", is_correct: false },
        { text: "4", is_correct: true },
        { text: "5", is_correct: false },
        { text: "6", is_correct: false }
      ],
      description: "2 + 2 = 4, c'est une addition basique."
    }
  ];

  const quizQuestions = questions || mockQuestions;
  const current = quizQuestions[currentIndex];

  const handleAnswer = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);

    if (current.answers[index].is_correct) {
      setScore((s) => s + 1);
      setShowExplanation(false);
      correctSound.play();
    } else {
      setShowExplanation(true);
      wrongSound.play();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelected(null);
    setAnswered(false);
    setShowExplanation(false);
    setFinished(false);
  };

  const progressPercentage = ((currentIndex + 1) / quizQuestions.length) * 100;
  const successRate = Math.round((score / (currentIndex + 1)) * 100) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100">
      <motion.div
        className="container mx-auto px-4 py-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {!finished ? (
          <>
            {/* Progress Bar */}
            <motion.div
              className="mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {title || 'Quiz Moderne'}
                </h1>
                <span className="text-sm font-medium text-gray-600">
                  {currentIndex + 1} / {quizQuestions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-6 h-6 text-indigo-500" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{score}</p>
                <p className="text-sm text-gray-600">Score</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{currentIndex + 1}</p>
                <p className="text-sm text-gray-600">Question</p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{successRate}%</p>
                <p className="text-sm text-gray-600">Réussite</p>
              </div>
            </motion.div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/30"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {current.theme || 'Catégorie'}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    current.difficulty === 'Facile' ? 'bg-green-100 text-green-700' :
                    current.difficulty === 'Moyen' ? 'bg-orange-100 text-orange-700' :
                    current.difficulty === 'Difficile' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {current.difficulty || 'Difficulté'}
                  </span>
                </div>

                {/* Question */}
                <motion.h2
                  className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {current.text}
                </motion.h2>

                {/* Answers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {current.answers.map((answer, idx) => {
                    const colors = [
                      'from-blue-500 to-blue-600',
                      'from-emerald-500 to-emerald-600',
                      'from-purple-500 to-purple-600',
                      'from-rose-500 to-rose-600'
                    ];
                    
                    let buttonClass = `bg-gradient-to-r ${colors[idx % 4]} text-white`;
                    let borderClass = '';
                    
                    if (answered && selected === idx) {
                      if (answer.is_correct) {
                        buttonClass = 'bg-gradient-to-r from-green-500 to-green-600 text-white';
                        borderClass = 'border-4 border-green-300';
                      } else {
                        buttonClass = 'bg-gradient-to-r from-red-500 to-red-600 text-white';
                        borderClass = 'border-4 border-red-300';
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`${buttonClass} ${borderClass} p-4 rounded-2xl font-medium text-left shadow-lg hover:shadow-xl transition-all duration-300 transform disabled:hover:scale-100`}
                        disabled={answered}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx + 0.3 }}
                        whileHover={!answered ? { scale: 1.05 } : {}}
                        whileTap={!answered ? { scale: 0.95 } : {}}
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 font-bold">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{answer.text}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      className="mb-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-white text-sm font-bold">!</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-2">Explication</h4>
                          <p className="text-amber-700 leading-relaxed">
                            {current.description || 'Aucune explication disponible.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next Button */}
                {answered && (
                  <motion.div
                    className="flex justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <CustomButton
                      text={currentIndex + 1 < quizQuestions.length ? "Question Suivante" : "Voir les Résultats"}
                      size="lg"
                      textSize="text-lg"
                      fontWeight="font-semibold"
                      color="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                      textColor="text-white"
                      rounded="rounded-2xl"
                      onClick={handleNext}
                    />
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          // Results Screen
          <motion.div
            className="flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/30 max-w-md"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Trophy className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Terminé !</h2>
              
              <div className="space-y-4 mb-8">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-indigo-600">
                    {score}/{quizQuestions.length}
                  </p>
                  <p className="text-sm text-gray-600">Questions correctes</p>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-emerald-600">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Taux de réussite</p>
                </div>
              </div>
              
              <CustomButton
                text="Recommencer le Quiz"
                size="lg"
                textSize="text-lg"
                fontWeight="font-semibold"
                color="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                textColor="text-white"
                rounded="rounded-2xl"
                onClick={handleRestart}
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

