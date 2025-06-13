import Card from "./components/ui/Card";
import CardContent from "./components/ui/CardContent";
import CardHeader from "./components/ui/CardHeader";
import CardTitle from "./components/ui/CardTitle";
import Button from "./components/ui/Button";
import Badge from "./components/ui/Badge";

import React from "react";
import { useNavigate } from "react-router-dom";
import useToast from "./hooks/use-toast";
import {
  Code,
  Database,
  Globe,
  Smartphone,
  Brain,
  Palette,
  Shield,
  Zap,
  Monitor,
  Server,
  GitBranch,
  Cpu,
} from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    {
      id: "web-dev",
      title: "Développement Web",
      description: "HTML, CSS, JavaScript, React, Vue.js",
      icon: <Globe className="w-8 h-8" />,
      color: "bg-blue-500",
      questions: 45,
      difficulty: "Tous niveaux",
    },
    {
      id: "programming",
      title: "Programmation",
      description: "Python, Java, C++, Algorithmes",
      icon: <Code className="w-8 h-8" />,
      color: "bg-green-500",
      questions: 38,
      difficulty: "Intermédiaire",
    },
    {
      id: "database",
      title: "Bases de Données",
      description: "SQL, NoSQL, MongoDB, PostgreSQL",
      icon: <Database className="w-8 h-8" />,
      color: "bg-purple-500",
      questions: 28,
      difficulty: "Avancé",
    },
    {
      id: "mobile",
      title: "Développement Mobile",
      description: "React Native, Flutter, iOS, Android",
      icon: <Smartphone className="w-8 h-8" />,
      color: "bg-pink-500",
      questions: 32,
      difficulty: "Intermédiaire",
    },
    {
      id: "ai-ml",
      title: "IA & Machine Learning",
      description: "Python, TensorFlow, PyTorch, Data Science",
      icon: <Brain className="w-8 h-8" />,
      color: "bg-indigo-500",
      questions: 25,
      difficulty: "Avancé",
    },
    {
      id: "design",
      title: "UI/UX Design",
      description: "Figma, Adobe, Principes de design",
      icon: <Palette className="w-8 h-8" />,
      color: "bg-orange-500",
      questions: 22,
      difficulty: "Débutant",
    },
    {
      id: "security",
      title: "Cybersécurité",
      description: "Sécurité web, Cryptographie, Pentesting",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-red-500",
      questions: 30,
      difficulty: "Avancé",
    },
    {
      id: "devops",
      title: "DevOps & Cloud",
      description: "Docker, Kubernetes, AWS, CI/CD",
      icon: <Server className="w-8 h-8" />,
      color: "bg-teal-500",
      questions: 35,
      difficulty: "Intermédiaire",
    },
    {
      id: "frontend",
      title: "Frontend Frameworks",
      description: "React, Vue, Angular, Svelte",
      icon: <Monitor className="w-8 h-8" />,
      color: "bg-cyan-500",
      questions: 40,
      difficulty: "Tous niveaux",
    },
    {
      id: "backend",
      title: "Backend Development",
      description: "Node.js, Express, APIs, Microservices",
      icon: <Cpu className="w-8 h-8" />,
      color: "bg-yellow-500",
      questions: 33,
      difficulty: "Intermédiaire",
    },
    {
      id: "version-control",
      title: "Contrôle de Version",
      description: "Git, GitHub, GitLab, Workflow",
      icon: <GitBranch className="w-8 h-8" />,
      color: "bg-gray-500",
      questions: 18,
      difficulty: "Débutant",
    },
    {
      id: "performance",
      title: "Optimisation & Performance",
      description: "Optimisation web, Monitoring, Profiling",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-lime-500",
      questions: 24,
      difficulty: "Avancé",
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Débutant":
        return "bg-green-100 text-green-800";
      case "Intermédiaire":
        return "bg-yellow-100 text-yellow-800";
      case "Avancé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const handleCategoryClick = (title) => {
    toast({
      title: "Catégorie sélectionnée",
      description: `Lancement du quiz ${title}...`,
    });

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Catégories de Quiz
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choisissez votre domaine d'expertise et testez vos connaissances
            avec des questions adaptées à votre niveau.
          </p>
          <Button onClick={() => navigate("/")} variant="outline">
            Retour à l'accueil
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-border hover:border-primary/50 group"
              onClick={() => handleCategoryClick(category.title)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div
                    className={`p-3 rounded-lg ${category.color} text-white group-hover:scale-110 transition-transform`}
                  >
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className={getDifficultyColor(category.difficulty)}>
                    {category.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    {category.questions} questions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {category.description}
                </p>
                <Button
                  className="w-full mt-4 group-hover:bg-primary/90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.title);
                  }}
                >
                  Commencer le quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-sm text-muted-foreground">Catégories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">370+</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">Niveaux</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Disponible</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Categories;
