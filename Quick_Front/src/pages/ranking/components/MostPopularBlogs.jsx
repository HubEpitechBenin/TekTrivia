import React from 'react'
import MostPopularBlogsElement from './MostPopularBlogsElement'
import { FaBasketballBall, FaLandmark, FaFlask, FaCalculator, FaRobot } from "react-icons/fa"
import avatar1 from '../../../assets/avatar1.jpg'


const MostPopularBlogs = () => {
    const mostPopularBlogs = [
      {
          title: "Sport",
          image: avatar1,
          author: "Ronel Dassi",
          date: "20/04/2025"
      },
      {
          title: "Sport",
          image: avatar1,
          author: "Ronel Dassi",
          date: "20/04/2025"
      },
      {
          title: "Sport",
          image: avatar1,
          author: "Ronel Dassi",
          date: "20/04/2025"
      },
      {
          title: "Sport",
          image: avatar1,
          author: "Ronel Dassi",
          date: "20/04/2025"
      }
  ];
  return (
    <div className="dark:bg-pm-rBlack p-6 h-[50%]">
        <h3 className="text-pm-blue dark:text-white font-semibold text-[19px]">Most Popular Blogs</h3>
        <div className="h-full">
            {mostPopularBlogs.map((item, index) => (
                <MostPopularBlogsElement
                    key={index}
                    title={item.title}
                    image={item.image}
                    author={item.author}
                    date={item.date}
                />
            ))}
        </div>
    </div>
  )
}

export default MostPopularBlogs