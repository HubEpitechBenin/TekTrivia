import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Settings, Eye, Upload, Plus } from 'lucide-react';
import QuestionEditor from '@/components/QuestionEditor';
// Ajout toast notification
import { useToast } from '@/hooks/use-toast';

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  choices?: string[];
  correctAnswer: string | number | number[];
  points: number;
  timeLimit: number;
  required: boolean;
  allowMultipleAnswers?: boolean;
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
  };
}

interface ResultScreenConfig {
  successMessage: string;
  failureMessage: string;
}

interface QuizData {
  title: string;
  questions: QuizQuestion[];
  generationData: any;
  resultScreen?: ResultScreenConfig;
}

const QuizEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast(); // Utilisation du hook useToast pour notifications
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [quizTitle, setQuizTitle] = useState('');

  // Add state for result screen editing
  const [resultScreen, setResultScreen] = useState<ResultScreenConfig>({
    successMessage: "Congratulations! You passed the quiz.",
    failureMessage: "Unfortunately, you did not pass. Try again!"
  });

  useEffect(() => {
    const data = location.state as QuizData;
    if (data) {
      setQuizData({
        ...data,
        resultScreen: data.resultScreen ?? resultScreen
      });
      setQuizTitle(data.title || 'The principles of Deep Learning');
      if (data.resultScreen) setResultScreen(data.resultScreen);
    } else {
      // Si pas de données, générer des questions de démonstration
      const mockQuizData: QuizData = {
        title: 'The principles of Deep Learning',
        questions: [
          {
            id: '1',
            type: 'multiple-choice',
            question: 'What is the basic building block of a deep learning model?',
            choices: ['Decision Tree', 'Artificial Neuron', 'Support Vector', 'Genetic Algorithm'],
            correctAnswer: 1,
            points: 1,
            timeLimit: 2,
            required: true,
            allowMultipleAnswers: false,
            media: {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop'
            }
          },
          {
            id: '2',
            type: 'multiple-choice',
            question: 'What is the basic building block of a deep learning model?',
            choices: ['Decision Tree', 'Artificial Neuron', 'Support Vector', 'Genetic Algorithm'],
            correctAnswer: 1,
            points: 1,
            timeLimit: 2,
            required: true,
            allowMultipleAnswers: false,
          },
          {
            id: '3',
            type: 'multiple-choice',
            question: 'What is the basic building block of a deep learning model?',
            choices: ['Decision Tree', 'Artificial Neuron', 'Support Vector', 'Genetic Algorithm'],
            correctAnswer: 1,
            points: 1,
            timeLimit: 2,
            required: true,
            allowMultipleAnswers: false,
          },
          {
            id: '4',
            type: 'multiple-choice',
            question: 'What is the basic building block of a deep learning model?',
            choices: ['Decision Tree', 'Artificial Neuron', 'Support Vector', 'Genetic Algorithm'],
            correctAnswer: 1,
            points: 1,
            timeLimit: 2,
            required: true,
            allowMultipleAnswers: false,
          }
        ],
        generationData: {},
        resultScreen: {
          successMessage: "Congratulations! You passed the quiz.",
          failureMessage: "Unfortunately, you did not pass. Try again!"
        }
      };
      setQuizData(mockQuizData);
      setQuizTitle(mockQuizData.title);
      setResultScreen(mockQuizData.resultScreen!);
    }
    // eslint-disable-next-line
  }, [location.state]);

  const addQuestion = () => {
    if (!quizData) return;
    const newQuestion: QuizQuestion = {
      id: crypto.randomUUID(),
      type: 'multiple-choice',
      question: 'Nouvelle Question',
      choices: ['Option 1', 'Option 2'],
      correctAnswer: 0,
      points: 1,
      timeLimit: 2,
      required: true,
      allowMultipleAnswers: false,
    };
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, newQuestion],
    });
  };

  const updateQuestion = (questionId: string, updatedQuestion: QuizQuestion) => {
    if (!quizData) return;
    setQuizData({
      ...quizData,
      questions: quizData.questions.map(q => 
        q.id === questionId ? updatedQuestion : q
      ),
      resultScreen
    });
  };

  // Nouveau: handle result messages updates
  const handleResultScreenChange = (key: keyof ResultScreenConfig, value: string) => {
    const updatedResultScreen = { ...resultScreen, [key]: value };
    setResultScreen(updatedResultScreen);
    if (quizData) {
      setQuizData({
        ...quizData,
        resultScreen: updatedResultScreen
      });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handlePreview = () => {
    if (quizData) {
      navigate('/quiz-preview', { state: { ...quizData, title: quizTitle, resultScreen } });
    }
  };

  // Fonction de gestion du publish
  const handlePublish = () => {
    // Ici on simule la sauvegarde/publication (on pourrait envoyer sur un backend ou supabase)
    // On notifie l'utilisateur que le quiz est publié, et affiche les messages du result screen
    if (!quizData) {
      toast({
        title: "Erreur",
        description: "Impossible de publier : quiz introuvable.",
        variant: "destructive"
      });
      return;
    }

    // On inclut bien le result screen dans le quiz publié
    const quizToPublish = {
      ...quizData,
      title: quizTitle,
      resultScreen
    };

    // Ici tu pourrais faire un appel API pour sauvegarder quizToPublish

    toast({
      title: "Quiz publié !",
      description: (
        <div>
          <div>Le quiz <span className="font-semibold">{quizToPublish.title}</span> a été publié avec succès.</div>
          <div className="mt-2">
            <span className="font-medium text-green-700">Message de réussite : </span>
            <span>{quizToPublish.resultScreen?.successMessage}</span>
          </div>
          <div>
            <span className="font-medium text-red-700">Message d'échec : </span>
            <span>{quizToPublish.resultScreen?.failureMessage}</span>
          </div>
        </div>
      )
    });

    // Tu pourrais naviguer ailleurs ici si besoin
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
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Edited Just now</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <Input
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="border-none p-0 text-lg font-medium bg-transparent focus:ring-0"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handlePreview}>
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button size="sm" onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-1" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
          {/* Questions List (scrollable) */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
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
            <Button onClick={addQuestion} className="w-full mt-4" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une question
            </Button>
          </div>
          
          {/* Result Screen */}
          <div className="p-4 border-t border-gray-200 shrink-0">
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
                <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="success-message">
                  Success Message:
                </label>
                <Input
                  id="success-message"
                  value={resultScreen.successMessage}
                  onChange={(e) => handleResultScreenChange('successMessage', e.target.value)}
                  className="mb-2 text-sm"
                  placeholder="Enter a message for quiz pass"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="fail-message">
                  Fail Message:
                </label>
                <Input
                  id="fail-message"
                  value={resultScreen.failureMessage}
                  onChange={(e) => handleResultScreenChange('failureMessage', e.target.value)}
                  className="mb-2 text-sm"
                  placeholder="Enter a message for quiz fail"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto" style={{ height: 'calc(100vh - 65px)' }}>
          <div className="space-y-6">
            {quizData.questions.map((question, index) => (
              <QuestionEditor
                key={question.id}
                question={question}
                questionNumber={index + 1}
                onUpdate={(updatedQuestion) => updateQuestion(question.id, updatedQuestion)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizEditor;
