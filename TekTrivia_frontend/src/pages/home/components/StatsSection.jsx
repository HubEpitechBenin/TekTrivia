import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const StatsSection = () => {
  const statsData = [
    { number: 500, label: "Active users" },
    { number: 100, label: "Available questions" },
    { number: 10, label: "Topics covered" },
    { number: 95, label: "Satisfaction rate" },
  ];

  const [stats, setStats] = useState(
    statsData.map((stat) => ({ ...stat, current: 0 }))
  );

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Fonction pour incrémenter les valeurs progressivement
  useEffect(() => {
    if (inView) {
      statsData.forEach((stat, index) => {
        let increment = stat.number / 100; // Nombre d'incréments
        let interval = setInterval(() => {
          setStats((prevStats) =>
            prevStats.map((s, i) =>
              i === index && s.current < stat.number
                ? { ...s, current: s.current + increment }
                : s
            )
          );
        }, 50);
        setTimeout(() => clearInterval(interval), 5000); // Arrêt après 5s
      });
    }
  }, [inView]);

  return (
    <section className="py-20 bg-slate-900">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2, delayChildren: 0.2 },
            },
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.2,
              }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                {Math.floor(stat.current)}
                {stat.label === "Satisfaction rate" ? "%" : "K+"}
              </div>
              <div className="text-purple-200 text-base sm:text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
