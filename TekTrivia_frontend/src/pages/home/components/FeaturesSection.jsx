import React from "react";
import { BookOpen, Users, Trophy, Clock } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Questions variées",
      description:
        "Des milliers de questions sur la technologie, programmation, et informatique",
    },
    {
      icon: Users,
      title: "Communauté active",
      description:
        "Rejoignez une communauté de développeurs passionnés et apprenez ensemble",
    },
    {
      icon: Trophy,
      title: "Système de classement",
      description:
        "Comparez vos performances et grimpez dans le classement mondial",
    },
    {
      icon: Clock,
      title: "Quiz chronométrés",
      description:
        "Testez vos connaissances sous pression avec nos défis contre la montre",
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why TekTrivia ?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            The most comprehensive tech quiz platform to test and improve your
            skills
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-pm-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
