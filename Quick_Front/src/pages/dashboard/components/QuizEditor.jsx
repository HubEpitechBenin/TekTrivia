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

const QuizEditor = ({ quizTitle, questions: initialQuestions, onBack, onPublish }) => {
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
    if (question && question.choices) {
      updateQuestion(questionId, {
        choices: [...question.choices, `Option ${question.choices.length + 1}`]
      });
    }
  };

  const removeChoice = (questionId, choiceIndex) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.choices && question.choices.length > 2) {
      const newChoices = question.choices.filter((_, index) => index !== choiceIndex);
      updateQuestion(questionId, {
        choices: newChoices,
        correctAnswer:
          typeof question.correctAnswer === 'number' && question.correctAnswer > choiceIndex
            ? question.correctAnswer - 1
            : question.correctAnswer
      });
    }
  };

  const updateChoice = (questionId, choiceIndex, value) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.choices) {
      const newChoices = [...question.choices];
      newChoices[choiceIndex] = value;
      updateQuestion(questionId, { choices: newChoices });
    }
  };

  const setCorrectAnswer = (questionId, answerIndex) => {
    updateQuestion(questionId, { correctAnswer: answerIndex });
  };

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                        <span className="font-medium text-gray-900">{quizTitle}</span>
                    </div>
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
                        onClick={() => onPublish({ title: quizTitle, questions })}
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
                            {question.question}
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
                        value={currentQuestion.question}
                        onChange={(e) => updateQuestion(currentQuestion.id, { question: e.target.value })}
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
                            {currentQuestion.choices?.map((choice, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <button
                                onClick={() => setCorrectAnswer(currentQuestion.id, index)}
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    currentQuestion.correctAnswer === index
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                                >
                                {currentQuestion.correctAnswer === index && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                                </button>
                                <input
                                type="text"
                                value={choice}
                                onChange={(e) => updateChoice(currentQuestion.id, index, e.target.value)}
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors outline-none"
                                placeholder={`Option ${index + 1}`}
                                />
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                                <GripVertical className="w-4 h-4 text-gray-400" />
                                </button>
                                {currentQuestion.choices && currentQuestion.choices.length > 2 && (
                                <button
                                    onClick={() => removeChoice(currentQuestion.id, index)}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                                )}
                            </div>
                            ))}
                        </div>

                        <button
                            onClick={() => addChoice(currentQuestion.id)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mt-3"
                        >
                            <Plus className="w-4 h-4" />
                            Add Answers
                        </button>
                        </div>

                        {/* Question Settings */}
                        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Randomize Order
                            </label>
                            <div className="relative">
                            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none appearance-none bg-white">
                                <option>Keep choices in current orders</option>
                                <option>Randomize choices</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimation time
                            </label>
                            <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={currentQuestion.timeLimit}
                                onChange={(e) => updateQuestion(currentQuestion.id, { timeLimit: parseInt(e.target.value) })}
                                className="w-16 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none text-center"
                            />
                            <span className="text-sm text-gray-600">Mins</span>
                            <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                            </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mark as point
                            </label>
                            <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={currentQuestion.points}
                                onChange={(e) => updateQuestion(currentQuestion.id, { points: parseInt(e.target.value) })}
                                className="w-16 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none text-center"
                            />
                            <span className="text-sm text-gray-600">Points</span>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
                ) : (
                /* Result Screen */
                <div className="p-6">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Result Screen Settings</h3>
                    <p className="text-gray-600 mb-6">Configure the messages shown to users when they complete the quiz.</p>
                    
                    <div className="space-y-6">
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Passing Message
                        </label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors outline-none"
                            placeholder="Congratulations! You passed the quiz."
                        />
                        </div>
                        
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Failing Message
                        </label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors outline-none"
                            placeholder="Don't worry! You can try again."
                        />
                        </div>
                    </div>
                    </div>
                </div>
                )}
            </div>
            </div>
        </div>
    </div>
  );
};

export default QuizEditor;
