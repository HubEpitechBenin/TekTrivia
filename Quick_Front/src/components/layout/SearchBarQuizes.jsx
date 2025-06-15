import React from 'react'

const SearchBarQuizes = () => {
  return (
    <div className="w-[30%] h-[40%] rounded-[20px]">
        <input
            className="size-full placeholder:text-2xl rounded-[20px] bg-[#E8E8EA] px-6 py-4 outline-none"
            type="search"
            placeholder="Search a quiz..."
            name=""
            id="" 
        />
    </div>
  )
}

export default SearchBarQuizes