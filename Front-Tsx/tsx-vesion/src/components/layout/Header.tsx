import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNewQuizClick: () => void;
}

const Header = ({ onNewQuizClick }: HeaderProps) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6 sticky top-0 z-20">
      <SidebarTrigger className="sm:hidden" />
      <h1 className="text-lg font-semibold md:text-2xl flex-1">Tableau de bord</h1>
      <Button 
        onClick={onNewQuizClick}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
      >
        Créer un nouveau Quiz
      </Button>
    </header>
  );
};

export default Header;
