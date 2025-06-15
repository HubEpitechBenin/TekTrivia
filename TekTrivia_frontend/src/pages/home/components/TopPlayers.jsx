import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

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

      {/* Animation et réactivité améliorée */}
      <motion.div
        ref={ref}
        className="px-4 sm:px-10 mt-12 flex flex-wrap justify-center gap-6 sm:gap-10"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
          },
        }}
      >
        {users.map((user, index) => (
          <motion.div
            key={index}
            className="w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
              delay: index * 0.15,
            }}
          >
            <UserCard {...user} tall={index === 1} raise={index === 1} />
          </motion.div>
        ))}
      </motion.div>
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
