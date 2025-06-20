import React from "react";
import { motion } from "framer-motion";
import CustomButton from "../components/CustomButton";
import game from "../../../assets/game.jpg";
import fairy from "./fairy.gif"; // ✅ Assure-toi d'avoir le bon fichier ici

const LeftSection = () => (
  <motion.div
    className="flex flex-col w-full"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <div className="bg-gray-100 bg-opacity-50 rounded-3xl p-8 sm:p-12 border border-gray-200">
      <p className="text-sm sm:text-base text-center text-gray-700 mb-4 font-medium uppercase">
        Introducing Instructional Suite
      </p>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-extrabold leading-tight bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6">
        I had no idea Quizizz could do that.
      </h1>
      <p className="text-gray-700 text-center mb-8 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
        Create and deliver bell-to-bell curriculum resources that meet the needs
        of every student.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <CustomButton
          text="Get started →"
          size="md"
          textSize="text-base sm:text-lg"
          fontWeight="font-semibold"
          color="bg-blue-600"
          textColor="text-white"
          rounded="rounded-lg"
        />
        <CustomButton
          text="See how it works"
          size="md"
          textSize="text-base sm:text-lg"
          fontWeight="font-semibold"
          color="bg-white"
          textColor="text-gray-900"
          rounded="rounded-lg"
          extraClass="border border-gray-300 hover:bg-gray-200"
        />
      </div>
    </div>
  </motion.div>
);

const RightSection = () => (
  <motion.div
    className="flex w-full mt-10 lg:mt-0"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <div className="relative w-full">
      <div className="bg-gray-100 bg-opacity-20 rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="rounded-2xl overflow-hidden">
          <img
            src={game}
            alt="Hero Game"
            className="object-cover w-full h-64 sm:h-80 lg:h-96"
          />
        </div>

        {/* Bulles animées */}
        <div className="absolute top-4 left-4 w-6 h-6 bg-cyan-400 rounded-full animate-bounce" />
        <div className="absolute top-8 right-6 w-5 h-5 bg-pink-400 rounded-full animate-pulse" />
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-purple-400 rounded-full animate-bounce delay-75" />
      </div>
    </div>
  </motion.div>
);

const HeroSection = () => (
  <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-pm-blue to-pm-blue/80 py-12 lg:py-20 gap-8">
    <LeftSection />
    <RightSection />
    {/* Floating Fairy */}
    {/* Magical Fairy */}
    <motion.div
      className="absolute z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0.7, 1],
        x: [0, 80, 200, 320, 400],
        y: [0, -40, 20, -30, 10],
        scale: [1, 1.1, 0.9, 1.05, 1],
        rotate: [0, 10, -5, 15, 0],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-20 h-20">
        <img
          src={fairy}
          alt="Flying Fairy"
          className="w-full h-full object-contain"
        />
        {/* Magic Trail */}
        <div className="absolute -bottom-1 left-2 w-2 h-2 bg-yellow-300 blur-sm rounded-full animate-ping" />
        <div className="absolute -bottom-2 left-4 w-1.5 h-1.5 bg-pink-300 blur-sm rounded-full animate-pulse" />
        <div className="absolute -bottom-3 left-6 w-1 h-1 bg-white blur-sm rounded-full animate-bounce" />
      </div>
    </motion.div>
  </section>
);

export default HeroSection;

// import React from "react";

// const HeroSection = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen px-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         {/* Left Side - Text Content */}
//         <div className="text-white space-y-8">
//           <div className="space-y-4">
//             <p className="text-purple-200 text-sm uppercase tracking-wider font-medium">
//               Introducing Instructional Suite
//             </p>
//             <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
//               Introducing
//               <br />
//               <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
//                 Instructional Suite
//               </span>
//             </h1>
//             <div className="relative">
//               <p className="text-2xl lg:text-4xl font-light italic text-purple-100 leading-relaxed">
//                 "I had no idea Tektrivia
//                 <br />
//                 could do that."
//               </p>
//               <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full"></div>
//             </div>
//           </div>

//           <p className="text-purple-100 text-lg leading-relaxed max-w-lg">
//             Create and deliver ball-to-ball educational resources that meet the
//             needs of every student
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 pt-4">
// <button
//   type="button"
//   class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
// >
//   Get started →
// </button>
// <button
//   type="button"
//   class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
// >
//   See how it works
// </button>
//           </div>
//         </div>

//         {/* Right Side - Modern Illustration */}
//         <div className="flex flex-col max-w-xl">
//           <div className="relative">
//             <div className="bg-white rounded-3xl p-8">
//               <div className="rounded-2xl relative overflow-hidden">
//                 <img
//                   src={game}
//                   alt="Hero Game Image"
//                   className="object-cover size-[500px]"
//                 />
//               </div>

//               {/* Floating elements */}
//               <div className="absolute top-4 left-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce"></div>
//               <div className="absolute top-8 right-6 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
//               <div className="absolute bottom-8 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
//               <div className="absolute bottom-4 right-4 w-10 h-10 bg-purple-400 rounded-full animate-bounce delay-75"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
