import React from 'react'

const MostPopularBlogsElement = ({title, image, author, date}) => {
  return (
    <div className="border-b border-pm-blue300 dark:border-pm-rBorder flex gap-2 p-2">
        <div className="w-[12%] h-[12%] rounded-md overflow-hidden">
            <img
                src={image}
                alt="blog"
                className="w-full h-full object-cover"
            />
        </div>
        <div className="pl-2">
            <h3>{title}</h3>
            <div className="flex flex-col">

                <span>{'Author - '} {author}</span>
                <span className="dark:text-gray-400">{date}</span>
            </div>
        </div>
    </div>
  )
}

export default MostPopularBlogsElement