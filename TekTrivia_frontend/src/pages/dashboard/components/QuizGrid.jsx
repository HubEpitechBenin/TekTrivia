import QuizCard from './QuizCard';

const QuizGrid = () => {
  const quizzes = [
    {
      color: 'bg-[#ED4C5C]',
      title: 'TekTrivia',
      description: 'Multiples, Factors, Primes, Squares, and Cubes',
      questions: 56,
      plays: '1k'
    },
    {
      color: 'bg-[#42ADE2]',
      title: 'TekTrivia',
      description: 'Multiples, Factors, Primes, Squares, and Cubes',
      questions: 56,
      plays: '1k'
    },
    {
      color: 'bg-[#093F68]',
      title: 'TekTrivia',
      description: 'Multiples, Factors, Primes, Squares, and Cubes',
      questions: 56,
      plays: '1k'
    },
    {
      color: 'bg-[#699635]',
      title: 'TekTrivia',
      description: 'Multiples, Factors, Primes, Squares, and Cubes',
      questions: 56,
      plays: '1k'
    },
    {
      color: 'bg-[#ED5C5C]',
      title: 'TekTrivia',
      description: 'Multiples, Factors, Primes, Squares, and Cubes',
      questions: 56,
      plays: '1k'
    },
    {
      color: 'bg-[#ED4C8C]',
      title: 'TekTrivia',
      description: 'Multiples, Factors, Primes, Squares, and Cubes',
      questions: 56,
      plays: '1k'
    },
    {
      color: 'bg-[#ED1C9C]',
      title: 'TekTrivia',
      description: 'Multiples, Factors, Primes, Squares, and Cubes',
      questions: 56,
      plays: '1k'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={index}
          color={quiz.color}
          title={quiz.title}
          description={quiz.description}
          questions={quiz.questions}
          plays={quiz.plays}
        />
      ))}
    </div>
  );
};

export default QuizGrid;
