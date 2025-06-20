import React from "react";
import { Github, Linkedin, Mail } from "lucide-react"; // nécessite lucide-react (facultatif, remplaçable par texte/icônes locales)

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

// --- Composant Navigation (exemple simple) ---
const Navigation = () => {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">QuizDev</h1>
        <nav className="space-x-4 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">
            Accueil
          </a>
          <a href="/quiz" className="hover:text-blue-600">
            Quiz
          </a>
          <a href="/team" className="hover:text-blue-600">
            Équipe
          </a>
        </nav>
      </div>
    </header>
  );
};

// --- Données Développeurs ---
const developers = [
  {
    id: 1,
    name: "Aimane A.",
    role: "Backend Developer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Architecte backend spécialisé dans les APIs REST et les bases de données performantes.",
    skills: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    github: "#",
    linkedin: "#",
    email: "email...",
  },
  {
    id: 2,
    name: "Ronel ",
    role: "Backend Developer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Architecte backend spécialisé dans les APIs REST et les bases de données performantes.",
    skills: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    github: "#",
    linkedin: "#",
    email: "email...",
  },
  {
    id: 3,
    name: "Patrice D.",
    role: "Lead Frontend Developer",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
    bio: "Experte en React et TypeScript, passionnée par l'UX/UI et les animations web.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Figma"],
    github: "#",
    linkedin: "#",
    email: "email...",
  },
  {
    id: 4,
    name: "Jean-Baptiste Viossi",
    role: "Frontend Developer",
    avatar:
      "https://intra.epitech.eu/file/userprofil/profilview/jean-baptiste.viossi@epitech.eu.jpg",
    bio: "Architecte backend spécialisé dans les APIs REST et les bases de données performantes.",
    skills: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    github: "#",
    linkedin: "#",
    email: "jean-baptiste@epitech.eu",
  },
  // Ajoute plus si tu veux...
];

// --- Composant Principal ---
const Developers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* <Navigation /> */}

      <section className="pt-24 pb-10 px-4 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Notre Équipe</h1>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Découvrez les développeurs qui rendent votre expérience de quiz
          incroyable.
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
                <img
                  src={dev.avatar}
                  alt={dev.name}
                  className="w-24 h-24 mx-auto rounded-full mb-3 object-cover border-4 border-white shadow-md"
                />
                <h3 className="text-lg font-bold text-gray-800">{dev.name}</h3>
                <p className="text-blue-500 text-sm mb-3">{dev.role}</p>
              </div>
              <p className="text-sm text-gray-600 mb-4">{dev.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {dev.skills.map((skill, idx) => (
                  <Badge key={idx} variant="default">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-center space-x-2">
                <a href={dev.github}>
                  <Button size="sm" variant="ghost">
                    <Github size={16} />
                  </Button>
                </a>
                <a href={dev.linkedin}>
                  <Button size="sm" variant="ghost">
                    <Linkedin size={16} />
                  </Button>
                </a>
                <a href={`mailto:${dev.email}`}>
                  <Button size="sm" variant="ghost">
                    <Mail size={16} />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Developers;
