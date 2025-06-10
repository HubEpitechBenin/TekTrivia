import React from "react";
import UserCard from "./UserCard";

const TopPlayers = () => {
  const users = [
    {
      avatar: "../../../../Images/avatar1.png",
      profilePic: "../../../../Images/avatar1.png",
      name: "Roy Warren",
      xp: "320k",
    },
    {
      avatar: "../../../../Images/avatar2.png",
      profilePic: "../../../../Images/avatar2.png",
      name: "Roy Warren",
      xp: "320k",
    },
    {
      avatar: "../../../../Images/avatar3.png",
      profilePic: "../../../../Images/avatar3.png",
      name: "Roy Warren",
      xp: "320k",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="text-center px-4 sm:px-10">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Top players TekTrivia
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          All subjects combined
        </p>
      </div>

      <div className="px-4 sm:px-10 mt-12 flex flex-wrap justify-center gap-6 sm:gap-10">
        {users.map((user, index) => (
          <UserCard
            key={index}
            {...user}
            tall={index === 1}
            raise={index === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TopPlayers;

//   return (
//     <div className="bg-white">
//       <div className="text-center p-8">
//         <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//           Top players TekTrivia
//         </h2>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           La plateforme de quiz tech la plus complète pour tester et améliorer
//           vos compétences
//         </p>
//       </div>
//       <div className=" p-10 flex justify-center min-h-[600px]">
//         <div className="flex justify-center items-start gap-6 mt-10 flex-wrap">
//           {users.map((user, index) => (
//             <UserCard
//               key={index}
//               {...user}
//               tall={index === 1}
//               raise={index === 1}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopPlayers;
