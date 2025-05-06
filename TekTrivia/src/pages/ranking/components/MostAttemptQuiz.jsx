import React from 'react'
import { FaBasketballBall, FaLandmark, FaFlask, FaCalculator, FaRobot } from "react-icons/fa";

import MostAttemptQuizElement from "./MostAttemptQuizElement"

const MostAttemptQuiz = () => {
    const mostAttemtQuiz = [
        {
            title: "Sport",
            image: <FaBasketballBall />,
            attemptCount: "700"
        },
        {
            title: "History",
            image: <FaLandmark />,
            attemptCount: "700"
        },
        {
            title: "Science",
            image: <FaFlask />,
            attemptCount: "700"
        },
        {
            title: "Mathmatics",
            image: <FaCalculator />,
            attemptCount: "700"
        },
        {
            title: "AI",
            image: <FaRobot />,
            attemptCount: "700"
        },
    ];
    return (
        <div className="p-6 h-[50%]">
            <h3 className="text-pm-blue font-semibold text-[19px]">Most attempt Quiz</h3>
            <div className="h-full">
                {mostAttemtQuiz.map((item, index) => (
                    <MostAttemptQuizElement
                        key={index}
                        title={item.title}
                        image={item.image}
                        attemptCount={item.attemptCount}
                    />
                ))}
            </div>
        </div>
    )
}

export default MostAttemptQuiz