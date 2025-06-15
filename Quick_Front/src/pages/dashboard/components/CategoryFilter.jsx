import { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../../../components/layout/Modal';
import CreateQuizModal from './CreateQuizModal';
import QuizEditor from './QuizEditor';

const CategoryFilter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [quizData, setQuizData] = useState(null);

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

    return baseQuestions.slice(0, data.questionCount);
  };

  const handleGenerate = (data) => {
    console.log('Quiz generation data:', data);

    const questions = generateMockQuestions(data);

    const title = data.topic.length > 50
      ? `${data.topic.substring(0, 47)}...`
      : data.topic || 'Generated Quiz';

    setQuizData({
      title: title,
      questions: questions
    });

    setIsModalOpen(false);
    setShowEditor(true);
  };

  const handleBackToHome = () => {
    setShowEditor(false);
    setQuizData(null);
  };

  const handlePublish = (quiz) => {
    console.log('Publishing quiz:', quiz);
    alert('Quiz published successfully!');
  };

  if (showEditor && quizData) {
    return (
      <QuizEditor
        quizTitle={quizData.title}
        questions={quizData.questions}
        onBack={handleBackToHome}
        onPublish={handlePublish}
      />
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
