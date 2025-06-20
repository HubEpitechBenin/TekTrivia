// import { useState } from 'react';
// import { Plus } from 'lucide-react';
// import Modal from '../../../components/layout/Modal';
// import CreateQuizModal from './CreateQuizModal';
// import QuizEditor from './QuizEditor';

// const CategoryFilter = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showEditor, setShowEditor] = useState(false);
//   const [quizData, setQuizData] = useState(null);

//   // Mock AI-generated questions based on user input
//   const generateMockQuestions = (data) => {
//     const baseQuestions = [
//       {
//         id: '1',
//         type: 'multiple-choice',
//         question: 'What is the basic building block of a deep learning model?',
//         choices: ['Decision Tree', 'Artificial Neuron', 'Support Vector', 'Genetic Algorithm'],
//         correctAnswer: 1,
//         timeLimit: 2,
//         points: 1
//       },
//       {
//         id: '2',
//         type: 'multiple-choice',
//         question: 'Which activation function is commonly used in hidden layers?',
//         choices: ['Sigmoid', 'ReLU', 'Tanh', 'Linear'],
//         correctAnswer: 1,
//         timeLimit: 2,
//         points: 1
//       },
//       {
//         id: '3',
//         type: 'multiple-choice',
//         question: 'What does backpropagation help with in neural networks?',
//         choices: ['Forward pass', 'Weight initialization', 'Gradient calculation', 'Data preprocessing'],
//         correctAnswer: 2,
//         timeLimit: 2,
//         points: 1
//       },
//       {
//         id: '4',
//         type: 'multiple-choice',
//         question: 'Which technique helps prevent overfitting in deep learning?',
//         choices: ['Dropout', 'Batch normalization', 'Data augmentation', 'All of the above'],
//         correctAnswer: 3,
//         timeLimit: 2,
//         points: 1
//       }
//     ];

//     return baseQuestions.slice(0, data.num_questions || data.questionCount || 2);
//   };

//   const handleGenerate = (data) => {
//     console.log('Quiz generation data:', data);

//     const questions = generateMockQuestions(data);

//     const title = data.title.length > 50
//       ? `${data.title.substring(0, 47)}...`
//       : data.title || 'Generated Quiz';

//     setQuizData({
//       title: title,
//       questions: questions
//     });

//     setIsModalOpen(false);
//     setShowEditor(true);
//   };

//   const handleBackToHome = () => {
//     setShowEditor(false);
//     setQuizData(null);
//   };

//   const handlePublish = (quiz) => {
//     console.log('Publishing quiz:', quiz);
//     alert('Quiz published successfully!');
//   };

//   if (showEditor && quizData) {
//     return (
//       <div className="w-full min-h-screen bg-white">
//       <QuizEditor
//         quizTitle={quizData.title}
//         questions={quizData.questions}
//         onBack={handleBackToHome}
//         onPublish={handlePublish}
//       />
//       </div>
//     );
//   }

//   const categories = [
//     { name: 'All categories', active: true },
//     { name: 'Mathematics', active: false },
//     { name: 'Game', active: false },
//     { name: 'Data Science', active: false },
//     { name: 'Cyber Security', active: false },
//   ];

//   return (
//     <div className="flex items-center justify-between mb-8">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore</h2>
//         <div className="flex items-center space-x-3">
//           {categories.map((category, index) => (
//             <button
//               key={index}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                 category.active
//                   ? 'bg-gray-900 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>
//       </div>
      
//       <div className="flex items-center space-x-4">
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
//         >
//           <Plus size={16} />
//           <span>Create a quiz</span>
//         </button>
//         <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
//           See All
//         </button>
//       </div>

//       {/* Modal */}
//       <CreateQuizModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onGenerate={handleGenerate}
//       />

//     </div>
//   );
// };

// export default CategoryFilter;

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../../../components/layout/Modal';
import CreateQuizModal from './CreateQuizModal';
import QuizEditor from './QuizEditor';
import { useNavigate } from 'react-router-dom';

const CategoryFilter = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock AI-generated questions based on user input
  const generateMockQuestions = (data) => {
    const baseQuestions = [
      {
        id: '1',
        type: 'multiple-choice',
        question: 'What is the basic building block of a deep learning model?',
        choices: ['Decision Tree', 'Artificial Neuron', 'Support Vector', 'Genetic Algorithm'],
        correctAnswer: 1,
        timeLimit: 2,
        points: 1
      },
      {
        id: '2',
        type: 'multiple-choice',
        question: 'Which activation function is commonly used in hidden layers?',
        choices: ['Sigmoid', 'ReLU', 'Tanh', 'Linear'],
        correctAnswer: 1,
        timeLimit: 2,
        points: 1
      },
      {
        id: '3',
        type: 'multiple-choice',
        question: 'What does backpropagation help with in neural networks?',
        choices: ['Forward pass', 'Weight initialization', 'Gradient calculation', 'Data preprocessing'],
        correctAnswer: 2,
        timeLimit: 2,
        points: 1
      },
      {
        id: '4',
        type: 'multiple-choice',
        question: 'Which technique helps prevent overfitting in deep learning?',
        choices: ['Dropout', 'Batch normalization', 'Data augmentation', 'All of the above'],
        correctAnswer: 3,
        timeLimit: 2,
        points: 1
      }
    ];

    return data.questions;

    // return baseQuestions.slice(0, data.questions.length || data.questionCount || 2);
  };

  const handleGenerate = (data) => {
    console.log('Quiz generation data:', data);

    const questions = generateMockQuestions(data.quiz);

    const title = data.quiz.title && data.quiz.title.length > 50
      ? `${data.quiz.title.substring(0, 47)}...`
      : data.quiz.title || 'Generated Quiz';

    setQuizData({
      id: data.quiz.id,
      title: title,
      description: data.quiz.description,
      difficulty: data.quiz.difficulty,
      questions: questions
    });

    setIsModalOpen(false);
    setShowEditor(true);
    setShowSuccessModal(true);
  };

  const handleBackToHome = () => {
    setShowEditor(false);
    setQuizData(null);
  };

  const handlePublish = async (quiz) => {
    try {
      // Extraction des infos selon le format demandé
      const question_id = quiz.questions.map(q => q.id);
      const question_text = {};
      const answer_id = [];
      const answer_text = {};

      quiz.questions.forEach(question => {
        question_text[question.id] = question.text;

        question.answers.forEach(answer => {
          answer_id.push(answer.id);
          answer_text[answer.id] = answer.text;
        });
      });

      const payload = {
        title: quiz.title, 
        question_id,
        question_text,
        answer_id,
        answer_text,
      };

      const response = await fetch(`/api/squiz/ai/${quiz.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      const updatedQuiz = await response.json();
      console.log('Quiz mis à jour avec succès :', updatedQuiz);
      alert('Quiz publié avec succès !');
      handleBackToHome();
    } catch (error) {
      console.error('Erreur lors de la publication du quiz :', error);
      alert('Échec de la publication du quiz.');
    }
  };


  if (showEditor && quizData) {
    return (
      // <div className="relative w-full min-h-screen bg-white">
      //   {/* Success Modal */}
      //   {showSuccessModal && (
      //     <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      //       <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
      //         <h3 className="text-lg font-semibold text-green-600 mb-2">Quiz Ready!</h3>
      //         <p className="text-gray-700 mb-4">
      //           Your quiz <strong>{quizData.title}</strong> has been generated successfully 🎉
      //         </p>
      //         <button
      //           onClick={() => setShowSuccessModal(false)}
      //           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
      //         >
      //           OK
      //         </button>
      //       </div>
      //     </div>
      //   )}


      <QuizEditor
        quizId={quizData.id}
        quizDifficulty={quizData.difficulty}
        quizDescription={quizData.description}
        quizTitle={quizData.title}
        questions={quizData.questions}
        onBack={handleBackToHome}
        onPublish={handlePublish}
      />
      // </div>
    );
  }

  const categories = [
    { name: 'All categories', active: true },
    { name: 'Mathematics', active: false },
    { name: 'Game', active: false },
    { name: 'Data Science', active: false },
    { name: 'Cyber Security', active: false },
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore</h2>
        <div className="flex items-center space-x-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category.active
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus size={16} />
          <span>Create a quiz</span>
        </button>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          See All
        </button>
      </div>

      {/* Modal */}
      <CreateQuizModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerate}
      />
    </div>
  );
};

export default CategoryFilter;

