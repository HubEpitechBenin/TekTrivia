import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageTransition from "./components/layout/PageTransition";
import Dashboard from "./pages/dashboard/Dashboard";
import Rank from "./pages/ranking/Rank";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </>
  );
}

export default App;
