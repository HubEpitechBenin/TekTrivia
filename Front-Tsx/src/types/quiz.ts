export interface QuizQuestion {
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

export interface ResultScreenConfig {
  successMessage: string;
  failureMessage: string;
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestion[];
  generationData: any;
  resultScreen?: ResultScreenConfig;
}
