import React from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Joe Traoré",
      role: "Développeuse Full-Stack",
      content:
        "TekTrivia m'a aidée à réviser mes connaissances avant mes entretiens. Les questions sont pertinentes et actuelles.",
      rating: 5,
    },
    {
      name: "Thomas Franklin",
      role: "Étudiant en Informatique",
      content:
        "Parfait pour tester mes connaissances de manière ludique. J'utilise TekTrivia tous les jours pour progresser.",
      rating: 5,
    },
    {
      name: "Juhana Queen",
      role: "Lead Developer",
      content:
        "Interface intuitive et questions de qualité. Je recommande vivement pour tous les développeurs.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black-900 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-600">
            Rejoignez des milliers de développeurs qui font confiance à
            TekTrivia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-gray-600 text-sm">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
