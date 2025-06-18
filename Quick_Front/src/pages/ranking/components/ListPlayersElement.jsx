import React from 'react'

const ListPlayersElement = ({index, image, name, country, xp}) => {
  return (
    <div className="flex justify-center items-center border-b border-pm-blue300 dark:border-pm-rBorder box-border p-3 m-4">
        <p className="flex flex-col w-[5%] items-center box-border">
            <span>{index}</span>
        </p>
        <div className="flex flex-col items-center w-[45px] h-[45px] box-border mx-3">
            <img
                src={image}
                alt={name}
                className="rounded-full size-full"
            />
        </div>
        <div className="flex justify-between items-center w-[88%] box-border">
            <div className="flex flex-col justify-start w-[75%] gap-1">
                <p className="text-[16px] ">{name}</p>
                <p className="text-xs opacity-80">{country}</p>
            </div>
            <div className="flex justify-end w-[25%] pr-4">
                <p className="text-lg font-semibold">{xp} XP</p>
            </div>
        </div>
    </div>
  )
}

export default ListPlayersElement