import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Eye, Upload } from 'lucide-react';
import QuestionEditor from './QuestionEditor'; // adapte le chemin selon ton projet

const QuizEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [resultScreen, setResultScreen] = useState({
    successMessage: "Congratulations! You passed the quiz.",
    failureMessage: "Unfortunately, you did not pass. Try again!"
  });

  useEffect(() => {
    const data = location.state;
    if (data) {
      setQuizData({
        ...data,
        resultScreen: data.resultScreen ?? resultScreen
      });
      setQuizTitle(data.title || 'The principles of Deep Learning');
      if (data.resultScreen) setResultScreen(data.resultScreen);
    } else {
      const mockQuizData = {
        title: 'The principles of Deep Learning',
        questions: Array.from({ length: 4 }, (_, i) => ({
          id: `${i + 1}`,
          type: 'multiple-choice',
          question: 'What is the basic building block of a deep learning model?',
          choices: ['Decision Tree', 'Artificial Neuron', 'Support Vector', 'Genetic Algorithm'],
          correctAnswer: 1,
          points: 1,
          timeLimit: 2,
          required: true,
          allowMultipleAnswers: false,
          media: i === 0 ? {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop'
          } : undefined
        })),
        generationData: {},
        resultScreen: { ...resultScreen }
      };
      setQuizData(mockQuizData);
      setQuizTitle(mockQuizData.title);
      setResultScreen(mockQuizData.resultScreen);
    }
  }, [location.state]);

  const updateQuestion = (questionId, updatedQuestion) => {
    if (!quizData) return;
    setQuizData({
      ...quizData,
      questions: quizData.questions.map(q =>
        q.id === questionId ? updatedQuestion : q
      ),
      resultScreen
    });
  };

  const handleResultScreenChange = (key, value) => {
    const updated = { ...resultScreen, [key]: value };
    setResultScreen(updated);
    if (quizData) {
      setQuizData({
        ...quizData,
        resultScreen: updated
      });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handlePreview = () => {
    if (quizData) {
      navigate('/quiz-preview', {
        state: { ...quizData, title: quizTitle, resultScreen }
      });
    }
  };

  const handlePublish = () => {
    if (!quizData) {
      alert("Erreur : Quiz introuvable.");
      return;
    }

    const quizToPublish = {
      ...quizData,
      title: quizTitle,
      resultScreen
    };

    alert(`Quiz "${quizToPublish.title}" publié !\n\n✅ ${quizToPublish.resultScreen.successMessage}\n❌ ${quizToPublish.resultScreen.failureMessage}`);
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-black"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-500">Edited Just now</span>
            <input
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="border-none p-0 text-lg font-medium bg-transparent focus:ring-0 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-black">
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-black"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              <Upload className="w-4 h-4 mr-1" />
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0">
          <div className="p-4 space-y-2">
            {quizData.questions.map((question, index) => (
              <div
                key={question.id}
                className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {question.question.substring(0, 50)}...
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded"></div>
                      </div>
                      <span className="text-xs text-gray-500">Multiple choices</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Result Screen */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex flex-col gap-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <div className="w-3 h-3 border border-gray-400"></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Result Screen</div>
                  <div className="text-xs text-gray-500">Configure success/fail messages</div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Success Message:
                </label>
                <input
                  value={resultScreen.successMessage}
                  onChange={(e) => handleResultScreenChange('successMessage', e.target.value)}
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  placeholder="Enter a message for quiz pass"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Fail Message:
                </label>
                <input
                  value={resultScreen.failureMessage}
                  onChange={(e) => handleResultScreenChange('failureMessage', e.target.value)}
                  className="w-full border border-gray-300 px-2 py-1 rounded text-sm"
                  placeholder="Enter a message for quiz fail"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {quizData.questions.map((question, index) => (
            <QuestionEditor
              key={question.id}
              question={question}
              questionNumber={index + 1}
              onUpdate={(updated) => updateQuestion(question.id, updated)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizEditor;
