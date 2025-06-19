// import React, { useState } from 'react';
// import { X, FileText, Globe, Upload, ChevronDown, Plus, Minus } from 'lucide-react';

// const CreateQuizModal = ({ isOpen, onClose, onGenerate }) => {
//   const [selectedMethod, setSelectedMethod] = useState('text');
//   const [topic, setTopic] = useState('');
//   const [documentFile, setDocumentFile] = useState(null);
//   const [difficulty, setDifficulty] = useState('beginner');
//   const [quizType, setQuizType] = useState('');
//   const [category, setCategory] = useState('');
//   const [questionCount, setQuestionCount] = useState(1);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const generationMethods = [
//     {
//       id: 'text',
//       title: 'Generate from text',
//       description: 'Use AI to generate quiz questions and content based on textual input',
//       icon: FileText
//     },
//     {
//       id: 'url',
//       title: 'Convert URL To Quiz',
//       description: 'Use AI to automatically convert content from a given URL into quiz questions',
//       icon: Globe
//     },
//     {
//       id: 'document',
//       title: 'Upload a document',
//       description: 'Upload a PDF or Word that contains educational content for AI to generate',
//       icon: Upload
//     }
//   ];

//   const quizTypes = [
//     'Multiple Choice',
//     'True/False',
//     'Short Answer',
//     'Fill in the Blank',
//     'Matching',
//     'Essay Questions'
//   ];

//   const difficultyLevels = [
//     { id: 'beginner', label: 'Beginner' },
//     { id: 'intermediate', label: 'Intermediate' },
//     { id: 'expert', label: 'Expert' }
//   ];

//   const getTopicConfig = () => {
//     switch (selectedMethod) {
//       case 'text':
//         return { label: 'Topic', placeholder: 'Enter your topic...', inputType: 'textarea' };
//       case 'url':
//         return { label: 'URL', placeholder: 'https://example.com/article', inputType: 'input' };
//       case 'document':
//         return { label: 'Document', placeholder: 'Click to upload a document', inputType: 'file' };
//       default:
//         return { label: 'Topic', placeholder: 'Enter your topic', inputType: 'input' };
//     }
//   };

//   const topicConfig = getTopicConfig();

//   const handleMethodChange = (method) => {
//     setSelectedMethod(method);
//     setTopic('');
//     setDocumentFile(null);
//   };

//   const handleCountChange = (delta) => {
//     setQuestionCount((prev) => Math.max(1, Math.min(50, prev + delta)));
//   };

//   const handleGenerate = async () => {
//     if ((!topic && selectedMethod !== 'document') || !quizType) return;
//     setIsGenerating(true);

//     try {
//       let response;

//       if (selectedMethod === 'document') {
//         if (!documentFile) {
//           alert('Please upload a document.');
//           return;
//         }

//         const formData = new FormData();
//         formData.append('document_text', documentFile);
//         formData.append('difficulty', difficulty);
//         formData.append('num_questions', questionCount);
//         formData.append('theme', category);

//         for (let pair of formData.entries()) {
//           console.log(`${pair[0]}:`, pair[1]);
//         }

//         response = await fetch('/api/api/squiz/ai/generate/', {
//           method: 'POST',
//           body: formData,
//         });
//       } else {
//         const genpayload = {
//           document_text: topic.trim(),
//           difficulty,
//           num_questions: questionCount,
//           theme: category
//         };

//         response = await fetch('/api/api/squiz/ai/generate/', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(genpayload),
//         });
//       }

//       if (!response.ok) throw new Error('Erreur lors de la génération du quiz');

//       const result = await response.json();
//       onGenerate(result);
//       onClose();
//     } catch (error) {
//       console.error('❌ Erreur API :', error);
//       alert('Une erreur est survenue pendant la génération du quiz.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-xl font-semibold">Create with AI</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-black">
//             <X />
//           </button>
//         </div>

//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               {generationMethods.map((method) => {
//                 const Icon = method.icon;
//                 const selected = method.id === selectedMethod;
//                 return (
//                   <button
//                     key={method.id}
//                     onClick={() => handleMethodChange(method.id)}
//                     className={`w-full text-left border-2 rounded-xl p-4 transition ${
//                       selected ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
//                     }`}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="bg-purple-100 p-2 rounded">
//                         <Icon className="w-5 h-5 text-purple-600" />
//                       </div>
//                       <div>
//                         <h3 className="font-medium">{method.title}</h3>
//                         <p className="text-sm text-gray-500">{method.description}</p>
//                       </div>
//                     </div>
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium mb-2">{topicConfig.label}</label>
//                 {topicConfig.inputType === 'textarea' ? (
//                   <textarea
//                     rows={4}
//                     value={topic}
//                     onChange={(e) => setTopic(e.target.value)}
//                     placeholder={topicConfig.placeholder}
//                     className="w-full border rounded-lg p-3"
//                   />
//                 ) : topicConfig.inputType === 'file' ? (
//                   <div className="relative border-2 border-dashed p-4 text-center cursor-pointer rounded-lg">
//                     <input
//                       type="file"
//                       className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
//                       accept=".pdf,.doc,.docx"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (file) {
//                           setTopic(file.name);
//                           setDocumentFile(file);
//                         }
//                       }}
//                     />
//                     <Upload className="mx-auto text-gray-500" />
//                     <p className="mt-2">{topic || topicConfig.placeholder}</p>
//                   </div>
//                 ) : (
//                   <input
//                     type="url"
//                     value={topic}
//                     onChange={(e) => setTopic(e.target.value)}
//                     placeholder={topicConfig.placeholder}
//                     className="w-full border rounded-lg p-3"
//                   />
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Difficulty</label>
//                 <div className="flex gap-2">
//                   {difficultyLevels.map((level) => (
//                     <button
//                       key={level.id}
//                       onClick={() => setDifficulty(level.id)}
//                       className={`px-4 py-2 rounded-lg border-2 ${
//                         difficulty === level.id
//                           ? 'border-purple-400 bg-purple-50'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       {level.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Quiz Type</label>
//                 <div className="flex gap-4 items-center">
//                   <div className="relative flex-1">
//                     <button
//                       onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                       className="w-full border rounded-lg p-3 text-left flex justify-between"
//                     >
//                       {quizType || 'Select type'}
//                       <ChevronDown className="text-gray-500" />
//                     </button>
//                     {isDropdownOpen && (
//                       <div className="absolute z-10 bg-white border w-full mt-1 rounded-lg shadow-lg">
//                         {quizTypes.map((type) => (
//                           <div
//                             key={type}
//                             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                             onClick={() => {
//                               setQuizType(type);
//                               setIsDropdownOpen(false);
//                             }}
//                           >
//                             {type}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex items-center border rounded-lg">
//                     <button onClick={() => handleCountChange(-1)} className="px-2 py-2 hover:bg-gray-100">
//                       <Minus />
//                     </button>
//                     <span className="px-4">{questionCount}</span>
//                     <button onClick={() => handleCountChange(1)} className="px-2 py-2 hover:bg-gray-100">
//                       <Plus />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Category input */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Category</label>
//                 <input
//                   type="text"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   placeholder="e.g. Math, Science, Literature"
//                   className="w-full border rounded-lg p-3"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 p-6 border-t">
//           <button onClick={onClose} className="text-gray-600 hover:text-black">
//             Cancel
//           </button>
//           <button
//             onClick={handleGenerate}
//             disabled={(selectedMethod !== 'document' && !topic.trim()) || !quizType || isGenerating}
//             className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
//           >
//             {isGenerating ? 'Generating...' : 'Generate'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateQuizModal;

import React, { useState } from 'react';
import { X, FileText, Globe, Upload, ChevronDown, Plus, Minus } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import pdfToText from 'react-pdftotext';

const CreateQuizModal = ({ isOpen, onClose, onGenerate }) => {
  const [selectedMethod, setSelectedMethod] = useState('text');
  const [topic, setTopic] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [quizType, setQuizType] = useState('');
  const [category, setCategory] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generationMethods = [
    {
      id: 'text',
      title: 'Generate from text',
      description: 'Use AI to generate quiz questions and content based on textual input',
      icon: FileText
    },
    {
      id: 'url',
      title: 'Convert URL To Quiz',
      description: 'Use AI to automatically convert content from a given URL into quiz questions',
      icon: Globe
    },
    {
      id: 'document',
      title: 'Upload a document',
      description: 'Upload a PDF or Word that contains educational content for AI to generate',
      icon: Upload
    }
  ];

  const quizTypes = [
    'Multiple Choice',
    'True/False',
    'Short Answer',
    'Fill in the Blank',
    'Matching',
    'Essay Questions'
  ];

  const difficultyLevels = [
    { id: 'easy', label: 'Beginner' },
    { id: 'medium', label: 'Intermediate' },
    { id: 'hard', label: 'Expert' }
  ];

  const getTopicConfig = () => {
    switch (selectedMethod) {
      case 'text':
        return { label: 'Topic', placeholder: 'Enter your topic...', inputType: 'textarea' };
      case 'url':
        return { label: 'URL', placeholder: 'https://example.com/article', inputType: 'input' };
      case 'document':
        return { label: 'Document', placeholder: 'Click to upload a document', inputType: 'file' };
      default:
        return { label: 'Topic', placeholder: 'Enter your topic', inputType: 'input' };
    }
  };

  const topicConfig = getTopicConfig();

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setTopic('');
    setDocumentFile(null);
  };

  const handleCountChange = (delta) => {
    setQuestionCount((prev) => Math.max(1, Math.min(50, prev + delta)));
  };

  const extractTextFromPDF = async (file) => {
    try {
      const text = await pdfToText(file);
      return text;
    } catch (error) {
      console.error('Failed to extract text from pdf:', error);
      return '';
    }
  };

  const extractTextFromDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const extractTextFromFile = async (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext === 'pdf') {
      return await extractTextFromPDF(file);
    } else if (ext === 'docx') {
      return await extractTextFromDocx(file);
    } else if (ext === 'txt') {
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
      });
    } else {
      throw new Error('Unsupported file type');
    }
  };


  const handleGenerate = async () => {
    if ((!topic && selectedMethod !== 'document') || !quizType) return;
    setIsGenerating(true);

    try {
      let documentText = topic;

      if (selectedMethod === 'document') {
        if (!documentFile) {
          alert('Please upload a document.');
          return;
        }
        documentText = await extractTextFromFile(documentFile);
        console.log(documentText);
        if (!documentText.trim()) {
          alert('Failed to extract text from the document.');
          return;
        }
      }

      const payload = {
        document_text: documentText.trim(),
        num_questions: questionCount,
        theme: category,
        difficulty
      };

      console.log(JSON.stringify(payload));

      const response = await fetch('/api/squiz/ai/generate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Erreur lors de la génération du quiz');

      const result = await response.json();
      console.log(result);
      onGenerate(result);
      onClose();
    } catch (error) {
      console.error('❌ Erreur API :', error);
      alert('Une erreur est survenue pendant la génération du quiz.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Create with AI</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {generationMethods.map((method) => {
                const Icon = method.icon;
                const selected = method.id === selectedMethod;
                return (
                  <button
                    key={method.id}
                    onClick={() => handleMethodChange(method.id)}
                    className={`w-full text-left border-2 rounded-xl p-4 transition ${
                      selected ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{method.title}</h3>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{topicConfig.label}</label>
                {topicConfig.inputType === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={topicConfig.placeholder}
                    className="w-full border rounded-lg p-3"
                  />
                ) : topicConfig.inputType === 'file' ? (
                  <div className="relative border-2 border-dashed p-4 text-center cursor-pointer rounded-lg">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setTopic(file.name);
                          setDocumentFile(file);
                        }
                      }}
                    />
                    <Upload className="mx-auto text-gray-500" />
                    <p className="mt-2">{topic || topicConfig.placeholder}</p>
                  </div>
                ) : (
                  <input
                    type="url"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={topicConfig.placeholder}
                    className="w-full border rounded-lg p-3"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <div className="flex gap-2">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setDifficulty(level.id)}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        difficulty === level.id
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quiz Type</label>
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full border rounded-lg p-3 text-left flex justify-between"
                    >
                      {quizType || 'Select type'}
                      <ChevronDown className="text-gray-500" />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-10 bg-white border w-full mt-1 rounded-lg shadow-lg">
                        {quizTypes.map((type) => (
                          <div
                            key={type}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setQuizType(type);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => handleCountChange(-1)} className="px-2 py-2 hover:bg-gray-100">
                      <Minus />
                    </button>
                    <span className="px-4">{questionCount}</span>
                    <button onClick={() => handleCountChange(1)} className="px-2 py-2 hover:bg-gray-100">
                      <Plus />
                    </button>
                  </div>
                </div>
              </div>

              {/* Category input */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Math, Science, Literature"
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            disabled={(selectedMethod !== 'document' && !topic.trim()) || !quizType || isGenerating}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;


