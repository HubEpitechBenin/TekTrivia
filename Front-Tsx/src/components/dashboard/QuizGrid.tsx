import { mockQuizzes } from '../data/mockQuizzes';
import QuizCard from './QuizCard';

const colors = [
  '#ED4C5C', '#42ADE2', '#093F68', '#699635',
  '#F2C94C', '#F2994A', '#EB5757', '#2F80ED',
  '#9B51E0', '#219653',
];

const QuizGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {mockQuizzes.map((quiz, index) => (
        <QuizCard 
          key={quiz.id} 
          quiz={quiz} 
          color={colors[index % colors.length]}
        />
      ))}
    </div>
  );
};

export default QuizGrid;