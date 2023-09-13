import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import EditTodo from "./components/EditTodo";

export default function App() {
  return (
    <>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      
    </>
  );
}
