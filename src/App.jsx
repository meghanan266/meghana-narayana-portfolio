import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

import { ActiveSectionProvider } from "./context/ActiveSectionContext";
import PageLayout from "./layouts/PageLayout";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectsPage from "./pages/ProjectsPage";
import { pageTransition } from "./utils/animations";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
              <ProjectsPage />
            </motion.div>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
              <ProjectDetail />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <ActiveSectionProvider>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        <PageLayout>
          <AnimatedRoutes />
        </PageLayout>
        <Analytics />
      </ActiveSectionProvider>
    </Router>
  );
}
