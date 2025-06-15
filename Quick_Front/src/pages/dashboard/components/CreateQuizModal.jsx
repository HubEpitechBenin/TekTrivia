import React, { useState } from 'react';
import { X, FileText, Globe, Upload, ChevronDown, Plus, Minus } from 'lucide-react';

const CreateQuizModal = ({ isOpen, onClose, onGenerate }) => {
  const [selectedMethod, setSelectedMethod] = useState('text');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');
  const [quizType, setQuizType] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generationMethods = [
    {
      id: 'text',
      title: 'Generate from text',
      description: 'Use AI to generate quiz questions and content based on textual input',
      icon: FileText,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100'
    },
    {
      id: 'url',
      title: 'Convert URL To Quiz',
      description: 'Use AI to automatically convert content from a given URL into quiz questions',
      icon: Globe,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100'
    },
    {
      id: 'document',
      title: 'Upload a document',
      description: 'Upload a PDF or Word that contains educational content for AI to generate',
      icon: Upload,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100'
    }
  ];

  const quizTypes = [
    'Multiple Choice',
    'True/False',
    'Short Answer',
    'Fill in the Blank',
    'Matching',
    'Essay Questions'
  ];

  const difficultyLevels = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'expert', label: 'Expert' }
  ];

  const getTopicConfig = () => {
    switch (selectedMethod) {
      case 'text':
        return {
          label: 'Topic',
          placeholder: 'Enter your topic or paste text content here...',
          inputType: 'textarea'
        };
      case 'url':
        return {
          label: 'URL',
          placeholder: 'https://example.com/article-to-convert',
          inputType: 'input'
        };
      case 'document':
        return {
          label: 'Document',
          placeholder: 'Click to upload PDF or Word document',
          inputType: 'file'
        };
      default:
        return {
          label: 'Topic',
          placeholder: 'Fill Topic Question',
          inputType: 'input'
        };
    }
  };

  const topicConfig = getTopicConfig();

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setTopic('');
  };

  const handleGenerate = () => {
    if (!topic.trim() || !quizType) return;

    setIsGenerating(true);

    const data = {
      method: selectedMethod,
      topic: topic.trim(),
      difficulty,
      quizType,
      questionCount
    };

    setTimeout(() => {
      onGenerate(data);
      setIsGenerating(false);
      onClose();
    }, 2000);
  };

  const handleCountChange = (delta) => {
    setQuestionCount(Math.max(1, Math.min(50, questionCount + delta)));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create with AI</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {generationMethods.map((method) => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;

                return (
                  <button
                    key={method.id}
                    onClick={() => handleMethodChange(method.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-purple-200 bg-purple-50 ring-2 ring-purple-100'
                        : `${method.borderColor} ${method.bgColor} ${method.hoverBg}`
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-purple-100' : 'bg-white'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isSelected ? 'text-purple-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium mb-1 ${
                          isSelected ? 'text-purple-900' : 'text-gray-900'
                        }`}>
                          {method.title}
                        </h3>
                        <p className={`text-sm ${
                          isSelected ? 'text-purple-700' : 'text-gray-600'
                        }`}>
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">What kind of question do you want?</h3>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                  {topicConfig.label}
                </label>
                {topicConfig.inputType === 'textarea' ? (
                  <textarea
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={topicConfig.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-colors outline-none resize-none"
                  />
                ) : topicConfig.inputType === 'file' ? (
                  <div className="relative">
                    <input
                      id="topic"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setTopic(file.name);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-300 transition-colors cursor-pointer bg-gray-50 hover:bg-purple-50">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Upload className="w-5 h-5" />
                        <span>{topic || topicConfig.placeholder}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <input
                    id="topic"
                    type="url"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={topicConfig.placeholder}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-colors outline-none"
                  />
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Difficulty Level</h4>
                <div className="flex gap-2">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setDifficulty(level.id)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        difficulty === level.id
                          ? 'border-purple-200 bg-purple-50 text-purple-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Quiz type</h4>
                <p className="text-sm text-gray-500 mb-3">Quiz type and amount of question</p>

                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-300 transition-colors"
                    >
                      <span className={quizType ? 'text-gray-900' : 'text-gray-500'}>
                        {quizType || 'Select quiz type'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                        {quizTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              setQuizType(type);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                    <button
                      onClick={() => handleCountChange(-1)}
                      className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="w-16 h-12 flex items-center justify-center border-x border-gray-200">
                      <span className="font-medium text-gray-900">{questionCount}</span>
                    </div>
                    <button
                      onClick={() => handleCountChange(1)}
                      className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || !quizType || isGenerating}
            className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;
