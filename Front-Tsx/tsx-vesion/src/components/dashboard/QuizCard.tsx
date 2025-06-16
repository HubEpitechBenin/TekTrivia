import { QuizData } from '@/types/quiz';
import { useNavigate } from 'react-router-dom';

interface QuizCardProps {
  quiz: QuizData;
  color: string;
}

const QuizCard = ({ quiz, color }: QuizCardProps) => {
  const navigate = useNavigate();

  const handlePlayQuiz = () => {
    navigate('/quiz-preview', { state: quiz });
  };

  return (
    <div 
      onClick={handlePlayQuiz}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer flex flex-col"
    >
      <div style={{ backgroundColor: color }} className="rounded-b-[40px] h-32 relative flex items-center justify-center p-4">
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm">
            <div className="w-0 h-0 border-l-[6px] border-l-blue-500 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
            <span className="text-blue-500 text-sm font-medium">Play</span>
          </div>
        </div>
        
        <h3 className="text-white text-xl font-bold text-center px-4 truncate">{quiz.title}</h3>
      </div>
      
      <div className="p-4 bg-white min-h-[120px] flex flex-col flex-grow">
        <div className="flex items-center justify-center space-x-4 mb-3">
          <div className="bg-gray-100 rounded-full px-3 py-1">
            <span className="text-gray-700 text-sm font-medium">{quiz.questions.length} Qs</span>
          </div>
          <div className="bg-gray-100 rounded-full px-3 py-1">
            <span className="text-gray-700 text-sm font-medium">1k+ Plays</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm text-center leading-relaxed flex-1">
          A quiz to test your knowledge. Click to play!
        </p>
      </div>
    </div>
  );
};

export default QuizCard;
