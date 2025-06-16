import React, { useState } from 'react';
import { X, FileText, Link, Upload, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuizCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizCreationModal = ({ isOpen, onClose }: QuizCreationModalProps) => {
  const [selectedOption, setSelectedOption] = useState('text');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');
  const [quizType, setQuizType] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  
  // Text generation state
  const [textContent, setTextContent] = useState('');
  
  // URL generation state
  const [urlInput, setUrlInput] = useState('');
  
  // Document upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (allowedTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        alert('Please upload a PDF, Word document, or text file.');
      }
    }
  };

  const handleGenerate = () => {
    let generationData = {
      selectedOption,
      topic,
      difficulty,
      quizType,
      questionCount
    };

    if (selectedOption === 'text') {
      console.log('Generating quiz from text:', { ...generationData, textContent });
    } else if (selectedOption === 'url') {
      console.log('Generating quiz from URL:', { ...generationData, urlInput });
    } else if (selectedOption === 'document') {
      console.log('Generating quiz from document:', { ...generationData, uploadedFile });
    }
    
    // Simuler la génération de quiz et rediriger vers l'éditeur
    const mockQuizData = {
      title: 'The principles of Deep Learning',
      questions: Array.from({ length: questionCount }, (_, index) => ({
        id: `${index + 1}`,
        type: quizType as 'multiple-choice' | 'true-false' | 'short-answer' | 'essay',
        question: `What is the basic building block of a deep learning model? (Question ${index + 1})`,
        choices: quizType === 'multiple-choice' ? [
          'Decision Tree',
          'Artificial Neuron',
          'Support Vector',
          'Genetic Algorithm'
        ] : undefined,
        correctAnswer: quizType === 'multiple-choice' ? 1 : 'Sample answer',
        points: 1,
        timeLimit: 2,
        required: true
      })),
      generationData
    };

    // Fermer la modal et naviguer vers l'éditeur
    onClose();
    
    // Utiliser setTimeout pour permettre à la modal de se fermer avant la navigation
    setTimeout(() => {
      window.location.href = '/quiz-editor';
      // Note: Dans une vraie app, on utiliserait useNavigate hook avec state
      // navigate('/quiz-editor', { state: mockQuizData });
    }, 100);
  };

  const renderGenerationInput = () => {
    switch (selectedOption) {
      case 'text':
        return (
          <div className="space-y-3">
            <Label htmlFor="text-content" className="text-sm font-medium">
              Enter your text content
            </Label>
            <Textarea
              id="text-content"
              placeholder="Paste or type the text content you want to generate quiz questions from..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              className="min-h-[120px] w-full resize-none"
            />
          </div>
        );
      
      case 'url':
        return (
          <div className="space-y-3">
            <Label htmlFor="url-input" className="text-sm font-medium">
              Enter website URL
            </Label>
            <Input
              id="url-input"
              type="url"
              placeholder="https://example.com/article"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Enter a URL to extract content and generate quiz questions from the webpage
            </p>
          </div>
        );
      
      case 'document':
        return (
          <div className="space-y-3">
            <Label htmlFor="file-upload" className="text-sm font-medium">
              Upload document
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <div className="text-sm">
                  <span className="font-medium text-purple-600">Click to upload</span>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, Word documents, or text files
                </p>
              </label>
            </div>
            {uploadedFile && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <FileText className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  {uploadedFile.name}
                </span>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="ml-auto text-green-600 hover:text-green-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  const isGenerateDisabled = () => {
    if (!quizType) return true;
    
    switch (selectedOption) {
      case 'text':
        return !textContent.trim();
      case 'url':
        return !urlInput.trim();
      case 'document':
        return !uploadedFile;
      default:
        return true;
    }
  };

  const incrementCount = () => setQuestionCount(prev => prev + 1);
  const decrementCount = () => setQuestionCount(prev => Math.max(1, prev - 1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create with AI</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Generation Method Selection */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Choose generation method
                </h3>
                <div className="space-y-3">
                  {/* Generate from text */}
                  <div 
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === 'text' 
                        ? 'border-purple-200 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOption('text')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Generate from text</h4>
                        <p className="text-xs text-gray-600">
                          Use AI to generate quiz questions from text
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Convert URL to Quiz */}
                  <div 
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === 'url' 
                        ? 'border-purple-200 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOption('url')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Link className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Convert URL to Quiz</h4>
                        <p className="text-xs text-gray-600">
                          Convert web content into quiz questions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Upload a document */}
                  <div 
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedOption === 'document' 
                        ? 'border-purple-200 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOption('document')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Upload className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Upload a document</h4>
                        <p className="text-xs text-gray-600">
                          Upload PDF or Word for AI generation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Difficulty Level</h3>
                <div className="flex gap-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value="beginner"
                      checked={difficulty === 'beginner'}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`px-4 py-2 rounded-full border-2 transition-all ${
                      difficulty === 'beginner' 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}>
                      Beginner
                    </div>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value="intermediate"
                      checked={difficulty === 'intermediate'}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`px-4 py-2 rounded-full border-2 transition-all ${
                      difficulty === 'intermediate' 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}>
                      Intermediate
                    </div>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value="expert"
                      checked={difficulty === 'expert'}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`px-4 py-2 rounded-full border-2 transition-all ${
                      difficulty === 'expert' 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}>
                      Expert
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Input Area and Configuration */}
            <div className="space-y-6">
              {/* Generation Input */}
              <div>
                {renderGenerationInput()}
              </div>

              {/* Quiz Type */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Quiz type</h3>
                <p className="text-sm text-gray-600 mb-3">Quiz type and amount of question</p>
                <div className="flex gap-2">
                  <Select value={quizType} onValueChange={setQuizType}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select quiz type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={decrementCount}
                      className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 text-sm">
                      {questionCount}
                    </div>
                    <button
                      onClick={incrementCount}
                      className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerateDisabled()}
              className="px-6 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCreationModal;
