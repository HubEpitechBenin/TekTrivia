import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { QuizData } from '@/types/quiz';

const QuizPreview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{[key: string]: any}>({});
    const [quizFinished, setQuizFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        const data = location.state as QuizData;
        if (data) {
            setQuizData(data);
            setTotalPoints(data.questions.reduce((acc, q) => acc + q.points, 0));
        } else {
            navigate('/');
        }
    }, [location.state, navigate]);

    const handleAnswerChange = (questionId: string, answer: any) => {
        setUserAnswers(prev => ({...prev, [questionId]: answer}));
    };

    const handleNextQuestion = () => {
        if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    }

    const handleSubmitQuiz = () => {
        if (!quizData) return;

        let totalScore = 0;
        quizData.questions.forEach(q => {
            const userAnswer = userAnswers[q.id];
            if (userAnswer === undefined) return;
            
            let isCorrect = false;
            switch(q.type) {
                case 'multiple-choice':
                    if (q.allowMultipleAnswers) {
                        const correctAnswers = q.correctAnswer as number[];
                        const userAnswersSet = new Set(userAnswer as number[]);
                        if (correctAnswers.length === userAnswersSet.size && correctAnswers.every(ca => userAnswersSet.has(ca))) {
                            isCorrect = true;
                        }
                    } else {
                        if (userAnswer === q.correctAnswer) {
                            isCorrect = true;
                        }
                    }
                    break;
                case 'true-false':
                    if (userAnswer === q.correctAnswer) {
                        isCorrect = true;
                    }
                    break;
                case 'short-answer':
                    if (typeof userAnswer === 'string' && typeof q.correctAnswer === 'string' && userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()) {
                        isCorrect = true;
                    }
                    break;
                case 'essay':
                    // Cannot be auto-graded
                    break;
            }

            if(isCorrect) {
                totalScore += q.points;
            }
        });
        setScore(totalScore);
        setQuizFinished(true);
    };

    if (!quizData) {
        return <div>Loading quiz preview...</div>;
    }

    if (quizFinished) {
        // Assuming 50% to pass
        const passingThreshold = totalPoints / 2;
        const passed = score >= passingThreshold;
        const resultMessage = passed ? quizData.resultScreen?.successMessage : quizData.resultScreen?.failureMessage;

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl text-center">
                    <CardHeader>
                        <CardTitle>Quiz Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-2xl font-bold mb-4">You scored {score} out of {totalPoints}</h2>
                        <p className="text-lg">{resultMessage}</p>
                        <Button onClick={() => navigate('/quiz-editor', { state: quizData })} className="mt-6">Back to Editor</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestion.id];

    const renderQuestionInput = () => {
        switch(currentQuestion.type) {
            case 'multiple-choice':
                if (currentQuestion.allowMultipleAnswers) {
                    return (
                        <div className="space-y-2">
                            {currentQuestion.choices?.map((choice, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`${currentQuestion.id}-${index}`}
                                        checked={(userAnswer as number[] || []).includes(index)}
                                        onCheckedChange={(checked) => {
                                            const currentAnswers = (userAnswer as number[] || []);
                                            const newAnswers = checked ? [...currentAnswers, index] : currentAnswers.filter(i => i !== index);
                                            handleAnswerChange(currentQuestion.id, newAnswers);
                                        }}
                                    />
                                    <Label htmlFor={`${currentQuestion.id}-${index}`}>{choice}</Label>
                                </div>
                            ))}
                        </div>
                    );
                }
                return (
                    <RadioGroup value={userAnswer?.toString()} onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}>
                        {currentQuestion.choices?.map((choice, index) => (
                             <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={index.toString()} id={`${currentQuestion.id}-${index}`} />
                                <Label htmlFor={`${currentQuestion.id}-${index}`}>{choice}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                );
            case 'true-false':
                 return (
                    <RadioGroup value={userAnswer} onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id={`${currentQuestion.id}-true`} />
                            <Label htmlFor={`${currentQuestion.id}-true`}>True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id={`${currentQuestion.id}-false`} />
                            <Label htmlFor={`${currentQuestion.id}-false`}>False</Label>
                        </div>
                    </RadioGroup>
                );
            case 'short-answer':
                return <Input value={userAnswer || ''} onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)} placeholder="Your answer" />;
            case 'essay':
                return <Textarea value={userAnswer || ''} onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)} placeholder="Your essay" />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>{quizData.title}</CardTitle>
                        <span className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {quizData.questions.length}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{currentQuestion.question}</h3>
                        {currentQuestion.media && (
                             <div className="my-4 flex justify-center">
                                {currentQuestion.media.type === 'image' && (
                                <img
                                    src={currentQuestion.media.url}
                                    alt="Question media"
                                    className="rounded-lg max-h-64 w-auto"
                                />
                                )}
                                {currentQuestion.media.type === 'video' && (
                                <video src={currentQuestion.media.url} controls className="rounded-lg max-h-64 w-auto" />
                                )}
                                {currentQuestion.media.type === 'audio' && (
                                <audio src={currentQuestion.media.url} controls className="w-full" />
                                )}
                            </div>
                        )}
                        {renderQuestionInput()}
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>
                        {currentQuestionIndex < quizData.questions.length - 1 ? (
                             <Button onClick={handleNextQuestion}>Next</Button>
                        ) : (
                            <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default QuizPreview;
