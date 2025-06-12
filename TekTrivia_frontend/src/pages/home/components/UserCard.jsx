import React from "react";
// py --> padding,
const UserCard = ({ avatar, profilePic, name, xp, tall = false }) => {
  return (
    <div
      className={`bg-gray-100 rounded-lg w-64 shadow flex flex-col items-center \
        px-4 ${
          tall ? "py-10 min-h-[450px] -mt-8" : "py-4 min-h-[400px]"
        } pt-4 transition-transform duration-200 hover:scale-105`}
    >
      {/* Top TekTrivia logo + XP */}
      <div className="w-full flex justify-between text-xs text-gray-700 font-serif mb-2">
        <span className="italic">TekTrivia</span>
        <span>{xp} XP</span>
      </div>

      {/* Avatar */}
      <img
        src={avatar}
        alt="User Avatar"
        className="w-32 h-32 object-cover rounded-full mb-4"
      />

      {/* Bottom user info */}
      <div className="flex items-center gap-2 mt-auto">
        <img
          src={profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full border border-white"
        />
        <div className="text-center">
          <p className="text-xs text-gray-600">{name}</p>
          <p className="text-sm font-semibold text-black">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
