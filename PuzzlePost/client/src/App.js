import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { PuzzleProvider } from "./providers/PuzzleProvider";
import { HistoryProvider } from "./providers/HistoryProvider";
import { RequestProvider } from "./providers/RequestProvider";
import { CommentProvider } from "./providers/CommentProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PuzzleProvider>
          <HistoryProvider>
            <CommentProvider>
              <RequestProvider>
                <Header />
                <ApplicationViews />
              </RequestProvider>
            </CommentProvider>
          </HistoryProvider>
        </PuzzleProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
