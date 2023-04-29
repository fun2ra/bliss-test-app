import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListScreen from "./components/ListScreen";
import DetailScreen from "./components/DetailScreen";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/questions",
    element: <ListScreen />,
  },
  {
    path: "/questions/:QUESTION_ID",
    element: <DetailScreen />
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
