import { Play } from 'lucide-react';
import PropTypes from 'prop-types';

const getColorClasses = (color) => {
  switch (color) {
    case 'red':
      return 'bg-gradient-to-br from-red-400 to-red-500';
    case 'cyan':
      return 'bg-gradient-to-br from-cyan-400 to-cyan-500';
    case 'navy':
      return 'bg-gradient-to-br from-blue-800 to-blue-900';
    case 'green':
      return 'bg-gradient-to-br from-green-500 to-green-600';
    case 'pink':
      return 'bg-gradient-to-br from-pink-400 to-pink-500';
    default:
      return 'bg-gradient-to-br from-gray-400 to-gray-500';
  }
};

const QuizCard = ({ color, title, description, questions, plays }) => {
  return (
    <div className={`${getColorClasses(color)} rounded-xl p-6 text-white relative overflow-hidden group hover:scale-105 transition-transform duration-200 cursor-pointer`}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2 transition-colors">
            <Play size={16} fill="currentColor" />
            <span className="font-medium">Play</span>
          </button>
        </div>

        <h3 className="text-xl font-bold mb-4">{title}</h3>

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
            {questions} Qs
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
            {plays} Plays
          </div>
        </div>

        <p className="text-sm opacity-90 leading-relaxed">{description}</p>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div>
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
