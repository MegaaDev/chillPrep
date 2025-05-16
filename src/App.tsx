import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DSATopicPage from "./pages/DSATopicPage";
import NonDSATopicPage from "./pages/NonDSATopicPage";
import AdvancedTopicPage from "./pages/AdvancedTopicPage";
import InternshipPrepRoadmap from "./pages/Roadmap";
import { ThemeProvider } from "./context/ThemeContext";
import { dsaTopics, nonDsaTopics, advancedTopics } from "./data/topics";
import FAQ from "./pages/FAQ";
import InterviewCompanion from "./pages/InterviewCompanion";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<InternshipPrepRoadmap />} />
            <Route path="/faq" element={<FAQ />} />
            <Route
              path="/interview-companion"
              element={<InterviewCompanion />}
            />
            {dsaTopics.map((topic) => (
              <Route
                key={topic.id}
                path={`/dsa/${topic.id}`}
                element={<DSATopicPage topicId={topic.id} />}
              />
            ))}
            {nonDsaTopics.map((topic) => (
              <Route
                key={topic.id}
                path={`/non-dsa/${topic.id}`}
                element={<NonDSATopicPage topicId={topic.id} />}
              />
            ))}
            {advancedTopics.map((topic) => (
              <Route
                key={topic.id}
                path={`/advanced/${topic.id}`}
                element={<AdvancedTopicPage topicId={topic.id} />}
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
