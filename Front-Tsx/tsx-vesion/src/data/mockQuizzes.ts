import { QuizData } from '@/types/quiz';

export const mockQuizzes: QuizData[] = [
  {
    id: 'quiz-1',
    title: 'Les bases de React',
    generationData: {},
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'Qu\'est-ce que le JSX ?',
        choices: ['Une extension de la syntaxe JavaScript', 'Une bibliothèque JavaScript', 'Un préprocesseur CSS', 'Un langage de requête de base de données'],
        correctAnswer: 0,
        points: 10,
        timeLimit: 60,
        required: true,
      },
      {
        id: 'q2',
        type: 'true-false',
        question: 'React est un framework JavaScript.',
        correctAnswer: 'false',
        points: 5,
        timeLimit: 30,
        required: true,
      }
    ],
    resultScreen: {
      successMessage: 'Excellent travail ! Vous connaissez les bases de React.',
      failureMessage: 'Vous devriez peut-être revoir la documentation de React.',
    }
  },
  {
    id: 'quiz-2',
    title: 'Capitales du monde',
    generationData: {},
    questions: [
      {
        id: 'q1',
        type: 'short-answer',
        question: 'Quelle est la capitale de la France ?',
        correctAnswer: 'Paris',
        points: 10,
        timeLimit: 45,
        required: true,
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'Quelle est la capitale du Japon ?',
        choices: ['Kyoto', 'Osaka', 'Tokyo', 'Hiroshima'],
        correctAnswer: 2,
        points: 10,
        timeLimit: 45,
        required: true,
      }
    ],
     resultScreen: {
      successMessage: 'Excellent ! Vous êtes un pro de la géographie !',
      failureMessage: 'Continuez à pratiquer les capitales du monde !',
    }
  }
];