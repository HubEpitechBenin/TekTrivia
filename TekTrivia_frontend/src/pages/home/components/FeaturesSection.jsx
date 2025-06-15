import React from "react";
import { BookOpen, Users, Trophy, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: BookOpen,
    title: "Varied Questions",
    description:
      "Thousands of questions on technology, programming, and computer science.",
  },
  {
    icon: Users,
    title: "Active Community",
    description:
      "Join a passionate community of developers and learn together.",
  },
  {
    icon: Trophy,
    title: "Ranking System",
    description: "Compare your performance and climb the global leaderboard.",
  },
  {
    icon: Clock,
    title: "Timed Quizzes",
    description:
      "Test your knowledge under pressure with our time-based challenges.",
  },
];

// Container animation for staggered children
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation for each feature card
const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="py-20 px-6 sm:px-12 bg-gradient-to-bfont-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Why TekTrivia?
          </motion.h2>
          <motion.p
            className="mt-4 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            The most comprehensive tech quiz platform to test and improve your
            skills.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 text-center group hover:shadow-xl transition duration-300"
              variants={cardVariant}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transform transition duration-300">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
