import React from 'react'

const QuizCreationModal = () => {
  return (
    <div>
        <form className="bg-red-500">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Quiz Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter quiz title"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
          >
            Save Quiz
          </button>
        </form>
    </div>
  )
}

export default QuizCreationModal