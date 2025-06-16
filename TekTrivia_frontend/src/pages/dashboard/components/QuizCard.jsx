import { Play } from 'lucide-react';
import PropTypes from 'prop-types';

const QuizCard = ({ color, title, description, questions, plays }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer w-80 h-auto">
      {/* Top colored section */}
      <div className={`${color} rounded-b-[40px] h-32 relative flex items-center justify-center p-4`}>
        {/* Play button - positioned absolutely in top right */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm">
            <div className="w-0 h-0 border-l-[6px] border-l-blue-500 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
            <span className="text-blue-500 text-sm font-medium">Play</span>
          </div>
        </div>
        
        {/* Title - centered */}
        <h3 className="text-white text-xl font-bold text-center px-4">{title}</h3>
      </div>
      
      {/* Bottom white section - clearly separated */}
      <div className="p-4 bg-white min-h-[120px] flex flex-col">
        {/* Stats badges - centered with proper spacing */}
        <div className="flex items-center justify-center space-x-4 mb-3">
          <div className="bg-gray-100 rounded-full px-3 py-1">
            <span className="text-gray-700 text-sm font-medium">{questions} Qs</span>
          </div>
          <div className="bg-gray-100 rounded-full px-3 py-1">
            <span className="text-gray-700 text-sm font-medium">{plays} Plays</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm text-center leading-relaxed flex-1">{description}</p>
      </div>
    </div>
  );
};

// PropTypes validation
QuizCard.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  questions: PropTypes.number.isRequired,
  plays: PropTypes.string.isRequired,
};

export default QuizCard;
