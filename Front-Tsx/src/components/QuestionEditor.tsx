import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Trash2, Plus, GripVertical, Image, Video, HelpCircle, AudioLines } from 'lucide-react';
import { Checkbox } from './ui/checkbox';

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

interface QuestionEditorProps {
  question: QuizQuestion;
  questionNumber: number;
  onUpdate: (question: QuizQuestion) => void;
}

const QuestionEditor = ({ question, questionNumber, onUpdate }: QuestionEditorProps) => {
  const [localQuestion, setLocalQuestion] = useState<QuizQuestion>(question);
  // Nouveaux states pour gestion locale du media uploadé
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState<string | null>(null);

  const updateQuestion = (updates: Partial<QuizQuestion>) => {
    const updatedQuestion = { ...localQuestion, ...updates };
    setLocalQuestion(updatedQuestion);
    onUpdate(updatedQuestion);
  };

  const handleMediaChange = (type: 'image' | 'video' | 'audio') => {
    if (localQuestion.media?.type === type) {
      setUploadedMediaUrl(null);
      const { media, ...rest } = localQuestion;
      const updatedQuestion = rest as QuizQuestion;
      setLocalQuestion(updatedQuestion);
      onUpdate(updatedQuestion);
    } else {
      let url = '';
      updateQuestion({ media: { type, url } });
      setUploadedMediaUrl(null);
    }
  };

  // Champ d'upload media
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && localQuestion.media) {
      const file = e.target.files[0];
      const objUrl = URL.createObjectURL(file);
      setUploadedMediaUrl(objUrl);
      // Mettre à jour l'url du media dans la question, pour prévisualisation et pour que l’app conserve le lien local tant que non uploadé serveur
      updateQuestion({
        media: { ...localQuestion.media, url: objUrl }
      });
    }
  };

  const removeMedia = () => {
    setUploadedMediaUrl(null);
    const { media, ...rest } = localQuestion;
    const updatedQuestion = rest as QuizQuestion;
    setLocalQuestion(updatedQuestion);
    onUpdate(updatedQuestion);
  };

  const updateChoice = (index: number, value: string) => {
    if (!localQuestion.choices) return;
    const newChoices = [...localQuestion.choices];
    newChoices[index] = value;
    updateQuestion({ choices: newChoices });
  };

  const addChoice = () => {
    const newChoices = [...(localQuestion.choices || []), ''];
    updateQuestion({ choices: newChoices });
  };

  const removeChoice = (index: number) => {
    if (!localQuestion.choices || localQuestion.choices.length <= 2) return;
    const newChoices = localQuestion.choices.filter((_, i) => i !== index);
    updateQuestion({ choices: newChoices });
  };

  const handleCorrectAnswerChange = (index: number) => {
    if (localQuestion.allowMultipleAnswers) {
      const currentAnswers = (Array.isArray(localQuestion.correctAnswer) ? localQuestion.correctAnswer : []) as number[];
      const newAnswers = currentAnswers.includes(index)
        ? currentAnswers.filter(i => i !== index)
        : [...currentAnswers, index];
      updateQuestion({ correctAnswer: newAnswers });
    } else {
      updateQuestion({ correctAnswer: index });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          <Select 
            value={localQuestion.type} 
            onValueChange={(value: any) => updateQuestion({ type: value })}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">Multiple choices</SelectItem>
              <SelectItem value="true-false">True/False</SelectItem>
              <SelectItem value="short-answer">Short Answer</SelectItem>
              <SelectItem value="essay">Essay</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor={`required-${question.id}`} className="text-sm">Required</Label>
          <Switch
            id={`required-${question.id}`}
            checked={localQuestion.required}
            onCheckedChange={(checked) => updateQuestion({ required: checked })}
          />
          <Button variant="ghost" size="sm">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Question Number and Title */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-black text-white rounded flex items-center justify-center text-sm font-medium">
            {questionNumber}
          </div>
          <span className="text-sm text-gray-600">Question {questionNumber}*</span>
        </div>
        <Textarea
          value={localQuestion.question}
          onChange={(e) => updateQuestion({ question: e.target.value })}
          placeholder="Enter your question here..."
          className="text-lg font-medium border-none p-0 resize-none focus:ring-0 bg-gray-50 rounded-lg p-3"
        />
        <div className="flex gap-2 mt-2">
          <Button variant="ghost" size="sm" onClick={() => handleMediaChange('image')}>
            <Image className="w-4 h-4" />
            <span className="ml-1">Image</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleMediaChange('video')}>
            <Video className="w-4 h-4" />
            <span className="ml-1">Vidéo</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleMediaChange('audio')}>
            <AudioLines className="w-4 h-4" />
            <span className="ml-1">Audio</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={removeMedia}>
            <Trash2 className="w-4 h-4 text-red-500" />
            <span className="ml-1">Supprimer</span>
          </Button>
        </div>
        {/* Si media sélectionné, afficher upload + preview */}
        {localQuestion.media && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              {localQuestion.media.type === 'image' && <Image className="w-5 h-5" />}
              {localQuestion.media.type === 'video' && <Video className="w-5 h-5" />}
              {localQuestion.media.type === 'audio' && <AudioLines className="w-5 h-5" />}
              <Label className="capitalize">{localQuestion.media.type} upload</Label>
            </div>
            {/* Upload file input */}
            <Input
              type="file"
              accept={
                localQuestion.media.type === 'image'
                  ? "image/*"
                  : localQuestion.media.type === 'video'
                    ? "video/*"
                    : "audio/*"
              }
              onChange={handleFileUpload}
              className="mb-2"
            />
            {/* Laisser aussi le champ URL si besoin */}
            <Input
              value={localQuestion.media.url}
              onChange={(e) =>
                updateQuestion({ media: { ...localQuestion.media!, url: e.target.value } })
              }
              placeholder={`Ou collez l’URL de votre ${localQuestion.media.type}...`}
              className="mb-2"
            />
            {/* Preview Média */}
            {localQuestion.media.url && (
              <div className="mt-4">
                {localQuestion.media.type === 'image' && (
                  <img
                    src={localQuestion.media.url}
                    alt="Question media"
                    className="rounded-lg max-h-64 w-auto"
                    onError={(e) => ((e.currentTarget.style.display = 'none'))}
                  />
                )}
                {localQuestion.media.type === 'video' && (
                  <video src={localQuestion.media.url} controls className="rounded-lg max-h-64 w-auto" />
                )}
                {localQuestion.media.type === 'audio' && (
                  <audio src={localQuestion.media.url} controls className="w-full" />
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Choices Section */}
      {localQuestion.type === 'multiple-choice' && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium">Choices*</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Multiple answer</span>
              <Switch
                checked={!!localQuestion.allowMultipleAnswers}
                onCheckedChange={(checked) => {
                  let newCorrectAnswer;
                  if (checked) { // to multiple
                    if (typeof localQuestion.correctAnswer === 'number') {
                      newCorrectAnswer = [localQuestion.correctAnswer];
                    } else if (Array.isArray(localQuestion.correctAnswer)) {
                      newCorrectAnswer = localQuestion.correctAnswer;
                    } else {
                      newCorrectAnswer = [];
                    }
                  } else { // to single
                    if (Array.isArray(localQuestion.correctAnswer)) {
                      newCorrectAnswer = localQuestion.correctAnswer.length > 0 ? localQuestion.correctAnswer[0] : 0;
                    } else if (typeof localQuestion.correctAnswer === 'number') {
                      newCorrectAnswer = localQuestion.correctAnswer;
                    } else {
                      newCorrectAnswer = 0;
                    }
                  }
                  updateQuestion({ allowMultipleAnswers: checked, correctAnswer: newCorrectAnswer });
                }}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            {localQuestion.choices?.map((choice, index) => (
              <div key={index} className="flex items-center gap-3">
                {localQuestion.allowMultipleAnswers ? (
                  <Checkbox
                    id={`correct-${question.id}-${index}`}
                    checked={Array.isArray(localQuestion.correctAnswer) && localQuestion.correctAnswer.includes(index)}
                    onCheckedChange={() => handleCorrectAnswerChange(index)}
                  />
                ) : (
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={localQuestion.correctAnswer === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="w-4 h-4 text-blue-600"
                  />
                )}
                <Input
                  value={choice}
                  onChange={(e) => updateChoice(index, e.target.value)}
                  placeholder={`Choice ${index + 1}`}
                  className="flex-1"
                />
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </Button>
                  {(localQuestion.choices?.length || 0) > 2 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeChoice(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={addChoice}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Answers
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label className="text-sm">Randomize Order</Label>
            <Select defaultValue="current">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Keep choices in current orders</SelectItem>
                <SelectItem value="random">Randomize order</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Label className="text-sm">Estimation time</Label>
            <Input
              type="number"
              value={localQuestion.timeLimit}
              onChange={(e) => updateQuestion({ timeLimit: parseInt(e.target.value) || 0 })}
              className="w-12 text-center"
            />
            <span className="text-sm text-gray-500">Mins</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Label className="text-sm">Mark as point</Label>
            <Input
              type="number"
              value={localQuestion.points}
              onChange={(e) => updateQuestion({ points: parseInt(e.target.value) || 0 })}
              className="w-12 text-center"
            />
            <span className="text-sm text-gray-500">Points</span>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
