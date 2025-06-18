import React from 'react'
import Level from '../../assets/level.png'

const LevelUp = ({level}) => {
  return (
    <div className="w-[240px] h-[60px] border border-pm-blue rounded-[10px] flex items-center justify-between">
        <img
            src={Level}
            alt="Level Icon"
            className="w-8 h-8 mr-2 ml-0"
        />
        <p className="bg-red-400 flex text-pm-blue font-semibold text-lg">
            LEVEL {level}
        </p>
    </div>
  )
}

export default LevelUp