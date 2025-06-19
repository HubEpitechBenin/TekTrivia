import { useEffect, useState } from 'react';
import QuizCard from './QuizCard';

const colors = [
  'bg-[#ED4C5C]',
  'bg-[#42ADE2]',
  'bg-[#093F68]',
  'bg-[#699635]',
  'bg-[#ED5C5C]',
  'bg-[#ED4C8C]',
  'bg-[#ED1C9C]',
  'bg-[#FFC107]',
  'bg-[#00BCD4]',
  'bg-[#8E44AD]',
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const QuizGrid = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/api/squiz/ai')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then((data) => {
        console.log('✅ Données reçues de l’API :', data);
        setQuizzes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('❌ Erreur lors de la récupération des quizzes :', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des quiz...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={index}
          color={getRandomColor()}
          title={quiz.title || 'Sans titre'}
          description={quiz.description || 'Pas de description'}
          num_questions={quiz.questions?.length || 0}
          questions={quiz.questions || {}}
          plays={quiz.plays || '0'}
        />
      ))}
    </div>
  );
};

export default QuizGrid;
