import React, { useState } from 'react';
import { Trash2, Plus, GripVertical, Image, Video, HelpCircle, AudioLines } from 'lucide-react';
import { Checkbox } from '@radix-ui/react-checkbox'; // Ou tu peux remplacer Checkbox par un input checkbox classique

const QuestionEditor = ({ question, questionNumber, onUpdate }) => {
  const [localQuestion, setLocalQuestion] = useState(question);
  const [uploadedMediaUrl, setUploadedMediaUrl] = useState(null);

  const updateQuestion = (updates) => {
    const updatedQuestion = { ...localQuestion, ...updates };
    setLocalQuestion(updatedQuestion);
    onUpdate(updatedQuestion);
  };

  const handleMediaChange = (type) => {
    if (localQuestion.media?.type === type) {
      setUploadedMediaUrl(null);
      const { media, ...rest } = localQuestion;
      setLocalQuestion(rest);
      onUpdate(rest);
    } else {
      updateQuestion({ media: { type, url: '' } });
      setUploadedMediaUrl(null);
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0] && localQuestion.media) {
      const file = e.target.files[0];
      const objUrl = URL.createObjectURL(file);
      setUploadedMediaUrl(objUrl);
      updateQuestion({
        media: { ...localQuestion.media, url: objUrl }
      });
    }
  };

  const removeMedia = () => {
    setUploadedMediaUrl(null);
    const { media, ...rest } = localQuestion;
    setLocalQuestion(rest);
    onUpdate(rest);
  };

  const updateChoice = (index, value) => {
    if (!localQuestion.choices) return;
    const newChoices = [...localQuestion.choices];
    newChoices[index] = value;
    updateQuestion({ choices: newChoices });
  };

  const addChoice = () => {
    const newChoices = [...(localQuestion.choices || []), ''];
    updateQuestion({ choices: newChoices });
  };

  const removeChoice = (index) => {
    if (!localQuestion.choices || localQuestion.choices.length <= 2) return;
    const newChoices = localQuestion.choices.filter((_, i) => i !== index);
    updateQuestion({ choices: newChoices });
  };

  const handleCorrectAnswerChange = (index) => {
    if (localQuestion.allowMultipleAnswers) {
      const currentAnswers = Array.isArray(localQuestion.correctAnswer) ? localQuestion.correctAnswer : [];
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
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          <select
            value={localQuestion.type}
            onChange={(e) => updateQuestion({ type: e.target.value })}
            className="border rounded px-2 py-1 w-40"
          >
            <option value="multiple-choice">Multiple choices</option>
            <option value="true-false">True/False</option>
            <option value="short-answer">Short Answer</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor={`required-${question.id}`} className="text-sm">Required</label>
          <input
            id={`required-${question.id}`}
            type="checkbox"
            checked={localQuestion.required}
            onChange={(e) => updateQuestion({ required: e.target.checked })}
            className="w-5 h-5 cursor-pointer"
          />
          <button className="text-gray-500 hover:text-gray-700">
            <HelpCircle className="w-4 h-4" />
          </button>
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
        <textarea
          value={localQuestion.question}
          onChange={(e) => updateQuestion({ question: e.target.value })}
          placeholder="Enter your question here..."
          className="text-lg font-medium border-none p-3 resize-none focus:outline-none bg-gray-50 rounded-lg w-full"
          rows={3}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleMediaChange('image')}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          >
            <Image className="w-4 h-4" />
            <span>Image</span>
          </button>
          <button
            onClick={() => handleMediaChange('video')}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          >
            <Video className="w-4 h-4" />
            <span>Vidéo</span>
          </button>
          <button
            onClick={() => handleMediaChange('audio')}
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          >
            <AudioLines className="w-4 h-4" />
            <span>Audio</span>
          </button>
          <button
            onClick={removeMedia}
            className="flex items-center gap-1 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            <span>Supprimer</span>
          </button>
        </div>

        {/* Media preview & upload */}
        {localQuestion.media && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              {localQuestion.media.type === 'image' && <Image className="w-5 h-5" />}
              {localQuestion.media.type === 'video' && <Video className="w-5 h-5" />}
              {localQuestion.media.type === 'audio' && <AudioLines className="w-5 h-5" />}
              <label className="capitalize">{localQuestion.media.type} upload</label>
            </div>
            <input
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
            <input
              type="text"
              value={localQuestion.media.url}
              onChange={(e) =>
                updateQuestion({ media: { ...localQuestion.media, url: e.target.value } })
              }
              placeholder={`Ou collez l’URL de votre ${localQuestion.media.type}...`}
              className="mb-2 w-full px-2 py-1 border rounded"
            />
            {localQuestion.media.url && (
              <div className="mt-4">
                {localQuestion.media.type === 'image' && (
                  <img
                    src={localQuestion.media.url}
                    alt="Question media"
                    className="rounded-lg max-h-64 w-auto"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
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
            <label className="text-sm font-medium">Choices*</label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Multiple answer</span>
              <input
                type="checkbox"
                checked={!!localQuestion.allowMultipleAnswers}
                onChange={(e) => {
                  let newCorrectAnswer;
                  if (e.target.checked) {
                    if (typeof localQuestion.correctAnswer === 'number') {
                      newCorrectAnswer = [localQuestion.correctAnswer];
                    } else if (Array.isArray(localQuestion.correctAnswer)) {
                      newCorrectAnswer = localQuestion.correctAnswer;
                    } else {
                      newCorrectAnswer = [];
                    }
                  } else {
                    if (Array.isArray(localQuestion.correctAnswer)) {
                      newCorrectAnswer = localQuestion.correctAnswer.length > 0 ? localQuestion.correctAnswer[0] : 0;
                    } else if (typeof localQuestion.correctAnswer === 'number') {
                      newCorrectAnswer = localQuestion.correctAnswer;
                    } else {
                      newCorrectAnswer = 0;
                    }
                  }
                  updateQuestion({ allowMultipleAnswers: e.target.checked, correctAnswer: newCorrectAnswer });
                }}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3">
            {localQuestion.choices?.map((choice, index) => (
              <div key={index} className="flex items-center gap-3">
                {localQuestion.allowMultipleAnswers ? (
                  <input
                    type="checkbox"
                    id={`correct-${question.id}-${index}`}
                    checked={Array.isArray(localQuestion.correctAnswer) && localQuestion.correctAnswer.includes(index)}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="w-5 h-5 cursor-pointer"
                  />
                ) : (
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={localQuestion.correctAnswer === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="w-4 h-4 cursor-pointer"
                  />
                )}
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => updateChoice(index, e.target.value)}
                  placeholder={`Choice ${index + 1}`}
                  className="flex-1 border rounded px-2 py-1"
                />
                <div className="flex items-center gap-1">
                  <button className="text-gray-400 cursor-move">
                    <GripVertical className="w-4 h-4" />
                  </button>
                  {(localQuestion.choices?.length || 0) > 2 && (
                    <button
                      onClick={() => removeChoice(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={addChoice}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" />
              Add Answers
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-sm" htmlFor={`randomize-${question.id}`}>
              Randomize Order
            </label>
            <select
              id={`randomize-${question.id}`}
              defaultValue="current"
              className="border rounded px-2 py-1 w-48"
            >
              <option value="current">Keep choices in current order</option>
              <option value="random">Randomize order</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Estimation time</label>
            <input
              type="number"
              value={localQuestion.timeLimit}
              onChange={(e) => updateQuestion({ timeLimit: parseInt(e.target.value) || 0 })}
              className="w-12 text-center border rounded px-1 py-0.5"
            />
            <span className="text-sm text-gray-500">Mins</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm">Mark as point</label>
            <input
              type="number"
              value={localQuestion.points}
              onChange={(e) => updateQuestion({ points: parseInt(e.target.value) || 0 })}
              className="w-12 text-center border rounded px-1 py-0.5"
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
