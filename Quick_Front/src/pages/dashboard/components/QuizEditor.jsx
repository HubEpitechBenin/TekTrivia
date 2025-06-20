import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Settings, 
  Eye, 
  Search, 
  GripVertical, 
  Plus, 
  Trash2, 
  ChevronDown,
  Image,
  Video,
  HelpCircle,
  MoreHorizontal,
  Award
} from 'lucide-react';

const QuizEditor = ({ quizId, quizDifficulty, quizDescription, quizTitle, questions: initialQuestions, onBack, onPublish }) => {
  const [quizTitleM, setquizTitleM] = useState(quizTitle);
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [showResultScreen, setShowResultScreen] = useState(false);

  const currentQuestion = questions.find(q => q.id === selectedQuestion);
  const currentIndex = questions.findIndex(q => q.id === selectedQuestion);

  const updateQuestion = (questionId, updates) => {
    setQuestions(prev =>
      prev.map(q => (q.id === questionId ? { ...q, ...updates } : q))
    );
  };

  const addChoice = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.answers) {
      updateQuestion(questionId, {
        answers: [
          ...question.answers,
          { text: `Option ${question.answers.length + 1}`, is_correct: false }
        ]
      });
    }
  };

  const removeChoice = (questionId, choiceIndex) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.answers && question.answers.length > 2) {
      const newChoices = question.answers.filter((_, index) => index !== choiceIndex);
      updateQuestion(questionId, {
        answers: newChoices,
      });
    }
  };

  const updateChoice = (questionId, choiceIndex, newChoice) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.answers) {
      const newAnswers = [...question.answers];
      newAnswers[choiceIndex] = newChoice;
      updateQuestion(questionId, { answers: newAnswers });
    }
  };

  const setCorrectAnswer = (questionId, answerIndex) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const updatedAnswers = question.answers.map((ans, idx) => ({
      ...ans,
      is_correct: idx === answerIndex,
    }));

    updateQuestion(questionId, { answers: updatedAnswers });
  };

  const filteredQuestions = questions.filter(q =>
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity">
        <div className="min-h-screen bg-gray-100 flex">

          {/* Left Sidebar */}
          <div className="w-96 bg-white border-r border-gray-200 flex flex-col">

            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={onBack}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-600" />
                </button>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Edited Just now</div>
                  <input
                    type="text"
                    value={quizTitleM}
                    onChange={e => setquizTitleM(e.target.value)}
                    className="text-lg font-semibold text-gray-900 w-full border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder={quizTitleM || 'Vide'}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                    <Settings className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="flex items-center gap-1 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => onPublish({ id: quizId, title: quizTitleM, description: quizDescription, difficulty: quizDifficulty, questions })}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Publish
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors outline-none text-sm"
                />
              </div>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto">
              {filteredQuestions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => {
                    setSelectedQuestion(question.id);
                    setShowResultScreen(false);
                  }}
                  className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    selectedQuestion === question.id && !showResultScreen ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate mb-1">
                        {question.text}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-sm bg-gray-300 flex items-center justify-center">
                            <span className="text-[10px] font-medium">MC</span>
                          </div>
                          Multiple choices
                        </div>
                      </div>
                    </div>
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
              ))}

              {/* Result Screen Option */}
              <button
                onClick={() => setShowResultScreen(true)}
                className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  showResultScreen ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <Award className="w-3 h-3 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Result Screen
                    </div>
                    <div className="text-xs text-gray-500">
                      Set your passed/failed message
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-gray-100">
            {!showResultScreen && currentQuestion ? (
              <div className="h-full overflow-y-auto">
                {/* Question Header */}
                <div className="bg-white p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
                        <div className="w-4 h-4 bg-gray-300 rounded flex items-center justify-center">
                          <span className="text-[10px] font-medium">MC</span>
                        </div>
                        <span className="text-sm text-gray-700">Multiple choices</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        Required
                        <div className="relative">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-10 h-6 bg-green-500 rounded-full peer-focus:ring-2 peer-focus:ring-green-100 transition-colors">
                            <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-5 transition-transform"></div>
                          </div>
                        </div>
                      </label>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">?</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">Question {currentIndex + 1}*</span>
                  </div>

                  <input
                    type="text"
                    value={currentQuestion.text}
                    onChange={(e) => updateQuestion(currentQuestion.id, { text: e.target.value })}
                    className="w-full text-lg font-medium text-gray-900 border-none outline-none bg-transparent placeholder-gray-400 mb-4"
                    placeholder="Enter your question here..."
                  />

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Image className="w-4 h-4" />
                      Image
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Video className="w-4 h-4" />
                      Video
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <HelpCircle className="w-4 h-4" />
                      Help
                    </button>
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-700">Choices*</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Multiple answer</span>
                          <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                            <div className="w-4 h-4 bg-white rounded-full shadow absolute top-1 left-1"></div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {currentQuestion.answers?.map((choice, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <button
                              onClick={() => setCorrectAnswer(currentQuestion.id, index)}
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                choice.is_correct
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {choice.is_correct && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </button>

                            <input
                              type="text"
                              value={choice.text}
                              onChange={(e) =>
                                updateChoice(currentQuestion.id, index, {
                                  ...choice,
                                  text: e.target.value,
                                })
                              }
                              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors outline-none"
                              placeholder={`Option ${index + 1}`}
                            />

                            {/* Bouton supprimer */}
                            {currentQuestion.answers.length > 2 && (
                              <button
                                onClick={() => removeChoice(currentQuestion.id, index)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-100 transition-colors"
                                title="Supprimer cette réponse"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => addChoice(currentQuestion.id)}
                        className="mt-4 flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add choice
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Explanation (optional)
                      </label>
                      <textarea
                        rows={3}
                        value={currentQuestion.explanation || ''}
                        onChange={(e) => updateQuestion(currentQuestion.id, { explanation: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors outline-none"
                        placeholder="Explain the correct answer..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col p-6 bg-white border-l border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Result Screen</h3>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Pass Message
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors outline-none mb-6"
                  placeholder="Message displayed on passing the quiz..."
                />
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Fail Message
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors outline-none"
                  placeholder="Message displayed on failing the quiz..."
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizEditor;
