import React from "react";
import Sidebar from "../../components/Learner/Sidebar";
import Header from "../../components/Learner/Header";
import LessonCard from "../../components/Learner/LessonCard";
import "../../styles/HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <LessonCard subtitle="Lớp 1, Bài học 1" title="Getting Started" />
        <LessonCard subtitle="Lớp 1, Bài học 2" title="My Family" />
        <LessonCard subtitle="Lớp 1, Bài học 3" title="Colors" />
        <LessonCard subtitle="Lớp 1, Bài học 4" title="My Body" />
        <LessonCard subtitle="Lớp 1, Bài học 5" title="School" locked />
      </div>
    </div>
  );
};

export default HomePage;
