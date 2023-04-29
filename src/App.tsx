import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListScreen from "./components/ListScreen";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/questions",
    element: <ListScreen />,
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
