import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ListScreen from "./components/ListScreen";
import DetailScreen from "./components/DetailScreen";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/questions" element={<ListScreen />}></Route>
          <Route
            path="/questions/:QUESTION_ID"
            element={<DetailScreen />}
          ></Route>
          <Route path="*" element={<Navigate to="/questions" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
