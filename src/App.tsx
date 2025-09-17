// import { useState } from 'react'

// import './App.css'
// import Flashcard from './Flashcard'
// import LearningPage from './pages/admin/LearningPage';

// function App() {

//   return (
//     // <>
//     //   <div>
//     //     <a href="https://vite.dev" target="_blank">
//     //       <img src={viteLogo} className="logo" alt="Vite logo" />
//     //     </a>
//     //     <a href="https://react.dev" target="_blank">
//     //       <img src={reactLogo} className="logo react" alt="React logo" />
//     //     </a>
//     //   </div>
//     //   <h1>Chào mừng bé đến với WiseOwl English 🦉</h1>
//     //   <div className="card">
//     //     <button onClick={() => setCount((count) => count + 1)}>
//     //       count is {count}
//     //     </button>
//     //     <p>
//     //       Edit <code>src/App.tsx</code> and save to test HMR
//     //     </p>
//     //   </div>
//     //   <p className="read-the-docs">
//     //     Click on the Vite and React logos to learn more
//     //   </p>
//     // </>
//      <LearningPage />
//   )
// }

// export default App

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LessonsPage from "./pages/user/LessonsPage";
import UserLayout from "./layouts/UserLayout";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/lessons/1" replace />} />
        <Route element={<UserLayout />}>
          <Route path="/lessons/:levelId" element={<LessonsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
