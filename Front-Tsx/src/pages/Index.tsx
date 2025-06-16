import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import QuizCreationModal from '@/components/QuizCreationModal';
// import { mockQuizzes } from '@/data/mockQuizzes';
// import DashboardLayout from '@/components/layout/DashboardLayout';
// import Header from '@/components/layout/Header';
// import QuizGrid from '@/components/dashboard/QuizGrid';

const Index = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <p>hello</p>
      {/* <DashboardLayout>
        <Header onNewQuizClick={() => setIsModalOpen(true)} />
        <main className="flex-1 p-6">
          {mockQuizzes.length > 0 ? (
            <QuizGrid />
          ) : (
            <div className="flex h-[calc(100vh-150px)] items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center gap-2 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  Vous n'avez pas de quiz
                </h3>
                <p className="text-sm text-muted-foreground">
                  Créez-en un pour commencer.
                </p>
                <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
                  Créer un Quiz
                </Button>
              </div>
            </div>
          )}
        </main>
      </DashboardLayout>
      <QuizCreationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      /> */}
    </>
  );
};

export default Index;
