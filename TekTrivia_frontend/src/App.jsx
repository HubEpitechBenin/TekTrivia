import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageTransition from "./components/layout/PageTransition";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Rank from "./pages/ranking/Rank";
import Categories from "./pages/categories/Categories";
import Blog from "./pages/blog/Blog";
import QuizLab from "./pages/quizLab/QuizLab";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/quizLab" element={<QuizLab />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </>
  );
}

export default App;
