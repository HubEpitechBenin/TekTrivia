import React from "react";

const StatsSection = () => {
  const stats = [
    { number: "50K+", label: "Active users" },
    { number: "10K+", label: "Available questions" },
    { number: "100+", label: "Topics covered" },
    { number: "95%", label: "Satisfaction rate" },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-purple-200 text-base sm:text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
