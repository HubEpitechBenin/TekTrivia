import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Header from "../dashboard/components/Header";
import Sidebar from "../dashboard/components/Sidebar";

// --- Composant Button ---
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    outline:
      "border border-white text-white hover:bg-white hover:text-blue-600",
    secondary: "bg-white text-blue-600 hover:bg-blue-100",
  };
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Composant Badge ---
const Badge = ({ children, className = "", variant = "default" }) => {
  const base = "inline-block rounded-full px-3 py-1 text-xs font-semibold";
  const variants = {
    default: "bg-gray-200 text-gray-800",
    secondary: "bg-blue-100 text-blue-800",
  };
  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// --- Composant Card ---
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl bg-white shadow-md overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

// --- Données Développeurs ---
const developers = [
  {
    id: 1,
    name: "Aimane Alassane",
    role: "Backend Developer",
    bio: "Architecte backend spécialisé dans les APIs REST et les bases de données performantes.",
    skills: ["Django", "AI", "Cybersecurity", "Git", "C++"],
    github: "#",
    linkedin: "https://www.linkedin.com/in/aimane-alassane/",
    email: "aimane.alassane@epitech.eu",
  },
  {
    id: 2,
    name: "Ronnel Dassi",
    role: "Backend Developer",
    bio: "Architecte backend spécialisé dans les APIs REST et les bases de données performantes.",
    skills: ["Django", "Haskell", "C", "Git", "C++"],
    github: "#",
    linkedin: "https://www.linkedin.com/in/ronnel-dassi-9aa53110b/",
    email: "ronnel.dassi@epitech.eu",
  },
  {
    id: 3,
    name: "Patrice Dagbe",
    role: "Lead Frontend Developer",
    bio: "Experte en React et TypeScript, passionnée par l'UX/UI et les animations web.",
    skills: ["AI", "Data Science", "React", "C++", "Tailwind CSS", "Next.js", "Figma"],
    github: "https://github.com/PatriceDAGBE",
    linkedin: "https://www.linkedin.com/in/patrice-dagbe-1020a6303/",
    email: "patriko.dagbe@epitech.eu",
  },
  {
    id: 4,
    name: "Jean-Baptiste Viossi",
    role: "Frontend Developer",
    bio: "Architecte backend spécialisé dans les APIs REST et les bases de données performantes.",
    skills: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    github: "https://github.com/Jean-baptisteViossi",
    linkedin: "https://www.linkedin.com/in/jean-baptiste-viossi-3080a4303/",
    email: "jean-baptiste.viossi@epitech.eu",
  },
];

// --- Composant Principal ---
const Developers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-8">
        <Header />
        <main className="p-2">
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
            <section className="pt-4 pb-10 px-4 text-center">
              <h1 className="text-4xl font-bold text-blue-700 mb-4">Notre Équipe</h1>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                Découvrez les développeurs qui rendent votre expérience de quiz incroyable.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="secondary">🚀 Innovation</Badge>
                <Badge variant="secondary">💡 Créativité</Badge>
                <Badge variant="secondary">⚡ Performance</Badge>
              </div>
            </section>

            <section className="px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {developers.map((dev) => (
                <Card key={dev.id}>
                  <CardContent>
                    <div className="text-center">
                      {/* Initiales à la place de l'image */}
                      <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600 select-none">
                        {dev.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">{dev.name}</h3>
                      <p className="text-blue-500 text-sm mb-3">{dev.role}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{dev.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {dev.skills.map((skill, idx) => (
                        <Badge key={idx} variant="default">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-center space-x-2">
                      {/* Boutons de test sans liens */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(dev.github, "_blank")}
                        aria-label={`GitHub profile de ${dev.name}`}
                      >
                        <Github size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(dev.linkedin, "_blank")}
                        aria-label={`LinkedIn profile de ${dev.name}`}
                      >
                        <Linkedin size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(`mailto:${dev.email}`, "_blank")}
                        aria-label={`Envoyer un email à ${dev.email}`}
                      >
                        <Mail size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Developers;
